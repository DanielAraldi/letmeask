import '../../styles/auth.scss';

import { useNavigate } from 'react-router-dom';

import { Button } from '../../components';
import { GOOGLE_ICON, ILLUSTRATION, LOGO } from '../../config';
import { useAuth } from '../../hooks';

export function Home() {
  const navigate = useNavigate();
  const { signInWithGoogle, isSignedIn, user } = useAuth();

  async function handleCreateRoom(): Promise<void> {
    if (!user) await signInWithGoogle();

    isSignedIn() && navigate('/rooms/new');
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

          <form>
            <input type='text' placeholder='Digite o código da sala' />

            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
