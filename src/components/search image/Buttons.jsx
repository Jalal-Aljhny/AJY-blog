import { useContext } from "react";
import styles from "./Filter.module.css";
import { SearchContext } from "../../services/context/SearchContext";
const Buttons = () => {
  const { page, handlePage, totalPages, clicked } = useContext(SearchContext);
  return (
    <div className="btns">
      {clicked.current && page > 1 && (
        <button
          className={styles.btn}
          onClick={() => {
            handlePage("previous");
          }}
        >
          Previous
        </button>
      )}
      {clicked.current && page < totalPages && (
        <button
          className={styles.btn}
          onClick={() => {
            handlePage("next");
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Buttons;
