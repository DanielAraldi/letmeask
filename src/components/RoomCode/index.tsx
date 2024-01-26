import '../../styles/room-code.scss';

import { RoomCodeProps } from '../../@types';
import { COPY } from '../../config';

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard(): void {
    navigator.clipboard.writeText(code);
  }

  return (
    <button
      className='room-code'
      type='button'
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img
          src={COPY}
          alt='Copiar código da sala'
          title='Copiar código da sala'
        />
      </div>

      <span>Sala #{code}</span>
    </button>
  );
}
