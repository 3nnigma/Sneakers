import { SetStateAction, createContext, useMemo, useState } from "react";
import { IContext, CartProviderProps } from "./cartProviders.interface";

export const CartContext = createContext<IContext>({
  isOpen: false,
  setIsOpen: function (_value: SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
  },
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
