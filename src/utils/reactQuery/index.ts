import {
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { GetInfinitePagesInterface } from "../../types";
import api from "../api";
import { QueryKeyT, TDeleteMutation, TFetch, TMutation } from "./types";

export const fetcher = async <T>({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey;
  const res = await api.get<T>({
    url,
    config: { params: { ...params, pageParam } },
  });
  return res.data;
};

export const useLoadMore = <T>(url: string | null, params?: object) => {
  const context = useInfiniteQuery<
    GetInfinitePagesInterface<T>,
    Error,
    GetInfinitePagesInterface<T>,
    QueryKeyT
  >(
    [url!, params],
    ({ queryKey, pageParam = 1, meta }) =>
      fetcher({ queryKey, pageParam, meta }),
    {
      getPreviousPageParam: firstPage => firstPage.previousId ?? false,
      getNextPageParam: lastPage => {
        return lastPage.nextId ?? false;
      },
    },
  );

  return context;
};

export const useFetch = <T>({ url, params, config }: TFetch<T>) => {
  const context = useQuery<T, Error, T, QueryKeyT>(
    [url!, params],
    ({ queryKey, meta }) => fetcher({ queryKey, meta }),
    {
      enabled: !!url,
      ...config,
    },
  );

  return context;
};

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  { url, params, updater }: TMutation<T, S>,
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, T | S>(func, {
    onMutate: async data => {
      await queryClient.cancelQueries([url!, params]);

      const previousData = queryClient.getQueryData([url!, params]);

      queryClient.setQueryData<T>([url!, params], oldData => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([url!, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([url!, params]);
    },
  });
};

export const usePost = <T, S>({ url, params, updater }: TMutation<T, S>) => {
  return useGenericMutation<T, S>(data => api.post<S>({ url, data }), {
    url,
    params,
    updater,
  });
};

export const useDelete = <T>({ url, params, updater }: TDeleteMutation<T>) => {
  return useGenericMutation<T, string | number>(
    id => api.delete({ url: `${url}/${id}` }),
    { url, params, updater },
  );
};

export const useUpdate = <T, S>({ url, params, updater }: TMutation<T, S>) => {
  return useGenericMutation<T, S>(data => api.patch<S>({ url, data }), {
    url,
    params,
    updater,
  });
};

export const usePrefetch = <T>(url: string | null, params?: object) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) {
      return;
    }

    queryClient.prefetchQuery<T, Error, T, QueryKeyT>(
      [url!, params],
      ({ queryKey, meta }) => fetcher({ queryKey, meta }),
    );
  };
};
