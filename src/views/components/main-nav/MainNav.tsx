import styles from './MainNav.module.scss';

import React from 'react';
import { Menu, Segment, Form } from 'semantic-ui-react';
import MenuNavLink from './components/MenuNavLink';
import RouteEnum from '../../../constants/RouteEnum';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { FormProps } from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input';

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
        {hideSearchInput && (
          <Form onSubmit={this._onClickSearch}>
            <Form.Input
              name="searchTerm"
              icon={{ name: 'search', icon: 'search' }}
              placeholder="Search for Shows..."
              value={this.state.searchTerm}
              onChange={this._onChangeInput}
            />
          </Form>
        )}
      </Segment>
    );
  }

  _onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.setState({ searchTerm: data.value });
  };

  _onClickSearch = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    const { searchTerm } = this.state;

    this.props.routingStore!.push(`${RouteEnum.Search}?term=${searchTerm}`);

    this.setState({ searchTerm: '' });
  };
}
