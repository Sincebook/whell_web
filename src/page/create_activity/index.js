import { toAddAward } from '~/util/jumpTo'
const createButton = document.getElementById('createButton');
createButton.addEventListener('click', function () {
  const title = document.getElementById('activityTitle').value;
  const details = document.getElementById('activityDetail').value;
  if (title.length < 1 || details.length < 1) {
    mui.alert('不能为空！');
    return;
  }
  localStorage.setItem('title', title);
  localStorage.setItem('details', details);
  console.log(title);
  console.log(details);
  toAddAward();
});
