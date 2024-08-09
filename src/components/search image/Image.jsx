import styles from "./ImagesContainer.module.css";
import { SearchContext } from "../../services/context/SearchContext";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
const Image = ({ image }) => {
  const { changeImgUrl, chooseCurrent } = useContext(SearchContext);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  }, [clicked]);
  return (
    <div
      className={
        clicked
          ? `${styles.image__selected} ${styles.clicked}`
          : `${styles.image__selected} ${styles.not__clicked}`
      }
    >
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={styles.image}
        onClick={() => {
          changeImgUrl(image.links.html);
          chooseCurrent();
          setClicked(true);
        }}
        title="click to copy url"
      />
    </div>
  );
};

export default Image;
Image.propTypes = {
  image: PropTypes.object,
};
