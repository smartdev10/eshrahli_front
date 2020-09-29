import React , {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Popover , Modal , Input, Divider, message  } from "antd";
import {userSignOut} from "appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages"
import { SaveFilled , UserOutlined } from "@ant-design/icons";
import { UpdateUser  } from "../../appRedux/actions/Users";
import { FormattedMessage } from "react-intl";


const UserInfo = () => {

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)


  const user = useSelector(({auth}) => auth.authUser);


  const [name, setName] = useState('')
  const [username, setUserName] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirm] = useState('')


  useEffect(()=>{
    if(user){
      setName(user.name)
      setUserName(user.username)
      setMobile(user.mobile)
    }
  },[user])

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li onClick={()=> setVisible(true)}><IntlMessages id="InsideBar.account"/></li>
      <li onClick={() => dispatch(userSignOut())}><IntlMessages id="InsideBar.logout"/></li>
    </ul>
  );

  return (
   <div>
    <Popover overlayClassName="gx-popover-horizantal" placement='bottomLeft' content={userMenuOptions} trigger="click">
       <Avatar  icon={<UserOutlined />} className="gx-avatar gx-pointer" alt=""/>
    </Popover>
     <Modal
      confirmLoading={loading}
      okText={<SaveFilled />}
      cancelText={ <IntlMessages id="modal.cancelSave"/> }
      title='حسابي'
      visible={visible}
      onOk={async () => {
        if(user){
            if(password === confirmPass){
               setLoading(true)
               await dispatch(UpdateUser({data:{ id:user.userId , name, username , mobile , password }})) 
               message.success('تم التعديل')
               setLoading(false)
            }else{
              message.error('كلمات المرور غير متطابقة')
            }
        }
      }}
      onCancel={()=> {
        setVisible(false)
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
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  margin="none"/>
              )
            }
         </FormattedMessage>
          </div>
          <div className="gx-form-group">
          <FormattedMessage id="columns.username" defaultMessage="name">
              {
                placeholder => (
                <Input
                  placeholder={placeholder}
                  value={username}
                  onChange={(event) => setUserName(event.target.value)}
                  margin="normal"/>
              )
            }
          </FormattedMessage>
          </div>
          <div className="gx-form-group">
          <FormattedMessage id="columns.mobile" defaultMessage="name">
              {
                    placeholder => (
                <Input
                  placeholder={placeholder}
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                  margin="normal"
                />
            )
          }
        </FormattedMessage>
          </div>

           <Divider  type="vertical" />

          <div className="gx-form-group">
          <FormattedMessage id="columns.password" defaultMessage="password">
              {
                    placeholder => (
                    <Input
                      placeholder={placeholder}
                      value={password}
                      type='password'
                      onChange={(event) => setPassword(event.target.value)}
                      margin="normal"
                    />
              )
            }
          </FormattedMessage>
          </div>
          <div className="gx-form-group">
          <FormattedMessage id="columns.repassword" defaultMessage="repassword">
              {
                    placeholder => (
                  <Input
                    placeholder={placeholder}
                    value={confirmPass}
                    type='password'
                    onChange={(event) => setConfirm(event.target.value)}
                    margin="normal"
                  />
            )
          }
        </FormattedMessage>
          </div>
        </div>
      </div>
     </Modal>
   </div> 
  )

}

export default UserInfo;
