export interface AuthorProps {
  name: string;
  avatar?: string;
}

export interface AuthorIdProps {
  authorId: string;
}

export type LikeProps = Record<string, AuthorIdProps>;

export interface ParsedQuestionProps {
  id: string;
  content: string;
  author: AuthorProps;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId?: string;
}

export interface FirebaseLikeProps {
  likes: LikeProps;
}

export type FirebaseParsedQuestionProps = Omit<
  ParsedQuestionProps & FirebaseLikeProps,
  'id' | 'likeCount' | 'likeId'
>;

export type FirebaseQuestionsProps = Record<
  string,
  FirebaseParsedQuestionProps
>;

export interface FirebaseRoomProps {
  title: string;
  authorId: string;
  questions?: FirebaseQuestionsProps;
  closedAt?: Date;
}
