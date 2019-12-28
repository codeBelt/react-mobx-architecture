import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import { APIResponse } from '../models/api';

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Head = 'HEAD',
  Patch = 'PATCH',
}

export default class HttpUtil {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static async get<T, E = null>(endpoint: string, params?: any, requestConfig?: AxiosRequestConfig) {
    const paramsConfig: AxiosRequestConfig | undefined = params ? { params } : undefined;

    return HttpUtil._request<T, E>(
      {
        url: endpoint,
        method: RequestMethod.Get,
      },
      {
        ...paramsConfig,
        ...requestConfig,
      }
    );
  }

  static async post<T, E = null>(endpoint: string, data?: any) {
    const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

    return HttpUtil._request<T, E>(
      {
        url: endpoint,
        method: RequestMethod.Post,
      },
      config
    );
  }

  static async put<T, E = null>(endpoint: string, data?: any) {
    const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

    return HttpUtil._request<T, E>(
      {
        url: endpoint,
        method: RequestMethod.Put,
      },
      config
    );
  }

  static async delete<T, E = null>(endpoint: string) {
    return HttpUtil._request<T, E>({
      url: endpoint,
      method: RequestMethod.Delete,
    });
  }

  private static async _request<T, E>(restRequest: Partial<Request>, config?: AxiosRequestConfig): Promise<APIResponse<T, E>> {
    if (!Boolean(restRequest.url)) {
      console.error(`Received ${restRequest.url} which is invalid for a endpoint url`);
    }

    try {
      const axiosRequestConfig: AxiosRequestConfig = {
        ...config,
        method: restRequest.method as Method,
        url: restRequest.url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...config?.headers,
        },
      };
      const axiosResponse: AxiosResponse<T> = await axios(axiosRequestConfig);

      return { data: axiosResponse.data };
    } catch (error) {
      let errorResponse;

      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        const { status, statusText, data } = error.response;
        const errors: string[] = data.hasOwnProperty('errors') ? [statusText, ...data.errors] : [statusText];

        errorResponse = HttpUtil._fillInErrorWithDefaults(
          {
            status,
            message: errors.filter(Boolean).join(' - '),
            errors,
            url: error.request.responseURL,
            raw: error.response,
          },
          restRequest
        );
      } else if (error.request) {
        // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
        const { status, statusText, responseURL } = error.request;

        errorResponse = HttpUtil._fillInErrorWithDefaults(
          {
            status,
            message: statusText,
            errors: [statusText],
            url: responseURL,
            raw: error.request,
          },
          restRequest
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        errorResponse = HttpUtil._fillInErrorWithDefaults(
          {
            status: 0,
            message: error.message,
            errors: [error.message],
            url: restRequest.url!,
            raw: error,
          },
          restRequest
        );
      }

      return { error: errorResponse };
    }
  }

  private static _fillInErrorWithDefaults(error: Partial<HttpErrorResponseModel>, request: Partial<Request>): HttpErrorResponseModel {
    const model = new HttpErrorResponseModel();

    model.status = error.status || 0;
    model.message = error.message || 'Error requesting data';
    model.errors = error.errors!.length ? error.errors! : ['Error requesting data'];
    model.url = error.url || request.url!;
    model.raw = error.raw;

    // Remove anything with undefined or empty strings.
    model.errors = model.errors.filter(Boolean);

    return model;
  }
}
