$(function () {
    $(document).attr('title',ssc.typeName);
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
let ssc = new Vue({
    el: "#cqssc-container",
    data: {
        //当前一级玩法
        oneTypeId: "",
        code:'ssc',

        //收藏
        isCollect: 0,

        //当前期数
        preventBanner: "",
        //截止时间
        deadlineStr: "",
        hundMal: 1,

        recentlyNum: 1,
        parentIndex: 0,
        playExplain: "",

        typeName:'',
        pic_url:'', // 图片路径

		testNumber: [10, 50, 100, 200, 500, 1000, 5000, 10000, 50000],
        //储存接受的数据
        menu: [],
        //当前的数字列(默认为定位胆的0~9)
        numberList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        //区域名数组
        areaNameList :["myriabit", "kilobit", "hundreds", "decade", "unit", "numberArr", "numberArr", "numberArr"],
        //
        nl: [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
            [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
            ["豹子", "顺子", "对子"],
            ["大", "小", "单", "双"],
            [["万位", "千位"], ["万位", "百位"], ["万位", "十位"], ["万位", "个位"], ["千位", "百位"], ["千位", "十位"], ["千位", "个位"], ["百位", "十位"], ["百位", "个位"], ["十位", "个位"]],
        ],
        //测试
        testNameList: ["定位胆", "五星", "四星", "后三", "前三", "前二", "不定位", "大小单双", "任选二", "任选三", "任选四", "龙虎"],
        testNameList2: ["定位胆", "五星", "四星", "后三", "前三", "前二", "不定位", "大小单双", "任选二", "任选三", "任选四", "龙虎"],
        // testNumber: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        testNumberCommon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],


        // common共用区域选值
        numberArr: [],
        //万位选择项管理对象
        myriabit: [],
        //千位选择项管理对象
        kilobit: [],
        //百位选择项管理对象
        hundreds: [],
        //十位选择项管理对象
        decade: [],
        //个位选择项管理对象
        unit: [],

        //控制显示的数字数列区域，0为不显示                                                                                                        
        presentAreaList: [0,0,0,0,0,0,0,0],

        //控制机选的数字列表
        ranNumList:[1,1,1,1,1,1,1,1],

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

        //设置位数和位数目---任选
        position_bets: 0,
        position_count: 2,
        position_maxnum: 2,
        position_list: [0, 0, 0, 0, 0],

        firstArea_title:"",
        commonArea_title:"",

        present_title:"",
        present_playId:"",
        //上期期号
        presentNum:"",

        //暂未开售禁止投注
        bet_forbid: false,

        //重庆,天津,新疆玩法判断数据
        judgeList:{
            // 定位胆
            courage_static: {
                judgeId: 49,
                code3:"ssc_dwd_dwd",
            },
            //五星--直选复式
            five_yard: {
                judgeId: 50,
                code3:"ssc_5x_zxfs",
            },
            //四星--直选复式
            four_yard: {
                judgeId: 51,
                code3:"ssc_4x_zxfs",
            },
            //后三--直选复式
            three_yard_back_single: {
                judgeId: 52,
                code3:"ssc_h3_zxfs",
            },
            //后三--直选和值
            three_yard_back_count: {
                judgeId: 53,
                code3:"ssc_h3_zxhz",

            },
            //后三--直选跨度
            three_yard_back_spacing: {

                judgeId: 54,
                code3:"ssc_h3_zxkd",

            },

            //后三--组三复式
            three_back_group_three: {

                judgeId: 56,
                code3:"ssc_h3_zu3fs",

            },
            //后三--组六复式
            three_back_group_six: {

                judgeId: 57,
                code3:"ssc_h3_zu6fs",

            },

            //后三--和值尾数
            three_back_count_mantissa: {

                judgeId: 60,
                code3:"ssc_h3_hzws",

            },
            //后三--特殊号
            three_back_special: {

                judgeId: 61,
                code3:"ssc_h3_tsh",

            },
            //后三--组三和值
            three_back_group_three_count: {

                judgeId: 108,
                code3:"ssc_h3_zu3hz",

            },
            //后三--组六和值
            three_back_group_six_count: {

                judgeId: 109,
                code3:"ssc_h3_zu6hz",
            },

            //后三--组三包胆
            three_back_group_three_courage: {
                judgeId: 114,
                code3:"ssc_h3_zu3bd",
            },
            //后三--组六包胆
            three_back_group_six_courage: {
                judgeId: 115,
                code3:"ssc_h3_zu6bd",
            },
            //前三--直选复式
            three_yard_pre_single: {
                judgeId: 62,
                code3:"ssc_q3_zxfs",
            },
            //前三--直选和值
            three_yard_pre_count: {
                judgeId: 63,
                code3:"ssc_q3_zxhz",
            },
            //前三--直选跨度
            three_yard_pre_spacing: {
                judgeId: 64,
                code3:"ssc_q3_zxkd",
            },

            //前三--组三复式
            three_pre_group_three: {
                judgeId: 66,
                code3:"ssc_q3_zu3fs",
            },
            //前三--组六复式
            three_pre_group_six: {
                judgeId: 67,
                code3:"ssc_q3_zu6fs",
            },

            //前三--和值尾数
            three_pre_count_mantissa: {
                judgeId: 70,
                code3:"ssc_q3_hzws",
            },
            //前三--特殊号
            three_pre_special: {
                judgeId: 71,
                code3: "ssc_q3_tsh",
            },
            //前三--组三和值
            three_pre_group_three_count: {
                judgeId: 110,
                code3: "ssc_q3_zu3hz",
            },
            //前三--组六和值
            three_pre_group_six_count: {
                judgeId: 111,
                code3: "ssc_q3_zu6hz",

            },
            //前三--组三包胆
            three_pre_group_three_courage: {
                judgeId: 116,
                code3: "ssc_q3_zu3bd",
            },
            //前三--组六包胆
            three_pre_group_six_courage: {
                judgeId: 117,
                code3: "ssc_q3_zu6bd",
            },
            //前二--直选复式
            two_yard_pre_single: {
                judgeId: 72,
                code3: "ssc_q2_zxfs",
            },
            //前二--直选和值
            two_yard_pre_count: {
                judgeId: 73,
                code3: "ssc_q2_zxhz",
            },
            //前二--直选跨度
            two_yard_pre_spacing: {
                judgeId: 74,
                code3: "ssc_q2_zxkd",
            },
            //前二--组选复式
            two_pre_group: {
                judgeId: 75,
                code3: "ssc_q2_zuXfs",
            },
            //前二--组选和值
            two_pre_group_count: {
                judgeId: 76,
                code3: "ssc_q2_zuXhz",
            },
            //前二--组选包胆
            two_pre_group_courage: {
                judgeId: 77,
                code3: "ssc_q2_zuXbd",
            },

            //不定位--前三一码
            three_pre_courage_act_one: {
                judgeId: 78,
                code3: "ssc_bdw_q31m",
            },
            //不定位--前三二码
            three_pre_courage_act_two: {
                judgeId: 79,
                code3: "ssc_bdw_q32m",
            },
            //不定位--后三一码
            three_back_courage_act_one: {
                judgeId: 80,
                code3: "ssc_bdw_h31m",
            },
            //不定位--后三二码
            three_back_courage_act_two: {
                judgeId: 81,
                code3: "ssc_bdw_h32m",
            },
            //不定位--前四一码
            four_pre_courage_act_one: {
                judgeId: 82,
                code3: "ssc_bdw_q41m",
            },
            //不定位--前四二码
            four_pre_courage_act_two: {
                judgeId: 83,
                code3: "ssc_bdw_q42m",
            },
            //不定位--后四一码
            four_back_courage_act_one: {

                judgeId: 84,
                code3: "ssc_bdw_h41m",

            },
            //不定位--后四二码
            four_back_courage_act_two: {
                judgeId: 85,
                code3: "ssc_bdw_h42m",

            },
            //不定位--五星一码
            five_courage_act_one: {
                judgeId: 86,
                code3: "ssc_bdw_5x1m",

            },
            //不定位--五星二码
            five_courage_act_two: {

                judgeId: 87,
                code3: "ssc_bdw_5x2m",

            },
            //不定位--五星三码
            five_courage_act_three: {
                judgeId: 88,
                code3: "ssc_bdw_5x3m",

            },

            //大小单双--前二大小单双
            two_yard_pre_updown_single: {
                judgeId: 89,
                code3: "ssc_dxds_q2dxds",

            },
            //大小单双--后二大小单双
            two_yard_back_updown_single: {
                judgeId: 90,
                code3: "ssc_dxds_h2dxds",
            },
            //大小单双--前三大小单双
            three_yard_pre_updown_single: {

                judgeId: 91,
                code3: "ssc_dxds_q3dxds",

            },
            //大小单双--后三大小单双
            three_yard_back_updown_single: {
                judgeId: 92,
                code3: "ssc_dxds_h3dxds",

            },


            //任选二--直选复式
            two_yard_random: {

                judgeId: 93,
                code3: "ssc_rx2_zxfs",

            },
            //任选二--直选和值
            two_yard_random_count: {

                judgeId: 94,
                code3: "ssc_rx2_zxhz",

            },
            //任选二--组选复式
            two_yard_random_group: {

                judgeId: 95,
                code3: "ssc_rx2_zuXfs",

            },
            //任选二--组选和值
            two_yard_random_group_count: {

                judgeId: 96,
                code3: "ssc_rx2_zuXhz",

            },



            //任选三--直选复式
            three_yard_random: {
                judgeId: 97,
                code3: "ssc_rx3_zxfs",

            },
            //任选三--直选和值
            three_yard_random_count: {

                judgeId: 98,
                code3: "ssc_rx3_zxhz",

            },
            //任选三--组三复式
            three_yard_random_group_three: {
                judgeId: 99,
                code3: "ssc_rx3_zu3fs",
            },
            //任选三--组六复式
            three_yard_random_group_fix: {
                judgeId: 100,
                code3: "ssc_rx3_zu6fs",

            },

            //任选三--组三和值
            three_yard_random_group_three_count: {
                judgeId: 112,
                code3: "ssc_rx3_zu3hz",

            },
            //任选三--组六和值
            three_yard_random_group_six_count: {
                judgeId: 113,
                code3: "ssc_rx3_zu6hz",

            },




            //任选四--直选复式
            four_yard_random: {

                judgeId: 102,
                code3: "ssc_rx4_zxfs",

            },
            //任选四--组选24
            four_random_group_twenty_four: {

                judgeId: 103,
                code3: "ssc_rx4_zuX24",

            },
            //任选四--组选12
            four_random_group_twelve: {

                judgeId: 104,
                code3: "ssc_rx4_zuX12",
            },
            //任选四--组选6
            four_random_group_six: {
                judgeId: 105,
                code3: "ssc_rx4_zuX6",
            },
            //任选四--组选4
            four_random_group_four: {
                judgeId: 106,
                code3: "ssc_rx4_zuX4",

            },
            //龙虎
            pred: {
                judgeId: 107,
                code3:"ssc_lh_lh",

            }
        },
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
        this.getSysConfig();
        //  var oBetsList=localStorage.sscBetsList;
        //  if(oBetsList){
        //  	 this.BetsList=JSON.parse(oBetsList);
        //  }
        //  localStorage.lottery_id=6;
        this.isCollect = localStorage.collectGame && JSON.parse(localStorage.collectGame).collectList[this.oneTypeId] ? 1 : 0;

    },
    mounted: function () {

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
                window.location.search = '?6';
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
                        count: 20
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
                            _this.history=[];
                        }
                    }
                };
            base.callCommonApi(obj);
        },
        // 获取当前可投注期次信息
        getBetsBannerInfo: function () {
            var _this = this,
                obj = {
                    type: "post",
                    url: '/commonAPI/getIssueInfo',
                    data: {
                        one_type_id: _this.oneTypeId
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
                            // _this.preventBanner = data.body.issue;
                            //if (_this.oneTypeId == 48 || _this.oneTypeId == 52) {
                              //  _this.lastTime = _this.getMilliseconds(data.body.deadline)+15000;
                            //} else if (_this.oneTypeId == 44) {
                              //  _this.lastTime = _this.getMilliseconds(data.body.deadline)+65000;
                            //} else if (_this.oneTypeId == 14) {
                              //  _this.lastTime = _this.getMilliseconds(data.body.deadline)+50000;
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
                            localStorage.loginTo = "../ng/ssc.html#"+that.oneTypeId;
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
        //areaList[0-万位，1-千位，2-百位，3-十位，4-个位，5-公用，6-特殊号，7-龙虎]
        judgeNumberList: function (jd) {
            var numList, areaList;
            switch (jd) {
                case 49://定位胆
                case 50://五星
                case 93://任选二--直选复式
                case 97://任选三--直选复式
                case 102://任选四--直选复式
                    areaList = [0, 1, 2, 3, 4];
                    break;
                case 51://四星
                    areaList = [1, 2, 3, 4];
                    break;
                case 52://后三--直选复式
                case 92://后三大小单双
                    areaList = [2, 3, 4];
                    break;
                case 61://后三--特殊号
                case 71://前三--特殊号
                    areaList = [6];
                    break;
                case 62://前三--直选复式
                case 91://前三大小单双
                    areaList = [0, 1, 2];
                    break;
                case 72://前二--直选复式
                case 89://前二大小单双
                    areaList = [0, 1];
                    break;
                case 90://后二大小单双
                    areaList = [3, 4];
                    break;
                case 107://龙虎
                    areaList = [7];
                    break;
                case 104:
                case 106:
                    areaList=[0,5];
                    break;

                default:
                    areaList = [5];
                    break;
            }
            switch (jd) {
                case 53://后三--直选和值
                case 63://前三--直选和值
                case 98://任选三--直选和值

                    numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
                    break;

                case 61://后三--特殊号
                case 71://前三--特殊号
                    numList = ["豹子", "顺子", "对子"];
                    break;

                case 73://前二--直选和值
                case 94://任选二--直选和值
                    numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
                    break;

                case 76://前二--组选和值
                case 96://任选二--组选和值
                    numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
                    break;

                case 89://前二大小单双
                case 90://后二大小单双
                case 91://前三大小单双
                case 92://后三大小单双
                    numList = ["大", "小", "单", "双"];
                    break;

                case 107://龙虎
                    numList = [["万位", "千位"], ["万位", "百位"], ["万位", "十位"], ["万位", "个位"], ["千位", "百位"], ["千位", "十位"], ["千位", "个位"], ["百位", "十位"], ["百位", "个位"], ["十位", "个位"]];
                    break;

                case 108://后三--组三和值
                case 110://前三--组三和值
                case 112://任选三--组三和值
                    numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
                    break;

                case 109://后三--组六和值
                case 111://前三--组六和值
                case 113://任选三--组六和值
                    numList = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
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
            // _this.present_judgeId = obj.judgeId;

            //初始化区域块
            _this.initialize_areaList(obj.areaList, obj.numList);
            //初始化随机数
            _this.ranNumList=[1,1,1,1,1,1,1,1];
            //初始化相关 万千百十个的玩法
            _this.initialize_areaNum();
        },
        //任选位数初始化
        initialize_areaNum:function(){
            var _this = this,
                jd = _this.present_playId,
                list = [],
                domList,
                isNeed = false;
            //切换显示底下 	万千百十个 
            switch (jd) {
                //任选二
                case 94:
                case 95:
                case 96:
                    list = [0, 0, 0, 1, 1];
                    isNeed = true;
                    _this.position_count = 2;
                    _this.position_list = [0, 0, 0, 1, 1];
                    break;
                //任选三
                case 98:
                case 99:
                case 100:
                case 101:
                case 112:
                case 113:
                    list = [0, 0, 1, 1, 1];
                    isNeed = true;
                    _this.position_count = 3;
                    _this.position_list = [0, 0, 1, 1, 1];
                    break;
                //任选四
                case 103:
                case 104:
                case 105:
                case 106:
                    list = [0, 1, 1, 1, 1];
                    isNeed = true;
                    _this.position_count = 4;
                    _this.position_list = [0, 1, 1, 1, 1];
                    break;
                    break;

                default:
                    break;
            }
            switch(jd){
				 case 56://后三-组三复式
                case 66://前三-组三复式
                case 75://前二-组选复式
                case 79://不定位-前三二码
                case 81://不定位-后三二码
                case 83://不定位-前四二码
                case 85://不定位-后四二码
                case 87://不定位-五星二码
                case 95://任选二-组选复式
                case 99://任选三-组三复式
				
					_this.ranNumList=[2,2,2,2,2,2,2,2,2];
				break;
				case 57://后三-组六复式
                case 67://前三-组六复式
                case 88://不定位-五星三码
                case 100://任选三-组六复式
                	_this.ranNumList=[3,3,3,3,3,3,3,3,3];	
                break;
                case 103://组选24
                	_this.ranNumList[5]=4;
                break;
                case 104:
                
                break;
                default:
                 	_this.ranNumList=[1,1,1,1,1,1,1,1];
                  break;
                
			}
            if (isNeed) {
                $(".area .bets_one>.labelList").show();
                domList = $(".area .bets_one>.labelList input");
                for (var i = 0; i < 5; i++) {
                    if (list[i] == 1) {
                        $(domList[i]).prop("checked", true);
                    } else {
                        $(domList[i]).prop("checked", false);
                    }
                }
            } else {
                $(".area .bets_one>.labelList").hide();
                return
            }

            //设置左边
            if(jd==104){
                _this.firstArea_title = "二重号";
                _this.commonArea_title = "单号";
            } else if (jd ==106){
                _this.firstArea_title = "三重号";
                _this.commonArea_title = "单号";
            }else{
                _this.firstArea_title="";
                _this.commonArea_title="";
            }

        },
        //初始化--区域
        initialize_areaList: function (areaList, numList) {
            var _this = this, nameList = ["myriabit", "kilobit", "hundreds", "decade", "unit", "numberArr", "numberArr", "numberArr"];
            _this.presentAreaList= [0, 0, 0, 0, 0, 0, 0, 0];
            if(_this.present_playId==107){
                for (var i = 0, len = areaList.length; i < len; i++) {
                    _this[nameList[areaList[i]]] = [];
                    numList.map(function (item) {
                        _this[nameList[areaList[i]]].push({ 'num': item, isSel: false,isSel0:false })
                    });
                    Vue.set(_this.presentAreaList, areaList[i], 1);
                }
                return
            }
            for (var i = 0, len = areaList.length; i < len; i++) {
                _this[nameList[areaList[i]]] = [];
                numList.map(function (item) {
                    _this[nameList[areaList[i]]].push({ 'num': item, isSel: false })
                });
                Vue.set(_this.presentAreaList, areaList[i],1);
            }
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
            // 公用区域
            if (_this.presentAreaList[5] == 1 || _this.presentAreaList[6] == 1 || _this.presentAreaList[7] == 1){
                if(_this.present_playId!==104&&_this.present_playId!==106){
                    _this.clearSelectData(0, 0);
                }

                numList=[];
                for(var i=0;i<_this.numberArr.length;i++){
                    numList.push(i);
                }
            }else if (_this.present_playId > 88 && _this.present_playId < 93){ //大小单双
                numList = [0,1,2,3];
            }

            if(type==1){
                _this[_this.areaNameList[index]].map(function(item,index){
                    item.isSel=true;
                    Vue.set(item, "numArr", [0,1]);
                    item.isSel0 = true;
                });
            }else{

                if(_this.present_playId==107){
                    var numList1=_this.numberList.slice(0);
                    for (var i = 0, len = _this.ranNumList[index]; i < len; i++) {
                        var ranNum = parseInt(Math.random() * numList.length),inIndex = parseInt(Math.random() * 2);
                        if (inIndex == 0&&numList.length!=0) {
                            _this.numberArr.map(function (item, index) {
                                if (index == numList[ranNum]) {
                                    item.isSel = true;
                                    if(item.numArr&&item.numArr.length==1){
                                        Vue.set(item, "numArr", [0,1]);
                                    }else{
                                        Vue.set(item, "numArr", [0]);
                                    }

                                }
                            });
                            numList.splice(ranNum, 1);
                        } else if(numList1.length!=0){
                            ranNum = parseInt(Math.random() * numList1.length);
                            _this.numberArr.map(function (item, index) {
                                if (index == numList1[ranNum]) {
                                    item.isSel0 = true;
                                    if(item.numArr&&item.numArr.length==1){
                                        Vue.set(item, "numArr", [0,1]);
                                    }else{
                                        Vue.set(item, "numArr", [1]);
                                    }
                                }
                            });
                            numList1.splice(ranNum,1);
                        }else{
                            _this.numberArr.map(function (item, index) {
                                if (index == numList[ranNum]) {
                                    item.isSel = true;
                                    if(item.numArr&&item.numArr.length==1){
                                        Vue.set(item, "numArr", [0,1]);
                                    }else{
                                        Vue.set(item, "numArr", [0]);
                                    }
                                }
                            });
                            numList.splice(ranNum, 1);
                        }

                    }
                }else{
                    _this[_this.areaNameList[index]].map(function (item) {
                        item.isSel = false;
                    });
                    for (var i = 0, len = _this.ranNumList[index];i<len;i++){
                        var ranNum=parseInt(Math.random()*numList.length);
                        _this[_this.areaNameList[index]][numList[ranNum]].isSel=true;
                        numList.splice(ranNum,1);
                    }
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
                    rebate: _this.rebate,
                    code3:_this.present_playId
                });
                _this.handleBetsCoins();
                _this.clearSelectData(0,0);
            }
        },

        randomData: function () {
            var _this = this,
                listName = ["myriabit", "kilobit", "hundreds", "decade", "unit", "numberArr"],
                outIndex = parseInt(Math.random() * 5),
                inIndex = parseInt(Math.random() * 10),
                outIndexList = [],
                jd = _this.present_playId;
            switch (jd) {
                case 49://定位胆
                    _this[listName[outIndex]].map(function (item, index) {
                        if (index == inIndex) {
                            item.isSel = true;
                        }
                    });
                    break;
                case 50://五星
                    for (var i = 0; i < 5; i++) {
                        inIndex = parseInt(Math.random() * 10);
                        _this[listName[i]].map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 51://四星
                    for (var i = 1; i < 5; i++) {
                        inIndex = parseInt(Math.random() * 10);
                        _this[listName[i]].map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 52://后三-直选复式
                    for (var i = 2; i < 5; i++) {
                        inIndex = parseInt(Math.random() * 10);
                        _this[listName[i]].map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 53://后三-直选和值
                case 54://后三-直选跨度
                case 60://后三-和值尾数
                case 61://后三-特殊号
                case 63://后三-直选和值
                case 64://后三-直选跨度
                case 70://前三-和值尾数
                case 71://前三-特殊号
                case 73://前二-直选和值
                case 74://前二-直选跨度
                case 76://前二-组选和值
                case 77://前二-组选包胆
                case 78://不定位-前三一码
                case 80://不定位-后三一码
                case 82://不定位-前四一码
                case 84://不定位-后四一码
                case 86://不定位-五星一码
                case 94://任选二-直选和值
                case 96://任选二-组选和值
                case 98://任选三-直选和值
                case 101://任选三-组选和值
                case 112://任选三-组三和值
                case 113://任选三-组六和值
                case 108://后三-组三和值        		
                case 109://后三-组六和值
                case 110://前三-组三和值
                case 111://前三-组六和值
                case 114://后三-组三包胆
                case 115://后三-组六包胆
                case 116://前三-组三包胆
                case 117://前三-组六包胆

                    inIndex = parseInt(Math.random() * _this.numberArr.length),
                        _this.numberArr.map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    break;
                case 56://后三-组三复式
                case 66://前三-组三复式
                case 75://前二-组选复式
                case 79://不定位-前三二码
                case 81://不定位-后三二码
                case 83://不定位-前四二码
                case 85://不定位-后四二码
                case 87://不定位-五星二码
                case 95://任选二-组选复式
                case 99://任选三-组三复式
                    var rxOutIndex, isHas = false, len = _this.numberArr.length;
                    for (var j = 0; j < 2; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * len);
                            for (var i = 0; i < outIndexList.length; i++) {
                                if (outIndexList[i] == rxOutIndex) {
                                    isHas = true
                                }
                            }
                        } while (isHas)
                        outIndexList.push(rxOutIndex)
                    }
                    for (var i = 0; i < outIndexList.length; i++) {
                        _this.numberArr.map(function (item, index) {
                            if (index == outIndexList[i]) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 57://后三-组六复式
                case 67://前三-组六复式
                case 88://不定位-五星三码
                case 100://任选三-组六复式
                    var rxOutIndex, isHas = false, len = _this.numberArr.length;
                    for (var j = 0; j < 3; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * len);
                            for (var i = 0; i < outIndexList.length; i++) {
                                if (outIndexList[i] == rxOutIndex) {
                                    isHas = true
                                }
                            }
                        } while (isHas)
                        outIndexList.push(rxOutIndex)
                    }
                    for (var i = 0; i < outIndexList.length; i++) {
                        _this.numberArr.map(function (item, index) {
                            if (index == outIndexList[i]) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 62://前三-直选复式
                    for (var i = 0; i < 3; i++) {
                        inIndex = parseInt(Math.random() * 10);
                        _this[listName[i]].map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 72://前二-直选复式
                    for (var i = 0; i < 2; i++) {
                        inIndex = parseInt(Math.random() * 10);
                        _this[listName[i]].map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 89://大小单双-前二大小单双
                    for (var i = 0; i < 2; i++) {
                        inIndex = parseInt(Math.random() * 4);
                        _this[listName[i]].map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 90://大小单双-后二大小单双
                    for (var i = 3; i < 5; i++) {
                        inIndex = parseInt(Math.random() * 4);
                        _this[listName[i]].map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 91://大小单双-前三大小单双	
                    for (var i = 0; i < 3; i++) {
                        inIndex = parseInt(Math.random() * 4);
                        _this[listName[i]].map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 92://大小单双-后三大小单双
                    for (var i = 2; i < 5; i++) {
                        inIndex = parseInt(Math.random() * 4);
                        _this[listName[i]].map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 93://任选二-直选复式
                    var rxOutIndex, isHas = false;
                    for (var j = 0; j < 2; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * 5);
                            for (var i = 0; i < outIndexList.length; i++) {
                                if (outIndexList[i] == rxOutIndex) {
                                    isHas = true
                                }
                            }
                        } while (isHas)
                        outIndexList.push(rxOutIndex)
                    }
                    for (var i = 0; i < outIndexList.length; i++) {
                        inIndex = parseInt(Math.random() * 10);
                        _this[listName[outIndexList[i]]].map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 97://任选三-直选复式
                    var rxOutIndex, isHas = false;
                    for (var j = 0; j < 3; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * 5);
                            for (var i = 0; i < outIndexList.length; i++) {
                                if (outIndexList[i] == rxOutIndex) {
                                    isHas = true
                                }
                            }
                        } while (isHas)
                        outIndexList.push(rxOutIndex)
                    }
                    for (var i = 0; i < outIndexList.length; i++) {
                        inIndex = parseInt(Math.random() * 10);
                        _this[listName[outIndexList[i]]].map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 102://任选四-直选复式
                    var rxOutIndex, isHas = false;
                    for (var j = 0; j < 4; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * 5);
                            for (var i = 0; i < outIndexList.length; i++) {
                                if (outIndexList[i] == rxOutIndex) {
                                    isHas = true
                                }
                            }
                        } while (isHas)
                        outIndexList.push(rxOutIndex)
                    }
                    for (var i = 0; i < outIndexList.length; i++) {
                        inIndex = parseInt(Math.random() * 10);
                        _this[listName[outIndexList[i]]].map(function (item, index) {
                            if (index == inIndex) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 103://任选四-组选24
                    var rxOutIndex, isHas = false, len = _this.numberArr.length;
                    for (var j = 0; j < 4; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * len);
                            for (var i = 0; i < outIndexList.length; i++) {
                                if (outIndexList[i] == rxOutIndex) {
                                    isHas = true
                                }
                            }
                        } while (isHas)
                        outIndexList.push(rxOutIndex)
                    }
                    for (var i = 0; i < outIndexList.length; i++) {
                        _this.numberArr.map(function (item, index) {
                            if (index == outIndexList[i]) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 104://任选四-组选12
                    var rxOutIndex, isHas = false, len = 10;
                    outIndex = parseInt(Math.random() * 10);
                    for (var j = 0; j < 2; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * len);
                            for (var i = 0; i < outIndexList.length; i++) {
                                if (outIndexList[i] == rxOutIndex || rxOutIndex == outIndex) {
                                    isHas = true
                                }
                            }
                        } while (isHas)
                        outIndexList.push(rxOutIndex)
                    }
                    _this.myriabit.map(function (item, index) {
                        if (index == outIndex) {
                            item.isSel = true;
                        }
                    });
                    for (var i = 0; i < outIndexList.length; i++) {
                        _this.numberArr.map(function (item, index) {
                            if (index == outIndexList[i]) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 105://任选四-组选6
                    var rxOutIndex, isHas = false, len = _this.numberArr.length;
                    outIndex = parseInt(Math.random() * 10);
                    for (var j = 0; j < 2; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * len);
                            for (var i = 0; i < outIndexList.length; i++) {
                                if (outIndexList[i] == rxOutIndex) {
                                    isHas = true
                                }
                            }
                        } while (isHas)
                        outIndexList.push(rxOutIndex)
                    }
                    for (var i = 0; i < outIndexList.length; i++) {
                        _this.numberArr.map(function (item, index) {
                            if (index == outIndexList[i]) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
                case 106://任县四-组选4
                    var rxOutIndex;
                    rxOutIndex = parseInt(Math.random() * 10);
                    outIndex = parseInt(Math.random() * 10);
                    do {
                        rxOutIndex = parseInt(Math.random() * 10);
                    } while (rxOutIndex == outIndex)
                    _this.myriabit.map(function (item, index) {
                        if (index == outIndex) {
                            item.isSel = true;
                        }
                    });
                    _this.numberArr.map(function (item, index) {
                        if (index == rxOutIndex) {
                            item.isSel = true;
                        }
                    });
                    break;
                case 107://龙虎
                    var len = _this.numberArr.length;
                    outIndex = parseInt(Math.random() * len);
                    inIndex = parseInt(Math.random() * 2);
                    if (inIndex == 0) {
                        _this.numberArr.map(function (item, index) {
                            if (index == outIndex) {
                                item.isSel = true;
                                Vue.set(item, "numArr", [inIndex]);
                            }
                        });
                    } else {
                        _this.numberArr.map(function (item, index) {
                            if (index == outIndex) {
                                item.isSel0 = true;
                                Vue.set(item, "numArr", [inIndex]);
                            }
                        });
                    }
                    break;

            }
        },
        //清除当前选择
        //type 0-单注未选 1-单注 2-全部
        clearSelectData:function(type,index){
            var _this=this,obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]];
            _this.bet_clear = true;
            if(type===0){
                for (var i = 0, len = _this.presentAreaList.length;i<len;i++){
                    if (_this.presentAreaList[i]==1){
                        if(_this.present_playId==107){
                            _this[_this.areaNameList[i]].map(function (item) {
                                item.isSel = false;
                                item.isSel0=false;
                                item.numArr=[];
                            });
                        }else{
                            _this[_this.areaNameList[i]].map(function(item){
                                item.isSel=false;
                            });
                        }

                    }
                }
               
this.recentBetInfo={};
            }else if(type==1){
                _this.BetsList.splice(index,1);
            }else{
                _this.BetsList=[];
            }

            //赔率初始化
            _this.maxPrize = obj.max_prize;
            _this.minPrize = obj.min_prize;
            _this.maxReward = obj.max_reward;
            _this.orderOdds = parseFloat(obj.max_prize).toFixed(3);
            _this.rebateNum = 0;
            _this.rebate = 0;
            this.bets=0;

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
	            	_this.orderOdds= 0;
	            	return;
	            }
            }

            this.orderOdds = (this.maxPrize - ((this.maxPrize - this.minPrize) / this.maxReward * this.rebate)).toFixed(3);
        },

        //订单设置界面确定按钮
        handleConfirm: function () {
            var _this = this, obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]], numList, oddList, jd = _this.present_playId;
            if(_this.bets==0){
                layui.use('layer',function(){
                    var layer=layui.layer;
                    layer.msg('请根据玩法提示，至少选择一注');
                });
                return
            }
            if (_this.recentBetInfo.betsCount && _this.singleCoins > 0) {
                var obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]], numList = obj.numList;

                if(jd==61||jd==71){
                    numList=_this.recentBetInfo.betsClause[0].split(",");
                    oddList=_this.orderOdds.split("|");
                    for(var i=0,len=numList.length;i<len;i++){
                        _this.BetsList.unshift({
                            type: _this.recentBetInfo.type,
                            betsCount: 1,
                            betsClause: numList[i],
                            betsCoins: _this.singleCoins * 1,
                            id3: obj.id3,
                            id2: obj.id2,
                            id1: obj.id1,
                            odds:oddList[i],
                            banner: _this.preventBanner,
                            singleCoin: _this.singleCoins,
                            rebate:_this.rebate,
							code3:jd
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
						code3:jd
                    });
                }

 
//          	//赔率初始化
//              _this.maxPrize = obj.max_prize;
//              _this.minPrize = obj.min_prize;
//              _this.maxReward = obj.max_reward;
//              _this.orderOdds = parseFloat(obj.max_prize).toFixed(3);
//              _this.rebateNum = 0;
//              _this.rebate = 0;
//              

                _this.handleBetsCoins();
                //_this.clearSelectData(0,0);
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
            if(!_this.isLogin){
                _this.get_userState();
            }

            if (!userNameMsg) {
                sessionStorage.loginTo = "../ng/ssc.html#"+_this.oneTypeId;
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
                
                str.map(function (item) {
                    item.banner = _this.preventBanner;
                    delete item.type;//删除属性
                    if (item.code3 == 107) {
                        item.betsClause = item.betsClause.replace(/[,]/g, "|");
                    } else {
                        item.betsClause = item.betsClause.replace(/[(]/g, "").replace(/[)]/g, "|");
                    }
					delete item.code3;//删除属性
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
//                          localStorage.sscBetsList = "";
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
                    $('body').css('overflow', "hidden");
                    layui.use('layer', function () {
                        var layer_confirm = layui.layer;
                        layer_confirm.open({
                            content: "<div style='padding: 0 80px 0 20px;height: 42px;line-height: 42px;font-size: 14px;'>"+'第' + _this.stopBanner + '期已停止投注,是否投注到最新一期'+"</div>",
                            area: "400px",
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
                } else {
                    _this.stopBanner = _this.preventBanner;
                    base.callAuthApi(obj);
                }
            }
        },
        selectInput: function (event) {
            event = event.currentTarget;
            if ($(event).find("input").is(':checked')) {
                $(event).find("input").prop("checked", false);
            } else {
                $(event).find("input").prop("checked", true);
            }
            this.positionClk();
        },
        //底下位数checkbox的点击事件
        positionClk: function () {
            var count = 0, _this = this;
            var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];

            if (_this.recentBetInfo.betsClause) {
                _this.position_list.map(function (item, index) {
                    if (item == 1) {
                        str += nameList[index] + ",";
                    }
                });
                str = "(" + str.substring(0, str.length - 1) + ")";
                _this.recentBetInfo.betsClause[0] = _this.recentBetInfo.betsClause[0].replace(str, "");
            }

            $(".area .bets_one>.labelList input[type='checkbox']").map(function (item) {
                if ($($(".area .bets_one>.labelList input[type='checkbox']")[item]).is(':checked')) {
                    count++;
                    _this.position_list[item] = 1;
                } else {
                    _this.position_list[item] = 0;
                }
            });
            if (_this.recentBetInfo.betsClause) {
                str = "";
                _this.position_list.map(function (item, index) {
                    if (item == 1) {
                        str += nameList[index] + ",";
                    }
                });
                str = "(" + str.substring(0, str.length - 1) + ")";
                _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];
            }
            _this.position_count = count;
            if (count < _this.position_maxnum) {
                _this.bets = 0;
            } else {
                _this.bets = countUtils.getBcGroupMix_cqssc(count, _this.position_maxnum) * _this.position_bets;
            }
        },

        // 点击元素时给元素加上选中的类  可能还要在这里调用自动计算注数的方法
        handleAddClass: function (item, index) {
            var _this = this;
            if (_this.present_playId == 114 || _this.present_playId == 115 || _this.present_playId == 116 || _this.present_playId == 117 || _this.present_playId == 77) {
                _this.numberArr.map(function (item) {
                    item.isSel = false;
                });
                item.isSel = !item.isSel;
            } else if (_this.present_playId == 107) {
            	if(!item.isSel&&!item.isSel0){
            		item.numArr=[]
            	}
                if (item.numArr && item.numArr.length !== 0) {
                    for (var i = 0; i < item.numArr.length; i++) {
                        if (item.numArr[i] == index) {
                            item.numArr.splice(i, 1);
                        } else if (i == item.numArr.length - 1) {
                            item.numArr.push(index);
                            break;
                        }
                    }

                } else {
                    Vue.set(item, "numArr", [index]);
                    //      			item.numArr=[index];
                }
                if (item.numArr.length == 0) {
                    item.isSel = false;
                    //      			item.isSel0 = false;
                    Vue.set(item, "isSel0", false);
                } else if (item.numArr.length == 1) {
                    if (item.numArr[0] == 0) {
                        item.isSel = true;
                        //      				item.isSel0 = false;
                        Vue.set(item, "isSel0", false);
                    } else {
                        item.isSel = false;
                        //      				item.isSel0 = true;
                        Vue.set(item, "isSel0", true);
                    }
                } else {
                    item.isSel = true;
                    //      			item.isSel0 = true;
                    Vue.set(item, "isSel0", true);
                }
                //      		 _this.count_betNumber();


            } else {
                item.isSel = !item.isSel;
            }

        },
        //计算数目
        //参数list，依次对应listName,0--不需，1--需要，index为通过计算注数的条件,
        //num为是否进行位数限制(即:严格所选数位置且可为空),0--0(不限制),1--5(5位)
        count_TotalLength: function (list, index, type, num) {
            var listName = ["myriabit", "kilobit", "hundreds", "decade", "unit", "numberArr"],
                rList = [0, 0, 0, 0, 0, 0],
                strList = ["", "", "", "", "", ""],
                saveList = [],
                count = 0,
                _this = this;
            for (var i = 0; i < 6; i++) {
                if (list[i] === 1) {
                    rList[i] = _this.totalCountsHandler(_this[listName[i]]);
                    if (rList[i]) {
                        count++;
                        strList[i] = _this.handleAreaSelNum(_this[listName[i]]);
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
                    if (_this.present_playId == 61 || _this.present_playId == 71) {
                        _this.setSpecialSum(saveList[0])
                    }
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

        //特殊号单注处理
        setSpecialSum: function (list) {
            var _this = this, nameList = ["豹子", "顺子", "对子"], indexList = [], orderOddsList = _this.maxPrize.split("|");

            if (list) {
                _this.special_orderOddsList = [];
                _this.orderOdds = "";
                list = list.split(",");
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < list.length; j++) {
                        if (list[j] == nameList[i]) {
                            indexList.push(i);
                            _this.special_orderOddsList.push(orderOddsList[i]);
                            _this.orderOdds += orderOddsList[i] + "|";
                            break;
                        }
                    }
                }
                _this.special_indexList = indexList;
                _this.orderOdds = _this.orderOdds.substring(0, _this.orderOdds.length - 1);
                if (indexList.length == 1) {
                    _this.special_sum = parseFloat(_this.singleCoins * _this.special_orderOddsList[0]).toFixed(2);
                    return
                }
            } else {
                _this.special_orderOddsList = _this.orderOdds.split("|");
            }
            _this.special_orderOddsList.sort(function (a, b) { return a - b });
            if (_this.special_indexList.length == 1) {
                _this.special_sum = parseFloat(_this.singleCoins * _this.special_orderOddsList[0]).toFixed(2);
                return
            }
            _this.special_sum = parseFloat(_this.singleCoins * _this.special_orderOddsList[0]).toFixed(2) + "~" + parseFloat(_this.singleCoins * _this.special_orderOddsList[_this.special_orderOddsList.length - 1]).toFixed(2);
        },
        //计算注数
        count_betNumber: function () {
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
            switch (jd) {

                case 49://定位胆
                    rList = _this.count_TotalLength([1, 1, 1, 1, 1, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item) {
                            _this.bets += item;
                        })
                    }
                    break;
                case 50://五星
                    rList = _this.count_TotalLength([1, 1, 1, 1, 1, 0], 5, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item, index) {
                            if (item) {
                                parameter[index] = item;
                            }
                        })
                        _this.bets = countUtils.getDirectCount(parameter);
                    }
                    break;
                case 51://四星
                    rList = _this.count_TotalLength([0, 1, 1, 1, 1, 0], 4, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item, index) {
                            if (item) {
                                parameter[index] = item;
                            }
                        });
                        _this.bets = countUtils.getDirectCount(parameter);
                    }
                    break;
                //后三
                case 52://后三-直选复式
                case 92://大小单双-后三
                    rList = _this.count_TotalLength([0, 0, 1, 1, 1, 0], 3, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item, index) {
                            if (item) {
                                parameter[index] = item;
                            }
                        });
                        _this.bets = countUtils.getDirectCount(parameter);
                    }
                    break;

                case 53://后三-直选和值
                case 63://前三-直选和值
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getThreeSum(3, 10, item.num);
                            }
                        })
                    }
                    break;
                case 54://后三-直选跨度
                case 64://前三-直选跨度
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getTwoThreeSpacing(3, 10, item.num);
                            }
                        })
                    }
                    break;
                case 56://后三-组三复式
                case 66://前三-组三复式
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getThreeGrounpDirect(rList[rList.length - 1], 2);
                    }
                    break;

                case 57://后三-组六复式
                case 67://前三-组六复式
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 3, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getSixGroupDirect(rList[rList.length - 1], 3);
                    }
                    break;
                case 60://后三-和值尾数
                case 61://后三-特殊号
                case 70://前三-和值尾数
                case 71://前三-特殊号
                //不定位
                case 78://不定位-前三一码
                case 80://不定位-后三一码
                case 82://不定位-前四一码
                case 84://不定位-后四一码
                case 86://不定位-五星一码
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = rList[rList.length - 1];
                    }
                    break;

                //前三
                case 62://前三-直选复式
                case 91://大小单双-前三
                    rList = _this.count_TotalLength([1, 1, 1, 0, 0, 0], 3, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item, index) {
                            if (item) {
                                parameter[index] = item;
                            }
                        });
                        _this.bets = countUtils.getDirectCount(parameter);
                    }
                    break;

                //前二     
                case 72://前二-直选复式
                case 89://大小单双-前二
                    rList = _this.count_TotalLength([1, 1, 0, 0, 0, 0], 2, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item, index) {
                            if (item) {
                                parameter[index] = item;
                            }
                        });
                        _this.bets = countUtils.getDirectCount(parameter);
                    }
                    break;
                case 73://前二-直选和值
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getThreeSum(2, 10, item.num);
                            }
                        })
                    }
                    break;
                case 74://前二-直选跨度
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getTwoThreeSpacing(2, 10, item.num);
                            }
                        })
                    }
                    break;
                case 75://前二-组选复式
                //不定位
                case 79://不定位-前三二码
                case 81://不定位-后三二码
                case 83://不定位-前四二码
                case 85://不定位-后四二码
                case 87://不定位-五星二码
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 2);
                    }
                    break;
                case 76://前二-组选和值
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getThreeGroupSum(2, 10, item.num, 3);
                            }
                        })
                    }
                    break;
                case 77://前二-组选包胆
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = 9;
                    }
                    break;

                //***********************************************************************************************
                //不定位
                case 88://不定位-五星三码
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 3);
                    }
                    break;

                //大小单双
                case 90://大小单双-后二
                    rList = _this.count_TotalLength([0, 0, 0, 1, 1, 0], 2, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item, index) {
                            if (item) {
                                parameter[index] = item;
                            }
                        });
                        _this.bets = countUtils.getDirectCount(parameter);
                    }
                    break;

                //任选二
                case 93://任选二-直选复式
                    rList = _this.count_TotalLength([1, 1, 1, 1, 1, 0], 2, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item, index) {
                            if (item == 0) {
                                rList.splice(index, 1); index--;
                            }
                        });
                        _this.bets = countUtils.calculateNum([2], rList);

                    }
                    break;
                case 94://任选二-直选和值
                    _this.bets = 0;
                    if (_this.position_count < 2) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 2);
                    }
                    _this.position_maxnum = 2;
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getThreeSum(2, 10, item.num);
                            }
                        })
                    }
                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;
                    break;
                case 95://任选二-组选复式
                    _this.bets = 0;
                    comLen = 0;
                    if (_this.position_count < 2) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 2);
                    }
                    _this.position_maxnum = 2;

                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 2);
                    }


                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;

                    break;
                case 96://任选二-组选和值
                    _this.bets = 0;
                    if (_this.position_count < 2) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 2);
                    }
                    _this.position_maxnum = 2;

                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getThreeGroupSum(2, 10, item.num, 3);
                            }
                        })
                    }

                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;
                    break;

                //任选3
                case 97://任选三-直选复式
                    rList = _this.count_TotalLength([1, 1, 1, 1, 1, 0], 3, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item, index) {
                            if (item == 0) {
                                rList.splice(index, 1); index--;
                            }
                        });
                        _this.bets = countUtils.calculateNum([3], rList);
                    }
                    break;
                case 98://任选三-直选和值
                    _this.bets = 0;
                    if (_this.position_count < 3) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 3);
                    }
                    _this.position_maxnum = 3;

                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getThreeSum(3, 10, item.num);
                            }
                        })
                    }

                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;

                    break;
                case 99://任选三-组三复式
                    _this.bets = 0;
                    comLen = 0;
                    if (_this.position_count < 3) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 3);
                    }
                    _this.position_maxnum = 3;

                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getThreeGrounpDirect(rList[rList.length - 1], 2);
                    }


                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;

                    break;
                case 100://任选三-组六复式
                    _this.bets = 0;
                    comLen = 0;
                    if (_this.position_count < 3) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 3);
                    }
                    _this.position_maxnum = 3;

                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 3, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getSixGroupDirect(rList[rList.length - 1], 3);
                    }

                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;

                    break;
                //********************************
                case 101://任选三-组选和值
                    _this.bets = 0;
                    if (_this.position_count < 3) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 3);
                    }
                    _this.position_maxnum = 3;

                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getThreeGroupSum(3, 10, item.num, 3);
                            }
                        })
                    }

                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;

                    break;

                //任选4
                case 102://任选4-直选复式
                    rList = _this.count_TotalLength([1, 1, 1, 1, 1, 0], 4, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item, index) {
                            if (item == 0) {
                                rList.splice(index, 1); index--;
                            }
                        });
                        _this.bets = countUtils.calculateNum([4], rList);
                    }
                    break;
                case 103://任选4-组选24
                    _this.bets = 0;
                    comLen = 0;
                    if (_this.position_count < 4) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 4);
                    }
                    _this.position_maxnum = 4;

                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 4, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 4);
                    }

                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;


                    break;
                case 104://任选4-组选12
                    //****************************************************
                    _this.bets = 0;
                    comLen = 0;
                    if (_this.position_count < 4) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 4);
                    }
                    _this.position_maxnum = 4;

                    var contrastList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    _this.numberArr.map(function (item) {
                        if (item.isSel) {
                            comLen++;
                            contrastList[item.num] = 1;
                        }
                    });
                    _this.myriabit.map(function (item) {
                        if (item.isSel) {
                            if (contrastList[item.num] == 1) {
                                _this.bets += countUtils.getBcGroupMix_cqssc(comLen - 1, 2);
                            } else {
                                _this.bets += countUtils.getBcGroupMix_cqssc(comLen, 2);
                            }
                        }
                    });

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;
                    var  obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]];
                    _this.recentBetInfo.type = obj.name2 + "-" + obj.name3;
                    // _this.recentBetInfo.type = _this.play_area_manner[_this.preventType]["title"];
                    _this.recentBetInfo.betsCount = _this.bets;
                    _this.recentBetInfo.betsClause = [];
                    _this.myriabit.map(function (item) {
                        if (item.isSel) {
                            numArr.push(item.num);
                        }
                    });
                    _this.recentBetInfo.betsClause.push(numArr.join(","));
                    numArr = [];
                    _this.numberArr.map(function (item) {
                        if (item.isSel) {
                            numArr.push(item.num);
                        }
                    });
                    _this.recentBetInfo.betsClause.push(numArr.join(","));
                    _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins;

                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];
                    break;
                case 105://组选6
                    _this.bets = 0;
                    comLen = 0;
                    if (_this.position_count < 4) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 4);
                    }
                    _this.position_maxnum = 4;


                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 2);
                    }

                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;
                    break;
                case 106://组选4
                    //******************************
                    _this.bets = 0;
                    comLen = 0;
                    if (_this.position_count < 4) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 4);
                    }
                    _this.position_maxnum = 4;

                    var contrastList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    _this.numberArr.map(function (item) {
                        if (item.isSel) {
                            comLen++
                            contrastList[item.num] = 1;
                        }
                    });
                    _this.myriabit.map(function (item) {
                        if (item.isSel) {
                            if (contrastList[item.num] == 1) {
                                _this.bets += comLen - 1;
                            } else {
                                _this.bets += comLen;
                            }
                        }
                    });

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;
                    var obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]];
                    _this.recentBetInfo.type = obj.name2 + "-" + obj.name3;
                    // _this.recentBetInfo.type = _this.play_area_manner[_this.preventType]["title"];
                    _this.recentBetInfo.betsCount = _this.bets;
                    _this.recentBetInfo.betsClause = [];
                    _this.myriabit.map(function (item) {
                        if (item.isSel) {
                            numArr.push(item.num);
                        }
                    });
                    _this.recentBetInfo.betsClause.push(numArr.join(","));
                    numArr = [];
                    _this.numberArr.map(function (item) {
                        if (item.isSel) {
                            numArr.push(item.num);
                        }
                    });
                    _this.recentBetInfo.betsClause.push(numArr.join(","));
                    _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins

                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];
                    break;
                //龙虎
                case 107:
                    _this.bets = 0;
                    comLen = 0;
                    _this.numberArr.map(function (item) {
                        if (item.numArr && item.numArr.length != 0) {
                            comLen += item.numArr.length;
                        }
                    })
                    var nameList = ["万千", "万百", "万十", "万个", "千百", "千十", "千个", "百十", "百个", "十个"];
                    _this.bets = comLen;
                    var obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]];
                    _this.recentBetInfo.type = obj.name2 + "-" + obj.name3;
                    // _this.recentBetInfo.type = _this.play_area_manner[_this.preventType]["title"];
                    _this.recentBetInfo.betsCount = _this.bets;
                    _this.recentBetInfo.betsClause = [];
                    _this.numberArr.map(function (item, index) {
                        if (item.numArr && item.numArr.length != 0) {
                            var str = "";
                            for (var i = 0; i < item.numArr.length; i++) {
                                str = nameList[index] + ":";
                                if (item.numArr[i] == 0) {
                                    str += nameList[index][0];
                                } else {
                                    str += nameList[index][1];
                                }
                                numArr.push(str);
                            }

                        }
                    });
                    _this.recentBetInfo.betsClause.push(numArr.join(","));
                    _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins;
                    break;
                    break;

                case 108://后三-组三和值
                case 110://前三-组三和值
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getThreeGroupSum(3, 10, item.num, 0);
                            }
                        })
                    }
                    break;
                case 109://后三-组六和值
                case 111://前三-组六和值
                    _this.bets = 0;
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getThreeGroupSum(3, 10, item.num, 1);
                            }
                        })
                    }
                    break;

                case 112://组三和值--任选三
                    _this.bets = 0;
                    if (_this.position_count < 3) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 3);
                    }
                    _this.position_maxnum = 3;

                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getThreeGroupSum(3, 10, item.num, 0);
                            }
                        })
                    }
                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;

                    break;
                case 113://组六和值--任选三
                    _this.bets = 0;
                    if (_this.position_count < 3) {
                        return
                    } else {
                        count = countUtils.getBcGroupMix_cqssc(_this.position_count, 3);
                    }
                    _this.position_maxnum = 3;

                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.numberArr.map(function (item) {
                            if (item.isSel) {
                                _this.bets += countUtils.getThreeGroupSum(3, 10, item.num, 1);
                            }
                        })
                    }


                    var str = "", nameList = ["万位", "千位", "百位", "十位", "个位"];
                    _this.position_list.map(function (item, index) {
                        if (item == 1) {
                            str += nameList[index] + ",";
                        }
                    });
                    str = "(" + str.substring(0, str.length - 1) + ")";
                    _this.recentBetInfo.betsClause[0] = str + _this.recentBetInfo.betsClause[0];

                    _this.position_bets = _this.bets;
                    _this.bets = _this.bets * count;

                    break;
                case 114://后三-组三包胆
                case 116://前三-组三包胆
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = 18;
                    }

                    break;
                case 115://后三-组六包胆
                case 117://前三-组六包胆
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1], 1, 0, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = 36;
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
        //十位选择项管理对象
        decade: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //个位选择项管理对象
        unit: {
            deep: true,
            handler: function () {
                var _this = this;
                if (_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
    },
});