import { AxiosResponse } from "axios";

export const handleStoreToken = (
  response: AxiosResponse,
  storeToken: (token: string) => void,
) => {
  const authHeader = response.headers["authorization"] as string;
  if (!authHeader) return;
  const token = authHeader.split(" ")[1];
  storeToken(token);
};
