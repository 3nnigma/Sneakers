import { FC } from "react";
import Banner from "./banner/Banner";
import Shop from "./Shop/Shop";

const Home: FC = () => {
  return (
    <div>
      <Banner />
      <Shop />
    </div>
  );
};

export default Home;
