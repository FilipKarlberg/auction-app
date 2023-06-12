import React, { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { UserLogin } from "../types/types";
import { ErrorResponse } from "../types/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isError, error, isLoading, logInUser } = useLogin({
    email,
    password,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginUser: UserLogin = {
      email,
      password,
    };

    logInUser(loginUser);
  };

  useEffect(() => {
    if (isError) {
      const newErrorMessage =
        (error as ErrorResponse).response.data.error || "An error occurred.";
      setErrorMessage(newErrorMessage);
    }
  }, [isError, error]);

  return (
    <form className="login" onSubmit={handleLogin}>
      <h3>Log in</h3>
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        autoComplete="email"
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        autoComplete="current-password"
      />

      <button disabled={isLoading}>Login</button>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </form>
  );
};

export default Login;
