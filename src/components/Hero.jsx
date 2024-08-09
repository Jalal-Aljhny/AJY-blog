import { IoSearch } from "react-icons/io5";
import styles from "./Hero.module.css";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../services/context/AuthContext";

const Hero = () => {
  const tagSearch = useCallback((value) => {
    setValue(value);
  }, []);
  const [value, setValue] = useState("");
  const tags = [
    { id: 1, name: "Full Stack" },
    { id: 2, name: "Frontend" },
    { id: 3, name: "Backend" },
    { id: 4, name: "Mobile" },
  ];
  const { serachInTitle } = useContext(AuthContext);
  return (
    <section className="container">
      <h2 className={styles.sub__title}>Read the most interesting articles</h2>
      <p className={styles.explain}>
        To keep writing and publishing new blog content, it&apos;s essential to
        train yourself to use another &quot;definition of success&quot; and not
        let perfectionism get in the way.
      </p>
      <div className={styles.search}>
        <IoSearch className={styles.search__icon} />
        <input
          type="text"
          placeholder="Search article"
          className={styles.search__field}
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
        <button
          type="submit"
          className={styles.search__submit}
          onClick={() => {
            if (value.length > 0) {
              serachInTitle(value);
            }
          }}
        >
          Submit
        </button>
      </div>
      <div className={styles.tags}>
        <p>popular tags : </p>

        {tags.map((tag) => (
          <span
            className="tag"
            key={tag.id}
            onClick={() => {
              tagSearch(tag.name);
            }}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Hero;
