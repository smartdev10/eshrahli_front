import React from "react";
import { Input, Modal  , Radio , Form , message  } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

const RadioGroup = Radio.Group;

const options = [
  {label: 'ذكر', value: 'male'},
  {label: 'أنثى', value: 'female'},
];
class AddStudent extends React.Component {

  state = {
    name :'',
    mobile :'',
    gender :'',
    password :'',
  }

  render() {
    const { onAddStudent, onToggleModal, open } = this.props;
    const { name , mobile , gender , password   } = this.state;
   
    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="student.addStudent"/>}
        toggle={onToggleModal} visible={open}
        closable={false}
        onOk={() => {
          if (name === '' || mobile === '' || gender === '' || password === ''){
            message.error('المرجو إدخال المعلومات المطلوبة')
          }else{
            onToggleModal("addStudentState");
            onAddStudent({ name , mobile , gender , password });
            this.setState({ name: '' , mobile : '' ,  gender : '' , password : ''})
          }
        }}
        onCancel={()=> {
          onToggleModal("addStudentState")
          this.setState({ name: '' , mobile : '' ,  gender : '' , password : ''})
        }}>

        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
          <Form labelCol={{span:6}} wrapperCol={{span:14}}>
            <div className="gx-form-group">
              <FormattedMessage id="columns.name" defaultMessage="name">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                    <Input
                    required
                    value={name}
                    placeholder={placeholder}
                    onChange={(event) => this.setState({name: event.target.value})}
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
                  onChange={(event) => this.setState({mobile: event.target.value})}
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
                  onChange={(event) => this.setState({password: event.target.value})}
                  margin="none"/>
                  </Form.Item>
                  )
                }
            </FormattedMessage>
            </div>
            <div className="gx-form-group">
              <Form.Item label={<IntlMessages id="columns.gender"/>}>
                 <RadioGroup  onChange={(e)=> {
                   this.setState({gender: e.target.value})
                 }} options={options} />
              </Form.Item>
            </div>
            </Form>
          </div>
        </div>
      </Modal>
    );
  }
}


export default AddStudent


AddStudent.propTypes = {
  onAddStudent: PropTypes.func,
  onToggleModal: PropTypes.func,
  open: PropTypes.bool,
};
