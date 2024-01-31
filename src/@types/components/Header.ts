export interface HeaderProps {
  roomId: string;
  variant?: 'user' | 'admin';
  onClick?(): void;
}
