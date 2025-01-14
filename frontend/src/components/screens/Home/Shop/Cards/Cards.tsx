import { FC, useState } from "react";
import { useSneakers } from "../../../../../hooks/useSneakers";
import styles from "./Card.module.css";
import CardItem from "./CardItem";

interface ICardsSort {
  sortState: 1 | 2 | 0;
}
const Cards: FC<ICardsSort> = ({ sortState }) => {
  const [page, setPage] = useState(1);
  const { data: sneakersData, isLoading, isError } = useSneakers(sortState, page);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className={styles.cards}>
        {sneakersData?.results?.map((sneaker) => (
          <CardItem sneaker={sneaker} key={sneaker.id} />
        ))}
      </div>

      {/* Пагинация */}
      <div className="w-full flex justify-center items-center">
        <button
          className="mr-2 text-white bg-transparent border-none shadow-none hover:opacity-75"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          ←  Previous
        </button>
        <span className="w-8 h-8 flex justify-center items-center bg-black rounded-md border border-solid border-gray-400">{page}</span>
        <button
          className=" ml-2 text-white bg-transparent border-none shadow-none hover:opacity-75"
          onClick={() => handlePageChange(page + 1)}
          disabled={sneakersData?.next === null}
        >
          Next  →
        </button>
      </div>
    </div>
  );
};

export default Cards;