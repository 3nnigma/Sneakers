import { FC } from "react";
import { LoginProps } from "../../screens/user/auth/auth.interface";

const LoginField: FC<LoginProps> = ({ name, errors, register, type }) => {
  return (
    <>
      <input
        placeholder={name[0].toUpperCase() + name.slice(1, name.length)}
        type={type}
        {...register(name, {
          required: `${name} is require field`,
        })}
      />
      {errors[name] && (
        <div
          style={{
            width: "102%",
            height: "1px",
            background: "red",
            boxShadow: "0 0 3px red",
          }}
        ></div>
      )}
    </>
  );
};

export default LoginField;
