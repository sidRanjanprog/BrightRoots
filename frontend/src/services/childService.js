import api from "./api";

export const getChildren = async () => {
  const response = await api.get("/children");
  return response.data;
};

export const getChildById = async (childId) => {
  const response = await api.get(`/children/${childId}`);
  return response.data;
};

export const createChild = async (childData) => {
  const response = await api.post("/children", childData);
  return response.data;
};

export const updateChild = async (childId, childData) => {
  const response = await api.put(`/children/${childId}`, childData);
  return response.data;
};

export const deleteChild = async (childId) => {
  const response = await api.delete(`/children/${childId}`);
  return response.data;
};
