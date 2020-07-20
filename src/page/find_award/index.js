import { getAllAccountAwards, duiduijiang } from '~/ajax/find_award';
import renderRedHtml from './template/redHtmlTemplate';
import renderGreenHtml from './template/greenHtmlTemplate';
import { AWARD_STATUS_NOT } from '~/config/codeConfig';
import { delegate } from '~/util/element';

let activityId = 1;
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

  const attachEvent = document.getElementById('showList');
delegate(attachEvent, '#inerEvent', 'click', duijiang, false);

function duijiang(e) {
  console.log(e.delegateTarget);
  let no = e.delegateTarget.dataset.no;
  if (no == undefined ) {
    console.log('error');
    return;
  } else {
  console.log(no);
  duiduijiang(no).then((data) => {
    if (data.code == 0) {
      location.reload();
    }
  }
 );
  }
}
