import React, {useEffect} from "react";
import {Button , Form, Input ,Alert} from "antd";
import {useDispatch, useSelector} from "react-redux";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import {userSignIn} from "../appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import {Link} from "react-router-dom";
const FormItem = Form.Item;
import PropTypes from "prop-types";

const SignIn = (props) => {
  
  const dispatch = useDispatch();
  const {token} = useSelector(({auth}) => auth);
  const loading = useSelector(({common}) => common.loading);
  const error = useSelector(({common}) => common.error);

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = values => {
    console.log("finish",values)
    dispatch(userSignIn(values));
  };

  useEffect(() => {
    if (token !== null) {
      props.history.push('/');
    }
  },[props.history,token]);

  return (
    <div className="gx-login-container">
    <div className="gx-login-content">
      <div className="gx-login-header gx-text-center">
        <h1 className="gx-login-title"> <IntlMessages id="app.userAuth.signIn"/> </h1>
      </div>
      <div>
        {error &&  <Alert message={error === 'Password not Correct' ? 'كلمة المرور غير صحيحة' : error === 'Username not Correct' ? 'إسم المستخدم غير صحيح'  : error} banner closable/>}
      </div>
      <Form
        initialValues={{ remember: true }}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="gx-signin-form gx-form-row0">
        <FormItem  rules={[{ required: true, message: 'المرجو إدخال إسم المستخدم' }]} name="username">
            <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}  placeholder="المستخدم"/>
        </FormItem>
        <FormItem   rules= {[{required: true, message: 'المرجو إدخال كلمة المرور'}]}  name="password">
            <Input prefix={<LockOutlined  style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="كلمة المرور "/>
        </FormItem>
        <FormItem  name="remember" valuePropName="checked">
            <Link className="gx-login-form-forgot" to="/forgot-password"> <IntlMessages id="app.userAuth.forgotPassword"/></Link>
          </FormItem>
        <Form.Item>
          <Button loading={loading} type="primary" className="gx-mb-0" htmlType="submit">
            <IntlMessages id="app.userAuth.signIn"/>
          </Button>
        </Form.Item>
      </Form>
    </div> 
  </div>
  );
};

export default SignIn;


SignIn.propTypes = {
  history: PropTypes.object,
};