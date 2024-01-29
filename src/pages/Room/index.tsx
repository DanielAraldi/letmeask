import '../../styles/room.scss';

import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RoomParamsProps } from '../../@types';
import { Button, Question, RoomCode } from '../../components';
import {
  AVATAR,
  database,
  databasePush,
  databaseRef,
  LOGO,
} from '../../config';
import { useAuth, useRoom, useToast } from '../../hooks';

export function Room() {
  const params = useParams<keyof RoomParamsProps>();
  const roomId = params.id!;

  const { user } = useAuth();
  const { questions, title } = useRoom(roomId);
  const { showErrorAlert } = useToast();

  const [newQuestion, setNewQuestion] = useState<string>('');

  const isTextareaEmpty = !newQuestion.trim();

  async function handleSendQuestion(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (isTextareaEmpty) return;
    if (!user) {
      return showErrorAlert(
        'Somente usuário logados podem enviar uma pergunta',
      );
    }

    const question = {
      content: newQuestion.trim(),
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    const questionsRef = databaseRef(database, `rooms/${roomId}/questions`);
    await databasePush(questionsRef, question);

    setNewQuestion('');
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={LOGO} alt='Letmeask' />

          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>

          {questions.length && (
            <span>4 {questions.length === 1 ? 'pergunta' : 'perguntas'}</span>
          )}
        </div>

        <form onSubmit={async event => await handleSendQuestion(event)}>
          <textarea
            value={newQuestion}
            placeholder='O que você quer perguntar?'
            onChange={event => setNewQuestion(event.target.value)}
          />

          <div className='form-footer'>
            {user ? (
              <div className='user-info'>
                <img src={user.avatar || AVATAR} alt={user.name} />

                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login.</button>
              </span>
            )}

            <Button type='submit' disabled={isTextareaEmpty || !user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className='question-list'>
          {questions.map(({ id, ...rest }) => (
            <Question key={id} {...rest} />
          ))}
        </div>
      </main>
    </div>
  );
}
