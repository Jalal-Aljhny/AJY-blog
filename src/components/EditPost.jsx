import { useCallback, useContext, useEffect, useRef, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../services/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const EditPost = () => {
  const titleRef = useRef();
  const captioneRef = useRef();
  const imageRef = useRef();

  const { updatePostById, updatePostErrors, getPostById, user } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [caption, setCaption] = useState("");
  const handleNewImageChange = (event) => {
    setNewImage(event.target.files[0]);
  };
  const isMount = useRef(false);
  const fillInput = useCallback(() => {
    if (data) {
      setTitle(data.post.title);
      setCaption(data.post.caption);
      setImage(data.post.imgUrl);
    }
  }, [data]);

  useEffect(() => {
    if (!isMount.current && user.name) {
      if (Number(postId)) {
        getPostById(postId)
          .then((res) => {
            setData(res.data);
            fillInput();
          })
          .catch(() => {
            navigate(`/${postId}`);
          });
      } else {
        navigate(`/${postId}`);
      }
      isMount.current = true;
    }
  }, [fillInput, getPostById, location.pathname, navigate, postId, user]);
  console.log(updatePostErrors);
  useEffect(() => {
    setTitle(data?.post?.title);
    setCaption(data?.post?.caption);
    setImage(data?.post?.imgUrl);
  }, [data]);

  return (
    <form
      className={"form w-7"}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="form-group">
        <label htmlFor="title">Post title :</label>
        <input
          type="text"
          id="title"
          name="title"
          ref={titleRef}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="file">
          Current Image :{" "}
          <span style={{ color: "#f0160b" }}>
            (will removed if don&apos;t select new one)
          </span>
          {/* <span
            className="keep"
            onClick={() => {
              console.log(imageRef);
              setNewImage(image);
            }}
          >
            Keep it
          </span> */}
        </label>
        {image ? (
          <img
            src={image}
            alt="selected image"
            className="image_selected"
            id="file"
          />
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="file1">New Image :</label>
        <input
          type="file"
          id="file1"
          name="file"
          accept="image/*"
          ref={imageRef}
          onChange={handleNewImageChange}
        />
        {newImage ? (
          <img
            src={URL.createObjectURL(newImage)}
            alt="selected image"
            className="image_selected"
            id="file1"
          />
        ) : null}
      </div>

      <label htmlFor="body" style={{ width: "100%" }}>
        Post body :
      </label>
      <ReactQuill theme="snow" value={caption} id="body" ref={captioneRef} />

      <button
        className="submit"
        // disabled={addErrors == "permissions error"}
        onClick={() => {
          console.table(
            postId,
            titleRef.current.value,
            captioneRef.current.value,
            newImage
          );
          updatePostById(
            postId,
            titleRef.current.value,
            captioneRef.current.value,
            newImage
          );
        }}
      >
        Update Post
      </button>
    </form>
  );
};

export default EditPost;
