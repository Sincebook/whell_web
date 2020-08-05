import Award, { addActivity } from '~/ajax/activity';
import codes from '~/config/codeConfig'
const createActivityEvent = document.getElementById('sendNow');

let awardList = new Array();
let total_pro = 0;
createActivityEvent.addEventListener('click', function () {
  let pros = getProbality();
  console.log(pros);
  // const nameList = document.getElementsByClassName('awardName');
  // const probabilityList = document.getElementsByClassName('mui-input-numbox');
  // for (let i in nameList) {
  //   let name = nameList[i].value;
  //   let probality = probabilityList[i].value;
  //   if (name != undefined && probality != undefined) {
  //     if (name != '' && probality != '') {
  //       let award = new Award(name, probality);
  //       awardList[i] = award;
  //       if (parseInt(probality) >= 0) {
  //         total_pro += parseInt(probality);
  //       } else {
  //         mui.alert('概率输入有误');
  //         return;
  //       }
  //     } else {
  //       mui.alert('奖品名称不能为空！');
  //       return;
  //     }
  //   }
  // }
  // if (total_pro != 100) {
  //   console.log(total_pro);
  //   mui.alert('中奖概率之和须为100');
  //   total_pro = 0;
  //   return;
  // }
  // console.log(awardList);
  // addActivity(title, details, awardList).then((data) => {
  //   if (data.code == codes.success) {
  //     toShare();
  //     localStorage.setItem('_shareUrl', data.data);
  //   } else {
  //     mui.alert('服务器异常');
  //   }
  // });
});

function getProbality() {
  const probabilityList = document.getElementsByClassName('mui-input-numbox');
  let probality = [];
  for (let i in probabilityList) {
    let temple = probabilityList[i].value;
    if (temple != undefined) {
      if (temple != '') {
        if (parseInt(temple) >= 0 && parseInt(temple) < 99) {
          probality[i] = temple;
        } else {
          mui.alert('概率输入不能为空');
          return;
        }
      } else {
        mui.alert('概率输入有误');
      }
    }
  }
  return probality;
}

function getAwardName() {
  const nameList = document.getElementsByClassName('awardName');
  let names = [];
  for (let i in nameList) {
    let temple = nameList[i].value;
    if (temple != undefined) {
      if (temple != '') {
        names[i] = temple;
      } else {
        mui.alert('奖品名称不能为空');
      }
    }
  }
}

function delAward() {
  
}
const title = localStorage.getItem('title');
const details = localStorage.getItem('details');
console.log(title);
console.log(details);
total_pro = 0;

let html = '';
let add_award = document.getElementById('add_award');
let click = 0;
add_award.addEventListener('click', function () {
  click++;
  if (click > 6) {
    mui.alert('不允许添加更多的奖品');
    return;
  }
  html = `
  <div class="mui-card">
  <div class="mui-input-group">
    <div class="mui-input-row">
      <label>奖品名称</label>
      <input type="text" placeholder="请输入项目名称" class="awardName" >
    </div>
    <div class="mui-input-row">
      <label>中奖概率</label>
      <input class="mui-input-numbox" type="number" maxlength="2"  value="10"/>
    </div>
    </div>
  </div>
</div>`;
  let node = document.createElement('div');
  node.innerHTML = html;
  document.getElementById('contentList').appendChild(node);
});
