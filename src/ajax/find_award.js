import { host } from '~/ajax/config';
import { get, post } from '~/ajax/ajax_axios';

export const getAllAccountAwards = ( activityId ) => {
    return get(host + '/shops/findAllRedeems', { activityId } );
  }


  export const duiduijiang = (userId, activityId) => {
    return get(host + '/shops/redeem', { userId, activityId } );
}

export const search = ( awardCode ) => {
  return get(host + '/shops/check', { awardCode } );
}
