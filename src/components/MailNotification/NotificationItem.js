import React from "react";
import IntlMessages from "util/IntlMessages"

const NotificationItem = ({notification}) => {
  const {name, time, message} = notification;
  return (
    <li dir="rtl" className="gx-media">
      <div className="gx-media-body">
        <div className="gx-flex-row gx-justify-content-between gx-align-items-center">
          <h5 className="gx-text-capitalize gx-user-name gx-mb-0"><span className="gx-link">{name}</span></h5>
          <span className="gx-meta-date"><small>{time}</small></span>
        </div>
        <p className="gx-fs-sm">{message}</p>
        <span className="gx-btn gx-btn-sm gx-top2 gx-text-muted"><i
          className="icon icon-custom-view gx-pr-2"/><IntlMessages id="Messages.Read"/></span>
      </div>
    </li>
  );
};

export default NotificationItem;
