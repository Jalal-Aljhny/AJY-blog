import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../services/context/AuthContext";

const Change = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const {
    changeMode,
    changeName,
    changePassword,
    changePasswordState,
    clearChangePasswordState,
    validateUserName,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onSumbit = async (data) => {
    setLoading(true);
    if (changeMode == "name") {
      changeName(data.username);
    } else {
      changePassword(data.password, data.passwordN, data.password2);
    }
  };

  const validatePassword = (password) => {
    const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    return re.test(password);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordN, setShowPasswordN] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const validatePasswordConfirmation = (confirmValue) => {
    const password = watch("passwordN");
    return password === confirmValue;
  };

  return (
    <form
      className={`form ${
        Object.keys(errors).length > 0 || changePasswordState == "failure"
          ? "error"
          : ""
      }`}
      onSubmit={handleSubmit(onSumbit)}
    >
      {changeMode == "name" ? <h2>Change Name</h2> : <h2>Change Password</h2>}
      {changeMode == "name" ? (
        <div className="form-group">
          <label htmlFor="username">New Name</label>
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
            onInput={() => {
              clearChangePasswordState();
            }}
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
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="password">Current Password : </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
              className={errors.password ? "error" : null}
              onFocus={() => {
                setShowIcon(true);
              }}
              onInput={() => {
                clearChangePasswordState();
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
              <small className="error__message">
                Password cannot be empty.
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="passwordN">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="passwordN"
              id="passwordN"
              placeholder="New Password"
              {...register("passwordN", {
                required: true,
                validate: validatePassword,
              })}
              className={errors.passwordN ? "error" : null}
              onFocus={() => {
                setShowIcon(true);
              }}
              onInput={() => {
                clearChangePasswordState();
              }}
            />
            {showIcon ? (
              !showPasswordN ? (
                <FiEye
                  className="show__icon"
                  onClick={() => {
                    setShowPasswordN(true);
                  }}
                  style={
                    errors.passwordN?.type == "validate"
                      ? { top: "27%" }
                      : errors.passwordN?.type == "required"
                      ? { top: "52%" }
                      : null
                  }
                />
              ) : (
                <FiEyeOff
                  className="show__icon"
                  onClick={() => {
                    setShowPasswordN(false);
                  }}
                  style={
                    errors.passwordN?.type == "validate"
                      ? { top: "27%" }
                      : errors.passwordN?.type == "required"
                      ? { top: "52%" }
                      : null
                  }
                />
              )
            ) : null}
            {errors.passwordN?.type == "required" ? (
              <small className="error__message">
                New Password cannot be empty.
              </small>
            ) : null}
            {errors.passwordN?.type == "validate" ? (
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

          <div className="form-group">
            <label htmlFor="password2">New Password Confirm</label>
            <input
              type={showPassword2 ? "text" : "password"}
              name="password2"
              id="password2"
              placeholder="Password Confirm"
              {...register("password2", {
                required: true,
                validate: validatePasswordConfirmation,
              })}
              className={errors.password2 ? "error" : null}
              onFocus={() => {
                setShowIcon(true);
              }}
            />
            {showIcon ? (
              !showPassword2 ? (
                <FiEye
                  className="show__icon"
                  onClick={() => {
                    setShowPassword2(true);
                  }}
                  style={errors.password ? { top: "52%" } : null}
                />
              ) : (
                <FiEyeOff
                  className="show__icon"
                  onClick={() => {
                    setShowPassword2(false);
                  }}
                  style={errors.password ? { top: "52%" } : null}
                />
              )
            ) : null}
            {errors.password2?.type == "required" ? (
              <small className="error__message">
                New Password confirm cannot be empty.
              </small>
            ) : null}
            {errors.password2?.type == "validate" ? (
              <small className="error__message">
                Does not match the password field
              </small>
            ) : null}
          </div>

          {changePasswordState == "failure" ? (
            <div className="failure">Password you send is not correct</div>
          ) : changePasswordState == "success" ? (
            <div className="success">Password changed succesfully</div>
          ) : null}
        </>
      )}

      <button
        className="submit"
        type="submit"
        disabled={changePasswordState == "success"}
      >
        {loading && !changePasswordState == "success"
          ? "Loading ..."
          : changePasswordState == "success"
          ? "password changed"
          : "Send"}
      </button>
    </form>
  );
};
export default Change;
