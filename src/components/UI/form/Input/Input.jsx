import styles from "./Input.module.scss";
import classNames from "classnames";

import PropTypes from 'prop-types';

const Input = ({ type, className, onChange = () => {}, ...other }) => (
    <input
        type={type}
        onChange={onChange}
        className={classNames(styles.input, className)}
        {...other}
    />
);

Input.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

export default Input;
