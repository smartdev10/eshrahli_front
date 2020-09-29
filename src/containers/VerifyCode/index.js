import React ,{useEffect} from "react";
import {Button, Form, Input , Alert} from "antd";
import IntlMessages from "util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {userVerifyCode} from "appRedux/actions/Auth";
import { useLocation } from "react-router-dom";
import { FETCH_ERROR } from "../../constants/ActionTypes";

const FormItem = Form.Item;


const VerifyCode = (props) => {

  const loading = useSelector(({common}) => common.loading);
  const error = useSelector(({common}) => common.error);
  const location = useLocation()
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch({type: FETCH_ERROR, payload: ''});
  },[dispatch])

  
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
 
  const onFinish = values => {
    console.log(location.state.mobile)
    console.log("Received values of form",values)
    dispatch(userVerifyCode({...values,mobile:location.state.mobile}));
  };

  return (
    <div className="gx-login-container">
      <div className="gx-login-content">

        <div dir="rtl" className="gx-mb-4">
          <h2>أدخل الرمز المكون من 4 أرقام الذي تلقيته عبر الرسالة القصيرة</h2>
        </div>
        <div>
          {error &&  <Alert message={ error === 'User Not Found' ? '' : error === 'Code is Not Valid' ? 'الرمز الذي أدخلتم غير مطابق' :'حصل عطل المرجو المحاولة من جديد'} banner closable/>}
        </div>
        <Form
          initialValues={{ remember: true }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="gx-signin-form gx-form-row0">
            
          <FormItem name="code" rules={[{ pattern:/^\d{4}$/ , required: true, message: 'المرجو إدخال الرمز المكون من 4 أرقام' }]}>
                 <Input
                  className='gx-input-lineheight'
                  type='text'
                  required
                  placeholder='الرمز'
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

export default VerifyCode
