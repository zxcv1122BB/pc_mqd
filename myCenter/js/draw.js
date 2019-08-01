$(function() {
	layui.use('layer', function() {
		var layer = layui.layer;
	})
	$("#cash").keyup(function() {
		$(this).val($(this).val().replace(/[^0-9.]/g, ''));
	}).bind("paste", function() { //CTR+V事件处理    
		$(this).val($(this).val().replace(/[^0-9.]/g, ''));
	}).css("ime-mode", "disabled"); //CSS设置输入法不可用    
})
var istrue;
var pc = new Vue({
	el: "#main",
	data: {
		coinpwd: '1', //设置资金密码
		coinpwdAagin: '1', //再次输入设置
		fullName: '', //姓名
		pwd: '', //取款
		coin: '', //余额
		bankName: '', //银行名称
		bankAccount: '', //银行卡号
		bankAddress: '', //开户网点
		isTrue: [],
		config: [],
		selectOpion: [],
		bankListShow: [],
		coinUnit: '元',
		cash: 0,
		agencyType: localStorage.agencyType ? localStorage.agencyType : 2,//用户类型

		userInfoList:'',
			is_wqf: 1,//1-微信  2-qq 3-手机号
			wqf_num:'',
        bankList: ['004 臺灣銀行', '005 土地銀行', '006 合庫商銀', '007 第一銀行', '008 華南銀行', '009 彰化銀行', '011 上海銀行', '012 台北富邦', '013 國泰世華', '016 高雄銀行', '017 兆豐商銀', '018 農業金庫', '021 花旗(台灣)銀行', '025 首都銀行', '039 澳商澳盛銀行(荷蘭銀行)', '040 中華開發', '050 臺灣企銀',' 052 渣打國際商銀(新竹銀行)', '053 台中商銀','054 京城商銀', '075 東亞銀行','072 德意志銀行', '081 永豐銀行','101 大台北銀行','102 華泰銀行','103 臺灣新光商銀','108 陽信銀行','118 板信銀行','147 三信銀行','700 中華郵政','803 聯邦銀行','805 遠東銀行','806 元大銀行','807 永豐銀行','808 玉山銀行','809 凱基銀行(萬泰銀行)','810 星展銀行(寶華商業銀行)','812 台新銀行','814 大眾銀行','815 日盛銀行','816 安泰銀行','822 中國信託']
	},
	created: function() {
		if(localStorage.userType == 2) {
			alert('试玩账号不能提款')
			func();

			function func() {
				window.location.href = '../../index.html'
			}
		}
		this.initUserInfo();
		this.checkPwdBank();
		this.checkStatus();
// 		this.getQueryUserData();
		// this.getUserMsg();
	},
	mounted: function() {

	},
	methods: {
		getQueryUserData () {
			var that=this;
			var obj = {
				type: "POST",
				data: {},
				async: true,
				dataType: 'json',
				url: "/authApi/queryUserData",
				success: function(data) {
					if(data.code==200){
						that.bankList = data.body.bankType;
						this.bankListShow = Object.assign([], this.bankList);
					}else{
						that.bankList = [];
					}
				}

			};

			base.callAuthApi(obj);
		},
		remoteMethod (query) {
	        if (query !== '') {
	          setTimeout(() => {
	            this.bankListShow = this.bankList.filter(item => {
	              return item.itemName.toLowerCase().indexOf(query.toLowerCase()) > -1;
	            });
	          }, 200);
	        } else {
	          this.bankListShow = Object.assign([], this.bankList);
	        }
		},
		getUserMsg:function(){
			var that=this;
			var obj = {
				type: "POST",
				data: {},
				async: true,
				dataType: 'json',
				url: "/authApi/queryUserData",
				success: function(data) {
					if(data.code==200){
						that.userInfoList = data.body;
						// if(data.body.WEIXIN){
						// 	that.is_wqf=1
						// }else if(data.body.QQ){
						// 	that.is_wqf=2
						// }else if(data.body.PHONE_NUMBER){
						// 	that.is_wqf=3
						// }else{
						// 	that.is_wqf=4
						// }
					}else{
						that.userInfoList = "";
					}
				}

			};

			base.callAuthApi(obj);
		},
		checkStatus: function() {
			var _this = this;
			if(localStorage.coinPrivacyStatus == 0) {
				if(localStorage.bankPrivacyStatus == 0) {
					_this.choose_nav(2);
				} else {
					_this.choose_nav(1);
				}
			} else {
				_this.choose_nav(0);
			}
		},
		choose_nav: function(index) {
			var _this = this;
			$('input[type=text]').val('');
			$('input[type=password]').val('');
			$('.prompt').html('');
			$(".liulcheng .liulist").eq(index).addClass("for-cur").siblings().removeClass("for-cur");
			$(".liulcheng .liutext").eq(index).addClass("for-cur").siblings().removeClass("for-cur");
			// $("#navTab #show_1").show().siblings().hide();
			$("#navTab #show_" + index).show().siblings().hide();
		},
		//验证是否已设置资金密码/绑定银行卡
		checkPwdBank: function() {
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
						if(data.body.coinPrivacyStatus) {
							localStorage.coinPrivacyStatus = 0; //已经设置资金密码
						} else {
							localStorage.coinPrivacyStatus = 1; //未设置资金密码
						}
						if(data.body.bankPrivacyStatus) {
							localStorage.bankPrivacyStatus = 0;
						} else {
							localStorage.bankPrivacyStatus = 1;
						}
						_this.isTrue = data.body;
						localStorage.setItem('isTrue', JSON.stringify(_this.isTrue));
					}
				},
				error: function(msg) {}
			};
			base.callAuthApi(obj);
		},
		//取款
		draw: function() {
			var _this = this;
			
			
			if($("#cash").val() != "") {
				_this.cash = $("#cash").val();
			}
			if(_this.cash == "") {
				layer.msg("请输入取款金额")
			} else {
				if(_this.pwd == "") {
					layer.msg("请输入取款密码");
				} else {
					
					// if(!this.wqf_num&&this.is_wqf!=4){
					// 	$(".input_wqf")[0].focus();
					// 	layer.msg("请选择其中一项输入验证");
		
					// 	return
					// }
					// if(this.userInfoList&&this.is_wqf!=4){
					// 	if(this.is_wqf==1){
					// 		if(this.userInfoList.WEIXIN!=this.wqf_num){
					// 			$(".input_wqf")[0].focus();
					// 			layer.msg("微信号验证不相同，请重新确认！")
					// 			return
					// 		}
					// 	}else if(this.is_wqf==2){
					// 		if(this.userInfoList.QQ!=this.wqf_num){
					// 			$(".input_wqf")[0].focus();
					// 			layer.msg("QQ号验证不相同，请重新确认！")
					// 			return
					// 		}
					// 	}else if(this.is_wqf==3){
					// 		if(this.userInfoList.PHONE_NUMBER!=this.wqf_num){
					// 			$(".input_wqf")[0].focus();
					// 			layer.msg("手机号验证不相同，请重新确认！")
					// 			return
					// 		}
					// 	}
					// }else if(!this.userInfoList||(!this.userInfoList.WEIXIN&&!this.userInfoList.QQ&&!this.userInfoList.PHONE_NUMBER)){
					// 	// if(!this.userInfoList){
					// 		layer.msg("个人资料不完整，请前往账号信息完善！")
					// 		return
					// 	// }
					// }


					_this.clickEnchash();
					if(istrue == true) {
						var coinPwd = hex_md5(localStorage.getItem("userName") + _this.pwd);
						var getUserInfo = {
							type: "post",
							url: "/authApi/userOper/drawingOper",
							data: {
								"drawingSum": $("#cash").val(),
								"coinPassWord": coinPwd,
							},
							success: function(data) {
								if(data.code == 200) {
									_this.choose_nav(3);
								} else {
									$(".prompt").html("X " + data.msg)
								}
							}
						}
						base.callAuthApi(getUserInfo);
					}
				}
			}
		},
		//设置资金密码
		addCoinPwd: function(index) {
			var _this = this;
			var username = localStorage.getItem("userName");
			var reg = /^\d{6}$/; //资金密码
			_this.coinpwd = $("#coinpwd").val();
			_this.coinpwdAgain = $("#coinpwdAgain").val();
			if(_this.coinpwd == "") {
				layer.msg("取款密码不能为空！");
				$("#coinpwd").css('background-color', 'peachpuff');
				return;
			} else if(!reg.test(_this.coinpwd)) {
				layer.msg("取款密码为6位数字！");
				$("#coinpwd").css('background-color', 'peachpuff');
				return;
			} else {
				$("#coinpwdAgain").css('background-color', 'white');
				if(_this.coinpwdAgain == "") {
					layer.msg("请确认取款密码！");
					$("#coinpwdAgain").css('background-color', 'peachpuff');
					return;
				} else {
					$("#coinpwdAgain").css('background-color', 'white');
					if(_this.coinpwd != _this.coinpwdAgain) {
						layer.msg("两次输入密码不一致！");
						$("#coinpwdAgain").css('background-color', 'peachpuff');
						return;
					} else {
						$("#coinpwdAgain").css('background-color', 'white');
					}
				}
			}
			var passWord = hex_md5(username + _this.coinpwd);
			var passWordAgain = hex_md5(username + _this.coinpwdAgain);
			var obj = {
				type: 'post',
				data: {
					"username": username,
					"privacyStatus": 2,
					"password1": passWord,
					"password2": passWordAgain,
				},
				dataType: 'json',
				url: '/authApi/privacy/bindPrivacy',
				success: function(data) {
					if(data.code == 200) {
						layer.msg("资金密码设置成功！");
						localStorage.coinPrivacyStatus = 0;
						if(localStorage.bankPrivacyStatus == 0) {
							_this.choose_nav(2);
						} else {
							_this.choose_nav(1);
						}
					} else {}
				},
				error: function(msg) {}
			};
			base.callAuthApi(obj);
		},
		//绑定银行卡
		addBankMes: function(fullName, bankAccount, bankName, bankAddress) {
			$(".prompt").html("");
			var _this = this;
			var uname = localStorage.getItem("userName");
			var fullNamePattern = /^[\u4e00-\u9fa5]*$/; //只能输入中文
			var bankAccountPattern = /\d{13}|\d{19}/; //银行卡号
			var bankNamePattern = /^[\u4e00-\u9fa5]*$/; //银行名字
			bankAccount = bankAccount.replace(/\s/g, '');
			if(fullName == "") {
				$(".prompt").html("姓名不能为空！");
				$("#fullName").css('background-color', 'peachpuff');
				return;
			} else if(!fullNamePattern.test(fullName)) {
				$(".prompt").html("请输入中文姓名！");
				$("#fullName").css('background-color', 'peachpuff');
				return;
			} else {
				$("#fullName").css('background-color', 'white');
				if(bankAccount == "") {
					$(".prompt").html("银行卡号不能为空！");
					$("#bankAccount").css('background-color', 'peachpuff');
					return;
				} else if(!bankAccountPattern.test(bankAccount)) {
					$(".prompt").html("请输入正确的银行卡号！");
					$("#bankAccount").css('background-color', 'peachpuff');
					return;
				} else {
					$("#bankAccount").css('background-color', 'white');
					if(bankName == "") {
						$(".prompt").html("银行名字不能为空！");
						$("#bankName").css('background-color', 'peachpuff');
						return;
					} else if(!bankNamePattern.test(bankName)) {
						$(".prompt").html("请输入正确的银行名字！");
						$("#bankAccount").css('background-color', 'peachpuff');
						return;
					} else {
						$("#bankName").css('background-color', 'white');
						if(bankAddress == "") {
							$(".prompt").html("开户地址不能为空！");
							$("#bankAddress").css('background-color', 'peachpuff');
							return;
						} else {
							$("#bankAddress").css('background-color', 'white');
						}
					}
				}
			}
			var obj = {
				type: 'post',
				data: {
					"username": uname,
					"privacyStatus": 1,
					"fullName": fullName,
					"bankAccount": bankAccount,
					"bankName": bankName,
					"bankAddress": bankAddress
				},
				dataType: 'json',
				url: '/authApi/privacy/bindPrivacy',
				success: function(data) {
					if(data.code == 200) {
						localStorage.bankPrivacyStatus = 0;
						_this.choose_nav(2);
					} else {}
				},
				error: function(msg) {}
			};
			base.callAuthApi(obj);
		},
		//初始化用户信息
		initUserInfo: function() {
			var _this = this;
			_this.pwd = '';
			_this.config = JSON.parse(localStorage.getItem('config'));
			_this.isTrue = JSON.parse(localStorage.getItem('isTrue'));
			_this.coinUnit = _this.config.coinUnit;
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
							var reg = /^(\d{4})(\d*)(\d{4})$/;
							_this.fullName = data.body.NAME
							var coin = parseFloat(data.body.COIN).toFixed(2);
							var fcoin = parseFloat(data.body.FCION).toFixed(2);
							_this.coin = (parseFloat(coin)).toFixed(2);
							if(data.body.BANK_NAME){
								_this.bankName = data.body.BANK_NAME;
							}
							if(data.body.BANK_ACCOUNT){
								_this.bankAccount = data.body.BANK_ACCOUNT
								_this.bankAccount = _this.bankAccount.replace(reg, function(a, b, c, d) {
									return b + c.replace(/\d/g, "*") + d;
								});
							}
							_this.isTrue = JSON.parse(localStorage.getItem("isTrue"));
						}
					}
				}
				base.callAuthApi(getUserInfo);
			} else {
				location.href = "/login/login.html";
			}
		},
		//提款操作
		clickEnchash: function() {
			var _this = this;
			//银行卡
			if(_this.isTrue.bankBlacklistStatus == 1) {
				//提款开关
				if(_this.config.drawingCountLimit) {
					//剩余提款次数
					if(parseInt(_this.config.drawingCountLimit) - parseInt(_this.isTrue.withdrawTimes) > 0) {
						if(_this.config.drawingSumStatus == 1) {
							if(parseFloat(_this.cash) <= parseFloat(_this.config.drawingSumUpperLimit) && parseFloat(_this.cash) >= parseFloat(_this.config.drawingSumlowerLimit)) {
								if(parseFloat(_this.agentCoin) != 0 && parseFloat(_this.agentCoin) >= parseFloat(_this.cash)) {
									if(parseFloat(_this.coin) > 0 && parseFloat(_this.coin) >= parseFloat(_this.cash)) {
										istrue = true;
									} else {
										layer.msg('余额不足')
										istrue = false;
									}
								} else {
									if(parseFloat(_this.isTrue.betsum) >= parseFloat(_this.isTrue.withdrawNeedSum)) {
										//余额
										if(parseFloat(_this.coin) > 0 && parseFloat(_this.coin) >= parseFloat(_this.cash)) {
											istrue = true;
										} else {
											layer.msg('余额不足')
											istrue = false;
										}
									} else if(parseFloat(_this.cash) > parseFloat(_this.agentCoin)) {
										layer.msg('提款所需投注量不足')
										istrue = false;
									} else {
										istrue = true;
									}
								}
							} else {
								layer.msg('提款范围为:' + _this.config.drawingSumlowerLimit + _this.coinUnit + "-" + _this.config.drawingSumUpperLimit + _this.coinUnit)
								istrue = false;
							}
						} else {
							if(parseFloat(_this.agentCoin) != 0 && parseFloat(_this.agentCoin) >= parseFloat(_this.cash)) {
								if(parseFloat(_this.coin) > 0 && parseFloat(_this.coin) >= parseFloat(_this.cash)) {
									istrue = true;
								} else {
									layer.msg('余额不足')
									istrue = false;
								}
							} else {
								if(parseFloat(_this.isTrue.betsum) >= parseFloat(_this.isTrue.withdrawNeedSum)) {
									//余额
									if(parseFloat(_this.coin) > 0 && parseFloat(_this.coin) >= parseFloat(_this.cash)) {
										istrue = true;
									} else {
										layer.msg('余额不足')
										istrue = false;
									}
								} else if(parseFloat(_this.cash) > parseFloat(_this.agentCoin)) {
									layer.msg('提款所需投注量不足')
									istrue = false;
								} else {
									istrue = true;
								}
							}
						}
					} else {
						layer.msg('提款次数已达上限')
						istrue = false;
					}
				} else {
					if(parseFloat(_this.isTrue.betsum) >= parseFloat(_this.isTrue.withdrawNeedSum)) {
						if(parseFloat(_this.coin) > 0 && parseFloat(_this.coin) >= parseFloat(_this.cash)) {
							if(_this.config.drawingSumStatus == 1) {
								if(parseFloat(_this.cash) <= parseFloat(_this.config.drawingSumUpperLimit) && parseFloat(_this.cash) >= parseFloat(_this.config.drawingSumlowerLimit)) {
									istrue = true;
								} else {
									layer.msg('提款范围为:' + _this.config.drawingSumlowerLimit + _this.coinUnit + "-" + _this.config.drawingSumUpperLimit + _this.coinUnit)
									istrue = false;
								}
							} else {
								istrue = true;
							}
						} else {
							layer.msg('余额不足')
							istrue = false;
						}
					} else {
						layer.msg('提款所需投注量不足')
						istrue = false;
					}
				}
			} else {
				layer.msg('银行卡已进入黑名单')
				istrue = false;
			}
//			if(_this.isTrue.bankBlacklistStatus == 1) {
//				if(_this.config.drawingCountLimit) {
//					if(parseInt(_this.config.drawingCountLimit) - parseInt(_this.isTrue.withdrawTimes) > 0) {
//						if(parseFloat(_this.isTrue.betsum) >= parseFloat(_this.isTrue.withdrawNeedSum)) {
//							if(parseFloat(_this.coin) > 0 && parseFloat(_this.coin) >= parseFloat(_this.cash)) {
//								if(_this.config.drawingSumStatus == 1) {
//									if(parseFloat(_this.cash) <= parseFloat(_this.config.drawingSumUpperLimit) && parseFloat(_this.cash) >= parseFloat(_this.config.drawingSumlowerLimit)) {
//										istrue = true;
//									} else {
//										layer.msg('提款范围为:' + _this.config.drawingSumlowerLimit + "元-" + _this.config.drawingSumUpperLimit + "元")
//										istrue = false;
//									}
//								} else {
//									istrue = true;
//								}
//							} else {
//								layer.msg('余额不足')
//								istrue = false;
//							}
//						} else {
//							layer.msg('提款所需投注量不足')
//							istrue = false;
//						}
//					} else {
//						layer.msg('提款次数已达上限')
//						istrue = false;
//					}
//				} else {
//					if(parseFloat(_this.isTrue.betsum) >= parseFloat(_this.isTrue.withdrawNeedSum)) {
//						if(parseFloat(_this.balanceNow) > 0 && parseFloat(_this.balanceNow) >= parseFloat(_this.cash)) {
//							if(_this.config.drawingSumStatus == 1) {
//								if(parseFloat(_this.cash) <= parseFloat(_this.config.drawingSumUpperLimit) && parseFloat(_this.cash) >= parseFloat(_this.config.drawingSumlowerLimit)) {
//									istrue = true;
//								} else {
//									layer.msg('提款范围为:' + _this.config.drawingSumlowerLimit + "元-" + _this.config.drawingSumUpperLimit)
//									istrue = false;
//								}
//							} else {
//								istrue = true;
//							}
//						} else {
//							layer.msg('余额不足')
//							istrue = false;
//						}
//					} else {
//						layer.msg('提款所需投注量不足')
//						istrue = false;
//					}
//				}
//			} else {
//				layer.msg('银行卡已进入黑名单')
//				istrue = false;
//			}
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
	},
});