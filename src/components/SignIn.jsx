import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../services/context/AuthContext";
const SignIn = () => {
  const { logIn, errors: signInErrors, clearErrors } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSumbit = async (data) => {
    clearErrors();
    await logIn(data.email, data.password);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  // const validatePassword = (password) => {
  //   const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
  //   return re.test(password);
  // };

  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  console.log(signInErrors);

  return (
    <form
      className={`form ${
        signInErrors.message?.length || Object.keys(errors).length > 0
          ? "error"
          : ""
      }`}
      onSubmit={handleSubmit(onSumbit)}
    >
      <h2>Sign IN</h2>

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
            signInErrors.name == "email" || errors.email ? "error" : null
          }
        />
        {errors.email?.type == "required" ? (
          <small className="error__message">Email cannot be empty.</small>
        ) : null}
        {errors.email?.type == "validate" ? (
          <small className="error__message">This is not a valid email.</small>
        ) : null}
        {signInErrors.name == "email" ? (
          <small className="error__message">{signInErrors.message}</small>
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
          })}
          className={
            signInErrors.name == "mismatch" || errors.password ? "error" : null
          }
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
                  : signInErrors.name == "mismatch"
                  ? { top: "54%" }
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
                  : signInErrors.name == "mismatch"
                  ? { top: "54%" }
                  : null
              }
            />
          )
        ) : null}
        {errors.password?.type == "required" ? (
          <small className="error__message">Password cannot be empty.</small>
        ) : null}
        {/* {errors.password?.type == "validate" ? (
          <small className="error__message">
            Password should contains at least : <br />
            &#x2022; One upper letter. <br />
            &#x2022; One lower letter. <br />
            &#x2022; Onenumber. <br />
            &#x2022; One special character. <br />
            &#x2022; Eight characters. <br />
          </small>
        ) : null} */}
        {signInErrors.name == "mismatch" ? (
          <small className="error__message">{signInErrors.message}</small>
        ) : null}
      </div>

      <button className="submit" type="submit">
        Sign In
      </button>
    </form>
  );
};
export default SignIn;
