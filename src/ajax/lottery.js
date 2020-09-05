import { get } from './ajax_axios';
import { host } from '~/ajax/config';
export const drawPrize = () => {
  return get(host + './user/drawPrize', { } );
}
