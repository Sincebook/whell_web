export default (pushItem) =>
`<li class="mui-table-view-cell mui-media">
<a href="javascript:;">
  <img class="mui-media-object mui-pull-left" src="">
  <div class="mui-media-body">
    ${pushItem.awardName}<b class="mui-pull-right" style="font-size: 20px;">${pushItem.awardCode}</b><small class="mui-pull-right">兑奖码：</small>
    <br><br> 
    <button id="inerEvent" class="mui-pull-right mui-btn-green"  data-no="${pushItem.accountId}" >立即兑奖</button>
  </div>
</a>
</li>`;
