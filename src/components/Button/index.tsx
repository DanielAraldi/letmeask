import './button.scss';

import cx from 'classnames';

import { ButtonProps } from '../../@types';

export function Button({ variant, ...rest }: ButtonProps) {
  return (
    <button
      className={cx('button', {
        outlined: variant === 'outlined',
        soft: variant === 'soft',
        danger: variant === 'danger',
      })}
      {...rest}
    />
  );
}
