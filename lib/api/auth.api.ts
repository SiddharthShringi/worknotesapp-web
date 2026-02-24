import axiosInstace from "../axios";
import { SignupParams, LoginParams } from "@/types/auth.types";

export const signup = async (params: SignupParams) => {
  console.log({ params }, "signup params");
  const response = await axiosInstace.post("/users", params);
  console.log({ response });
  return response;
};

export const login = async (params: LoginParams) => {
  const response = await axiosInstace.post("/users/sign_in", params);
  console.log({ response });
  const authHeader = response.headers["authorization"] as string | undefined;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    localStorage.setItem("token", token);
  }
  return response;
};
