import { CircleUserRound, ShoppingCart, UserRoundCog } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import useProvider from "../../hooks/useProvider";
import styles from "./Layout.module.css";

import useUserProvider from "../../hooks/useUserProvider";
import { useCart } from "../../providers/PriceProvider";

const Header: FC = () => {
  const { totalPrice } = useCart();

  const { isOpen, setIsOpen } = useProvider();
  const { user } = useUserProvider();
  return (
    <header>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/logo.svg" alt="logo" />
        </Link>
        <div>
          <h3>Sneaker Pulse</h3>
          <span>Elevate your sneaker game</span>
        </div>
      </div>
      <div className={styles.icons}>
        <div onClick={() => setIsOpen(!isOpen)}>
          <ShoppingCart />
          <span>${(totalPrice || 0).toFixed(2)}</span>
        </div>
        {user?.username ? (
          <Link to="/profile">
            <UserRoundCog />
            <span>{user.username}</span>
          </Link>
        ) : (
          <Link to="/login">
            <CircleUserRound />
            <span>Account</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
