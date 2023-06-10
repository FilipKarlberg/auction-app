import { AuthContext, ActionType } from "../context/AuthContext";
import { useContext } from "react";

// every time we want to use the messages data, use the useMessagesContext hook to get
// the context value back

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  // check so that the AuthContextProvider wraps the app
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return { ...context, ActionType };
};
