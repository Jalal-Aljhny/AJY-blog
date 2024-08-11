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
import ChangeProfile from "./components/ChangeProfile";
import Post from "./pages/post/Post";
import EditPost from "./components/EditPost";
import MangeUsers from "./pages/mange users/MangeUsers";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/") {
      document.body.style.backgroundColor = "rgb(249, 252, 255)";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
  }, [location]);
  const { isAuth, user } = useContext(AuthContext);

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
        {isAuth ? (
          <Route path="/changeProfile" element={<ChangeProfile />} />
        ) : (
          <Route
            path="/changeProfile"
            element={<Navigate to={"/signin"} replace />}
          />
        )}
        <Route
          path="/editpost/:post_id"
          element={
            isAuth && user?.permissions?.includes("Edit Post") ? (
              <EditPost />
            ) : (
              <NotFound />
            )
          }
        />
        <Route
          path="/manageUsers"
          element={
            isAuth &&
            user?.permissions?.includes("Edit User") &&
            user?.permissions?.includes("Delete User") ? (
              <MangeUsers />
            ) : (
              <NotFound />
            )
          }
        />
        <Route path="/posts/:post_title" element={<Post />} />
        <Route path="/posts" element={<AllPosts />} />

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
