import { Check, Plus } from "lucide-react";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCarts } from "../../../../../hooks/useCart";
import { useAddCart, useDelCart } from "../../../../../hooks/useSneakers";
import { useGetUser } from "../../../../../hooks/useUser";
import { ICart } from "../../../../Cart/cart.interface";
import styles from "./Card.module.css";
import { ISneakerItem } from "./card.interface";

const CardItem: FC<ISneakerItem> = ({ sneaker }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { mutate: create } = useAddCart();
  const { mutate: del } = useDelCart();
  const { data: user } = useGetUser();
  const navigate = useNavigate();
  const { data: carts } = useGetCarts(user);
  const newData: ICart = {
    sneakers_id: sneaker.id,
    user: user?.id,
    quantity: 1,
  };
  const add = () => {
    if (user) {
      create(newData);
      setIsActive(true);
    } else {
      navigate('/login');
    }
  };
  const remove = () => {
    if (user) {

      setIsActive(false);

      const updatedCart = carts.filter(
        (cart: { sneakers_id: number; }) => sneaker.id === cart.sneakers_id
      );

      del(updatedCart[updatedCart.length - 1].id);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={styles.cardItem}>
      <div className={styles.sneakerImage}
        style={{
          backgroundImage: `url(${sneaker.image})`,
        }}
      ></div>

      <h3>{sneaker.title}</h3>
      <p className="max-h-12">{sneaker.content}</p>
      <div className="flex w-full justify-between pl-2 pr-8 items-center">
        <span>
          <i>Price: </i> <b>${sneaker.price}</b>
        </span>

        {!isActive ? (
          <Plus className="default" onClick={add} />
        ) : (
          <Check className="done" onClick={remove} />
        )}
      </div>
    </div>
  );
};

export default CardItem;
