import * as React from 'react';
import { Icon, Item, Label } from 'semantic-ui-react';
import ShowModel from '../../../../stores/shows/models/shows/ShowModel';
import { observer } from 'mobx-react';
import { RouteEnum } from '../../../../constants/RouteEnum';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { rootStore } from '../../../../index';

interface IProps {
  item: ShowModel;
}

export const SearchResult: React.FC<IProps> = observer((props) => {
  const { item } = props;
  const history = useHistory();
  const { showsStore } = rootStore;

  const onClick = useCallback(() => {
    const showId = item.id.toString();

    showsStore.setCurrentShowId(showId);
    history.push(RouteEnum.Home);
  }, [history, item.id, showsStore]);

  return (
    <Item>
      <Item.Image src={item.image?.medium} />
      <Item.Content>
        <Item.Header as="a" onClick={onClick}>
          {item.name} <Icon name="eye" />
        </Item.Header>
        <Item.Meta>
          <span className="cinema">{item.id}</span>
        </Item.Meta>
        <Item.Description>
          <div dangerouslySetInnerHTML={{ __html: item.summary }} />
        </Item.Description>
        <Item.Extra>
          <Label icon="globe" content={item.language} />
          {item.genres.length > 0 && <Label>{item.genres.join(' | ')}</Label>}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
});
