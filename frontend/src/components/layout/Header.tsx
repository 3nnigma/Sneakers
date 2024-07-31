import { CircleUserRound, ShoppingCart, UserRoundCog } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import useProvider from "../../hooks/useProvider";
import styles from "./Layout.module.scss";

import useUserProvider from "../../hooks/useUserProvider";

const Header: FC = () => {
  const { isOpen, setIsOpen } = useProvider();
  const { user } = useUserProvider();
  return (
    <header>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/logo.svg" alt="logo" />
        </Link>
        <div>
          <h3>React Sneakers</h3>
          <span>Магазин лучших кроссовок</span>
        </div>
      </div>
      <div className={styles.icons}>
        <div onClick={() => setIsOpen(!isOpen)}>
          <ShoppingCart />
          <span>{user?.balance || 0} руб. </span>
        </div>
        {user?.username ? (
          <Link to="/profile">
            <UserRoundCog />
            <span>{user.username}</span>
          </Link>
        ) : (
          <Link to="/login">
            <CircleUserRound />
            <span>Аккаунт</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
