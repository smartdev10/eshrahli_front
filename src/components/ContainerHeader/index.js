import React from "react";
import PropTypes from 'prop-types'

const ContainerHeader = ({title}) => {
  return (
    <div className="gx-page-heading">
      <h2 className="gx-page-title">{title}</h2>
    </div>
  )
};

export default ContainerHeader;


ContainerHeader.propTypes = {
  title: PropTypes.string,
};