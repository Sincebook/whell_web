import { get, post } from '~/ajax/ajax_axios';
import { host, dev_host } from '~/ajax/config';

/**
 * @param title
 * @param details
 * @param  {Award[] }  awards
 * @returns {*|Promise|Promise<unknown>}
 * @example
 */
export const addActivity = (title, details, awards) => {
  return post(host + '/activity/addActivity', { title, details, awards });
}

export default class Award {
  constructor(name, probability) {
    this.name = name;
    this.probability = probability;
  }
};

export const displayActivity = (activityId) => {
  return get(host + '/activity/activityInfo', { activityId });
}
export const getAmountPeople = (activityId) => {
  return get(host + '/shops/findaccounts', { activityId });
}
export const finishActivity = () => {
  return get(host + '/shops/finish');
}
