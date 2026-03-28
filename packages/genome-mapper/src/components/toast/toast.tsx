import type { PropsWithChildren } from 'react';

import styles from './toast.module.css';

export const Toast: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className={`card ${styles.toast}`}>
      {typeof children === 'string' ? <span>{children}</span> : children}
    </div>
  );
};
