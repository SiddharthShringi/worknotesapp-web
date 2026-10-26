import axiosInstance from "./axios";

export const getReport = async (parms?: ReportParams) => {
    const response = await axiosInstance.get("api/v1/reports")
