import { RootStore } from './rootStore';
import { runInAction } from 'mobx';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import { IRequestStatus } from '../models/IRequestStatus';
import ToastStatusEnum from '../constants/ToastStatusEnum';

export default class BaseStore {
  protected rootStore: RootStore;

  constructor(rootStore: RootStore, initialState: any) {
    this.rootStore = rootStore;

    Object.entries(initialState ?? {}).forEach(([key, value]) => {
      runInAction(() => (this[key] = value));
    });
  }

  async requestAction<T>(setStatus: (requestData: Partial<IRequestStatus<T>>) => void, effect: Promise<any>) {
    // const status: Pick<IRequestStatus, 'isRequesting'> = {
    let status: any = {
      isRequesting: true,
    };

    runInAction(() => setStatus(status));

    const response = await effect;

    status = { ...status };

    if (response instanceof HttpErrorResponseModel) {
      status.error = response;

      this.rootStore.toastsStore.add(response.message, ToastStatusEnum.Error);
    } else {
      status.data = response;
    }

    status.isRequesting = false;

    runInAction(() => setStatus(status));
  }
}
