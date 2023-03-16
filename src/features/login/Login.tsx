import React from "react";
import LoginForm from "./components/LoginForm";
import { MDBBtn } from 'mdb-react-ui-kit';
const handleLoginSubmit = (username: string, password: string) => {
  console.log(`Logging in with username '${username}' and password '${password}'...`);
};

const Login: React.FC = () => {
  return (
    <div>
       <MDBBtn>Button</MDBBtn>
      <h1>Log in</h1>
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default Login;