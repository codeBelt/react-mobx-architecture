import styles from './HomePage.module.scss';

import React, { useContext } from 'react';
import Actors from './components/actors/Actors';
import MainOverview from './components/main-overview/MainOverview';
import { Divider, Icon, Header } from 'semantic-ui-react';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { RootStoreContext } from '../../index';

interface IRouteParams {}
interface IProps extends RouteComponentProps<IRouteParams> {}

const HomePage: React.FC<IProps> = observer((props) => {
  const { showsStore } = useContext(RootStoreContext);
  const isRequesting = showsStore!.isRequestingShowAndCast;

  return (
    <div className={styles.wrapper}>
      <LoadingIndicator isActive={isRequesting}>
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
});

export default HomePage;
