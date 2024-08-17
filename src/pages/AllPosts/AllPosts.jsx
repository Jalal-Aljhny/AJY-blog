import { useContext, useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { AuthContext } from "../../services/context/AuthContext";
import Post from "../../components/Post";
import styles from "../../components/Hero.module.css";
import { IoClose, IoSearch } from "react-icons/io5";

const AllPosts = () => {
  const {
    sendData: data,
    mode,
    handleMode,
    serachInTitle,
    fetchNextPage,
    nextData,
  } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const divObserver = useRef(null);

  useEffect(() => {
    const testDiv = divObserver.current;

    const observer = new IntersectionObserver((entry) => {
      const testerDiv = entry[0];
      if (testerDiv.isIntersecting) {
        fetchNextPage();
      }
    }, {});

    if (divObserver.current) {
      observer.observe(testDiv);
    }
    return () => {
      observer.unobserve(testDiv);
    };
  }, [data, divObserver, fetchNextPage]);

  return (
    <>
      <div style={{ marginBlock: "3rem 8rem" }}>
        <div className={styles.search}>
          <IoSearch className={styles.search__icon} />
          <input
            type="text"
            placeholder="Search article"
            className={styles.search__field}
            value={value}
            onChange={(e) => {
              if (e.currentTarget.value.length == 0) {
                handleMode("normal");
              }
              setValue(e.currentTarget.value);
            }}
          />
          <button
            type="submit"
            className={styles.search__submit}
            onClick={() => {
              if (value.length > 0) {
                serachInTitle(value);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <section
        className="container posts_container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill , minmax(300px , 1fr))",
          gap: "2rem 1.5rem ",
          marginBlock: "5rem",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {mode == "search" ? (
          <small
            className="close_btn"
            onClick={() => {
              handleMode("normal");
            }}
          >
            <IoClose size={20} />
          </small>
        ) : null}
        {data?.posts?.length > 0
          ? data.posts.map((post) => {
              return (
                <Post
                  title={post.title}
                  image={post.imgUrl}
                  id={post.id}
                  date={post["Last Update"]}
                  userId={post.user_id}
                  key={post.id}
                />
              );
            })
          : null}
        <div ref={divObserver}></div>
      </section>
      {mode == "search" && data?.posts?.length == 0 ? (
        <small
          className="error"
          style={{ marginInline: "auto", display: "block" }}
        >
          No post title conatains any word you entered ..!
        </small>
      ) : null}
      {mode == "normal" ? (
        <div
          className="btn"
          onClick={() => {
            fetchNextPage();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {nextData ? (
            <>
              <button>More aticles</button>
              <FaArrowRight />
            </>
          ) : (
            <button disabled style={{ cursor: "not-allowed" }}>
              No More aticles
            </button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default AllPosts;
