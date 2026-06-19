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

export const deleteScreenTime =
  async (id) => {
    const token =
      localStorage.getItem("token");

    const response =
      await api.delete(
        `/screen-time/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

  export const updateScreenTime =
  async (id, screenTimeData) => {
    const token =
      localStorage.getItem("token");

    const response =
      await api.put(
        `/screen-time/${id}`,
        screenTimeData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };