import { useContext } from 'react';

import { ToastHookProps } from '../@types';
import { ToastContext } from '../contexts';

export function useToast(): ToastHookProps {
  return useContext(ToastContext);
}
