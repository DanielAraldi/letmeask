import '../../styles/auth.scss';

import { useNavigate } from 'react-router-dom';

import { Button } from '../../components';
import { ILLUSTRATION, LOGO } from '../../config';

export function NotFound() {
  const navigate = useNavigate();

  function navigateToInitialPage(): void {
    navigate('/');
  }

  return (
    <div id='page-auth'>
      <aside>
        <img
          src={ILLUSTRATION}
          alt='Ilustração simbolizando perguntas e respostas'
        />

        <strong>Ops!! Acho que você se perdeu</strong>

        <p>Infelizmente não nada para fazer por aqui</p>
      </aside>

      <main>
        <div className='main-content'>
          <img src={LOGO} alt='Letmeask' />

          <h2>Vamos voltar para o início?</h2>

          <Button onClick={navigateToInitialPage}>Voltar</Button>
        </div>
      </main>
    </div>
  );
}
