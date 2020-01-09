import ShowsStore from './shows/ShowsStore';
import ToastsStore from './toasts/ToastsStore';
import { RouterStore } from 'mobx-react-router';

export default class RootStore {
  readonly rootStore: this = this;
  readonly routingStore = new RouterStore();

  readonly showsStore: ReturnType<typeof ShowsStore>;
  readonly toastsStore: ReturnType<typeof ToastsStore>;

  constructor(initialState: RecursivePartial<RootStore>) {
    this.showsStore = ShowsStore(this, initialState.showsStore);
    this.toastsStore = ToastsStore(this, initialState.toastsStore);
  }
}
