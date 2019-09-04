

$(function () {
    $(document).attr('title', bj28.typeName);
    // 点击玩法选择界面的某一个选项时切换到改选项下
    $(".play_choice .tab").on("click", "li", function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        $(".playList ul").children("li").css({ display: "none" });
        $(".playList ul").children("li").eq($(this).index()).css({ display: "block" });
        $(".playList li:visible").find(".radio_group.active").removeClass("active");
        $(".playList li:visible").find(".radio_group:first").addClass("active");
    });

    // 控制机选注数控制菜单的显示隐藏
    $(".btnList").on("mouseenter", ".draw_menu", function () {
        $(this).children("ul").css({ "display": "block" });
    });
    $(".btnList").on("mouseleave", ".draw_menu", function () {
        $(this).children("ul").css({ "display": "none" });
    });

    $("body").on("click", ".radio_group", function () {
        $(this).parents("li").find(".radio_group").removeClass("active");
        $(this).addClass("active");
    });
    $('.orderOdds').hover(function () {
        $('#odds').show();
    }, function () {
        $('#odds').hide();
    });
});
var bj28 = new Vue({
    el: "#bj-container",
    data: {
        oneTypeId: "",
        code: 'PCDD',
        //当前期数
        preventBanner: "",
        //截止时间
        deadlineStr: "",
        hundMal: 1,

        typeName: '',
        pic_url: '',

        recentlyNum: 1, // 最近期号
        parentIndex: 0,
        playExplain: "",

        //储存接受的数据
        menu: [],

        //  可投注信息
        mix_mixed: ["大", "小", "单", "双", "大单", "小单", "大双", "小双", "极大", "极小"],
        special_code: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        special_three: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        wave_color: ["红波", "绿波", "蓝波"],
        leopard: ["豹子"],

        //当前可投注的信息
        betinfo: [],

        betarea: [], //当前投注项

        isCircleBets: false, //圆形下是否有赔率
        isRect: true, //是否是正方形样式
        isbetshow: true, //赔率是否显示

        ranNum: 1, //选中的随机个数
        randnumList: [], // 随机数数组

        // common共用区域选值
        numberArr: [],

        //控制显示的数字数列区域，0为不显示                                                                                                        
        presentAreaList: [0, 0, 0, 0, 0, 0, 0, 0],

        //控制机选的数字列表
        //      ranNumList:[1,1,1,1,1,1,1,1],

        //存储当前的下标
        presentIndexList: [0, 0],

        //单笔注数
        bets: 0,
        
		testNumber: [10, 50, 100, 200, 500, 1000, 5000, 10000, 50000],

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
        min_prize: 8.5,
        maxReward: 13,

        // 记录用户当前的投注信息
        recentBetInfo: {},
        // 记录用户所有的投注订单信息
        BetsList: [],

        //      投注项
        BetsArea: [],

        // 总注数和投注所需金额
        totalBets: 0,
        totalCoins: 0,

        //钱包余额
        pack_coin: 0,
        //金钱单位
        coinUnit: "元",

        //追号--中奖后停止
        after_no: 0,
        //追期数
        continue_periods: 1,

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

        firstArea_title: "",
        commonArea_title: "",

        present_title: "",
        present_playId: "",

        //特殊号--对应单注中奖金额
        special_sum: "",
        special_indexList: [],

        //上期期号
        presentNum: "",

        //暂未开售禁止投注
        bet_forbid: false,

        //收藏
        isCollect: 0,

        bj28CL:[
            'gray','green','blue','red','green','blue',
            'red','green','blue','red','green',
            'blue','red','gray','gray','red',
            'gray','blue','red','green','blue',
            'red','green','blue','red','green',
            'blue','gray'
        ],

        //		玩法区域
        judgeList: {
            // 混合
            mix_mixed: {
                judgeId: 156,
                code3: 'PCDD_hh_hh'
            },
            //特码
            special_code: {
                judgeId: 157,
                code3: 'PCDD_tm_tm'
            },
            //特码包三
            special_three: {
                judgeId: 158,
                code3: 'PCDD_tm_tmb3'
            },
            //波色
            wave_color: {
                judgeId: 159,
                code3: 'PCDD_bs_bs'
            },
            //豹子
            leopard: {
                judgeId: 160,
                code3: 'PCDD_bz_bz'
            },
             //加拿大星座
             jndxz_dx_dxds: {
            isSel: false,
            title: '大小-大小单双',
            judgeId: 1013,
            code3: 'jndxz_dx_dxds',
            TextArr: ["大","小","单","双"],
            Ename: 'dx_dxds'
          },
          jndxz_dxjz_dxjz: {
            isSel: false,
            title: '大小极值-大小极值',
            judgeId: 1014,
            code3: 'jndxz_dxjz_dxjz',
            TextArr: ["极大","极小","小单","小双","大单","大双"],
            Ename: 'dxjz_dxjz'
          },
          jndxz_bd_bd: {
            isSel: false,
            title: '豹对-豹对',
            judgeId: 1015,
            code3: 'jndxz_bd_bd',
            TextArr: ["豹子","对子","顺子","半顺","杂六"],
            Ename: 'bd_bd'
          },
          jndxz_wx_wx: {
            isSel: false,
            title: '五行-五行',
            judgeId: 1016,
            code3: 'jndxz_wx_wx',
            TextArr: ["金","木","水","火","土"],
            Ename: 'wx_wx'
          },
          jndxz_sj_sj: {
            isSel: false,
            title: '四季-四季',
            judgeId: 1017,
            code3: 'jndxz_sj_sj',
            TextArr: ["春","夏","秋","冬"],
            Ename: 'sj_sj'
          },
          jndxz_xz_xz: {
            isSel: false,
            title: '星座-星座',
            judgeId: 1018,
            code3: 'jndxz_xz_xz',
            TextArr: ["水瓶","双鱼","白羊","金牛","巨蟹","双子","狮子","处女","天秤","天蝎","射手","摩羯",],
            Ename: 'xz_xz'
          },
          jndxz_sx_sx: {
            isSel: false,
            title: '生肖-生肖',
            judgeId: 1019,
            code3: 'jndxz_sx_sx',
            TextArr: ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
            Ename: 'sx_sx'
          },
          jndxz_q1q3_lhh: {
            isSel: false,
            title: '球1:球3',
            judgeId: 1020,
            code3: 'jndxz_q1q3_lhh',
            TextArr: ["1:3龙","1:3虎","1:3和"],
            Ename: 'q1q3_lhh'
          },
          jndxz_q2q3_lhh: {
            isSel: false,
            title: '球2:球3',
            judgeId: 1021,
            code3: 'jndxz_q2q3_lhh',
            TextArr: ["2:3龙","2:3虎","2:3和"],
            Ename: 'q2q3_lhh'
          },
          jndxz_qehb_q2hb: {
            isSel: false,
            title: '前二合并',
            judgeId: 1022,
            code3: 'jndxz_qehb_q2hb',
            TextArr: ["前二大","前二小","前二单","前二双"],
            Ename: 'qehb_q2hb'
          },
          jndxz_hehb_h2hb: {
            isSel: false,
            title: '后二合并',
            judgeId: 1023,
            code3: 'jndxz_hehb_h2hb',
            TextArr: ["后二大","后二小","后二单","后二双"],
            Ename: 'hehb_h2hb'
          }

        },
        //是否清空了当前选号
        bet_clear: false,

        //上期期数
        previousIssue: '',
        previousIssue_tips: '',

        userName: localStorage.userName,
        betsTypeData:'',
        show_dd: false

    },
    created: function created() {
        this.getSearchValue();
        this.getHistoryBannerInfo();
        this.getBetsBannerInfo();
        this.getBetsType();
        if (localStorage.userName) {
            this.get_userState();
        }
        this.getSysConfig();

        this.isCollect = localStorage.collectGame && JSON.parse(localStorage.collectGame).collectList[this.oneTypeId] ? 1 : 0;
    },
    mounted: function mounted() {},
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
        refresh: function refresh() {
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
            }, 1000);
        },

        getSearchValue: function getSearchValue() {
            var IdList = JSON.parse(localStorage.gameIdList);
            var _this = this,
                Array = IdList[_this.code].split(',');
            var type = parseInt(window.location.search.substring(1));
            if (_this.isInArray(Array, type)) {
                _this.oneTypeId = type;
            } else {
                window.location.search = '?9';
            }
        },
        //判断某个元素是否存在某个数组中
        isInArray: function isInArray(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (parseInt(arr[i]) === obj) {
                    return true;
                }
            }
            return false;
        },
        //玩法收藏
        collectFn: function collectFn() {
            // alert(1111111)
            if (this.isCollect == 0) {
                this.isCollect = 1;
            } else {
                this.isCollect = 0;
            }

            var dataList = window.parent.base.collectGame.set(this.oneTypeId);
            localStorage.collectGame = dataList ? JSON.stringify(dataList) : '';

            window.parent.collectNum();
        },
        //排序
        sortNum: function sortNum(sort2, sort3) {
            return function (a, b) {
                var value1 = a[sort2];
                var value2 = b[sort2];
                if (value1 === value2) {
                    return a[sort3] - b[sort3];
                }
                return value1 - value2;
            };
        },

        // 获取历史开奖数据
        getHistoryBannerInfo: function getHistoryBannerInfo() {
            var _this = this;
            var obj = {
                type: "post",
                url: '/commonAPI/hisOpenData',
                data: {
                    one_type_id: _this.oneTypeId,
                    count: 20
                },
                success: function success(data) {
                    if (data.code == 200 && data.body && data.body.length != 0) {
                        _this.history = data.body;
                        if (_this.previousIssue && data.body[0].issue !== _this.previousIssue && _this.previousIssue_tips) {
                            setTimeout(function () {
                                _this.getHistoryBannerInfo();
                            }, 20000);
                        } else {
                            _this.previousIssue = data.body[0].issue;
                            _this.previousIssue_tips = "";
                        }
                        for (var i = 0; i < _this.history.length; i++) {
                            var list = _this.history[i].luck_number.split(','),
                                lHtml = "";
                            if (list.length == 3) {
                                lHtml = list[0] + ",+," + list[1] + ",+," + list[2] + ",=";
                            }
                            var sumNum = parseInt(list[0]) + parseInt(list[1]) + parseInt(list[2]);
                            
                            _this.history[i].recentlyNum = lHtml.split(',');
                            _this.history[i].recentlyNum.push(sumNum);
                        }
                        _this.presentNum = parseInt(data.body[0].issue);
                    } else {}
                },
                error: function error(res) {}
            };
            base.callCommonApi(obj);
        },

        // 获取当前可投注期次信息
        getBetsBannerInfo: function getBetsBannerInfo() {
            var _this = this;
            var obj = {
                type: "post",
                url: '/commonAPI/getIssueInfo',
                data: {
                    one_type_id: _this.oneTypeId
                },
                success: function success(data) {
                    if (data.code == 200 && data.body) {
                        if (!data.body.deadline) {
                            _this.preventBanner = "";
                            _this.deadlineStr = "封盘";
                            return;
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

                        if (_this.previousIssue && _this.previousIssue == data.body.previousIssue) {
                            _this.previousIssue_tips = "";
                        } else {
                            _this.previousIssue = data.body.previousIssue;

                            if (data.body.previousIssue) {
                                setTimeout(function () {
                                    _this.getHistoryBannerInfo();
                                }, 20000);
                                _this.previousIssue_tips = "开奖中...";
                            } else {
                                setTimeout(function () {
                                    _this.getHistoryBannerInfo();
                                }, 20000);
                                _this.previousIssue_tips = "";
                            }
                        }
                        //                         _this.preventBanner = data.body.issue;
                        _this.lastTime = _this.getMilliseconds(data.body.deadline); //结束时间
                        _this.startTime = _this.getMilliseconds(data.body.response_date); //开始时间

                        _this.countdown(_this.lastTime, _this.startTime);
                        _this.deadlineTiming = setInterval(function () {
                            _this.startTime += 1000;
                            _this.countdown(_this.lastTime, _this.startTime);
                        }, 1000);
                        //                      setTimeout(function () { _this.getHistoryBannerInfo(); }, 120000);
                    } else if (data.code == 201) {
                        _this.bet_forbid = true;
                        _this.preventBanner = "";
                        _this.deadlineStr = data.msg;
                    } else {
                        _this.preventBanner = "";
                        _this.deadlineStr = "暂停销售";
                    }
                },
                error: function error(res) {}
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
        //                  one_type_id: 9
        //              },
        //              success: function (data) {
        //                  if (data.code == 200 && data.body) {
        //                      var objList;
        //                      // 第一遍遍历添加一级玩法
        //                      data.body.map(function (item) {
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
        getBetsType: function getBetsType() {
            var _this = this,
                obj = {
                type: "post",
                // type: 'post',
                url: '/commonAPI/qryGamePlayInfo',
                data: {
                    one_type_id: _this.oneTypeId
                },
                success: function success(data) {
                    if (data.code == 200 && data.body) {
                        _this.initializeBetsTypeData(data.body);
                    } else {}
                },
                error: function error(res) {}
            },
                dataList = localStorage.qryGamePlayInfo ? JSON.parse(localStorage.qryGamePlayInfo) : "",
                ots = localStorage.qryGamePlayInfoTimestamp ? JSON.parse(localStorage.qryGamePlayInfoTimestamp) : "",
                nts = localStorage.contrastTimestamp ? JSON.parse(localStorage.contrastTimestamp).gameTypeSign : "";

            //比对时间戳，看是否需要更新
            if (dataList != "" && ots != "" && nts != "" && nts != null && ots[_this.oneTypeId] && dataList[_this.oneTypeId] && ots[_this.oneTypeId] == nts[_this.oneTypeId]) {
                _this.initializeBetsTypeData(dataList[_this.oneTypeId]);
            } else {
                _this.contrastTimestamp();
                base.callCommonApi(obj);
            }
        },
        //初始化投注项数据
        initializeBetsTypeData: function initializeBetsTypeData(data) {
            var _this = this,
                oneTypeArr = [],
                dataList,
                objList;
            data = data.sort(_this.sortNum('sort2', 'sort3'));
            if (!localStorage.qryGamePlayInfo) {
                dataList = {};
                dataList[_this.oneTypeId] = data;
                localStorage.qryGamePlayInfo = JSON.stringify(dataList);
            } else {
                dataList = JSON.parse(localStorage.qryGamePlayInfo);
                dataList[_this.oneTypeId] = data;
                localStorage.qryGamePlayInfo = JSON.stringify(dataList);
            }
            _this.betsTypeData=data;
            // 第一遍遍历添加一级玩法
            data.map(function (item) {
                for (var key in _this.judgeList) {
                    if (_this.judgeList[key].code3 == item.code3) {
                        item.judgeId = _this.judgeList[key].judgeId;
                    }
                }
                if (!oneTypeArr.some(function (items) {
                    return items == item.name2;
                })) {
                    oneTypeArr.push(item.name2);
                    _this.menu.push({
                        oneType: item.name2,
                        twoType: [item]
                    });
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
            // _this.orderOdds = _this.maxPrize;
            _this.typeName = data[0].name1;
            _this.pic_url = data[0].pic_url;
        },
        //获取第一遍加载时的时间戳
        contrastTimestamp: function contrastTimestamp() {
            var _this = this,
                timeList,
                obj = {
                type: "post",
                url: "/commonAPI/privacy/getUpdateStatusSign",
                data: {
                    isWhite: true
                },
                success: function success(data) {
                    var ulist = [],
                        nlist = [],
                        oDataList,
                        nameList = ["sysAdvpictureSign", "sysBulletinSign", "sysConfigureSign", "sysLotterySign"];
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
                }
            };
            base.callCommonApi(obj);
        },
        // 固定差值=(最大赔率 - 最小赔率) / (最大返点 * 10)			保留三位小数并舍去三位以后小数
        // 当前赔率 = 最大赔率 - (固定差值 * (最大返点 - 当前返点) * 10)
        // _this.menu，play_area_manner
        setOrderOdds: function setOrderOdds() {
            //重新计算赔率&& !this.rebateList
            if (localStorage.szcRebateList) {
                var _this = this,
                    item,
                    code1 = _this.gamePlayCode1,
                    rebateList = JSON.parse(localStorage.szcRebateList);
                for (var i in rebateList) {
                    if (rebateList[i].code == code1) {
                        this.rebateList = rebateList[i];
                        break;
                    }
                }
                //menu
                _this.menu.map(function (outItem) {
                    outItem.twoType.map(function (inItem) {
                        if (inItem.max_prize.indexOf('|') != -1) {
                            var maxList = inItem.max_prize.split('|'),
                                minList = inItem.min_prize.split('|'),
                                val = "";
                            maxList.map(function (inItems, index) {
                                var val = parseFloat((inItems - minList[index]) / (_this.rebateList.rebate * 10 + 1)).toFixed(3);
                                maxList[index] = parseFloat(inItems - val * (_this.rebateList.rebate - _this.rebateList.nowRebate) * 10).toFixed(3);
                            });
                            inItem.max_prize = maxList.join("|");
                        } else {
                            var val = parseFloat((inItem.max_prize - inItem.min_prize) / (_this.rebateList.rebate * 10 + 1)).toFixed(3);
                            inItem.max_prize = parseFloat(inItem.max_prize - val * (_this.rebateList.rebate - _this.rebateList.nowRebate) * 10).toFixed(3);
                        }
                    });
                });
            }
        },


        //获取登录状态
        get_userState: function get_userState() {
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
                            that.pack_coin = parseFloat(data.body.coin).toFixed(2);
                            that.user_state = "钱包:" + that.pack_coin + that.coinUnit + "(可用)";
                        } else {
                            localStorage.loginTo = "../ng/bj_28.html";
                            parent.opendpg('../login/login.html');
                            // location.href = "../loginIn/login.html";
                        }
                    }
                };
            }
            base.callAuthApi(getUserInfo);
        },
        getSysConfig: function getSysConfig() {
            var that = this,
                getSingleMaxSum = {
                type: "post",
                url: "/commonAPI/privacy/getSysConfigureResult",
                data: {},
                success: function success(data) {
                    if (data.code == 200) {
                        localStorage.config = JSON.stringify(data.body);
                        if (data.body.coinUnit) {
                            that.coinUnit = data.body.coinUnit;
                        }
                    }
                }
            },
                config = localStorage.config ? JSON.parse(localStorage.config) : '';
            if (config == "" || !config.coinUnit) {
                base.callCommonApi(getSingleMaxSum);
            } else {
                that.coinUnit = config.coinUnit;
            }
        },
        // 获取毫秒数
        getMilliseconds: function getMilliseconds(str) {
            str = str.replace(new RegExp("-", "gm"), "/");
            return new Date(str).getTime(); //得到毫秒数
        },
        //补0
        getzf: function getzf(num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },
        //时间倒计时
        countdown: function countdown(lastTime, startTime) {
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

        //切换玩法
        //参数为menu的外层 onType下标和twoType下标
        switchover_play: function switchover_play(oi, ii) {
            var _this = this,
                obj = _this.menu[oi].twoType[ii],
                numList = obj.numList;
            _this.betarea = [];
            _this.presentIndexList = [oi, ii]; //储存当前的菜单索引
            _this.game_tips = obj.game_tips; //当前玩法提示

            _this.maxPrize = obj.max_prize; //当前最大赔率
            _this.siglemaxPrize = _this.maxPrize.split('|');
            _this.min_prize = obj.min_prize; //当前最小赔率
            _this.maxReward = obj.max_reward; //当前最大返利
            _this.orderOdds = parseFloat(obj.max_prize).toFixed(3); //最大赔率

            _this.rebateNum = 0;
            _this.rebate = 0;

            _this.present_title = obj.name2 + "-" + obj.name3; //当前玩法名称  二级-二级

            //          _this.initialize_areaList(obj.areaList, obj.numList);
            _this.present_playId = obj.judgeId;
            if (_this.present_playId == 156) {
                _this.betinfo = _this.mix_mixed;
                _this.isRect = true;
                _this.isCircleBets = false;
                _this.isbetshow = true;
                _this.ranNum = 1;
                _this.setSpecialSum();
                _this.orderOdds = obj.max_prize.split('|')[0];
            }
            if (_this.present_playId == 157) {
                _this.betinfo = _this.special_code;
                _this.isCircleBets = true;
                _this.isRect = false;
                _this.isbetshow = false;
                _this.ranNum = 1;
                _this.setSpecialSum();
            }
            if (_this.present_playId == 158) {
                _this.betinfo = _this.special_three;
                _this.isCircleBets = false;
                _this.isRect = false;
                _this.isbetshow = false;
                _this.ranNum = 3;
            }
            if (_this.present_playId == 159) {
                _this.betinfo = _this.wave_color;
                _this.isCircleBets = false;
                _this.isRect = true;
                _this.isbetshow = true;
                _this.ranNum = 1;
                _this.setSpecialSum();
            }
            if (_this.present_playId == 160) {
                _this.betinfo = _this.leopard;
                _this.isRect = true;
                _this.ranNum = 1;
                _this.isbetshow = true;
            }
            if(_this.present_playId > 160){
                _this.betinfo = _this.judgeList[ obj.code3].TextArr;
                _this.isRect = true;
                _this.ranNum = 1;
                _this.isbetshow = true;
                _this.setSpecialSum();
            }

            for (var i = 0; i < _this.betinfo.length; i++) {
                var obj = {};
                obj.info = _this.betinfo[i];
                obj.num = _this.siglemaxPrize[i];
                _this.betarea.push({ 'info': obj.info, 'num': obj.num, 'isSel': false });
            }
        },

        // 统计对象中选中的元素个数
        totalCountsHandler: function totalCountsHandler(opt) {
            var count = 0;
            opt.map(function (item) {
                if (item.isSel) {
                    count++;
                }
            });
            return count;
        },
        // 统计某一个选择区中的选中项的值 传递选择区的管理对象
        handleAreaSelNum: function handleAreaSelNum(opt) {
            var tempArr = [];
            opt.map(function (item) {
                if (item.isSel) {
                    tempArr.push(item.info);
                }
            });
            return tempArr;
        },
        // 将投注信息记录到当前投注信息记录对象中  传递一个用户选择项的数组,一维字符串数组
        handleRecodeInfo: function handleRecodeInfo(seloptArr) {
            var _this = this,
                obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]];
            _this.recentBetInfo = {};
            _this.recentBetInfo.type = obj.name2 + "-" + obj.name3;
            _this.recentBetInfo.betsClause = [];
            seloptArr.map(function (item) {
                _this.recentBetInfo.betsClause.push(item);
            });
        },
        //机选元素个数选择
        changeRandomNum: function changeRandomNum(num) {
            var _this = this;
            _this.bet_clear = false;
            if (_this.present_playId == 158) {
                _this.ranNum = 3;
            } else {
                _this.ranNum = num;
            }
            $(".draw_menu ul").css("display", "none");
        },

        //机选事件--单区域
        //参数index对应区域块，type 0-机选 1-全选
        randomNum: function randomNum(index, type) {
            var _this = this,
                len = _this.betarea.length,
                numList = [];
            _this.bet_clear = false;
            if (type == 1) {
                _this.betarea.map(function (item) {
                    item.isSel = true;
                });
            } else {
                _this.betarea.map(function (item) {
                    item.isSel = false;
                });
                for (var i = 0; i < len; i++) {
                    numList[i] = i;
                }
                for (var i = 0; i < _this.ranNum; i++) {
                    var randnum = parseInt(Math.random() * numList.length);
                    _this.randnumList.push(randnum); //存储随机数组
                    _this.betarea[numList[randnum]].isSel = true;
                    numList.splice(randnum, 1);
                }
            }
        },
        //机选事件--注数
        //num--机选注数
        randomBets: function randomBets(num) {
            var _this = this,
                obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]];
            for (var i = 0; i < num; i++) {
                _this.clearSelectData(0, 0);
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
                _this.clearSelectData(0, 0);
            }
        },

        //随机数据
        randomData: function randomData() {
            var _this = this,
                outIndex = parseInt(Math.random() * 5),
                inIndex = parseInt(Math.random() * 10),
                outIndexList = [],
                id3 = _this.present_playId;
            switch (id3) {
                case 156: //混合
                case 157: //特码
                case 159: //波色
                case 160:
                    //豹子
                    var len = _this.betarea.length;
                    outIndex = parseInt(Math.random() * len);
                    _this.betarea.map(function (item, index) {
                        if (index == outIndex) {
                            item.isSel = true;
                            //	        					Vue.set(item,"numArr", [inIndex]);
                        }
                    });
                    break;
                case 158:
                    //特码包三
                    var rxOutIndex,
                        isHas = false,
                        len = _this.betarea.length;
                    for (var j = 0; j < 3; j++) {
                        do {
                            isHas = false;
                            rxOutIndex = parseInt(Math.random() * len);
                            for (var i = 0; i < outIndexList.length; i++) {
                                if (outIndexList[i] == rxOutIndex) {
                                    isHas = true;
                                }
                            }
                        } while (isHas);
                        outIndexList.push(rxOutIndex);
                    }
                    for (var i = 0; i < outIndexList.length; i++) {
                        _this.betarea.map(function (item, index) {
                            if (index == outIndexList[i]) {
                                item.isSel = true;
                            }
                        });
                    }
                    break;
            }
        },

        //清除当前选择
        //type 0-单注未选 1-单注 2-全部
        clearSelectData: function clearSelectData(type, index) {
            var _this = this,
                id3 = _this.present_playId;
            _this.bet_clear = true;
            if (type === 0) {
                _this.betarea.map(function (item) {
                    item.isSel = false;
                });
                _this.recentBetInfo = {};
            } else if (type == 1) {
                _this.BetsList.splice(index, 1);
            } else {
                _this.BetsList = [];
            }

            //重置进度条 赔率 返利率
            if (id3 == 158 || id3 == 160) {
                _this.orderOdds = parseFloat(_this.maxPrize).toFixed(3);
            } else {
                _this.orderOdds = 0;
            }
            _this.rebate = 0;
            _this.rebateNum = 0;
            _this.handleBetsCoins();
        },
        //单笔单注奖金限制
        handleCoins: function handleCoins() {
            this.singleCoins = this.singleCoins.replace(/\D+/g, '');
            if (this.singleCoins && this.singleCoins < 1) {
                this.singleCoins = 1;
            }
            if (this.present_playId == 156 || this.present_playId == 157 || this.present_playId == 159) {
                this.setSpecialSum();
            }
        },
        //追期数限制
        handleChase: function handleChase() {
            var num = this.continue_periods;
            if (typeof num == "string") {
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
        changeRebate: function changeRebate() {
            var _this = this,
                id3 = _this.present_playId,
                maxList,
                minList;
            this.rebate = (this.rebateNum * (this.maxReward / 100)).toFixed(1);
            if (id3 == 156 || id3 == 157 || id3 == 159) {
                if (!_this.bet_clear) {
                    _this.orderOdds = "";
                    maxList = _this.maxPrize.split("|");

                    minList = _this.min_prize.split("|");
                    for (var i = 0; i < _this.special_indexList.length; i++) {
                        //选中的长度
                        var index = _this.special_indexList[i]; //索引值
                        _this.orderOdds += (maxList[index] - (maxList[index] - minList[index]) / _this.maxReward * _this.rebate).toFixed(3);
                        if (i !== _this.special_indexList.length - 1) _this.orderOdds += "|";
                    }
                    _this.setSpecialSum();
                    return;
                } else {
                    _this.orderOdds = 0;
                    return;
                }
            } else {
                this.orderOdds = (this.maxPrize - (this.maxPrize - this.min_prize) / this.maxReward * this.rebate).toFixed(3);
            }
        },

        //订单设置界面确定按钮
        handleConfirm: function handleConfirm() {
            var _this = this,
                betsClauseOne,
                obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]];
            if (_this.bets == 0) {
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.msg('请根据玩法提示，至少选择一注');
                });
                return;
            }
            if (_this.recentBetInfo.betsCount && _this.singleCoins > 0) {
                for (var i = 0; i < _this.bets; i++) {
                    if (this.present_playId == 158) {
                        betsClauseOne = _this.recentBetInfo.betsClause.join('|');
                    } else {
                        betsClauseOne = _this.recentBetInfo.betsClause[i];
                    }
                    oddOne = _this.orderOdds.split('|')[i];
                    _this.BetsList.unshift({
                        type: _this.recentBetInfo.type,
                        betsCount: 1,
                        betsClause: betsClauseOne,
                        betsCoins: _this.singleCoins * 1,
                        id3: obj.id3,

                        id2: obj.id2,
                        id1: obj.id1,
                        odds: oddOne,
                        banner: _this.preventBanner,
                        singleCoin: _this.singleCoins,
                        rebate: _this.rebate
                    });
                }

                _this.handleBetsCoins();
                _this.clearSelectData(0);
                _this.rebateNum = 0;
                //存储localstorage
                _this.stopBanner = "";
                _this.singleCoins = '';
            }
        },
        // 统计合计和总注数信息
        handleBetsCoins: function handleBetsCoins() {
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
        tips: function tips(index) {
            var _this = this;
            if ($('.tips').is('.hide')) {
                $('body').css("overflow", "hidden");
            } else {
                $('body').css("overflow", "auto");
            }
            $('.tips').toggleClass('hide');
            _this.timer1 = setInterval(function () {
                _this.tenSecond--;
                if (_this.tenSecond == 0) {
                    _this.tenSecond = 10;
                    clearInterval(_this.timer1);
                    _this.time1 = "";
                    if (index == 1 || index == 3) {
                        location.reload();
                    } else {
                        parent.opendpg('../myCenter/recharge.html');
                        // parent.location.href = "../myCenter/recharge.html";
                    }
                }
            }, 1000);
        },
        //提示框--关闭
        closeTips: function closeTips(event, index) {
            var _this = this;
            event = event.currentTarget;
            $(event).parents('.tips').addClass('hide');
            $('body').css("overflow", "auto");
            clearInterval(_this.timer1);
            _this.tenSecond = 10;
            _this.time1 = "";
            switch (index) {
                case 3:
                    _this.clearSelectData();
                    break;
                default:
                    break;
            }
            _this.clearSelectData(2,0);
        },

        // 投注
        handleBets: function handleBets() {
            var _this = this,
                id3 = _this.present_playId,
                btnArray = ['取消', '确认'],
                stopBanner = '',
                userNameMsg = localStorage.userName;

            if (_this.bet_forbid) {
                layer.msg('该彩种未开售！');
                return;
            }

            if (!userNameMsg) {
                sessionStorage.loginTo = "../ng/bj_28.html";
                parent.opendpg('../login/login.html');
                // parent.location.href = "../login/login.html";
                return;
            } else if (_this.isHandleBets) {
                //避免重复投注
                return;
            } else if (!_this.totalCoins) {
                _this.tipsContent = {
                    "tzState": "至少选择一注",
                    "showSecond": 1
                };
                _this.tips(1);
                return;
            } else if (!_this.preventBanner || _this.deadlineStr == "数据获取中...") {
                _this.tipsContent = {
                    "tzState": "正在获取当前期数，请稍后。。。",
                    "showSecond": 1
                };
                _this.tips(1);
                return;
            }
            if (!this.isLogin) {
                this.get_userState();
            }
            if (_this.pack_coin < _this.totalCoins) {
                _this.tipsContent = {
                    "tzState": "余额不足，请先充值",
                    "showSecond": 2
                };
                _this.tips(2);
                return;
            } else {
                this.handleChase();
                _this.isHandleBets = true;
                var str = JSON.parse(JSON.stringify(_this.BetsList));
                str.map(function (item) {
                    item.banner = _this.preventBanner;
                    delete item.type; //删除属性
                    //                  if (item.id3 == 107) {
                    //                      item.betsClause = item.betsClause.replace(/[,]/g, "|");
                    //                  } else {
                    //                      item.betsClause = item.betsClause.replace(/[(]/g, "").replace(/[)]/g, "|");
                    //                  }
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
                        tzJson: test
                    },
                    url: '/authApi/digitalBet',
                    success: function success(data) {
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
                                "tzState": "投注成功"
                            };
                            _this.tips(1);
                            _this.clearSelectData(2, 0);
                        } else if (data.code == 134) {
                            $('body').css('overflow', "hidden");
                            layui.use('layer', function () {
                                var layer_confirm = layui.layer;
                                layer_confirm.open({
                                    content: "<div style='padding: 0 80px 0 20px;height: 42px;line-height: 42px;font-size: 14px;'>" + '第' + _this.stopBanner + '期已停止投注,是否投注到最新一期' + "</div>",
                                    area: "400px",
                                    type: 1,
                                    closeBtn: 0,
                                    title: "提示",
                                    btn: ["确定", "取消"],
                                    yes: function yes() {
                                        layer.closeAll('page');
                                        $('body').css('overflow', "auto");
                                        betObjedct.BetsList.map(function (item) {
                                            if (item.banner != _this.preventBanner) {
                                                item.banner = _this.preventBanner;
                                            }
                                            delete item.type;
                                        });
                                        _this.stopBanner = _this.preventBanner;
                                        test = JSON.stringify(betObjedct);
                                        obj.data = { tzJson: test };
                                        base.callAuthApi(obj);
                                    },
                                    btn2: function btn2() {
                                        $('body').css('overflow', "auto");
                                        _this.isHandleBets = false;
                                    }
                                });
                            });
                        } else {
                            _this.tipsContent = {
                                "tzState": data.msg,
                                "showSecond": 1
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
                            content: "<div style='padding: 0 80px 0 20px;height: 42px;line-height: 42px;font-size: 14px;'>" + '第' + _this.stopBanner + '期已停止投注,是否投注到最新一期' + "</div>",
                            area: "400px",
                            type: 1,
                            closeBtn: 0,
                            title: "提示",
                            btn: ["确定", "取消"],
                            yes: function yes() {
                                layer.closeAll('page');
                                $('body').css('overflow', "auto");
                                betObjedct.BetsList.map(function (item) {
                                    if (item.banner != _this.preventBanner) {
                                        item.banner = _this.preventBanner;
                                    }
                                    delete item.type;
                                });
                                _this.stopBanner = _this.preventBanner;
                                test = JSON.stringify(betObjedct);
                                obj.data = { tzJson: test };
                                _this.stopBanner = "";
                                base.callAuthApi(obj);
                            },
                            btn2: function btn2() {
                                $('body').css('overflow', "auto");
                                _this.isHandleBets = false;
                            }
                        });
                    });
                    //                     mui.confirm('第' + _this.stopBanner + '期已停止投注,是否投注到最新一期', '提示', btnArray, function (e) {
                    //                         if (e.index == 1) {
                    //                             betObjedct.BetsList.map(function (item) {
                    //                                 if (item.banner != _this.preventBanner) {
                    //                                     item.banner = _this.preventBanner
                    //                                 }
                    //                                 delete item.type
                    //                             })
                    //                             _this.stopBanner = _this.preventBanner
                    //                             test = JSON.stringify(betObjedct)
                    //                             obj.data = { tzJson: (test) }
                    //                             _this.stopBanner = "";
                    //                             base.callAuthApi(obj);
                    //                         } else {
                    //                             _this.isHandleBets = false;
                    //                             return;
                    //                         }
                    //                     })
                } else {
                    _this.stopBanner = _this.preventBanner;
                    base.callAuthApi(obj);
                }
            }
        },
        selectInput: function selectInput(event) {
            event = event.currentTarget;
            if ($(event).find("input").is(':checked')) {
                $(event).find("input").prop("checked", false);
            } else {
                $(event).find("input").prop("checked", true);
            }
            this.positionClk();
        },
        //底下位数checkbox的点击事件
        positionClk: function positionClk() {
            var count = 0,
                _this = this;
            var str = "",
                nameList = ["万位", "千位", "百位", "十位", "个位"];

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
        handleAddClass: function handleAddClass(item, index) {
            var _this = this,
                isSellen = 0;
            if (_this.present_playId == 158) {
                for (var i = 0; i < _this.betarea.length; i++) {
                    if (_this.betarea[i].isSel == true) {
                        isSellen = parseInt(isSellen) + 1;
                    }
                }
                if (parseInt(isSellen) < 3) {
                    item.isSel = !item.isSel;
                } else {
                    if (item.isSel) {
                        item.isSel = !item.isSel;
                    } else {
                        item.isSel = false;
                        layui.use('layer', function () {
                            var layer = layui.layer;
                            layer.msg('只能选择三项');
                        });
                    }
                }
                // _this.rebateNum = 0;
            } else if (_this.present_playId == 156 || _this.present_playId == 157 || _this.present_playId == 159) {
                item.isSel = !item.isSel;
                _this.rebateNum = 0;
                _this.rebate = 0;
            } else {
                item.isSel = !item.isSel;
            }
        },

        //计算数目
        //参数list，依次对应listName,0--不需，1--需要，index为通过计算注数的条件,
        //num为是否进行位数限制(即:严格所选数位置且可为空),0--0(不限制),1--5(5位)
        count_TotalLength: function count_TotalLength(index, num) {
            var rList = [0, 0, 0, 0, 0, 0],
                strList = ["", "", "", "", "", ""],
                saveList = [],
                count = 0,
                _this = this;
            count = _this.totalCountsHandler(_this.betarea);
            saveList = _this.handleAreaSelNum(_this.betarea);
            _this.handleRecodeInfo(saveList);
            if (index == 1) {
                _this.bets = count;
            } else {
                if (count == 3) {
                    _this.bets = 1;
                } else {
                    _this.bets = 0;
                }
            }
            if (num == 1) {
                if (count !== 0) {
                    _this.setSpecialSum(_this.betarea);
                }
            }
        },

        //特殊号单注处理
        setSpecialSum: function setSpecialSum(list) {
            var _this = this,
                indexList = [],
                orderOddsList = _this.maxPrize.split("|");
            _this.special_orderOddsList = []; //特殊号玩法的赔率数组
            var OddsList = [];
            var indexl = -1;
            if (list) {
                _this.orderOdds = "";
                _this.special_orderOddsList = [];
                list.map(function (item) {
                    indexl += 1;
                    if (item.isSel) {
                        OddsList.push(item.num); //记录投注的赔率
                        _this.special_orderOddsList.push(item.num); //记录赔率的数组
                        indexList.push(indexl);
                    }
                });
                for (var i = 0; i < OddsList.length; i++) {
                    _this.orderOdds += OddsList[i] + "|";
                }
                _this.special_indexList = indexList; //赋值索引
                _this.orderOdds = _this.orderOdds.substring(0, _this.orderOdds.length - 1); //去掉赔率最后一个|
                if (indexList.length == 1) {
                    _this.special_sum = parseFloat(_this.singleCoins * _this.special_orderOddsList[0]).toFixed(2);
                    return;
                }
            } else {
                _this.special_orderOddsList = _this.orderOdds.split("|");
            }
            _this.special_orderOddsList.sort(function (a, b) {
                return a - b;
            });
            if (_this.special_indexList.length == 1) {
                _this.special_sum = parseFloat(_this.singleCoins * _this.special_orderOddsList[0]).toFixed(2);
                return;
            }
            _this.special_sum = parseFloat(_this.singleCoins * _this.special_orderOddsList[0]).toFixed(2) + "~" + parseFloat(_this.singleCoins * _this.special_orderOddsList[_this.special_orderOddsList.length - 1]).toFixed(2);
        },

        //计算注数
        count_betNumber: function count_betNumber() {
            var _this = this,
                id3 = _this.present_playId,
                count,
                rList = [],
                parameter = {},

            // 记录每一个选择区中的数值
            comLen = 0,
                numArr = [];
            switch (id3) {

                case 156:
                    //混合
                    rList = _this.count_TotalLength(1, 1);
                    break;
                case 157:
                    //特码
                    rList = _this.count_TotalLength(1, 1);
                    break;
                case 158:
                    //特码包三
                    rList = _this.count_TotalLength(3, 0);
                    break;
                case 159:
                    //波色
                    rList = _this.count_TotalLength(1, 1);
                    break;
                case 160:
                    //豹子
                    rList = _this.count_TotalLength(1, 0);
                    break;
                default:
                    rList = _this.count_TotalLength(1, 1);
                    break;
            }
            _this.recentBetInfo.betsCount = _this.bets;
            _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins;
        },

        //走势图跳转
        togoChart:function (id) {
            //(id);
            // if(id==31||id==10||id==26||id==27||id==28||id==29||id==30||id==32||id==31||id==34||id==35||id==36||id==33||id==37){
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
        bets: function bets(val) {
            this.coin = val * 2;
        },

        //追期数
        continue_periods: function continue_periods(val) {
            var _this = this;
            if (this.tempCoins) {
                if (val != 0 && !isNaN(val)) {
                    this.totalCoins = val * this.tempCoins;
                    if (val == 1) {
                        _this.after_no = 0;
                    }
                } else {
                    this.totalCoins = this.tempCoins;
                    _this.after_no = 0;
                }
            }
        },

        betarea: {
            deep: true,
            handler: function handler() {
                var _this = this;
                if (_this.isChangePlayId) {
                    return;
                }
                _this.count_betNumber();
            }
        }

    }
});