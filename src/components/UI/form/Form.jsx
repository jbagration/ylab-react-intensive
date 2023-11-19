import styles from "./Form.module.scss";

const Form = ({ children, onSubmit, ...other }) => (
<form onSubmit={onSubmit ? (e => onSubmit(e)) : undefined} className={styles.form} {...other}>
        {children}
    </form>
);

export default Form;