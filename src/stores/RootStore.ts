import ShowsStore from './shows/ShowsStore';
import ToastsStore from './toasts/ToastsStore';
import React, { Context } from 'react';

export default class RootStore {
  showsStore: ShowsStore;
  toastsStore: ToastsStore;
  // routingStore: RouterStore;

  constructor(initialState: RecursivePartial<RootStore>) {
    this.showsStore = new ShowsStore(this, initialState.showsStore);
    this.toastsStore = new ToastsStore(this, initialState.toastsStore);
    // this.routingStore = new RouterStore();
  }
}

export let rootStoreContext: Context<any>; // TODO: is this the correct type?

export const createRootStoreContext = (initialState: RecursivePartial<RootStore> = {}): void => {
  const rootStore = new RootStore(initialState);

  rootStoreContext = React.createContext({ rootStore, ...rootStore });
};
