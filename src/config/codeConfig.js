module.exports = {
    success: '0',
    ACTIVITY_IS_RUNNING: '500_401', // status=1 活动正在执行
    ACTIVITY_IS_OUTDATED:  '500_402', // "活动已经失效");//status=2 活动失效
    ACTIVITYID_EXCEPTION: '500_403', // "参数异常");
    ACTIVITY_EXCEPTION: '500_407', // "此活动与商家活动不匹配");
    ACTIVITY_INSERT_FAIL: '500_404', // "插入失败");
    ACTIVITY_NOT_FIND: '500_405', // "活动不存在");
    FINISH_ACTIVITY_FAIL: '500_408', // 结束失败 
    ACCOUNT_NOT_RIGHT: '600_401', // 用户没有权限
    ACCOUNT_NOT_LOGIN: '900_403', // 用户还未登录，请先登录!
    NOT_FIND_ACCOUNT_AWARD: '800_002', // 未找到该中奖信息
    NOT_FIND_NOT_REDEEMS: '900_11', // "未找到与此活动相关的未兑奖信息");
    NOT_FIND_REDEEMS: '900_12', // "未找到与此活动相关的已兑奖信息");
    NOT_FIND_ALLREDEEMS: '900_13', // "未找到与此活动相关的全部兑奖信息");
    AWARD_CODE_NOT_FOUND: '900_401', // 兑奖码不存在!");
    GET_AWARD_FAIL: '900_402', // 抽奖失败!");
    GET_AWARD_REPEAT: '900_405', // 只能抽奖一次!");
    REDEEM_FAIL: '900_406', // 兑奖失败，不能重复兑奖!");
    AWARD_PROBABILITY_WRONG: '700_401', // 奖品概率设置不为100%");
    AWARD_NUMBER_EXCEED: '700_402', // 商品数量设置超过10");
    AWARD_UNKNOW_EXCEPTION: '700_403', // 抽奖时遇到未知异常");
};
