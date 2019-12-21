import styles from './HomePage.module.scss';

import React from 'react';
import Actors from './components/actors/Actors';
import MainOverview from './components/main-overview/MainOverview';
import { Divider, Icon, Header } from 'semantic-ui-react';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { RouteComponentProps } from 'react-router-dom';
import ShowsStore from '../../stores/shows/ShowsStore';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import SearchPod from './components/storage-pods/SearchPod';
import { observable } from 'mobx';

interface IRouteParams {}
interface IProps extends RouteComponentProps<IRouteParams> {
  showsStore?: ShowsStore;
  // searchPod?: SearchPod;
}
interface IState {}

@inject(
  (store: RootStore, props, context): Partial<IProps> => ({
    showsStore: store.showsStore,
    // searchPod: new SearchPod(),
  })
)
@observer
export default class HomePage extends React.Component<IProps, IState> {
  @observable
  searchPod = new SearchPod(null, { endpoint: 'http://api.tvmaze.com/singlesearch/shows' });

  render(): JSX.Element {
    const isRequesting = this.props.showsStore!.isRequestingShowAndCast;

    return (
      <div
        className={styles.wrapper}
        onClick={() => this.searchPod!.search('asdfasdf')}
        // onClick={() => this.props.searchPod!.search('asdfasdf')}
      >
        <LoadingIndicator isActive={isRequesting}>
          <div>{this.searchPod!.searchList}</div>
          {/*<div>{this.props.searchPod!.searchList}</div>*/}
          <MainOverview />
          <Divider horizontal={true}>
            <Header as="h4">
              <Icon name="users" /> Cast
            </Header>
          </Divider>
          <Actors />
        </LoadingIndicator>
      </div>
    );
  }
}
