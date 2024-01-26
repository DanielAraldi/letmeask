import '../../styles/auth.scss';

import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components';
import {
  database,
  databaseChild,
  databaseGet,
  databaseRef,
  GOOGLE_ICON,
  ILLUSTRATION,
  LOGO,
} from '../../config';
import { useAuth } from '../../hooks';

export function Home() {
  const navigate = useNavigate();
  const { signInWithGoogle, isSignedIn, user } = useAuth();

  const [roomCode, setRoomCode] = useState<string>('');

  async function handleCreateRoom(): Promise<void> {
    if (!user) await signInWithGoogle();

    isSignedIn() && navigate('/rooms/new');
  }

  const isInputEmpty = !roomCode.trim();

  async function handleJoinRoom(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (isInputEmpty) return;

    const roomsRef = databaseRef(database);
    const room = await databaseGet(
      databaseChild(roomsRef, `rooms/${roomCode}`),
    );

    if (!room.exists()) {
      window.alert('Room does not exist.');
    } else {
      navigate(`/rooms/${roomCode}`);
    }
  }

  return (
    <div id='page-auth'>
      <aside>
        <img
          src={ILLUSTRATION}
          alt='Ilustração simbolizando perguntas e respostas'
        />

        <strong>Crie salas de Q&amp;A ao-vivo</strong>

        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className='main-content'>
          <img src={LOGO} alt='Letmeask' />

          <button
            className='create-room'
            onClick={async () => await handleCreateRoom()}
          >
            <img src={GOOGLE_ICON} alt='Logo do Google' />
            Crie sua sala com o Google
          </button>

          <div className='separator'>ou entre em uma sala</div>

          <form onSubmit={async event => await handleJoinRoom(event)}>
            <input
              type='text'
              value={roomCode}
              placeholder='Digite o código da sala'
              onChange={event => setRoomCode(event.target.value)}
            />

            <Button type='submit' disabled={isInputEmpty}>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
