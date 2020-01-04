import React, { useContext, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import CastModel from '../../../../stores/shows/models/cast/CastModel';
import ActorCard from './components/actor-card/ActorCard';
import { observer } from 'mobx-react';
import { rootStoreContext } from '../../../../stores/RootStore';

interface IProps {}

const Actors: React.FC<IProps> = observer((props) => {
  const { showsStore } = useContext(rootStoreContext);

  useEffect(() => {
    showsStore.requestCast();
  }, [showsStore]);

  const { data, error } = showsStore.actors;

  if (!data || error) {
    return null;
  }

  return (
    <Card.Group centered={true}>
      {data.map((model: CastModel) => (
        <ActorCard key={model.person.name} cardData={model} />
      ))}
    </Card.Group>
  );
});

export default Actors;
