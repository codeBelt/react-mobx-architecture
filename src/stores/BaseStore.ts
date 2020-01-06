import RootStore from './RootStore';
import { runInAction } from 'mobx';
import { IResponseStatus } from '../models/IResponseStatus';
import ToastStatusEnum from '../constants/ToastStatusEnum';
import { APIResponse } from '../models/api';

export default class BaseStore {
  protected rootStore: RootStore;

  constructor(rootStore: RootStore, initialState: {} = {}) {
    this.rootStore = rootStore;

    Object.entries(initialState).forEach(([key, value]) => {
      runInAction(() => (this[key] = value));
    });
  }

  async requestAction<T>(callback: (status: Partial<IResponseStatus<T>>) => void, effect: Promise<APIResponse<T>>): Promise<IResponseStatus<T>> {
    let statusData: Partial<IResponseStatus<T>> = {
      isRequesting: true,
    };

    runInAction(() => callback(statusData));

    const { data, error } = await effect;

    statusData = { ...statusData };

    if (error) {
      statusData.error = error;

      this.rootStore.toastsStore.add(error.message, ToastStatusEnum.Error);
    } else {
      statusData.data = data!;
    }

    statusData.isRequesting = false;

    runInAction(() => callback(statusData));

    return statusData as IResponseStatus<T>;
  }
}
