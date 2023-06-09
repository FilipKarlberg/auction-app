import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  // both Context had dispatch, renaming them in this file by adding  ': newName'
  const { dispatch: authDispatch } = useAuthContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout
    authDispatch({ type: "LOGOUT" });
  };

  return { logout };
};
