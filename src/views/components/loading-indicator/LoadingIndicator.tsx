import styles from './LoadingIndicator.module.scss';

import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Loader } from 'semantic-ui-react';

interface IProps {
  readonly isActive?: boolean;
  readonly className?: string;
}
export const LoadingIndicator: React.FC<IProps> = (props) => {
  const { isActive = false, className = undefined, children } = props;
  const cssClasses = useMemo(() => classNames(className, { [styles.wrapper]: isActive }), [className, isActive]);

  return (
    <div className={cssClasses}>
      {isActive && (
        <div className={styles.loaderContainer}>
          <Loader content="Loading" active={true} inverted={true} size="huge" />
        </div>
      )}
      {children}
    </div>
  );
};
