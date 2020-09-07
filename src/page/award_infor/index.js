import { displayNotRedeem, displayAlreadyRedeem } from '~/ajax/award_infor';
import { duiduijiang } from '~/ajax/find_award';
import renderRedHtml from '../find_award/template/redHtmlTemplate';
import renderGreenHtml from '../find_award/template/greenHtmlTemplate';
// localStorage.setItem('activityId', 1);
import { delegate } from '~/util/elemnet';
function GetRequest() {
  let url = location.search; // 获取url中"?"符后的字串
  let theRequest = new Object();
  if (url.indexOf('?') != -1) {
    let str = url.substr(1);
    strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1]);
    }
  }
  return theRequest;
}
let Request = new Object();
Request = GetRequest();
name = Request['name'];
const id = localStorage.getItem('activityId');
document.getElementById('redeem').addEventListener('click', redeem, false);
document.getElementById('notredeem').addEventListener('click', notredeem, false);
notredeem()
function notredeem() {
    let div = document.getElementById('display');
    displayNotRedeem(id).then((data) => {
        
        let persion = data.data;
        let htmltext = '';
        for (let i = 0; i < persion.length; i++) {
            console.log(persion[i]);
            htmltext = htmltext + renderGreenHtml(persion[i]);
        }
        div.innerHTML = htmltext;
    
    })
    const attachEvent = document.getElementById('display');
    delegate(attachEvent, '#inerEvent', 'click', duijiang, false);
    
}

function redeem() {
    let div = document.getElementById('display');
    displayAlreadyRedeem(id).then((data ) => {
        let persion = data.data;
        let htmltext = '';
        for (let i = 0; i < persion.length; i++) {
            htmltext = htmltext + renderRedHtml(persion[i]);
        }
        div.innerHTML = htmltext;
    })
}


function duijiang(e) {
  console.log(e.delegateTarget);
  let accountId = e.delegateTarget.dataset.no;
  if (accountId == undefined ) {
    return;
  } else {
    console.log(accountId + '213213515');
  duiduijiang(accountId, 1).then((data) => {
    if (data.code == 0) {
      location.reload();
    }
  }
 );
  }
}
