import axios from "axios";
import { RegisterUser } from "../types/types";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-type": "application/json",
  },
});

const createUser = async (user: RegisterUser) => {
  const response = await apiClient.post("/user/signup", { body: user });
  return response.data;
};

const apiService = {
  createUser,
};

export default apiService;
