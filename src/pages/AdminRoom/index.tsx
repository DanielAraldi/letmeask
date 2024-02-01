import '../../styles/room.scss';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FirebaseParsedQuestionProps, RoomParamsProps } from '../../@types';
import { Header, Modal, Question, RoomTitle } from '../../components';
import {
  ANSWER,
  CHECK,
  database,
  databaseGet,
  databaseRef,
  databaseRemove,
  databaseUpdate,
  DELETE,
  EMPTY_QUESTIONS,
} from '../../config';
import { useRoom, useToast } from '../../hooks';

export function AdminRoom() {
  const navigate = useNavigate();
  const params = useParams<keyof RoomParamsProps>();
  const roomId = params.id!;

  const { showErrorAlert } = useToast();
  const { questions, title, isClosed } = useRoom(roomId);

  const [questionIdToBeDeleted, setQuestionIdToBeDeleted] =
    useState<string>('');
  const [isOpenEndRoomModal, setIsOpenEndRoomModal] = useState<boolean>(false);
  const [isOpenDeleteQuestionModal, setIsOpenDeleteQuestionModal] =
    useState<boolean>(false);

  function handleOpenDeleteQuestionModal(questionId: string): void {
    setQuestionIdToBeDeleted(questionId);
    setIsOpenDeleteQuestionModal(true);
  }

  function getQuestionRef(questionId: string) {
    return databaseRef(database, `rooms/${roomId}/questions/${questionId}`);
  }

  async function handleEndRoom(): Promise<void> {
    const roomRef = databaseRef(database, `rooms/${roomId}`);
    await databaseUpdate(roomRef, {
      closedAt: new Date(),
    });
    setIsOpenEndRoomModal(false);

    navigate('/', { replace: true });
  }

  async function handleDeleteQuestion(questionId: string): Promise<void> {
    const questionRef = getQuestionRef(questionId);
    await databaseRemove(questionRef);
    setIsOpenDeleteQuestionModal(false);
  }

  async function handleCheckQuestionAsAnswered(
    questionId: string,
  ): Promise<void> {
    const questionRef = getQuestionRef(questionId);
    await databaseUpdate(questionRef, {
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string): Promise<void> {
    const questionRef = getQuestionRef(questionId);
    const questionValue = await databaseGet(questionRef);
    const question: FirebaseParsedQuestionProps = questionValue.val();
    await databaseUpdate(questionRef, {
      isHighlighted: !question.isHighlighted,
    });
  }

  useEffect(() => {
    if (isClosed) {
      showErrorAlert('Está sala já foi encerrada!');
      navigate('/not-found', { replace: true });
    }
  }, [roomId, isClosed]);

  return (
    <>
      <div id='page-room'>
        <Header
          variant='admin'
          roomId={roomId}
          onClick={() => setIsOpenEndRoomModal(true)}
        />

        <main>
          <RoomTitle amountQuestions={questions.length} title={title} />

          <div className='question-list'>
            {questions.length === 0 ? (
              <div className='no-questions'>
                <img src={EMPTY_QUESTIONS} alt='Sala sem perguntas' />

                <p>Ainda não há perguntas feitas nesta sala</p>
              </div>
            ) : (
              questions.map(({ id, isAnswered, ...rest }) => (
                <Question key={id} isAnswered={isAnswered} {...rest}>
                  {!isAnswered && (
                    <>
                      <button
                        type='button'
                        onClick={async () =>
                          await handleCheckQuestionAsAnswered(id)
                        }
                      >
                        <img
                          src={CHECK}
                          alt='Marcar pergunta como respondida'
                          title='Marcar pergunta como respondida'
                        />
                      </button>
                      <button
                        type='button'
                        onClick={async () => await handleHighlightQuestion(id)}
                      >
                        <img
                          src={ANSWER}
                          alt='Dar destaque à pergunta'
                          title='Dar destaque à pergunta'
                        />
                      </button>
                    </>
                  )}
                  <button
                    type='button'
                    onClick={() => handleOpenDeleteQuestionModal(id)}
                  >
                    <img
                      src={DELETE}
                      alt='Remover pergunta'
                      title='Remover pergunta'
                    />
                  </button>
                </Question>
              ))
            )}
          </div>
        </main>
      </div>

      <Modal
        isOpen={isOpenEndRoomModal}
        variant='room'
        title='Encerrar sala'
        description='Tem certeza que você deseja encerrar esta sala?'
        onClose={() => setIsOpenEndRoomModal(false)}
        onRequestClose={() => setIsOpenEndRoomModal(false)}
        onFinish={async () => await handleEndRoom()}
      />

      <Modal
        isOpen={isOpenDeleteQuestionModal}
        variant='question'
        title='Excluir pergunta'
        description='Tem certeza que você deseja excluir esta pergunta?'
        onClose={() => setIsOpenDeleteQuestionModal(false)}
        onRequestClose={() => setIsOpenDeleteQuestionModal(false)}
        onFinish={async () => await handleDeleteQuestion(questionIdToBeDeleted)}
      />
    </>
  );
}
