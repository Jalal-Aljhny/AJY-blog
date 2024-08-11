import { useContext, useRef, useState } from "react";
import styles from "./AddPost.module.css";
// import Form from "../../components/search image/Form";
// import Filters from "../../components/search image/Filters";
// import ImagesContainer from "../../components/search image/ImagesContainer";
// import Buttons from "../../components/search image/Buttons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
// import { SearchContext } from "../../services/context/SearchContext";
import { AuthContext } from "../../services/context/AuthContext";

const AddPost = () => {
  const [value, setValue] = useState("");
  const titleRef = useRef();
  const captioneRef = useRef();
  const imageRef = useRef();
  const [mod, setMod] = useState("add");

  const { addPost, addErrors } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  return (
    <section className="container">
      <nav className="absolute">
        <ul className={styles.nav__items}>
          <button
            className={mod === "add" ? styles.active : null}
            onClick={() => {
              setMod("add");
            }}
          >
            <IoAddCircle />
          </button>
          <button
            className={mod === "all" ? styles.active : null}
            onClick={() => {
              setMod("all");
            }}
          >
            <MdArticle />
          </button>
        </ul>
      </nav>
      {mod === "add" ? (
        <form
          className={addErrors?.length > 0 ? "form w-7 error" : "form w-7"}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {addErrors == "permissions error" ? (
            <div className="form-group">
              <small className="error">
                Communicat with admins from contact us page ,to give you add
                posts permissions
              </small>
            </div>
          ) : null}
          {addErrors == "unprocessable content" ? (
            <div className="form-group">
              <small className="error">
                You send Unprocessable Content ,Correct it and try again.
              </small>
            </div>
          ) : null}
          <div className="form-group">
            <label htmlFor="title">Post title :</label>
            <input type="text" id="title" name="title" ref={titleRef} />
          </div>

          <div className="form-group">
            <label htmlFor="file">Image file :</label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              ref={imageRef}
              onChange={handleImageChange}
            />
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="selected image"
                className="image_selected"
              />
            ) : null}
          </div>

          <label htmlFor="body" style={{ width: "100%" }}>
            Post body :
          </label>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            id="body"
            ref={captioneRef}
          />

          <button
            className="submit"
            disabled={addErrors == "permissions error"}
            onClick={() => {
              addPost(titleRef.current.value, captioneRef.current.value, image);
            }}
          >
            Add Post
          </button>
        </form>
      ) : null}
    </section>
  );
};

export default AddPost;
