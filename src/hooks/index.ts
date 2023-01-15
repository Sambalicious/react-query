import { useDelete, useFetch, usePost, useUpdate } from "@/utils/reactQuery";
import { IData } from "../types";

export const useGetPosts = () =>
  useFetch<IData[]>({
    url: "/posts",
  });

export const useGetUsers = () =>
  useFetch<IData[]>({
    url: "/users",
  });

export const useAddUser = (
  updater: (oldData: IData[], newData: IData) => IData[],
) =>
  usePost<IData[], IData>({
    url: "/users",
    updater,
  });

export const useDeleteUser = (
  updater: (oldData: IData[], deletedId: number | string) => IData[],
) =>
  useDelete<IData[]>({
    url: "/users",
    updater,
  });

export const useUpdateUser = (id: number) =>
  useUpdate<IData, IData>({
    url: `/users/${id}`,
    //   params: { id },
  });

export const useGetUser = (id: number) =>
  useFetch<IData>({
    url: `/users/${id}`,
    // params: { id },
  });
