import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../services/context/AuthContext";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuth, signout, profile, user } = useContext(AuthContext);
  const isMount = useRef(false);

  useEffect(() => {
    if (!isMount.current && isAuth) {
      profile();
      isMount.current = true;
    }
  }, [profile, isAuth]);
  const routers =
    isAuth &&
    user?.permissions?.includes("Create Post") &&
    user?.permissions?.includes("Edit User") &&
    user?.permissions?.includes("Delete User")
      ? [
          { name: "home", path: "/" },
          { name: "All Posts", path: "/posts" },
          { name: "Add Post ", path: "/addPost" },
          { name: "Manage Users", path: "/manageUsers" },
        ]
      : isAuth && user?.permissions?.includes("Create Post")
      ? [
          { name: "home", path: "/" },
          { name: "All Posts", path: "/posts" },
          { name: "Add Post ", path: "/addPost" },
          { name: "Contact Us", path: "/contact" },
        ]
      : [
          { name: "home", path: "/" },
          { name: "All Posts", path: "/posts" },
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
                  signout();
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
