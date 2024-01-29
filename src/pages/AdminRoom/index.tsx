import '../../styles/room.scss';

import { useParams } from 'react-router-dom';

import { RoomParamsProps } from '../../@types';
import { Button, Question, RoomCode } from '../../components';
import { LOGO } from '../../config';
import { useRoom } from '../../hooks';

export function AdminRoom() {
  const params = useParams<keyof RoomParamsProps>();
  const roomId = params.id!;

  const { questions, title } = useRoom(roomId);

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={LOGO} alt='Letmeask' />

          <div>
            <RoomCode code={roomId} />

            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>

          {questions.length && (
            <span>4 {questions.length === 1 ? 'pergunta' : 'perguntas'}</span>
          )}
        </div>

        <div className='question-list'>
          {questions.map(({ id, ...rest }) => (
            <Question key={id} {...rest} />
          ))}
        </div>
      </main>
    </div>
  );
}
