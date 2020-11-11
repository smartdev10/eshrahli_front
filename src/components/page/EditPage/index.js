import React , { useState , useEffect } from "react";
import { Input, Modal } from "antd";
import { EditorState, ContentState , convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from "prop-types";


const EditPage = ({ onSavePage, onToggleModal, open, id , name , content , page , count }) => {
  
    const [editorState, setEditorState] = useState(null)
    const [contentState, setContentState] = useState(null)
    const [pageName, setName] = useState('')


    const onEditorStateChange = (editorState) => {
      setEditorState(editorState)
    };
    

    useEffect(() => {
      if(content){
        const blocksFromHtml = htmlToDraft(content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState1 = EditorState.createWithContent(contentState);
        setEditorState(editorState1)
        setContentState(contentState)
        setName(name)
      }
    }, [content , name , page , count])

    return (
      <Modal
        width={'80%'}
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="page.savePage"/>}
        toggle={onToggleModal} 
        visible={open}
        closable={false}
        onOk={() => {
          console.log(id)
          if (pageName === '')
            return;
          onToggleModal("editPageState");
          let body = content
          if(editorState){
            body = draftToHtml(convertToRaw(editorState.getCurrentContent()))
          }
          onSavePage({ id:id , name:pageName  , content:body });
          setName(name)
          setContentState(null)
          setEditorState(null)
        }}
        onCancel={()=> {
          onToggleModal('editPageState')
          setName(name)
          setContentState(null)
          setEditorState(null)
        }}>

        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
            <div className="gx-form-group">
              <FormattedMessage id="columns.name" defaultMessage="name">
              {
                placeholder => (
                <Input
                  required
                  placeholder={placeholder}
                  onChange={(event) => setName(event.target.value)}
                  value={pageName}
                  margin="none"/>
                  )
                }
            </FormattedMessage>
            </div>
            <div className="gx-form-group">
              <Editor
                editorState={editorState}
                contentState={contentState}
                textAlignment="right"
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
}

export default EditPage;


EditPage.propTypes = {
  onSavePage: PropTypes.func,
  onToggleModal: PropTypes.func,
  open: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  count: PropTypes.number,
  page: PropTypes.object
};