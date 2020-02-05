import { observable, runInAction } from 'mobx';
import IToast from './models/IToast';
import { ToastStatus } from '../../constants/ToastStatus';
import uuid from 'uuid/v4';
import RootStore from '../RootStore';

export interface ToastsStoreState {
  items: IToast[];
}

export const ToastsStore = (rootStore: RootStore, initialState: Partial<ToastsStoreState> = {}) =>
  observable({
    items: [] as IToast[],

    ...initialState,

    add(message: string, type: ToastStatus) {
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

export type ToastsStoreType = ReturnType<typeof ToastsStore>;
