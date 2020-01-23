import { Constructor } from '../definitions/Constructor';
import { FlattenIfArray } from '../definitions/FlattenIfArray';
import { APIResponse } from '../models/api';
import { createModels } from './modelUtil';
import { ToastStatus } from '../constants/ToastStatus';
import { rootStore } from '../index';

export const responseToModels = <T>(Model: Constructor<FlattenIfArray<T>>) => {
  return (response: APIResponse<T>): APIResponse<T> => {
    const { data } = response;

    return data ? { data: createModels(Model, data) } : response;
  };
};

export const toastResponseError = <T>(response: APIResponse<T>): APIResponse<T> => {
  const { error } = response;

  if (error) {
    rootStore.toastsStore.add(error.message, ToastStatus.Error);
  }

  return response;
};
