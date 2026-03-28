import { useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { ToastContext } from '../../toast-context';
import { Toast } from './toast';

import styles from './toast-display.module.css';

type ToastItem = {
  message: string;
  duration: number;
};
const useToastDisplay = () => {
  const [toastQueue, setToastQueue] = useState<Record<string, ToastItem>>({});

  const appendToast = (
    id: string,
    toast: { message: string; duration: number },
  ) => {
    setToastQueue((queue) => ({ ...queue, [id]: toast }));
  };
  const removeToast = (id: string) => {
    setToastQueue((queue) => {
      const { [id]: _removeTarget, ...rest } = queue;
      return rest;
    });
  };
  return { toastQueue, appendToast, removeToast };
};

const TimedToast: React.FC<
  PropsWithChildren<{
    duration: number;
    onComplete: () => void;
  }>
> = ({ children, duration, onComplete }) => {
  useEffect(() => {
    setTimeout(() => {
      onComplete();
    }, duration);
  }, []);
  return <Toast>{children}</Toast>;
};

export const ToastDisplay: React.FC<{}> = () => {
  const toastContext = useContext(ToastContext);
  const { toastQueue, appendToast, removeToast } = useToastDisplay();

  useEffect(() => {
    toastContext.registerDisplay((item) =>
      appendToast(Math.floor(Math.random() * 10000000).toString(16), item),
    );
    return () => {
      toastContext.destroyDisplay();
    };
  }, []);

  return (
    <div className={styles.toastDisplay}>
      {Object.entries(toastQueue).map(([id, toast]) => {
        return (
          <TimedToast
            key={id}
            duration={toast.duration}
            onComplete={() => removeToast(id)}
          >
            {toast.message}
          </TimedToast>
        );
      })}
    </div>
  );
};
