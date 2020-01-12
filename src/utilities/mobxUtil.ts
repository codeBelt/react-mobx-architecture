import { UnknownResponseStatus } from '../models/IResponseStatus';
import { APIResponse } from '../models/api';
import { runInAction } from 'mobx';
import { ToastStatus } from '../constants/ToastStatus';
import { rootStore } from '../index';

export const requestAction = async <T>(
  callback: (status: UnknownResponseStatus<T>) => void,
  effect: Promise<APIResponse<T>>
): Promise<UnknownResponseStatus<T>> => {
  let statusData: UnknownResponseStatus<T> = {
    isRequesting: true,
  };

  runInAction(() => callback(statusData));

  const { data, error } = await effect;

  statusData = {
    isRequesting: false,
  };

  if (error) {
    statusData.error = error;

    rootStore.toastsStore.add(error.message, ToastStatus.Error);
  } else {
    statusData.data = data!;
  }

  runInAction(() => callback(statusData));

  return statusData;
};
