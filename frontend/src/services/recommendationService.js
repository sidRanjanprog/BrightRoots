import api from "./api";

export const getRecommendations =
  async (childId) => {
    const token =
      localStorage.getItem("token");

    const response = await api.get(
      `/recommendations/${childId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };