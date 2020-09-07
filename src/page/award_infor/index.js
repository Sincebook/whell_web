import { displayNotRedeem, displayAlreadyRedeem } from '~/ajax/award_infor';
import { duiduijiang } from '~/ajax/find_award';
import renderRedHtml from '../find_award/template/redHtmlTemplate';
import renderGreenHtml from '../find_award/template/greenHtmlTemplate';
// localStorage.setItem('activityId', 1);
import { delegate } from '~/util/elemnet';
const id = localStorage.getItem('activityId');
console.log(id);
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
