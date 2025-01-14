import { FC } from "react";
import Button from "../../../UI/button/Button";
import { FlipWords } from "../../../UI/textFlip";
import styles from "./Banner.module.css";
import Slider from "./Slider";
const words = [
  "perfect",
  "pair",
  "ideal",
  "absolute",
];
const Banner: FC = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.info}>
        <h1>
          <span>
            Find your <FlipWords words={words} /> <br />
          </span>
          More than just shoes — it’s a lifestyle
        </h1>
        <p>Your next pair is just a step away. Feel the pulse of every sneaker.</p>
        <Button>View more details</Button>
      </div>
      <Slider />
    </div>
  );
};

export default Banner;
