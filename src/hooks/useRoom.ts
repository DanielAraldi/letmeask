import { useEffect, useState } from 'react';

import {
  FirebaseQuestionsProps,
  FirebaseRoomProps,
  ParsedQuestionProps,
} from '../@types';
import { RoomHookProps } from '../@types';
import { database, databaseRef, onValueInDatabase } from '../config';
import { useAuth } from './useAuth';

export function useRoom(roomId: string): RoomHookProps {
  const { user } = useAuth();

  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [questions, setQuestions] = useState<ParsedQuestionProps[]>([]);

  function sortQuestion(
    question: ParsedQuestionProps,
    questionCompare: ParsedQuestionProps,
  ): number {
    if (question.isHighlighted && !questionCompare.isHighlighted) return -1;
    else if (!question.isHighlighted && questionCompare.isHighlighted) return 1;

    if (question.isAnswered && !questionCompare.isAnswered) return 1;
    else if (!question.isAnswered && questionCompare.isAnswered) return -1;

    return 0;
  }

  useEffect(() => {
    const roomRef = databaseRef(database, `rooms/${roomId}`);

    const unsubscribe = onValueInDatabase(roomRef, room => {
      const roomValue: FirebaseRoomProps = room.val();
      const questions: FirebaseQuestionsProps = roomValue.questions ?? {};
      const parsedQuestions = Object.entries(questions)
        .map(
          ([key, question]): ParsedQuestionProps => ({
            id: key,
            likeCount: Object.values(question.likes ?? {}).length,
            likeId: Object.entries(question.likes ?? {}).find(
              ([, like]) => like.authorId === user?.id,
            )?.[0],
            ...question,
          }),
        )
        .sort(sortQuestion);

      setIsClosed(!!roomValue.closedAt);
      setTitle(roomValue.title);
      setQuestions(parsedQuestions);
    });

    () => {
      unsubscribe();
    };
  }, [roomId, user?.id]);

  return { isClosed, questions, title };
}
