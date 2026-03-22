import type { ToastDisplayCallback } from './toast-context';

const display: { callback: ToastDisplayCallback | undefined } = {
  callback: undefined,
};

export const toastStore = {
  registerDisplay: (callback: ToastDisplayCallback) => {
    display.callback = callback;
  },
  destroyDisplay: () => {
    display.callback = undefined;
  },
  queueToast: (message: string, duration: number = 3000): void => {
    if (display.callback === undefined) {
      console.warn('No display component registered for this ToastContext');
    } else {
      display.callback({ message, duration });
    }
  },
};
