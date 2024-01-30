import '../../styles/input-text.scss';

import { InputTextProps } from '../../@types';

export function InputText(props: InputTextProps) {
  return <input className='input-text' type='text' {...props} />;
}
