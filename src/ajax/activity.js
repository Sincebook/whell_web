


import {post} from "~/ajax/ajax_axios";
import {host} from "~/ajax/config";


/**
 *
 * @param title
 * @param details
 * @param  {Award[] }  awards
 * @returns {*|Promise|Promise<unknown>}
 * @example
 */
export const addActivity = (title,details,awards) => {
  return post(host+'/activity/add', { title, details,awards});
}



export default class Award {
  constructor(name,probability){
    this.name= name;
    this.probability=probability;
  }
};