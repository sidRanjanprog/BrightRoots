import api from "./api";

export const getRecommendations = async (childId) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/recommendations/${childId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getDashboardInsights = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/recommendations/dashboard/insights", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
