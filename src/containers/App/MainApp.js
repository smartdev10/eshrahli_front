import React from "react";
import { Layout } from "antd";
import InsideHeader from "../Topbar/InsideHeader/index";
import { footerText } from "util/config";
import App from "routes/index";
import { useRouteMatch } from "react-router-dom";

const {Content, Footer} = Layout;

const MainApp = () => {

  const match = useRouteMatch();

  return (
    <Layout className="gx-app-layout">
      <Layout>
       <InsideHeader/>
        <Content className="gx-layout-content gx-container-wrap">
          <App match={match}/>
          <Footer>
            <div className="gx-layout-footer-content">
              {footerText}
            </div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  )
};

export default MainApp;

