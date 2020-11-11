import React from "react";
import loader from "../../assets/images/loader.svg"
import PropTypes from "prop-types";

const CircularProgress = ({className}) => <div className={`loader ${className}`}>
  <img src={loader} alt="loader"/>
</div>;
export default CircularProgress;


CircularProgress.propTypes = {
  className: PropTypes.string,
};