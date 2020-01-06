import styles from './Toasts.module.scss';

import React, { useContext } from 'react';
import IToast from '../../../stores/toasts/models/IToast';
import ToastCard from '../toast-card/ToastCard';
import { observer } from 'mobx-react';
import { RootStoreContext } from '../../../index';

interface IProps {}

const Toasts: React.FC<IProps> = observer((props) => {
  const { toastsStore } = useContext(RootStoreContext);
  const { items } = toastsStore;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {items.map((model: IToast) => (
        <ToastCard key={model.id} item={model} />
      ))}
    </div>
  );
});

export default Toasts;
