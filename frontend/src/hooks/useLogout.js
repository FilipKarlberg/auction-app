import { useAuthContext } from "./useAuthContext";
import { useMessagesContext } from "./useMessagesContext";

export const useLogout = () => {
  // both Context had dispatch, renaming them in this file by adding  ': newName'
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: messagesDispatch } = useMessagesContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout
    authDispatch({ type: "LOGOUT" });
    messagesDispatch({ type: "SET_MESSAGES", payload: null });
  };

  return { logout };
};
