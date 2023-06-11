import { useAuthContext } from "./useAuthContext";
//import { toast } from "react-toastify";
import apiService from "../services/apiService";
import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { RegisterUser } from "../types/types";
//import { User } from "../types/types";

export const useSignUpUser = (newUser: RegisterUser) => {
  const { dispatch: authDispatch, ActionType } = useAuthContext();

  const { isLoading, mutate: signUpUser } = useMutation<
    AxiosResponse,
    AxiosError,
    RegisterUser
  >(
    async () => {
      return await apiService.createUser(newUser);
    },
    {
      onSuccess: (res: AxiosResponse) => {
        const responseData = res.data;
        authDispatch({ type: ActionType.LOGIN, payload: responseData });
      },
      onError: (err: AxiosError) => {
        console.log(err.response?.data || err);
      },
    }
  );

  return { isLoading, signUpUser };
};
