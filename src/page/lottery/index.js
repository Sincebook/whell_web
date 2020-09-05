import { displayActivity } from '~/ajax/activity';
import codes from '~/config/codeConfig';
import { drawPrize } from '~/ajax/lottery';
// 活动数据渲染
const a = displayActivity(9).then((data) => {
  let _data;
  if (data.code == codes.success) {
   _data = data.data.awards;
    showData(_data);
    drawLottery();
    return data.data.awards;
  } else if (data.code == codes.ACTIVITY_NOT_FIND) {
    alert('活动有误！'); 
  }
}); 

function showData(_data) {
  console.log(_data);
  for (let i in _data) {
    _lottery.title[i] = _data[i].name;
  }
 // _lottery.title = ['0', '1', '2', '3', '4', '5'];
  _lottery.colors = ['#fe807d', '#fe7771', '#fe807d', '#fe7771', '#fe807d', '#fe7771', '#fe807d', '#fe7711', '#fe807d', '#fe7711'];
  
}

// 横竖屏
let updateOrientation = function () {
  if (window.orientation == '-90' || window.orientation == '90') {
    alert('为了更好的体验，请将手机/平板竖过来！');
  }
};
window.onorientationchange = updateOrientation;


// 随机数
function rnd(n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}

// 显示提示框
let toast_timer = 0;

function showToast(message) {
  let alert = document.getElementById('toast'),
    toastHTML = '';
  if (alert == null) {
    toastHTML = '<div id="toast">' + message + '</div>';
    document.body.insertAdjacentHTML('beforeEnd', toastHTML);
  } else {
    alert.style.opacity = .9;
  }
  toast_timer = setTimeout('hideToast()', 1000);
}

// 隐藏提示框
function hideToast() {
  let alert = document.getElementById('toast');
  alert.style.opacity = 0;
  clearTimeout(toast_timer);
}

// 获取当前兑奖次数
function getToalNum() {
  return 1;
}

let $popover = $('.popover'),
  $lottery = $('#lotterys'),
  $go = $('#go'),
  $modal = $('.popover,.modal'),
  $lottery_num = $('#lottery_num'),
  total_num = getToalNum('LOTTERY_TOTAL_NUM') || 0;
let canvas = document.getElementById('lotterys');

let ctx = canvas.getContext('2d');
let _lottery = {
  title: [], // 奖品名称
  colors: [], // 奖品区块对应背景颜色
  endColor: '#FF5B5C', // 中奖后区块对应背景颜色
  outsideRadius: 140, // 外圆的半径
  insideRadius: 30, // 内圆的半径
  textRadius: 105, // 奖品位置距离圆心的距离
  startAngle: 0, // 开始角度
  isLock: false // false:停止; ture:旋转
};

// 画出转盘
function drawLottery(lottery_index) {
  let w = 300;
  let h = 300;
  if (canvas.getContext) {
    let arc = Math.PI / (_lottery.title.length / 2); // 根据奖品个数计算圆周角度
    ctx.clearRect(0, 0, w, h); // 在给定矩形内清空一个矩形
    ctx.strokeStyle = '#e95455'; // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
    ctx.font = '16px Microsoft YaHei'; // font 属性设置或返回画布上文本内容的当前字体属性
    for (let i = 0; i < _lottery.title.length; i++) {
      let angle = _lottery.startAngle + i * arc;
      ctx.fillStyle = _lottery.colors[i];

      // 创建阴影（两者同时使用） shadowBlur:阴影的模糊级数   shadowColor:阴影颜色 【注：相当耗费资源】
      // ctx.shadowBlur = 1;  
      // ctx.shadowColor = "#fff";  

      ctx.beginPath();
      // arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）  
      ctx.arc(w / 2, h / 2, _lottery.outsideRadius, angle, angle + arc, false);
      ctx.arc(w / 2, h / 2, _lottery.insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();
      ctx.save();

      // ----绘制奖品开始----
      // 中奖后改变背景色
      if (lottery_index != undefined && i == lottery_index) {
        ctx.fillStyle = _lottery.endColor;
        ctx.fill();
      }
      ctx.fillStyle = '#fff';
      let text = _lottery.title[i],
        line_height = 17,
        x, y;
      x = w / 2 + Math.cos(angle + arc / 2) * _lottery.textRadius;
      y = h / 2 + Math.sin(angle + arc / 2) * _lottery.textRadius;
      ctx.translate(x, y); // translate方法重新映射画布上的 (0,0) 位置
      ctx.rotate(angle + arc / 2 + Math.PI / 2); // rotate方法旋转当前的绘图
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0); // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
      ctx.restore(); // 把当前画布返回（调整）到上一个save()状态之前 
      // ----绘制奖品结束----
    }
  }
}

