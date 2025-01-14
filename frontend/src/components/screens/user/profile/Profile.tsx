import { FC } from "react";
import { useLogout } from "../../../../hooks/useUser";
import useUserProvider from "../../../../hooks/useUserProvider";
import { IRegister } from "../auth/auth.interface";
import styles from "./Profile.module.css";

const Profile: FC = () => {
  const { user, setUser } = useUserProvider();
  const { mutate } = useLogout();

  const logout = (data: IRegister) => {
    setUser({} as IRegister);
    mutate(data);
  };

  return (
    <div className={styles.profile}>
      <h2>
        {" "}
        <i>Mail</i>: {user?.email}
      </h2>
      <h3>
        {" "}
        <i>Name</i>: {user?.first_name} {user?.last_name}
      </h3>

      <button onClick={() => logout(user)}>Logout</button>
    </div>
  );
};

export default Profile;
