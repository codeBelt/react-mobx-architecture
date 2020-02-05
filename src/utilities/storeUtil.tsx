import { Context, createContext, useContext } from 'react';
import RootStore from '../stores/RootStore';

export let rootStore: RootStore;
export let RootStoreContext: Context<RootStore>;

export const createRootStore = (initialState: RecursivePartial<RootStore> = {}) => {
  if (!rootStore) {
    rootStore = new RootStore(initialState);
    RootStoreContext = createContext(rootStore);
  }

  return rootStore;
};

export const useRootStoreContext = () => useContext(RootStoreContext);
