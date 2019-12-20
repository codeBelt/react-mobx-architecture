import RootStore from './RootStore';
import { runInAction } from 'mobx';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import { IResponseStatus } from '../models/IResponseStatus';
import ToastStatusEnum from '../constants/ToastStatusEnum';

export default class BaseStore {
  protected rootStore: RootStore | null;

  constructor(rootStore?: RootStore | null, initialState: {} = {}) {
    this.rootStore = rootStore ?? null;

    Object.entries(initialState).forEach(([key, value]) => {
      runInAction(() => (this[key] = value));
    });
  }

  async requestAction<T>(
    callback: (status: Partial<IResponseStatus<T>>) => void,
    effect: Promise<T | HttpErrorResponseModel>
  ): Promise<IResponseStatus<T>> {
    let statusData: Partial<IResponseStatus<T>> = {
      isRequesting: true,
    };

    runInAction(() => callback(statusData));

    const response = await effect;

    statusData = { ...statusData };

    if (response instanceof HttpErrorResponseModel) {
      statusData.error = response;

      if (this.rootStore) {
        this.rootStore.toastsStore.add(response.message, ToastStatusEnum.Error);
      }
    } else {
      statusData.data = response;
    }

    statusData.isRequesting = false;

    runInAction(() => callback(statusData));

    return statusData as IResponseStatus<T>;
  }
}
