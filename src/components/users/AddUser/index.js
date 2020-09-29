import React from "react";
import { Input, Modal , Select , Form } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";

const Option = Select.Option;

class AddUser extends React.Component {
  constructor() {
    super()
    this.state = {
      name :'',
      username:'',
      mobile :'',
      role :'',
      password :'',
    }
  }

  render() {
    const { onAddUser, onToggleModal, open } = this.props;
    const { name , mobile , role , password , username } = this.state;
    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="user.addUser"/>}
        toggle={onToggleModal} visible={open}
        closable={false}
        onOk={() => {
          if (name === '' || username === '' || mobile === '' || role === '' || password === '')
            return;
          onToggleModal("addUserState");
          onAddUser({ name , username , mobile , role , password });
          this.setState({ name: '' , username: '' , mobile : '' ,  role : '' , password : '' })
        }}
        onCancel={()=> {
          onToggleModal("addUserState")
          this.setState({ name: '' , username: '' , mobile : '' ,  role : '' , password : '' })
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
              <FormattedMessage id="columns.username" defaultMessage="name">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                  <Input
                  required
                  value={username}
                  placeholder={placeholder}
                  onChange={(event) => this.setState({username: event.target.value})}
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
                  <Form.Item rules={[{  pattern:/^[+]\d{3}\d{9}$/ , required: true , message: 'المرجو إدخال رقم هاتف صحيح' }]}   label={placeholder}>
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
                  type='password'
                  required
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
              <FormattedMessage id="columns.role" defaultMessage="name">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                  <Select onChange={(value) => this.setState({role: value})} placeholder={placeholder} className="gx-mb-3"  style={{width: '100%'}} >
                    <Option value="admin"><IntlMessages id="option.admin"/></Option>
                    <Option value="superuser"><IntlMessages id="option.superuser"/></Option>
                  </Select>
                   </Form.Item>
                  )
                }
            </FormattedMessage>
            </div>
           </Form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddUser;
