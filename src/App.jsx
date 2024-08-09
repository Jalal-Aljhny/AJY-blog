import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import AllPosts from "./pages/AllPosts/AllPosts";
import SignIn from "./components/SignIn";
import "./index.css";
import SignUp from "./components/SignUp";
import { useContext, useEffect } from "react";
import { AuthContext } from "./services/context/AuthContext";
import Profile from "./components/Profile";
import Contactus from "./pages/contact us/Contactus";
import AddPost from "./pages/addPost/AddPost";
import NotFound from "./components/NotFound";
import Post from "./pages/post/Post";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/") {
      document.body.style.backgroundColor = "rgb(249, 252, 255)";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
  }, [location]);
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />

        {isAuth ? (
          <Route path="/addPost" element={<AddPost />} />
        ) : (
          <Route
            path="/addPost"
            element={<Navigate to={"/signin"} replace />}
          />
        )}
        <Route path="/allposts/:post_title" element={<Post />} />
        <Route path="/allposts" element={<AllPosts />} />

        {isAuth ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route
            path="/profile"
            element={<Navigate to={"/signin"} replace />}
          />
        )}
        {isAuth ? (
          <Route path="/contact" element={<Contactus />} />
        ) : (
          <Route
            path="/contact"
            element={<Navigate to={"/signin"} replace />}
          />
        )}
        {isAuth ? (
          <>
            <Route path="/signin" element={<Navigate to={"/"} />} />
            <Route path="/signup" element={<Navigate to={"/"} />} />
          </>
        ) : (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
