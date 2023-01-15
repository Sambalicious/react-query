import { useDelete, useFetch, usePost, useUpdate } from "@/utils/reactQuery";
import { IData } from "../types";

export const useGetPosts = () =>
  useFetch<IData[]>({ url: "https://jsonplaceholder.typicode.com/posts" });

export const useGetUsers = () =>
  useFetch<IData[]>({ url: "https://jsonplaceholder.typicode.com/users" });

export const useAddUser = (
  updater: (oldData: IData[], newData: IData) => IData[],
) =>
  usePost<IData[], IData>({
    url: "https://jsonplaceholder.typicode.com/users",
    updater,
  });

export const useDeleteUser = (
  updater: (oldData: IData[], deletedId: number | string) => IData[],
) =>
  useDelete<IData[]>({
    url: "https://jsonplaceholder.typicode.com/users",
    updater,
  });

export const useUpdateUser = (id: number) =>
  useUpdate<IData, IData>({
    url: `https://jsonplaceholder.typicode.com/users/${id}`,
    params: { id },
  });

export const useGetUser = (id: number) =>
  useFetch<IData>({
    url: `https://jsonplaceholder.typicode.com/users/${id}`,
    params: { id },
  });
