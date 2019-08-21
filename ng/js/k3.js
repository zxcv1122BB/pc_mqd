$(function() {
    $(document).attr('title',cqssc.typeName);
    // 点击玩法选择界面的某一个选项时切换到改选项下
    $(".play_choice .tab").on("click", "li", function() {
        $(this).addClass("active").siblings("li").removeClass("active");
        $(".playList ul").children("li").css({display: "none"});
        $(".playList ul").children("li").eq($(this).index()).css({display: "block"});
        $(".playList li:visible").find(".radio_group.active").removeClass("active");
        $(".playList li:visible").find(".radio_group:first").addClass("active");
    });

    // 控制机选注数控制菜单的显示隐藏
    $(".btnList").on("mouseenter", ".draw_menu", function() {
        $(this).children("ul").css({"display": "block"});
    });
    $(".btnList").on("mouseleave", ".draw_menu", function() {
        $(this).children("ul").css({"display": "none"});
    });


    $("body").on("click", ".radio_group", function () {
        $(this).parents("li").find(".radio_group").removeClass("active");
        $(this).addClass("active");
    })
	$('.orderOdds').hover(function(){
		$('#odds').show();
	},function(){
		$('#odds').hide();
	})

});
let cqssc = new Vue({
    el: "#cqssc-container",
    data: {
    	//一级玩法
    	oneTypeId:'',
        code:'k3',

        //收藏
        isCollect: 0,

        typeName:'',
        pic_url:'',
    	
        //当前期数
        preventBanner: "",
        //截止时间
        deadlineStr: "",
        hundMal: 1,

        recentlyNum: 1,
        parentIndex: 0,
        playExplain: "",

        //是否为正方形样式
        rect: false,

        //储存接受的数据
        menu: [],
        //当前的数字列(默认为的1~6)
        numberList: ["1", "2", "3", "4", "5", "6"],
        //区域名数组
        areaNameList: ["sumvalue", "generalselect", "number","standard", "biliarycode","towcode", "samenum", "diffnum"],
        //
        nl: [
            ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
        ],
        //测试
        testNameList: ["前一", "定位胆", "前二", "前三"],
        testNameList2: ["前一", "定位胆", "前二", "前三"],
        // testNumber: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
        testNumberCommon: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],

        //和值
        sumvalue: [],
        //通选
        generalselect: [],
        //号码
        number: [],
        //标准
        standard: [],
        //胆码
        biliarycode: [],
        //拖码
        towcode: [],
        //同号
        samenum: [],
        //不同号
        diffnum: [],
		testNumber: [10, 50, 100, 200, 500, 1000, 5000, 10000, 50000],

        //控制显示的数字数列区域，0为不显示
        presentAreaList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],

        //控制机选的数字列表
        ranNumList: [1, 1, 1, 3, 1, 1, 1, 1, 1, 1,1],

        //存储当前的下标
        presentIndexList: [0, 0],

        //单笔注数
        bets: 0,

        // 单注金额
        singleCoins: '',

        // 玩法提示相关
        game_tips: '',
        win_example: '',
        win_explain: '',

        // 赔率   总概率   返奖率
        orderOdds: 95,
        orderCount: 100,
        rebate: 0,
        rebateNum: 0,
        maxOdds: 95,
        maxPrize: 9.8,
        minPrize: 8.5,
        maxReward: 13,

        // 记录用户当前的投注信息
        recentBetInfo: {},
        // 记录用户所有的投注订单信息
        BetsList: [],

        // 总注数和投注所需金额
        totalBets: 0,
        totalCoins: 0,

        //钱包余额
        pack_coin:0,
        //金钱单位
        coinUnit:"元",

        //追号--中奖后停止
        after_no:0,
        //追期数
        continue_periods:1,

        //存储提示内容
        tipsContent: [],
        //提示弹出框时间
        tenSecond: 10,
        //定时器
        timer1: "",

        present_title:'',

        //多赔率--对应单注中奖金额
        special_sum:"",
        special_indexList:[],

        //标准机选个数:
        standardList:["3","4","5","6"],
        // 胆码机选个数:
        biliaryList:["1"],
        //上期期号
        presentNum:"",

        //暂未开售禁止投注
        bet_forbid: false,
        
        
        bet_clear:false,

        //玩法判断
        judgeList: {
            // 和值
            sumValue: {
                judgeId: 177,
                code3:'k3_hz_hz',
            },
            //三同号-通选
            three_same_general: {
                judgeId: 178,
                code3:'k3_3th_tx',
            },
            //三同号-单选
            three_same_radio: {
                judgeId: 179,
                code3:'k3_3th_dx',
            },

            //三不同号-标准
            three_imparity_standard: {
                judgeId: 180,
                code3:'k3_3bth_bz',
            },
            //三不同号-胆拖
            three_imparity_continuous: {
                judgeId: 181,
                code3:'k3_3bth_dt',
            },
            //三连号-通选
            three_continuous_general: {
                judgeId: 182,
                code3:'k3_3lh_tx',
            },
            //二同号-复选
            two_same_check: {
                judgeId: 183,
                code3:'k3_2th_fx',
            },
            //二同号-单选
            two_same_single: {
                judgeId: 184,
                code3:'k3_2th_dx',
            },
            //二不同号-标准
            two_imparity_standard: {
                judgeId: 185,
                code3:'k3_2bth_bz',
            },
            //二不同号-胆拖
            two_imparity_continuous: {
                judgeId: 186,
                code3:'k3_2bth_dt',
            },
        },
        //上期期数
        previousIssue:'',
        previousIssue_tips:'',
        userName: localStorage.userName,
        show_dd: false
    },
    created: function() {
        this.getSearchValue();
        this.getHistoryBannerInfo();
        this.getBetsBannerInfo();
        this.getBetsType();
        this.getSysConfig();
        if (localStorage.userName) {
            this.get_userState();
        }
        localStorage.lottery_id= this.oneTypeId;
        this.isCollect = localStorage.collectGame && JSON.parse(localStorage.collectGame).collectList[this.oneTypeId] ? 1 : 0;

    },
    mounted: function() {
    },
    methods: {
	    dianji: function() {
	      this.show_dd = true
	    },
	    hide_dd: function() {
	        this.show_dd = false;
	    },
	    select_money: function(num) {
	        this.singleCoins = num
	        this.show_dd = false
	    },
        refresh:function(){
            this.getHistoryBannerInfo();
            $(".record p .refresh .iconfont").css({
                "transition": "transform 1s linear",
                "transform": "rotate(360deg)",
                "opacity": "0.1"
            });
            setTimeout(function () {
                $(".record p .refresh .iconfont").css({
                    "color": "#f67620"
                });
                $(".record p .refresh .iconfont").css({
                    "transition": "inherit",
                    "transform": "rotate(0deg)",
                    "opacity": "1"
                });
            }, 1000)

        },
        //玩法收藏
        collectFn:function(){
            // alert(1111111)
            if (this.isCollect==0){
                this.isCollect=1;
            }else{
                this.isCollect=0;
            }

            var dataList= window.parent.base.collectGame.set(this.oneTypeId);
            localStorage.collectGame =dataList?JSON.stringify(dataList):'';

            window.parent.collectNum();



        },

        getSearchValue:function(){
            var IdList = JSON.parse(localStorage.gameIdList);
            var _this = this,Array= IdList[_this.code].split(',');
            var type = parseInt(window.location.search.substring(1));
            if(_this.isInArray(Array,type)){
                _this.oneTypeId = type;
            }else{
                window.location.search = '?11';
            }
        },
        //判断某个元素是否存在某个数组中
        isInArray:function(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (parseInt(arr[i])=== obj) {
                    return true;
                }
            }
            return false;
        },

        //排序
        sortNum: function(sort2,sort3){
            return function(a,b){
                var value1 = a[sort2];
                var value2 = b[sort2];
                if(value1 === value2){
                    return a[sort3] - b[sort3];
                }
                return value1 - value2;
            }
        },


        // 获取历史开奖数据
        getHistoryBannerInfo: function() {
            var _this = this,
                obj = {
                type: "post",
                url: '/commonAPI/hisOpenData',
                data: {
                    one_type_id: _this.oneTypeId,
                    count: 20
                },
                success: function(data) {
                    if(data.code == 200 && data.body && data.body.length != 0) {
                        _this.history = data.body;
                        if (_this.previousIssue&&data.body[0].issue !== _this.previousIssue && _this.previousIssue_tips){
                            setTimeout(function () {
                                _this.getHistoryBannerInfo();
                            }, 20000);
                        }else{
                            _this.previousIssue = data.body[0].issue;
                            _this.previousIssue_tips="";
                        }
                        for (var i = 0; i < _this.history.length; i++) {
                            _this.history[i].recentlyNum = _this.history[i].luck_number.split(',');
                            _this.history[i].presentNum = parseInt(_this.history[i].issue);
                        }
                    }
                },
                error: function(res) {

                }
            };
            base.callCommonApi(obj);
        },

        // 获取当前可投注期次信息
        getBetsBannerInfo: function() {
            var _this = this,
                obj = {
                type: "post",
                // type:'post',
                url: '/commonAPI/getIssueInfo',
                data: {
                    one_type_id: _this.oneTypeId
                },
                success: function(data) {
                    if (_this.deadlineTiming){
                        window.clearInterval(_this.deadlineTiming);
                        _this.deadlineTiming="";
                    }
                    if(data.code == 200 && data.body) {
                        if(!data.body.deadline) {
                            _this.preventBanner = "";
                            _this.deadlineStr = "封盘";
                            return
                        }
                        if (data.body.saleStatus == "ON_SALE") {
                            _this.preventBanner = data.body.issue;
                            setTimeout(function () {
                                _this.getHistoryBannerInfo();
                            }, 120000);
                        } else if (data.body.saleStatus == "NO_SALE") {
                            _this.preventBanner = "距离下一期开售";
                            _this.bet_forbid = true;
                        }
                        //近期开奖

                        if (_this.previousIssue && _this.previousIssue == data.body.previousIssue){
                            _this.previousIssue_tips = "";
                        }else{
                            _this.previousIssue = data.body.previousIssue;

                            if (data.body.previousIssue){
                                setTimeout(function () {
                                    _this.getHistoryBannerInfo();
                                }, 20000);
                                _this.previousIssue_tips="开奖中...";
                            }else{
                                setTimeout(function () {
                                    _this.getHistoryBannerInfo();
                                }, 20000);
                                _this.previousIssue_tips="";
                            }
                        }
                        // _this.preventBanner = data.body.issue;
                        //if (_this.oneTypeId == 54) {
                          //  _this.lastTime = _this.getMilliseconds(data.body.deadline)-55000;
                        //} else if (_this.oneTypeId == 23) {
                          //  _this.lastTime = _this.getMilliseconds(data.body.deadline)+50000;
                        //} else {
                            _this.lastTime = _this.getMilliseconds(data.body.deadline);
                        //}
                        _this.startTime=_this.getMilliseconds(data.body.response_date);
                        _this.countdown(_this.lastTime, _this.startTime);
						_this.deadlineTiming = setInterval(function () {
                            // _this.countdown(_this.lastTime);
                            _this.startTime+=1000;
                            _this.countdown(_this.lastTime,_this.startTime);
                        }, 1000);
//                      setTimeout(function() {
//                          _this.getHistoryBannerInfo();
//                      }, 120000);
                    }else if (data.code == 201) {
                        _this.bet_forbid= true;
                        _this.preventBanner = "";
                        _this.deadlineStr = data.msg;
                    }else {
                         _this.preventBanner = "";
                        _this.deadlineStr = "暂停销售";
                    }
                },
                error: function(res) {

                }
            };
            base.callCommonApi(obj);
        },
