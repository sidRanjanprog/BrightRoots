import api from "./api";

export const createScreenTime = async (screenTimeData) => {
  const response = await api.post("/screen-time", screenTimeData);
  return response.data;
};

export const getScreenTimes = async (childId) => {
  const response = await api.get(`/screen-time/${childId}`);
  return response.data;
};

export const deleteScreenTime = async (id) => {
  const response = await api.delete(`/screen-time/${id}`);
  return response.data;
};

export const updateScreenTime = async (id, screenTimeData) => {
  const response = await api.put(`/screen-time/${id}`, screenTimeData);
  return response.data;
};
