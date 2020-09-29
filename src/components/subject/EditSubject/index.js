import React , { useState , useEffect } from "react";
import { Input, Modal , Radio , Form } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";

const RadioGroup = Radio.Group;

const options = [
  {label: 'مادة دراسية', value: 'main'},
  {label: 'أخرى', value: 'other'},
];

const EditSubject = ({ onSaveSubject, onToggleModal, open, subject }) => {
  
    const [name, setName] = useState('')
    const [type, setType] = useState('')


    useEffect(() => {
      if(Object.keys(subject).length !== 0){
        console.log(subject.name)
        setName(subject.name)
        setType(subject.type)
      }
    }, [subject])

    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="subject.saveSubject"/>}
        toggle={onToggleModal} 
        visible={open}
        closable={false}
        onOk={() => {
          if (name === '')
            return;
          onToggleModal("editSubjectState");
          onSaveSubject({ id:subject.id , name , type });
          setName(name)
          setType(type)
        }}
        onCancel={()=> {
          onToggleModal('editSubjectState')
          setName(subject.name)
          setType(subject.type)
        }}>

        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
          <Form labelCol={{span:6}} wrapperCol={{span:14}} >
            <div className="gx-form-group">
            <FormattedMessage id="columns.name" defaultMessage="name">
             {
               placeholder => (
                <Form.Item rules={[{ required: true }]}   label={placeholder}>
                <Input
                  required
                  placeholder={placeholder}
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                  margin="none"/>
                  </Form.Item>
                  )
              }
           </FormattedMessage>
            </div>
            <div className="gx-form-group">
              <Form.Item label={<IntlMessages id="columns.type"/>}>
                 <RadioGroup value={type} onChange={(e)=> {
                   console.log(e.target.value)
                   setType(e.target.value)
                 }} options={options} />
              </Form.Item>
            </div>
            </Form>
          </div>
        </div>
      </Modal>
    );
}

export default React.memo(EditSubject);
