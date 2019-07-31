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
    $(".mainArea").on("mouseenter", ".draw_menu", function() {
        $(this).children("ul").css({"display": "block"})
    });
    $(".mainArea").on("mouseleave", ".draw_menu", function() {
        $(this).children("ul").css({"display": "none"})
    });


    $("body").on("click", ".radio_group", function () {
        $(this).parents("li").find(".radio_group").removeClass("active");
        $(this).addClass("active");
    });
	$('.orderOdds').hover(function(){
		$('#odds').show();
	},function(){
		$('#odds').hide();
	})
});
let cqssc = new Vue({
    el: "#cqssc-container",
    data: {

        oneTypeId: '',
        code:'11x5',
        params:'',

        typeName: '',
        pic_url: '',
        //当前期数
        preventBanner: '',
        //截止时间
        deadlineStr: '',
        hundMal: 1,
        recentlyNum: 1,
        parentIndex: 0,
        playExplain: '',

        //是否为正方形样式
        rect: false,

        //储存接受的数据
        menu: [],
        //当前的数字列(默认为的1~6)
        numberList: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10","11"],

        //区域名数组
        areaNameList: ["myriabit", "kilobit", "hundreds", "decade", "unit", "common", "common1"],

        //收藏
        isCollect: 0,


        //第一位
        myriabit: [],
        //第二位
        kilobit: [],
        //第三位
        hundreds: [],
        //第四位
        decade: [],
        //第五位
        unit: [],
        //公共
        common: [],
        //公共1
        common1: [],


        //控制显示的数字数列区域，0为不显示
        presentAreaList: [0, 0, 0, 0, 0, 0, 0, 0],

        //控制机选的数字列表
        ranNumList: [1, 1, 1, 1, 1, 1, 1, 1],

        //存储当前的下标
        presentIndexList: [0, 0],

        //单笔注数
        bets: 0,

        // 单注金额
        singleCoins: 2,

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

        right_title:'',
        right_title1: '',


        //上期期号
        presentNum:"",

        //特殊机选索引列表
        specialNumList: ["1","2","3","4","5","6","7","8","9","10","11"],
        //暂未开售禁止投注
        bet_forbid: false,

        //全选是否显示
        multifunctionalbtn: true,

        judgeList:{
            //前三--直选复式
            three_yard_pre_single: {
                judgeId: 118,
                code3: "11x5_3m_q3zxfs",
            },
            //中三--直选复式
            three_yard_middle_single: {
                judgeId: 119,
                code3: "11x5_3m_z3zxfs",
            },
            //后三--直选复式
            three_yard_last_single: {
                judgeId: 120,
                code3:"11x5_3m_h3zxfs"
            },
            //前三--组选复式
            three_yard_pre_group: {
                judgeId: 121,
                code3:"11x5_3m_q3zuXfs"
            },
            //中三--组选复式
            three_yard_middle_group: {
                judgeId: 122,
                code3:"11x5_3m_z3zuXfs"
            },
            //后三--组选复式
            three_yard_last_group: {
                judgeId: 123,
                code3:"11x5_3m_h3zuXfs"
            },
            //前三--组选胆拖
            three_pre_group_duplex: {
                judgeId: 124,
                code3:"11x5_3m_q3zuXdt"
            },
            //中三--组选胆拖
            three_middle_group_duplex: {
                judgeId: 125,
                code3:"11x5_3m_z3zuXdt"
            },
            //后三--组选胆拖
            three_last_group_duplex: {
                judgeId: 126,
                code3:"11x5_3m_h3zuXdt"
            },

            //前二--直选复式
            two_yard_pre_single: {
                judgeId: 127,
                code3:"11x5_2m_q2zxfs"
            },
            //后二--直选复式
            two_yard_last_single: {
                judgeId: 130,
                code3:"11x5_2m_h2zxfs"
            },
            //前二--组选复式
            two_yard_pre_group: {
                judgeId: 128,
                code3:"11x5_2m_q2zuXfs"
            },
            //后二--组选复式
            two_yard_last_group: {
                judgeId: 131,
                code3:"11x5_2m_h2zuXfs"
            },
            //前二--组选胆拖
            two_pre_group_duplex: {
                judgeId: 129,
                code3:"11x5_2m_q2zuXdt"
            },
            //后二--组选胆拖
            two_last_group_duplex: {
                judgeId: 132,
                code3:"11x5_2m_h2zuXdt"
            },

            //不定位--前三位
            noFix_three_yard_pre: {
                judgeId: 133,
                code3:"11x5_bdw_q3w"
            },
            //不定位--中三位
            noFix_three_yard_middle: {
                judgeId: 134,
                code3:"11x5_bdw_z3w"
            },
            //不定位--后三位
            noFix_three_yard_last: {

                judgeId: 135,
                code3:"11x5_bdw_h3w"
            },
            // 定位胆
            courage_static: {
                judgeId: 136,
                code3:"11x5_dwd_dwd"
            },

            //任选复式--任选一中一
            random_yard_one_one: {
                judgeId: 137,
                code3:"11x5_rxfs_rx1z1"
            },
            //任选复式--任选二中二
            random_yard_two_two: {
                judgeId: 138,
                code3:"11x5_rxfs_rx2z2"
            },
            //任选复式--任选三中三
            random_yard_three_three: {
                judgeId: 139,
                code3:"11x5_rxfs_rx3z3"
            },
            //任选复式--任选四中四
            random_yard_four_four: {
                judgeId: 140,
                code3:"11x5_rxfs_rx4z4"
            },
            //任选复式--任选五中五
            random_yard_five_five: {

                judgeId: 141,

                code3:"11x5_rxfs_rx5z5"
            },
            //任选复式--任选六中五
            random_yard_six_five: {
                judgeId: 142,
                code3:"11x5_rxfs_rx6z5"
            },
            //任选复式--任选七中五
            random_yard_seven_five: {
                judgeId: 143,
                code3:"11x5_rxfs_rx7z5"
            },
            //任选复式--任选八中五
            random_yard_eight_five: {
                judgeId: 144,
                code3:"11x5_rxfs_rx8z5"
            },

            //任选胆拖--任选二中二
            random_duplex_two_two: {
                judgeId: 145,
                code3:"11x5_rxdt_rx2z2"
            },
            //任选胆拖--任选三中三
            random_duplex_three_three: {
                judgeId: 146,
                code3:"11x5_rxdt_rx3z3"
            },
            //任选胆拖--任选四中四
            random_duplex_four_four: {
                judgeId: 147,
                code3:"11x5_rxdt_rx4z4"
            },
            //任选胆拖--任选五中五
            random_duplex_five_five: {
                judgeId: 148,
                code3:"11x5_rxdt_rx5z5"
            },
            //任选胆拖--任选六中五
            random_duplex_six_five: {
                judgeId: 149,
                code3:"11x5_rxdt_rx6z5"
            },
            //任选胆拖--任选七中五
            random_duplex_seven_five: {
                judgeId: 150,
                code3:"11x5_rxdt_rx7z5"
            },
            //任选胆拖--任选八中五
            random_duplex_eight_five: {
                judgeId: 151,
                code3:"11x5_rxdt_rx8z5"
            },
        },

        //上期期数
        previousIssue:'',
        previousIssue_tips:'',

        userName: localStorage.userName,
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
                window.location.search = '?7';
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
        getHistoryBannerInfo: function() {
            var _this = this;
            var obj = {
                type: "post",
                url: '/commonAPI/hisOpenData',
                data: {
                    one_type_id: _this.oneTypeId,
                    count: 5
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
            var _this = this;
            var obj = {
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
                        //if (_this.oneTypeId == 55 || _this.oneTypeId == 7) {
                          //  _this.lastTime = _this.getMilliseconds(data.body.deadline)+50000;
                        //} else if (_this.oneTypeId == 16) {
                          //  _this.lastTime = _this.getMilliseconds(data.body.deadline)+50000;
                        //} else if (_this.oneTypeId == 18) {
                          //  _this.lastTime = _this.getMilliseconds(data.body.deadline)+70000;
                        //} else if (_this.oneTypeId == 7) {
                          //  _this.lastTime = _this.getMilliseconds(data.body.deadline)+50000;
                        //} else {
                            _this.lastTime = _this.getMilliseconds(data.body.deadline);
                        //}
                        _this.startTime=_this.getMilliseconds(data.body.response_date);
                        
                         _this.countdown(_this.lastTime,_this.startTime);
                        _this.deadlineTiming = setInterval(function() {
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
        getBetsType: function() {
            var _this = this;
            var obj = {
                type: "post",
                url: '/commonAPI/qryGamePlayInfo',
                data: {
                    one_type_id: parseInt(_this.oneTypeId)
                },
                success: function(data) {
                    if(data.code == 200 && data.body) {
                        _this.initializeBetsTypeData(data.body);
                    } else {}
                },
                error: function(res) {

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
            data.map(function(item) {
                for(var key in _this.judgeList){
                    if(_this.judgeList[key].code3 == item.code3){
                        item.judgeId = _this.judgeList[key].judgeId;
                    }
                }
                objList = _this.judgeNumberList(item.judgeId);
                item.areaList = objList.areaList;
                item.numList = objList.numList;
                item.numList1 = objList.numList1;
                if(!oneTypeArr.some(function(items) {
                    return items == item.name2;
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
        },

        //获取第一遍加载时的时间戳
        contrastTimestamp: function () {
            var _this = this,
                timeList,
                obj = {
                    type: "post",
                    url: "/commonAPI/privacy/getUpdateStatusSign",
                    data: {
                        isWhite: true
                    },
                    success: function (data) {
                        var ulist = [],
                            nlist = [],
                            oDataList, nameList = ["sysAdvpictureSign", "sysBulletinSign", "sysConfigureSign", "sysLotterySign"];
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
                            localStorage.loginTo = "../ng/eleven5.html#"+_this.oneTypeId;
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
                // deadlineT = time - new Date().getTime(),
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
        //areaList[0-第一位，1-第二位，2-第三位，3-第四位，4-第五位，5-组选，6-公共，7-公共1]
        judgeNumberList: function(jd) {
            var numList=["01","02","03","04","05","06","07","08","09","10","11"],  areaList;
            switch(jd) {
                case 118: //前三-直选复式
                    areaList = [0,1,2];
                    break;
                case 119: //中三-直选复式
                    areaList = [1,2,3];
                    break;
                case 120: //后三-直选复式
                    areaList = [2,3,4];
                    break;
                case 124: //前三-组选胆拖
                case 125: //中三-组选胆拖
                case 126: //后三-组选胆拖
                case 129: //前二-组选胆拖
                case 132: //后二-组选胆拖
                case 145: //任选胆拖-任选一中一
                case 146: //任选胆拖-任选二中二
                case 147: //任选胆拖-任选三中三
                case 148: //任选胆拖-任选四中四
                case 149: //任选胆拖-任选五中五
                case 150: //任选胆拖-任选六中五
                case 151: //任选胆拖-任选七中五
                    areaList = [5,6];
                    break;
                case 127: //前二-直选复式
                    areaList = [0,1];
                    break;
                case 130: //后二-直选直式
                    areaList = [3,4];
                    break;
                case 136: //定位胆-定位胆
                    areaList = [0,1,2,3,4];
                    break;
                case 121: //前三-组选复式
                case 122: //中三-组选复式
                case 123: //后三-组选复式
                case 128: //前二-组选复式
                case 131: //后二-组选复式
                case 133: //不定位-前三位
                case 134: //不定位-中三位
                case 135: //不定位-后三位
                case 137: //任选复式-任选一中一
                case 138: //任选复式-任选二中二
                case 139: //任选复式-任选三中三
                case 140: //任选复式-任选四中四
                case 141: //任选复式-任选五中五
                case 142: //任选复式-任选六中五
                case 143: //任选复式-任选七中五
                case 144: //任选复式-任选八中五
                    areaList = [5];
                    break;
                default:
                    areaList = [5];
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
            _this.maxPrize = obj.max_prize;
            _this.minPrize = obj.min_prize;
            _this.maxReward = obj.max_reward;
            _this.orderOdds = parseFloat(obj.max_prize).toFixed(3);
            _this.rebateNum=0;
            _this.rebate=0;
            _this.present_title=obj.name2+"-"+obj.name3;
            _this.present_playId=obj.judgeId;
            // _this.present_judgeId = obj.judgeId;
            _this.initialize_areaList(obj.areaList, obj.numList,obj.numList1); //(第几行数,每列的元素)
        },
        //初始化--区域
        initialize_areaList: function(areaList, numList) {
            var _this = this,jd =  _this.present_playId;
            nameList = ["myriabit", "kilobit", "hundreds", "decade", "unit", "common", "common1"];
            _this.presentAreaList = [0, 0, 0, 0, 0, 0, 0, 0];
            for(var i = 0, len = areaList.length; i < len; i++) {
                _this[nameList[areaList[i]]] = [];
                numList.map(function(item) {
                    _this[nameList[areaList[i]]].push({
                        'num': item,
                         isSel: false
                    })
                });
                Vue.set(_this.presentAreaList, areaList[i], 1);
            }
            switch (jd){
                case 121:
                case 122:
                case 123:
                case 128:
                case 131:
                    _this.right_title = "组选";
                    _this.ranNumList[5] = 1;
                    break;
                case 124:
                case 125:
                case 126:
                    _this.right_title = "胆码";
                    _this.right_title1 = "拖码";
                    _this. specialNumList =["1","2"];
                    _this.ranNumList[5] = 1;
                    break;
                case 129:
                case 132:
                case 145: //任选胆拖-任选二中二
                    _this.right_title = "胆码";
                    _this.right_title1 = "拖码";
                    _this. specialNumList =["1"];
                    _this.ranNumList[5] = 1;
                    break;
                case 146: //任选胆拖-任选三中三
                    _this.right_title = "胆码";
                    _this.right_title1 = "拖码";
                    _this. specialNumList =["1","2"];
                    _this.ranNumList[5] = 1;
                    break;
                case 147: //任选胆拖-任选四中四
                    _this.right_title = "胆码";
                    _this.right_title1 = "拖码";
                    _this. specialNumList =["1","2","3"];
                    _this.ranNumList[5] = 1;
                    break;
                case 148: //任选胆拖-任选五中五
                    _this.right_title = "胆码";
                    _this.right_title1 = "拖码";
                    _this. specialNumList =["1","2","3","4"];
                    _this.ranNumList[5] = 1;
                    break;
                case 149: //任选胆拖-任选六中五
                    _this.right_title = "胆码";
                    _this.right_title1 = "拖码";
                    _this. specialNumList =["1","2","3","4","5"];
                    _this.ranNumList[5] = 1;
                    break;
                case 150: //任选胆拖-任选七中五
                    _this.right_title = "胆码";
                    _this.right_title1 = "拖码";
                    _this. specialNumList =["1","2","3","4","5","6"];
                    _this.ranNumList[5] = 1;
                    break;
                case 151: //任选胆拖-任选八中五
                    _this.right_title = "胆码";
                    _this.right_title1 = "拖码";
                    _this. specialNumList =["1","2","3","4","5","6","7"];
                    _this.ranNumList[5] = 1;
                    break;
                case 133:
                    _this.right_title = "前三位";
                    _this. specialNumList =["1","2","3","4","5","6","7","8","9","10","11"];
                    _this.ranNumList[5] = 1;
                    break;
                case 134:
                    _this.right_title = "中三位";
                    _this. specialNumList =["1","2","3","4","5","6","7","8","9","10","11"];
                    _this.ranNumList[5] = 1;
                    break;
                case 135:
                    _this.right_title = "后三位";
                    _this. specialNumList =["1","2","3","4","5","6","7","8","9","10","11"];
                    _this.ranNumList[5] = 1;
                    break;
                case 137:
                    _this.right_title = "一中一";
                    _this. specialNumList =["1","2","3","4","5","6","7","8","9","10","11"];
                    _this.ranNumList[5] = 1;
                    break;
                case 138:
                    _this.right_title = "二中二";
                    _this. specialNumList =["2","3","4","5","6","7","8","9","10","11"];
                    _this.ranNumList[5] = 2;
                    break;
                case 139:
                    _this.right_title = "三中三";
                    _this. specialNumList =["3","4","5","6","7","8","9","10","11"];
                    _this.ranNumList[5] = 3;
                    break;
                case 140:
                    _this.right_title ="四中四";
                    _this. specialNumList =["4","5","6","7","8","9","10","11"];
                    _this.ranNumList[5] = 4;
                    break;
                case 141:
                    _this.right_title ="五中五";
                    _this.ranNumList[5] = 5;
                    _this. specialNumList =["5","6","7","8","9","10","11"];
                    break;
                case 142:
                    _this.right_title ="六中五";
                    _this.ranNumList[5] = 6;
                    _this. specialNumList =["6","7","8","9","10","11"];
                    break;
                case 143:
                    _this.right_title ="七中五";
                    _this.ranNumList[5] = 7;
                    _this. specialNumList =["7","8","9","10","11"];
                    break;
                case 144:
                    _this.right_title ="八中五";
                    _this.ranNumList[5] = 8;
                    _this. specialNumList =["8","9","10","11"];
                    _this.ranNumList[0] = 1;
                    _this.ranNumList[1] = 1;
                    _this.ranNumList[2] = 1;
                    _this.ranNumList[3] = 1;
                    _this.ranNumList[4] = 1;
                    _this.ranNumList[6] = 1;
                    break;

            }

            if(jd == 124 || jd==125 ||jd==126 || jd==132 || jd==145|| jd==146 || jd==147 || jd==148 || jd==149 || jd==150 || jd==151){
                _this.multifunctionalbtn = false;

            }else {
                _this.multifunctionalbtn =true;
            }
        },

        // 点击元素时给元素加上选中的类  可能还要在这里调用自动计算注数的方法
        handleAddClass: function (item,index,type) {
            var _this=this,jd=_this.present_playId,count=0;
            switch (jd) {
                case 124: //三码-前三胆拖
                case 125: //三码-中三胆拖
                case 126: //三码-后三胆拖
                case 146://任选胆拖-三中三
                    _this.duplexBetsCount(item, 2, index, type);
                    break;

                case 129://二码-前二胆拖
                case 132://二码-后二胆拖
                case 145://任选胆拖-二中二
                    _this.duplexBetsCount(item, 1, index, type);
                    break;

                case 147://任选胆拖-四中四
                    _this.duplexBetsCount(item, 3, index, type);
                    break;
                case 148://任选胆拖-五中五
                    _this.duplexBetsCount(item, 4, index, type);
                    break;
                case 149://任选胆拖-六中五
                    _this.duplexBetsCount(item, 5, index, type);
                    break;
                case 150://任选胆拖-七中五
                    _this.duplexBetsCount(item, 6, index, type);
                    break;
                case 151://任选胆拖-八中五
                    _this.duplexBetsCount(item, 7, index, type);
                    break;

                default:
                    item.isSel = !item.isSel;
                    return;
                    break;
            }

        },

        //胆拖投注计算
        duplexBetsCount: function (item, num, index, type) {
            var listName = [ "common", "common1"],
                _this = this,
                count = 0,
                onum;
            _this.common.map(function (item) {   //公共项遍历
                if (item.isSel) {   //如果被选中count++
                    count++
                }
            });
            //如果 count = num  type = 0
            if (count == num && type == 0 && !_this.common[index].isSel) {
                for (var i = 0, len = _this.common.length; i < len; i++) {
                    var obj = _this.common[i].isSel;
                    if (obj) {
                        _this.common[i].isSel = false;
                        onum = _this.common[i].num;
                        break;
                    }
                }
            }
            if (type == 1 && _this.common[index].isSel && !_this.common1[index].isSel) {
                _this.common[index].isSel = false;
                _this.common1[index].isSel = true;
            } else if (type == 0 && !_this.common[index].isSel && _this.common1[index].isSel) {
                _this.common1[index].isSel = false;
                _this.common[index].isSel = true;
            } else {
                if (onum != item.num) {
                    item.isSel = !item.isSel;
                }

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
        randomNum: function(index, type,event) {
            var _this=this,numList=[],ranNum,event = event.currentTarget,
            noselList = $(event).parents('.btnList').siblings(".numberList ").find("span:not('.sel')"),
            sealList = $(event).parents('.btnList').siblings(".numberList ");
            _this[_this.areaNameList[index]].map(function (item,index) {
                numList.push(index);
            });
            _this.bet_clear = false;
            if(type==1){
                noselList.map(function (item,index) {
                    $(index).trigger("click");
                });
            }else{
                _this[_this.areaNameList[index]].map(function (item) {
                    item.isSel = false;
                });
                for (var i = 0, len = _this.ranNumList[index];i<len;i++) {
                    ranNum = parseInt(Math.random() * numList.length);
                    sealList.find("span").eq(numList[ranNum]).trigger("click");
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
                listName = ['myriabit', 'kilobit', 'hundreds', 'decade', 'unit', "common", "common1"],
                len = 0,
                inIndexList = [],
                index,
                times = 1,
                areaList,
                jd = _this.present_playId;
            switch (jd) {
                //三码
                case 118: //三码-前三直选复式
                    areaList = [1, 1, 1, 0, 0, 0, 0];
                    break;
                case 119: //三码-中三直选复式
                    areaList = [0, 1, 1, 1, 0, 0, 0];
                    break;
                case 120: //三码-后三直选复式
                    areaList = [0, 0, 1, 1, 1, 0, 0];
                    break;
                case 121: //三码-前三组选复式
                case 122: //三码-中三组选复式
                case 123: //三码-后三组选复式
                case 139://任选-三中三
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 3;
                    break;
                case 124: //三码-前三胆拖
                case 125: //三码-中三胆拖
                case 126: //三码-后三胆拖
                case 146://胆拖-三中三
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    times = 2;
                    break;
                case 129://前二-组选胆拖
                case 132://后二-组选胆拖
                case 145://胆拖-二中二
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    break;

                case 140://任选-四中四
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 4;
                    break;
                case 141://任选-五中五
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 5;
                    break;
                case 142://任选-六中五
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 6;
                    break;
                case 143://任选-七中五
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 7;
                    break;
                case 144://任选-八中五
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 8;
                    break;
                case 147://胆拖-四中四
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    times = 3;
                    break;
                case 148://胆拖-五中五
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    times = 4;
                    break;
                case 149://胆拖-六中五
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    times = 5;
                    break;
                case 150://胆拖-七中五
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    times = 6;
                    break;
                case 151://胆拖-八中五
                    areaList = [0, 0, 0, 0, 0, 1, 1];
                    times = 7;
                    break;

                //二码
                case 127://前二-直选复式
                    areaList = [1, 1, 0, 0, 0, 0, 0];
                    break;
                case 130://后二-直选复式
                    areaList = [0, 0, 0, 1, 1, 0, 0];
                    break;
                case 128://前二-组选复式
                case 131://后二-组选复式
                case 138://任选-二中二
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    times = 2;
                    break;
                case 136://定位胆
                    areaList = [1, 1, 1, 1, 1, 0, 0];
                    break;
                default:
                    areaList = [0, 0, 0, 0, 0, 1, 0];
                    break;
            }
            if (jd == 136) {
                len = _this[listName[0]].length;
                for (var j = 0; j < len; j++) {
                    inIndexList.push(j);
                }
                _this[listName[parseInt(Math.random() * 5)]][inIndexList[parseInt(Math.random() * inIndexList.length)]].isSel = true;
                return
            }
            for (var i = 0; i < areaList.length; i++) {
                if (areaList[i] == 1) {
                    if (len == 0) {
                        len = _this[listName[i]].length;
                        for (var j = 0; j < len; j++) {
                            inIndexList.push(j);
                        }
                    }
                    if (areaList[6] == 1 && i == 5) {
                        index = parseInt(Math.random() * inIndexList.length);
                        _this[listName[i]][inIndexList[index]].isSel = true;
                        inIndexList.splice(index, 1)
                    } else {
                        for (var m = 0; m < times; m++) {
                            index = parseInt(Math.random() * inIndexList.length);
                            _this[listName[i]][inIndexList[index]].isSel = true;
                            inIndexList.splice(index, 1)
                        }
                    }


                }
            }
        },


        //清除当前选择
        //type 0-单注未选 1-单注 2-全部
        clearSelectData: function(type,index) {
            var _this = this,jd= _this.present_playId;
            _this.bet_clear = true;
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
            _this.rebateNum = 0;
            _this.rebate = 0;
            if(jd==177){
                _this.orderOdds =0;
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
            if(this.present_playId== 177) {
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
            	if(!_this.bet_clear){
	                _this.orderOdds = "";
	
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
               		_this.orderOdds = 0;
               		return;
               }
            }

            this.orderOdds = (this.maxPrize - ((this.maxPrize - this.minPrize) / this.maxReward * this.rebate)).toFixed(3);
        },

        //订单设置界面确定按钮
        handleConfirm: function () {
            var _this = this, obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]];
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
                _this.singleCoins = 2;
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
                sessionStorage.loginTo = "../ng/eleven5.html#"+_this.oneTypeId;
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
                    if (item.id3 == 107) {
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
										})
										_this.betsBanner = _this.preventBanner;
										test = JSON.stringify(betObjedct)
										obj.data = { tzJson: (test) }
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
                                _this.betsBanner = _this.preventBanner;
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
                    //         _this.betsBanner = _this.preventBanner;
                    //
                    //         test = JSON.stringify(betObjedct);
                    //
                    //         obj.data = { tzJson: (test) };
                    //         _this.stopBanner = "";
                    //         base.callAuthApi(obj);
                    //     } else {
                    //         _this.isHandleBets = false;
                    //         return;
                    //     }
                    // })

                } else {
                    _this.betsBanner = _this.preventBanner;
                    base.callAuthApi(obj);
                }
            }
        },
        //计算数目
        //参数list，依次对应listName,0--不需，1--需要，index为通过计算注数的条件,
        //num为是否进行位数限制(即:严格所选数位置且可为空),0--0(不限制),1--5(5位)
        count_TotalLength: function(list,index, type) {
            var listName = ['myriabit', 'kilobit', 'hundreds', 'decade', 'unit', "common", "common1"],
                rList = [0, 0, 0, 0, 0, 0, 0, 0],
                strList = ["", "", "", "", "", "","",""],
                saveList = [],
                count = 0,
                _this = this;
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
            if (type == 1 && strList[5] < index) {
                _this.isNoSel = true;
                return -1
            }
            if (type == 0 && count < index) {
                return -1;
            } else {
                for (var i = 0; i < 7; i++) {
                    if (list[i] == 1) {
                        if (strList[i]) {
                            saveList.push(strList[i].join(','));
                        } else {
                            saveList.push("")
                        }
                    }
                }
                _this.handleRecodeInfo(saveList);

                return rList;
            }
        },
        //计算注数冠亚和
        count_noRepeat: function (list, num) {
            var listName = ['myriabit', 'kilobit', 'hundreds', 'decade', 'unit', "common", "common1"],
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
        isSameNumber: function (list) {
            var count = 0,
                numList = [];
            for (var i = 0; i < list.length - 1; i++) {
                if (list[i] == list[i + 1] && list[i] != 0) {
                    count++;
                    numList.push(i + 1);
                }
            }
            return [count, numList[0]];
        },

        //计算注数
        count_betNumber: function() {
            var _this = this,
                jd = _this.present_playId,
                count,
                rList = [];

            switch (jd) {
                //三码
                case 118: //三码-前三直选复式
                    rList = _this.count_TotalLength([1, 1, 1, 0, 0, 0, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = _this.count_noRepeat([1, 1, 1, 0, 0, 0, 0], 3);
                    }
                    break;
                case 119: //三码-中三直选复式
                    rList = _this.count_TotalLength([0, 1, 1, 1, 0, 0, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = _this.count_noRepeat([0, 1, 1, 1, 0, 0, 0], 3);
                    }
                    break;
                case 120: //三码-后三直选复式
                    rList = _this.count_TotalLength([0, 0, 1, 1, 1, 0, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = _this.count_noRepeat([0, 0, 1, 1, 1, 0, 0], 3);
                    }
                    break;
                case 121: //三码-前三组选复式
                case 122: //三码-中三组选复式
                case 123: //三码-后三组选复式
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 3);
                    }
                    break;
                case 124: //三码-前三胆拖
                case 125: //三码-中三胆拖
                case 126: //三码-后三胆拖
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.common.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 1) {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 2);
                        } else {
                            _this.bets = rList[6];
                        }

                    }
                    break;

                //二码
                case 127://前二-直选复式
                    rList = _this.count_TotalLength([1, 1, 0, 0, 0, 0, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = _this.count_noRepeat([1, 1, 0, 0, 0, 0, 0], 2);
                    }
                    break;
                case 128://前二-组选复式
                case 131://后二-组选复式
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 2);
                    }
                    break;
                case 129://前二-组选胆拖
                case 132://后二-组选胆拖
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.common.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        _this.bets = rList[6];
                    }
                    break;
                case 130://后二-直选复式
                    rList = _this.count_TotalLength([0, 0, 0, 1, 1, 0, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = _this.count_noRepeat([0, 0, 0, 1, 1, 0, 0], 2);
                    }
                    break;

                //不定位
                case 133://前三位
                case 134://中三位
                case 135://后三位
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item) {
                            _this.bets += item;
                        })
                    }
                    break;

                //定位胆
                case 136://定位胆
                    rList = _this.count_TotalLength([1, 1, 1, 1, 1, 0, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item) {
                            _this.bets += item;
                        })
                    }
                    break;

                //任选复式
                case 137://一中一
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 1, 0, 1);
                    if (rList == -1) {
                        return
                    } else {
                        rList.map(function (item) {
                            _this.bets += item;
                        })
                    }
                    break;
                case 138://二中二
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 2);
                    }
                    break;
                case 139://三中三
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 3);
                    }
                    break;
                case 140://四中四
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 4);
                    }
                    break;
                case 141://五中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 5);
                    }
                    break;
                case 142://六中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 6);
                    }
                    break;
                case 143://七中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 7);
                    }
                    break;
                case 144://八中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 0], 2, 1, 0);
                    if (rList == -1) {
                        return
                    } else {
                        _this.bets = countUtils.getBcGroupMix_cqssc(rList[5], 8);
                    }
                    break;
                //任选胆拖
                case 145://二中二
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.common.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        _this.bets = rList[6];
                    }
                    break;
                case 146://三中三
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.common.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 1) {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 2);
                        } else {
                            _this.bets = rList[6];
                        }

                    }
                    break;
                case 147://四中四
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.common.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 3) {
                            _this.bets = rList[6];
                        } else {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 4 - rList[5]);

                        }

                    }
                    break;
                case 148://五中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.common.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 4) {
                            _this.bets = rList[6];
                        } else {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 5 - rList[5]);
                        }

                    }
                    break;
                case 149://六中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.common.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 5) {
                            _this.bets = rList[6];
                        } else {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 6 - rList[5]);
                        }
                    }
                    break;
                case 150://七中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.common.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 6) {
                            _this.bets = rList[6];
                        } else {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 7 - rList[5]);
                        }

                    }
                    break;
                case 151://八中五
                    rList = _this.count_TotalLength([0, 0, 0, 0, 0, 1, 1], 1, 1, 0);
                    if (rList == -1) {
                        return
                    } else if (rList[5] == 0 || rList[6] == 0) {
                        return
                    } else {
                        count = 0;
                        _this.common.map(function (item) {
                            if (item.isSel) {
                                count++;
                            }
                        })
                        if (rList[5] == 8) {
                            _this.bets = rList[6];
                        } else {
                            _this.bets = countUtils.getBcGroupMix_cqssc(rList[6], 8 - rList[5]);
                        }

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
        //第一位选择项管理对象
        myriabit: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //第二位选择项管理对象
        kilobit: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //第三位选择项管理对象
        hundreds: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //第四位选择项管理对象
        decade: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //第五位
        unit: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //公共选择项管理对象
        common: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
        //公共1选择项管理对象
        common1: {
            deep: true,
            handler: function() {
                var _this = this;
                if(_this.isChangePlayId) {
                    return
                }
                _this.count_betNumber();
            }
        },
    },
});