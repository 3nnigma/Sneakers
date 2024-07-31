import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

export interface ILogin {
  jwt: string;
  email: string;
  password: string;
}

export interface IRegister {
  id: number;
  jwt: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
  gender: 1 | 2;
  balance: number;
}

export interface LoginProps {
  name: keyof ILogin;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<ILogin>;
  type: string;
}
export interface RegisterProps {
  name: keyof IRegister;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<IRegister>;
  type: string;
  placeholder: string;
}
