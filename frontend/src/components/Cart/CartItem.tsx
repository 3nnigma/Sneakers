import { Trash2 } from "lucide-react";
import { FC } from "react";
import { useDelCart, useQuantity } from "../../hooks/useSneakers";
import { ISneakerItem } from "../screens/Home/Shop/Cards/card.interface";
import styles from "./Cart.module.scss";
import { ICartItem } from "./cart.interface";

const CartItem: FC<ICartItem & ISneakerItem> = ({ cart, sneaker }) => {
  const { mutate: del } = useDelCart();
  const { mutate: quantityy } = useQuantity();

  const handDel = (id: number) => {
    del(id);
  };
  const quantityChange = (id: number, count: string) => {
    quantityy({ id, count });
  };
  return (
    <div className={styles.cartItem}>
      <div
        className={styles.cartImage}
        style={{
          backgroundImage: `url(${sneaker?.image})`,
        }}
      ></div>
      <div className={styles.cartInfo}>
        <span>{sneaker?.title}</span>
        <b>{sneaker?.price} руб.</b>
      </div>
      <div className={styles.quantity}>
        <input
          type="number"
          min={1}
          max={9}
          defaultValue={cart?.quantity}
          onChange={(e) => {
            cart?.id !== undefined
              ? quantityChange(cart.id, e.target.value)
              : null;
            e.target.value.length > 1
              ? (e.target.value = "")
              : (e.target.value = e.target.value);
          }}
        />
        <Trash2
          onClick={() => (cart?.id !== undefined ? handDel(cart.id) : null)}
        />
      </div>
    </div>
  );
};

export default CartItem;
