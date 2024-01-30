import '../../styles/question.scss';

import cx from 'classnames';
import { PropsWithChildren } from 'react';

import { QuestionProps } from '../../@types';
import { AVATAR } from '../../config';

export function Question({
  author,
  content,
  children,
  isAnswered = false,
  isHighlighted = false,
}: PropsWithChildren<QuestionProps>) {
  return (
    <div
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered },
      )}
    >
      <p>{content}</p>

      <footer>
        <div className='user-info'>
          <img src={author.avatar || AVATAR} alt={author.name} />

          <span>{author.name}</span>
        </div>

        <div>{children}</div>
      </footer>
    </div>
  );
}
