import '../../styles/button.scss';

import { ButtonProps } from '../../@types';

export function Button(props: ButtonProps) {
  return <button className='button' {...props}></button>;
}
