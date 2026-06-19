import api from "./api";

export const createSleep = async (
  sleepData
) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/sleep",
    sleepData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getSleepRecords = async (
  childId
) => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    `/sleep/${childId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};