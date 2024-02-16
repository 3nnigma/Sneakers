import { FC } from "react";
import { Outlet } from "react-router-dom";
// import styles from "./Layout.module.scss";
import Header from "./Header";
import Cart from "../Cart/Cart";
import { CartProvider } from "../../providers/CartProviders";

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
