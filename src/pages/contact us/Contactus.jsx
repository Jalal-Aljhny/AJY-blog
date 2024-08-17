import { FiSend } from "react-icons/fi";
import styles from "./contact.module.css";
import { useCallback, useContext, useRef, useState } from "react";
import { AuthContext } from "../../services/context/AuthContext";

const Contactus = () => {
  const [errors, setErrors] = useState({});
  const { validateUserName } = useContext(AuthContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const validateMessage = (message) => {
    if (message.length < 50 || message.length >= 500) {
      return false;
    } else {
      return true;
    }
  };
  const validateForm = useCallback(() => {
    setErrors({
      ...errors,
      name:
        nameRef.current.value.length == 0
          ? { type: "required" }
          : !validateUserName(nameRef.current.value)
          ? { type: "validate" }
          : undefined,

      email:
        emailRef.current.value.length == 0
          ? { type: "required" }
          : !validateEmail(emailRef.current.value)
          ? { type: "validate" }
          : undefined,

      subject:
        subjectRef.current.value.length == 0 ? { type: "required" } : undefined,

      message:
        messageRef.current.value.length == 0
          ? { type: "required" }
          : !validateMessage(messageRef.current.value)
          ? { type: "validate" }
          : undefined,
    });
  }, [errors]);
  return (
    <div>
      <form
        action="https://formspree.io/f/xjvnepwv"
        method="POST"
        className={`form ${
          Object.keys(errors).length == 0
            ? ""
            : !Object.values(errors).includes(undefined)
            ? "error"
            : ""
        }`}
        onSubmit={(e) => {
          validateForm();
          if (
            errors.name?.type ||
            errors.email?.type ||
            errors.subject?.type ||
            errors.message?.type ||
            Object.keys(errors).length == 0
          ) {
            e.preventDefault();
          }
        }}
      >
        <h2>Contact Us</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Your name"
            name="name"
            id="name"
            className={errors.name ? "error" : null}
            ref={nameRef}
            onInput={() => {
              validateForm();
            }}
          />
          {errors.name?.type == "required" ? (
            <small className="error__message">Name cannot be empty.</small>
          ) : null}
          {errors.name?.type == "validate" ? (
            <small className="error__message">
              Name should start with letter.
            </small>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            name="_replyto"
            ref={emailRef}
            className={errors.email ? "error" : null}
            onInput={() => {
              validateForm();
            }}
          />
          {errors.email?.type == "required" ? (
            <small className="error__message">Email cannot be empty.</small>
          ) : null}
          {errors.email?.type == "validate" ? (
            <small className="error__message">This is not a valid email.</small>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject : </label>
          <input
            type="text"
            placeholder="Your subject"
            name="subject"
            id="subject"
            ref={subjectRef}
            className={errors.subject ? "error" : null}
            onInput={() => {
              validateForm();
            }}
          />
          {errors.subject?.type == "required" ? (
            <small className="error__message">Subject cannot be empty.</small>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            placeholder="Your message"
            name="message"
            className={
              errors.message
                ? `${styles.textarea} ${styles.error}`
                : styles.textarea
            }
            maxLength={500}
            id="message"
            ref={messageRef}
            onInput={() => {
              validateForm();
            }}
          ></textarea>
          {errors.message?.type == "required" ? (
            <small className="error__message">Message cannot be empty.</small>
          ) : null}
          {errors.message?.type == "validate" ? (
            <small className="error__message">
              Message should be more than 50 letter and less than 500.
            </small>
          ) : null}
        </div>
        <button
          className="submit"
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Send message
          <span>
            <FiSend />
          </span>
        </button>
      </form>
    </div>
  );
};

export default Contactus;
