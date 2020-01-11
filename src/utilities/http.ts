import { AxiosRequestConfig } from 'axios';
import { handleRequest } from './http/httpRequestUtil';
import { RequestMethodEnum } from '../constants/RequestMethodEnum';

const get = async <T, E = null>(endpoint: string, params?: any, requestConfig?: AxiosRequestConfig) => {
  const paramsConfig: AxiosRequestConfig | undefined = params ? { params } : undefined;

  return handleRequest<T, E>(
    {
      url: endpoint,
      method: RequestMethodEnum.Get,
    },
    {
      ...paramsConfig,
      ...requestConfig,
    }
  );
};

const post = async <T, E = null>(endpoint: string, data?: any) => {
  const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

  return handleRequest<T, E>(
    {
      url: endpoint,
      method: RequestMethodEnum.Post,
    },
    config
  );
};

const put = async <T, E = null>(endpoint: string, data?: any) => {
  const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

  return handleRequest<T, E>(
    {
      url: endpoint,
      method: RequestMethodEnum.Put,
    },
    config
  );
};

const deleteRequest = async <T, E = null>(endpoint: string) => {
  return handleRequest<T, E>({
    url: endpoint,
    method: RequestMethodEnum.Delete,
  });
};

export default {
  get,
  post,
  put,
  delete: deleteRequest,
};
