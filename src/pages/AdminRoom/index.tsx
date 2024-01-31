import '../../styles/room.scss';

import { useNavigate, useParams } from 'react-router-dom';

import { FirebaseParsedQuestionProps, RoomParamsProps } from '../../@types';
import { Header, Question, RoomTitle } from '../../components';
import {
  ANSWER,
  CHECK,
  database,
  databaseGet,
  databaseRef,
  databaseRemove,
  databaseUpdate,
  DELETE,
} from '../../config';
import { useRoom } from '../../hooks';

export function AdminRoom() {
  const navigate = useNavigate();
  const params = useParams<keyof RoomParamsProps>();
  const roomId = params.id!;

  const { questions, title } = useRoom(roomId);

  function getQuestionRef(questionId: string) {
    return databaseRef(database, `rooms/${roomId}/questions/${questionId}`);
  }

  async function handleEndRoom(): Promise<void> {
    const roomRef = databaseRef(database, `rooms/${roomId}`);
    await databaseUpdate(roomRef, {
      closedAt: new Date(),
    });

    navigate('/', { replace: true });
  }

  async function handleDeleteQuestion(questionId: string): Promise<void> {
    if (window.confirm('Você tem certeza que deseja excluir essa pergunta?')) {
      const questionRef = getQuestionRef(questionId);
      await databaseRemove(questionRef);
    }
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

  return (
    <div id='page-room'>
      <Header
        variant='admin'
        roomId={roomId}
        onClick={async () => await handleEndRoom()}
      />

      <main>
        <RoomTitle amountQuestions={questions.length} title={title} />

        <div className='question-list'>
          {questions.length === 0 ? (
            <div className='no-questions'>
              <p>Ainda não há perguntas feitas nesta sala</p>
            </div>
          ) : (
            questions.map(({ id, isAnswered, ...rest }) => (
              <Question key={id} isAnswered={isAnswered} {...rest}>
                {!isAnswered && (
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
                )}
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
                <button
                  type='button'
                  onClick={async () => await handleDeleteQuestion(id)}
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
  );
}
