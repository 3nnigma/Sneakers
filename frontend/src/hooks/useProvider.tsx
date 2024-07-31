import { useContext } from "react";
import { CartContext } from "../providers/CartProviders";

const useProvider = () => {
  const value = useContext(CartContext);

  return value;
};

export default useProvider;
