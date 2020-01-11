import React, { Suspense, lazy } from 'react';
import { History } from 'history';
import { Route, Switch, Router } from 'react-router-dom';
import { RouteEnum } from '../constants/RouteEnum';
import MainNav from './components/main-nav/MainNav';
import LoadingIndicator from './components/loading-indicator/LoadingIndicator';
import Toasts from './components/toasts/Toasts';

const HomePage = lazy(() => import('./home-page/HomePage'));
const NotFoundPage = lazy(() => import('./not-found-page/NotFoundPage'));
const EpisodesPage = lazy(() => import('./episodes-page/EpisodesPage'));
const AboutPage = lazy(() => import('./about-page/AboutPage'));
const SearchPage = lazy(() => import('./search-page/SearchPage'));

interface IProps {
  readonly history: History;
}

const App: React.FC<IProps> = (props) => {
  return (
    <Router history={props.history}>
      <Suspense fallback={<LoadingIndicator isActive={true} />}>
        <MainNav />
        <Switch>
          <Route exact={true} path={RouteEnum.Home} component={HomePage} />
          <Route path={RouteEnum.Episodes} component={EpisodesPage} />
          <Route path={RouteEnum.About} component={AboutPage} />
          <Route path={RouteEnum.Search} component={SearchPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Toasts />
      </Suspense>
    </Router>
  );
};

export default App;
