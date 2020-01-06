import styles from './SearchPage.module.scss';

import React, { useCallback, useContext, useEffect } from 'react';
import environment from 'environment';
import { RouteComponentProps } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react';
import { Form, FormProps, InputOnChangeData, Item } from 'semantic-ui-react';
import SearchResult from './components/search-result/SearchResult';
import RouteEnum from '../../constants/RouteEnum';
import SearchStore from './stores/SearchStore';
import { RootStoreContext } from '../../stores/RootStore';
import queryString from 'query-string';

interface IRouteParams {
  term: 'term';
}
interface IProps extends RouteComponentProps<IRouteParams> {}

const SearchPage: React.FC<IProps> = observer((props) => {
  const { rootStore } = useContext(RootStoreContext);
  const searchStore = useLocalStore(() => new SearchStore(rootStore, { endpoint: environment.api.showsSearch }));

  useEffect(() => {
    const params = queryString.parse(props.location.search);
    const searchTerm = (params?.term as string) ?? '';

    searchStore.setInputValue(searchTerm);

    if (searchTerm !== searchStore.currentSearchTerm) {
      searchStore.search(searchTerm);
    }
  }, [props.location.search, searchStore]);

  const { isRequesting, data } = searchStore.searchResults;
  const { inputValue } = searchStore;

  const onClickSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
      const { inputValue } = searchStore;

      props.history.push(`${RouteEnum.Search}?term=${inputValue}`);
    },
    [props.history, searchStore]
  );
  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      searchStore.setInputValue(data.value);
    },
    [searchStore]
  );

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={onClickSearch}>
        <Form.Input
          name="searchTerm"
          loading={isRequesting}
          icon="search"
          iconPosition="left"
          placeholder="Search..."
          value={inputValue}
          onChange={onChangeInput}
        />
      </Form>
      <Item.Group divided>
        {data.map((model) => (
          <SearchResult key={model.id} item={model} />
        ))}
      </Item.Group>
    </div>
  );
});

export default SearchPage;
