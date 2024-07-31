import { FC } from "react";
import { useSneakers } from "../../../../../hooks/useSneakers";
import styles from "./Card.module.scss";
import CardItem from "./CardItem";

interface ICardsSort {
  sortState: 1 | 2 | 0;
}

const Cards: FC<ICardsSort> = ({ sortState }) => {
  const { data: sneakers, isLoading } = useSneakers(sortState);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.cards}>
      {sneakers?.map((sneaker) => (
        <CardItem sneaker={sneaker} key={sneaker.id} />
      ))}
    </div>
  );
};

export default Cards;
