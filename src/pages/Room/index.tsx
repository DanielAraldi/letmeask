import '../../styles/room.scss';

import cx from 'classnames';
import { FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RoomParamsProps } from '../../@types';
import {
  Button,
  Header,
  Icon,
  Question,
  RoomTitle,
  UserInfo,
} from '../../components';
import {
  database,
  databasePush,
  databaseRef,
  databaseRemove,
} from '../../config';
import { useAuth, useRoom, useToast } from '../../hooks';

export function Room() {
  const navigate = useNavigate();
  const params = useParams<keyof RoomParamsProps>();
  const roomId = params.id!;

  const { user } = useAuth();
  const { questions, title } = useRoom(roomId);
  const { showErrorAlert } = useToast();

  const [newQuestion, setNewQuestion] = useState<string>('');

  const isTextareaEmpty = !newQuestion.trim();

  function navigateToHome(): void {
    navigate('/');
  }

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
        <RoomTitle amountQuestions={questions.length} title={title} />

        <form onSubmit={async event => await handleSendQuestion(event)}>
          <textarea
            value={newQuestion}
            placeholder='O que você quer perguntar?'
            onChange={event => setNewQuestion(event.target.value)}
          />

          <div className='form-footer'>
            {user ? (
              <UserInfo
                variant='strong'
                name={user.name}
                avatar={user.avatar}
              />
            ) : (
              <span>
                Para enviar uma pergunta,{' '}
                <button onClick={navigateToHome}>faça seu login.</button>
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

                  <Icon type='like' />
                </button>
              )}
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
