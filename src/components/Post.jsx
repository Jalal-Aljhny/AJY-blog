import PropTypes from "prop-types";
import styles from "./Post.module.css";
import useDate from "../hooks/useDate";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../services/context/AuthContext";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Post = ({ image, title, date, id }) => {
  const { user, profile, deletePost } = useContext(AuthContext);
  const isMount = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isMount.current && user.name) {
      profile();
      isMount.current = true;
    }
    if (location?.pathname?.split("/").length > 0) {
      sessionStorage.setItem("previos_route", location.pathname);
    }
  }, [profile, user, location.pathname]);

  return (
    <Link to={`/posts/${id}`} className={styles.card}>
      <img src={image} alt="Post image" />
      <p>{title}</p>
      <div className={styles.permissions}></div>
      <div>
        {user?.permissions?.includes("Edit Post") ? (
          <small
            className={styles.edit}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/editpost/${id}`);
            }}
          >
            <FaEdit size={20} />
          </small>
        ) : null}

        {user?.permissions?.includes("Delete Post") ? (
          <small
            className={styles.delete}
            onClick={(e) => {
              e.preventDefault();
              deletePost(id);
            }}
          >
            <MdDeleteForever size={20} />
          </small>
        ) : null}
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
