import api from "./api";

export const createOutdoorActivity = async (activityData) => {
  const response = await api.post("/outdoor-activities", activityData);
  return response.data;
};

export const getOutdoorActivities = async (childId) => {
  const response = await api.get(`/outdoor-activities/${childId}`);
  return response.data;
};

export const deleteOutdoorActivity = async (id) => {
  const response = await api.delete(`/outdoor-activities/${id}`);
  return response.data;
};

export const updateOutdoorActivity = async (id, outdoorData) => {
  const response = await api.put(`/outdoor-activities/${id}`, outdoorData);
  return response.data;
};
