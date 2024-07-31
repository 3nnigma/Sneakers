import { Check, Plus } from "lucide-react";
import { FC, useState } from "react";
import { useGetCarts } from "../../../../../hooks/useCart";
import { useAddCart, useDelCart } from "../../../../../hooks/useSneakers";
import { useGetUser } from "../../../../../hooks/useUser";
import { ICart } from "../../../../Cart/cart.interface";
import styles from "./Card.module.scss";
import { ISneakerItem } from "./card.interface";

const CardItem: FC<ISneakerItem> = ({ sneaker }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { mutate: create } = useAddCart();
  const { mutate: del } = useDelCart();
  const { data: user } = useGetUser();
  const { data: carts } = useGetCarts(user);
  const newData: ICart = {
    sneakers_id: sneaker.id,
    user: user?.id,
    quantity: 1,
  };
  const add = () => {
    create(newData);
    setIsActive(true);
  };
  const remove = () => {
    setIsActive(false);

    // Используем фильтрацию, чтобы получить массив корзины без удаляемого элемента
    const updatedCart = carts.filter(
      (cart: { sneakers_id: number; }) => sneaker.id === cart.sneakers_id
    );

    del(updatedCart[updatedCart.length - 1].id);
  };

  return (
    <div className={styles.cardItem}>
      <div
        style={{
          backgroundImage: `url(${sneaker.image})`,
        }}
      ></div>
      <h3>{sneaker.title}</h3>
      <p>{sneaker.content.slice(0, 40)}...</p>
      <span>
        Цена: <b>{sneaker.price} руб.</b>
      </span>

      {!isActive ? (
        <Plus className="default" onClick={add} />
      ) : (
        <Check className="done" onClick={remove} />
      )}
    </div>
  );
};

export default CardItem;
