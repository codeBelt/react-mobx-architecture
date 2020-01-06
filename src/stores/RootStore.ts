import ShowsStore from './shows/ShowsStore';
import ToastsStore from './toasts/ToastsStore';
import { RouterStore } from 'mobx-react-router';

export default class RootStore {
  readonly rootStore: this = this;
  readonly routingStore = new RouterStore();
  readonly showsStore: ShowsStore;
  readonly toastsStore: ToastsStore;

  constructor(initialState: RecursivePartial<RootStore>) {
    this.showsStore = new ShowsStore(this, initialState.showsStore);
    this.toastsStore = new ToastsStore(this, initialState.toastsStore);
  }
}
