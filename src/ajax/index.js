import {
  get,
  post,
  ajax,
} from './ajax_axios';
import Award, {addActivity} from "~/ajax/activity";

export const getIndex = (userName, password) => {
    return get('http://localhost:8081//page/index/index.html', { userName, password } );
}

export const doLogin = (userName, password) => {
  return post('./login', { userName, password } );
}

export const getUser = (userName, info) => {
  return get('./user', { userName, info } );
}
let a = new Award();
addActivity('标题','123',[new Award('一等',5),new Award('二等',6)]);