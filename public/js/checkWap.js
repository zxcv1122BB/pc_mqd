(function browserRedirect(){
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
    var bIsIphone = sUserAgent.match(/iphone os/i) == 'iphone os';
    var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
    var bIsUc = sUserAgent.match(/ucweb/i) == 'web';
    var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
    var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
    var bIsAndroid = sUserAgent.match(/android/i) == 'android';

    if(bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM || bIsAndroid ){
        var tuiguan_codeurl = location.search;
        if(localStorage.config==undefined){
            var obj = {
                type: "post",
                data: {},
                url: "/commonAPI/privacy/getSysConfigureResult",
                success: function (data) {
                    if (data.code == 200) {
                        var config = data.body;
                        localStorage.setItem('config', JSON.stringify(data.body));
                        window.location.href = data.body.appDownloadPageUrl+tuiguan_codeurl;
                    }else{
                        //('获取缓存失败');
                    }
                }
            };
            if(base){
            	base.callCommonApi(obj);
            }else{
	           setTimeout(function(){
	           	base.callCommonApi(obj);
	           },50)

            }
           
           
            
        }else{
            var obj = JSON.parse(localStorage.config);
            window.location.href = obj.appDownloadPageUrl+tuiguan_codeurl;
        }
    }
})();