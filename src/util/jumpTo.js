const host = '';

export const addAwardUrl = host + '/to/add_award';
export const toAddAward = () => {
  window.location.href = addAwardUrl;
};

export const shareUrl = host + '/to/share';
export const toShare = () => {
  window.location.href = shareUrl;
};
