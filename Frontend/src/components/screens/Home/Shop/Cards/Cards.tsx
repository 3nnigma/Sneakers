import { FC } from "react";
import styles from "./Card.module.scss";
import CardItem from "./CardItem";
import { useSneakers } from "../../../../../hooks/useSneakers";

const Cards: FC = () => {
  const { data: sneakers, isLoading } = useSneakers();

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
