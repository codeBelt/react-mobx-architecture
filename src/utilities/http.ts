import { AxiosRequestConfig } from 'axios';
import { handleRequest } from './http/httpRequestUtil';
import { RequestMethod } from '../constants/RequestMethod';

const get = async <T, P = any, E = null>(endpoint: string, params?: P, requestConfig?: AxiosRequestConfig) => {
  const paramsConfig: AxiosRequestConfig | undefined = params ? { params } : undefined;

  return handleRequest<T, E>(
    {
      url: endpoint,
      method: RequestMethod.Get,
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
      method: RequestMethod.Post,
    },
    config
  );
};

const put = async <T, E = null>(endpoint: string, data?: any) => {
  const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

  return handleRequest<T, E>(
    {
      url: endpoint,
      method: RequestMethod.Put,
    },
    config
  );
};

const deleteRequest = async <T, E = null>(endpoint: string) => {
  return handleRequest<T, E>({
    url: endpoint,
    method: RequestMethod.Delete,
  });
};

export default {
  get,
  post,
  put,
  delete: deleteRequest,
};
