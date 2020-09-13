import { search, getAllAccountAwards, duiduijiang } from '~/ajax/find_award';
import renderRedHtml from './template/redHtmlTemplate';
import renderGreenHtml from './template/greenHtmlTemplate';
import { AWARD_STATUS_NOT } from '~/config/codeConfig';
import { delegate } from '~/util/elemnet';

// let activityId = 1;

function GetRequest() {
  let url = location.search; // 获取url中"?"符后的字串
  console.log(url);
  let theRequest = new Object();
  if (url.indexOf('?') != -1) {
    let str = url.substr(1);
    let strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1]);
    }
  }
  return theRequest;
}
let Request = new Object();
Request = GetRequest();
let activityId = Request['activityId'];
localStorage.setItem('activityId', activityId);
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function () {
let searchinput = document.getElementById('searchInput').value;
console.log(searchinput);
let searchResult = search(searchinput);
let result = searchResult;
console.log(result);
let ht = `
    <li class="mui-table-view-cell mui-media">
    <a href="javascript:;">
      <img class="mui-media-object mui-pull-left" src="">
      <div class="mui-media-body">
      ${result.awardName}<b class="mui-pull-right" style="font-size: 20px;">${result.headImgUrl}</b><small class="mui-pull-right">兑奖码：</small>
      <br><br> 
       ${result.status}
        <button class="mui-pull-right mui-btn-red" ></button>
      </div>
    </a>
    </li>`
document.getElementById('showList').innerHTML = ht;
});

getAllAccountAwards(activityId).then((data) => {
    if (data.code == 0 ) {
        showAllAccountAwards(data);
      } else {
        console.log('error', data);
        return;
      }
});

function showAllAccountAwards(data) {
    let htm = '';
    let htmlred = '';
    let htmlgreen = '';
    const pushList = data.data;
    for (let i in data.data) {
      const pushItem = pushList[i];
      if (pushItem.status == AWARD_STATUS_NOT) {
        htmlred += renderRedHtml(pushItem);
      } else {
        htmlgreen += renderGreenHtml(pushItem)
    }
    }
    htm = htmlgreen + htmlred;
    document.getElementById('showList').innerHTML = htm;
  }

const attachEvent = document.getElementById('attachEvent');
delegate(attachEvent, '#inerEvent', 'click', duijiang, false);

function duijiang(e) {
  console.log(e.delegateTarget);
  let accountId = e.delegateTarget.dataset.no;
  if (accountId == undefined ) {
    console.log('error');
    return;
  } else {
  duiduijiang(accountId, 1).then((data) => {
    if (data.code == 0) {
      location.reload();
    }
  }
 );
  }
}


