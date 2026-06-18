import api from "./api";

export const getChildren = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/children",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createChild = async (
  childData
) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/children",
    childData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};