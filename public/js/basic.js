"use strict";

var basic = {
	appDownloadPageUrl: "",
	appDownloadPageUrlList: window.location.protocol+"//m."+window.location.host+"/#/transfer/",
	// appDownloadPageUrlList:"",
	init: function init() {
		this.setAppTurnUrl();
	},
	setAppTurnUrl: function setAppTurnUrl() {
		var config = localStorage.config ? JSON.parse(localStorage.config) : '';

		var _this = this;
		var obj = {
			type: "post",
			data: {},
			url: "/commonAPI/privacy/getSysConfigureResult",
			success: function success(data) {
				if (data.code == 200) {
					_this.appDownloadPageUrl = data.body.appDownloadPageUrl;
					localStorage.setItem('config', JSON.stringify(data.body));
					_this.isTurn();
				}
			}
		};
		if (config && !config.appDownloadPageUrl) {
			var sendIp = base.BASE_IP;
			this.appDownloadPageUrl = this.appDownloadPageUrlList.replace("www.","");
			_this.isTurn();
		} else if (config.appDownloadPageUrl) {
			this.appDownloadPageUrl = config.appDownloadPageUrl + "/";
			_this.isTurn();
		} else {
			var sendIp = base.BASE_IP;
			this.appDownloadPageUrl = this.appDownloadPageUrlList.replace("www.","");
			// base.callCommonApi(obj);
			_this.isTurn();
		}
	},
	isTurn: function isTurn() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
		var bIsIphone = sUserAgent.match(/iphone os/i) == 'iphone os';
		var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
		var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
		var bIsUc = sUserAgent.match(/ucweb/i) == 'web';
		var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
		var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
		var bIsAndroid = sUserAgent.match(/android/i) == 'android';

		if (bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM || bIsAndroid) {
			var tuiguan_codeurl = location.search;
			window.location.href = this.appDownloadPageUrl + tuiguan_codeurl;
		}
	}
};

basic.init();