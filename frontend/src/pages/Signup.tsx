import React, { useEffect, useState } from "react";
import { useSignUp } from "../hooks/useSignup";
import { RegisterUser, ErrorResponse } from "../types/types";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { isError, error, isLoading, signUpUser } = useSignUp({
    email,
    password,
    username,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: RegisterUser = {
      email,
      password,
      username,
    };

    signUpUser(newUser);
    setErrorMessage(null);
  };

  useEffect(() => {
    if (isError) {
      const newErrorMessage =
        (error as ErrorResponse).response.data.error || "An error occurred.";
      setErrorMessage(newErrorMessage);
    }
  }, [isError, error]);

  return (
    <form className="signup" onSubmit={handleSignUp}>
      <h3>Sign up</h3>
      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
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

      <button disabled={isLoading}>Sign up</button>

      {errorMessage && <div className="error">{errorMessage}</div>}
    </form>
  );
};

export default Signup;
