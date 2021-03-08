import axios from "axios";

export const getSites = async () => {
  const { data } = await axios.get("/api/sites");
  return data;
};
