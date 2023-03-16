import React from "react";
import LoginForm from "./components/LoginForm";

const handleLoginSubmit = (username: string, password: string) => {
  console.log(`Logging in with username '${username}' and password '${password}'...`);
};

const Login: React.FC = () => {
  return (
    <div>
      <h1>Log in</h1>
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default Login;