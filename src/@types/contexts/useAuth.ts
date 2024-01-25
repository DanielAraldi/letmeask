export interface UserProps {
  id: string;
  name: string;
  avatar: string | null;
}

export interface AuthContextProps {
  user: UserProps | null;
  isSignedIn(): boolean;
  signInWithGoogle(): Promise<void>;
}
