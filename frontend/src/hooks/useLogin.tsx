import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { UserLogin, User } from "../types/types";
import apiService from "../services/apiService";
import { useMutation } from "react-query";
import { AxiosResponse, AxiosError } from "axios";

export const useLoginUser = (userLogin: UserLogin) => {
  const { dispatch: authDispatch, ActionType } = useAuthContext();

  const {
    data,
    isError,
    error,
    isSuccess,
    isLoading,
    mutate: logInUser,
  } = useMutation<AxiosResponse, AxiosError, UserLogin>(
    async () => {
      return await apiService.loginUser(userLogin);
    },
    {
      onSuccess: (res: AxiosResponse) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res));

        const responseData: User = res.data;
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
