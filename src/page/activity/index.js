import { displayActivity } from '~/ajax/activity';
localStorage.setItem('activityId', 1 );
const id = localStorage.getItem('activityId');
displayActivity(id).then((data) => {
    console.log(data)
})
