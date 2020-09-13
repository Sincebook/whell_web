import { host } from '~/ajax/config';

export const addAwardUrl = host + '/to/addAward';
export const toAddAward = () => {
  window.location.href = addAwardUrl;
};

export const shareUrl = host + '/to/share';
export const toShare = () => {
  window.location.href = shareUrl;
};

export const activityUrl = host + '/to/activity';
export const toActivity = () => {
  window.location.href = activityUrl;
};

export const awardInfoUrl = host + '/to/awardInfo';
export const toawardInfo = () => {
  window.location.href = awardInfoUrl;
};

export const findAwardUrl = host + '/to/findAward';
export const tofindAward = () => {
  window.location.href = findAwardUrl;
};
