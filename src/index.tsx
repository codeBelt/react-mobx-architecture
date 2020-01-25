import './index.scss';

import React, { Context } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { App } from './views/App';
import environment from 'environment';
import { syncHistoryWithStore } from 'mobx-react-router';
import RootStore from './stores/RootStore';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

configure({ enforceActions: 'always' }); // https://mobx.js.org/refguide/api.html#enforceactions

export let RootStoreContext: Context<RootStore>;
export let rootStore: RootStore;

(async (window: Window): Promise<void> => {
  const initialState: RecursivePartial<RootStore> = {
    showsStore: {
      currentShowId: '74',
    },
  };

  rootStore = new RootStore(initialState);
  RootStoreContext = React.createContext(rootStore);

  const browserHistory = createBrowserHistory({ basename: environment.route.baseRoute });
  const history = syncHistoryWithStore(browserHistory, rootStore.routingStore);

  const rootEl: HTMLElement | null = document.getElementById('root');
  const render = (Component: typeof App, el: HTMLElement | null): void => {
    ReactDOM.render(
      <Provider {...rootStore}>
        <Component history={history} />
      </Provider>,
      el
    );
  };

  render(App, rootEl);
})(window);
