import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies, CookiesProvider } from "react-cookie";
import { PropTypes } from "prop-types";
import axios from "axios";

axios.defaults.xsrfCookieName = "XSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState([]);
  const [addErrors, setAddErrors] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  const [user, setUser] = useState({
    name: null,
    email: null,
    date: null,
  });

  const [errors, setErrors] = useState({
    name: null,
    message: null,
  });
  const clearErrors = useCallback(() => {
    setErrors({
      name: null,
      message: null,
    });
  }, []);

  // get cookie if exists
  const getCookie = useCallback((name) => {
    // used useCallback react hook so function calculated only in first render (array of dependencies in empty)
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }, []);

  // Registeration function
  const register = useCallback(
    // used useCallback react hook so function does not need to recalculated until one of its dependencies update
    async (name, email, password) => {
      // get request to laravel Sanctum
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
        withXSRFToken: true,
      });
      // post request
      await axios
        .post(
          "http://127.0.0.1:8000/api/register",
          {
            name: name,
            email: email,
            password: password,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
            },
            withCredentials: true,
            withXSRFToken: true,
          }
        )
        .then((res) => {
          // if request succesfully
          console.log(res);
          setIsAuth(true);
          navigate("/");
          //navigate to root router and change auth state to true
          const expiration = new Date();
          expiration.setHours(48);
          setCookie("auth_token", res.data.token, {
            path: "/",
            expires: expiration,
          });
          setUser("user");
          //set cookie with expiration of 48 hours and change user state from null to "user"
        })
        .catch((error) => {
          //else set errors to show it to user and change auth state to false
          console.log("error : ", error);
          setIsAuth(false);
          setErrors({
            name: Object.keys(error?.response?.data?.errors)[0],
            message: Object.values(error?.response?.data?.errors)[0],
          });
        });
    },
    [getCookie, navigate, setCookie]
  );
  //Log In Function
  const logIn = useCallback(
    // used useCallback react hook so function does not need to recalculated until one of its dependencies update
    async (email, password) => {
      // get request to laravel Sanctum
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
        withXSRFToken: true,
      });
      // post request
      await axios
        .post(
          "http://127.0.0.1:8000/api/login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
            },
            withCredentials: true,
            withXSRFToken: true,
          }
        )
        .then((res) => {
          // if request succesfully
          setIsAuth(true);
          navigate("/");
          //navigate to root router and change auth state to true
          const expiration = new Date();
          expiration.setHours(48);
          setCookie("auth_token", res.data.token, {
            path: "/",
            expires: expiration,
          });
          setUser("user");
          //set cookie with expiration of 48 hours and change user state from null to "user"
        })
        .catch((error) => {
          console.log(error?.response?.data);
          setIsAuth(false);
          //else set errors to show it to user and change auth state to false
          if (Object.values(error?.response?.data)[1] == "validation error") {
            setErrors({
              name: "email",
              message: "This email is not found",
            });
          } else {
            setErrors({
              name: "mismatch",
              message: Object.values(error?.response?.data)[1],
            });
          }
        });
    },
    [getCookie, navigate, setCookie]
  );
  //SignOut function
  const signout = useCallback(() => {
    // used useCallback react hook so function does not need to recalculated until one of its dependencies update
    removeCookie("auth_token");
    removeCookie("XSRF-TOKEN");
    //remove cookies
    navigate("/");
    setUser(null);
    //remove user and navigate to root router
    window.location.reload();
    //reload page
  }, [removeCookie, navigate]);

  const profile = useCallback(async () => {
    await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
      withCredentials: true,
      withXSRFToken: true,
    });
    await axios
      .get("http://127.0.0.1:8000/api/profile", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      })
      .then((response) => {
        setUser({
          name: response.data.data.name,
          email: response.data.data.email,
          date: response.data.data.updated_at,
        });
      })
      .catch((error) => console.log("Profile error : ", error));
  }, [cookies.auth_token]);

  const addPost = useCallback(
    async (title, caption, img) => {
      // used useCallback react hook so function does not need to recalculated until one of its dependencies update
      const formData = new FormData();
      formData.append("title", title);
      formData.append("caption", caption);
      formData.append("img", img);

      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
        withXSRFToken: true,
      });

      // post request
      await axios
        .post("http://127.0.0.1:8000/api/posts", formData, {
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
            Authorization: `Bearer ${cookies.auth_token}`,
          },
          withCredentials: true,
          withXSRFToken: true,
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          if (err.message == "Request failed with status code 422")
            setAddErrors("unprocessable content");
          else {
            setAddErrors("permissions error");
          }
        });
    },
    [cookies, getCookie, navigate]
  );

  const getPosts = useCallback(async () => {
    await axios
      .get("http://127.0.0.1:8000/api/posts")
      //save posts to data state
      .then((res) => setData(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const getPostById = useCallback(async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/posts/${id}`);
    return response;
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts, addPost]);

  const serachInTitle = useCallback((title) => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/search?search=${title}`)
      .then((res) => console.log(res));
  }, []);

  useEffect(() => {
    // used useEffect react hook so function run every time that one of its dependencies update
    const authToken = getCookie("auth_token");
    if (authToken) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [cookies, getCookie]);

  return (
    <CookiesProvider>
      <AuthContext.Provider
        value={{
          isAuth,
          signout,
          register,
          errors,
          clearErrors,
          logIn,
          profile,
          user,
          getCookie,
          addPost,
          addErrors,
          data,
          getPostById,
          serachInTitle,
        }}
      >
        {children}
      </AuthContext.Provider>
    </CookiesProvider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
