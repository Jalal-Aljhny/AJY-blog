import { FaHeart } from "react-icons/fa";
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.icon}>
        <FaHeart />
      </div>

      <p>
        Copyright © {new Date().getFullYear()}. Crafted with
        <span
          style={{
            color: "red",
            display: "inline-block",
            marginInline: "0.5rem",
            scale: "2",
          }}
        >
          &hearts;
        </span>
        By :
      </p>
      <div className={styles.developers}>
        <div>
          <p>Jalal Aljhny</p>
          <small>FrontEnd</small>
        </div>
        <div>
          <p>Ahmad Ahmad</p>
          <small>BackEnd</small>
        </div>
        <div>
          <p>Yosef Khaddam</p>
          <small>BackEnd</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
