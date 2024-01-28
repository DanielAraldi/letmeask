import { createContext, PropsWithChildren } from 'react';
import toast from 'react-hot-toast';

import { ToastContextProps } from '../@types';

export const ToastContext = createContext({} as ToastContextProps);

export function ToastProvider({ children }: Required<PropsWithChildren>) {
  function showSuccessAlert(message: string): void {
    toast.success(message);
  }

  function showErrorAlert(message: string): void {
    toast.error(message, { duration: 8000 });
  }

  return (
    <ToastContext.Provider value={{ showSuccessAlert, showErrorAlert }}>
      {children}
    </ToastContext.Provider>
  );
}
