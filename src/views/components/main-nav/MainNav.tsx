import styles from './MainNav.module.scss';

import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { MenuNavLink } from './components/MenuNavLink';
import { RouteEnum } from '../../../constants/RouteEnum';
import { observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import { NavSearch } from './components/nav-search/NavSearch';
interface IProps {}

export const MainNav: React.FC<IProps> = observer((props) => {
  const location = useLocation();
  const { pathname } = location;
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
});
