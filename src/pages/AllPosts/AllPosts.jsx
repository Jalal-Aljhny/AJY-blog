import { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { AuthContext } from "../../services/context/AuthContext";
import Post from "../../components/Post";

const AllPosts = () => {
  const { data } = useContext(AuthContext);

  return (
    <>
      <section
        className="container posts_container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill , minmax(300px , 1fr))",
          gap: "2rem 1.5rem ",
          marginBlock: "2rem",
          justifyContent: "center",
        }}
      >
        {data?.posts?.length > 0
          ? data.posts.map((post) => {
              return (
                <Post
                  title={post.title}
                  image={post.imgUrl}
                  id={post.id}
                  date={post.updated_at}
                  userId={post.user_id}
                  key={post.id}
                />
              );
            })
          : null}
      </section>
      <div className="btn">
        <button>More aticles</button>
        <FaArrowRight />
      </div>
    </>
  );
};

export default AllPosts;
