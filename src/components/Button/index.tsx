import '../../styles/button.scss';

import cx from 'classnames';

import { ButtonProps } from '../../@types';

export function Button({ isOutlined = false, ...rest }: ButtonProps) {
  return (
    <button className={cx('button', { outlined: isOutlined })} {...rest} />
  );
}
