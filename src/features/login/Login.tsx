import React from "react";
import LoginForm from "./components/LoginForm";
import { MDBBtn } from 'mdb-react-ui-kit';
const handleLoginSubmit = (username: string, password: string) => {
  console.log(`Logging in with username '${username}' and password '${password}'...`);
};

const Login: React.FC = () => {
  return (
    <div>
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default Login;