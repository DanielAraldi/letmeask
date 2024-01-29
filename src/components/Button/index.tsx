import '../../styles/button.scss';

import { ButtonProps } from '../../@types';

export function Button({ isOutlined = false, ...rest }: ButtonProps) {
  return (
    <button
      className={`button ${isOutlined ? 'outlined' : ''}`}
      {...rest}
    ></button>
  );
}
