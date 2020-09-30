import React , { useState , useEffect } from "react";
import { Input, Modal , Select } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";


const Option = Select.Option;


const EditLevel = ({ onSaveLevel, onToggleModal, open, level , subjects }) => {
  
    const [name, setName] = useState('')
    const [subjectsState, setSubjects] = useState([])

    const  handleChangeSubjects = (subjects) => {
      setSubjects(subjects)
     }

    useEffect(() => {
      if(Object.keys(level).length !== 0){
        console.log(level.name)
        setName(level.name)
        let subjects = level.subjects.map((sub)=> sub.id)
        setSubjects(subjects)
      }
    }, [level])

    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="level.saveLevel"/>}
        toggle={onToggleModal} 
        visible={open}
        closable={false}
        onOk={() => {
          if (name === '')
            return;
          onToggleModal("editLevelState");
          onSaveLevel({ id:level.id , name , subjects:subjectsState });
          setName(name)
          setName(subjectsState)
        }}
        onCancel={()=> {
          onToggleModal('editLevelState')
          setName(level.name)
          let subjects = level.subjects.map((sub)=> sub.id)
          setSubjects(subjects)
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
                value={name}
                margin="none"/>
                )
              }
             </FormattedMessage>
            </div>
            <div className="gx-form-group">
                 <Select
                  mode="multiple"
                  value={subjectsState}
                  style={{width: '100%'}}
                  placeholder={<IntlMessages id="columns.materials"/>}
                  onChange={handleChangeSubjects}>
                  {subjects.filter((subject) => subject.type === 'main').map((subject , index)=>  <Option key={index} value={subject.id}>{subject.name}</Option>)}
                </Select>
            </div>
          </div>
        </div>
      </Modal>
    );
}

export default React.memo(EditLevel);
