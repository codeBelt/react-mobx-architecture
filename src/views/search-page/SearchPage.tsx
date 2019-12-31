import styles from './SearchPage.module.scss';

import React from 'react';
import environment from 'environment';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import SearchPod from './storage-pods/SearchPod';
import { observable } from 'mobx';
import { RouterStore } from 'mobx-react-router';
import { Form, Item } from 'semantic-ui-react';
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import { FormProps } from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import RouteEnum from '../../constants/RouteEnum';
import queryString from 'query-string';
import SearchResults from './components/search-results/SearchResults';

interface IRouteParams {
  term: 'term';
}
interface IProps extends RouteComponentProps<IRouteParams> {
  routingStore?: RouterStore;
  rootStore?: RootStore;
}
interface IState {}

@inject('routingStore', 'rootStore')
@observer
export default class SearchPage extends React.Component<IProps, IState> {
  @observable searchPod = new SearchPod(this.props.rootStore!, { endpoint: environment.api.showsSearch });

  componentDidMount() {
    const searchTerm = this._getSearchValue();

    this.searchPod.setInputValue(searchTerm);

    if (searchTerm) {
      this.searchPod.search(searchTerm);
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    const searchTerm = this._getSearchValue();

    if (searchTerm !== this.searchPod.currentSearchTerm) {
      this.searchPod.search(searchTerm);
    }
  }

  render(): JSX.Element {
    const { isRequesting, data } = this.searchPod.searchResults;
    const { inputValue } = this.searchPod;

    return (
      <div className={styles.wrapper}>
        <Form onSubmit={this._onClickSearch}>
          <Form.Input
            name="searchTerm"
            loading={isRequesting}
            icon="search"
            iconPosition="left"
            placeholder="Search..."
            value={inputValue}
            onChange={this._onChangeInput}
          />
        </Form>
        <Item.Group divided>
          {data.map((model) => (
            <SearchResults key={model.id} item={model} />
          ))}
        </Item.Group>
      </div>
    );
  }

  _onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.searchPod.setInputValue(data.value);
  };

  _onClickSearch = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    const { inputValue } = this.searchPod;

    this.props.routingStore!.push(`${RouteEnum.Search}?term=${inputValue}`);
  };

  _getSearchValue() {
    const { location } = this.props.routingStore!;
    const params = queryString.parse(location.search);
    const value = (params?.term as string) ?? '';

    return value;
  }
}
