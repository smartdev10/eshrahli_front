import React , { useEffect , useState } from "react";
import {Button, Form, Input , message , Alert} from "antd";
import IntlMessages from "util/IntlMessages";
import jwtDecode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux";
import {userResetPassword} from "appRedux/actions/Auth";
import { FETCH_ERROR } from "../../constants/ActionTypes";

const FormItem = Form.Item;


const ResetPassword = (props) => {

  const [decoded, setDecodedToken] = useState(null)
  const {token_verify} = useSelector(({auth}) => auth);

  const loading = useSelector(({common}) => common.loading);

  const error = useSelector(({common}) => common.error);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: FETCH_ERROR, payload: ''});
  },[dispatch])

  useEffect(()=>{
    if(token_verify !== null){
      setDecodedToken(jwtDecode(token_verify))
    }else{
      props.history.push('/signin');
    }
  },[props.history ,token_verify])

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = ({password , confirm}) => {
    if(password !== confirm){
      message.error('كلمات المرور غير متطابقة')
    }else{
      if(decoded){
        dispatch(userResetPassword({password,mobile:decoded.mobile}));
      }else{
        props.history.push('/signin')
      }
    }
  };

  return (
    <div className="gx-login-container">
      <div className="gx-login-content">

        <div  dir="rtl" className="gx-mb-4">
          <h2>استعادة كلمة المرور</h2>
          <p><IntlMessages id="appModule.enterPasswordReset"/></p>
        </div>
        <div>
        {error &&  <Alert message={error === 'User Not Found' ? 'رقم الهاتف غير موجود' : 'حصل عطل المرجو المحاولة من جديد'} banner closable/>}
        </div>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="gx-signin-form gx-form-row0">

          <FormItem rules={ [{required: true, message: 'أدخل كلمة المرور الجديدة'}]} name="password">
                 <Input
                  className='gx-input-lineheight'
                  type='password'
                  required
                  placeholder="كلمة المرور"
                  margin="none"/>
          </FormItem>

          <FormItem rules={ [{required: true, message: 'المرجو تأكيد كلمة المرور'}]} name="confirm">
                 <Input
                  className='gx-input-lineheight'
                  type='password'
                  required
                  placeholder='تأكيد كلمة المرور'
                  margin="none"/>
          </FormItem>

          <FormItem>
            <Button loading={loading} type="primary" htmlType="submit">
              <IntlMessages id="app.userAuth.reset"/>
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;