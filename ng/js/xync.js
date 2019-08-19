$(function () {
    $(document).attr('title',cqssc.typeName);
    // 点击玩法选择界面的某一个选项时切换到改选项下
    $(".play_choice .tab").on("click", "li", function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        $(".playList ul").children("li").css({ display: "none" });
        $(".playList ul").children("li").eq($(this).index()).css({ display: "block" });
        $(".playList li:visible").find(".radio_group.active").removeClass("active");
        $(".playList li:visible").find(".radio_group:first").addClass("active");
    });

    // 控制机选注数控制菜单的显示隐藏
    $(".btnList").on("mouseenter",".draw_menu", function () {
        $(this).children("ul").css({ "display": "block" })
    });
    $(".btnList").on("mouseleave",".draw_menu", function () {
        $(this).children("ul").css({ "display": "none" })
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

    //

});
let cqssc = new Vue({
    el: "#cqssc-container",
    data: {
        //一级玩法
        oneTypeId:'',
        code:'kl10f',
        presentNum:'',
        //当前期数
        preventBanner: "",
        //截止时间
        deadlineStr: "",
        hundMal: 1,

        //收藏
        isCollect: 0,

        recentlyNum: 1,
        parentIndex: 0,
        playExplain: "",

        //储存接受的数据
        menu: [],
        //当前的数字列(默认为定位胆的0~9)
        numberList: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
        //区域名数组
        areaNameList :["myriabit", "kilobit", "hundreds", "numberArr","numberArr"],
        //
        nl: [
            ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
            ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
        ],

        typeName:'',
        pic_url:'',

        // common共用区域选值
        numberArr: [],
        //万位选择项管理对象
        myriabit: [],
        //千位选择项管理对象
        kilobit: [],
        //百位选择项管理对象
        hundreds: [],
        //十位选择项管理对象

        //控制显示的数字数列区域，0为不显示                                                                                                        
        presentAreaList: [0,0,0,0,0],

        //控制机选的数字列表
        ranNumList:[1,1,1,1,1],

        //存储当前的下标
        presentIndexList:[0,0],

        //单笔注数
        bets:0,

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
		testNumber: [10, 50, 100, 200, 500, 1000, 5000, 10000, 50000],

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


        firstArea_title:"",
        secondArea_title:"",
        thirdArea_title:"",
        commonArea_title:"",

        present_title:"",
        present_playId: 161,

        //暂未开售禁止投注
        bet_forbid: false,

        //玩法判断
        judgeList: {

            //选一--数投
            one_number: {
                judgeId: 161,
                code3:'kl10f_x1_st',
            },
            // 选一-红投
            one_red_cast: {
                judgeId: 162,
                code3:'kl10f_x1_ht',
            },
            //选二--任选二
            two_choose: {
                judgeId: 163,
                code3:'kl10f_x2_rx2',
            },
            //选二--任选胆拖
            two_optional_dantuo: {
                judgeId: 164,
                code3:'kl10f_x2_rxdt',
            },
            //选二--连组
            two_even_the_group: {
                judgeId: 165,
                code3: 'kl10f_x2_lZu',
            },
            //选二--连组胆拖
            two_even_dantuo_group: {
                judgeId: 166,
                code3:'kl10f_x2_lzuDt',
            },
            //选二--连直
            two_even_straight: {
                judgeId: 167,
                code3:'kl10f_x2_lz',
            },
            //选三--任选三
            three_choose: {
                judgeId: 168,
                code3:'kl10f_x3_rx3',
            },
            //选三--任选胆拖
            three_optional_dantuo: {
                judgeId: 169,
                code3:'kl10f_x3_rxdt',
            },
            //选三--前组
            three_even_the_group: {
                judgeId: 170,
                code3:'kl10f_x3_qZu',
            },
            //选三--前组胆拖
            three_even_dantuo_group: {
                judgeId: 171,
                code3:'kl10f_x3_qZudt',
            },
            //选三--前直
            three_straight_forward: {
                judgeId: 172,
                code3:'kl10f_x3_qz',
            },
            //选四--任选四
            four_choose: {
                judgeId: 173,
                code3:'kl10f_x4_rx4',
            },
            //选四--任选胆拖
            four_optional_dantuo: {
                judgeId: 174,
                code3:'kl10f_x4_rxdt',
            },
            //选五--任选五
            five_choose: {
                judgeId: 175,
                code3:'kl10f_x5_rx5',
            },
            //选五--任选胆拖
            five_optional_dantuo: {
                judgeId: 176,
                code3:'kl10f_x5_rxdt',
            },

            selectall: true,
        },

        randomList:[],

        //上期期数
        previousIssue:'',
        previousIssue_tips:'',
        userName: localStorage.userName,
        show_dd: false
    },
    created: function () {

        this.getSearchValue();
        this.getHistoryBannerInfo();
        this.getBetsBannerInfo();
        this.getBetsType();
        if (localStorage.userName) {
            this.get_userState();
        }
        this.isCollect = localStorage.collectGame && JSON.parse(localStorage.collectGame).collectList[this.oneTypeId] ? 1 : 0;

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
                window.location.search = '?10';
            }
        },
        //判断某个元素是否存在某个数组中
        isInArray:function(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (parseInt(arr[i]) === obj) {
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
        getHistoryBannerInfo: function () {
            var _this = this,
                obj = {
                    type: "post",
                    url: '/commonAPI/hisOpenData',
                    data: {
                        one_type_id: _this.oneTypeId,
                        count: 5
                    },
                    success: function (data) {
                        if (data.code == 200 && data.body && data.body.length != 0) {
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
                        } else {
                            _this.recentlyNum=[];
                        }
                    },
                    error: function (res) {

                    }
                };
            base.callCommonApi(obj);
        },
        // 获取当前可投注期次信息
        getBetsBannerInfo: function () {
            var _this = this,
                obj = {
                    type: "post",
                    // type:'post',
                    url: '/commonAPI/getIssueInfo',
                    data: {
                        one_type_id:_this.oneTypeId
                    },
                    success: function (data) {
                        if (_this.deadlineTiming){
                            window.clearInterval(_this.deadlineTiming);
                            _this.deadlineTiming="";
                        }
                        if (data.code == 200 && data.body) {
                            if (!data.body.deadline) {
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
                            //if (_this.oneTypeId == 26) {
                              //  _this.lastTime = _this.getMilliseconds(data.body.deadline) + 100000;
                            //} else {
                                _this.lastTime = _this.getMilliseconds(data.body.deadline);
                            //}
                            _this.startTime = _this.getMilliseconds(data.body.response_date);

                            _this.countdown(_this.lastTime,_this.startTime);
                            _this.deadlineTiming = setInterval(function () {
                                _this.startTime+=1000;
                                _this.countdown(_this.lastTime,_this.startTime);
                            }, 1000);
//                          setTimeout(function () { _this.getHistoryBannerInfo(); }, 120000);
                        } else if (data.code == 201) {
                            _this.bet_forbid= true;
                            _this.preventBanner = "";
                            _this.deadlineStr = data.msg;
                        }else {
                             _this.preventBanner = "";
                        _this.deadlineStr = "暂停销售";
                        }
                    },
                    error: function (res) {

                    }
                };
            base.callCommonApi(obj);
        },
//      // 获取系统配置投注项
//      getBetsType: function () {
//          var _this = this;
//          var oneTypeArr = [];
//          var obj = {
//              type: "post",
//              // type: 'post',
//              url: '/commonAPI/qryGamePlayInfo',
//              data: {
//                  one_type_id: 10
//              },
//              success: function (data) {
//                  if (data.code == 200 && data.body) {
//                      var objList;
//                      // 第一遍遍历添加一级玩法
//                      data.body.map(function (item) {
//                          objList = _this.judgeNumberList(item.id3);
//                          item.areaList = objList.areaList;
//                          item.numList = objList.numList;
//                          if (!oneTypeArr.some(function (items) {
//                              return items == item.name2
//                          })) {
//                              oneTypeArr.push(item.name2);
//                              _this.menu.push({
//                                  oneType: item.name2,
//                                  twoType: [item]
//                              })
//                          } else {
//                              var index = oneTypeArr.indexOf(item.name2);
//                              _this.menu[index].twoType.push(item);
//                          }
//                      })
//                      _this.switchover_play(0, 0);
//                  } else {
//                  }
//              },
//              error: function (res) {
//
//              }
//          }
//          base.callCommonApi(obj);
//      },
// 获取系统配置投注项
        getBetsType: function () {
            var _this = this,
                obj = {
                    type: "post",
                    // type: 'post',
                    url: '/commonAPI/qryGamePlayInfo',
                    data: {
                        one_type_id: _this.oneTypeId
                    },
                    success: function (data) {
                        if (data.code == 200 && data.body) {
                            _this.initializeBetsTypeData(data.body)
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
            _this.orderOdds = _this.maxPrize;
            _this.typeName = data[0].name1;
            _this.pic_url = data[0].pic_url;
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
                _this.menu.map(function (outItem) {
                    outItem.twoType.map(function (inItem) {
                        if (inItem.max_prize.indexOf('|') != -1) {
                            var maxList = inItem.max_prize.split('|'), minList = inItem.min_prize.split('|'), val = "";
                            maxList.map(function (inItems, index) {
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
                var getUserInfo = {
                        type: "post",
                        url: "/authApi/AutoLoginGetUserinfoByRedis",
                        async: false,
                        data: {
                            "username": localStorage.getItem("userName")
                        },
                        success: function success(data) {
                            if (data.code == 200) {
                                that.pack_coin = (parseFloat(data.body.COIN)).toFixed(2)
                                that.user_state = "钱包:" + that.pack_coin + that.coinUnit + "(可用)";
                            } else {
                                localStorage.loginTo = "../ng/xync.html";
                                parent.opendpg('../login/login.html');
                                // location.href = "../../loginIn/login.html";
                            }
                        }
                    }
                    ,
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
                base.callAuthApi(getUserInfo);
            }
        },
        // 获取毫秒数
        getMilliseconds: function (str) {
            str = str.replace(new RegExp("-", "gm"), "/");
            return (new Date(str)).getTime(); //得到毫秒数
        },
        //补0
        getzf: function (num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },
        //时间倒计时
        countdown: function (lastTime,startTime) {
            var _this = this,
                deadlineT = lastTime - startTime,
                deadline_hour = _this.getzf(Math.floor(deadlineT / 1000 / 60 / 60)),
                deadline_minute = _this.getzf(Math.floor(deadlineT / 1000 / 60 % 60)),
                deadline_second = _this.getzf(Math.floor(deadlineT / 1000 % 60));
            if (deadlineT >= 0) {
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
        //areaList
        judgeNumberList: function (jd) {
            var numList, areaList;
            switch (jd) {
                case 161://选一-数投
                    areaList = [3];
                    break;
                case 162://选-红投
                    areaList = [4];
                    break;
                case 163://选二-任选二
                case 165://选二-连组
                case 168://选三-任选三
                case 170://选三-前组
                case 173://选四-任选四
                case 175://选五-任选五
                    areaList = [0];
                    break;
                case 164://选二-任选胆拖
                case 166://选二-连组胆拖
                case 167://连直
                case 169://选三-任选胆拖
                case 171://选三-前组胆拖
                case 174://选四-任选胆拖
                case 176://选五-任选胆拖
                    areaList = [0,1];
                    break;
                case 172://选三-前直
                    areaList = [0,1,2];
                    break;
                default:
                    areaList = [0];
                    break;
            }
            switch (jd) {
                case 161://选一-数投
                    numList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
                    break;
                case 162://选-红投
                    numList = ["19", "20"];
                    break;
                case 165://选二-任选二
                case 164://选二-连组
                case 168://选三-任选三
                case 170://选三-前组
                case 173://选四-任选四
                case 175://选五-任选五
                case 163://选二-任选胆拖
                case 166://选二-连组胆拖
                case 167://连直
                case 169://选三-任选胆拖
                case 171://选三-前组胆拖
                case 174://选四-任选胆拖
                case 176://选五-任选胆拖
                case 172://选三-前直
                    numList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
                    break;
                default:
                    numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                    break;
            }
            return {
                numList: numList, areaList: areaList
            }
        },


        //切换玩法
        //参数为外层的下标和内层下标
        switchover_play: function (oi, ii) {
            var _this = this, obj = _this.menu[oi].twoType[ii], numList = obj.numList;
            _this.presentIndexList=[oi,ii];
            _this.game_tips = obj.game_tips;

            //赔率初始化
            _this.maxPrize = obj.max_prize;
            _this.minPrize = obj.min_prize;
            _this.maxReward = obj.max_reward;
            _this.orderOdds = parseFloat(obj.max_prize).toFixed(3);
            _this.rebateNum=0;
            _this.rebate=0;
            //显示的title和id3记录
            _this.present_title=obj.name2+"-"+obj.name3;
            _this.present_playId=obj.judgeId;

            _this.clearSelectData(0);

            //初始化区域块
            _this.initialize_areaList(obj.areaList, obj.numList);
            //初始化相关 万千百十个的玩法
//          _this.initialize_areaNum();
            var jd = _this.present_playId;
            switch (jd) {
                case 163://选二-任选二
                case 168://选三-任选三
                case 173://选四-任选四
                case 175://选五-任选五
                    _this.firstArea_title = "任选";
                    break;
                case 165://选二-连组
                    _this.firstArea_title = "连组";
                    break;
                case 170://选三-前组
                    _this.firstArea_title = "前组";
                    break;
                case 167://连直
                    _this.firstArea_title = "前位";
                    _this.secondArea_title = "后位";
                    break;
                case 164://选二-任选胆拖
                case 166://选二-连组胆拖
                case 169://选三-任选胆拖
                case 171://选三-前组胆拖
                case 174://选四-任选胆拖
                case 176://选五-任选胆拖
                    _this.firstArea_title = "胆码";
                    _this.secondArea_title = "拖码";
                    break;
                case 172://选三-前直
                    _this.firstArea_title = "第一位";
                    _this.secondArea_title = "第二位";
                    _this.thirdArea_title = "第三位";
                    break;
                default:
                    break;
            }


            // 初始化随机选项
            switch (jd){
                case 163:
                case 165:
                    _this.ranNumList[0] = 2;
                    _this.randomList =[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
                    _this.selectall = true;
                    break;
                case 164:
                case 166:
                    _this.ranNumList[0] = 1;
                    _this.randomList=[1];
                    _this.selectall = false;
                    break;
                case 168:
                    _this.ranNumList[0] = 3;
                    _this.randomList =[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
                    _this.selectall = true;
                    break;
                case 169:
                case 171:
                    _this.ranNumList[0] = 1;
                    _this.randomList =[1,2];
                    _this.selectall = false;
                    break;
                case 170:
                    _this.ranNumList[0] = 3;
                    _this.randomList =[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
                    _this.selectall = true;
                    break;
                case 173:
                    _this.ranNumList[0] = 4;
                    _this.randomList =[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
                    _this.selectall = true;
                    break;
                case 174:
                    _this.ranNumList[0] = 1;
                    _this.randomList =[1,2,3];
                    _this.selectall = false;
                    break;
                case 175:
                    _this.ranNumList[0] = 5;
                    _this.randomList =[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
                    _this.selectall = true;
                    break;
                case 176:
                    _this.ranNumList[0] = 1;
                    _this.randomList =[1,2,3,4];
                    _this.selectall = false;
                    break;
                default:
                    _this.ranNumList[0] = 1;
                    _this.ranNumList[1] = 1;
                    _this.ranNumList[2] = 1;
                    _this.ranNumList[3] = 1;
                    _this.randomList =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
                    _this.selectall = true;
                    break;
            }
        },
        //初始化--区域
        initialize_areaList: function (areaList, numList) {
            var _this = this, nameList = ["myriabit", "kilobit", "hundreds", "numberArr","numberArr"];
            _this.presentAreaList= [0, 0, 0, 0, 0, 0];
            for (var i = 0, len = areaList.length; i < len; i++) {
                _this[nameList[areaList[i]]] = [];
                numList.map(function (item) {
                    _this[nameList[areaList[i]]].push({ 'num': item, isSel: false })
                });
                Vue.set(_this.presentAreaList, areaList[i],1);
            }
            //设置左边
        },
        // 统计对象中选中的元素个数
        totalCountsHandler: function (opt) {
            var count = 0;
            opt.map(function (item) {
                if (item.isSel) {
                    count++;
                }
            });
            return count;
        },
        // 统计某一个选择区中的选中项的值 传递选择区的管理对象
        handleAreaSelNum: function (opt) {
            var tempArr = [];
            opt.map(function (item) {
                if (item.isSel) {
                    tempArr.push(item.num);
                }
            })
            return tempArr;
        },
        // 将投注信息记录到当前投注信息记录对象中  传递一个用户选择项的数组,一维字符串数组
        handleRecodeInfo: function (seloptArr) {
            var _this = this, obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]];
            _this.recentBetInfo = {};
            _this.recentBetInfo.type = obj.name2+"-"+obj.name3;
            //          _this.recentBetInfo.betsCount = _this.bets;
            _this.recentBetInfo.betsClause = [];
            seloptArr.map(function (item) {
                _this.recentBetInfo.betsClause.push(item);
            })
            //          _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins
        },
        //机选元素个数选择
        changeRandomNum:function(index,num){
            var _this=this;
            _this.bet_clear = false;
            Vue.set(_this.ranNumList,index,num);
            $(".draw_menu ul").css("display","none");
        },

        //机选事件--单区域
        //参数index对应区域块，type 0-机选 1-全选
        randomNum:function(index,type){

            var _this=this,numList=_this.numberList.slice(0);
            _this.bet_clear = false;
            var jd = _this.present_playId;
            if(jd ==162){
                numList=[1,2]
            }
            if(type==1){
                // if(_this.presentAreaList[3] == 1){
                    _this[_this.areaNameList[index]].map(function(item){
                        item.isSel=true;
                    });

                // }

            }else{
                _this[_this.areaNameList[index]].map(function (item) {
                    item.isSel = false;
                });

                for (var i = 0, len = _this.ranNumList[index];i<len;i++){
                    var ranNum=parseInt(Math.random()*numList.length);
                    var num = parseInt([numList[ranNum]]-1);
                    _this[_this.areaNameList[index]][num].isSel=true;
                    numList.splice(ranNum,1);
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
                listName = ["myriabit", "kilobit", "hundreds", "numberArr","numberArr"],
                outIndex = parseInt(Math.random() * 10),
                inIndex = parseInt(Math.random() * 20),
                outIndexList = [],
                inIndexList = [],
                jd = _this.present_playId;
            for(var i = 0; i < 20; i++) {
                inIndexList.push(i);
            }
            switch(jd) {
                case 161: //选一-数投
                case 162: //选一-红投
                    inIndex = parseInt(Math.random() * _this.numberArr.length);
                    _this.numberArr.map(function(item, index) {
                        if(index == inIndex) {
                            item.isSel = true;
                        }
                    });
                    break;
                case 163: //选二-任选二
                case 165: //选二-连组
                    var rxOutIndex, isHas = false,
                        len = _this.myriabit.length;
                    for(var j = 0; j < 2; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * len);
                            for(var i = 0; i < outIndexList.length; i++) {
                                if(outIndexList[i] == rxOutIndex) {
                                    isHas = true
                                }
                            }
                        } while (isHas)
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i = 0; i < outIndexList.length; i++) {
                        _this.myriabit.map(function(item, index) {
                            if(index == outIndexList[i]) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 164: //选二-任选胆拖
                case 166: //选二-连组胆拖
                    for(var i = 0; i < 1; i++) {
                        inIndex = parseInt(Math.random() * inIndexList.length);
                        _this.myriabit[inIndexList[inIndex]].isSel = true;
                        inIndexList.splice(inIndex, 1);
                    }
                    for(var i = 0; i < 1; i++) {
                        inIndex = parseInt(Math.random() * inIndexList.length);
                        _this.kilobit[inIndexList[inIndex]].isSel = true;
                        inIndexList.splice(inIndex, 1);
                    }
                    break;
                case 167: //选二-连直
                    for(var i = 0; i < 2; i++) {
                        inIndex = parseInt(Math.random() * _this.numberArr.length);
                        _this[listName[i]].map(function(item, index) {
                            if(index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 168: //选三-任选三
                case 170: //选三-前组
                    var rxOutIndex, isHas = false,
                        len = _this.myriabit.length;
                    for(var j = 0; j < 3; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * len);
                            for(var i = 0; i < outIndexList.length; i++) {
                                if(outIndexList[i] == rxOutIndex) {
                                    isHas = true
                                }
                            }
                        } while (isHas)
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i = 0; i < outIndexList.length; i++) {
                        _this.myriabit.map(function(item, index) {
                            if(index == outIndexList[i]) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 169: //选三-任选胆拖
                case 171: //选三-前组胆拖
                    for(var i = 0; i < 1; i++) {
                        inIndex = parseInt(Math.random() * inIndexList.length);
                        _this.myriabit[inIndexList[inIndex]].isSel = true;
                        inIndexList.splice(inIndex, 1);
                    }
                    for(var i = 0; i < 2; i++) {
                        inIndex = parseInt(Math.random() * inIndexList.length);
                        _this.kilobit[inIndexList[inIndex]].isSel = true;
                        inIndexList.splice(inIndex, 1);
                    }
                    break;
                case 172: //选三-前直
                    for(var i = 0; i < 3; i++) {
                        inIndex = parseInt(Math.random() * _this.numberArr.length);
                        _this[listName[i]].map(function(item, index) {
                            if(index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 173: //前四-任选四
                    var rxOutIndex, isHas = false,
                        len = _this.myriabit.length;
                    for(var j = 0; j < 4; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * len);
                            for(var i = 0; i < outIndexList.length; i++) {
                                if(outIndexList[i] == rxOutIndex) {
                                    isHas = true
                                }
                            }
                        } while (isHas)
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i = 0; i < outIndexList.length; i++) {
                        _this.myriabit.map(function(item, index) {
                            if(index == outIndexList[i]) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 174: //前四-任选胆拖
                    for(var i = 0; i < 1; i++) {
                        inIndex = parseInt(Math.random() * inIndexList.length);
                        _this.myriabit[inIndexList[inIndex]].isSel = true;
                        inIndexList.splice(inIndex, 1);
                    }
                    for(var i = 0; i < 3; i++) {
                        inIndex = parseInt(Math.random() * inIndexList.length);
                        _this.kilobit[inIndexList[inIndex]].isSel = true;
                        inIndexList.splice(inIndex, 1);
                    }
                    break;
                case 175: //前五-任选五
                    var rxOutIndex, isHas = false,
                        len = _this.myriabit.length;
                    for(var j = 0; j < 5; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * len);
                            for(var i = 0; i < outIndexList.length; i++) {
                                if(outIndexList[i] == rxOutIndex) {
                                    isHas = true
                                }
                            }
                        } while (isHas)
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i = 0; i < outIndexList.length; i++) {
                        _this.myriabit.map(function(item, index) {
                            if(index == outIndexList[i]) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 176: //前五-任选胆拖
                    for(var i = 0; i < 1; i++) {
                        inIndex = parseInt(Math.random() * inIndexList.length);
                        _this.myriabit[inIndexList[inIndex]].isSel = true;
                        inIndexList.splice(inIndex, 1);
                    }
                    for(var i = 0; i < 4; i++) {
                        inIndex = parseInt(Math.random() * inIndexList.length);
                        _this.kilobit[inIndexList[inIndex]].isSel = true;
                        inIndexList.splice(inIndex, 1);
                    }
                    break;
            }
        },
        //清除当前选择
        //type 0-单注未选 1-单注 2-全部
        clearSelectData:function(type,index){
            var _this=this;
            _this.bet_clear = true;
            if(type===0){
                for (var i = 0, len = _this.presentAreaList.length;i<len;i++){
                    if (_this.presentAreaList[i]==1){
                        if(_this.present_playId==107){
                            _this[_this.areaNameList[i]].map(function (item) {
                                item.isSel = false;
                                item.isSel0=false;
                            });
                        }else{
                            _this[_this.areaNameList[i]].map(function(item){
                                item.isSel=false;
                            });
                        }

                    }
                }
                _this.recentBetInfo={};
            }else if(type==1){
                _this.BetsList.splice(index,1);
            }else{
                _this.BetsList=[];
            }
            _this.handleBetsCoins();
        },
        //单笔单注奖金限制
        handleCoins: function () {
            this.singleCoins = this.singleCoins.replace(/\D+/g, '');
            if (this.singleCoins && this.singleCoins < 1) {
                this.singleCoins = 1;
            }
            if (this.present_playId == 61 || this.present_playId == 71) {
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
        changeRebate: function () {
            var _this = this, jd = _this.present_playId, maxList, minList;
            this.rebate = (this.rebateNum * (this.maxReward / 100)).toFixed(1);
            if (jd == 61 || jd == 71) {
                _this.orderOdds = "";
				if(!_this.bet_clear){
	                maxList = _this.maxPrize.split("|");
	                minList = _this.minPrize.split("|");
	                for (var i = 0; i < _this.special_indexList.length; i++) {
	                    var index = _this.special_indexList[i];
	                    _this.orderOdds += (maxList[index] - ((maxList[index] - minList[index]) / _this.maxReward * _this.rebate)).toFixed(3);
	                    if (i !== _this.special_indexList.length - 1)
	                        _this.orderOdds += "|";
	                }
	                _this.setSpecialSum();
	                return
	           }else{
	           		_this.orderOdds = 0;
	           		return;
	           }
            }
            this.orderOdds = (this.maxPrize - ((this.maxPrize - this.minPrize) / this.maxReward * this.rebate)).toFixed(3);
        },

        //订单设置界面确定按钮
        handleConfirm: function () {
            var _this = this, obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]], numList, oddList, jd = _this.present_playId;
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
                var obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]], numList = obj.numList;
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

                //赔率初始化
                _this.maxPrize = obj.max_prize;
                _this.minPrize = obj.min_prize;
                _this.maxReward = obj.max_reward;
                _this.orderOdds = parseFloat(obj.max_prize).toFixed(3);
                _this.rebateNum = 0;
                _this.rebate = 0;

                _this.handleBetsCoins();
                _this.clearSelectData(0);
                //存储localstorage
                _this.stopBanner = "";
                _this.singleCoins = 2;

        },
        // 统计合计和总注数信息
        handleBetsCoins: function () {
            var _this = this;
            _this.totalBets = 0;
            _this.totalCoins = 0;
            _this.BetsList.map(function (item) {
                _this.totalBets += item.betsCount;
                _this.totalCoins += parseInt(item.betsCoins);
            })
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
                sessionStorage.loginTo = "../ng/xync.html";
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
                    delete item.type;
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
                    mui.confirm('第' + _this.stopBanner + '期已停止投注,是否投注到最新一期', '提示', btnArray, function (e) {
                        if (e.index == 1) {
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
                        } else {
                            _this.isHandleBets = false;
                            return;
                        }
                    })
                } else {
                    _this.stopBanner = _this.preventBanner;
                    base.callAuthApi(obj);
                }
            }
        },


        // 点击元素时给元素加上选中的类  可能还要在这里调用自动计算注数的方法
        handleAddClass: function(item, index, type) {
            var _this = this,
                jd = _this.present_playId,
                count = 0,
                nameList = ['myriabit', 'kilobit', 'hundreds', "numberArr"];
            //      		item.isSel = !item.isSel;
            switch(jd) {
                case 164: //选二-任选胆拖
                case 166: //选二-连组胆拖
                    _this.myriabit.map(function(item) {
                        if(item.isSel) {
                            count++
                        }
                    });
                    if(count == 1 && type == 0) {
                        for(var i = 0, len = _this.myriabit.length; i < len; i++) {
                            var obj = _this.myriabit[i].isSel;
                            if(obj) {
                                _this.myriabit[i].isSel = false;
                                break;
                            }
                        }
                    }
                    if(type == 1 && _this.myriabit[index].isSel && !_this.kilobit[index].isSel) {
                        _this.myriabit[index].isSel = false;
                        _this.kilobit[index].isSel = true;
                    } else if(type == 0 && !_this.myriabit[index].isSel && _this.kilobit[index].isSel) {
                        _this.kilobit[index].isSel = false;
                        _this.myriabit[index].isSel = true;
                    } else {
                        item.isSel = !item.isSel;
                    }
                    break;
                case 169: //选三-任选胆拖
                case 171: //选三-前组胆拖
                    _this.myriabit.map(function(item) {
                        if(item.isSel) {
                            count++
                        }
                    });
                    if(count == 2 && type == 0) {
                        for(var i = 0, len = _this.myriabit.length; i < len; i++) {
                            var obj = _this.myriabit[i].isSel;
                            if(obj) {
                                _this.myriabit[i].isSel = false;
                                break;
                            }
                        }
                    }
                    if(type == 1 && _this.myriabit[index].isSel && !_this.kilobit[index].isSel) {
                        _this.myriabit[index].isSel = false;
                        _this.kilobit[index].isSel = true;
                    } else if(type == 0 && !_this.myriabit[index].isSel && _this.kilobit[index].isSel) {
                        _this.kilobit[index].isSel = false;
                        _this.myriabit[index].isSel = true;
                    } else {
                        item.isSel = !item.isSel;
                    }
                    break;
                case 174: //选四-任选胆拖
                    _this.myriabit.map(function(item) {
                        if(item.isSel) {
                            count++
                        }
                    })
                    if(count == 3 && type == 0) {
                        for(var i = 0, len = _this.myriabit.length; i < len; i++) {
                            var obj = _this.myriabit[i].isSel;
                            if(obj) {
                                _this.myriabit[i].isSel = false;
                                break;
                            }
                        }
                    }
                    if(type == 1 && _this.myriabit[index].isSel && !_this.kilobit[index].isSel) {
                        _this.myriabit[index].isSel = false;
                        _this.kilobit[index].isSel = true;
                    } else if(type == 0 && !_this.myriabit[index].isSel && _this.kilobit[index].isSel) {
                        _this.kilobit[index].isSel = false;
                        _this.myriabit[index].isSel = true;
                    } else {
                        item.isSel = !item.isSel;
                    }
                    break;
                case 176: //选五-任选五
                    _this.myriabit.map(function(item) {
                        if(item.isSel) {
                            count++
                        }
                    })
                    if(count == 4 && type == 0) {
                        for(var i = 0, len = _this.myriabit.length; i < len; i++) {
                            var obj = _this.myriabit[i].isSel;
                            if(obj) {
                                _this.myriabit[i].isSel = false;
                                break;
                            }
                        }
                    }
                    if(type == 1 && _this.myriabit[index].isSel && !_this.kilobit[index].isSel) {
                        _this.myriabit[index].isSel = false;
                        _this.kilobit[index].isSel = true;
                    } else if(type == 0 && !_this.myriabit[index].isSel && _this.kilobit[index].isSel) {
                        _this.kilobit[index].isSel = false;
                        _this.myriabit[index].isSel = true;
                    } else {
                        item.isSel = !item.isSel;
                    }
                    break;
                default:
                    item.isSel = !item.isSel;
                    return;
                    break;
            }
        },
        //计算数目
        //参数list，依次对应listName,0--不需，1--需要，index为通过计算注数的条件,
        //num为是否进行位数限制(即:严格所选数位置且可为空),0--0(不限制),1--5(5位)
        count_TotalLength: function (list, index, type, num) {
            var listName = ["myriabit", "kilobit", "hundreds", "numberArr"],
                rList = [0, 0, 0, 0],
                strList = ["", "", "", ""],
                saveList = [],
                count = 0,
                _this = this;
            for (var i = 0; i < 6; i++) {
                if (list[i] === 1) {
                    rList[i] = _this.totalCountsHandler(_this[listName[i]]); //选中的个数
                    if (rList[i]) {
                        count++;
                        strList[i] = _this.handleAreaSelNum(_this[listName[i]]); //选中的元素
                    }
                }

            }
            _this.bets = 0;
            if (type == 1 && strList[5] < index) {
                return -1
            }
            if (type == 0 && count < index) {
                return -1;
            } else {
                if (num == 0) {
                    for (var i = 0; i < 6; i++) {
                        if (strList[i]) {
                            saveList.push(strList[i].join(','));
                        }
                    }
                    _this.handleRecodeInfo(saveList);
                } else if (num == 1) {
                    for (var i = 0; i < 5; i++) {
                        if (strList[i]) {
                            saveList.push(strList[i].join(','));
                        } else {
                            saveList.push("")
                        }
                    }
                    _this.handleRecodeInfo(saveList);
                }

                return rList;
            }

        },
        //计算注数冠亚和
        count_noRepeat: function (list, num) {
            var listName =["myriabit", "kilobit", "hundreds", "numberArr","numberArr"],
                _this = this,
                contrastList = [],
                countList = [],
                returnCount, numLen = 0,
                secondCountList = [],
                count = 0,
                isNeed = true;
            for (var i = 0, j = 0; i < listName.length; i++) {
                if (list[i] == 1) {
                    countList.push(0);
                    _this[listName[i]].map(function (item, index) {
                        if (item.isSel) {
                            contrastList.push(1);
                            countList[j]++;
                        } else {
                            contrastList.push(0);
                        }
                    });

                    if (countList[i] == 0) {
                        isNeed = false;
                    }
                    if (numLen == 0) {
                        numLen = _this[listName[i]].length;
                    }
                    j++;
                }
            }

            if (!isNeed) {
                return 0;
            } else {
                var second = 0;
                for (var m = 0, len = contrastList.length; m < numLen; m++) {

                    var secondlist = 0;
                    if (contrastList[m] == contrastList[m + numLen] && contrastList[m + numLen] == contrastList[m + 2 * numLen] && contrastList[m] == 1) {
                        second -= 1;
                    }
                    if (contrastList[m] == 1) {
                        for (var j = numLen; j < 2 * numLen; j++) {
                            var k = numLen,
                                secondCount = 0;
                            if (contrastList[j] == 1 && contrastList[j + numLen] !== 1 && j == m + numLen) {
                                secondCount += countList[2];
                            } else if (contrastList[j + numLen] == 1 && contrastList[j] !== 1 && j == m + numLen) {
                                secondCount += countList[1];
                            } else if (((contrastList[j] == contrastList[j + k] || j == m + numLen) && contrastList[j] == 1)) {
                                secondCount++;
                            }
                            secondlist += secondCount;
                            second += secondCount;
                        }
                    }
                    secondCountList.push(secondlist);
                }
                for (var i = 0; i < numLen; i++) {
                    if (contrastList[i]) {
                        var checkList = [],
                            countNumber = 1;
                        for (var j = 0; j < countList.length; j++) {
                            checkList.push(contrastList[j * numLen + i]);
                        }
                        returnCount = _this.isSameNumber(checkList);

                        switch (returnCount[0]) {
                            case 0:
                                if (num == 2) {
                                    for (var m = 1; m < countList.length; m++) {
                                        countNumber *= countList[m];
                                    }

                                } else {
                                    for (var m = 1; m < countList.length; m++) {
                                        countNumber *= countList[m];
                                    }
                                }

                                break;
                            case 1:
                                if (num == 2) {
                                    for (var m = 1; m < countList.length; m++) {
                                        countNumber *= countList[m] - 1;
                                    }
                                } else {
                                    for (var m = 1; m < countList.length; m++) {
                                        countNumber *= countList[m];
                                    }
                                }

                                break;
                            case 2:
                                for (var m = 1; m < countList.length; m++) {
                                    countNumber *= countList[m] - 1;

                                }
                                break;
                        }
                        count += countNumber;
                    }

                }
                if (num == 3) {
                    count -= second
                }
                if (count < 0) {
                    count = 0
                }
                return count;
            }
        },
        isSameNumber:function(list){
            var count=0,numList=[];
            for(var i=0;i<list.length-1;i++){
                if(list[i]==list[i+1]&&list[i]!=0){
                    count++;
                    numList.push(i+1);
                }
            }
            return [count,numList[0]];
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


                case 161: //选一-数投
                case 162: //选二-红投
                    rList = _this.count_TotalLength([0, 0, 0, 1], 1, 0, 0);
                    if(rList == -1) {
                        return
                    } else {
                        rList.map(function(item, index) {
                            if(item) {
                                parameter[index] = item;
                            }
                        });
                        _this.bets = countUtils.getDirectCount(parameter);
                    }
                    break;
                case 163: //选二-任选二
                case 165: //选二-连组
                    rList = _this.count_TotalLength([1, 0, 0, 0], 2, 1, 0);
                    if(rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[0], 2);
                    }
                    break;
                case 164: //选二-任选胆拖
                case 166: //选二-连组胆拖
                    rList = _this.count_TotalLength([1, 1, 0, 0], 1, 1, 0);
                    if(rList == -1) {
                        return
                    } else if(rList[0] == 0 || rList[1] == 0 || rList[0] != 1) {
                        return
                    } else {
                        count = 0;
                        _this.numberArr.map(function(item) {
                            if(item.isSel) {
                                count++;
                            }
                        })
                        _this.bets = rList[1];
                    }
                    break;
                case 167: //选二-连直
                    rList = _this.count_TotalLength([1, 1, 0, 0], 1, 0, 0,2);
                    if(rList==-1){
                        return
                    }else{
                        _this.bets = _this.count_noRepeat([1, 1, 0, 0],2);
                    }
                    break;
                case 168: //选三-任选三
                case 170: //选三-前组
                    rList = _this.count_TotalLength([1, 0, 0, 0], 3, 1, 0);
                    if(rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getSixGroupDirect(rList[0], 3);
                    }
                    break;
                case 169: //选三-任选胆拖
                case 171: //选三-前组胆拖
                    rList=_this.count_TotalLength([ 1, 1, 0, 0],1,1,0);
                    if(rList==-1){
                        return
                    }else if(rList[0]==0||rList[1]==0){
                        return
                    }else{
                        count=0;
                        _this.numberArr.map(function(item){
                            if(item.isSel){
                                count++;
                            }
                        })
                        if(rList[0]==1){
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[1], 2);
                        }else{
                            _this.bets = rList[1];
                        }

                    }
                    break;
                case 172: //选三-前直
                    rList = _this.count_TotalLength([1, 1, 1, 0], 1, 0, 0,3);
                    if(rList==-1){
                        return
                    }else{
                        _this.bets = _this.count_noRepeat([1, 1, 1, 0],3);
                    }
                    break;
                case 173: //选四-任选四
                    rList = _this.count_TotalLength([1, 0, 0, 0], 4, 1, 0);
                    if(rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[0], 4);
                    }
                    break;
                case 174: //选四-任选胆拖
                    rList=_this.count_TotalLength([ 1, 1, 0, 0],1,1,0);
                    if(rList==-1){
                        return
                    }else if(rList[0]==0||rList[1]==0){
                        return
                    }else{
                        count=0;
                        _this.numberArr.map(function(item){
                            if(item.isSel){
                                count++;
                            }
                        })
//                      if(rList[0]==1){
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[1], 4-rList[0]);
//                      }else{
//                          _this.bets = rList[1];
//                      }

                    }
                    break;
                case 175: //选五-任选五
                    rList = _this.count_TotalLength([1, 0, 0, 0], 5, 1, 0);
                    if(rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[0], 5);
                    }
                    break;
                case 176: //选五-任选胆拖
                    rList=_this.count_TotalLength([ 1, 1, 0, 0],1,1,0);
                    if(rList==-1){
                        return
                    }else if(rList[0]==0||rList[1]==0){
                        return
                    }else{
                        count=0;
                        _this.numberArr.map(function(item){
                            if(item.isSel){
                                count++;
                            }
                        })
//                      if(rList[0]==1){
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[1], 5-rList[0]);
//                      }else{
//                          _this.bets = rList[1];
//                      }

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
        //common共用区域选值
        numberArr: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //万位选择项管理对象
        myriabit: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //千位选择项管理对象
        kilobit: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //百位选择项管理对象
        hundreds: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        // oneTypeId:function () {
        //     this.getHistoryBannerInfo();
        //     this.getBetsBannerInfo();
        //     this.getBetsType();
        //     if (localStorage.userName) {
        //         this.get_userState();
        //     }
        //
        // }
    },
});