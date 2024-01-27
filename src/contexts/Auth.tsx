import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { AuthContextProps, UserProps } from '../@types';
import {
  auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from '../config';

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: Required<PropsWithChildren>) {
  const [user, setUser] = useState<UserProps | null>(null);

  function handleUserStateLogged(state: boolean): void {
    localStorage.setItem('isSigned', JSON.stringify(state));
  }

  function isSignedIn(): boolean {
    const value = localStorage.getItem('isSigned');
    return value ? JSON.parse(value) : false;
  }

  async function signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();

      const { user } = await signInWithPopup(auth, provider);
      if (user) {
        const { displayName, photoURL, uid } = user;
        handleUserStateLogged(true);
        setUser({
          id: uid,
          name: displayName || 'Anônimo',
          avatar: photoURL,
        });
      }
    } catch (error) {
      handleUserStateLogged(false);
      setUser(null);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, userState => {
      if (userState) {
        const { displayName, photoURL, uid } = userState;
        handleUserStateLogged(true);
        setUser({
          id: uid,
          name: displayName || 'Anônimo',
          avatar: photoURL,
        });
      } else {
        handleUserStateLogged(false);
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isSignedIn, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}
