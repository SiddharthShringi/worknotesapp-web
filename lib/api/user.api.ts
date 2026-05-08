import axiosInstance from "./axios";
import { TimeZoneParams } from "@/types/auth.types";

export const updateTimezone = async (params: TimeZoneParams) => {
  const response = await axiosInstance.patch("api/v1/profile", params);
  return response;
};
