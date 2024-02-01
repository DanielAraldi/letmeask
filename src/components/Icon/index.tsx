import { IconProps, IconTypeProps } from '../../@types';
import { Like } from '../../assets/icons';

export function Icon({ type }: IconProps) {
  const icons: Record<IconTypeProps, JSX.Element> = {
    like: Like(),
  };

  return icons[type];
}
