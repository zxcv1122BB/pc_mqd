var pc = new Vue({
	el: "#main",
	data: {
		allTypeContent: [{gameId: '', gameName: "所有彩种"}],
		allStateContent: ["所有状态", "未中奖", "已中奖", "已撤单", "未开奖"],
		changeDateContent: ["近7天", "今天", "昨天", "本周", "上周", "7天之前"],
		startTime: "",
		endTime: "",
		type: "",
		state: "",
		dateContent: "近7天",
		stateContent: "所有状态",
		typeContent: "所有彩种",
		outOfThrity: "",
		page_num: 11,
		totalPage: '',
		arrs: [], //订单记录
		orders: [], //订单详情
		ordersById: [], //投注详情
		ordersTwo: [],
		ticketDetailsStr:[],//
		ticketDetailsList:[],//出票明细
		coinUnit: '元',
		types:[],
		pages:1,
		nowType:0,
		agencyType: localStorage.agencyType ? localStorage.agencyType : 2//用户类型
	},
	created: function() {
		this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
		this.$nextTick(function() {
			this.getlayer();
		});
		this.initUserInfo();
		this.selectTime(0); //默认查询近30天
		this.getTypes();
		if(localStorage.userType==2){
			$(".registerFree").hide();
		}
	},
	methods: {
		getlayer() {
			layui.use('layer', function() {
				var layer = layui.layer;
			})
		},
		//select设置----触发元素事件
		openType: function(e, index) {
			var e = e.currentTarget,
				_this = this;
			if ($(e).is(".isClick")) {
				return
			}
			$(e).addClass("isClick");
			switch(index) {
				case 1:
					$(e).next().toggle('hide');
					break;
				case 2:
					$(e).next().show();
					break;
				case 3:
					$(e).next().hide();
					break;
			}
			setTimeout(function () {
				$(e).removeClass("isClick");
			}, 1000)
		},
		//select设置----显示元素事件
		hoverTypeUl: function(e, index) {
			var e = e.currentTarget,
				_this = this;
			switch(index) {
				case 1:
					$(e).show();
					break;
				case 2:
					$(e).hide();
					break;
			}

		},
		getTypes: function () {
            var _this = this;
            var obj = {
                type: 'post',
                data: {},
                async:false,
                dataType: 'json',
                url: '/authApi/bets/queryGameType',
                success: function (data) {
                    if (data.code == 200) {
                        //取到后台传递多来的Body
                        for(var i=0;i<data.body.length;i++){
                        	_this.allTypeContent.push(data.body[i]);
                        }
                    }
                },
                error: function (msg) {
                }
            };
            base.callAuthApi(obj);
        },
		//select设置-----选项事件设置
		getCondition: function(type, index, e ,id) {
			var _this = this;
			e = e.currentTarget;
			$(e).parent().hide();
			switch(type) {
				case 0:
					if(index == 0) {
						_this.type = "";
					} else {
						_this.type = id;
					}
					_this.typeContent = _this.allTypeContent[index].gameName;
					_this.getdatas(1)
					break;
				case 1:
					if(index == 0) {
						_this.state = "";
					} else {
						_this.state = (index - 1);
					}
					if(_this.state == 2) {
						_this.choose_nav(1);
					} else {
						_this.choose_nav(0, 0);
					}
					_this.stateContent = _this.allStateContent[index];
					_this.getdatas(1)
					break;
				case 2:
					_this.dateTime = index;
					_this.dateContent = _this.changeDateContent[index];
					_this.selectTime(index);
					_this.getdatas(1);
					break;
				default:
					break;
			}
		},
		choose_nav: function(index, id) {
			var _this = this;
			var index = index;
			$(".topNav #choose_" + index).addClass("active").siblings().removeClass("active");
			if(index == 1) {
				_this.stateContent = _this.allStateContent[3];
				_this.state = 2;
				_this.getdatas(1);
			} else {
				if(id == 0) {
					_this.stateContent = _this.allStateContent[_this.state + 1];
					_this.state = _this.state;
					_this.getdatas(1);
				} else {
					_this.stateContent = _this.allStateContent[0];
					_this.state = "";
					_this.getdatas(1);
				}
			}
		},
		//查询投注记录--查询按钮点击事件
		getdatas: function(num) {
			var index;
			layui.use('layer', function() {
				var layer = layui.layer;
				index = layer.load(2, {time: 2*1000});
			})
			var _this = this;
			var uname = localStorage.getItem("userName");
			var data = {
				'pageIndex': num,
				'pageNum': this.page_num,
				//              'pageSize': 5,

				'username': uname,
				'status': _this.state,
				'outOfThrity': _this.outOfThrity,
				'startTime': this.startTime ? this.startTime : $("#startTime").val(),
				'endTime': this.endTime ? this.endTime : $("#endTime").val(),
				'type': this.type

			};
			var obj = {
				type: 'post',
				data: data,
				dataType: 'json',
				url: '/authApi/bets/getBettingInfoList',
				success: function(data) {
					if(data.code == 200) {
						_this.arrs = data.body.list;
						for(var i = 0; i < _this.arrs.length; i++) {
							if(_this.arrs[i].status == 0) {
								_this.arrs[i].status = '未中奖'
							} else if(_this.arrs[i].status == 1) {
								_this.arrs[i].status = '已中奖'
							} else if(_this.arrs[i].status == 2) {
								_this.arrs[i].status = '已撤单'
							} else {
								_this.arrs[i].status = '成功'
							}
						}
						//分页的(右边点击)
						if(data.body.list.length > 0) {
							$('#fenye').jqPaginator('option', {
								totalPages: data.body.pageSize, //返回总页数
								currentPage: num
							});
						} else {
							$('#fenye').jqPaginator('option', {
								totalPages: 1,
								currentPage: 1
							});
						}
						$("#showBetRecord").show();
						$("#betResultOrder").hide();
					} else {
						$('#fenye').jqPaginator('option', {
							totalPages: 1,
							currentPage: 1
						});
						$("#betResultOrder").show();
						$("#showBetRecord").hide();
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
				'pageNum': 5
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
			var index;
			layui.use('layer', function() {
				var layer = layui.layer;
				index = layer.load(2, {time: 2*1000});
			})
			var _this = this;
			var data = {
				betId: id,
				outOfThrity: _this.outOfThrity
			};
			var obj = {
				type: 'post',
				data: data,
				dataType: 'json',
				url: '/authApi/bets/queryBettingInfo',
				success: function(data) {

					if(data.code == 200) {

						layui.use('layer', function() {
							var layer = layui.layer;
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
					'outOfThrity': _this.outOfThrity
				},
				dataType: 'json',
				url: '/authApi/bets/getNumbersLotteryDetails',
				success: function(data) {
					if(data.code == 200) {
						_this.ordersTwo = data.body;
						layui.use('layer', function() {
							var layer = layui.layer;
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
			layui.use('layer', function() {
				var layer = layui.layer;
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
		selectTime: function(index) {
			var s1, s2, dateTime = new Date();
			switch(index) {
				case 0:
					this.startTime = "";
					this.endTime = "";
					this.outOfThrity = 0;
					break;
				case 1: //今天
					dateTime.setTime(dateTime.getTime());
					s2 = dateTime.getFullYear() + "-" + this.getzf(dateTime.getMonth() + 1) + "-" + this.getzf(dateTime.getDate());
					this.startTime = s2 + " " + "00:00:00";
					this.endTime = s2 + " " + "23:59:59";
					this.outOfThrity = 0;
					break;
				case 2: //昨天
					dateTime.setTime(dateTime.getTime() - 24 * 60 * 60 * 1000);
					s1 = dateTime.getFullYear() + "-" + this.getzf(dateTime.getMonth() + 1) + "-" + this.getzf(dateTime.getDate());
					this.startTime = s1 + " " + "00:00:00";
					this.endTime = s1 + " " + "23:59:59";
					this.outOfThrity = 0;
					break;
				case 3: //本周
					st = this.getDateTime(0);
					et = dateTime.getFullYear() + "-" + this.getzf(dateTime.getMonth() + 1) + "-" + this.getzf(dateTime.getDate());
					this.startTime = st + " " + "00:00:00";
					this.endTime = et + " " + "23:59:59";
					this.outOfThrity = 0;
					break;
				case 4: //上周
					st = this.getDateTime(2);
					et = this.getDateTime(3);
					this.startTime = st + " " + "00:00:00";
					this.endTime = et + " " + "23:59:59";
					this.outOfThrity = 0;
					break;
				case 5: //上月
					this.startTime = "";
					this.endTime = "";
					this.outOfThrity = 1;
					break;
				default:
					break;
			}

		},

		//日期设置
		getDateTime: function(index) {
			var now = new Date(); //当前日期
			var nowDayOfWeek = now.getDay(); //今天本周的第几天
			var nowDay = now.getDate(); //当前日
			var nowMonth = now.getMonth(); //当前月
			var nowYear = now.getYear(); //当前年
			nowYear += (nowYear < 2000) ? 1900 : 0; //
			var lastMonthDate = new Date(); //上月日期
			lastMonthDate.setDate(1);
			lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
			var lastYear = lastMonthDate.getYear();
			var lastMonth = lastMonthDate.getMonth();
			//格式化日期：yyyy-MM-dd
			function formatDate(date) {
				var myyear = date.getFullYear();
				var mymonth = date.getMonth() + 1;
				var myweekday = date.getDate();
				if(mymonth < 10) {
					mymonth = "0" + mymonth;
				}
				if(myweekday < 10) {
					myweekday = "0" + myweekday;
				}
				return(myyear + "-" + mymonth + "-" + myweekday);
			}

			//获得某月的天数
			function getMonthDays(myMonth) {
				var monthStartDate = new Date(nowYear, myMonth, 1);
				var monthEndDate = new Date(nowYear, myMonth + 1, 1);
				var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
				return days;
			}

			//获得本季度的开始月份
			function getQuarterStartMonth() {
				var quarterStartMonth = 0;
				if(nowMonth < 3) {
					quarterStartMonth = 0;
				}
				if(2 < nowMonth && nowMonth < 6) {
					quarterStartMonth = 3;
				}
				if(5 < nowMonth && nowMonth < 9) {
					quarterStartMonth = 6;
				}
				if(nowMonth > 8) {
					quarterStartMonth = 9;
				}
				return quarterStartMonth;
			}

			//获得本周的开始日期
			function getWeekStartDate() {
				var weekStartDate = new Date(nowYear, nowMonth, nowDay + 1 - nowDayOfWeek);
				return formatDate(weekStartDate);
			}

			//获得本周的结束日期
			function getWeekEndDate() {
				var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
				return formatDate(weekEndDate);
			}

			//获得上周的开始日期
			function getLastWeekStartDate() {
				var weekStartDate = new Date(nowYear, nowMonth, nowDay + 1 - nowDayOfWeek - 7);
				return formatDate(weekStartDate);
			}

			//获得上周的结束日期
			function getLastWeekEndDate() {
				var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
				return formatDate(weekEndDate);
			}

			//获得本月的开始日期
			function getMonthStartDate() {
				var monthStartDate = new Date(nowYear, nowMonth, 1);
				return formatDate(monthStartDate);
			}

			//获得本月的结束日期
			function getMonthEndDate() {
				var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
				return formatDate(monthEndDate);
			}

			//获得上月开始时间
			function getLastMonthStartDate() {
				var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
				return formatDate(lastMonthStartDate);
			}

			//获得上月结束时间
			function getLastMonthEndDate() {
				var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
				return formatDate(lastMonthEndDate);
			}

			//获得本季度的开始日期
			function getQuarterStartDate() {
				var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
				return formatDate(quarterStartDate);
			}

			//或的本季度的结束日期
			function getQuarterEndDate() {
				var quarterEndMonth = getQuarterStartMonth() + 2;
				var quarterStartDate = new Date(nowYear, quarterEndMonth,
					getMonthDays(quarterEndMonth));
				return formatDate(quarterStartDate);
			}

			if(index == 0) {
				var k = getWeekStartDate();
				return k
			} else if(index == 1) {
				var k = getWeekEndDate();
				return k
			} else if(index == 2) {
				var k = getLastWeekStartDate();
				return k
			} else if(index == 3) {
				var k = getLastWeekEndDate();
				return k
			} else if(index == 4) {
				var k = getMonthStartDate();
				return k
			} else if(index == 5) {
				var k = getMonthEndDate();
				return k
			} else if(index == 6) {
				var k = getLastMonthStartDate();
				return k
			} else if(index == 7) {
				var k = getLastMonthEndDate();
				return k
			}
		},
		//补0
		getzf: function(num) {
			if(parseInt(num) < 10) {
				num = '0' + num;
			}
			return num;
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
							var coin = parseFloat(data.body.COIN).toFixed(2);
							var fCoin = parseFloat(data.body.FCION).toFixed(2);
							$("strong.userName").html(data.body.USER_NAME);
							$("#coin11").html(coin);
							$("#lastTime").html(data.body.LAST_LOGIN_TIME);
						}
					}
				}
				base.callAuthApi(getUserInfo);
			} else {
				location.href = "/login/login.html";
			}
		},
		checkdate: function(start, end) {
			//得到日期值并转化成日期格式，replace(//-/g, "//")是根据验证表达式把日期转化成长日期格式，这样
			//再进行判断就好判断了
			var sDate = new Date(start.replace(/\-/g, "\/"));
			var eDate = new Date(end.replace(/\-/g, "\/"));
			if(sDate > eDate) {
				layer.msg("结束时间不能早于起始时间")
				return false;
			}
			return true;
		}
	},
	watch: {
		//监听页码下拉框的值
		page_num: function() {
			this.getdatas(1);
		}
	},
	beforeDestroy: function() {
		document.removeEventListener('keyup');
	}
});

// 加载分页功能
$.jqPaginator('#fenye', {
	totalPages: 1, //多少页数据
	visiblePages: 10, //最多显示几页
	currentPage: 1, //当前页
	wrapper: '<ul class="pagination"></ul>',
	first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
	prev: '<li class="prev"><a href="javascript:void(0);">上一页</a></li>',
	next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
	last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
	page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',

	onPageChange: function(num, type) {
		pc.getdatas(num);
	}
});