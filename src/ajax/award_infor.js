import { get, post } from '~/ajax/ajax_axios';
import { host, dev_host } from '~/ajax/config';

export const displayNotRedeem = (activityId) => {
    return get(host + '/shops/findNotRedeems', { activityId });
  }

  export const displayAlreadyRedeem = (activityId) => {
    return get(host + '/shops/findRedeems', { activityId });
  }
