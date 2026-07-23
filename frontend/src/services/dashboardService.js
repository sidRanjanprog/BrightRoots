import api from "./api";

export const getDashboardInsights = async () => {
  const response = await api.get("/recommendations/dashboard/insights");
  return response.data;
};
