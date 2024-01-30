import { useContext } from 'react';

import { AuthHookProps } from '../@types';
import { AuthContext } from '../contexts';

export function useAuth(): AuthHookProps {
  return useContext(AuthContext);
}
