import React from "react";
import { useForm } from "react-hook-form";

type LoginFormProps = {
  onSubmit: (username: string, password: string) => void;
};

type LoginFormInputs = {
  username: string;
  password: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmitHandler = handleSubmit(({ username, password }) => {
    onSubmit(username, password);
  });

  return (
    <form onSubmit={onSubmitHandler}>
      <label>
        Username:
        <input
          type="text"
          {...register("username", {
            required: "Please enter a username",
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </label>
      <label>
        Password:
        <input
          type="password"
          {...register("password", {
            required: "Please enter a password",
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </label>
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
