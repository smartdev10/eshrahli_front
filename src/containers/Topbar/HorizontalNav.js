import React  from "react";
import {useSelector} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import { SettingFilled, UsergroupAddOutlined, HomeOutlined , FolderFilled , NotificationOutlined } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages"


const SubMenu = Menu.SubMenu;

const HorizontalNav = (props) => {

  const {pathname} = useSelector(({common}) => common);
 

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (

    <Menu
      defaultOpenKeys={[defaultOpenKeys]}
      selectedKeys={[selectedKeys]}
      mode="horizontal">
        
      <SubMenu icon={<HomeOutlined/>}  popupClassName={"gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve"} key="main"
               title={<IntlMessages id="sidebar.main"/>}>
        <Menu.Item key="main/metrics">
          <Link to="/main/metrics"><i className="gx-ml-2 icon icon-apps"/>
            <IntlMessages id="sidebar.metrics"/></Link>
        </Menu.Item>
        
        <Menu.Item key="users/teachers">
          <Link to="/users/teachers"><i className="gx-ml-2 icon icon-avatar"/>
            <IntlMessages id="sidebar.Teachers"/></Link>
         </Menu.Item>

         <Menu.Item key="users/students">
          <Link to="/users/students"><i className="gx-ml-2 icon icon-avatar"/>
              <IntlMessages id="sidebar.Students"/></Link>
         </Menu.Item>
      </SubMenu>

      <SubMenu icon={<NotificationOutlined />} popupClassName={"gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve"} key="requests"
              title={<IntlMessages id="sidebar.Requests"/>}>
          <Menu.Item key="requests/index">
          <Link to="/requests/index"><i className="gx-ml-2 icon icon-alert"/>
            <IntlMessages id="sidebar.Requests"/></Link>
          </Menu.Item>
      </SubMenu>
      
      <SubMenu icon={<UsergroupAddOutlined/>} popupClassName={"gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve"} key="users"
              title={<IntlMessages id="sidebar.Users"/>}>
          <Menu.Item key="users/members">
          <Link to="/users/members"><i className="gx-ml-2 icon icon-avatar"/>
            <IntlMessages id="sidebar.Users"/></Link>
          </Menu.Item>
      </SubMenu>


      <SubMenu icon={<FolderFilled/>} popupClassName={"gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve"} key="cms" title={<IntlMessages id="sidebar.Cms"/>}>
       
       <Menu.Item key="cms/pages">
        <Link to="/cms/pages"><i className="gx-ml-2 icon icon-editor"/>
          <IntlMessages id="sidebar.Pages"/></Link>
       </Menu.Item>

       <Menu.Item key="messages">
        <Link to="/messages"> <i className="gx-ml-2 icon icon-chat-new"/>
          <IntlMessages id="sidebar.Messages"/></Link>
       </Menu.Item>

      </SubMenu>
      
      <SubMenu icon={<SettingFilled/>} popupClassName={"gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve"} key="settings" title={<IntlMessages id="sidebar.Settings"/>}>
       

         <Menu.Item key="settings/levels">
          <Link to="/settings/levels"><i className="gx-ml-2 icon icon-graduation"/>
              <IntlMessages id="sidebar.Levels"/></Link>
         </Menu.Item>


         <Menu.Item key="settings/subjects">
          <Link to="/settings/subjects"><i className="gx-ml-2 icon icon-files"/>
            <IntlMessages id="sidebar.Materials"/></Link>
         </Menu.Item>

       

         <Menu.Item key="settings/nationalities">
          <Link to="/settings/nationalities"><i className="gx-ml-2 icon icon-translation"/>
            <IntlMessages id="sidebar.Nationalities"/></Link>
         </Menu.Item>

         <Menu.Item key="settings/cities">
          <Link to="/settings/cities"><i className="gx-ml-2 icon  icon-map-drawing"/>
              <IntlMessages id="sidebar.Cities"/></Link>
         </Menu.Item>

         <Menu.Item key="settings/coupons">
          <Link to="/settings/coupons"><i className="gx-ml-2 icon  icon-ticket-new"/>
              <IntlMessages id="sidebar.Coupons"/></Link>
         </Menu.Item>

         
         <Menu.Item key="settings/general">
          <Link to="/settings/general"><i className="gx-ml-2 icon  icon-extra-components"/>
              <IntlMessages id="sidebar.General"/></Link>
         </Menu.Item>

      </SubMenu>
    
    </Menu>

  );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;

