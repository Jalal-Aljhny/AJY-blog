import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useContext, useState } from "react";
import { AuthContext } from "../services/context/AuthContext";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuth, signout, profile } = useContext(AuthContext);
  const routers = isAuth
    ? [
        { name: "home", path: "/" },
        { name: "All Posts", path: "/allPosts" },
        { name: "Add Post ", path: "/addPost" },
        { name: "Contact Us", path: "/contact" },
      ]
    : [
        { name: "home", path: "/" },
        { name: "All Posts", path: "/allPosts" },
        { name: "Contact Us", path: "/contact" },
      ];
  return (
    <nav>
      {showMenu ? (
        <IoClose
          className={styles.navMenu}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        />
      ) : (
        <AiOutlineMenu
          className={styles.navMenu}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        />
      )}
      <ul className={`${!showMenu ? styles.navItems : styles.showItems}`}>
        {routers.map((router) => (
          <li key={router.name}>
            <NavLink
              to={router.path}
              className={({ isActive }) => {
                return isActive ? `${styles.active__nav}` : ``;
              }}
              onClick={() => {
                setShowMenu(false);
              }}
            >
              {router.name}
            </NavLink>
          </li>
        ))}
        {isAuth ? (
          <li>
            <NavLink
              to={"/profile"}
              className={({ isActive }) => {
                return isActive ? `${styles.active__nav}` : ``;
              }}
              onClick={async () => {
                await profile();
                setShowMenu(false);
              }}
            >
              Profile
            </NavLink>
          </li>
        ) : null}
        <li>
          {isAuth === true ? (
            <>
              <NavLink
                className={styles.signin}
                onClick={async () => {
                  setShowMenu(false);
                  await signout();
                }}
              >
                Sign Out
              </NavLink>
            </>
          ) : (
            <NavLink
              to={"signup"}
              className={({ isActive }) => {
                return isActive
                  ? `${styles.active__nav} ${styles.signin}`
                  : `${styles.signin}`;
              }}
              onClick={() => {
                setShowMenu(false);
              }}
            >
              Sign Up
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
