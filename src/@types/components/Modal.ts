import { Props } from 'react-modal';

export type ModalProps = Props & {
  variant: 'room' | 'question';
  title: string;
  description: string;
  onClose(): void;
  onFinish(): Promise<void>;
};
