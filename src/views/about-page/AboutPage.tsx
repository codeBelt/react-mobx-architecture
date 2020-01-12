import styles from './AboutPage.module.scss';

import React, { useEffect } from 'react';
import { LoadingIndicator } from '../components/loading-indicator/LoadingIndicator';
import { Header, Container, Message } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { rootStore } from '../../index';

interface IRouteParams {}
interface IProps extends RouteComponentProps<IRouteParams> {}

const AboutPage: React.FC<IProps> = observer((props) => {
  const { showsStore } = rootStore;

  useEffect(() => {
    showsStore.requestError();
  }, [showsStore]);

  const { isRequesting, error } = showsStore.errorExample;

  return (
    <div className={styles.wrapper}>
      <Header as="h2">About</Header>
      <LoadingIndicator isActive={isRequesting}>
        <Container>
          <p>
            This page is only to show how to handle API errors on the page. You will also notice a popup indicator with the actual error text. Below
            we create a custom error message.
          </p>
        </Container>
        {error && <Message info={true} header="Error" content="Sorry there was an error requesting this content." />}
      </LoadingIndicator>
    </div>
  );
});

export default AboutPage;
