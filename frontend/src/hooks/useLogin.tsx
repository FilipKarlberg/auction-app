import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch: authDispatch, ActionType } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context
      authDispatch({ type: ActionType.LOGIN, payload: json });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
