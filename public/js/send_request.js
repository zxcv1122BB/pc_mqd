"use strict";

/**

 * Created by ASUS on 2017/9/13.

 */
//只可以写在外面,不可用写在function方法里面
// document.write("<script src='/public/js/mobile-detect.min.js'></script>");
// $(function() {
// 	if(localStorage.getItem("userName") && localStorage.access_token) {
// 		//统计在线人数的地址,即后台管理系统
// 		if(localStorage.userType == undefined) {
// 			base.heartbeat(); //调用心跳包
// 		}
// 	}
// });

var base = {
	// BASE_IP: '198.44.243.23',
	// BASE_IP: '154.80.253.34',
	// BASE_IP: '154.80.253.34',
	// BASE_IP: 'jx.831188.com',
	BASE_IP: 'mqd188.com/lsapi1',
	// BASE_IP: 'ssg168.net/lsapi1',
	BASE_URL: "http://",
	// WS_URL: "ws://ssgcp.net/",
	WS_URL: "ws://mqd188.com/",
	// 加密ajax,加token
	websock: '',
	userMess:[],
	privateMess:[],
	onMess:'',
	danMuOpen:0,

        //设置收藏
	collectGame:{
        set:function(val){
            var collectList = localStorage.collectGame ? JSON.parse(localStorage.collectGame).collectList : {};
            var idList = localStorage.collectGame ? JSON.parse(localStorage.collectGame).idList : [];
            val=parseInt(val);
            if(idList.length==0){
                idList.push(val);
                collectList[val]= 1;
                this.success();
            }else{
                var index = idList.indexOf(val);
                if(index!==-1){
                    idList.splice(index,1);
                    delete  collectList[val];
                    this.failure();
                }else{
                    idList.push(val);
                    collectList[val] = 1;
                    this.success();
                }
            }
            if(idList.length==0){
                return ""
            }else{
                return {
                    idList:idList,
                    collectList:collectList
                }
            }
        },
        success:function(){
            layui.use('layer',function(){
                var layer=layui.layer;
                layer.msg('收藏成功');
            })
        },
        failure:function(){

            layui.use('layer',function(){
                var layer=layui.layer;
                layer.msg('取消收藏');
            })
        }
    },

	initData: function() {
		// this.BASE_URL += this.BASE_IP + ':1085';
		// this.BASE_URL += this.BASE_IP + ':10895';
		this.BASE_URL += this.BASE_IP;
		// this.WS_URL += this.BASE_IP + ':12582';
        
	},
	callAuthApi: function callAuthApi(options) {

		//  var html = '<div class="loading_wait" style="display:none;position: fixed;background-color: rgba(0, 0, 0, 0.7);color: white;width: 130px;height: 70px;z-index: 99999;line-height: 70px;text-align: center;border-radius: 10px;top: 0;bottom: 0;margin: 300px auto;left: 0;right: 0;">加载中...</div>';
		//  if ($('.loading_wait').length == 0) {
		//    $('body').append(html);
		//  }
		//  if (options.data.isWhite) {
		//    delete options.data.isWhite;
		//  } else {
		//    $('.loading_wait').show();
		//  }
		//		$('.loading_wait').show();

		options.data.timeStamp = new Date().getTime();

		options.data.lang = localStorage.getItem('lang') || 'tr';

		// alert(JSON.stringify(options.data));

		var self = this,
			userName = localStorage.getItem("userName"),
			isBanLoad = localStorage.getItem("isBanLoad");

		if(localStorage.coerceLogout === 1) {
			return;
		}
		if(userName == null || userName == undefined) {
			//    $('.loading_wait').hide();
			goPage('/login/login.html');
			return;
		}
		if(isBanLoad != "" && isBanLoad != undefined) {
			self.visitOften();
			return;
		}
        if(!$.isEmptyObject(options.data)){

            options.data = objKeySort(options.data);

            // (options.data);

            var str = '',strValue='';
            // var regEx = "[`~!@#$%^&*()\\-+={}':;,\"\'\\[\\].<>/?￥%…（）_+|【】‘；：”“’。，、？\\s]";
            for(var j in options.data){
            	if(options.data[j]==undefined||options.data[j]=='undefined'){
                    options.data[j]='';
				}
                if(options.data[j]!==''){
                    strValue = JSON.stringify(options.data[j]);
                    strValue = strValue.replace(/{/g,"").replace(/"/g,"").replace(/\[/g,"").replace(/:/g,"").replace(/,/g,"").replace(/}/g,"").replace(/]/g,"").replace(/\|/g,"").replace(/\./g,"").replace(/_/g,"").replace(/-/g,"").replace(/\\/g,"").replace(/\s+/g,"");
                    str = (str +j+ "=" +strValue +"&");
                }else{
                    str = (str +j+ "="+"&");
                }
            }
            str = str.substring(0, str.length - 1);
            // str= str.replace(regEx);
            // str = str.replace(/-/g,"").replace(/:/g,"").replace(/\s+/g,"");

            // str = str.replace(/{/g,"").replace(/"/g,"").replace(/\[/g,"").replace(/:/g,"").replace(/,/g,"").replace(/}/g,"").replace(/]/g,"").replace(/\|/g,"").replace(/\./g,"").replace(/_/g,"").replace(/-/g,"").replace(/\s+/g,"");

            // (str+"{"+localStorage.userName+"}");
            options.data.sign =md5(str+"{"+localStorage.userName+"}").toUpperCase();

        }
		return $.ajax({

			"type": options.type,

			//"async": options.async ? options.async : false,
			"async": options.async != undefined ? options.async : true,

			"url": this.BASE_URL + options.url,

			// "data": {
			//
			// 	"RSA_data": encryptData(options.data)
			//
			// },
            "data": options.data,

			"xhrFields": {

				withCredentials: true

			},

			"beforeSend": function beforeSend(request) {

				request.setRequestHeader("X-Authorization", localStorage.getItem("access_token")), request.setRequestHeader("X-Requested-With", "XMLHttpRequest"), request.setRequestHeader("UUID", localStorage.getItem("uuid"));
			},

			"complete": function complete(xhr) {
				var _this = this;

				if(xhr.readyState == 4 && xhr.status == 200) {

					if(options.success) {

						var _this = this;
						if(!xhr.responseJSON) {
							xhr.responseJSON = JSON.parse(xhr.responseText);
						}
						//表示token过期,需要重新刷新token
						if(xhr.responseJSON.code != null && xhr.responseJSON.code == "900") {
							self.refreshToken(options);
						} else if(xhr.responseJSON.code != null && xhr.responseJSON.code == "901") {
							//访问频繁
							base.visitOften(xhr.responseJSON.msg);
							return;
						} else if(xhr.responseJSON.code != null && xhr.responseJSON.code == "600") {
							//系统维护
							self.showPopup(xhr.responseJSON.msg, xhr.responseJSON.body);
							localStorage.clear();
						} else if(xhr.responseJSON.code != null && xhr.responseJSON.code == "601") {
							if(localStorage.isAlert) {
								return;
							}
							localStorage.clear();
                            initIsLogin();
							localStorage.isAlert = setTimeout(function() {
								localStorage.isAlert = 1;
								layer.alert("你已经在其他地方登陆!确定,请重新登陆!");
								localStorage.isAlert = "";
								goPage('/login/login.html');

							}, 500);

						} else if(xhr.responseJSON.code != null && xhr.responseJSON.code == "602") {
							if(localStorage.isAlert) {
								return;
							}
							localStorage.clear();
                            initIsLogin();
							localStorage.isAlert = setTimeout(function() {
								localStorage.isAlert = 1;
								layer.alert('你已被强制下线;确定,将重新登陆!', function(index){
                                  localStorage.isAlert = "";
                                  layer.close(index);
                                  goPage('/login/login.html');
                                });  
							}, 500);
						} else if(xhr.responseJSON.code != null && xhr.responseJSON.code == "603") {
							//ip被拉黑
							console.info(xhr.responseJSON);
						} else {

							//调用回调函数
							options.success.call(this, xhr.responseJSON, xhr);
						}
					}
					//        setTimeout(function () {
					//          $('.loading_wait').hide();
					//        }, 500);
				} else {
					options.error.call();
					//        setTimeout(function () {
					//          $('.loading_wait').hide();
					//        }, 500);
				}
			}
		});
	},
	//不加密ajax（目前用于检验验证码是否正确）

	callCommonApi: function callCommonApi(options) {
		//  var html = '<div class="loading_wait" style="display:none;position: fixed;background-color: rgba(0, 0, 0, 0.7);color: white;width: 130px;height: 70px;z-index: 99999;line-height: 70px;text-align: center;border-radius: 10px;top: 0;bottom: 0;margin: 300px auto;left: 0;right: 0;">加载中...</div>';
		//  if ($('.loading_wait').length == 0) {
		//    $('body').append(html);
		//  }
		//  if (options.url == "/commonAPI/getMatchInfoByPlayId" || options.data.isWhite) {
		//    delete options.data.isWhite;
		//  } else {
		//    $('.loading_wait').show();
		//  }
        options.data.timeStamp = new Date().getTime();

		options.data.lang = localStorage.getItem('lang') || 'tr';

		var self = this;
		//  self.BASE_URL +=  this.BASE_IP;
		// console.log('请求地址'+ this.BASE_URL + options.url)
		return $.ajax({

			"type": options.type,

			"async": options.async != undefined ? options.async : true,

			"url": this.BASE_URL + options.url,

			"data": options.data,

			"xhrFields": { //跨域

				withCredentials: true

			},

			"complete": function complete(xhr) {
				//请求完成时调用的方法

				if(xhr.readyState == 4 && xhr.status == 200) {
					//请求成功时
					if(!xhr.responseJSON) {
						xhr.responseJSON = JSON.parse(xhr.responseText);
					}

					if(xhr.responseJSON.code != null && xhr.responseJSON.code == 600) {

						self.showPopup(xhr.responseJSON.msg, xhr.responseJSON.body);
						localStorage.clear();
						return;
					} else if(xhr.responseJSON.code != null && xhr.responseJSON.code == "901") {
						//访问频繁
						base.visitOften(xhr.responseJSON.msg);
						return;
					} else if(xhr.responseJSON.code != null && xhr.responseJSON.code == "603") {
						//ip被拉黑
						console.info(xhr.responseJSON);
						return;
					}
					if(options.success) {

						options.success.call(this, xhr.responseJSON, xhr);
					}

				// 	setTimeout(function() {
				// 		if (parent && onComplete){
				// 			onComplete();
				// 		}
						
				// 	}, 50)

					// onComplete();
					// onComplete();

					//        setTimeout(function () {
					//          $('.loading_wait').hide();
					//        }, 500);
				} else {
					//请求失败时

					options.error.call();
					//        setTimeout(function () {
					//          $('.loading_wait').hide();
					//        }, 500);
				}
			}

		});
	},

	//token失效后,利用refreshtoken重新获取token

	refreshToken: function refreshToken(options) {

		var self = this;
		//  self.BASE_URL +=  this.BASE_IP;
		$.ajax({

			contentType: "application/json; charset=utf-8",

			beforeSend: function beforeSend(request) {

				request.setRequestHeader("X-Authorization", localStorage.getItem("refreshToken")), request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			},

			type: "post",

			url: this.BASE_URL + "/api/auth/token",

			data: {},

			success: function success(data) {

				console.info("refreshToken:" + data);
				if(data.code != null && data.code == "600") {

					self.showPopup(data.msg, data.body);
					localStorage.clear();
					return;
				}
				var head = "Bearer ";

				localStorage.access_token = head + data.token;

				if(data.code == 332 || data.code == 900 || data.code == 336) {

					//表示refreshToken也过期,需要重新登陆
					console.info("跳转到登陆页面");
					localStorage.clear();
                    initIsLogin();
				} else {

					self.callAuthApi(options);
				}
			}

		});
	},

	//自动登录
	callAuthApiNoEcrypt: function callAuthApiNoEcrypt(options) {

		options.data.timeStamp = new Date().getTime();

		// alert(JSON.stringify(options.data));
        if(!$.isEmptyObject(options.data)){

            options.data = objKeySort(options.data);

            // (options.data);

            var str = '',strValue='';
            // var regEx = "[`~!@#$%^&*()\\-+={}':;,\"\'\\[\\].<>/?￥%…（）_+|【】‘；：”“’。，、？\\s]";
            for(var j in options.data){
                if(options.data[j]==undefined||options.data[j]=='undefined'){
                    options.data[j]='';
                }
                if(options.data[j]!==''){
                    strValue = JSON.stringify(options.data[j]);
                    strValue = strValue.replace(/{/g,"").replace(/"/g,"").replace(/\[/g,"").replace(/:/g,"").replace(/,/g,"").replace(/}/g,"").replace(/]/g,"").replace(/\|/g,"").replace(/\./g,"").replace(/_/g,"").replace(/-/g,"").replace(/\\/g,"").replace(/\s+/g,"");
                    str = (str +j+ "=" +strValue +"&");
                }else{
                    str = (str +j+ "="+"&");
                }
                // str = (str +j+ "=" +options.data[j] +"&");
                // options.data[j] = hex_md5(hex_md5(options.data[j])+localStorage.userName).toUpperCase()

            }
            str = str.substring(0, str.length - 1);
            // str= str.replace(regEx);
            // str = str.replace(/{/g,"").replace(/"/g,"").replace(/\[/g,"").replace(/:/g,"").replace(/,/g,"").replace(/}/g,"").replace(/]/g,"").replace(/\|/g,"").replace(/\./g,"").replace(/_/g,"").replace(/-/g,"").replace(/\s+/g,"");


            options.data.sign =md5(str+"{"+localStorage.userName+"}").toUpperCase();

        }

		var self = this;

		return $.ajax({

			"type": options.type,

			"async": options.async ? options.async : false,

			"url": this.BASE_URL + options.url,

			"data": options.data,

			"xhrFields": {

				withCredentials: true

			},

			"beforeSend": function beforeSend(request) {

				request.setRequestHeader("X-Authorization", localStorage.getItem("access_token")), request.setRequestHeader("X-Requested-With", "XMLHttpRequest"), request.setRequestHeader("UUID", localStorage.getItem("uuid"));
			},

			"complete": function complete(xhr) {

				if(xhr.readyState == 4 && xhr.status == 200) {
					//      	self.heartbeat();
					if(!xhr.responseJSON) {
						xhr.responseJSON = JSON.parse(xhr.responseText);
					}
					if(xhr.responseJSON.code != null && xhr.responseJSON.code == "600") {
						self.showPopup(xhr.responseJSON.msg, xhr.responseJSON.body);
						localStorage.clear();
						return;
					} else if(xhr.responseJSON.code != null && xhr.responseJSON.code == "901") {
						//访问频繁
						base.visitOften(xhr.responseJSON.msg);
						return;
					}
					if(options.success) {

						//表示token过期,需要重新刷新token

						if(xhr.responseJSON.code != null && xhr.responseJSON.code == "900") {

							self.refreshToken(options);
						} else {

							//调用回调函数

							options.success.call(this, xhr.responseJSON, xhr);
						}
					}
				} else {

					options.error.call();
				}
			}

		});
	},
	threadPoxi: function threadPoxi() {
		// 实际调用的方法
		//参数
		var agentData = "ok";
		var _this = this;
		if(!localStorage.userName) {
			return;
		}
		//      if (!this.websock) {
		//          if (localStorage.ip) {
		//              var username = localStorage.userName;
		//              _this.websock = new WebSocket(_this.WS_URL + "/online?username=" + localStorage.userName + "&channel=" + browserType.initMethod(name).channel + "&device=" + browserType.initMethod(name).device + "&ip=" + localStorage.ip);
		//              _this.websock.onopen = function (evt) {
		//                  //("Connection open ...");
		//              };
		//              _this.websock.onmessage = _this.websocketonmessage;
		//              _this.websock.onclose = _this.websocketclose;
		//          } else {
		//              return;
		//          }
		//      }
		//若是ws开启状态
		if(this.websock.readyState === this.websock.OPEN && this.websock.readyState != undefined) {
			this.websocketsend(agentData);
		}
		// 若是 正在开启状态，则等待300毫秒
		else if(this.websock.readyState === this.websock.CONNECTING && this.websock.readyState != undefined) {
			var that = this; //保存当前对象this
			setTimeout(function() {
				that.websocketsend(agentData);
			}, 300);
		}
		// 若未开启 ，则等待500毫秒
		else {
			if(base.onMess == '008900'){
						return;
					}
			this.initWebSocket();
			var _that = this; //保存当前对象this
			setTimeout(function() {
				_that.websocketsend(agentData);
			}, 500);
		}
	},
	initWebSocket: function initWebSocket() {
		if(!localStorage.userName) {
			return;
		}
		var _this = this;
		if(_this.websock.readyState != undefined && _this.websock.readyState === this.websock.OPEN) {
			return;
		}
		var ip = '',
			token = localStorage.access_token.split(' ')[1],
			userType;
		if(localStorage.userType == 2) {
			userType = 0;
		} else if(localStorage.userType == 3) {
			userType = 2;
		} else if(localStorage.userType == 1) {
			userType = 1;
		}
		//获取ip地址
		$.getScript('http://pv.sohu.com/cityjson?ie=utf-8', function() {
			ip = returnCitySN["cip"];
			_this.websock = new WebSocket(_this.WS_URL + "/ws?username=" + localStorage.userName + "&channel=" + browserType.initMethod(name).channel + "&device=" + browserType.initMethod(name).device + "&ip=" + ip + '&token=' + token + '&userType=' + userType);
			_this.websock.onopen = function(evt) {
				// //("Connection open ...");
				//				_this.websock.send("Hello WebSockets!");
			};
			_this.websock.onmessage = _this.websocketonmessage;
			_this.websock.onclose = _this.websocketclose;
			localStorage.ip = ip;
		});
	},
	websocketonmessage: function websocketonmessage(e) {
		//数据接收
		var onMess,_this = this;
		onMess = $.parseJSON(e.data);
		base.onMess = onMess.code + '' + onMess.messType;
		//命令
		if(onMess.messType == '900') {
			if(onMess.code == '002') {
				localStorage.clear();
                initIsLogin();
				layer.alert('您已被强制下线');
				goPage('/login/login.html');
			} else if(onMess.code == '003' || onMess.code == '004' || onMess.code == '005' || onMess.code == '006') {
				base.userMess.push({
					userType: '0', //消息类型
					uName: onMess.userName, //会员名
					mess: onMess.mess, //消息内容
					uTime: onMess.time //发送时间
				});
			} else if(onMess.code == '007') {
				localStorage.clear();
                initIsLogin();
				layer.alert('您已在其他设备登录');
				goPage('/login/login.html');
			} else if(onMess.code == '008') {
				localStorage.clear();
                initIsLogin();
                layer.alert('您已在其他设备登录');
                goPage('/login/login.html');
			}
		}

		//系统消息
		if(onMess.messType == '200') {
			if(onMess.code=='002'){
				base.userMess.push({
					userType: '3',
					uName: onMess.userName,
					mess: onMess.mess,
					uTime: onMess.time,
				});
				return;
			}else if(onMess.code == '003') { //解除禁言
				base.chatStatus = 0;
			} else if(onMess.code == '004') { //禁言用户
				base.chatStatus = 1;
			} else if(onMess.code == '005') { //全体禁言
				base.chatStatus = 2;
			} else if(onMess.code == '006') { //取消全体禁言
				base.chatStatus = 3;
			}
			base.userMess.push({
				userType: '0',
				uName: onMess.userName,
				mess: onMess.mess,
				uTime: onMess.time,
			});
		}
		//用户消息
		if(onMess.messType == '100') {
			if(onMess.code == '001') {
				if(onMess.userName == localStorage.userName) {
					base.userMess.push({
						userType: '1',
						uName: onMess.userName,
						mess: onMess.mess,
						uTime: onMess.time.split(' ')[1],
						messType: 0,
					});
				} else {
					base.userMess.push({
						userType: '2',
						uName: onMess.userName,
						mess: onMess.mess,
						uTime: onMess.time.split(' ')[1],
						messType: 0,
					});
				}
			} else if(onMess.code == '002') {
				if(onMess.userName == localStorage.userName) {
					base.privateMess.push({
						userType: '1',
						uName: onMess.userName,
						mess: onMess.mess,
						uTime: onMess.time.split(' ')[1],
						messType: 1,
						toUserName: onMess.toUserName
					});
				} else {
					base.privateMess.push({
						userType: '2',
						uName: onMess.userName,
						mess: onMess.mess,
						uTime: onMess.time.split(' ')[1],
						messType: 1,
						toUserName: onMess.toUserName
					});
				}
			}
		}
	},
	websocketsend: function websocketsend(agentData) {
		//数据发送
		//		this.websock.send(agentData);
	},
	websocketclose: function websocketclose(e) {
		//关闭
		if(localStorage.ifClose == 0) {
			base.threadPoxi();
		}
		// //("connection closed (" + e.code + ")");
	},
	heartbeat: function(name) {
		//      if (localStorage.ip) {
		//          this.threadPoxi();
		//      } else {
		//          this.initWebSocket();
		//      }
	},
	//心跳包
	// heartbeat: function(name) {
	// 	$.jheartbeat.set({
	// 			url: base.BASE_URL+ "/commonAPI/onlineHeartbeat",
	// 			delay: 3000 * 10, // 定时器的周期
	// 			div_id: "test_div", // 添加弹框
	// 			data: browserType.initMethod(name)
	// 		},
	// 		function() { //回调函数// Callback Function
	// 		});
	// },
	//系统维护展示弹框
	showPopup: function showPopup(title, msg) {
		sessionStorage.tipsContent = msg;
		window.location.href = "/lost.html";
	},
	//访问频繁
	visitOften: function visitOften(msg) {
		var ow = document.documentElement.clientWidth,
			oh = document.documentElement.clientHeight,
			num = 4,
			html = '<div id="visit_wait_wrap" style="width:' + ow + 'px;height:' + oh + 'px;position: fixed;top: 0;bottom: 0;left: 0;right: 0;background-color: rgba(2, 2, 2, 0.5);;z-index:99999;"></div><div id="visit_wait" style="display:none;position: fixed;background-color: #fff;width: 20rem;height: 3rem;z-index: 100000;line-height: 3rem;text-align: center;border-radius: 1.5rem;top: 0;bottom: 0;margin: 300px auto;left: 0;right: 0;">加载中...</div>';
		$('.loading_wait').hide();
		if($('body').css('overflow') != 'hidden') {
			$('body').append(html);
			$('body').css('overflow', 'hidden');
		}
		$('#visit_wait').show();
		html = "访问太过频繁，4s后自动刷新当前页";
		$('#visit_wait').html(html);
		var timer = setInterval(function() {
			num--;
			html = "访问太过频繁，" + num + "s后自动刷新当前页";
			$('#visit_wait').html(html);
			if(num == 0) {
				clearInterval(timer);
				$('body').css('overflow', 'auto');
				location.reload();
				//				$('#visit_wait').hide();
				//				$('#visit_wait_wrap').hide();
			}
		}, 1000);
	},

	//系统顶部状态栏高度
	getStatusbarHeight: function getStatusbarHeight() {
		return plus.navigator.getStatusbarHeight();
	}
};

base.initData();