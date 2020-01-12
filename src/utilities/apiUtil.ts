import { Constructor } from '../definitions/Constructor';
import { FlattenIfArray } from '../definitions/FlattenIfArray';
import { APIResponse } from '../models/api';
import { createModels } from './modelUtil';

export const responseToModels = async <T>(effect: Promise<APIResponse<T>>, Model: Constructor<FlattenIfArray<T>>): Promise<APIResponse<T>> => {
  const { data, error } = await effect;

  return {
    error,
    data: data ? createModels(Model, data) : null,
  };
};
