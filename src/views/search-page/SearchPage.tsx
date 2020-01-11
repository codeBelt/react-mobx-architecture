import styles from './SearchPage.module.scss';

import React, { useCallback, useEffect, useState } from 'react';
import environment from 'environment';
import { RouteComponentProps } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react';
import { Form, InputOnChangeData, Item, Label, Icon } from 'semantic-ui-react';
import { SearchResult } from './components/search-result/SearchResult';
import { RouteEnum } from '../../constants/RouteEnum';
import { SearchLocalStore } from './stores/SearchLocalStore';
import queryString from 'query-string';
import { useRootStore } from '../../utilities/mobxUtil';

interface IRouteParams {
  term: 'term';
}
interface IProps extends RouteComponentProps<IRouteParams> {}

const SearchPage: React.FC<IProps> = observer((props) => {
  const { rootStore } = useRootStore();
  const [inputValue, setInputValue] = useState('');
  const searchStore = useLocalStore(SearchLocalStore, { rootStore, endpoint: environment.api.showsSearch });

  useEffect(() => {
    const params = queryString.parse(props.location.search);
    const searchTerm = (params?.term as string) ?? '';

    setInputValue(searchTerm);
    searchStore.search(searchTerm);
  }, [props.location.search, searchStore]);

  const { isRequesting, data } = searchStore.searchResults;

  const onClickSearch = useCallback(() => {
    props.history.push(`${RouteEnum.Search}?term=${inputValue}`);
  }, [props.history, inputValue]);
  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      setInputValue(data.value);
    },
    [setInputValue]
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
        <div>
          <Label>
            <Icon name="list" /> {searchStore.resultsText}
          </Label>
        </div>
      </Form>
      <Item.Group divided={true}>
        {data.map((model) => (
          <SearchResult key={model.id} item={model} />
        ))}
      </Item.Group>
    </div>
  );
});

export default SearchPage;
