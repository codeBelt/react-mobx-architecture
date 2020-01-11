// import styles from './NavSearch.module.scss';

import React, { useCallback, useState } from 'react';
import { Form, InputOnChangeData, FormProps } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { RouteEnum } from '../../../../../constants/RouteEnum';

interface IProps {}

const NavSearch: React.FC<IProps> = observer((props) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

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
    <Form onSubmit={onClickSearch}>
      <Form.Input
        name="searchTerm"
        icon={{ name: 'search', icon: 'search' }}
        placeholder="Search for Shows..."
        value={searchTerm}
        onChange={onChangeInput}
      />
    </Form>
  );
});

export default NavSearch;
