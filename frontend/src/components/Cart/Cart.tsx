import { FC, Key, useEffect } from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

import axios from "axios";
import { Minimize } from "lucide-react";
import { useClearCart, useGetCarts } from "../../hooks/useCart";
import useProvider from "../../hooks/useProvider";
import { useSneakersWithoutPagination } from "../../hooks/useSneakers";
import useUserProvider from "../../hooks/useUserProvider.tsx";
import { useCart } from "../../providers/PriceProvider.tsx";
import { ICart } from "./cart.interface.ts";

const Cart: FC<ICart[]> = () => {
  const { isOpen, setIsOpen } = useProvider();
  const { data: sneakers } = useSneakersWithoutPagination();
  const { user } = useUserProvider();
  const { mutate: clearMutate } = useClearCart(user.id);
  const { data: carts } = useGetCarts(user);
  // const [total, setTotal] = useState<number>(0) as [
  //   number,
  //   React.Dispatch<React.SetStateAction<number>>
  // ];

  let arrID: (number | undefined)[] = [];

  const { totalPrice, setTotalPrice } = useCart();

  useEffect(() => {
    let total = 0;

    carts?.forEach((cart: ICart) => {
      const filteredSneaker = sneakers?.find(
        (sneaker) => sneaker.id === cart.sneakers_id
      );

      if (filteredSneaker) {
        total += cart.quantity * filteredSneaker.price;
      }
    });

    setTotalPrice(total);
  }, [carts, sneakers, setTotalPrice]);


  const clearAllCart = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/create-stripe-session/`,
        { amount: totalPrice },
      );
      const { url } = response.data;
      window.location.href = url;
    } catch (error) {
      console.error("Error creating Stripe session", error);
    }
    clearMutate();
  };

  return (
    <>
      {isOpen ? (
        <div className={styles.cartModal}>
          <Minimize
            style={{
              marginTop: 20,
              marginLeft: 20,
              width: 42,
              height: 42,
              cursor: "pointer",
            }}
            onClick={() => setIsOpen(!isOpen)}
          />
          <div className={styles.cart}>
            <h2>Cart</h2>
            {carts?.map((cart: ICart, index: Key) => {
              arrID.push(cart.id);
              const filteredSneaker = sneakers?.find(
                (sneaker) => sneaker.id === cart.sneakers_id
              );

              return (
                filteredSneaker && (
                  <CartItem key={index} sneaker={filteredSneaker} cart={cart} />
                )
              );
            })}
            <div className={styles.control}>
              <div>
                <span>Total:</span>
                <b>${totalPrice.toFixed(2)}</b>
              </div>
              <div>
                <span>Tax 3%:</span>
                <b>${(totalPrice / 100 * 3).toFixed(2)}</b>
              </div>
              <button
                onClick={() => {
                  clearAllCart();
                }}
              >
                Place an order
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Cart;
