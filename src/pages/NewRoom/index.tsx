import '../../styles/auth.scss';

import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Banner, Button, InputText } from '../../components';
import { database, databasePush, databaseRef, LOGO } from '../../config';
import { useAuth } from '../../hooks';

export function NewRoom() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [newRoom, setNewRoom] = useState<string>('');

  const isInputEmpty = !newRoom.trim();

  async function handleCreateRoom(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (isInputEmpty) return;

    const roomsRef = databaseRef(database, 'rooms');
    const firebaseRoom = await databasePush(roomsRef, {
      title: newRoom.trim(),
      authorId: user?.id,
    });

    navigate(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id='page-auth'>
      <Banner
        description='Tire as dúvidas da sua audiência em tempo-real'
        title='Crie salas de Q&amp;A ao-vivo'
        alt='Ilustração simbolizando perguntas e respostas'
      />

      <main>
        <div className='main-content'>
          <img src={LOGO} alt='Letmeask' />

          <h2>Criar uma nova sala</h2>

          <form onSubmit={async event => await handleCreateRoom(event)}>
            <InputText
              value={newRoom}
              placeholder='Nome da sala'
              onChange={event => setNewRoom(event.target.value)}
            />

            <Button type='submit' disabled={isInputEmpty}>
              Criar sala
            </Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to='/'>clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
