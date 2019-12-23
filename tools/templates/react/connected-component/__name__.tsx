import styles from './__name__.module.scss';

import * as React from 'react';
import {inject, observer} from 'mobx-react';

interface IProps {
  __store__(camelCase)Store?: __store__Store;
}
interface IState {}

@inject('__store__(camelCase)Store')
@observer
export default class __name__ extends React.Component<IProps, IState> {

  // public static defaultProps: Partial<IProps> = {};

  // public state: IState = {};

  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        __name__(sentenceCase)
      </div>
    );
  }

}
