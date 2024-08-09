import { useContext } from "react";
import Filter from "./Filter";
import styles from "./Filters.module.css";
import { SearchContext } from "../../services/context/SearchContext";

const Filters = () => {
  const { handleSelect } = useContext(SearchContext);
  return (
    <div className={styles.container}>
      <Filter
        onClick={() => {
          handleSelect("cats");
        }}
      >
        cats
      </Filter>
      <Filter
        onClick={() => {
          handleSelect("shoes");
        }}
      >
        shoes
      </Filter>
      <Filter
        onClick={() => {
          handleSelect("birds");
        }}
      >
        birds
      </Filter>
      <Filter
        onClick={() => {
          handleSelect("nature");
        }}
      >
        nature
      </Filter>
    </div>
  );
};

export default Filters;
