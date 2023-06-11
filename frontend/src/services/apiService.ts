import axios from "axios";
import { RegisterUser } from "../types/types";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-type": "application/json",
  },
});

const createUser = async (payload: RegisterUser) => {
  const response = await apiClient.post("/user/signup", payload);
  return response.data;
};

const apiService = {
  createUser,
};

export default apiService;
