import { ShowsStore, ShowsStoreType } from './shows/ShowsStore';
import { ToastsStore, ToastsStoreType } from './toasts/ToastsStore';
import { RouterStore } from 'mobx-react-router';

export default class RootStore {
  readonly routingStore = new RouterStore();
  readonly showsStore: ShowsStoreType;
  readonly toastsStore: ToastsStoreType;

  constructor(initialState: Partial<RootStore>) {
    this.showsStore = ShowsStore(this, initialState.showsStore);
    this.toastsStore = ToastsStore(this, initialState.toastsStore);
  }
}
