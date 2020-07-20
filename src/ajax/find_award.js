import { host } from '~/ajax/config';
import { get, post } from '~/ajax/ajax_axios';

export const getAllAccountAwards = ( activityId ) => {
    return get(host + '/shops/findAllRedeems', { activityId } );
  }


  export const duiduijiang = (no) => {
    return get(host + '/shops/redeem', { no } );
}
