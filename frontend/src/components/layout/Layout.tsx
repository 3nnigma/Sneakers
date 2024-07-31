import { FC } from "react";
import { Outlet } from "react-router-dom";
// import styles from "./Layout.module.scss";
import { CartProvider } from "../../providers/CartProviders";
import Cart from "../Cart/Cart";
import Header from "./Header";

const Layout: FC = () => {
  return (
    <CartProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Cart />
    </CartProvider>
  );
};

export default Layout;
