import axiosInstace from "../axios";
import { SignupParams, LoginParams } from "@/types/auth.types";

export const signup = async (params: SignupParams) => {
  const response = await axiosInstace.post("/users", params);
  return response;
};

export const login = async (params: LoginParams) => {
  const response = await axiosInstace.post("/users/sign_in", params);
  return response;
};
