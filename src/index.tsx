import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory, History } from 'history';
import App from './views/App';
import environment from 'environment';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import RootStore, { createRootStoreContext } from './stores/RootStore';
import { configure } from 'mobx';

configure({ enforceActions: 'always' }); // https://mobx.js.org/refguide/api.html#enforceactions

(async (window: Window): Promise<void> => {
  const initialState: RecursivePartial<RootStore> = {
    showsStore: {
      currentShowId: '74',
    },
  };

  createRootStoreContext(initialState);

  const routingStore = new RouterStore();
  const browserHistory: History = createBrowserHistory({ basename: environment.route.baseRoute });
  const history = syncHistoryWithStore(browserHistory, routingStore);

  const rootEl: HTMLElement | null = document.getElementById('root');
  const render = (Component: typeof App, el: HTMLElement | null): void => {
    ReactDOM.render(<Component history={history} />, el);
  };

  render(App, rootEl);
})(window);
