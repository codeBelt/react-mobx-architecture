import { action, computed, observable } from 'mobx';
import BaseStore from '../../../../stores/BaseStore';

export default class SearchPod extends BaseStore {
  @observable endpoint: string = '';
  @observable results: any[] = [];

  @action
  search(searchTerm: string): void {
    this.results.push(searchTerm);
  }

  @computed
  get searchList(): string {
    return `${this.endpoint}${this.results.join('|')}`;
  }
}

// A function that performs no operations.
// export const noop = Function.prototype as () => void;

// const { useState } = React;
// const { extendObservable } = mobx;
// const { observer, useObservable } = mobxReact;
//
// class Store {
//   constructor() {
//     console.log("Created a store");
//     extendObservable(this, {
//       count: 0
//     });
//   }
// }
//
// const App = observer(() => {
//   const [store] = useState(() => new Store());
//
//   return <button onClick={() => ++store.count}>{store.count}</button>
// });
//
// ReactDOM.render(<App />, document.getElementById("root"));
