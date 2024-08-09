import PropTypes from "prop-types";
import styles from "./Post.module.css";
import useDate from "../hooks/useDate";
import { Link } from "react-router-dom";

const Post = ({ image, title, date, id }) => {
  return (
    <Link to={`posts/${id}`} className={styles.card}>
      <img src={image} alt="Post image" />
      <p>{title}</p>
      <div>
        <small>Last update : {useDate(date)}</small>
      </div>
    </Link>
  );
};

Post.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number,
  date: PropTypes.string,
};
export default Post;
