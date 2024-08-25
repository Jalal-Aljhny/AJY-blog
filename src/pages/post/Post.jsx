import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/context/AuthContext";
import styles from "./Post.module.css";
import parse from "html-react-parser";
import Progress from "./Progress";

const Post = () => {
  const [data, setData] = useState();
  const [progress, setProgress] = useState(0);

  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { getPostById, isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.pathname?.split("/").length > 0) {
      sessionStorage.setItem("previos_route", location.pathname);
    }
    if (Number(postId)) {
      getPostById(postId)
        .then((res) => {
          setData(res.data);
        })
        .catch(() => {
          navigate(`/${postId}`);
        });
    } else {
      navigate(`/${postId}`);
    }
  }, [getPostById, postId, location.pathname, navigate]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const windScroll = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress((windScroll / docHeight) * 100);
    });
  }, []);
  return (
    <>
      <Progress progress={progress} />
      <article className={`container`}>
        {data ? (
          <div className={styles.post}>
            {data.post.imgUrl ? (
              <div className={styles.image}>
                <img src={data.post.imgUrl} alt="post-image" />
              </div>
            ) : null}
            <h2
              className={
                data.post.imgUrl ? styles.title : styles.title_no_image
              }
            >
              {data.post.title}
            </h2>
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
    </>
  );
};

export default Post;
