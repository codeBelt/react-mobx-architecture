import RootStore from '../stores/RootStore';
import { UnknownResponseStatus } from '../models/IResponseStatus';
import { APIResponse } from '../models/api';
import { runInAction } from 'mobx';
import { ToastStatus } from '../constants/ToastStatus';
import { useContext } from 'react';
import { RootStoreContext } from '../index';

export const useRootStore = () => useContext(RootStoreContext);

export const requestAction = (rootStore: RootStore) => {
  return async <T>(callback: (status: UnknownResponseStatus<T>) => void, effect: Promise<APIResponse<T>>): Promise<UnknownResponseStatus<T>> => {
    let statusData: UnknownResponseStatus<T> = {
      isRequesting: true,
    };

    runInAction(() => callback(statusData));

    const { data, error } = await effect;

    statusData = { ...statusData };

    if (error) {
      statusData.error = error;

      rootStore.toastsStore.add(error.message, ToastStatus.Error);
    } else {
      statusData.data = data!;
    }

    statusData.isRequesting = false;

    runInAction(() => callback(statusData));

    return statusData;
  };
};
