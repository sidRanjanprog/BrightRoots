import api from "./api";

export const createOutdoorActivity = async (
  activityData
) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/outdoor-activities",
    activityData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
  };

export const getOutdoorActivities = async (
  childId
) => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    `/outdoor-activities/${childId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
  };

export const deleteOutdoorActivity =
  async (id) => {
    const token =
      localStorage.getItem("token");

    const response =
      await api.delete(
        `/outdoor-activities/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };