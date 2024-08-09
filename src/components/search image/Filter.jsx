import styles from "./Filter.module.css";
import PropTypes from "prop-types";

const Filter = ({ children, ...props }) => {
  return (
    <p
      className={styles.btn}
      {...props}
      style={{ fontSize: "0.75rem", padding: "0.5rem" }}
    >
      {children}
    </p>
  );
};
Filter.propTypes = {
  children: PropTypes.string.isRequired,
  props: PropTypes.string,
};

export default Filter;
