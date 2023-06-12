import { useAuthContext } from "./useAuthContext";
import apiService from "../services/apiService";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { LoginResponse, RegisterUser, User } from "../types/types";

export const useSignUp = (newUser: RegisterUser) => {
  const { dispatch: authDispatch, ActionType } = useAuthContext();

  const {
    data,
    isError,
    error,
    isSuccess,
    isLoading,
    mutate: signUpUser,
  } = useMutation<LoginResponse, AxiosError, RegisterUser>(
    async () => {
      return await apiService.createUser(newUser);
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
    signUpUser,
  };
};
