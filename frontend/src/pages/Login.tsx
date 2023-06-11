import React, { useState } from "react";
import { useLoginUser } from "../hooks/useLogin";
import { UserLogin } from "../types/types";
import { ErrorType } from "../types/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isError, error, isLoading, logInUser } = useLoginUser({
    email,
    password,
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginUser: UserLogin = {
      email,
      password,
    };

    logInUser(loginUser);
  };

  // set errorMessage if isError on signup
  const errorMessage = isError
    ? (error as ErrorType)?.response?.data?.error || "An error occurred."
    : null;

  return (
    <form className="login" onSubmit={handleLogin}>
      <h3>Log in</h3>
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Login</button>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </form>
  );
};

export default Login;
