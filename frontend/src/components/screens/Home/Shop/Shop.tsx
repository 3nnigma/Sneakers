import { useState } from "react";
import Cards from "./Cards/Cards";
import styles from "./Shop.module.css";


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
        <h2 className="ml-3">All Sneakers</h2>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '15px', borderLeft: "solid 1px gray" }}>
          <label htmlFor="sort-select" style={{ marginRight: '10px', fontSize: '16px' }}>Sort by:</label>
          <select
            id="sort-select"
            defaultValue="default"
            onChange={handleSortChange}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <option value="default">Select sorting option</option>
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
