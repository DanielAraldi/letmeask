import { ParsedQuestionProps } from '../config';

export interface RoomHookProps {
  isClosed: boolean;
  title: string;
  questions: ParsedQuestionProps[];
}
