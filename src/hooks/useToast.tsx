import { useContext } from 'react';

import { ToastContext } from '../contexts';

export function useToast() {
  return useContext(ToastContext);
}
