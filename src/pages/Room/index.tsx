import '../../styles/room.scss';

import cx from 'classnames';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RoomParamsProps } from '../../@types';
import { Button, Header, Question } from '../../components';
import {
  AVATAR,
  database,
  databasePush,
  databaseRef,
  databaseRemove,
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

  async function handleLikeQuestion(
    questionId: string,
    likeId?: string,
  ): Promise<void> {
    const likeDatabasePath = `rooms/${roomId}/questions/${questionId}/likes`;
    const hasLiked = !!likeId;

    const likeRef = databaseRef(
      database,
      hasLiked ? `${likeDatabasePath}/${likeId}` : likeDatabasePath,
    );

    if (hasLiked) {
      await databaseRemove(likeRef);
    } else {
      await databasePush(likeRef, {
        authorId: user?.id,
      });
    }
  }

  return (
    <div id='page-room'>
      <Header roomId={roomId} />

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>

          {questions.length > 0 && (
            <span>
              {questions.length}{' '}
              {questions.length === 1 ? 'pergunta' : 'perguntas'}
            </span>
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
          {questions.map(({ id, likeCount, likeId, isAnswered, ...rest }) => (
            <Question key={id} isAnswered={isAnswered} {...rest}>
              {!isAnswered && (
                <button
                  className={cx('like-button', { liked: !!likeId })}
                  type='button'
                  aria-label='Marcar como gostei'
                  onClick={async () => await handleLikeQuestion(id, likeId)}
                >
                  {likeCount > 0 && <span>{likeCount}</span>}

                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z'
                      stroke='#737380'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              )}
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
