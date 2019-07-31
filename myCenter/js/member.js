var vm = new Vue({
	el: '#mainBody',
	data: {
		checkNameResult: false, //校验名字的结果
		checkPassword: false, //校验密码的结果
		verifyCode: false, //校验验证码的结果
		userUnRead: '0', //用户未读取信息
		isTrue: [],
		config:[],
		caipiao:[],
		vipLevel:[],   //vip等级
		arrs:[],    //最新投注
		coinUnit:'元',
		agencyType: localStorage.agencyType ? localStorage.agencyType : 2,//用户类型
		ticketDetailsStr:[],//
		ticketDetailsList:[],//出票明细
		orders: [], //订单详情
		ordersById: [], //投注详情
		ordersTwo: [],
		pages:1,
		nowType:0,
		layer:''
	},

	created: function() {
		this.getlayer();
		this.initUserInfo();
		this.checkPwdBank();
		this.getUserUnReadInfo();
		this.get_ConfigureResult();
		this.getCaipiao();
		this.get_vipLevel();
		this.getdatas();
		if(localStorage.userType==2){
			$(".registerFree").hide();
		}

		this.getGameRebatesList();
	},
	mounted: function() {

	},
	methods: {
		//获取玩法返点列表
		getGameRebatesList: function () {
			var _this = this;
			if (!localStorage.userName) {
				return
			}
			if (localStorage.szcRebateList){
				var szc=JSON.parse(localStorage.szcRebateList)
				if(szc[0].nowRebate){
					return
				}
			}
			// ssc#8.0@k3#8.5@11x5#7.5@3D#7.5@PK10#8.0@hk6#10.0
			var strList = localStorage.gameRebatesList, objList = {}, _this = this;
			strList = strList.split("@");
			strList.map(function (item) {
				var list = item.split("#");
				objList[list[0]] = list[1];
			});
			var _this = this,
				obj = {
					type: "post",
					url: "/authApi/proxy/getRebateConfigList",
					data: {},
					success: function (data) {
						if (data.code == 200) {
							// _this.maxRebatesList=data.body;
							data.body.map(function (item) {
								item.nowRebate = objList[item.code];
							})
							localStorage.szcRebateList = JSON.stringify(data.body)
						}
					},
					error: function (msg) {
						//console.log(msg)
					},
				};
			base.callAuthApi(obj);
		},
		getlayer() {
			var _this=this;
            layui.use('layer', function () {
				_this.layer = layui.layer;
			})
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
		//查询投注记录
		getdatas: function(num) {
// 			var index= this.layer.load(2);
			var _this = this;
			var uname = localStorage.getItem("userName");
			var data = {
				'pageIndex': 1,
                'pageNum': 10,
//              'pageSize': 5,
                
                
				'username': uname,
								
			};
				var obj = {
					type: 'post',
					data: data,
					dataType: 'json',
					url: '/authApi/bets/getBettingInfoList',
					success: function(data) {
window.parent.layer.closeAll();
						if(data.code == 200) {
							_this.arrs = data.body.list;
							for(var i=0;i<_this.arrs.length;i++)
							{
								if(_this.arrs[i].status==0){
									_this.arrs[i].status='未中奖'
								}else if(_this.arrs[i].status==1){
									_this.arrs[i].status='已中奖'
								}else if(_this.arrs[i].status==2){
									_this.arrs[i].status='已撤单'
								}else{
									_this.arrs[i].status='成功'
								}
							}
	                        $("#showBetRecord").show();
	                        $("#betResultOrder").hide();
						}else{
							$("#betResultOrder").show();
							$("#showBetRecord").hide();
						}
                        // window.parent.layer.closeAll(index);
					},
					error: function(msg) {
window.parent.layer.closeAll();
					}
				};

				base.callAuthApi(obj);
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
						//                      if (data.body.perfectMarker == 1) {
						//                          $("#isUserInfo").hide();
						//                      } else {
						//                          $("#isUserInfo").show();
						//                      }
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
				error: function(msg) {
				}
			};
			base.callAuthApi(obj);
		},
		getdatasMes: function(id) {
			var _this = this;
			var data = {
				'betId': id,
				'pageIndex': _this.pages,
				'pageNum': 5,
			};
			var _this = this;
			var obj = {
				type: 'post',
				data: data,
				dataType: 'json',
				url: '/authApi/bets/getTicketDetailsList',
				success: function(data) {
					//console.log(data);
					if(data.code == 200) {
						_this.totalPages = data.body.pageSize;
						_this.ticketDetailsList = data.body.list;
					} else {}
				},
				error: function(msg) {
					//console.log(msg);
				}
			}
			base.callAuthApi(obj);
		},
		selectHH: function(id, type) {
			if(type < 5) {
				this.selectByOrderId(id);
			} else {
				this.selectOrders(id);
			}
		},
		//查询订单详情
		selectByOrderId: function(id) {
			var index= this.layer.load(2);
			var _this = this;
			var data = {
				betId: id,
				outOfThrity: _this.outOfThrity,
			};
			var obj = {
				type: 'post',
				data: data,
				dataType: 'json',
				url: '/authApi/bets/queryBettingInfo',
				success: function(data) {
					window.parent.layer.closeAll();
					if(data.code == 200) {

						window.parent.layui.use('layer', function() {
							var layer = window.parent.layui.layer;
							layer.open({
								title: '查看订单详情',
								type: 1,
								content: $('.ordersOne'),
								area: ['600px', '600px'],
								btn: ['关闭'],
								yes: function(index, layero) {
									layer.closeAll('page');
								}

							})
						})
						_this.orders = data.body;
						_this.ordersById = data.body.list
						//投注状态
						for(var i = 0; i < _this.orders.length; i++) {
							if(_this.orders[i].status == 0) {
								_this.orders[i].status = '未中奖'
							} else if(_this.orders[i].status == 1) {
								_this.orders[i].status = '中奖'
							} else if(_this.orders[i].status == 2) {
								_this.orders[i].status = '已撤单'
							} else {
								_this.orders[i].status = '成功'
							}
						}
						//投注赛果
						if(_this.ordersById && _this.ordersById.length > 0) {
							for(var i = 0; i < _this.ordersById.length; i++) {
								if(_this.ordersById[i].matchResult == 0) {
									_this.ordersById[i].matchResult = '负'
								} else if(_this.ordersById[i].matchResult == 1) {
									_this.ordersById[i].matchResult = '平'
								} else {
									_this.ordersById[i].matchResult = '胜'
								}
							}
						}

					} else {

						layer.msg('暂无数据');
					}
					layer.close(index);
				},
				error: function(msg) {
					window.parent.layer.closeAll();
				}
			};
			base.callAuthApi(obj);
		},
		//数据加载
		selectOrders: function(id) {
			var _this = this;
			var obj = {
				type: 'post',
				data: {
					'betId': id,
					'outOfThrity': _this.outOfThrity,
				},
				dataType: 'json',
				url: '/authApi/bets/getNumbersLotteryDetails',
				success: function(data) {
					if(data.code == 200) {
						_this.ordersTwo = data.body;
						window.parent.layui.use('layer', function() {
							var layer = window.parent.layui.layer;
							layer.open({
								title: '查看订单详情',
								type: 1,
								content: $('.ordersTwo'),
								area: ['600px', '500px'],
								btn: ['关闭'],
								yes: function(index, layero) {
									layer.closeAll('page');
								}

							})
						})
					} else {
						return false
					}
				},
				error: function(msg) {
				}
			}
			base.callAuthApi(obj);
		},
		getTicket: function(betId,typeId) {
			var _this = this;
			window.parent.layui.use('layer', function() {
				var layer = window.parent.layui.layer;
				layer.open({
					title: '查看出票明细',
					type: 1,
					content: $('.ticket'),
					area: ['600px','500px'],
					btn: ['关闭'],
					yes: function(index, layero) {
						layer.closeAll('page');
					}

				})
			})
			_this.nowType = typeId;
			if(typeId == 2) {
				_this.ticketDetailsStr = _this.orders.ticketDetailsStr;
			} else {
				_this.getdatasMes(betId);
			}
		},
		//获取今日投注统计详情
		getCaipiao: function() {
			var _this = this,
				privacy = {
					type: "post",
					data: {},
					url: "/authApi/countSumByUid",
					success: function(data) {
						_this.caipiao = data.body;
						_this.caipiao.TodayBetSum = parseFloat(_this.caipiao.TodayBetSum).toFixed(2);
						_this.caipiao.TodayBonusSum = parseFloat(_this.caipiao.TodayBonusSum).toFixed(2);
						_this.caipiao.TodaywinLost = parseFloat(_this.caipiao.TodayBonusSum-_this.caipiao.TodayBetSum).toFixed(2);
					}
				};
			base.callAuthApi(privacy);
		},
		toPercent:function(point){
            var str = Number(point * 100).toFixed(1);
            str += "%";
            return str;
        },
		//获取vip等级
		get_vipLevel: function() {
			var _this = this,
				privacy = { 
					type: "post",
					data: {},
					url: "/authApi/getUserVipInfo",
					success: function(data) {
						_this.vipLevel = data.body;
						_this.vipLevel.remain =  parseFloat(_this.vipLevel.nextDepositAmount-_this.vipLevel.chargedAmount).toFixed(2);
						_this.percent = _this.toPercent(parseFloat(_this.vipLevel.chargedAmount)/parseFloat(_this.vipLevel.nextDepositAmount));
						if(parseFloat(_this.percent/100)>1){
							$(".level_progress_bar").css('width',_this.toPercent(1))
						}else{
							$(".level_progress_bar").css('width',_this.percent);
						}
					}
				};
			base.callAuthApi(privacy);
		},
		//获取系统配置
		get_ConfigureResult: function() {
			var _this = this,
				privacy = {
					type: "post",
					data: {},
					url: "/commonAPI/privacy/getSysConfigureResult",
					success: function(data) {
						_this.config = data.body;
						_this.coinUnit = _this.config.coinUnit;
						localStorage.setItem('config', JSON.stringify(_this.config));
					}
				};
			base.callCommonApi(privacy);
		},
		// 获取用户未读信息
		getUserUnReadInfo: function() {
			let _this = this
			var userName = localStorage.getItem("userName");
			var obj = {
				type: 'post',
				data: {
					username: userName
				},
				dataType: 'json',
				url: '/authApi/msg/getUserMessageNum',
				success: function(data) {
					if(data.code == 200) {
						sessionStorage.setItem("userUnRead", data.body);
						_this.userUnRead = data.body;
					}
				},
				error: function(msg) {
				}
			};
			base.callAuthApi(obj);
		},
	}
});
