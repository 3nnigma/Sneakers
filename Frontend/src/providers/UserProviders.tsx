import {
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IUserContext, UserProviderProps } from "./userProviders.interface";
import { useGetUser } from "../hooks/useUser";
import { IRegister } from "../components/screens/user/auth/auth.interface";

export const UserContext = createContext<IUserContext>({
  user: {},
  setUser: function (_value: SetStateAction<IRegister>): void {
    throw new Error("Function not implemented.");
  },
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data } = useGetUser();
  const [user, setUser] = useState<IRegister>({});

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const value = useMemo(() => ({ user, setUser }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
