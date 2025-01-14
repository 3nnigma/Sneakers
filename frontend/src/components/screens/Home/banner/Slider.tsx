import { useState } from "react";
import styles from "./Banner.module.css";

import { ArrowBigLeftDash } from "lucide-react";
import { sliderColors } from "./sliderColors";

const Slider = () => {
  const [current, setCurrent] = useState<number>(0);

  const next = () => {
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % sliderColors.length);
    }, 150);
  };
  const back = () => {
    setTimeout(() => {
      setCurrent((prev) =>
        prev !== 0
          ? (prev - 1) % sliderColors.length
          : (prev + sliderColors.length - 1) % sliderColors.length
      );
    }, 150);
  };

  return (
    <div className={styles.slider}>
      <button className={styles.sldButton} onClick={() => back()}>
        <ArrowBigLeftDash />
      </button>
      <button className={styles.sldButton} onClick={() => next()}>
        <ArrowBigLeftDash />
      </button>
      <img
        className={styles.preview}
        src={`/sn${current}-Photoroom.png`}
        style={{
          filter: sliderColors[current],
        }}
      />
    </div>
  );
};

export default Slider;
