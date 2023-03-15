import React from "react";
import LoginForm from "./Components/LoginForm";

const handleLoginSubmit = (username: string, password: string) => {
  // Perform login logic here, e.g. send a POST request to a login API endpoint
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