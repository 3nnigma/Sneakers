import { FC } from "react";
import { RegisterProps } from "../../screens/user/auth/auth.interface";

const RegisterField: FC<RegisterProps> = ({
  name,
  errors,
  register,
  type,
  placeholder,
}) => {
  return (
    <>
      <input
        placeholder={placeholder}
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

export default RegisterField;
