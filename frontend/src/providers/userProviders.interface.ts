import { Dispatch, ReactNode, SetStateAction } from "react";
import { IRegister } from "../components/screens/user/auth/auth.interface";

type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface IUserContext {
  user: IRegister | undefined;
  setUser: TypeSetState<IRegister>;
}

export interface UserProviderProps {
  children: ReactNode;
}
