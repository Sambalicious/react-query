import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export type QueryKeyT = [string, object | undefined];

export interface TGenericMutation<T, S> {
  func: (data: T | S) => Promise<AxiosResponse<S>>;
  url: string;
  params?: object;
  updater?: ((oldData: T, newData: S) => T) | undefined;
}

export interface TFetch<T> {
  url: string | null;
  params?: object;
  config?: UseQueryOptions<T, Error, T, QueryKeyT>;
}

export interface TMutation<T, S> {
  url: string;
  params?: object;
  updater?: ((oldData: T, newData: S) => T) | undefined;
  key?: string;
}
export interface TDeleteMutation<T> {
  url: string;
  params?: object;
  updater?: (oldData: T, id: string | number) => T;
}
export interface IAxios {
  url: string;
  config?: AxiosRequestConfig;
  data?: unknown;
}
