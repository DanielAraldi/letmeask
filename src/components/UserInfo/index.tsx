import '../../styles/user-info.scss';

import cx from 'classnames';

import { UserInfoProps } from '../../@types';
import { AVATAR } from '../../config';

export function UserInfo({ name, avatar, variant = 'soft' }: UserInfoProps) {
  return (
    <div className='user-info'>
      <img src={avatar || AVATAR} alt={name} />

      <span className={cx({ strong: variant === 'strong' })}>{name}</span>
    </div>
  );
}
