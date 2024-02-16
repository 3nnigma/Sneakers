import { FC } from "react";
import styles from "./Shop.module.scss";
import Cards from "./Cards/Cards";

const Shop: FC = () => {
  return (
    <div className={styles.shop}>
      <h2>Все кроссовки</h2>
      <Cards />
    </div>
  );
};

export default Shop;
