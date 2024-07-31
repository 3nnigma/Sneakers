import { FC } from "react";

interface ButtonProps {
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};

export default Button;
