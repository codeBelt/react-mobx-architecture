import { observable, runInAction } from 'mobx';
import IToast from './models/IToast';
import ToastStatusEnum from '../../constants/ToastStatusEnum';
import uuid from 'uuid/v4';
import RootStore from '../RootStore';

const ToastsStore = (rootStore: RootStore, initialState: {} = {}) =>
  observable({
    items: [] as IToast[],

    ...initialState,

    add(message: string, type: ToastStatusEnum) {
      const item: IToast = {
        message,
        type,
        id: uuid(),
      };

      runInAction(() => this.items.push(item));
    },

    remove(toastId: string) {
      const filtered = this.items.filter((model: IToast) => model.id !== toastId);

      runInAction(() => (this.items = filtered));
    },
  });

export default ToastsStore;
