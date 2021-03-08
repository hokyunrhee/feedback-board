import axios from "axios";

export const getSites = async (token) => {
  const { data } = await axios.get("/api/sites", {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const getFeedback = async (token) => {
  await axios.post("/api/feedback", {
    headers: {
      Authorization: token,
    },
  });
};
