$(function() {
	$(".topNav span").eq(0).addClass("chooseYes");
	$(".topNav span").eq(0).click();
	$('.topNav span').click(function() {
		var index = $(this).index();
		$(this).addClass('chooseYes').siblings().removeClass('chooseYes');
	});
	
	layui.use('layer', function() {
		var layer = layui.layer;
	});
});

//验证金额框只能输入数字
function num(obj) {
	obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
	obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
	obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}

var pc = new Vue({
	el: "#main",
	data: {
		payBlankDatas: [],
		allpayWay: [],
		payWay: [], //当前选择支付方式
		payConditions: [], //获取支付时的参数
		payDatas: '', //支付返回的结果
		src: '',
		errorMsg: '',
		money: '',
		time: '', //当前时间
		fastPay: [], //快捷支付
		blankPay: [], //银行支付		
		typeid: '', //支付类型
		money: '', //充值金额
		iconSrc: '', //图片路径
		iconSrcList:[],//图片路径
		show_index: 1,
		orderNum: '', //订单号
		payCoin:'',
		firName:'',   //真实姓名
		coinUnit:'元',
		agencyType: localStorage.agencyType ? localStorage.agencyType : 2,//用户类型
		chanel:1,
		secondTime:{
			min:'',
			sec:''
		}
	},
	created: function() {
		if(localStorage.userType==2){
			alert('试玩账号不能充值')
			window.location.href='../../index.html'
		}
		this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
		this.getChanel();
		this.initUserInfo();
		this.getPayWay();
	},
	methods: {
		getChanel: function() {
			var chanel = 0;
			if(navigator.userAgent.indexOf("lsApp") != -1) {
				chanel = 3;
			} else if(navigator.userAgent.indexOf("Windows") != -1) {
				chanel = 1;
			} else if(navigator.userAgent.indexOf("Android") || navigator.userAgent.indexOf("iPhone")) {
				chanel = 2;
			}
			this.chanel  =  chanel;
		},
		//查询所有支付方式
		getPayWay: function() {
			var _this = this;
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/selectPaytypeList",
				data: {
					paymodel: _this.chanel,
				},
				success: function(data) {
					if(data.code == 200) {
						_this.allpayWay = data.body;
					}
				}
			}
			base.callAuthApi(getUserInfo);
		},
		//点击支付方式大类
		clickPayTitle: function(id) {
			var _this = this;
			$(".iconImg .nav").removeClass('navYes');
			$(".paySuccess").hide();
			$(".payError").hide();
			$(".noMessage").hide();
			$('.iconImg .nav').attr('isClick','1');
			if(!id) {
				id = _this.allpayWay[0].id;
			}
			if(id == 3) {
				_this.show_index = 2;
				_this.clickFastPay(id);
			} else if(id == 2) {
				_this.show_index = 3;
				_this.clickBlankPay(id);
			} else {
				_this.show_index = 1;
				_this.clickPayWay(id);
			}

		},
		//查询支付方式小类
		clickPayWay: function(id) {
			var _this = this;
			getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/selectPaytypeList",
				data: {
					payType: id,
					paymodel: _this.chanel,
				},
				success: function(data) {
					if(data.code == 200) {
						var it="",payment_mode_index="";
						_this.payWay = data.body;
						_this.iconSrcList=[];
						if(_this.payWay && _this.payWay.length > 0) {
							for(var i = 0; i < _this.payWay.length; i++) {
								it=_this.payWay[i];
								
								if(_this.payWay[i].payment_mode.indexOf("ALIPAY")!=-1){
									_this.payWay[i].payment_mode_name="支付宝";
								}else if(_this.payWay[i].payment_mode.indexOf("QQ")!=-1){
									_this.payWay[i].payment_mode_name="QQ";
								}else if(_this.payWay[i].payment_mode.indexOf("JD")!=-1){
									_this.payWay[i].payment_mode_name="京东";
								}else if(_this.payWay[i].payment_mode.indexOf("UNIONPAY")!=-1||_this.payWay[i].payment_mode.indexOf("QUICK")!=-1){
									_this.payWay[i].payment_mode_name="银联";
								}else if(_this.payWay[i].payment_mode.indexOf("WEIXIN")!=-1){
									_this.payWay[i].payment_mode_name="微信";
								}
								_this.iconSrcList.push(it.payico_url)
								if(!_this.payWay[i].compname) {
									_this.payWay[i].compname = "payWays";
								}
							}
						} else {
							$(".noMessage").show();
						}
					}
				}
			}
			base.callAuthApi(getUserInfo);
		},
		//查询快捷支付信息
		clickFastPay: function(id) {
			var _this = this;
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/selectPayQuick",
				data: {
					payType: id,
					paymodel: _this.chanel,
				},
				success: function(data) {
					if(data.code == 200) {
						_this.fastPay = data.body;
						if(!_this.fastPay || _this.fastPay.length <= 0) {
							$(".noMessage").show();
							return;
						}
					}
				}
			}
			base.callAuthApi(getUserInfo);
		},
		//查询银行入款数据
		clickBlankPay: function(id) {
			var _this = this;
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/selectPayBlank",
				data: {
					payType: id,
					paymodel: _this.chanel,
				},
				success: function(data) {
					if(data.code == 200) {
						_this.blankPay = data.body;
						if(!_this.blankPay || _this.blankPay.length <= 0) {
							$(".noMessage").show();
						}
					}
				}
			}
			base.callAuthApi(getUserInfo);
		},
		//获取订单号
		getOrderNum: function() {
			var _this = this;
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/generateOrderId",
				data: {},
				success: function(data) {
					if(data.code == 200) {
						_this.orderNum = data.body;
					}
				}
			}
			base.callAuthApi(getUserInfo);
		},
		//点击支付方式小类
		clickPay: function(ways, index) {
		var _this=this;
			_this.money = $("#payCoin").val();
			$("#prompt").html("");
			$(".paySuccess").slideUp("slow");
			$(".payError").slideUp("slow");
			$(".iconImg .nav").removeClass('navYes');
			$('#ifr').attr('height','1500px');
			//判断是否输入要充值的金额
			if(_this.money == ""||_this.money <=0) {
				$("#prompt").html("请输入你要充值的金额");
			}  else if(ways.max_money && ways.min_money) {
				if(parseFloat(ways.max_money) < parseFloat(_this.money) || parseFloat(ways.min_money) > parseFloat(_this.money)) {
					$("#prompt").html("不在充值范围内");
				} else {
					if(_this.show_index == 1) {
						_this.clickPays(index,ways.iframe);
					} else if(_this.show_index == 2) {
						if($('.iconImg .nav').eq(index).attr('isClick') == 1) {
							_this.getOrderNum(index);
							_this.payConditions = _this.fastPay[index];
							$(".iconImg .nav").eq(index).children('.paySuccess').slideDown("slow");
							$(".iconImg .nav").eq(index).addClass('navYes').siblings().removeClass('navYes');
							$('.iconImg .nav').eq(index).attr('isClick', '2');
						} else {
							$(".iconImg .nav").children('.paySuccess').slideUp("slow");
							$(".iconImg .nav").children('.payError').slideUp("slow");
							$(".iconImg .nav").removeClass('navYes');
							$('.iconImg .nav').eq(index).attr('isClick', '1');
						}
						
					} else {
						if($('.iconImg .nav').eq(index).attr('isClick') == 1) {
							_this.getOrderNum(index);
							_this.payConditions = _this.blankPay[index];
							$(".iconImg .nav").eq(index).children('.paySuccess').slideDown("slow");
							$(".iconImg .nav").eq(index).addClass('navYes').siblings().removeClass('navYes');
							$('.iconImg .nav').eq(index).attr('isClick', '2');
						} else {
							$(".iconImg .nav").children('.paySuccess').slideUp("slow");
							$(".iconImg .nav").children('.payError').slideUp("slow");
							$(".iconImg .nav").removeClass('navYes');
							$('.iconImg .nav').eq(index).attr('isClick', '1');
						}
					}
				}
			}
			setTimeout(function(){
				parent.document.getElementById('ifr').style.height = document.body.scrollHeight + 'px';
			},500)
			
		},
		//在线支付提交订单
		clickPays: function(index,ifr) {
			$('.qcode').find('canvas').remove();
			var _this = this;
			_this.pay_index=index;
			if($('.iconImg .nav').eq(index).attr('isClick') == 1) {
				layer.load(2);
				var getUserInfo = {
					type: "post",
					// async: false,
					url: "/authApi/newPayQuick",
					data: {
						account_name:localStorage.userName,
						method:  _this.payWay[index].methname,
						payment_mode:_this.payWay[index].payment_mode,
						paymoney: _this.money,
					},
					success: function(data) {
						layer.closeAll();
						if(data.code==200){
							$(".iconImg .nav").eq(index).children('.paySuccess').slideDown("slow");
							$(".iconImg .nav").eq(index).addClass('navYes').siblings().removeClass('navYes');
							$('.iconImg .nav').eq(index).attr('isClick', '2');
							_this.payDatas = data;
							if(ifr==2){
								window.open(data.info);
								return
							  }
							var qcDom=$(".iconImg .nav").eq(index).children('.paySuccess').find(".qcode");
							var codeUrl=data.info.qrcode_url;
							var s=new Date().getTime(),st=new Date().getTime();
							_this.lastTime= s+5*1000*60,
							 _this.startTime=s;
							if(_this.payWay[index].payment_mode==0){
								codeUrl=data.info.ewmurl;
								_this.lastTime= s+1.5*1000*60;
							}
							jQuery(qcDom).qrcode({
								render: "canvas", // 渲染方式有table方式和canvas方式
								width: 200, //默认宽度
								height: 200, //默认高度
								text: codeUrl, //二维码内容
								typeNumber: -1, //计算模式一般默认为-1
								correctLevel: 0, //二维码纠错级别
								background: "#ffffff", //背景颜色
								foreground: "#000000" //二维码颜色
							});
							if(_this.deadlineTiming) {
								window.clearInterval(_this.deadlineTiming);
								_this.deadlineTiming = "";
							  }
							
							_this.countdown(_this.lastTime,  _this.startTime)
							_this.deadlineTiming = setInterval(function () {
								_this.startTime += 1000;
								_this.countdown(_this.lastTime, _this.startTime);
							  }, 1000);
	
						}else{ 
							_this.errorMsg = data.info;
							$(".iconImg .nav").eq(index).addClass('navYes').siblings().removeClass('navYes');
							$(".iconImg .nav").eq(index).children('.payError').slideDown("slow");
							$('.iconImg .nav').eq(index).attr('isClick', '2');
						}
						$('#ifr').attr('height','800px');
					},error:function(err){
						layer.closeAll();
					}
				};
				// var getUserInfo = {
				// 	type: "post",
				// 	async: false,
				// 	url: "/authApi/playOnline",
				// 	data: {
				// 		paymoney: _this.money,
				// 		method: _this.payConditions.methname,
				// 		goodsname: 'hhh',
				// 		banktype: _this.payConditions.type_id,
				// 	},
				// 	success: function(data) {
				// 		if(data.status == 1) {
				// 			$(".iconImg .nav").eq(index).children('.paySuccess').slideDown("slow");
				// 			$(".iconImg .nav").eq(index).addClass('navYes').siblings().removeClass('navYes');
				// 			$('.iconImg .nav').eq(index).attr('isClick', '2');
				// 			_this.payDatas = data;
				// 			if(_this.payConditions.type_id == "WEIXIN") {
				// 				_this.src = _this.payDatas.data.r6_qrcode;
				// 			} else {
				// 				window.location.href = _this.payDatas.qrurl;
				// 			}
				// 		} else {
				// 			_this.errorMsg = data.error;
				// 			$(".iconImg .nav").eq(index).addClass('navYes').siblings().removeClass('navYes');
				// 			$(".iconImg .nav").eq(index).children('.payError').slideDown("slow");
				// 			$('.iconImg .nav').eq(index).attr('isClick', '2');
				// 		}
				// 		$('#ifr').attr('height','800px');
	
				// 	}
				// }
				base.callAuthApi(getUserInfo);
			} else {
				$(".iconImg .nav").children('.paySuccess').slideUp("slow");
				$(".iconImg .nav").children('.payError').slideUp("slow");
				$(".iconImg .nav").removeClass('navYes');
				$('.iconImg .nav').eq(index).attr('isClick', '1');
			}
		},
		getzf: function(num) {
			if(parseInt(num) < 10) {
				num = '0' + num;
			}
			return num;
		},
		//时间倒计时
		countdown: function(lastTime, startTime) {
			var _this = this,
				deadlineT = lastTime - startTime,
				deadline_minute = _this.getzf(Math.floor(deadlineT / 1000 / 60 % 60)),
				deadline_second = _this.getzf(Math.floor(deadlineT / 1000 % 60));
			if(deadlineT >= 0) {
				_this.$set(_this.secondTime,'min',deadline_minute);
				_this.$set(_this.secondTime,'sec',deadline_second);
			} else {
					window.clearInterval(_this.deadlineTiming);
					location.reload();
					_this.deadlineTiming = "";
					// _this.secondTime="";
				
			}

		},
		//点击提交订单
		clickSure: function(index) {
			
			var _this = this;

			if(index){
				var obj = {
					type: "post",
					url: "/authApi/finishZhenhaofuPay",
					data: {
						method:  _this.payWay[_this.pay_index].methname,
						payment_mode:_this.payWay[_this.pay_index].payment_mode,
						orderid: _this.payDatas.ordernumber
					},
					success: function(data) {
						layer.msg(data.msg)
						if(data.code == 200) {
							// layer.msg(data.msg)
						} else {
							// layer.msg('充值失败！')
						}
	
					}
				}
				base.callAuthApi(obj);
				return
			}
			if(_this.show_index == 1) {
				_this.clickPaySure();
			} else if(_this.show_index == 2) {
				if(!_this.firName){
					layer.msg('请填写您的姓名');
					return;
				}
				_this.clickFastPays();
			} else {
				if(!_this.firName){
					layer.msg('请填写您的姓名');
					return;
				}
				_this.clickBlankPays();
			}
			if(_this.state == 1) {
				layer.msg("订单提交成功")
				setTimeout(function() {
					window.location.reload();
				}, 1000)
			} else if(_this.state == 0) {
				layer.alert('充值失败！', function() {
					window.location.reload();
				});
			}
		},
		//快捷支付提交
		clickFastPays: function() {
			var _this = this;
			if(_this.payConditions.pay_name == "支付宝") {
				_this.payConditions.banktype = "ALIPAY";
			} else if(_this.payConditions.pay_name == "微信") {
				_this.payConditions.banktype = "WEIXIN";
			} else {
				_this.payConditions.banktype = "QQ";
			}
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/PayQuick",
				data: {
					paymoney: _this.payCoin,
					method: "payQuick",
//					banktype: _this.payConditions.banktype,
					ordernumber: _this.orderNum,
					account_name: _this.firName,
					payment_mode:_this.payConditions.payment_mode
				},
				success: function(data) {
					if(data.code == 200) {
						_this.payDatas = data;
						_this.state = data.status;
						_this.src = _this.payConditions.QRcode;
					} else {
						layer.msg('充值失败！')
					}

				}
			}
			base.callAuthApi(getUserInfo);
		},
		//银行入款订单提交
		clickBlankPays: function() {
			var _this = this;
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/payBlank",
				data: {
					method: 'payBlank',
					account_name: _this.firName,
					paymoney: _this.payCoin,
					ordernumber: _this.orderNum,
				},
				success: function(data) {
					if(data.code == 200) {
						_this.payBlankDatas = data;
						_this.state = data.status;
					} else {
						layer.msg('充值失败！')
					}

				}
			}
			base.callAuthApi(getUserInfo);
		},
		//在线支付获取订单状态
		clickPaySure: function() {
			var _this = this;
			var getUserInfo = {
				type: "post",
				async: false,
				url: "/authApi/queryPaystate",
				data: {
					orderid: _this.payDatas.ordernumber,
				},
				success: function(data) {
					_this.state = data.status;
				}
			}
			base.callAuthApi(getUserInfo);
		},
		//判断是否能充值
		drawingStatus: function() {
			var _this = this;
			var uname = localStorage.getItem("userName");
			var obj = {
				type: 'post',
				data: {
					"username": uname,
				},
				dataType: 'json',
				url: '/authApi/privacy/getPrivacyStatus',
				success: function(data) {
					if(data.code == 200) {
						if(localStorage.prepaidWithdrawalsStatus == 1) {
							_this.getTime();
							var startTime = localStorage.prepaidWithdrawalsStartTime;
							var endTime = localStorage.prepaidWithdrawalsEndTime;
							startTime = startTime.split(":");
							endTime = endTime.split(":");
							startTime = parseInt(startTime.join(""))
							endTime = parseInt(endTime.join(""))
							time = time.split(":");
							time = parseInt(time.join(""))
							if(time > startTime && time < endTime) {
							} else {
								$("#prompt").html("充值时间为" + startTime + "-" + endTime)
							}
						}
					}
				},
				error: function(msg) {
				}
			}
			base.callAuthApi(obj);
		},
		//获取当前时间
		getTime: function() {
			var date = new Date();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			if(hour < 10) {
				hour = "0" + hour;
			}
			if(minute < 10) {
				minute = "0" + minute;
			}
			if(second < 10) {
				second = "0" + second;
			}
			time = hour + ":" + minute + ":" + second;
		},
		//初始化用户信息
		initUserInfo: function() {
			var userName = localStorage.getItem("userName");
			if(userName) {
//				base.heartbeat(localStorage.getItem("userName"));
				var getUserInfo = {
					type: "post",
					url: "/authApi/AutoLoginGetUserinfoByRedis",
					data: {
						"username": userName
					},
					success: function(data) {
						if(data.code == 200) {
							//冻结资产
							var fCoin = parseFloat(data.body.FCION).toFixed(2);
							//用户姓名
							$("strong.userName").html(data.body.USER_NAME);
							//账号余额
							$("#coin11").html((parseFloat(data.body.COIN)).toFixed(2));
							//最后登录时间
							$("#lastTime").html(data.body.LAST_LOGIN_TIME);
						}
					}
				}
				base.callAuthApi(getUserInfo);
			} else {
				location.href = "/login/login.html";
			}
		},
	},
	watch:{
        //监听页码下拉框的值
        payCoin: function () {
            $(".iconImg .nav").children('.paySuccess').slideUp('slow');
            $(".iconImg .nav").removeClass('navYes');
				},
		show_index:function(){
			
		}

    },
});