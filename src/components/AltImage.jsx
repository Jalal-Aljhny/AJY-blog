import PropTypes from "prop-types";
import styles from "./Post.module.css";

const AltImage = ({ postTitle }) => {
  return <span className={styles.alt_image}>{postTitle}</span>;
};
AltImage.propTypes = {
  postTitle: PropTypes.string,
};
export default AltImage;
