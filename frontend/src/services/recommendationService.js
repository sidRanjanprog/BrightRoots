import api from "./api";

export const getRecommendations = async (childId) => {
  const response = await api.get(`/recommendations/${childId}`);
  return response.data;
};

export const getDashboardInsights = async () => {
  const response = await api.get("/recommendations/dashboard/insights");
  return response.data;
};
