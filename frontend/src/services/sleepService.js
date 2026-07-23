import api from "./api";

export const createSleep = async (sleepData) => {
  const response = await api.post("/sleep", sleepData);
  return response.data;
};

export const getSleepRecords = async (childId) => {
  const response = await api.get(`/sleep/${childId}`);
  return response.data;
};

export const deleteSleep = async (id) => {
  const response = await api.delete(`/sleep/${id}`);
  return response.data;
};

export const updateSleep = async (id, sleepData) => {
  const response = await api.put(`/sleep/${id}`, sleepData);
  return response.data;
};
