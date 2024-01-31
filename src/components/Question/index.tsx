import './question.scss';

import cx from 'classnames';
import { PropsWithChildren } from 'react';

import { QuestionProps } from '../../@types';
import { UserInfo } from '../UserInfo';

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
        <UserInfo name={author.name} avatar={author.avatar || null} />

        <div>{children}</div>
      </footer>
    </div>
  );
}
