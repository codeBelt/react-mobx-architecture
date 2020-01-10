import styles from './MainNav.module.scss';

import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import MenuNavLink from './components/MenuNavLink';
import RouteEnum from '../../../constants/RouteEnum';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import NavSearch from './components/nav-search/NavSearch';

interface IProps {
  routingStore?: RouterStore;
}
interface IState {
  searchTerm: string;
}

@inject('routingStore')
@observer
export default class MainNav extends React.PureComponent<IProps, IState> {
  state: IState = {
    searchTerm: '',
  };

  render(): JSX.Element {
    const { pathname } = this.props.routingStore!.location;
    const hideSearchInput = pathname !== RouteEnum.Search;

    return (
      <Segment inverted={true} className={styles.wrapper}>
        <Menu inverted={true} pointing={true} secondary={true}>
          <Menu.Item as={MenuNavLink} to={RouteEnum.Home} name="Home" />
          <Menu.Item as={MenuNavLink} to={RouteEnum.Episodes} name="Episodes" />
          <Menu.Item as={MenuNavLink} to={RouteEnum.About} name="About" />
        </Menu>
        {hideSearchInput && <NavSearch />}
      </Segment>
    );
  }
}
