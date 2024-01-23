import { GOOGLE_ICON, ILLUSTRATION, LOGO } from '../../config';

export function Home() {
  return (
    <div>
      <aside>
        <img
          src={ILLUSTRATION}
          alt='Ilustração simbolizando perguntas e respostas'
        />

        <strong>Crie salas de Q&amp;A ao-vivo</strong>

        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div>
          <img src={LOGO} alt='Letmeask' />

          <button>
            <img src={GOOGLE_ICON} alt='Logo do Google' />
            Crie sua sala com o Google
          </button>

          <div>ou entre em uma sala</div>

          <form>
            <input type='text' placeholder='Digite o código da sala' />

            <button type='submit'>Entrar na sala</button>
          </form>
        </div>
      </main>
    </div>
  );
}
