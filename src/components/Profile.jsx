import { useContext } from "react";
import { AuthContext } from "../services/context/AuthContext";
import useDate from "../hooks/useDate";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user, signout } = useContext(AuthContext);
  console.log(user)
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
      <div>
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
