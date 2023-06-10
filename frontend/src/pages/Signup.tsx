import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

// Components
//import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signup(email, password, username);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
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
      */}

      <button disabled={isLoading}>Sing up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
