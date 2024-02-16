import { FC } from "react";
import { PiSneakerFill } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import styles from "./Layout.module.scss";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { Link } from "react-router-dom";
import useProvider from "../../hooks/useProvider";

import useUserProvider from "../../hooks/useUserProvider";

const Header: FC = () => {
  const { isOpen, setIsOpen } = useProvider();
  const { user } = useUserProvider();
  return (
    <header>
      <div className={styles.logo}>
        <Link to="/">
          <PiSneakerFill />
        </Link>
        <div>
          <h3>React Sneakers</h3>
          <span>Магазин лучших кроссовок</span>
        </div>
      </div>
      <div className={styles.icons}>
        <div onClick={() => setIsOpen(!isOpen)}>
          <IoCartOutline />
          <span>{user?.balance || 0} руб. </span>
        </div>
        {user?.username ? (
          <Link to="/profile">
            {user?.gender == 1 ? (
              <FcBusinessman />
            ) : user?.gender == 2 ? (
              <FcBusinesswoman />
            ) : (
              ""
            )}
            <span>{user.username}</span>
          </Link>
        ) : (
          <Link to="/login">
            <CgProfile />
            <span>Аккаунт</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
