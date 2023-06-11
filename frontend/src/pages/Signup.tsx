import React, { useState } from "react";
import { useSignUpUser } from "../hooks/useSignup";
import { RegisterUser } from "../types/types";

// Components
//import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const { isLoading, signUpUser } = useSignUpUser({
    email: email,
    password: password,
    username: username,
  });

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: RegisterUser = {
      email: email,
      password: password,
      username: username,
    };

    signUpUser(newUser);
  };

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

      {/*
      <PasswordStrengthMeter
        className={"password-strength-meter"}
        password={password}
      />
      {error && <div className="error">{error}</div>}
      */}

      <button disabled={isLoading}>Sing up</button>
    </form>
  );
};

export default Signup;
