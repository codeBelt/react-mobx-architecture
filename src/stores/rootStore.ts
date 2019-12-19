import { RouterStore } from 'mobx-react-router';
import ShowsStore from './shows/ShowsStore';
import ToastsStore from './toasts/ToastsStore';

export class RootStore {
  showsStore: ShowsStore;
  toastsStore: ToastsStore;
  routingStore: RouterStore;

  constructor(initialState: RecursivePartial<RootStore>) {
    this.showsStore = new ShowsStore(this, initialState.showsStore);
    this.toastsStore = new ToastsStore(this, initialState.toastsStore);
    this.routingStore = new RouterStore();
  }
}
