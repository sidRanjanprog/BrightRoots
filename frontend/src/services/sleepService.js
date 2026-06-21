import api from "./api";

export const createSleep = async (sleepData) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/sleep", sleepData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getSleepRecords = async (childId) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/sleep/${childId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteSleep = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/sleep/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateSleep = async (id, sleepData) => {
  const token = localStorage.getItem("token");

  const response = await api.put(`/sleep/${id}`, sleepData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
