import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegister } from "./auth.interface";
import styles from "./Auth.module.scss";
import { useRegister } from "../../../../hooks/useUser";
import RegisterField from "../../../UI/input/RegisterField";

const Register: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    mode: "onChange",
  });

  const { mutate } = useRegister(reset);

  const submit: SubmitHandler<IRegister> = (data) => {
    console.log(data);
    mutate(data);
  };
  return (
    <div className={styles.login}>
      <h2>Создание учётной записи</h2>
      <form onSubmit={handleSubmit(submit)}>
        <RegisterField
          name="username"
          register={register}
          errors={errors}
          type="text"
          placeholder="Username"
        />
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
        <RegisterField
          name="first_name"
          register={register}
          errors={errors}
          type="text"
          placeholder="First Name"
        />
        <RegisterField
          name="last_name"
          register={register}
          errors={errors}
          type="text"
          placeholder="Last Name"
        />
        <RegisterField
          name="password"
          register={register}
          errors={errors}
          type="password"
          placeholder="Password"
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            paddingRight: "10px",
          }}
        >
          <p
            style={{
              whiteSpace: "nowrap",
              color: "silver",
              fontFamily: "monospace",
              fontSize: "16px",
            }}
          >
            Согласится с правилами
          </p>
          <input type="checkbox" style={{ width: "auto" }} required />
        </div>
        <button
          style={{
            paddingLeft: "28px",
            paddingRight: "28px",
          }}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;
