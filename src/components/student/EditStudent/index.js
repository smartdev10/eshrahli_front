import React , { useState , useEffect } from "react";
import { Input, Modal , Radio , Form } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";


const RadioGroup = Radio.Group;
const options = [
  {label: 'ذكر', value: 'male'},
  {label: 'أنثى', value: 'female'},
];


const EditStudent = ({ onSaveStudent, onToggleModal, open, student }) => {
  
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')

   

    useEffect(() => {
      if(Object.keys(student).length !== 0){
        setName(student.name)
        setMobile(student.mobile)
        setGender(student.gender)
      }
    }, [student])

    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="student.saveStudent"/>}
        toggle={onToggleModal} 
        visible={open}
        closable={false}
        onOk={() => {
          if ( name === '' || mobile === '' || gender === '')
            return;
          onToggleModal("editStudentState");
          onSaveStudent({ id:student.id , name  ,  mobile , gender  , password });
          setName(name)
          setMobile(mobile)
          setGender(gender)
          setPassword('')
        }}
        onCancel={()=> {
          setName(student.name)
          setMobile(student.mobile)
          setGender(student.gender)
          setPassword('')
          onToggleModal('editStudentState')
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
                    value={name}
                    placeholder={placeholder}
                    onChange={(event) => setName( event.target.value)}
                    margin="none"/>
                   </Form.Item>
                  )
                }
            </FormattedMessage>
            </div>
            <div className="gx-form-group">
              <FormattedMessage id="columns.mobile" defaultMessage="name">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                  <Input
                  required
                  value={mobile}
                  placeholder={placeholder}
                  onChange={(event) => setMobile(event.target.value)}
                  margin="none"/>
                  </Form.Item>
                  )
                }
            </FormattedMessage>
            </div>

            <div className="gx-form-group">
              <FormattedMessage id="columns.password" defaultMessage="name">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                  <Input
                  required
                  type='password'
                  value={password}
                  placeholder={placeholder}
                  onChange={(event) => setPassword( event.target.value)}
                  margin="none"/>
                  </Form.Item>
                  )
                }
            </FormattedMessage>
            </div>
            <div className="gx-form-group">
              <Form.Item label={<IntlMessages id="columns.gender"/>}>
                 <RadioGroup value={gender} onChange={(e)=> {
                   console.log(e.target.value)
                   setGender(e.target.value)
                 }} options={options} />
              </Form.Item>
            </div>
            </Form>
          </div>
        </div>
      </Modal>
    );
}

export default React.memo(EditStudent);

EditStudent.propTypes = {
  student: PropTypes.object,
  open:PropTypes.bool,
  onToggleModal:PropTypes.func,
  onSaveStudent:PropTypes.func
};
