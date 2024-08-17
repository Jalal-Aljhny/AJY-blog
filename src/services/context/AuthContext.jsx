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
  const [updatePostErrors, setUpdatePostErrors] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  const [user, setUser] = useState({
    name: null,
    email: null,
    date: null,
  });
  const [mode, setMode] = useState("normal");
  const [sendData, setSendData] = useState([]);
  const [filterdData, setFilterdData] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [changeMode, setChangeMode] = useState();
  const [changePasswordState, setChangePasswordState] = useState({});
  const [nextData, setNextData] = useState(true);

  useEffect(() => {
    if (mode == "normal") {
      setSendData(data);
    } else {
      setSendData(filterdData);
    }
  }, [data, filterdData, mode, sendData]);

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
  const validateUserName = useCallback((username) => {
    const re = /^[a-zA-Z]/;
    return re.test(username);
  }, []);
  const validateMessage = useCallback((message) => {
    if (message.length < 50 || message.length >= 500) {
      return false;
    } else {
      return true;
    }
  }, []);

  // get cookie if exists
  const getCookie = useCallback((name) => {
    // used useCallback react hook so function calculated only in first render (array of dependencies in empty)
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }, []);

  const profile = useCallback(async () => {
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
          date: response.data.data.created_at,
          permissions: response.data.data.permissions,
        });
      })
      .catch((error) => console.log("Profile error : ", error));
  }, [cookies.auth_token]);
  const changeName = useCallback(
    async (newName) => {
      await axios
        .patch(
          "http://127.0.0.1:8000/api/profile",
          {
            name: newName,
          },
          {
            headers: {
              Accept: "application/json",
              "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
              Authorization: `Bearer ${cookies.auth_token}`,
            },
          }
        )
        .then(() => {
          profile();
          navigate("/profile");
        })
        .catch((error) => console.log("change name error : ", error));
    },
    [cookies.auth_token, getCookie, navigate, profile]
  );
  const changePassword = useCallback(
    async (password, newPassword, confirmNewPassword) => {
      await axios
        .patch(
          "http://127.0.0.1:8000/api/profile/update-password",
          {
            password: password,
            new_password: newPassword,
            new_password_confirmation: confirmNewPassword,
          },
          {
            headers: {
              Accept: "application/json",
              "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
              Authorization: `Bearer ${cookies.auth_token}`,
            },
          }
        )
        .then(() => {
          setChangePasswordState("success");
        })
        .catch(() => setChangePasswordState("failure"));
    },
    [cookies.auth_token, getCookie]
  );
  const clearChangePasswordState = useCallback(() => {
    setChangePasswordState("");
  }, []);
  const getPosts = useCallback(async () => {
    await axios
      .get("http://127.0.0.1:8000/api/posts")
      //save posts to data state
      .then((res) => {
        setData(res.data);
        setMode("normal");
        setPagination(1);
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const fetchNextPage = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/posts?page=${pagination + 1}`)
      .then((res) => {
        if (Object.values(res.data.posts)[0]?.id) {
          setData({ ...data, posts: [...data.posts, ...res.data.posts] });
          setPagination(pagination + 1);
        } else {
          setNextData(false);
        }
        setMode("normal");
      })
      .catch((err) => console.log(err.message));
  };

  const getPostById = useCallback(async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/posts/${id}`);
    return response;
  }, []);

  const updatePostById = useCallback(
    async (id, title, caption, img) => {
      const formData = new FormData();
      formData.append("_method", "put");
      formData.append("title", title);
      formData.append("caption", caption);
      if (img) {
        formData.append("img", img);
      }

      // post request
      await axios
        .post(`http://127.0.0.1:8000/api/posts/${id}`, formData, {
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
            Authorization: `Bearer ${cookies.auth_token}`,
          },
          withCredentials: true,
          withXSRFToken: true,
        })
        .then(() => {
          if (sessionStorage.getItem("previos_route")) {
            navigate(sessionStorage.getItem("previos_route"));
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setUpdatePostErrors(err.message);
        });
    },
    [cookies.auth_token, getCookie, navigate]
  );

  const addPost = useCallback(
    async (title, caption, img) => {
      // used useCallback react hook so function does not need to recalculated until one of its dependencies update
      const formData = new FormData();
      formData.append("title", title);
      formData.append("caption", caption);
      formData.append("img", img);

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
  const deletePost = useCallback(
    async (id) => {
      await axios
        .delete(`http://127.0.0.1:8000/api/posts/${id}`, {
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
            Authorization: `Bearer ${cookies.auth_token}`,
          },
          withCredentials: true,
          withXSRFToken: true,
        })
        .then(() => {
          setData({
            ...data,
            posts: [...data.posts.filter((post) => post.id != id)],
          });
          if (sessionStorage.getItem("previos_route")) {
            navigate(sessionStorage.getItem("previos_route"));
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [cookies, getCookie, navigate, data]
  );

  const serachInTitle = useCallback((title) => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/search?search=${title}`)
      .then((res) => {
        setFilterdData(res.data);
        setMode("search");
      });
  }, []);

  const handleMode = useCallback((mode) => {
    setMode(mode);
  }, []);
  const handleChangeMode = useCallback((mode) => {
    setChangeMode(mode);
  }, []);
  // Registeration function
  const register = useCallback(
    // used useCallback react hook so function does not need to recalculated until one of its dependencies update
    async (name, email, password, password2) => {
      // get request to laravel Sanctum
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
        withXSRFToken: true,
      });
      // post request
      console.table(name, email, password, password2);
      await axios
        .post(
          "http://127.0.0.1:8000/api/register",
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: password2,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
              "X-Requested-With": "XMLHttpRequest",
            },
            withCredentials: true,
            withXSRFToken: true,
          }
        )
        .then((res) => {
          // if request succesfully
          setIsAuth(true);
          if (sessionStorage.getItem("previos_route")) {
            navigate(sessionStorage.getItem("previos_route"));
          } else {
            navigate("/");
          }
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
          console.log(
            "error : ",
            error?.response?.data?.errors,
            error?.response?.data?.errors
          );
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
          if (sessionStorage.getItem("previos_route")) {
            navigate(sessionStorage.getItem("previos_route"));
          } else {
            navigate("/");
          }
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
  const signout = useCallback(async () => {
    // await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
    //   withCredentials: true,
    //   withXSRFToken: true,
    // });
    // await axios
    //   .post("http://127.0.0.1:8000/api/logout", {
    //     headers: {
    //       Accept: "application/json",
    //       Authorization: `Bearer ${cookies.auth_token}`,
    //     },
    //     withCredentials: true,
    //     withXSRFToken: true,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     console.log("log out success");
    setUser(null);
    setIsAuth(false);
    removeCookie("auth_token", { path: "/" });
    removeCookie("XSRF-TOKEN");
    //remove cookies
    navigate("/");
    // })
    // .catch((err) => {
    //   console.log("error message :", err);
    // });
    //remove user and navigate to root router
    window.location.reload();
    //reload page
  }, [removeCookie, navigate]);

  useEffect(() => {
    // used useEffect react hook so function run every time that one of its dependencies update
    const authToken = getCookie("auth_token");
    if (authToken) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [cookies, getCookie, user]);
  useEffect(() => {
    getPosts();
  }, [getPosts, addPost]);

  const getUsers = useCallback(async () => {
    return await axios.get("http://127.0.0.1:8000/api/users", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${cookies.auth_token}`,
      },
    });
  }, [cookies]);

  const deleteUser = useCallback(
    async (id) => {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
        withXSRFToken: true,
      });

      await axios
        .delete(`http://127.0.0.1:8000/api/users/${id}`, {
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
            Authorization: `Bearer ${cookies.auth_token}`,
          },
          withCredentials: true,
          withXSRFToken: true,
        })
        .then(() => {
          getUsers();
          navigate("/manageUsers");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [cookies, getCookie, navigate, getUsers]
  );
  const updateUser = useCallback(
    async (id, name, role) => {
      await axios
        .post(
          `http://127.0.0.1:8000/api/users/${id}`,
          {
            _method: "put",
            name: name,
            roles: role,
          },
          {
            headers: {
              Accept: "application/json",
              "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
              Authorization: `Bearer ${cookies.auth_token}`,
            },
            withCredentials: true,
            withXSRFToken: true,
          }
        )
        .then(() => {
          getUsers();
          navigate("/manageUsers");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [cookies, getCookie, navigate, getUsers]
  );
  const getUserRoles = useCallback(
    (id) => {
      return axios.get(`http://127.0.0.1:8000/api/users/${id}/edit`, {
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          Authorization: `Bearer ${cookies.auth_token}`,
        },
        withCredentials: true,
        withXSRFToken: true,
      });
    },
    [cookies, getCookie]
  );
  const getUserInfo = useCallback(
    (id) => {
      return axios.get(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          Authorization: `Bearer ${cookies.auth_token}`,
        },
        withCredentials: true,
        withXSRFToken: true,
      });
    },
    [cookies.auth_token, getCookie]
  );

  // const getRoles = useCallback(async () => {
  //   await axios
  //     .get("http://127.0.0.1:8000/api/roles", {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${cookies.auth_token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setHtml(response.data);
  //     })
  //     .catch((error) => console.log("Roles error : ", error));
  // }, [cookies]);
  // getRules();
  return (
    <CookiesProvider>
      <AuthContext.Provider
        value={{
          isAuth,
          signout,
          register,
          errors,
          clearErrors,
          validateUserName,
          validateMessage,
          logIn,
          profile,
          user,
          getCookie,
          addPost,
          addErrors,
          sendData,
          getPostById,
          serachInTitle,
          mode,
          handleMode,
          fetchNextPage,
          changeMode,
          handleChangeMode,
          changeName,
          changePassword,
          changePasswordState,
          clearChangePasswordState,
          deletePost,
          updatePostById,
          updatePostErrors,
          getUsers,
          getUserInfo,
          deleteUser,
          updateUser,
          getUserRoles,
          nextData,
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
