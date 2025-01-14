import { FC } from "react";
import Banner from "./banner/Banner";
import { HeroScrollDemo } from "./scrollSection/ScrollSection";
import Shop from "./Shop/Shop";

const Home: FC = () => {
  return (
    <div>
      <Banner />
      <HeroScrollDemo />
      <Shop />
    </div>
  );
};

export default Home;
