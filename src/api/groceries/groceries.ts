import { type Groceries } from "types";
import { axiosInstance } from "api/axios";

export const fetchGroceries = () => {
  try {
    return axiosInstance.get<Groceries>("/groceries");
  } catch (error) {
    return Promise.reject(error);
  }
};
