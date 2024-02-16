import { useState } from "react";
import styles from "./Banner.module.scss";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { sliderColors, sliderSneakers } from "./SliderSneakers";

const Slider = () => {
  const [current, setCurrent] = useState<number>(0);

  const next = () => {
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % sliderSneakers.length);
    }, 150);
  };
  const back = () => {
    setTimeout(() => {
      setCurrent((prev) =>
        prev !== 0
          ? (prev - 1) % sliderSneakers.length
          : (prev + sliderSneakers.length - 1) % sliderSneakers.length
      );
    }, 150);
  };

  return (
    <div className={styles.slider}>
      <button className={styles.sldButton} onClick={() => back()}>
        <MdOutlineArrowForwardIos />
      </button>
      <button className={styles.sldButton} onClick={() => next()}>
        <MdOutlineArrowForwardIos />
      </button>
      <div
        className={styles.preview}
        style={{
          backgroundImage: `url(${sliderSneakers[current]})`,
          filter: sliderColors[current],
        }}
      ></div>
    </div>
  );
};

export default Slider;
