import React, { useEffect } from "react";
import {Button, Form, Input , Alert} from "antd";
import IntlMessages from "util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {userForgotPassword} from "appRedux/actions/Auth";
import { FETCH_ERROR } from "../../constants/ActionTypes";
const FormItem = Form.Item;


const ForgotPassword = () => {

  const loading = useSelector(({common}) => common.loading);

  const error = useSelector(({common}) => common.error);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: FETCH_ERROR, payload: ''});
  },[dispatch])

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = values => {
    console.log("Received values of form",values)
    dispatch(userForgotPassword(values));
  };

  return (
    <div className="gx-login-container">
      <div className="gx-login-content">

        <div dir="rtl" className="gx-mb-4">
          <h2><IntlMessages id="app.userAuth.forgotPassword"/> ؟</h2>
        </div>
        <div>
          {error &&  <Alert message={error === 'User Not Found' ? 'رقم الهاتف غير موجود' : 'حصل عطل المرجو المحاولة من جديد'} banner closable/>}
        </div>
        <Form
          initialValues={{ remember: true }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="gx-signin-form gx-form-row0">
            
          <FormItem name="mobile" rules={[{  pattern:/^[+]\d{3}\d{9}$/ , required: true, message: 'المرجو إدخال رقم هاتف صحيح' }]}>
                 <Input
                  className='gx-input-lineheight'
                  type='text'
                  required
                  placeholder='رقم الهاتف'
                  margin="none"/>
          </FormItem>

          <FormItem>
            <Button loading={loading} type="primary" htmlType="submit">
              <IntlMessages id="app.userAuth.send"/>
            </Button>
          </FormItem>
          
        </Form>

      </div>
    </div>
  );
}

export default ForgotPassword
