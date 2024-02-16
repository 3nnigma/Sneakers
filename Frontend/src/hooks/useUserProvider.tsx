import { useContext } from "react";
import { UserContext } from "../providers/UserProviders";

const useUserProvider = () => {
  const value = useContext(UserContext);

  return value;
};

export default useUserProvider;
