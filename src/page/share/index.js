
let _url = localStorage.getItem('_shareUrl');
document.getElementById('ecode').innerHTML = `<img width="100%" height="100%"
src="http://hb5.api.okayapi.com/?service=Ext.QrCode.Png&data=${_url}&app_key=35985BE88CD0404CDF0FE78FAF4F082B"
data-preview-src="" data-preview-group="1" />`;
