import styles from './SearchResults.module.scss';

import * as React from 'react';
import { Form, Item, Label } from 'semantic-ui-react';
import ShowModel from '../../../../stores/shows/models/shows/ShowModel';

interface IProps {
  list: ShowModel[];
}
interface IState {}

export default class SearchResults extends React.Component<IProps, IState> {
  public render(): JSX.Element {
    return (
      <Item.Group divided>
        {this.props.list.map((model) => (
          <Item key={model.id}>
            <Item.Image src="/images/wireframe/image.png" />
            <Item.Content>
              <Item.Header as="a">{model.name}</Item.Header>
              <Item.Meta>
                <span className="cinema">{model.id}</span>
              </Item.Meta>
              <Item.Description>
                <div dangerouslySetInnerHTML={{ __html: model.summary }} />
              </Item.Description>
              <Item.Extra>
                <Label>IMAX</Label>
                <Label icon="globe" content="Additional Languages" />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    );
  }
}
