import './header.scss';

import { useNavigate } from 'react-router-dom';

import { HeaderProps } from '../../@types';
import { LOGO } from '../../config';
import { Button } from '../Button';
import { RoomCode } from '../RoomCode';

export function Header({ roomId, variant = 'user', onClick }: HeaderProps) {
  const navigate = useNavigate();

  function navigateToHome(): void {
    navigate('/');
  }

  return (
    <header className='header'>
      <div className='content'>
        <img src={LOGO} alt='Letmeask' onClick={navigateToHome} />

        {variant === 'user' ? (
          <RoomCode code={roomId} />
        ) : (
          <div>
            <RoomCode code={roomId} />

            <Button isOutlined onClick={onClick}>
              Encerrar sala
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
