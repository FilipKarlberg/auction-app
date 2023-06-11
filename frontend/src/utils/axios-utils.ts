import axios, { AxiosError, AxiosResponse } from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;
  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: AxiosError) => {
    // catch errors
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
