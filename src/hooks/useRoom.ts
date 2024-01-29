import { useEffect, useState } from 'react';

import { FirebaseQuestionsProps, ParsedQuestionProps } from '../@types';
import { database, databaseRef, onValueInDatabase } from '../config';

export function useRoom(roomId: string) {
  const [title, setTitle] = useState<string>('');
  const [questions, setQuestions] = useState<ParsedQuestionProps[]>([]);

  useEffect(() => {
    const roomRef = databaseRef(database, `rooms/${roomId}`);

    onValueInDatabase(roomRef, room => {
      const roomValue = room.val();
      const questions: FirebaseQuestionsProps = roomValue.questions ?? {};
      const parsedQuestions = Object.entries(questions).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      setTitle(roomValue.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  return { questions, title };
}
