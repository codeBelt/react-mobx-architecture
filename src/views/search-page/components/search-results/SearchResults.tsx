import * as React from 'react';
import { Item, Label } from 'semantic-ui-react';
import ShowModel from '../../../../stores/shows/models/shows/ShowModel';
import { inject, observer } from 'mobx-react';
import ShowsStore from '../../../../stores/shows/ShowsStore';
import { RouterStore } from 'mobx-react-router';
import RouteEnum from '../../../../constants/RouteEnum';

interface IProps {
  item: ShowModel;
  showsStore?: ShowsStore;
  routingStore?: RouterStore;
}
interface IState {}

@inject('showsStore', 'routingStore')
@observer
export default class SearchResults extends React.Component<IProps, IState> {
  public render(): JSX.Element {
    const { item } = this.props;

    return (
      <Item>
        <Item.Image src={item.image?.medium} />
        <Item.Content>
          <Item.Header as="a" onClick={this._onClick}>
            {item.name}
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
  }

  _onClick = () => {
    const showId = this.props.item.id.toString();

    this.props.showsStore!.setCurrentShowId(showId);
    this.props.routingStore!.push(RouteEnum.Home);
  };
}
