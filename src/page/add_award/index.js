import Award, { addActivity } from '~/ajax/activity';
import codes from '~/config/codeConfig'
const createActivityEvent = document.getElementById('sendNow');
import { delegate } from '~/util/elemnet';
// 初始化奖品及概率
let awardList = new Array();
let total_pro = 0;
let contentList = document.getElementById('contentList');
// 发布奖品
createActivityEvent.addEventListener('click', function () {
  let pros = getProbality();
  console.log(pros);
  updataPro();
  if (total_pro != 100) {
    console.log(total_pro);
    mui.alert('中奖概率之和须为100');
    total_pro = 0;
    return;
  }
  const awardName = getAwardName();
  if (awardName == false) {
    return;
  }
  const probality = getProbality();
  for (let i in awardName) {
    let award = new Award(awardName[i], probality[i]);
    awardList[i] = award;   
  }
  console.log('到这里了');
  console.log(awardList);
  addActivity(title, details, awardList).then((data) => {
    if (data.code == codes.success) {
      toShare();
      localStorage.setItem('_shareUrl', data.data);
    } else if (data.code == codes.ACTIVITYID_EXCEPTION) {
      mui.alert(data.errMsg);
    } else if (data.code == codes.ACTIVITY_INSERT_FAIL) {
      mui.alert(data.errMsg);
    } else {
      mui.alert('未知错误！');
    }
  });
});
// 获取当前概率
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
          mui.alert('概率在0~99%之间');
          return;
        }
      } 
    }
  }
  return probality;
}
// 获取当前奖品名称
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
        return false;
      }
    }
  }
  return names;
}
// 删除奖品
delegate(contentList, '#delBtn', 'click', delAward, false);
function delAward(e) {
  e.delegateTarget.parentNode.parentNode.parentNode.remove();
  click--;
  updataPro();
}
// 监听输入框
delegate(contentList, '.mui-input-numbox', 'keydown', inputNum, false);
function inputNum() {
  console.log('监听到输入');
  let id = parseInt(Math.random() * 5000);
  setTimeout(updataPro(id), 100);
}
// 更新当前概率
const proElment = document.getElementById('probability');
function updataPro(id) {
  console.log(id);
  total_pro = 0;
  const temple = getProbality();
  for (let i in temple) {
    total_pro = total_pro + parseInt(temple[i]);
  }
  proElment.innerHTML = 100 - total_pro;
  console.log('概率更新');
}
// 奖品名称，奖品详情初始化
const title = localStorage.getItem('title');
const details = localStorage.getItem('details');


// 添加奖品
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
          <label>中奖概率(%)</label>
          <input class="mui-input-numbox" type="number" maxlength="2" value="10" />
          <button class="mui-btn-red del_btn" id="delBtn">删除</button>
        </div>
    </div>
  </div>
</div>`;
  let node = document.createElement('div');
  node.innerHTML = html;
  contentList.appendChild(node);
  updataPro();
});
