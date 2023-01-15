import Axios, { AxiosInstance } from "axios";
import { IAxios } from "./reactQuery/types";
const instance = Axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const api = (axios: AxiosInstance) => {
  return {
    get: <T>({ url, config }: IAxios) => {
      return axios.get<T>(url, config);
    },

    delete: <T>({ url, config }: IAxios) => {
      return axios.delete<T>(url, config);
    },
    post: <S>({ url, data, config }: IAxios) => {
      return axios.post<S>(url, data, config);
    },
    put: <T>({ url, data, config }: IAxios) => {
      return axios.put<T>(url, data, config);
    },
    patch: <T>({ url, data, config }: IAxios) => {
      return axios.put<T>(url, data, config);
    },
  };
};

export default api(instance);
