import { useContext } from "react";
import { AuthContext } from "../services/context/AuthContext";
import useDate from "../hooks/useDate";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, signout, handleChangeMode } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <section className={styles.profile}>
      <div className={styles.person}>
        {user?.name?.length > 0 ? user?.name.split("")[0] : ""}
      </div>

      <div>
        Name : <span>{user?.name}</span>
      </div>
      <div>
        Email : <span>{user?.email}</span>
      </div>
      <div>
        Created at : <span>{useDate(user?.date)}</span>
      </div>
      {user?.permissions?.length > 0 ? (
        <div className={styles.permission}>
          Your Permissions :
          <ul>
            {user?.permissions.map((permission) => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.permission}>
          You don&apos;t have any permissions
        </div>
      )}
      <div>
        <button
          onClick={() => {
            handleChangeMode("name");
            navigate("/changeProfile");
          }}
        >
          Change Name
        </button>
        <button
          onClick={() => {
            handleChangeMode("password");
            navigate("/changeProfile");
          }}
        >
          Change Password
        </button>
        <button
          onClick={() => {
            signout();
          }}
        >
          Sign Out
        </button>
      </div>
    </section>
  );
};

export default Profile;
