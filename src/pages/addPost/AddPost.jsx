import { useContext, useRef, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../../services/context/AuthContext";

const AddPost = () => {
  const [value, setValue] = useState("");
  const titleRef = useRef();
  const captioneRef = useRef();
  const imageRef = useRef();

  const { addPost, addErrors } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  return (
    <section className="container">
      <form
        className={addErrors?.length > 0 ? "form w-7 error" : "form w-7"}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {addErrors == "permissions error" ? (
          <div className="form-group">
            <small className="error">
              Communicat with admins from contact us page ,to give you add posts
              permissions
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
    </section>
  );
};

export default AddPost;
