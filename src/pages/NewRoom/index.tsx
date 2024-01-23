import '../../styles/auth.scss';

import { Button } from '../../components';
import { ILLUSTRATION, LOGO } from '../../config';

export function NewRoom() {
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

          <h2>Criar uma nova sala</h2>

          <form>
            <input type='text' placeholder='Nome da sala' />

            <Button type='submit'>Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <a href='#'>clique aqui</a>
          </p>
        </div>
      </main>
    </div>
  );
}
