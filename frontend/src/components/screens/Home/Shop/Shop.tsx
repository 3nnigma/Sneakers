import { useState } from "react";
import Cards from "./Cards/Cards";
import styles from "./Shop.module.scss";


const Shop = () => {
  const [sort, setSort] = useState<0 | 1 | 2>(2);


  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.target.value;

    if (value === 'ascending') setSort(1);
    else if (value === 'descending') setSort(0);
    else setSort(2);
  };

  return (
    <div className={styles.shop}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>Все кроссовки</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <select defaultValue="default" onChange={handleSortChange}>
            <option value="default" >Sort by</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </form>
      </div>
      <Cards sortState={sort} />
    </div>
  );
};

export default Shop;
