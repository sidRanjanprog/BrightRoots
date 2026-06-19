import api from "./api";

export const createScreenTime = async (
  screenTimeData
) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/screen-time",
    screenTimeData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getScreenTimes = async (
  childId
) => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    `/screen-time/${childId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};