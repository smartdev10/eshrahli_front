import React from "react";
import { Input, Modal } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class AddPage extends React.Component {
  
  state = {
    name :'',
    slug:'',
    editorState:''
  }

  onEditorStateChange = (editorState) => {
    this.setState({editorState})
  };


  render() {
    const { onAddPage, onToggleModal, open } = this.props;
    const { name , editorState , slug } = this.state;
    return (
      <Modal
        width={'80%'}
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="page.addPage"/>}
        toggle={onToggleModal} visible={open}
        closable={false}
        onOk={() => {
          if (name === '')
            return;
          onToggleModal("addPageState");
          onAddPage({ name , slug , content:draftToHtml(convertToRaw(editorState.getCurrentContent())) });
          this.setState({ name: '' , slug:'' })
        }}
        onCancel={()=> {
          onToggleModal("addPageState")
          this.setState({ name: '' , slug:'' })
        }}>

        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
            <div className="gx-form-group">
              <FormattedMessage id="columns.name" defaultMessage="name">
              {
                placeholder => (
                  <Input
                  required
                  value={name}
                  placeholder={placeholder}
                  onChange={(event) => this.setState({name: event.target.value})}
                  margin="none"/>
                  )
                }
            </FormattedMessage>
            </div>
            <div className="gx-form-group">
                 <Input
                  required
                  value={slug}
                  placeholder='slug'
                  onChange={(event) => this.setState({slug: event.target.value})}
                  margin="none"/>
            </div>
            <div className="gx-form-group">
              <Editor
                textAlignment="right"
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddPage;
