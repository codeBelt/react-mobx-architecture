import { Constructor } from '../definitions/Constructor';
import HttpUtil from './HttpUtil';
import { FlattenIfArray } from '../definitions/FlattenIfArray';
import { APIResponse } from '../models/api';

export const createModels = <T>(Model: Constructor<FlattenIfArray<T>>, data: T) => {
  return !Array.isArray(data) ? new Model(data) : (data.map((json) => new Model(json)) as any);
};

export const getToModel = async <T>(Model: Constructor<FlattenIfArray<T>>, endpoint: string, params?: any): Promise<APIResponse<T>> => {
  const { data, error } = await HttpUtil.get<T>(endpoint, params);

  return {
    error,
    data: data ? createModels(Model, data) : null,
  };
};
