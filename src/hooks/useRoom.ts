import { useEffect, useState } from 'react';

import { FirebaseQuestionsProps, ParsedQuestionProps } from '../@types';
import { database, databaseRef, onValueInDatabase } from '../config';
import { useAuth } from './useAuth';

export function useRoom(roomId: string) {
  const { user } = useAuth();

  const [title, setTitle] = useState<string>('');
  const [questions, setQuestions] = useState<ParsedQuestionProps[]>([]);

  useEffect(() => {
    const roomRef = databaseRef(database, `rooms/${roomId}`);

    const unsubscribe = onValueInDatabase(roomRef, room => {
      const roomValue = room.val();
      const questions: FirebaseQuestionsProps = roomValue.questions ?? {};
      const parsedQuestions = Object.entries(questions).map(
        ([key, question]): ParsedQuestionProps => ({
          id: key,
          likeCount: Object.values(question.likes ?? {}).length,
          likeId: Object.entries(question.likes ?? {}).find(
            ([, like]) => like.authorId === user?.id,
          )?.[0],
          ...question,
        }),
      );

      setTitle(roomValue.title);
      setQuestions(parsedQuestions);
    });

    () => {
      unsubscribe();
    };
  }, [roomId, user?.id]);

  return { questions, title };
}