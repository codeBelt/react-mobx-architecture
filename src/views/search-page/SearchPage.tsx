import styles from './SearchPage.module.scss';

import React from 'react';
import environment from 'environment';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import SearchPod from './storage-pods/SearchPod';
import { observable } from 'mobx';
import { RouterStore } from 'mobx-react-router';
import { Form } from 'semantic-ui-react';
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import { FormProps } from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import RouteEnum from '../../constants/RouteEnum';
import queryString, { ParsedQuery } from 'query-string';

interface IRouteParams {
  q: string;
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
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    const searchTerm = this._getSearchValue();

    // this.searchPod.setInputValue(searchTerm);
    console.log(`prevProps`);
  }

  render(): JSX.Element {
    const { inputValue } = this.searchPod;

    return (
      <div className={styles.wrapper}>
        <Form onSubmit={this._onClickSearch}>
          <Form.Input
            name="searchTerm"
            loading={true}
            icon="search"
            iconPosition="left"
            placeholder="Search..."
            value={inputValue}
            onChange={this._onChangeInput}
          />
        </Form>
      </div>
    );
  }

  _onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.searchPod.setInputValue(data.value);
  };

  _onClickSearch = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    const { inputValue } = this.searchPod;

    this.props.routingStore!.push(`${RouteEnum.Search}?q=${inputValue}`);
  };

  _getSearchValue() {
    const { location } = this.props.routingStore!;
    const params = queryString.parse(location.search);
    const value = (params?.q as string) ?? '';

    return value;
  }
}

// const { useState } = React;
// const { extendObservable } = mobx;
// const { observer, useObservable } = mobxReact;
//
// class Store {
//   constructor() {
//     console.log("Created a store");
//     extendObservable(this, {
//       count: 0
//     });
//   }
// }
//
// const App = observer(() => {
//   const [store] = useState(() => new Store());
//
//   return <button onClick={() => ++store.count}>{store.count}</button>
// });
//
// ReactDOM.render(<App />, document.getElementById("root"));
