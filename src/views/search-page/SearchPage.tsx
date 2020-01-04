import styles from './SearchPage.module.scss';

import React, { useCallback, useContext, useEffect } from 'react';
import environment from 'environment';
import { RouteComponentProps } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react';
import { Form, FormProps, InputOnChangeData, Item } from 'semantic-ui-react';
import SearchResults from './components/search-results/SearchResults';
import RouteEnum from '../../constants/RouteEnum';
import SearchPod from './storage-pods/SearchPod';
import { rootStoreContext } from '../../stores/RootStore';
import queryString from 'query-string';

interface IRouteParams {
  term: 'term';
}
interface IProps extends RouteComponentProps<IRouteParams> {}

const SearchPage: React.FC<IProps> = observer((props) => {
  const { rootStore } = useContext(rootStoreContext);
  const searchPod = useLocalStore(() => new SearchPod(rootStore, { endpoint: environment.api.showsSearch }));

  useEffect(() => {
    const params = queryString.parse(props.location.search);
    const searchTerm = (params?.term as string) ?? '';

    searchPod.setInputValue(searchTerm);

    if (searchTerm !== searchPod.currentSearchTerm) {
      searchPod.search(searchTerm);
    }
  }, [props.location.search, searchPod]);

  const { isRequesting, data } = searchPod.searchResults;
  const { inputValue } = searchPod;

  const onClickSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
      const { inputValue } = searchPod;

      props.history.push(`${RouteEnum.Search}?term=${inputValue}`);
    },
    [props.history, searchPod]
  );
  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      searchPod.setInputValue(data.value);
    },
    [searchPod]
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
          <SearchResults key={model.id} item={model} />
        ))}
      </Item.Group>
    </div>
  );
});

export default SearchPage;
