import '../../styles/banner.scss';

import { BannerProps } from '../../@types';
import { ILLUSTRATION } from '../../config';

export function Banner({ description, title, alt }: BannerProps) {
  return (
    <aside className='banner'>
      <img src={ILLUSTRATION} alt={alt} />

      <strong>{title}</strong>

      <p>{description}</p>
    </aside>
  );
}
