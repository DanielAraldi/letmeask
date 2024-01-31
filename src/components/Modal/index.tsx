import './modal.scss';

import ReactModal from 'react-modal';

import { ModalProps } from '../../@types';
import { CLOSE_CIRCLE, TRASH } from '../../config';
import { Button } from '../Button';

export function Modal({
  description,
  title,
  variant,
  onClose,
  onFinish,
  ...rest
}: ModalProps) {
  const isRoom = variant === 'room';

  return (
    <ReactModal
      className='modal'
      overlayClassName='overlay'
      closeTimeoutMS={200}
      {...rest}
    >
      <div className='content'>
        <img
          src={isRoom ? CLOSE_CIRCLE : TRASH}
          alt={isRoom ? 'Encerrar sala' : 'Excluir pergunta'}
        />

        <p>{title}</p>

        <span>{description}</span>

        <div>
          <Button variant='soft' onClick={onClose}>
            Cancelar
          </Button>

          <Button variant='danger' onClick={async () => await onFinish()}>
            Sim, {isRoom ? 'encerrar' : 'excluir'}
          </Button>
        </div>
      </div>
    </ReactModal>
  );
}
