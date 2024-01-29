export interface AuthorProps {
  name: string;
  avatar?: string;
}

export interface ParsedQuestionProps {
  id: string;
  content: string;
  author: AuthorProps;
  isHighlighted: boolean;
  isAnswered: boolean;
}

export type FirebaseQuestionsProps = Record<
  string,
  Omit<ParsedQuestionProps, 'id'>
>;
