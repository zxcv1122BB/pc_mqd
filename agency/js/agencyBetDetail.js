$(function () {
    $('.newTab a').click(function () {
        $(this).siblings().removeClass('curr');
        $(this).addClass('curr');
    });
});

var show_index=1;
let agentBet = new Vue({
    el: "#agentBetDetail",
    data: {
        //时间触发器
        timeList: ['今天', '昨天', '近七天'],
        timeC: '',
        currSearchType:0,
        indexArr: "",
        //记录数据
        recordData: [],
        //旧参数记录
        oldParam: "",
        //下级名称
        lowerUserName: "",
        //数据参数
        pageIndex: 1,//页数
        status: 0,//导航参数-(全部0-已中奖1-未中奖2-等待开奖3)
        //是否有数据
        noMes: 0,
        //是否还有数据可以加载
        isLoadOver: 0,
        outOfThrity: 0,
        orders: [], //订单详情
        ordersTwo: [],
        coinUnit: '元',

        ticketDetailsStr:[],// 出票明细
        ticketDetailsList:[],//出票明细

        ordersById: [], //投注详情
        
        pages:1,
        agencyType: localStorage.agencyType ? localStorage.agencyType:2,//用户类型
    },
    created: function () {
        this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
        this.getdatas();

    },
    mounted: function () {},
    methods: {
        changeType:function(){
            this.clearParamData();
            this.getdatas();
        },
        //加载数据
        getdatas: function () {
            var _this = this,
                param = {
                    username: localStorage.userName,
                    lowerUserName: _this.lowerUserName,
                    status: _this.status == 0 ? "" : parseInt(_this.status)-1,
                    startTime: "",
                    endTime: "",
                    pageIndex: _this.pageIndex,
                    pageNum: 10
                }, obj, nowTime;
            if (_this.oldParam) {
                param.startTime = _this.oldParam.startTime;
                param.endTime = _this.oldParam.endTime;
                // param.pageIndex=_this.oldParam.pageIndex;

            } else {
                nowTime = this.getTimeParam(_this.currSearchType);
                param.startTime = nowTime.start;
                param.endTime = nowTime.end;
                // param.pageIndex=_this.pageIndex;
                _this.oldParam = param;
            }
            //console.log(new Date(param.startTime));
            //console.log(new Date(param.endTime));
            console.log(param);
            obj = {
                type: "post",
                data: param,
                url: "/authApi/qryAgentBetInfo",
                success: function (data) {
                    if (data.code == 200) {
                        _this.recordData = data.body.list;
                        //分页的(右边点击)
                        if(data.body.list.length>0){
                            $('#fenye').jqPaginator('option', {
                                totalPages: data.body.pageSize,    //返回总页数
                                currentPage: data.body.pageIndex
                            });
                        }else {
                            $('#fenye').jqPaginator('option', {
                                totalPages: 1,
                                currentPage: 1
                            });
                        }
                    }else{
                        window.parent.layui.use('layer', function () {
                            var layer = window.parent.layui.layer;
                            window.parent.layer.msg(data.msg);
                        });
                    }

                }
            };
            base.callAuthApi(obj);
            // this.showRecordData(index);
        },
        //获取时间
        getTimeParam(index){

            if(!index&&index!=0){
                index=2;
            }
            var nowDate=new Date(),obj={
                hour:nowDate.getHours(),
                minutes:nowDate.getMinutes(),
                seconds:nowDate.getSeconds(),
                now:nowDate.toLocaleDateString(),
                last:(new Date(nowDate.getTime()-86400000)).toLocaleDateString(),
                sevenAgo:(new Date(nowDate.getTime()-86400000*7)).toLocaleDateString(),
            };

            switch(index){

                case 0://今天
                    nowDate.setTime(nowDate.getTime());
                    var s2 = nowDate.getFullYear() + "-" + this.getzf(nowDate.getMonth() + 1) + "-" + this.getzf(nowDate.getDate());
                    // return {
                    //   start:new Date(obj.now+" 00:00:00").getTime(),
                    //   end:new Date(obj.now +" "+
                    //   (obj.hour<10?"0"+obj.hour:obj.hour)+":"+
                    //   (obj.minutes<10?"0"+obj.minutes:obj.minutes)+":"+
                    //   (obj.seconds<10?"0"+obj.seconds:obj.seconds)).getTime(),
                    // }
                    return {
                        start:s2 +" "+ "00:00:00",
                        end: s2 + " " + "23:59:59",
                    }

                    break;
                case 1://昨天
                    nowDate.setTime(nowDate.getTime() - 24 * 60 * 60 * 1000);
                    var s1 = nowDate.getFullYear() + "-" + this.getzf(nowDate.getMonth() + 1) + "-" + this.getzf(nowDate.getDate());
                    return {
                        start:s1 +" "+ "00:00:00",
                        end: s1 + " " + "23:59:59",
                    }
                    // return {
                    //   start:new Date(obj.last+" 00:00:00").getTime(),
                    //   end:new Date(obj.last+" 23:59:59").getTime(),
                    // }
                    break;
                case 2://近七天
                    var st = this.getDateTime(8);
                    var  et = nowDate.getFullYear() + "-" + this.getzf(nowDate.getMonth() + 1) + "-" + this.getzf(nowDate.getDate());
                    return {
                        start:st +" "+ "00:00:00",
                        end: et + " " + "23:59:59",
                    }
                    // return {
                    //   start:new Date(obj.sevenAgo+" 00:00:00").getTime(),
                    //   end:new Date(obj.now +" "+
                    //   (obj.hour<10?"0"+obj.hour:obj.hour)+":"+
                    //   (obj.minutes<10?"0"+obj.minutes:obj.minutes)+":"+
                    //   (obj.seconds<10?"0"+obj.seconds:obj.seconds)).getTime(),
                    // }
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

            function getDay(day){
                var today = new Date();

                var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;

                today.setTime(targetday_milliseconds); //注意，这行是关键代码

                var tYear = today.getFullYear();
                var tMonth = today.getMonth();
                var tDate = today.getDate();
                tMonth = doHandleMonth(tMonth + 1);
                tDate = doHandleMonth(tDate);
                return tYear+"-"+tMonth+"-"+tDate;
            }

            function doHandleMonth(month) {
                var m = month;
                if (month.toString().length == 1) {
                    m = "0" + month;
                }
                return m;
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
            }else  if(index == 8){
                var k = getDay(-7);
                return k;
            }
        },
        //补0
        getzf: function(num) {
            if(parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },
        // //获取时间
        // getTimeParam(index) {
        //     if(!index&&index!=0){
        //         index=2;
        //     }
        //     var nowDate = new Date(), obj = {
        //         hour: nowDate.getHours(),
        //         minutes: nowDate.getMinutes(),
        //         seconds: nowDate.getSeconds(),
        //         now: nowDate.toLocaleDateString(),
        //         last: (new Date(nowDate.getTime() - 86400000)).toLocaleDateString(),
        //         sevenAgo: (new Date(nowDate.getTime() - 86400000 * 7)).toLocaleDateString(),
        //     };
        //     switch (index) {
        //
        //         case 0://今天
        //             return {
        //                 start: new Date(obj.now + " 00:00:00").getTime(),
        //                 end: new Date(obj.now + " " +
        //                     (obj.hour < 10 ? "0" + obj.hour : obj.hour) + ":" +
        //                     (obj.minutes < 10 ? "0" + obj.minutes : obj.minutes) + ":" +
        //                     (obj.seconds < 10 ? "0" + obj.seconds : obj.seconds)).getTime(),
        //             }
        //
        //             break;
        //         case 1://昨天
        //             return {
        //                 start: new Date(obj.last + " 00:00:00").getTime(),
        //                 end: new Date(obj.last + " 23:59:59").getTime(),
        //             }
        //             break;
        //         case 2://近七天
        //             return {
        //                 start: new Date(obj.sevenAgo + " 00:00:00").getTime(),
        //                 end: new Date(obj.now + " " +
        //                     (obj.hour < 10 ? "0" + obj.hour : obj.hour) + ":" +
        //                     (obj.minutes < 10 ? "0" + obj.minutes : obj.minutes) + ":" +
        //                     (obj.seconds < 10 ? "0" + obj.seconds : obj.seconds)).getTime(),
        //             }
        //             break;
        //     }
        // },
        //清空参数数据
        clearParamData() {
            this.pageIndex = 1;
            this.recordData = [];
            this.oldParam = "";
            // this.lowerUserName="";
        },
        //改变导航状态status
        changeStatus(index) {
            var _this = this;
            _this.status = index;
            _this.clearParamData();
            _this.getdatas();

        },
        searchDownData() {
            var _this = this;
            _this.status = 0;
            _this.clearParamData();
            // _this.lowerUserName=name;
            _this.getdatas();

        },

        showPopup:function(uid,id,type){
            if(type < 5){
                this.CompOrdDetail(uid,id);

            }else{
                this.numOrdDetail(uid,id);
            }

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

        //出票明细
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
                        window.parent.layer.closeAll('page');
                    }

                })
            })
            if(typeId == 2) {
                _this.ticketDetailsStr = _this.orders.ticketDetailsStr;
            } else {
                _this.getdatasMes(betId);
            }
        },





    },


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
        agentBet.pageIndex = num;
        agentBet.getdatas();
    }
});