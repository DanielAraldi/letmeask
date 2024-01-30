import '../../styles/auth.scss';

import { useNavigate } from 'react-router-dom';

import { Banner, Button } from '../../components';
import { LOGO } from '../../config';

export function NotFound() {
  const navigate = useNavigate();

  function navigateToInitialPage(): void {
    navigate('/');
  }

  return (
    <div id='page-auth'>
      <Banner
        description='Infelizmente não nada para fazer por aqui'
        title='Ops!! Acho que você se perdeu'
        alt='Ilustração simbolizando perguntas e respostas'
      />

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
