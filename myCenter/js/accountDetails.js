

$(function(){
	layui.use('layer',function () {
		var layer = layui.layer;
	})
})
			


var show_index=1;

var pc = new Vue({
	el: "#main",
	data: {
		// allTypeContent: ["所有类型","在线存款", "快速入款","一般存款"],
		allTypeContent: ["所有类型","在线存款"],
		allStateContent: ["所有状态", "处理中", "处理成功", "处理失败"],
		changeDateContent: ["近7天","今天", "昨天", "本周", "上周", "7天之前"],
		startTime:"",
		endTime:"",
		type:'',
		state:'',
//		tradeState:"",
//		tradeType:"",
		dateContent: "近7天",
		stateContent:"所有状态",
		typeContent: "所有类型",
		outOfThrity:"",
		page_num:5,
		totalPage:'',
		arrs:[],  //订单记录
		orders:[],  //订单详情
		datas:[],
		drawDatas:[],
		ordersById:[], //投注详情
		coinAvg:[],   //充值取款总额
		input_id:'', //订单号
		coinUnit:'元',
		agencyType: localStorage.agencyType ? localStorage.agencyType:2,//用户类型
		ordersTwo :{}
	},
	created: function() {
		this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
		this.initUserInfo();
		this.selectTime(0);  //默认查询今天
		this.getCoinAvg();
		if(localStorage.userType==2){
			$(".registerFree").hide();
		}
	},
	mounted: function() {

	},
	methods: {
		//select设置----触发元素事件
		openType: function(e, index) {
			var e = e.currentTarget,
				_this = this;
				if($(e).is(".isClick")){
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
			setTimeout(function(){
				$(e).removeClass("isClick");
			},1000)
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
		//select设置-----选项事件设置
		getCondition: function(type, index,e,id) {
			var _this=this;
			e = e.currentTarget;
			$(e).parent().hide();
			switch(type) {
				case 0:
					if(index==0){
						_this.type="";
					}else{
						_this.type=index;
					}
					_this.typeContent=_this.allTypeContent[index];
//					_this.getdatas(1)
					break;
				case 1:
					if(index==0){
						_this.state="";
					}else{
						_this.state=index;
					}
					_this.stateContent=_this.allStateContent[index];
//					_this.getdatas(1)
					break;
				case 2:
					_this.dateTime=index;
					_this.dateContent=_this.changeDateContent[index];
					_this.selectTime(index);
//					_this.getdatas(1)
					break;
				default:
					break;
			}
		},
		choose_nav:function(index){
			var _this=this;
			$(".topNav #choose_"+index).addClass("active").siblings().removeClass("active");
			$("#record #show_"+index).show().siblings().hide();
			if(index==0){
				_this.getdatas(1);
				show_index = 1;
			}else if(index==1){
				_this.getDrawdatas(1);
				show_index = 2;
			}else{
				_this.getchangedatas(1);
				show_index = 3;
			}
			
		},
		//查询充值、取款总额
		getCoinAvg: function() {
			var _this = this;
			var obj = {
				type: 'post',
				data: {},
				dataType: 'json',
				url: '/authApi/countByUid',
				success: function(data) {
					if(data.code == 200) {
						_this.coinAvg = data.body;
					}
				},
				error: function(msg) {
				}
			};
			base.callAuthApi(obj);
		},
		//查询充值记录--查询按钮点击事件
		getdatas: function(num) {
			var index;
			layui.use('layer', function() {
				var layer = layui.layer;
				index = layer.load(2, {time: 5*1000});
			})
			var _this = this;
			var uname = localStorage.getItem("userName");
			var data = {
				'pageIndex': num,
                'pageNum': this.page_num,
//              'pageSize': 5,
                
                
				'username': uname,
				'outOfThrity': _this.outOfThrity,
				'startTime': this.startTime?this.startTime:$("#startTime").val(),
				'endTime': this.endTime?this.endTime:$("#endTime").val(),
				'tradeType': _this.type,
				'state':_this.state
				
			};
				var obj = {
					type: 'post',
					data: data,
					dataType: 'json',
					url: '/authApi/bets/getMemberDepositRecord',
					success: function(data) {
						if(data.code == 200) {
							_this.arrs = data.body.list;
							for(var i=0;i<_this.arrs.length;i++)
							{
								if(_this.arrs[i].status==0){
									_this.arrs[i].status='未中奖'
								}else if(_this.arrs[i].status==1){
									_this.arrs[i].status='中奖'
								}else if(_this.arrs[i].status==2){
									_this.arrs[i].status='已撤单'
								}else{
									_this.arrs[i].status='成功'
								}
							}
							//分页的(右边点击)
							if(data.body.list.length>0){
	                            $('#fenye').jqPaginator('option', {
	                                totalPages: data.body.pageSize,    //返回总页数
	                                currentPage: num
	                            });
	                        }else {
	                            $('#fenye').jqPaginator('option', {
	                                totalPages: 1,
	                                currentPage: 1
	                            });
	                        }
	                        $("#show_0 .showBetRecord").show();
	                        $("#show_0 .betResultOrder").hide();
						}else{
							$('#fenye').jqPaginator('option', {
	                                totalPages: 1,
	                                currentPage: 1
	                            });
							$("#show_0 .betResultOrder").show();
							$("#show_0 .showBetRecord").hide();
						}
						layer.close(index);

					},
					error: function(msg) {
					}
				};
				base.callAuthApi(obj);
		},
		//查询取款记录--查询按钮点击事件
		getDrawdatas: function(num) {
			var index;
			layui.use('layer', function() {
				var layer = layui.layer;
				index = layer.load(2, {time: 5*1000});
			})
			var _this = this;
			var uname = localStorage.getItem("userName");
			var data = {
				'pageIndex': num,
                'pageNum': this.page_num,
//              'pageSize': 5,
                
				'username': uname,
				'outOfThrity': _this.outOfThrity,
				'startTime': this.startTime?this.startTime:$("#startTime").val(),
				'endTime': this.endTime?this.endTime:$("#endTime").val(),
				'state': _this.state
				
			};
				var obj = {
					type: 'post',
					data: data,
					dataType: 'json',
					url:'/authApi/bets/getMemberWithdrawRecord',
					success: function(data) {
						if(data.code == 200) {
							_this.drawDatas = data.body.list;
								//分页的(右边点击)
	                        if(data.body.list.length>0){
	                            $('#fenye').jqPaginator('option', {
	                                totalPages: data.body.pageSize,    //返回总页数
	                                currentPage: num
	                            });
	                        }else {
	                            $('#fenye').jqPaginator('option', {
	                                totalPages: 1,
	                                currentPage: 1
	                            });
	                        }
	                        $("#show_1 .showBetRecord").show();
	                        $("#show_1 .betResultOrder").hide();
						}else{
							$('#fenye').jqPaginator('option', {
	                                totalPages: 1,
	                                currentPage: 1
	                            });
							$("#show_1 .betResultOrder").show();
							$("#show_1 .showBetRecord").hide();
						}
						layer.close(index);
					},
					error: function(msg) {
					}
				};
				base.callAuthApi(obj);
		},
		//查询账变记录--查询按钮点击事件
		getchangedatas: function(num) {
			var index;
			layui.use('layer', function() {
				var layer = layui.layer;
				index = layer.load(2, {time: 5*1000});
			})
			var _this = this;
			var uname = localStorage.getItem("userName");
			var data = {
				'pageIndex': num,
                'pageNum': this.page_num,
//              'pageSize': 5,
                
				'username': uname,
				'outOfThrity': _this.outOfThrity,
				'startTime': _this.startTime?_this.startTime:$("#startTime").val(),
				'endTime': _this.endTime?_this.endTime:$("#endTime").val(),
				'coinOperateType': "",
				'orderId':_this.input_id
				
			};
				var obj = {
					type: 'post',
					data: data,
					dataType: 'json',
					url: '/authApi/bets/getFundDetailsList',
					success: function(data) {
						if(data.code == 200) {
							_this.datas = data.body.list;
							//判断交易类型
							for(var i = 0; i < _this.datas.length; i++) {
								_this.datas[i].coin = parseFloat(_this.datas[i].coin).toFixed(2);
								if(_this.datas[i].coinOperateType == 1) {
									_this.datas[i].coinOperateType = "充值";
								} else if(_this.datas[i].coinOperateType == 2) {
									_this.datas[i].coinOperateType = "提现";
								} else if(_this.datas[i].coinOperateType == 3) {
									_this.datas[i].coinOperateType = "投注";
								} else if(_this.datas[i].coinOperateType == 4) {
									_this.datas[i].coinOperateType = "注册赠送";
								} else if(_this.datas[i].coinOperateType == 5) {
									_this.datas[i].coinOperateType = "抢红包";
								} else if(_this.datas[i].coinOperateType == 6) {
									_this.datas[i].coinOperateType = "人工增加";
								} else if(_this.datas[i].coinOperateType == 7) {
									_this.datas[i].coinOperateType = "人工扣除";
								} else if(_this.datas[i].coinOperateType == 8) {
									_this.datas[i].coinOperateType = "反水";
								} else if(_this.datas[i].coinOperateType == 9) {
									_this.datas[i].coinOperateType = "派奖";
								} else if(_this.datas[i].coinOperateType == 10) {
									_this.datas[i].coinOperateType = "充值赠送";
								} else if(_this.datas[i].coinOperateType == 11) {
									_this.datas[i].coinOperateType = "返点";
								} else if(_this.datas[i].coinOperateType == 12) {
									_this.datas[i].coinOperateType = "投注撤单";
								} else if(_this.datas[i].coinOperateType == 13) {
									_this.datas[i].coinOperateType = "提现撤单";
								} else if(_this.datas[i].coinOperateType == 14) {
									_this.datas[i].coinOperateType = "转盘奖励";
								} else if(_this.datas[i].coinOperateType == 15) {
									_this.datas[i].coinOperateType = "充值撤单";
								} else if(_this.datas[i].coinOperateType == 16) {
									_this.datas[i].coinOperateType = "返点回滚";
								} else if(_this.datas[i].coinOperateType == 17) {
									_this.datas[i].coinOperateType = "推荐赠送";
								} else if(_this.datas[i].coinOperateType == 18) {
									_this.datas[i].coinOperateType = "代理加款";
								} else if(_this.datas[i].coinOperateType == 19) {
									_this.datas[i].coinOperateType = "代理扣款";
								} else if(_this.datas[i].coinOperateType == 20) {
									_this.datas[i].coinOperateType = "开奖回滚";	
								} else if (_this.datas[i].coinOperateType == 27) {
									_this.datas[i].coinOperateType = "投注返利";
								}else if(_this.datas[i].coinOperateType == null) {
									_this.datas[i].coinOperateType = "--";
								}
							}
								//分页的(右边点击)
	                        if(data.body.list.length>0){
	                            $('#fenye').jqPaginator('option', {
	                                totalPages: data.body.pageSize,    //返回总页数
	                                currentPage: num
	                            });
	                        }else {
	                            $('#fenye').jqPaginator('option', {
	                                totalPages: 1,
	                                currentPage: 1
	                            });
	                        }
	                        $("#show_2 .showBetRecord").show();
	                        $("#show_2 .betResultOrder").hide();
						}else{
							$('#fenye').jqPaginator('option', {
	                                totalPages: 1,
	                                currentPage: 1
	                            });
							$("#show_2 .betResultOrder").show();
							$("#show_2 .showBetRecord").hide();
						}
						layer.close(index);
					},
					error: function(msg) {
					}
				};
				base.callAuthApi(obj);
		},
		showPopup:function(uid,id,type){
			this.numOrdDetail(uid,id);
		},
		//数字彩详情
		numOrdDetail: function(uid,id) {
			var data=  {
						'uid':uid,
						'betId': id,
						// 'outOfThrity':_this.outOfThrity,
					};
			var _this = this,
					obj = {
							type: 'post',
							data: data,
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
									}
							},
							error: function(msg) {
							}
					}
			base.callAuthApi(obj);
		},
		 //竞技彩详情
		 CompOrdDetail: function (uid,id) {
				var data=  {
						'uid':uid,
						'betId': id,
				};
				var _this = this,
						obj = {
								type: 'post',
								data: data,
								dataType: 'json',
								url: '/authApi/bets/queryBettingInfo',
								success: function(data) {
										if(data.code == 200) {
												_this.$nextTick(function () {
														layui.use('layer', function () {
																var layer =layui.layer;
																layer.open({
																		title: '查看订单详情',
																		type: 1,
																		content: $('.ordersOne'),
																		area: ['600px', '600px'],
																		btn: ['关闭'],
																		yes: function (index, layero) {
																				layer.closeAll('page');
																		}

																})
														});
												})
											
												_this.orders = data.body;
												_this.ordersById = data.body.list;
												//投注状态
												for(var i = 0; i < _this.orders.length; i++) {
														if(_this.orders[i].status == 0) {
																_this.orders[i].status = '未中奖'
														} else if(_this.orders[i].status == 1) {
																_this.orders[i].status = '中奖'
														} else if(_this.orders[i].status == 2) {
																_this.orders[i].status = '已撤单'
														} else {
																_this.orders[i].status = '未开奖'
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
												_this.ordersById = [];
											
										}
								},
								error: function(msg) {
								}
						}
				base.callAuthApi(obj);
				
		},
		selectTime: function(index) {
			var s1, s2, dateTime = new Date();
			switch(index) {
				case 0:
					this.startTime = "";
					this.endTime = "";
					this.outOfThrity=0;
					break;
				case 1: //今天
					dateTime.setTime(dateTime.getTime());
					s2 = dateTime.getFullYear() + "-" + this.getzf(dateTime.getMonth() + 1) + "-" + this.getzf(dateTime.getDate());
					this.startTime = s2 + " " + "00:00:00";
					this.endTime = s2 + " " + "23:59:59";
					this.outOfThrity=0;
					break;
				case 2: //昨天
					dateTime.setTime(dateTime.getTime() - 24 * 60 * 60 * 1000);
					s1 = dateTime.getFullYear() + "-" + this.getzf(dateTime.getMonth() + 1) + "-" + this.getzf(dateTime.getDate());
					this.startTime = s1 + " " + "00:00:00";
					this.endTime = s1 + " " + "23:59:59";
					this.outOfThrity=0;
					break;
				case 3: //本周
					st = this.getDateTime(0);
					et = dateTime.getFullYear() + "-" + this.getzf(dateTime.getMonth() + 1) + "-" + this.getzf(dateTime.getDate());
					this.startTime = st + " " + "00:00:00";
					this.endTime = et + " " + "23:59:59";
					this.outOfThrity=0;
					break;
				case 4: //上周
					st = this.getDateTime(2);
					et = this.getDateTime(3);
					this.startTime = st + " " + "00:00:00";
					this.endTime = et + " " + "23:59:59";
					this.outOfThrity=0;
					break;
				case 5: //上月
					st = this.getDateTime(6);
					et = this.getDateTime(7);
					this.startTime ="";
					this.endTime ="";
					this.outOfThrity=1;
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
			if(userName){
//				base.heartbeat(localStorage.getItem("userName"));
				var getUserInfo ={
					type:"post",
				    url:"/authApi/AutoLoginGetUserinfoByRedis",
				    data:{"username":userName},
				    success : function(data){
				     	if(data.code==200){
				     		var coin = parseFloat(data.body.COIN).toFixed(2);
									var fCoin = parseFloat(data.body.FCION).toFixed(2);
				     		$("strong.userName").html(data.body.USER_NAME);
							$("#coin11").html(coin);
							$("#lastTime").html(data.body.LAST_LOGIN_TIME);
				     	}
				    }
				}
				base.callAuthApi(getUserInfo);
			}else{
				location.href="/login/login.html";
			}
		}
	},
	watch:{
        //监听页码下拉框的值
        page_num: function () {
            this.getdatas(1,_this.type);
        }
    },
    beforeDestroy:function(){
        document.removeEventListener('keyup');
    }
});

// 加载分页功能
$.jqPaginator('#fenye', {
    totalPages: 1,      //多少页数据
    visiblePages: 10,   //最多显示几页
    currentPage: 1,     //当前页
    wrapper: '<ul class="pagination"></ul>',
    first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
    prev: '<li class="prev"><a href="javascript:void(0);">上一页</a></li>',
    next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
    last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
    page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',

    onPageChange: function (num, type) {
    	if(show_index==1){
    		pc.getdatas(num);
    	}else if(show_index==2){
    		pc.getDrawdatas(num);
    	}else{
    		pc.getchangedatas(num);
    	}
    }
});