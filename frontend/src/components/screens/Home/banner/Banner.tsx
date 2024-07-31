import { FC } from "react";
import styles from "./Banner.module.scss";
import Slider from "./Slider";
import Button from "../../../UI/button/Button";

const Banner: FC = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.info}>
        <h1>
          <span>
            Stan Smith<b>,</b>
          </span>
          Forever! Give The Perfect Gift
        </h1>
        <p>Find pair this Valentine's Day. Order by 2.9 to get your gifts.</p>
        <Button>Посмотреть Подробнее</Button>
      </div>
      <Slider />
    </div>
  );
};

export default Banner;
