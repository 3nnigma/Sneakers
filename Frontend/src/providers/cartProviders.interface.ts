import { Dispatch, ReactNode, SetStateAction } from "react";

type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface IContext {
  isOpen: boolean;
  setIsOpen: TypeSetState<boolean>;
}

export interface CartProviderProps {
  children: ReactNode; // Явно указываем тип для children
}
