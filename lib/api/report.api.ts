import { DailyReport, GetReportParams } from "@/types/report.types";
import axiosInstance from "./axios";

export const getReport = async (
  params?: GetReportParams,
): Promise<DailyReport | null> => {
  const response = await axiosInstance.get<DailyReport>("api/v1/reports", {
    params,
  });
  return response.data;
};
