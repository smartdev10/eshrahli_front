import React , { useState , useEffect } from "react";
import { Input, Modal , Select , Form } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

const Option = Select.Option;

const EditUser = ({ onSaveUser, onToggleModal, open, user }) => {
  
    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
      if(Object.keys(user).length !== 0){
        setName(user.name)
        setMobile(user.mobile)
        setRole(user.role)
        setUserName(user.username)
      }
    }, [user])

    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="user.saveUser"/>}
        toggle={onToggleModal} 
        visible={open}
        closable={false}
        onOk={() => {
          if (name === '' || username === '' || mobile === '' || role === '')
            return;
          onToggleModal("editUserState");
          onSaveUser({ id:user.id , name , mobile , username , role , password });
          setName(name)
          setMobile(mobile)
          setRole(role)
          setUserName(username)

        }}
        onCancel={()=> {
          onToggleModal('editUserState')
          setName(user.name)
          setMobile(user.mobile)
          setRole(user.role)
          setUserName(user.username)
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
                  type='text'
                  value={name}
                  placeholder={placeholder}
                  onChange={(event) => setName(event.target.value)}
                  margin="none"/>
                  </Form.Item>
                  )
                }
            </FormattedMessage>
            </div>
            <div className="gx-form-group">
              <FormattedMessage id="columns.username" defaultMessage="username">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                  <Input
                  required
                  value={username}
                  placeholder={placeholder}
                  onChange={(event) => setUserName(event.target.value)}
                  margin="none"/>
                  </Form.Item>
                  )
                }
            </FormattedMessage>
            </div>
            <div className="gx-form-group">
              <FormattedMessage id="columns.mobile" defaultMessage="mobile">
              {
                placeholder => (
                  <Form.Item rules={[{  pattern:/^[+]\d{3}\d{9}$/ , required: true , message: 'المرجو إدخال رقم هاتف صحيح' }]}   label={placeholder}>
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
              <FormattedMessage id="columns.password" defaultMessage="password">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                  <Input
                  required
                  type="password"
                  value={password}
                  placeholder={placeholder}
                  onChange={(event) => setPassword(event.target.value)}
                  margin="none"/>
                  </Form.Item>
                  )
                }
            </FormattedMessage>
            </div>
            <div className="gx-form-group">
              <FormattedMessage id="columns.role" defaultMessage="role">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                  <Select onChange={(value) => setRole(value)} placeholder={placeholder} className="gx-mb-3" value={role} style={{width: '100%'}} >
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

export default React.memo(EditUser);

EditUser.propTypes = {
  user: PropTypes.object,
  onSaveUser: PropTypes.func,
  onToggleModal: PropTypes.func,
  open: PropTypes.bool,
};
