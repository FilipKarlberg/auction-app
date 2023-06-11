import React, { useState } from "react";
import { useSignUpUser } from "../hooks/useSignup";
import { RegisterUser, ErrorType } from "../types/types";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { isError, error, isLoading, signUpUser } = useSignUpUser({
    email,
    password,
    username,
  });

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: RegisterUser = {
      email,
      password,
      username,
    };

    signUpUser(newUser);
  };

  // set errorMessage if isError on signup
  const errorMessage = isError
    ? (error as ErrorType)?.response?.data?.error || "An error occurred."
    : null;

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
