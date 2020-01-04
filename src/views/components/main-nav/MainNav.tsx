import styles from './MainNav.module.scss';

import React, { useCallback, useState } from 'react';
import { Menu, Segment, Form, InputOnChangeData, FormProps } from 'semantic-ui-react';
import MenuNavLink from './components/MenuNavLink';
import RouteEnum from '../../../constants/RouteEnum';
import { observer } from 'mobx-react';
import { useLocation, useHistory } from 'react-router-dom';
interface IProps {}

const MainNav: React.FC<IProps> = observer((props) => {
  const location = useLocation();
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState('');
  const { pathname } = location;
  const hideSearchInput = pathname !== RouteEnum.Search;

  const onChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setSearchTerm(data.value);
  }, []);
  const onClickSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
      history.push(`${RouteEnum.Search}?term=${searchTerm}`);

      setSearchTerm('');
    },
    [history, searchTerm]
  );

  return (
    <Segment inverted={true} className={styles.wrapper}>
      <Menu inverted={true} pointing={true} secondary={true}>
        <Menu.Item as={MenuNavLink} to={RouteEnum.Home} name="Home" />
        <Menu.Item as={MenuNavLink} to={RouteEnum.Episodes} name="Episodes" />
        <Menu.Item as={MenuNavLink} to={RouteEnum.About} name="About" />
      </Menu>
      {hideSearchInput && (
        <Form onSubmit={onClickSearch}>
          <Form.Input
            name="searchTerm"
            icon={{ name: 'search', icon: 'search' }}
            placeholder="Search for Shows..."
            value={searchTerm}
            onChange={onChangeInput}
          />
        </Form>
      )}
    </Segment>
  );
});

export default MainNav;
