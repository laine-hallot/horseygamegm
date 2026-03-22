import { createContext } from 'react';

export type ToastDisplayCallback = (item: {
  message: string;
  duration: number;
}) => void;

export type ToastContextData = {
  registerDisplay: (callback: ToastDisplayCallback) => void;
  destroyDisplay: () => void;
  queueToast: (message: string, _duration?: number) => void;
};

export const ToastContext = createContext<ToastContextData>({
  registerDisplay: (_callback: ToastDisplayCallback) => {},
  destroyDisplay: () => {},
  queueToast: (_message: string, _duration?: number): void => {},
});
