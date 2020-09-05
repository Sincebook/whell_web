import { host } from '~/ajax/config';

export const addAwardUrl = host + '/to/addAward';
export const toAddAward = () => {
  window.location.href = addAwardUrl;
};

export const shareUrl = host + '/to/share';
export const toShare = () => {
  window.location.href = shareUrl;
};