// 获取系统配置投注项
		getBetsType: function () {
			var _this = this,
				obj = {
					type: "post",
					url: '/commonAPI/qryGamePlayInfo',
					data: {
						one_type_id: _this.oneTypeId
					},
					success: function (data) {
						if (data.code == 200 && data.body) {
							_this.initializeBetsTypeData(data.body);
						} else {
						}
					},
					error: function (res) {

					}
				},
				dataList = localStorage.qryGamePlayInfo ? JSON.parse(localStorage.qryGamePlayInfo) : "",
				ots = localStorage.qryGamePlayInfoTimestamp ? JSON.parse(localStorage.qryGamePlayInfoTimestamp) : "",
				nts = localStorage.contrastTimestamp ? JSON.parse(localStorage.contrastTimestamp).gameTypeSign : "";

			//比对时间戳，看是否需要更新
			if (dataList != "" && ots != "" && nts != "" && nts != null && ots[_this.oneTypeId] && dataList[_this.oneTypeId] && ots[_this.oneTypeId] == nts[_this.oneTypeId]) {
				_this.initializeBetsTypeData(dataList[_this.oneTypeId])
			} else {
				_this.contrastTimestamp();
				base.callCommonApi(obj);
			}
		},
		//初始化投注项数据
		initializeBetsTypeData: function (data) {
			var _this = this, oneTypeArr = [], dataList,objList;
            data = data.sort(_this.sortNum('sort2','sort3'));
            if (!localStorage.qryGamePlayInfo) {
                dataList = {};
                dataList[_this.oneTypeId] = data;
                localStorage.qryGamePlayInfo = JSON.stringify(dataList);
            }else{
                dataList = JSON.parse(localStorage.qryGamePlayInfo);
                dataList[_this.oneTypeId] = data;
                localStorage.qryGamePlayInfo = JSON.stringify(dataList);
            }
                        // 第一遍遍历添加一级玩法
                        data.map(function (item) {
                            for(var key in _this.judgeList){
                                if(_this.judgeList[key].code3 == item.code3){
                                    item.judgeId = _this.judgeList[key].judgeId;
                                }
                            }
                            objList = _this.judgeNumberList(item.judgeId);
                            item.areaList = objList.areaList;
                            item.numList = objList.numList;
                            item.numList1 = objList.numList1;
                            if (!oneTypeArr.some(function (items) {
                                return items == item.name2
                            })) {
                                oneTypeArr.push(item.name2);
                                _this.menu.push({
                                    oneType: item.name2,
                                    twoType: [item]
                                })
                            } else {
                                var index = oneTypeArr.indexOf(item.name2);
                                _this.menu[index].twoType.push(item);
                            }
                        });
            _this.gamePlayCode1 = data[0].code1 ? data[0].code1 : '';
            //重新计算赔率
            _this.setOrderOdds();
            //初始化
            _this.switchover_play(0, 0);
            _this.typeName = data[0].name1;
            _this.pic_url = data[0].pic_url;
			_this.orderOdds = _this.maxPrize;
// 			_this.singleCoins = data[0].minAmount;
            if(_this.present_playId == 177){
                _this.orderOdds = _this.maxPrize.split('|')[0];
            }
		},
		//获取第一遍加载时的时间戳
		contrastTimestamp: function () {
			var _this = this, timeList,
				obj = {
					type: "post",
					url: "/commonAPI/privacy/getUpdateStatusSign",
					data: {
						isWhite: true
					},
					success: function (data) {
						var ulist = [], nlist = [], oDataList, nameList = ["sysAdvpictureSign", "sysBulletinSign", "sysConfigureSign", "sysLotterySign"];
						if (data.body) {
							localStorage.contrastTimestamp = JSON.stringify(data.body);
							if (localStorage.qryGamePlayInfoTimestamp) {
								timeList = JSON.parse(localStorage.qryGamePlayInfoTimestamp);
								timeList[_this.oneTypeId] = data.body.gameTypeSign[_this.oneTypeId];
								localStorage.qryGamePlayInfoTimestamp = JSON.stringify(timeList);
							} else {
								timeList = {};
								timeList[_this.oneTypeId] = data.body.gameTypeSign[_this.oneTypeId];
								localStorage.qryGamePlayInfoTimestamp = JSON.stringify(timeList);
							}
						} else {
							localStorage.contrastTimestamp = "";
							setTimeout(function () {
								_this.contrastTimestamp();
							}, 2000);
						}
					},
				};
			base.callCommonApi(obj);
        },
        // 固定差值=(最大赔率 - 最小赔率) / (最大返点 * 10)			保留三位小数并舍去三位以后小数
        // 当前赔率 = 最大赔率 - (固定差值 * (最大返点 - 当前返点) * 10)
        // _this.menu，play_area_manner
        setOrderOdds() {
            //重新计算赔率&& !this.rebateList
            if (localStorage.szcRebateList) {
                var _this = this, item, code1 = _this.gamePlayCode1,
                    rebateList = JSON.parse(localStorage.szcRebateList);
                for (var i in rebateList) {
                    if (rebateList[i].code == code1) {
                        this.rebateList = rebateList[i]
                        break
                    }
                }
                //menu
                _this.menu.map(function(outItem) {
                    outItem.twoType.map(function(inItem) {
                        if (inItem.max_prize.indexOf('|') != -1) {
                            var maxList = inItem.max_prize.split('|'), minList = inItem.min_prize.split('|'), val = "";
                            maxList.map(function(inItems, index) {
                                var val = parseFloat((inItems - minList[index]) / (_this.rebateList.rebate * 10 + 1)).toFixed(3);
                                maxList[index] = parseFloat(inItems - (val * (_this.rebateList.rebate - _this.rebateList.nowRebate) * 10)).toFixed(3);
                            })
                            inItem.max_prize = maxList.join("|");
                        } else {
                            var val = parseFloat((inItem.max_prize - inItem.min_prize) / (_this.rebateList.rebate * 10 + 1)).toFixed(3);
                            inItem.max_prize = parseFloat(inItem.max_prize - (val * (_this.rebateList.rebate - _this.rebateList.nowRebate) * 10)).toFixed(3);
                        }
                    })
                });

            }

        },
        //获取登录状态
        get_userState: function () {
            var that = this,
                userNameMsg = localStorage.userName;
            if (userNameMsg && that.pack_coin == 0) {
                that.isLogin = true;
                var getUserInfo = {
                    type: "post",
                    url: "/authApi/getCoin",
                    async: false,
                    data: {
                        "username": localStorage.getItem("userName")
                    },
                    success: function success(data) {
                        if (data.code == 200) {
                            that.pack_coin = (parseFloat(data.body.coin)).toFixed(2);
                            that.user_state = "钱包:" + that.pack_coin + that.coinUnit + "(可用)";
                        } else {
                            localStorage.loginTo = "../ng/ahk3.html";
                            // location.href = "../../loginIn/login.html";
                            parent.opendpg('../login/login.html');
                        }
                    }
                };
                base.callAuthApi(getUserInfo);
            }
        },
        getSysConfig:function(){
            var	that=this,
                getSingleMaxSum = {
                    type: "post",
                    url: "/commonAPI/privacy/getSysConfigureResult",
                    data: {},
                    success: function (data) {
                        if (data.code == 200) {
                            localStorage.config = JSON.stringify(data.body);
                            if(data.body.coinUnit){
                                that.coinUnit=data.body.coinUnit;
                            }
                        }
                    },
                },
                config = localStorage.config ? JSON.parse(localStorage.config) : '';
            if (config == "" || !config.coinUnit) {
                base.callCommonApi(getSingleMaxSum);
            } else {
                that.coinUnit = config.coinUnit;
            }
        },


        // 获取毫秒数
        getMilliseconds: function(str) {
            str = str.replace(new RegExp("-", "gm"), "/");
            return(new Date(str)).getTime(); //得到毫秒数
        },
        //补0
        getzf: function(num) {
            if(parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },
        //时间倒计时
        countdown: function(lastTime,startTime) {
            var _this = this,
                deadlineT = lastTime - startTime,
                deadline_hour = _this.getzf(Math.floor(deadlineT / 1000 / 60 / 60)),
                deadline_minute = _this.getzf(Math.floor(deadlineT / 1000 / 60 % 60)),
                deadline_second = _this.getzf(Math.floor(deadlineT / 1000 % 60));
            if(deadlineT >= 0) {
				_this.deadlineStr = '<span class="timer">'+deadline_hour+'</span><span class="time-tip">:</span><span class="timer">'+deadline_minute+'</span><span class="time-tip">:</span><span class="timer">'+deadline_second+'</span>';
            } else {
                _this.deadlineStr = "正在请求数据...";

                clearInterval(_this.deadlineTiming);
                _this.deadlineTiming = "";
                _this.stopBanner = _this.preventBanner;
                _this.getBetsBannerInfo();
            }

        },
        //判断循环的数字数组-所显示的区域
        //参数为玩法的三级id
        //areaList[0-冠军，1-亚军，2-季军，3-第四位，4-第五位，5-第六位，6-第七位，7-第八位，8-第九位，9-第十位]
        judgeNumberList: function(jd) {
            var _this = this,
                obj = {},
                numList, numList1, areaList;
            switch(jd) {
                case 177: //和值
                    areaList = [0];
                    break;
                case 178: //三同号-通选
                    areaList = [1];
                    break;
                case 179: //三同号-单选
                    areaList = [2];
                    break;
                case 180: //三不同号-标准
                    areaList = [3];
                    break;
                case 181: //三不同号-胆拖
                    areaList = [4,5];
                    break;
                case 182: //三连号-通选
                    areaList = [2];
                    break;
                case 183: //二同号-复选
                    areaList = [2];
                    break;
                case 184: //二同号-单选
                    areaList = [6,7];
                    break;
                case 185: //二不同号-标准
                    areaList = [3];
                    break;
                case 186: //二不同号-胆拖
                    areaList = [4,5];
                    break;
                default:
                    areaList = [5];
                    break;
            }
            switch(jd) {
                case 177: //和值
                    numList = ["3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"];
                    break;
                case 178: //三同号-通选
                    numList = ["三同号通选"];
                    break;
                case 179: //三同号-单选
                    numList = ["111", "222","333","444","555","666"];
                    break;
                case 180: //三不同号-标准
                    numList = ["1", "2","3","4","5","6"];
                    break;
                case 181: //三不同号-胆拖
                    numList = ["1", "2","3","4","5","6"];
                    break;
                case 182: //三连号-通选
                    numList = ["三连号通选"];
                    break;
                case 183: //二同号-复选
                    numList = ["11", "22","33","44","55","66"];
                    break;
                case 184: //二同号-单选
                    numList = ["11", "22","33","44","55","66"];
                    numList1 = ["1", "2","3","4","5","6"];
                    break;
                case 185: //二不同号-标准
                    numList = ["1", "2","3","4","5","6"];
                    break;
                case 186: //二不同号-胆拖
                    numList = ["1", "2","3","4","5","6"];
                    break;
                default:
                    numList = [5];
                    break;

            }
            return {
                numList: numList,
                numList1:numList1,
                areaList: areaList
            }
        },

        //切换玩法
        //参数为外层的下标和内层下标
        switchover_play: function (oi, ii) {
            var _this = this, obj = _this.menu[oi].twoType[ii], numList = obj.numList;
            _this.presentIndexList=[oi,ii];
            _this.game_tips = obj.game_tips;

            _this.maxPrize = obj.max_prize;
            _this.minPrize = obj.min_prize;
            _this.maxReward = obj.max_reward;
            _this.orderOdds = parseFloat(obj.max_prize).toFixed(3);
            _this.rebateNum=0;
            _this.rebate=0;
            _this.present_title=obj.name2+"-"+obj.name3;
            _this.present_playId=obj.judgeId;
            // _this.present_judgeId=obj.judgeId;
            if(_this.present_playId == 177){
                _this.setSpecialSum();
            }
            _this.initialize_areaList(obj.areaList, obj.numList,obj.numList1); //(第几行数,每列的元素)
        },
        //初始化--区域
        initialize_areaList: function(areaList, numList,numList1) {
            var _this = this,jd =_this.present_playId;
            nameList = ["sumvalue", "generalselect", "number","standard", "biliarycode","towcode", "samenum", "diffnum"];
            _this.presentAreaList = [0, 0, 0, 0, 0, 0, 0, 0];
            for(var i = 0, len = areaList.length; i < len; i++) {
                _this[nameList[areaList[i]]] = [];
                if(jd == 184){
                    if(i==0){
                        numList.map(function(item) {
                            _this[nameList[areaList[i]]].push({
                                'num': item,
                                isSel: false
                            })
                        });
                    }else{
                        numList1.map(function(item) {
                            _this[nameList[areaList[i]]].push({
                                'num': item,
                                isSel: false
                            })
                        });
                    }
                }else{
                    numList.map(function(item) {
                        _this[nameList[areaList[i]]].push({
                            'num': item,
                            isSel: false
                        })
                    });
                }
                if(jd==182){
                    _this.rect = true;
                }else{
                    _this.rect = false;
                }
                if(jd == 185){
                    _this.standardList = ["2","3","4","5","6",];
                    _this.ranNumList[3] = 2;

                }else {
                    _this.standardList = ["3","4","5","6",];
                    _this.ranNumList[3] = 3;

                }
                if(jd == 186){
                    _this.biliaryList = ["1"];
                }else {
                    _this.biliaryList = ["1","2"];
                }

                Vue.set(_this.presentAreaList, areaList[i], 1);
            }
        },

        // 点击元素时给元素加上选中的类  可能还要在这里调用自动计算注数的方法
        handleAddClass: function (item,index,type) {
            var _this=this,jd=_this.present_playId,count=0;
            switch(jd){
                case 177:
                    item.isSel = !item.isSel;
                    _this.rebateNum =0;
                    _this.rebate = 0;
                    break;
                case 181://三不同--胆拖
                    _this.biliarycode.map(function(item){
                        if(item.isSel){
                            count++
                        }
                    });
                    if(count==2&&type==0){
                        for(var i=0,len=_this.biliarycode.length;i<len;i++){
                            var obj=_this.biliarycode[i].isSel;
                            if(obj){
                                _this.biliarycode[i].isSel=false;
                                break;
                            }
                        }
                    }
                    if(type==1&&_this.biliarycode[index].isSel&&!_this.towcode[index].isSel){
                        _this.biliarycode[index].isSel=false;
                        _this.towcode[index].isSel=true;
                    }else if(type==0&&!_this.biliarycode[index].isSel&&_this.towcode[index].isSel){
                        _this.towcode[index].isSel=false;
                        _this.biliarycode[index].isSel=true;
                    }else{
                        item.isSel = !item.isSel;
                    }
                    break;
                case 184://二同号-单选
                    if(type==1&&_this.samenum[index].isSel&&!_this.diffnum[index].isSel){
                        _this.samenum[index].isSel=false;
                        _this.diffnum[index].isSel=true;
                    }else if(type==0&&!_this.samenum[index].isSel&&_this.diffnum[index].isSel){
                        _this.diffnum[index].isSel=false;
                        _this.samenum[index].isSel=true;
                    }else{
                        item.isSel = !item.isSel;
                    }
                    break;
                case 186://二不同号-胆拖
                    var onum;
                    _this.biliarycode.map(function(item){
                        if(item.isSel){
                            count++
                        }
                    });
                    if(count==1&&type==0){
                        for(var i=0,len=_this.biliarycode.length;i<len;i++){
                            var obj=_this.biliarycode[i].isSel;
                            if(obj){
                                _this.biliarycode[i].isSel=false;
                                onum=_this.biliarycode[i].num;
                                break;
                            }
                        }
                    }
                    if(type==1&&_this.biliarycode[index].isSel&&!_this.towcode[index].isSel){
                        _this.biliarycode[index].isSel=false;
                        _this.towcode[index].isSel=true;
                    }else if(type==0&&!_this.biliarycode[index].isSel&&_this.towcode[index].isSel){
                        _this.towcode[index].isSel=false;
                        _this.biliarycode[index].isSel=true;
                    }else{
                        if(onum!=item.num){
                            item.isSel = !item.isSel;
                        }

                    }
                    break;
                default:
                    item.isSel = !item.isSel;
                    return;
                    break;
            }

        },


        // 统计对象中选中的元素个数
        totalCountsHandler: function(opt) {
            var count = 0;
            opt.map(function(item) {
                if(item.isSel) {
                    count++;
                }
            });
            return count;
        },
        // 统计某一个选择区中的选中项的值 传递选择区的管理对象
        handleAreaSelNum: function(opt) {
            var tempArr = [];
            opt.map(function(item) {
                if(item.isSel) {
                    tempArr.push(item.num);
                }
            });
            return tempArr;
        },
        // 将投注信息记录到当前投注信息记录对象中  传递一个用户选择项的数组,一维字符串数组
        handleRecodeInfo: function(seloptArr) {
            var _this = this,
                obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]];
            _this.recentBetInfo = {};
            _this.recentBetInfo.type = obj.name2 + "-" + obj.name3;
            //          _this.recentBetInfo.betsCount = _this.bets;
            _this.recentBetInfo.betsClause = [];

            seloptArr.map(function(item) {
                _this.recentBetInfo.betsClause.push(item);
            })
            //          _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins
        },
        //机选元素个数选择
        changeRandomNum: function(index, num) {
            var _this = this;
            _this.bet_clear = false;
            Vue.set(_this.ranNumList, index, num);
            $(".draw_menu ul").css("display", "none");
        },

        //机选事件
        //参数index对应区域块，type 0-机选 1-全选
        randomNum: function(index, type) {
            var _this=this,numList=[],ranNum,jd=_this.present_playId,ClassName = _this.areaNameList[index];
            var selList = $('.'+ClassName).find("span:not('.sel')");
            _this.bet_clear = false;
            _this[_this.areaNameList[index]].map(function (item,index) {
                numList.push(index);
            });
            if(type==1){
                switch (jd){
                    case 181:
                    case 184:
                    case 186:
                        selList.map(function (item,index) {
                            $(index).trigger("click");
                        });
                        break;
                    default:
                        _this[_this.areaNameList[index]].map(function(item){
                            item.isSel=true;
                        });
                        break;
                }
            }else{
                _this[_this.areaNameList[index]].map(function (item) {
                    item.isSel = false;
                });
                switch (jd){
                    case 181:
                    case 184:
                    case 186:
                        for (var i = 0, len = _this.ranNumList[index];i<len;i++) {
                            ranNum = parseInt(Math.random() * numList.length);
                            $("." + ClassName).find("span").eq(numList[ranNum]).trigger("click");
                            numList.splice(ranNum,1);
                        }
                        break;
                    default:
                        for (var i = 0, len = _this.ranNumList[index];i<len;i++){
                            ranNum=parseInt(Math.random()*numList.length);
                            _this[_this.areaNameList[index]][numList[ranNum]].isSel = true;
                            numList.splice(ranNum,1);
                        }
                        break;
                }

            }

        },

        //机选事件--注数
        //num--机选注数
        randomBets:function(num){
            var _this = this, obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]];
            for(var i=0;i<num;i++){
                _this.clearSelectData(0,0);
                _this.randomData();
                _this.count_betNumber();
                _this.BetsList.unshift({
                    type: _this.recentBetInfo.type,
                    betsCount: _this.recentBetInfo.betsCount,
                    betsClause: _this.recentBetInfo.betsClause.join("|"),
                    betsCoins: _this.singleCoins * _this.recentBetInfo.betsCount,
                    id3: obj.id3,
                    id2: obj.id2,
                    id1: obj.id1,
                    odds: _this.orderOdds,
                    banner: _this.preventBanner,
                    singleCoin: _this.singleCoins,
                    rebate: _this.rebate
                });
                _this.handleBetsCoins();
                _this.clearSelectData(0,0);
            }
        },

        randomData: function () {
            var _this = this,
                listName = ["sumvalue", "generalselect", "number","standard", "biliarycode","towcode", "samenum", "diffnum"],
                outIndex = parseInt(Math.random() * 10),
                inIndex = parseInt(Math.random() * 10),
                inIndexList=[],
                len,
                jd = _this.present_playId;
            switch (jd) {
                case 177://和值-和值
                    len=_this.sumvalue.length;
                    inIndex=parseInt(Math.random()*len);
                    for(var i=0;i<len;i++){
                        inIndexList.push(i);
                    }
                    _this.sumvalue.map(function(item,index){
                        if(index==inIndex){
                            item.isSel=true;
                        }
                    });
                    break;
                case 178://三同号-通选
                    len=_this.generalselect.length;
                    inIndex=parseInt(Math.random()*len);
                    for(var i=0;i<len;i++){
                        inIndexList.push(i);
                    }
                    _this.generalselect.map(function(item,index){
                        if(index==inIndex){
                            item.isSel=true;
                        }
                    });
                    break;
                case 179://三同号-单选
                case 182://三连号-通选
                case 183://二同号-复选
                    len=_this.number.length;
                    inIndex=parseInt(Math.random()*len);
                    for(var i=0;i<len;i++){
                        inIndexList.push(i);
                    }
                    _this.number.map(function(item,index){
                        if(index==inIndex){
                            item.isSel=true;
                        }
                    });
                    break;


                case 180://三不同号-标准
                     len=_this.standard.length;
                    inIndex=parseInt(Math.random()*len);
                    for(var i=0;i<len;i++){
                        inIndexList.push(i);
                    }
                    for(var i=0;i<3;i++){
                        inIndex=parseInt(Math.random()*inIndexList.length);
                        _this.standard[inIndexList[inIndex]].isSel=true;
                        inIndexList.splice(inIndex,1);
                    }
                    break;

                case 181://三不同号-胆拖
                    len=_this.biliarycode.length;
                    inIndex=parseInt(Math.random()*len);
                    for(var i=0;i<len;i++){
                        inIndexList.push(i);
                    }
                    for(var i=0;i<1;i++){
                        inIndex=parseInt(Math.random()*inIndexList.length);
                        _this.biliarycode[inIndexList[inIndex]].isSel=true;
                        inIndexList.splice(inIndex,1);
                    }
                    for(var i=0;i<2;i++){
                        inIndex=parseInt(Math.random()*inIndexList.length);
                        _this.towcode[inIndexList[inIndex]].isSel=true;
                        inIndexList.splice(inIndex,1);
                    }
                    break;
                case 184://二同号-单选
                    len=_this.samenum.length;
                    inIndex=parseInt(Math.random()*len);
                    for(var i=0;i<len;i++){
                        inIndexList.push(i);
                    }
                    for(var i=0;i<1;i++){
                        inIndex=parseInt(Math.random()*inIndexList.length);
                        _this.samenum[inIndexList[inIndex]].isSel=true;
                        inIndexList.splice(inIndex,1);
                    }
                    for(var i=0;i<1;i++){
                        inIndex=parseInt(Math.random()*inIndexList.length);
                        _this.diffnum[inIndexList[inIndex]].isSel=true;
                        inIndexList.splice(inIndex,1);
                    }
                    break;

                case 185://二不同号-标准
                    len=_this.standard.length;
                    inIndex=parseInt(Math.random()*len);  //在标准投注区长度范围内生成一个随机数
                    for(var i=0;i<len;i++){
                        inIndexList.push(i); //标准投注区选项索引
                    }
                    for(var i=0;i<2;i++){ //随机生成2位数
                        inIndex=parseInt(Math.random()*inIndexList.length); //在索引长度内随机生成一个数
                        _this.standard[inIndexList[inIndex]].isSel=true; //
                        inIndexList.splice(inIndex,1);
                    }
                    break;

                case 186://二不同号-胆拖
                    len=_this.biliarycode.length; //脱码的长度
                    inIndex=parseInt(Math.random()*len); //脱码长度内的随机数
                    for(var i=0;i<len;i++){
                        inIndexList.push(i); //脱码选项索引
                    }
                    for(var i=0;i<1;i++){
                        inIndex=parseInt(Math.random()*inIndexList.length);
                        _this.biliarycode[inIndexList[inIndex]].isSel=true;
                        inIndexList.splice(inIndex,1);
                    }
                    for(var i=0;i<1;i++){
                        inIndex=parseInt(Math.random()*inIndexList.length);
                        _this.towcode[inIndexList[inIndex]].isSel=true;
                        inIndexList.splice(inIndex,1);
                    }
                    break;
            }
        },

        //清除当前选择
        //type 0-单注未选 1-单注 2-全部
        clearSelectData: function(type,index) {
            var _this = this,jd= _this.present_playId;
            if(type === 0) {
                for(var i = 0, len = _this.presentAreaList.length; i < len; i++) {
                    if(_this.presentAreaList[i] == 1) {
                        _this[_this.areaNameList[i]].map(function(item) {
                            item.isSel = false;
                        });
                    }
                }
            }else if(type==1){
                _this.BetsList.splice(index,1);
            }else{
                _this.BetsList=[];
            }

            // 重置进度条 反利率 赔率
            //_this.rebateNum = 0;
            //_this.rebate = 0;
            //_this.bet_clear = true;
            if(jd==177){
                //_this.orderOdds =0;
            }else{
                _this.orderOdds = parseFloat(_this.maxPrize).toFixed(3);
            }


            _this.handleBetsCoins();
        },
        //单笔单注奖金限制
        handleCoins: function() {
            this.singleCoins = this.singleCoins.replace(/\D+/g, '');
            if(this.singleCoins && this.singleCoins < 1) {
                this.singleCoins = 1;
            }
            if(this.present_playId == 177) {
            	this.setSpecialSum();
            }
        },

        //追期数限制
        handleChase: function () {
            var num = this.continue_periods;
            if (typeof(num) == "string") {
                num = num.replace(/\D+/g, '');
            }
            if (num && num < 1) {
                num = 1;
            }
            if (num && num > 10) {
                num = 10;
            }
            this.continue_periods = num;
        },

        // 改变返奖率
        changeRebate: function() {
            var _this = this,
                jd = _this.present_playId,
                index,maxList, minList;
            this.rebate = (this.rebateNum * (this.maxReward / 100)).toFixed(1);
            if(jd == 177) {
                _this.orderOdds = "";
				if(!_this.bet_clear){
	                maxList = _this.maxPrize.split("|");
	                minList = _this.minPrize.split("|");
	                for(var i = 0; i < _this.special_indexList.length; i++) {
	                    index = _this.special_indexList[i];
	                    _this.orderOdds += (maxList[index] - ((maxList[index] - minList[index]) / _this.maxReward * _this.rebate)).toFixed(3);
	                    if(i !== _this.special_indexList.length - 1)
	                        _this.orderOdds += "|";
	                }
	                _this.setSpecialSum();
	                return
	           }else{
	           		_this.orderOdds=0;
	           		return;
	           }
            }
            this.orderOdds = (this.maxPrize - ((this.maxPrize - this.minPrize) / this.maxReward * this.rebate)).toFixed(3);
        },

        //订单设置界面确定按钮
        handleConfirm: function () {
            var _this = this, obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]];
            //          if (parseInt(_this.singleCoins) > parseInt(_this.singleMaxSum)&&_this.singleMaxSum) {
            //              mui.toast('单笔投注不可超过' + _this.singleMaxSum, { duration: 'long', type: 'div' })
            //              return;
            //          }
            if(_this.bets==0){
                layui.use('layer',function(){
                    var layer=layui.layer;
                    layer.msg('请根据玩法提示，至少选择一注');
                });
                return
            }
            if (_this.recentBetInfo.betsCount && _this.singleCoins > 0) {
                if(obj.judgeId == 177){
                    for(var i =0;i<_this.bets;i++){
                        betsClauseOne = _this.recentBetInfo.betsClause[0].split(',');
                        oddOne = _this.orderOdds.split('|')[i];
                        _this.BetsList.unshift({
                            type: _this.recentBetInfo.type,
                            betsCount: 1,
                            betsClause: betsClauseOne[i],
                            betsCoins: _this.singleCoins * 1,
                            id3: obj.id3,
                            id2: obj.id2,
                            id1: obj.id1,
                            odds: oddOne,
                            banner: _this.preventBanner,
                            singleCoin: _this.singleCoins,
                            rebate: _this.rebate,
                        });
                    }
                }else{
                    _this.BetsList.unshift({
                        type: _this.recentBetInfo.type,
                        betsCount: _this.bets,
                        betsClause: _this.recentBetInfo.betsClause.join("|"),
                        betsCoins: _this.singleCoins * _this.bets,
                        id3: obj.id3,
                        id2: obj.id2,
                        id1: obj.id1,
                        odds: _this.orderOdds,
                        banner: _this.preventBanner,
                        singleCoin: _this.singleCoins,
                        rebate: _this.rebate,
                    });
                }
                _this.handleBetsCoins();
                //_this.clearSelectData(0);
                _this.rebateNum = 0;
                //存储localstorage
                _this.stopBanner = "";
                _this.singleCoins = '';
            }

        },
        // 统计合计和总注数信息
        handleBetsCoins: function () {
            var _this = this;
            _this.totalBets = 0;
            _this.totalCoins = 0;
            _this.BetsList.map(function (item) {
                _this.totalBets += item.betsCount;
                _this.totalCoins += parseInt(item.betsCoins);
            });
            _this.tempCoins = _this.totalCoins;
            _this.totalCoins = _this.totalCoins * _this.continue_periods;
        },

        //提示框
        //提示框--信息处理和弹出
        tips: function(index) {
            var _this = this;
            if($('.tips').is('.hide')) {
                $('body').css("overflow", "hidden");
            } else {
                $('body').css("overflow", "auto");
            }
            $('.tips').toggleClass('hide');
            _this.timer1 = setInterval(function() {
                _this.tenSecond--;
                if(_this.tenSecond == 0) {
                    _this.tenSecond = 10;
                    clearInterval(_this.timer1);
                    _this.time1 = "";
                    if(index == 1 || index == 3) {
                        location.reload();
                    } else {
                        parent.opendpg('../myCenter/recharge.html');
                        // parent.location.href = "../myCenter/recharge.html";
                    }
                }
            }, 1000);
        },

        //提示框--关闭
        closeTips: function(event, index) {
            var _this = this;
            event = event.currentTarget;
            $(event).parents('.tips').addClass('hide');
            $('body').css("overflow", "auto");
            clearInterval(_this.timer1);
            _this.tenSecond = 10;
            _this.time1 = "";
            switch(index) {
                case 3:
                    _this.clearSelectData();
                    break;
                default:
                    break;
            }
            _this.clearSelectData(2,0);
        },

        // 投注
        handleBets: function () {
            var _this = this, id3 = _this.present_playId, btnArray = ['取消', '确认'], stopBanner = '',userNameMsg = localStorage.userName;

            if(_this.bet_forbid){
                layer.msg('该彩种未开售！');
                return
            }

            if (!userNameMsg) {
                sessionStorage.loginTo = "../ng/ahk3.html";
                // parent.location.href = "../login/login.html";
                parent.opendpg('../login/login.html');
                return
            } else if (_this.isHandleBets) {
                //避免重复投注
                return
            }else if (!_this.totalCoins) {
                _this.tipsContent = {
                    "tzState": "至少选择一注",
                    "showSecond": 1,
                };
                _this.tips(1);
                return
            }else if (!_this.preventBanner || _this.deadlineStr == "数据获取中...") {
                _this.tipsContent = {
                    "tzState": "正在获取当前期数，请稍后。。。",
                    "showSecond": 1,
                };
                _this.tips(1);
                return
            }

            if (_this.pack_coin < _this.totalCoins) {
                _this.tipsContent = {
                    "tzState": "余额不足，请先充值",
                    "showSecond": 2,
                };
                _this.tips(2);
                return;
            } else {
                this.handleChase();
                _this.isHandleBets = true;
                var str = JSON.parse(JSON.stringify(_this.BetsList));
                for (var i = 0; i < str.length; i++) {

                }
                str.map(function (item) {
                    item.banner = _this.preventBanner;
                    delete item.type;//删除属性
                    if (item.judgeId == 107) {
                        item.betsClause = item.betsClause.replace(/[,]/g, "|");
                    } else {
                        item.betsClause = item.betsClause.replace(/[(]/g, "").replace(/[)]/g, "|");
                    }

                });


                var betObjedct = {
                    BetsList: str,
                    chase: this.continue_periods ? this.continue_periods : 1,
                    is: this.after_no
                };

                var test = JSON.stringify(betObjedct);
                var obj = {
                    type: 'post',
                    data: {
                        tzJson: (test)
                    },
                    url: '/authApi/digitalBet',
                    success: function (data) {
                        _this.isHandleBets = false;
                        if (data.code == 200) {

                            $(".success.suc").css({ display: "block" });
                            $(".pay").css({ display: "none" });
                            _this.sucmsg = data.msg;
                            _this.pack_coin = parseFloat(_this.pack_coin - _this.totalCoins).toFixed(2);
                            _this.user_state = "钱包:" + _this.pack_coin + _this.coinUnit + "(可用)";
                            _this.BetsList = [];
                            localStorage.sscBetsList = "";
                            _this.tipsContent = {
                                "tzType": _this.typeName,
                                "tzNum": _this.totalBets,
                                "tzMoney": _this.totalCoins,
                                "lastCoin": _this.pack_coin,
                                "tzState": "投注成功",
                            };
                            _this.tips(1);
                            _this.clearSelectData(2, 0);
                        }else if (data.code == 134) {
                        	 $('body').css('overflow', "hidden");
	                    	layui.use('layer', function () {
				                var layer_confirm = layui.layer;
				                layer_confirm.open({
				                    content: "<div style='padding: 0 80px 0 20px;height: 42px;line-height: 42px;font-size: 14px;'>"+'第' + _this.stopBanner + '期已停止投注,是否投注到最新一期'+"</div>",
				                    area: "500px",
				                    type: 1,
				                    closeBtn: 0,
				                    title: "提示",
				                    btn: ["确定", "取消"],
				                    yes: function () {
				                        layer.closeAll('page');
				                        $('body').css('overflow', "auto");
				                        betObjedct.BetsList.map(function (item) {
											if (item.banner != _this.preventBanner) {
												item.banner = _this.preventBanner
											}
											delete item.type
										});
										_this.stopBanner = _this.preventBanner;
										test = JSON.stringify(betObjedct);
										obj.data = { tzJson: (test) };
										base.callAuthApi(obj);
				                    },
				                    btn2: function () {
				                        $('body').css('overflow', "auto");
				                          _this.isHandleBets = false;
				                    },
				                });
				            });
						}
                        else {
                            _this.tipsContent = {
                                "tzState": data.msg,
                                "showSecond": 1,
                            };
                            _this.tips(1);

                        }
                    }
                };

                if (_this.stopBanner) {
                    layui.use('layer', function () {
                        var layer_confirm = layui.layer;
                        layer_confirm.open({
                            content: "<div style='padding: 0 40px 0 20px;height: 42px;line-height: 42px;font-size: 14px;'>"+'第' + _this.stopBanner + '期已停止投注,是否投注到最新一期'+"</div>",
                            area: "500px",
                            type: 1,
                            closeBtn: 0,
                            title: "提示",
                            btn: ["确定", "取消"],
                            yes: function () {
                                layer.closeAll('page');
                                $('body').css('overflow', "auto");
                                betObjedct.BetsList.map(function (item) {
                                    if (item.banner != _this.preventBanner) {
                                        item.banner = _this.preventBanner
                                    }
                                    delete item.type
                                });
                                _this.stopBanner = _this.preventBanner;
                                test = JSON.stringify(betObjedct);
                                obj.data = { tzJson: (test) };
                                _this.stopBanner = "";
                                base.callAuthApi(obj);
                            },
                            btn2: function () {
                                $('body').css('overflow', "auto");
                                _this.isHandleBets = false;
                            },
                        });
                    });

                    // mui.confirm('第' + _this.stopBanner + '期已停止投注,是否投注到最新一期', '提示', btnArray, function (e) {
                    //     if (e.index == 1) {
                    //         betObjedct.BetsList.map(function (item) {
                    //             if (item.banner != _this.preventBanner) {
                    //                 item.banner = _this.preventBanner
                    //             }
                    //             delete item.type
                    //         })
                    //         _this.stopBanner = _this.preventBanner;
                    //         test = JSON.stringify(betObjedct);
                    //         obj.data = { tzJson: (test) };
                    //         _this.stopBanner = "";
                    //         base.callAuthApi(obj);
                    //     } else {
                    //         _this.isHandleBets = false;
                    //         return;
                    //     }
                    // })

                } else {
                    _this.stopBanner = _this.preventBanner;
                    base.callAuthApi(obj);
                }
            }
        },

        //多赔率单号处理
        setSpecialSum:function(list){
            var _this=this,indexList=[],orderOddsList=_this.maxPrize.split("|");
            _this.special_orderOddsList=[]; //特殊号玩法的赔率数组
            var OddsList = [];
            var indexl=-1;
            if(list){
                _this.orderOdds="";
                _this.special_orderOddsList=[];
                list.map(function (item,index) {
                    indexl+=1;
                    if (item.isSel) {
                        OddsList.push(orderOddsList[index]); //记录投注的赔率
                        _this.special_orderOddsList.push(orderOddsList[index]);//记录赔率的数组
                        indexList.push(indexl);
                    }
                });
                for(var i=0;i<OddsList.length;i++){
                    _this.orderOdds+=OddsList[i]+"|";
                }
                _this.special_indexList = indexList; //赋值索引
                _this.orderOdds=_this.orderOdds.substring(0,_this.orderOdds.length-1); //去掉赔率最后一个|
                if(indexList.length==1){
                    _this.special_sum=parseFloat(_this.singleCoins*_this.special_orderOddsList[0]).toFixed(2)
                    return
                }
            }else{
                _this.special_orderOddsList=_this.orderOdds.split("|");
            }
            _this.special_orderOddsList.sort(function(a,b){return a-b});
            if(_this.special_indexList.length==1){
                _this.special_sum=parseFloat(_this.singleCoins*_this.special_orderOddsList[0]).toFixed(2);
                return
            }
            _this.special_sum=parseFloat(_this.singleCoins*_this.special_orderOddsList[0]).toFixed(2)+"~"+parseFloat(_this.singleCoins*_this.special_orderOddsList[_this.special_orderOddsList.length-1]).toFixed(2);
        },


        //计算数目
        //参数list，依次对应listName,0--不需，1--需要，index为通过计算注数的条件,
        //num为是否进行位数限制(即:严格所选数位置且可为空),0--0(不限制),1--5(5位)
        count_TotalLength: function(list,index, type,num) {
            var listName = ["sumvalue", "generalselect", "number","standard", "biliarycode","towcode", "samenum", "diffnum"],
                rList = [0, 0, 0, 0, 0, 0, 0, 0],
                strList = ["", "", "", "", "", "","",""],
                saveList = [],
                count = 0,
                _this = this,
                id3=_this.present_playId;

            for(var i = 0;i<8;i++) {
                if(list[i] === 1) {
                    rList[i] = _this.totalCountsHandler(_this[listName[i]]); //选中的个数
                    if(rList[i]) {
                        count++;
                        strList[i] = _this.handleAreaSelNum(_this[listName[i]]); //选中的元素
                    }
                }
            }

            _this.bets = 0;
            if(type==0&&count<index){
                return -1;
            }else{
                if(num==0){
                    for (var i=0;i<8;i++) {
                        if(strList[i]){
                            saveList.push(strList[i].join(','));
                        }
                    }
                    _this.handleRecodeInfo(saveList);
                    if(_this.present_playId==177){
                        _this.setSpecialSum(_this.sumvalue);
                    }
                }
                return rList;
            }
        },
        //计算注数
        count_betNumber: function() {
            var _this = this,
                jd = _this.present_playId,
                count,
                rList = [],
                parameter = {},
                // 记录每一个选择区中的数值
                comLen = 0,
                myriabitLen = 0,
                kilobitLen = 0,
                hundredLen = 0,
                decadeLen = 0,
                unitLen = 0,
                // 记录每一个选择区中的选择项
                myriabitSelOpt = [],
                kilobitSelOpt = [],
                hundredSelOpt = [],
                decadeSelOpt = [],
                unitSelOpt = [],
                numArr = [];
            switch(jd) {
                case 177://和值-和值
                    rList = _this.count_TotalLength([1, 0, 0, 0, 0, 0, 0, 0],1,0,0);
                    if(rList == -1){
                        return
                    }else {
                        rList.map(function (item) {
                            _this.bets += item;
                        })
                    }
                    break;
                case 178: //三同号-通选
                    rList = _this.count_TotalLength([0, 1, 0, 0, 0, 0, 0, 0],1,0,0);
                    if(rList == -1){
                        return
                    }else {
                        rList.map(function (item) {
                            _this.bets += item;
                        })
                    }
                    break;
                case 179://三同号-单选
                    rList = _this.count_TotalLength([0, 0, 1, 0, 0, 0, 0, 0],1,0,0);
                    if(rList == -1){
                        return
                    }else {
                        rList.map(function (item) {
                            _this.bets += item;
                        })
                    }
                    break;
                case 180://三不同号-标准
                    rList = _this.count_TotalLength([0, 0, 0, 1, 0, 0, 0, 0],3,1,0);
                    if(rList==-1){
                        return
                    }else{
                        _this.bets = countUtils.getSixGroupDirect(rList[3], 3);
                    }
                    break;
                case 181://三不同号-胆拖
                    rList = _this.count_TotalLength([0, 0, 0, 0, 1, 1, 0, 0],1,1,0);
                    if(rList==-1){
                        return
                    }else if(rList[4]==0||rList[5]==0){
                        return
                    }else{
                        count=0;
                        _this.biliarycode.map(function(item){
                            if(item.isSel){
                                count++;
                            }
                        });
                        if(rList[4]==1){
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 2);
                        }else{
                            _this.bets = rList[5];
                        }
                    }
                    break;
                case 182://三连号-通选
                    rList = _this.count_TotalLength([0, 0, 1, 0, 0, 0, 0, 0],1,0,0);
                    if(rList == -1){
                        return
                    }else {
                        rList.map(function (item) {
                            _this.bets += item;
                        })
                    }
                    break;
                case 183://二同号-复选
                    rList = _this.count_TotalLength([0, 0, 1, 0, 0, 0, 0, 0],1,0,0);
                    if(rList == -1){
                        return
                    }else {
                        rList.map(function (item) {
                            _this.bets += item;
                        })
                    }
                    break;
                case 184://二同号-单选
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 0, 1, 1],1,1,0);
                    if(rList==-1){
                        return
                    }else if(rList[6]==0||rList[7]==0){
                        return
                    }else{
                        count=0;
                        _this.samenum.map(function(item){
                            if(item.isSel){
                                count++;
                            }
                        });
                        _this.bets = rList[6]*rList[7];
                    }
                    break;
                case 185://二不同号-标准
                    rList = _this.count_TotalLength([0, 0, 0, 1, 0, 0, 0, 0],2,1,0);
                    if(rList==-1){
                        return
                    }else{
                        _this.bets = countUtils.getBcGroupMix(rList[3], 2);
                    }
                    break;
                case 186://二不同号-胆拖
                    rList = _this.count_TotalLength([0, 0, 0, 0, 1, 1, 0, 0],1,1,0);
                    if(rList==-1){
                        return
                    }else if(rList[4]==0||rList[5]==0){
                        return
                    }else{
                        count=0;
                        _this.biliarycode.map(function(item){
                            if(item.isSel){
                                count++;
                            }
                        });
                        _this.bets = rList[5];
                    }
                    break;
                default:
                    break;
            }
            _this.recentBetInfo.betsCount = _this.bets;
            _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins
        },
        //走势图跳转
        togoChart:function (id) {
            //(id);
            // if(id==31||id==10||id==26||id==27||id==28||id==29||id==30||id==32||id==31||id==34||id==35||id==36||id==33||id==37||id==40){
            //     window.parent.layui.use('layer',function(){
            //         var layer=window.parent.layui.layer;
            //         layer.msg('暂无走势图，敬请期待!');
            //     });
            // }else{
                localStorage.chartId = id;
                window.location.href ="../ng/trend.html";
            // }

        },
        togoSkip:function(id){
            // localStorage.lottery_img = item.pic_url;	//开奖页面用到图片url
            // localStorage.lottery_url = item.bet_url;	//开奖页面用到投注页面url
            localStorage.lottery_id = id;		//一级玩法id
            localStorage.lottery_name = id;	//一级玩法name
            window.location.href = '../kjgg/lotdetail.html#'+id;

        },

    },
    watch: {
        // 注数变动时投注金额跟随变动
        bets: function (val) {
            this.coin = val * 2;
        },
        //追期数
        continue_periods: function (val) {
            var _this =this;
            if(this.tempCoins){
                if (val != 0 && !isNaN(val)) {
                    this.totalCoins = val * this.tempCoins;
                    if(val==1){
                    	_this.after_no=0;
                    }
                } else {
                    this.totalCoins = this.tempCoins;
                    _this.after_no=0;
                }
            }
        },
        // 监听用户选择的项并计算注数
        //和值选择项管理对象
        sumvalue: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //通选选择项管理对象
        generalselect: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //号码选择项管理对象
        number: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //标准选择项管理对象
        standard: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //胆码
        biliarycode: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //拖码选择项管理对象
        towcode: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //同号选择项管理对象
        samenum: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //不同号选择项管理对象
        diffnum: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        }
    },
});