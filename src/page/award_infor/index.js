import { displayNotRedeem, displayAlreadyRedeem } from '~/ajax/award_infor';
localStorage.setItem('activityId', 1 );
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
            htmltext = htmltext + `<li class="mui-table-view-cell mui-media">
            <a href="javascript:;">
              <img class="mui-media-object mui-pull-left"
                src="${persion[i].headImgUrl}">
              <div class="mui-media-body">
                ${persion[i].awardName}<b class="mui-pull-right" style="font-size: 20px;">${persion[i].awardCode}</b><small
                  class="mui-pull-right">兑奖码：</small>
                <p class='mui-ellipsis'><br></p>
                <button class="mui-pull-right mui-btn-green">立即兑奖</button>
              </div>
            </a>
          </li>`;
        }
        div.innerHTML = htmltext;
    
    })
    
}

function redeem() {
    let div = document.getElementById('display');
    displayAlreadyRedeem(id).then((data ) => {
        let persion = data.data;
        let htmltext = '';
        for (let i = 0; i < persion.length; i++) {
            htmltext = htmltext + `<li class="mui-table-view-cell mui-media">
            <a href="javascript:;">
              <img class="mui-media-object mui-pull-left"
                src="${persion[i].headImgUrl}">
              <div class="mui-media-body">
                ${persion[i].awardName}<b class="mui-pull-right" style="font-size: 20px;">${persion[i].awardCode}</b><small
                  class="mui-pull-right">兑奖码：</small>
                <p class='mui-ellipsis'><br></p>
                <button class="mui-pull-right mui-btn-green">已兑奖</button>
              </div>
            </a>
          </li>`;
        }
        div.innerHTML = htmltext;
    })
}


