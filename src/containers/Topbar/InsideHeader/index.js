import React from "react";
import { Layout, Popover} from 'antd';
import {connect, useDispatch} from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";
import languageData from "../languageData";
import UserInfo from "components/UserInfo";
import HorizontalNav from "../HorizontalNav";
import {switchLanguage, toggleCollapsedSideNav} from "appRedux/actions/Setting";

const {Header} = Layout;


const InsideHeader = () => {

  const dispatch = useDispatch();

  // const locale = useSelector(({settings}) => settings.locale);
  // const {navCollapsed} = useSelector(({common}) => common);

  const languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language =>
          <li className="gx-media gx-pointer" key={JSON.stringify(language)} onClick={(e) =>
            dispatch(switchLanguage(language))
          }>
            {/* <i className={`flag flag-24 gx-ml-2 flag-${language.icon}`}/> */}
            <img className="gx-ml-1" style={{width:'24px' , height:'24px'}} src={require("../../../assets/vendors/flag/saudi-arabia.svg")} alt=""/>
            <span style={{textAlign:"center"}} className="gx-language-text gx-py-1">العربية</span>
          </li>
        )}
      </ul>
    </CustomScrollbars>);

 

  return (
    <div className="gx-header-horizontal gx-header-horizontal-dark gx-inside-header-horizontal">
      <Header className="gx-header-horizontal-main">
        <div className="gx-container">
          <div className="gx-header-horizontal-main-flex">
            <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
              <HorizontalNav/>
            </div>
            <ul className="gx-header-notifications">
              <li className="gx-language">
                <Popover overlayClassName="gx-popover-horizantal" placement='bottomLeft'  content={languageMenu()} trigger="click" >
                    <span className="gx-pointer">
                      <img  style={{width:'24px' , height:'24px'}} src={require("assets/vendors/flag/saudi-arabia.svg")} alt=""/>  
                    </span>
                </Popover>
              </li>
              <li className="gx-user-nav gx-mr-3"><UserInfo/></li>
            </ul>
          </div>
        </div>
      </Header>
    </div>
  );
};

const mapStateToProps = ({settings, common}) => {
  const {navCollapsed} = common;
  const {locale} = settings;
  return {locale, navCollapsed}
};
export default connect(mapStateToProps, {toggleCollapsedSideNav, switchLanguage})(InsideHeader);
