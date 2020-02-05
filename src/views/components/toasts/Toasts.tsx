import styles from './Toasts.module.scss';

import React from 'react';
import IToast from '../../../stores/toasts/models/IToast';
import { ToastCard } from '../toast-card/ToastCard';
import { observer } from 'mobx-react';
import { useRootStoreContext } from '../../../utilities/storeUtil';

interface IProps {}

export const Toasts: React.FC<IProps> = observer((props) => {
  const { toastsStore } = useRootStoreContext();
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
