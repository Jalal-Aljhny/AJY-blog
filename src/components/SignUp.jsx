import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../services/context/AuthContext";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: signUp,
    errors: signUpErrors,
    clearErrors,
  } = useContext(AuthContext);

  const onSumbit = async (data) => {
    clearErrors();
    await signUp(data.username, data.email, data.password);
  };

  const validateUserName = (username) => {
    const re = /^[a-zA-Z]/;
    return re.test(username);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    return re.test(password);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  // const [password , setPassword] = useState()

  return (
    <form
      className={`form ${
        signUpErrors.message?.length || Object.keys(errors).length > 0
          ? "error"
          : ""
      }`}
      onSubmit={handleSubmit(onSumbit)}
    >
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="User Name"
          {...register("username", {
            required: true,
            validate: validateUserName,
          })}
          className={errors.username ? "error" : null}
        />
        {errors.username?.type == "required" ? (
          <small className="error__message">User name cannot be empty.</small>
        ) : null}
        {errors.username?.type == "validate" ? (
          <small className="error__message">
            User name should started with letter.
          </small>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Your Email"
          {...register("email", {
            required: true,
            validate: validateEmail,
          })}
          className={
            signUpErrors.message?.length || errors.email ? "error" : null
          }
          onChange={() => {
            clearErrors();
          }}
        />
        {errors.email?.type == "required" ? (
          <small className="error__message">Email cannot be empty.</small>
        ) : null}
        {errors.email?.type == "validate" ? (
          <small className="error__message">This is not a valid email.</small>
        ) : null}
        {signUpErrors.name == "email" ? (
          <small className="error__message">{signUpErrors.message[0]}</small>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            validate: validatePassword,
          })}
          className={errors.password ? "error" : null}
          onFocus={() => {
            setShowIcon(true);
          }}
        />
        {showIcon ? (
          !showPassword ? (
            <FiEye
              className="show__icon"
              onClick={() => {
                setShowPassword(true);
              }}
              style={
                errors.password?.type == "validate"
                  ? { top: "27%" }
                  : errors.password?.type == "required"
                  ? { top: "52%" }
                  : null
              }
            />
          ) : (
            <FiEyeOff
              className="show__icon"
              onClick={() => {
                setShowPassword(false);
              }}
              style={
                errors.password?.type == "validate"
                  ? { top: "27%" }
                  : errors.password?.type == "required"
                  ? { top: "52%" }
                  : null
              }
            />
          )
        ) : null}
        {errors.password?.type == "required" ? (
          <small className="error__message">Password cannot be empty.</small>
        ) : null}
        {errors.password?.type == "validate" ? (
          <small className="error__message">
            Password should contains at least : <br />
            &#x2022; One upper letter. <br />
            &#x2022; One lower letter. <br />
            &#x2022; Onenumber. <br />
            &#x2022; One special character. <br />
            &#x2022; Eight characters. <br />
          </small>
        ) : null}
      </div>

      <button className="submit" type="submit">
        Register
      </button>
      <Link
        to={"/signin"}
        style={{
          color: "#1565d8",
          fontSize: "0.7rem",
          position: "absolute",
          bottom: "7%",
          fontWeight: "bold",
        }}
      >
        Already have an account
      </Link>
    </form>
  );
};
export default SignUp;
