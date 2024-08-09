import { useContext } from "react";
import styles from "./Form.module.css";
import styles1 from "./Filter.module.css";
import { SearchContext } from "../../services/context/SearchContext";

const Form = () => {
  const { searchInput, handleSelect } = useContext(SearchContext);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Try something to search ..."
        className={styles.input}
        ref={searchInput}
      />
      <button
        className={styles1.btn}
        onClick={() => {
          handleSelect(searchInput.current.value);
        }}
        style={{ margin: "1rem auto", display: "block", width: "150px" }}
      >
        Search
      </button>
    </div>
  );
};

export default Form;
