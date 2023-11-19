import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import classNames from "classnames";

const Button = ({ type, children, disabled, loading, ...other }) => {
  return (
    <button
      type={type}
      className={classNames(styles.button, { [styles.loading]: !!loading })}
      disabled={disabled}
      {...other}
    >
      {children && <span>{children}</span>}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  disabled: false,
  loading: false,
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
