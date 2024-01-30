import '../../styles/room.scss';

import { useNavigate, useParams } from 'react-router-dom';

import { RoomParamsProps } from '../../@types';
import { Button, Question, RoomCode } from '../../components';
import {
  database,
  databaseRef,
  databaseRemove,
  databaseUpdate,
  DELETE,
  LOGO,
} from '../../config';
import { useRoom } from '../../hooks';

export function AdminRoom() {
  const navigate = useNavigate();
  const params = useParams<keyof RoomParamsProps>();
  const roomId = params.id!;

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom(): Promise<void> {
    const roomRef = databaseRef(database, `rooms/${roomId}`);
    await databaseUpdate(roomRef, {
      closedAt: new Date(),
    });

    navigate('/', { replace: true });
  }

  async function handleDeleteQuestion(questionId: string): Promise<void> {
    if (window.confirm('Você tem certeza que deseja excluir essa pergunta?')) {
      const questionRef = databaseRef(
        database,
        `rooms/${roomId}/questions/${questionId}`,
      );
      await databaseRemove(questionRef);
    }
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={LOGO} alt='Letmeask' />

          <div>
            <RoomCode code={roomId} />

            <Button isOutlined onClick={async () => await handleEndRoom()}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>

          {questions.length > 0 && (
            <span>4 {questions.length === 1 ? 'pergunta' : 'perguntas'}</span>
          )}
        </div>

        <div className='question-list'>
          {questions.map(({ id, ...rest }) => (
            <Question key={id} {...rest}>
              <button
                type='button'
                onClick={async () => await handleDeleteQuestion(id)}
              >
                <img src={DELETE} alt='Remover pergunta' />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
