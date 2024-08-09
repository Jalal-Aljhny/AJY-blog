import { useContext } from "react";
import styles from "./ImagesContainer.module.css";
import { SearchContext } from "../../services/context/SearchContext";
import Image from "./Image";

const ImagesContainer = () => {
  const { images, loading, error, clicked } = useContext(SearchContext);

  return (
    <section className={styles.container}>
      {clicked.current && loading && !images.length ? (
        <p className={styles.loading}>loading ...</p>
      ) : null}
      {clicked.current && images.length && !loading && !error
        ? images.map((image) => <Image image={image} key={image.id} />)
        : null}
      {clicked.current && !images.length && !loading && !error ? (
        <p className={styles.no_image}> no images ... try another title</p>
      ) : null}
      {clicked.current && error && !loading ? (
        <p className={styles.error}>{error}</p>
      ) : null}
    </section>
  );
};

export default ImagesContainer;
