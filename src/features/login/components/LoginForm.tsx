import React from "react";
import { useForm } from "react-hook-form";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

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
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="10">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <img
                className="img"
                src="https://cdn-icons-png.flaticon.com/512/1088/1088537.png"
              />
              <h5 className="fw-bold text-center mb-5">Login</h5>

              <form onSubmit={onSubmitHandler}>
                <MDBInput
                  wrapperClass="mb-4 w-60"
                  label="Email address"
                  id="formControlLg"
                  size="lg"
                  type="text"
                  {...register("username", {
                    required: "Please enter a username",
                  })}
                />
                {errors.username && <p>{errors.username.message}</p>}

                <MDBInput
                  wrapperClass="mb-1 w-60"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  {...register("password", {
                    required: "Please enter a password",
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </form>
              <label className="password-forget">Forgot password?</label>
              <MDBBtn onClick={onSubmitHandler} className="mb-5" size="lg">
                Login
              </MDBBtn>
              <label className="mt-5 text-center">
                Don't have an account?
                <label className="sign-up">Sign up</label>
              </label>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginForm;
