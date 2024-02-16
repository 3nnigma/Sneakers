import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "./auth.interface";
import styles from "./Auth.module.scss";
import { Link } from "react-router-dom";
import { useLogin } from "../../../../hooks/useUser";
import LoginField from "../../../UI/input/LoginField";

const Login: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: "onChange",
  });

  const { mutate } = useLogin(reset);

  const submit: SubmitHandler<ILogin> = (data) => {
    mutate(data);
  };
  return (
    <div className={styles.login}>
      <h2>Выполнение входа</h2>
      <form onSubmit={handleSubmit(submit)}>
        <input
          placeholder="Email"
          type="text"
          {...register("email", {
            required: "Email is require field",
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter valid email!",
            },
          })}
        />
        {errors?.email && (
          <div
            style={{
              width: "102%",
              height: "1px",
              background: "red",
              boxShadow: "0 0 3px red",
            }}
          ></div>
        )}
        {/* <input
          placeholder="password"
          type="password"
          {...register("password", {
            required: "Password is require field",
          })}
        />
        {errors?.password && (
          <div
            style={{
              width: "102%",
              height: "1px",
              background: "red",
              boxShadow: "0 0 3px red",
            }}
          ></div>
        )} */}

        <LoginField
          name="password"
          register={register}
          errors={errors}
          type="password"
        />
        <button>Вход</button>
      </form>
      <span>
        Нет аккаунта? <Link to="/register">зарегистрироваться</Link>
      </span>
    </div>
  );
};

export default Login;
