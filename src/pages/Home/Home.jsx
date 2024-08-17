import Hero from "../../components/Hero";
import Post from "../../components/Post";
import { FaArrowRight } from "react-icons/fa";
import Footer from "../../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../../services/context/AuthContext";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
const Home = () => {
  const { sendData: data, mode, handleMode } = useContext(AuthContext);

  return (
    <>
      <main>
        <Hero />

        <section
          className="container posts_container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill , minmax(300px , 1fr))",
            gap: "2rem 1.5rem ",
            marginBlock: "3rem",
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
        </section>
        {mode == "search" && data?.posts?.length == 0 ? (
          <small
            className="error"
            style={{ marginInline: "auto", display: "block" }}
          >
            No post title conatains any word you entered ..!
          </small>
        ) : null}
        <div className="btn">
          <Link to={"/posts"}>More aticles</Link>
          <FaArrowRight />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
