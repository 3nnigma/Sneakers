import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLogin } from "../../../../hooks/useUser";
import LoginField from "../../../UI/input/LoginField";
import { ILogin } from "./auth.interface";
import styles from "./Auth.module.css";

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
      <div className={styles.authForm}>
        <h2 className="pb-2">Log in to account</h2>
        <p className="opacity-75 pb-4 font-mono text-sm">Enter email below to sign in account</p>

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
          <button>Sign in</button>
        </form>
        <span>
          Don't have an account? <Link to="/register">Create now!</Link>
        </span>
      </div>

    </div>
  );
};

export default Login;
