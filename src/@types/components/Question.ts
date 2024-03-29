import { ParsedQuestionProps } from '../config';

export type QuestionProps = Pick<ParsedQuestionProps, 'author' | 'content'> &
  Partial<Pick<ParsedQuestionProps, 'isAnswered' | 'isHighlighted'>>;
