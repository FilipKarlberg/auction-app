import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

export const useSignup = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch: authDispatch, ActionType } = useAuthContext();

  const signup = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    setError("");

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      toast.info("Welcome! 👋", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context
      authDispatch({ type: ActionType.LOGIN, payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
