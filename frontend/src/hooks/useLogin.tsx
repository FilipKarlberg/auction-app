import { useAuthContext } from "./useAuthContext";
import { UserLogin, User, LoginResponse } from "../types/types";
import apiService from "../services/apiService";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

export const useLogin = (userLogin: UserLogin) => {
  const { dispatch: authDispatch, ActionType } = useAuthContext();

  const {
    data,
    isError,
    error,
    isSuccess,
    isLoading,
    mutate: logInUser,
  } = useMutation<LoginResponse, AxiosError, UserLogin>(
    async () => {
      return await apiService.loginUser(userLogin);
    },
    {
      onSuccess: (res: LoginResponse) => {
        console.log("res: ", res);

        const responseData: User = {
          token: res.token,
          username: res.username,
          email: res.email,
        };

        authDispatch({ type: ActionType.LOGIN, payload: responseData });
      },
      onError: (err: AxiosError) => {
        console.log(err.response?.data || err);
      },
    }
  );

  return {
    data,
    isError,
    error,
    isSuccess,
    isLoading,
    logInUser,
  };
};
