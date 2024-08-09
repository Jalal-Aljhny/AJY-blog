import Hero from "../../components/Hero";
import Post from "../../components/Post";
import { FaArrowRight } from "react-icons/fa";
import Footer from "../../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../../services/context/AuthContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { data } = useContext(AuthContext);
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
          <Link to={"/allposts"}>More aticles</Link>
          <FaArrowRight />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
