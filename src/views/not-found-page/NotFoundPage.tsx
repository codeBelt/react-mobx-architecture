import styles from './NotFoundPage.module.scss';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IRouteParams {}
interface IProps extends RouteComponentProps<IRouteParams> {}

const NotFoundPage: React.FC<IProps> = (props) => {
  return <div className={styles.wrapper}>Not found page</div>;
};

export default NotFoundPage;
