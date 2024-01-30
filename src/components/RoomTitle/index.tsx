import '../../styles/room-title.scss';

import { RoomTitleProps } from '../../@types';

export function RoomTitle({ amountQuestions, title }: RoomTitleProps) {
  return (
    <div className='room-title'>
      <h1>Sala {title}</h1>

      {amountQuestions > 0 && (
        <span>
          {amountQuestions} {amountQuestions === 1 ? 'pergunta' : 'perguntas'}
        </span>
      )}
    </div>
  );
}
