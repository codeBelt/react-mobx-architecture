import { UnknownResponseStatus } from '../models/IResponseStatus';
import { APIResponse } from '../models/api';
import { runInAction } from 'mobx';
import pWaterfall from 'p-waterfall';

export const requestAction = async <T>(
  callback: (status: UnknownResponseStatus<T>) => void,
  effect: Promise<APIResponse<T>>,
  ...transformers: ((response: APIResponse<T>) => APIResponse<T>)[]
): Promise<UnknownResponseStatus<T>> => {
  let statusData: UnknownResponseStatus<T> = {
    isRequesting: true,
  };

  runInAction(() => callback(statusData));

  const { data, error } = await pWaterfall(transformers as any, effect);

  statusData = {
    isRequesting: false,
  };

  if (error) {
    statusData.error = error;
  } else {
    statusData.data = data!;
  }

  runInAction(() => callback(statusData));

  return statusData;
};
