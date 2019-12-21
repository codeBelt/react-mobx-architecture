import { Constructor } from '../definitions/Constructor';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import { AxiosResponse } from 'axios';
import HttpUtil from './HttpUtil';
import { SingleItemOrArray } from '../definitions/SingleItemOrArray';
import { FlattenIfArray } from '../definitions/FlattenIfArray';

const _restModelCreator = <T>(
  Model: Constructor<FlattenIfArray<T>>,
  response: AxiosResponse | HttpErrorResponseModel
): SingleItemOrArray<T> | HttpErrorResponseModel => {
  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return !Array.isArray(response.data) ? new Model(response.data) : (response.data.map((json) => new Model(json)) as any);
};

export const getToModel = async <T>(
  Model: Constructor<FlattenIfArray<T>>,
  endpoint: string,
  params?: any
): Promise<SingleItemOrArray<T> | HttpErrorResponseModel> => {
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtil.get(endpoint, params);

  return _restModelCreator<T>(Model, response);
};

export const postToModel = async <T>(
  Model: Constructor<FlattenIfArray<T>>,
  endpoint: string,
  data?: any
): Promise<SingleItemOrArray<T> | HttpErrorResponseModel> => {
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtil.post(endpoint, data);

  return _restModelCreator<T>(Model, response);
};
