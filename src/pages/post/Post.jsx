import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/context/AuthContext";
import styles from "./Post.module.css";
import parse from "html-react-parser";

const Post = () => {
  const [data, setData] = useState();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { getPostById, isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Number(postId)) {
      getPostById(postId)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [getPostById, postId]);
  return (
    <article className={`container`}>
      {data ? (
        <div className={styles.post}>
          <div className={styles.image}>
            <img src={data.post.imgUrl} alt="" />
          </div>
          <h2 className={styles.title}>{data.post.title}</h2>
          {isAuth ? (
            <div className={styles.body}>{parse(data.post.caption)}</div>
          ) : (
            <div className={styles.body}>
              {parse(
                data.post.caption
                  .split(" ")
                  .slice(0, 50)
                  .slice(0, -2)
                  .join(" ") +
                  " .................................................................."
              )}
              <button
                className={styles.btn}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up to continue reading
              </button>
            </div>
          )}
        </div>
      ) : null}
    </article>
  );
};

export default Post;
