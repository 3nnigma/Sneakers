import { FC, Key, useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import CartItem from "./CartItem";

import { Minimize } from "lucide-react";
import { useClearCart, useGetCarts } from "../../hooks/useCart";
import useProvider from "../../hooks/useProvider";
import { useSneakers } from "../../hooks/useSneakers";
import { useBalance } from "../../hooks/useUser.ts";
import useUserProvider from "../../hooks/useUserProvider.tsx";
import { ICart } from "./cart.interface.ts";

const Cart: FC<ICart[]> = () => {
  const { isOpen, setIsOpen } = useProvider();
  const { data: sneakers } = useSneakers();
  const { user } = useUserProvider();
  const { mutate: clearMutate } = useClearCart();
  const { data: carts } = useGetCarts(user);
  const { mutate: balanceMutate } = useBalance();
  const [total, setTotal] = useState<number>(0) as [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ];

  let arrID: (number | undefined)[] = [];

  useEffect(() => {
    let totalPrice = 0;

    carts?.forEach((cart: ICart) => {
      const filteredSneaker = sneakers?.find(
        (sneaker) => sneaker.id === cart.sneakers_id
      );

      if (filteredSneaker) {
        totalPrice += cart.quantity * filteredSneaker.price;
      }
    });

    setTotal(totalPrice);
  }, [carts, sneakers]);
  const bal = user?.balance;
  const calcBalance = (): number | undefined => {
    if (bal !== undefined) {
      return bal - total;
    }
  };
  const clearAllCart = (arr: (number | undefined)[]) => {
    arr.map((id) => clearMutate(id));
    alert("Ваш заказ прошёл успешно!");
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
            <h2>Корзина</h2>
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
                <span>Итого:</span>
                <b>{total} руб.</b>
              </div>
              <div>
                <span>Налог 3%:</span>
                <b>{Math.floor((total / 100) * 3)} руб.</b>
              </div>
              <button
                onClick={() => {
                  const balance = calcBalance();
                  clearAllCart(arrID);
                  if (
                    balance !== undefined &&
                    bal !== undefined &&
                    bal >= total
                  ) {
                    balanceMutate(balance);
                  }
                }}
              >
                Оформить заказ
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
