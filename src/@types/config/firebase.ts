export interface AuthorProps {
  name: string;
  avatar: string;
}

export interface QuestionProps {
  id: string;
  content: string;
  author: AuthorProps;
  isHighlighted: boolean;
  isAnswered: boolean;
}

export type FirebaseQuestionsProps = Record<string, Omit<QuestionProps, 'id'>>;
