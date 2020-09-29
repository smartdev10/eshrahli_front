import React from "react";

import Widget from "components/Widget/index";
import {connect} from "react-redux";

const IconWithTextCard = (props) => {
 const {icon, title, subTitle} = props;
 
  return (
    <Widget>
      <div className="gx-media gx-align-items-center gx-flex-nowrap">
        <div className="gx-mr-lg-4 gx-mr-3">
          <i className={`icon icon-${icon} gx-fs-xlxl gx-text-greenblue gx-d-flex `} style={{fontSize: 45}}/>
        </div>
        <div className="gx-media-body gx-mr-3">
          <h1 className="gx-fs-xxxl gx-font-weight-medium gx-mb-1">{title}</h1>
          <h2 className="gx-text-grey gx-mb-0">{subTitle}</h2>
        </div>
      </div>
    </Widget>
  );
};

const mapStateToProps = ({settings}) => {
  const {themeType} = settings;
  return {themeType}
};
export default connect(mapStateToProps, null)(IconWithTextCard);
