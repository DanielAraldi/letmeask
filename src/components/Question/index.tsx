import '../../styles/question.scss';

import { PropsWithChildren } from 'react';

import { QuestionProps } from '../../@types';
import { AVATAR } from '../../config';

export function Question({
  author,
  content,
  children,
}: PropsWithChildren<QuestionProps>) {
  return (
    <div className='question'>
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
