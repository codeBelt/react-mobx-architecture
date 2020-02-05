import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { App } from './views/App';
import environment from 'environment';
import { syncHistoryWithStore } from 'mobx-react-router';
import RootStore from './stores/RootStore';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { createRootStore } from './utilities/storeUtil';

configure({ enforceActions: 'always' }); // https://mobx.js.org/refguide/api.html#enforceactions

(async (window: Window): Promise<void> => {
  const initialState: RecursivePartial<RootStore> = {
    showsStore: {
      currentShowId: '74',
    },
  };

  const rootStore = createRootStore(initialState);

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
