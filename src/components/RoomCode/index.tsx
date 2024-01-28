import '../../styles/room-code.scss';

import { RoomCodeProps } from '../../@types';
import { COPY } from '../../config';
import { useToast } from '../../hooks';

export function RoomCode({ code }: RoomCodeProps) {
  const { showSuccessAlert } = useToast();

  function copyRoomCodeToClipboard(): void {
    showSuccessAlert('Código da sala copiado!');
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