// 旋转转盘  angles：角度; item：奖品位置; txt：提示语;
let rotateFn = function (item, angles, txt) {
  _lottery.isLock = !_lottery.isLock;
  $lottery.stopRotate();
  $lottery.rotate({
    angle: 0,
    animateTo: angles + 1800,
    duration: 8000,
    callback: function () {
      $modal.hide();
      drawLottery(item); // 中奖后改变背景颜色
      if (item == 3 || item == 7) {
        $popover.show().find('.m4').show();
      } else {
        $popover.show().find('.m5').show().find('font').text(txt);
        record_log(txt); // 插入我的中奖纪录
      }
      changeNum(total_num);
      _lottery.isLock = !_lottery.isLock;
    }
  });
};

// 开始抽奖
function lottery() {
  if (_lottery.isLock) {
    showToast('不要反复点击哦！');
    return;
  }
  $modal.hide();
  if (total_num <= 0) {
    $popover.show().find('.m3').show();
    total_num = 0;
  } else {
    let angels = init_angels(_lottery.title.length); // 对应角度
    drawLottery();
    drawPrize().then((data) => {
      if (data.code == codes.success) {
        const awardName = data.data.awardName;
        const awardCode = data.data.awardCode;
        for (let i in _lottery.title) {
          if (_lottery.title[i] == awardName) {
            rotateFn(i, angels[i], _lottery.title[i]);
            document.getElementById('receives_btn').innerHTML = awardCode;
            total_num--;
          } else if (data.code == codes.AWARD_UNKNOW_EXCEPTION) {
            mui.alert(data.errMsg);
          } else if (data.code == codes.GET_AWARD_REPEAT) {
            mui.alert(data.errMsg);
          } else if (data.code == codes.GET_AWARD_FAIL) {
            mui.alert(data.errMsg);
          } else if (data.code == codes.REDEEM_FAIL) {
            mui.alert(data.errMsg);
          } else {
            mui.alert('未知错误！');
          }
        }
      }
    });
  }
}
// 角度规格化
function init_angels(num) {

  let theAngels = [];
  const temple = 360 / num;
  const temp = temple / 2;
  theAngels[0] = 270 - temp;
  for (let i = 0; i < num; i++) {
    theAngels[i + 1] = theAngels[i] - temple; 
  }
  return theAngels;
}
// 转盘初始化
  // 动态添加大转盘的奖品与奖品区域背景颜色
  
// 抽奖机会次数

function changeNum(num) {
  $lottery_num.text(num);
}

// 写入我的抽奖记录
function record_log(txt) {
  let tpl = '',
    $el = $('.lottery_records');
  tpl = txt != undefined ? '<li><p>' + txt + '<span>x 1</span></p></li>' : '<li class="empty_record"><p>暂无记录</p></li>';
  if ($el.find('li').hasClass('empty_record') > 0) $el.html('');
  $el.append(tpl);
}
// share_tips();
// 显示微信分享提示
function share_tips() {
  $modal.hide();
  $popover.show().find('.m6').show();
}

// 关闭弹出层
function close_popover() {
  $popover.hide();
}

$(function () {
  console.log();
  // 初始化我的抽奖记录
  record_log();

  // 初始化抽奖次数
  changeNum(total_num);


  // go 点击事件
  $go.click(function () {
    lottery();
  });

  // 领取/分享/再抽一次
  $('.modal_btns').on('click', function () {
    let thisId = $(this).attr('id');
    switch (thisId) {
      case 'share_btn':
        share_tips();
        break;
      case 'receives_btn':
        window.location.href = 'http:// www.hehaibao.com';
        break;
      case 'come_again_btn':
        lottery();
        break;
    }
  });

  // 我的中奖记录和活动规则
  $('.lottery_btns a').click(function () {
    let theID = $(this).attr('id');
    $modal.hide();
    if (theID == 'btn1') {
      $popover.show().find('.m2').show();
    } else {
      $popover.show().find('.m1').show();
    }
  });

  // 关闭弹出层
  $('.modal.m6, .close_btn').click(function () {
    close_popover();
  });
});

