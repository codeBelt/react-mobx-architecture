import ShowsStore from './shows/ShowsStore';
import ToastsStore from './toasts/ToastsStore';
import { RouterStore } from 'mobx-react-router';

export default class RootStore {
  rootStore: this = this;
  routingStore = new RouterStore();
  showsStore: ShowsStore;
  toastsStore: ToastsStore;

  constructor(initialState: RecursivePartial<RootStore>) {
    this.showsStore = new ShowsStore(this, initialState.showsStore);
    this.toastsStore = new ToastsStore(this, initialState.toastsStore);
  }
}
