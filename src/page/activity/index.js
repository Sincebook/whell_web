import { displayActivity, getAmountPeople, finishActivity } from '~/ajax/activity';
localStorage.setItem('activityId', 8 );
const id = localStorage.getItem('activityId');
displayActivity(id).then((data) => {
    document.getElementById('name').setAttribute('value', data.data.title);
    document.getElementById('age').setAttribute('value', data.data.details);

})
getAmountPeople(id).then((data) => {
    document.getElementById('tel').setAttribute('value', data.data);
})
document.getElementById('close').addEventListener('click', endActivity, false);


function endActivity() {
    console.log('进入方法');
    finishActivity().then((data) => {
        if (data.data == 2) {
            window.alert('关闭成功');
        } else {
            window.alert('关闭失败');
        }
        console.log('触发事件');
        console.log(data);
    })    
}
