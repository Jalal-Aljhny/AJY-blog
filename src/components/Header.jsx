import styles from "./Header.module.css";
import logo from "../assets/blog_logo.png";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className={`${styles.header} container`}>
      <img
        src={logo}
        alt="logo"
        className={styles.logo}
        onClick={() => {
          window.location.reload();
        }}
      />
      <NavBar />
    </header>
  );
};

export default Header;
