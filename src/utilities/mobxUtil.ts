import RootStore from '../stores/RootStore';
import { IResponseStatus } from '../models/IResponseStatus';
import { APIResponse } from '../models/api';
import { runInAction } from 'mobx';
import ToastStatusEnum from '../constants/ToastStatusEnum';

export const requestAction = (rootStore: RootStore) => {
  return async <T>(callback: (status: Partial<IResponseStatus<T>>) => void, effect: Promise<APIResponse<T>>): Promise<IResponseStatus<T>> => {
    let statusData: Partial<IResponseStatus<T>> = {
      isRequesting: true,
    };

    runInAction(() => callback(statusData));

    const { data, error } = await effect;

    statusData = { ...statusData };

    if (error) {
      statusData.error = error;

      rootStore.toastsStore.add(error.message, ToastStatusEnum.Error);
    } else {
      statusData.data = data!;
    }

    statusData.isRequesting = false;

    runInAction(() => callback(statusData));

    return statusData as IResponseStatus<T>;
  };
};
