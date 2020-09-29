import React, { memo , useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { IntlProvider } from "react-intl";
import { SmileOutlined } from '@ant-design/icons';
import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import ForgotPassword from "../ForgotPassword";
import SignIn from "../SignIn";
import ResetPassword from "../Resetpassword";
import VerifyCode from "../VerifyCode";

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p>لا يوجد أي بيانات</p>
  </div>
);

const RestrictedRoute = ({component: Component, location, token, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      token
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: {from: location}
          }}
        />}
  />;


const App = () => {

  const { locale } = useSelector(({settings}) => settings);
  const {token, initURL} = useSelector(({auth}) => auth);

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();


  useEffect(() => {
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = "/css/style.css";
    link.className = 'gx-style';
    document.body.appendChild(link);
  });


  useEffect(() => {
    if (location.pathname === '/') {
      if (token === null) {
        history.push('/signin');
      } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
        history.push('/main/metrics');
      } else {
        history.push(initURL);
      }
    }
  }, [token, initURL, location, history]);

  const currentAppLocale = AppLocale[locale.locale];

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty} direction="rtl" locale={currentAppLocale.antd}>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
        <Switch>
          <Route exact path='/signin' component={SignIn}/>
          <Route exact path='/forgot-password' component={ForgotPassword}/>
          <Route exact path='/reset-password' component={ResetPassword}/>
          <Route exact path='/verify' component={VerifyCode}/>
          <RestrictedRoute path={`${match.url}`} token={token} location={location} component={MainApp}/>
        </Switch>
      </IntlProvider>
    </ConfigProvider>
  )
};

export default memo(App);
