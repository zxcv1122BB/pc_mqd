"use strict";

var Vapp = new Vue({
    el: "#lotdetail",
    data: {
        // 是否显示数据加载失败
        noData: false,
        // 请求的三级玩法类型管理
        playTypeId: 0,
        // 单场当前玩法值
        play_type_id: "",
        //当前玩法分类值
        playTypeName: '',
        //当前选中期数
        selBanner: "--",
        //是否显示投注类型选择框
        isShowType: false,
        //是否显示期数选择框
        isShowBanner: false,
        // 竞彩篮球选项卡管理
        basketTabItem: {
            all: true,
            sf: false,
            rfsf: false,
            sfc: false,
            bs: false
        },
        //哈希值玩法类型管理
        playType: null,
        isShow: false,
        // ...
        datas: {
            totalQi: [],
            totalGoal: [],
            scoreArr: [],
            homeTeamArr: [],
            awayTeamArr: []
        },
        // 所有比赛的数据对象
        jczqDatas: [],
        // 存储单场足球比赛数据
        dcGameData: [],
        // 判断数据是否在加载
        onLoad: true,
        //存储篮球相关数据
        basketData: [],
        //存储胜负彩相关奖金
        prize_store: {
            sfc_prize: {},
            rxj_prize: {}
        },
        ImgSrc: '',
        Title: '',
        SubTitle: '',
        //福彩3D 北京PK10 重庆时时彩 开奖历史/最新一期/最新一期期号
        history: [],
        recentlyNum: '',
        presentNum: '',
        open_time: '',
        onetypeid: '9',
        pic_url: '',
        bet_url: '',
        typeName: '', //玩法名称
        flag: '',

        //绿波  红波 蓝波
        greenNum: [1, 4, 7, 10, 16, 19, 22, 25],
        blueNum: [2, 5, 8, 11, 17, 20, 23, 26],
        redNum: [3, 6, 9, 12, 15, 18, 21, 24],

        DigitalGameList: [],

        bj28CL: ['gray', 'green', 'blue', 'red', 'green', 'blue', 'red', 'green', 'blue', 'red', 'green', 'blue', 'red', 'gray', 'gray', 'red', 'gray', 'blue', 'red', 'green', 'blue', 'red', 'green', 'blue', 'red', 'green', 'blue', 'gray'],

        lhcCL: ['red', 'red', 'blue', 'blue', 'green', //1
        'green', 'red', 'red', 'blue', 'blue', //2
        'green', 'red', 'red', 'blue', 'blue', //3
        'green', 'green', 'red', 'red', 'blue', //4
        'green', 'green', 'red', 'red', 'blue', //5
        'blue', 'green', 'green', 'red', 'red', //6
        'blue', 'green', 'green', 'red', 'red', //7
        'red', 'blue', 'green', 'green', 'red', //8
        'blue', 'blue', 'green', 'green', 'red', //9
        'red', 'blue', 'blue', 'green' //10
        ],
        gameCode: '',
    },
    created: function created() {
        this.onetypeid = localStorage.lottery_id;
        //(this.onetypeid);
        // this.pic_url = '../'+localStorage.lottery_img;
        // this.bet_url = localStorage.lottery_url;
        this.typeName = localStorage.lottery_name;
        // this.getHistoryBannerInfo();
    },
    mounted: function mounted() {
        this.getHashValue();
        this.getDigitalGame();
    },
    methods: {
        //转换日期为周日
        getWeekDay: function getWeekDay(date) {
            date = new Date(date);
            var week;
            if (date.getDay() == 0) week = "周日";
            if (date.getDay() == 1) week = "周一";
            if (date.getDay() == 2) week = "周二";
            if (date.getDay() == 3) week = "周三";
            if (date.getDay() == 4) week = "周四";
            if (date.getDay() == 5) week = "周五";
            if (date.getDay() == 6) week = "周六";
            return week;
        },
        //根据哈希值判断显示那一部分详情
        getHashValue: function getHashValue() {
            var type = window.location.hash.substring(1);
            var flag = sessionStorage.getItem("gameType");
            sessionStorage.removeItem("gameType");
            this.playType = type;
            switch (type) {
                case 'sfc':
                    this.playTypeName = "胜负彩/任选九";
                    this.ImgSrc = "./images/sfcrx9.png";
                    this.SubTitle = "不定期开奖，最高奖金500万";
                    this.Title = "胜负彩/任选九";
                    this.getQiData(this.getQiByData);
                    break;
                case 'rxj':
                    this.playTypeName = "胜负彩/任选九";
                    this.ImgSrc = "./images/sfcrx9.png";
                    this.SubTitle = "不定期开奖，最高奖金500万";
                    this.Title = "胜负彩/任选九";
                    this.getQiData(this.getQiByData());
                    break;
                case 'dc':
                    this.playTypeName = "足球单场";
                    this.ImgSrc = "./images/index_img19.png";
                    this.SubTitle = "小串多倍，天天有米收";
                    this.Title = "足球单场";
                    this.getDcQiData();
                    if (flag) {
                        // this.changeSingleGameTabBarStatius(flag)
                        this.getDcGameData('', '');
                    } else {
                        this.getDcGameData('', '');
                    }
                    break;
                case 'jczq':
                    this.playTypeName = "竞彩足球";
                    this.ImgSrc = "./images/index_img7.png";
                    this.SubTitle = "猜足球比赛，天天赢大奖";
                    this.Title = "竞彩足球";
                    if (flag) {
                        this.changeTabStatius(flag);
                    } else {
                        this.getAllData();
                    }
                    break;
                case 'jclq':
                    this.playTypeName = "竞彩篮球";
                    this.ImgSrc = "./images/index_img8.png";
                    this.SubTitle = "猜篮球比赛，返奖率高";
                    this.Title = "竞彩篮球";
                    this.getBasketballData();
                    if (flag) {
                        this.changeBasketTab(flag);
                    }
                    break;
                default:
                    // this.playTypeName = "胜负彩";
                    // this.getQiData();
                    // this.getQiByData();
                    //(type);
                    localStorage.lottery_id = type;
                    //(localStorage.lottery_id );
                    this.getHistoryBannerInfo();
                    // this.ImgSrc =  this.pic_url;
                    // this.playTypeName = this.typeName;
                    // this.Title = this.typeName;

                    // this.playType = "sfc";
                    break;
            }
        },
        changeTableStatius: function changeTableStatius() {
            this.isShow = !this.isShow;
        },

        compareNum: function compareNum(property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            };
        },

        // 获取彩种开奖
        getDigitalGame: function getDigitalGame(id, num) {
            var _this = this,
                obj2 = {},
                gameID,
                url;
            var obj = {
                type: "post",
                url: '/commonAPI/qryDigitalGameIntro',
                data: {},
                dataType: 'json',
                success: function success(data) {
                    //(data);
                    if (data.code == 200 && data.body && data.body.length != 0) {
                        for (var i = 0; i < data.body.length; i++) {
                            _this.DigitalGameList[i] = data.body[i];
                            if(data.body[i].gameID==_this.onetypeid){
                                _this.Title = data.body[i].show_name;
                                _this.playTypeName = data.body[i].show_name;
                            }
                        }
                        _this.DigitalGameList.sort(_this.compareNum('sort'));

                        //(_this.DigitalGameList);

                    } else {}
                },

                error: function error(res) {}
            };
            base.callCommonApi(obj);
        },

        // 获取胜负彩和任选九的开奖数据
        getQiByData: function getQiByData() {
            var _this = this;
            base.callCommonApi({
                type: 'post',
                url: "/commonAPI/football/selectSFC",
                data: {
                    oneTypeId: 2,
                    bannerNumber: ''
                },
                success: function success(data) {
                    _this.datas.totalGoal = [];
                    _this.datas.scoreArr = [];
                    _this.datas.homeTeamArr = [];
                    _this.datas.awayTeamArr = [];
                    //(data)
                    if (data.code == 200) {
                        data.body.map(function (item) {
                            _this.datas.totalGoal.push(item.spf);
                            _this.datas.scoreArr.push(item.spfStr);
                            _this.datas.homeTeamArr.push(item.homeTeamName);
                            _this.datas.awayTeamArr.push(item.awayTeamName);
                        });
                        _this.getPrizeInfo();
                        _this.flag = true;
                    } else {
                        _this.flag = false;
                    }
                }
            });
        },
        //点击期数时获取对应期数的胜负彩和任选九开奖数据
        ClickQiByData: function ClickQiByData(num) {
            var _this = this;
            _this.selBanner = num;
            _this.isShowBanner = false;
            var bannerNumber = _this.selBanner;
            if (_this.playTypeName == "足球单场") {
                _this.dcGameData = [];
                _this.getDcGameData();
            } else {
                base.callCommonApi({
                    url: "/commonAPI/football/selectSFC",
                    data: {
                        oneTypeId: 2,
                        bannerNumber: bannerNumber
                    },
                    success: function success(data) {
                        _this.datas.totalGoal = [];
                        _this.datas.scoreArr = [];
                        _this.datas.homeTeamArr = [];
                        _this.datas.awayTeamArr = [];
                        //(data)
                        if (data.code == 200) {
                            data.body.map(function (item) {
                                _this.datas.totalGoal.push(item.spf);
                                _this.datas.scoreArr.push(item.spfStr);
                                _this.datas.homeTeamArr.push(item.homeTeamName);
                                _this.datas.awayTeamArr.push(item.awayTeamName);
                            });
                            _this.getPrizeInfo();
                        }
                    },
                    type: 'post'
                });
            }
        },
        //点击某一类玩法时重新加载页面
        searchAnother: function searchAnother(hash_value) {
            localStorage.lottery_id = hash_value;
            var urlStr = './lotdetail.html#' + hash_value;
            window.location.href = urlStr;
            window.location.reload();
        },
        //查询任选9和胜负彩的期数
        getQiData: function getQiData(callback) {
            var _this = this;
            _this.datas.totalQi = [];
            base.callCommonApi({
                url: "/commonAPI/football/selectQiByPlayType",
                data: {
                    oneTypeId: '2'
                },
                success: function success(data) {
                    if (data.body) {
                        data.body.map(function (item) {
                            if (item) {
                                _this.datas.totalQi.push(item);
                            }
                        });
                        _this.selBanner = _this.datas.totalQi[0];
                        if (callback) {
                            callback();
                        }
                    } else {}
                },
                type: 'post'
            });
            //(_this.datas.totalQi)
        },
        //查询足球单场的期数
        getDcQiData: function getDcQiData() {
            var _this = this;
            _this.datas.totalQi = [];
            base.callCommonApi({
                url: '/commonAPI/football/selectQiByPlayType',
                data: {
                    oneTypeId: 3
                },
                success: function success(data) {
                    if (data.body) {
                        //(data.body)
                        _this.datas.totalQi = [];
                        data.body.map(function (item) {
                            if (item) {
                                _this.datas.totalQi.push(item);
                            }
                        });
                        //(_this.datas.totalQi.sort().reverse())
                        _this.selBanner = _this.datas.totalQi[0];
                        _this.getDcGameData('', '');
                    }
                },
                type: "post"
            });
        },
        //获取竞彩足球所有比赛的数据
        getAllData: function getAllData() {
            this.jczqDatas = [];
            var _this = this;
            _this.noData = false;
            _this.onLoad = true;
            var tempDay = this.fun_date(-1);
            var day = $("#selDate").val() ? $("#selDate").val() : tempDay;
            day = _this.getBeforeDays(day, 1);
            day = _this.getBeforeDays(day, -1);
            //(day)
            base.callCommonApi({
                url: '/commonAPI/football/theLottery',
                data: {
                    oneTypeId: 1,
                    shaiDate: day,
                    source: 1
                },
                success: function success(data) {
                    //(data)
                    if (data.code == 201) {
                        _this.noData = true;
                        _this.onLoad = false;
                    }
                    if (data.body) {
                        data.body.map(function (item, index) {
                            var tempObj = {};
                            var tempArr = item.matchDate.split(" ");
                            // 处理时间和比赛场次
                            tempObj.rounds = _this.getWeekDay(tempArr[0]) + (index < 9 ? '0' + (index + 1) : index + 1);
                            tempObj.startTime = tempArr[1];
                            tempObj.leagueName = item.leagueName;
                            tempObj.homeTeam = item.homeTeam.teamName;
                            tempObj.awayTeam = item.awayTeam.teamName;
                            // 判断是否返回胜平负相关数据
                            if (item.spf) {
                                tempObj.spf = item.spf;
                            } else {
                                tempObj.spf = '--';
                                tempObj.spfP = '--';
                            }
                            if (item.spfP) {
                                tempObj.spfP = item.spfP;
                            } else {
                                tempObj.spfP = '--';
                            }
                            //判断是否返回让球胜平负相关数据
                            if (item.rqspf) {
                                tempObj.rqspf = item.rqspf;
                            } else {
                                tempObj.rqspf = '--';
                            }
                            if (item.rspfP) {
                                tempObj.rspfP = item.rspfP;
                            } else {
                                tempObj.rspfP = '--';
                            }
                            if (item.totalCountP) {
                                tempObj.totalCountP = item.totalCountP;
                            } else {
                                tempObj.totalCountP = '--';
                            }
                            if (item.totalCount != 'undefind') {
                                tempObj.totalCount = item.totalCount;
                            } else {
                                tempObj.totalCount = '--';
                            }
                            if (item.banquanchang) {
                                tempObj.banquanchang = item.banquanchang;
                            } else {
                                tempObj.banquanchang = '--';
                            }
                            if (item.banquanchangP) {
                                tempObj.banquanchangP = item.banquanchangP;
                            } else {
                                tempObj.banquanchangP = '--';
                            }
                            if (item.courtScore) {
                                tempObj.courtScore = item.courtScore;
                            } else {
                                tempObj.courtScore = '--';
                            }
                            if (item.halfCourtScore) {
                                tempObj.halfCourtScore = item.halfCourtScore;
                            } else {
                                tempObj.halfCourtScore = '--';
                            }
                            if (item.qbifen) {
                                tempObj.qbifen = item.qbifen;
                            } else {
                                tempObj.qbifen = '--';
                            }
                            tempObj.letballNumber = item.letballNumber;
                            _this.jczqDatas.push(tempObj);
                        });
                        _this.onLoad = false;
                    }
                },
                type: 'post'
            });
        },
        //根据日期获取新的数据
        getDatasByDate: function getDatasByDate() {
            var _this = this;
            _this.onLoad = true;
            _this.noData = false;
            var switch_key = '';
            //根据当前显示的模块获取对应的数据
            for (var key in this.tabItem) {
                if (this.tabItem[key]) {
                    switch_key = key;
                }
            }
            if (_this.playType == 'jclq') {
                setTimeout(function () {
                    _this.getBasketballData();
                }, 30);
                return;
            }
            setTimeout(function () {
                _this.getAllData();
            }, 20);
        },
        getDcGameData: function getDcGameData(type) {
            var _this = this;
            var banner = _this.selBanner;
            _this.noData = false;
            var obj = {
                url: '/commonAPI/football/pcwinningData',
                data: {
                    one_type_id: 3,
                    play_type_id: _this.play_type_id,
                    banner_number: banner,
                    source: 1
                },
                type: 'post',
                dataType: 'json',
                success: function success(data) {
                    //(data)
                    if (data.code == 201) {
                        _this.noData = true;
                    }
                    if (data.body) {
                        data.body.map(function (item, index) {
                            var tempObj = item;
                            if (item.match_date) {
                                var tempArr = item.match_date.split(" ");
                                tempObj.startTime = tempArr[1].substring(0, 5);
                                tempObj.rounds = _this.getWeekDay(tempArr[0]) + (index < 9 ? '0' + (index + 1) : index + 1);
                            } else {
                                tempObj.startTime = '-';
                                tempObj.rounds = '-';
                            }
                            tempObj.leagueName = item.league_name;
                            tempObj.homeTeam = item.home_team_name;
                            tempObj.awayTeam = item.away_team_name;
                            if (item.court_score) {
                                tempObj.totalGoal = +item.court_score.split(":")[0] + +item.court_score.split(":")[1];
                            }
                            if (item.half_court_result) {
                                var arrStr = item.half_court_result.split("_");
                                tempObj.half_all_str = '';
                                arrStr.map(function (item) {
                                    switch (item) {
                                        case 'win':
                                            tempObj.half_all_str += '胜';
                                            break;
                                        case 'draw':
                                            tempObj.half_all_str += '平';
                                            break;
                                        case 'lose':
                                            tempObj.half_all_str += '负';
                                            break;

                                        default:
                                            break;
                                    }
                                });
                            }
                            switch (item.letball_result) {
                                case 'letball_lose':
                                    item.letball_result = "负";
                                    tempObj.matchOdds = item.letball_lose != undefined ? item.letball_lose.toFixed(2) : '暂无';
                                    break;
                                case 'letball_win':
                                    item.letball_result = "胜";
                                    tempObj.matchOdds = item.letball_win != undefined ? item.letball_win.toFixed(2) : '暂无';
                                    break;
                                case 'letball_draw':
                                    item.letball_result = "平";
                                    tempObj.matchOdds = item.letball_draw != undefined ? item.letball_draw.toFixed(2) : '暂无';
                                    break;
                                default:
                                    break;
                            }
                            switch (item.not_letball_result) {
                                case 'home_lose':
                                    item.not_letball_result = "负";
                                    tempObj.gameOdds = item.home_lose;
                                    tempObj.matchOdds = item.letball_lose != undefined ? item.letball_lose.toFixed(2) : '暂无';
                                    break;
                                case 'home_win':
                                    item.not_letball_result = "胜";
                                    tempObj.gameOdds = item.home_win;
                                    tempObj.matchOdds = item.letball_win != undefined ? item.letball_win.toFixed(2) : '暂无';
                                    break;
                                case 'home_draw':
                                    item.not_letball_result = "平";
                                    tempObj.gameOdds = item.home_draw;
                                    tempObj.matchOdds = item.letball_draw != undefined ? item.letball_draw.toFixed(2) : '暂无';
                                    break;
                                default:
                                    break;
                            }
                            switch (item.up_down_result) {
                                case 'up_odd':
                                    tempObj.upDown = "上单";
                                    tempObj.upDownOdds = item.up_odd != undefined ? item.up_odd.toFixed(2) : '暂无';
                                    break;
                                case 'up_even':
                                    tempObj.upDown = "上双";
                                    tempObj.upDownOdds = item.up_even != undefined ? item.up_even.toFixed(2) : '暂无';
                                    break;
                                case 'down_odd':
                                    tempObj.upDown = "下单";
                                    tempObj.upDownOdds = item.down_odd != undefined ? item.down_odd.toFixed(2) : '暂无';
                                    break;
                                case 'down_even':
                                    tempObj.upDown = "下双";
                                    tempObj.upDownOdds = item.down_even != undefined ? item.down_even.toFixed(2) : '暂无';
                                    break;
                                default:
                                    break;
                            }
                            // 判断比分的赔率
                            if (item.court_score_result_bj != undefined) {
                                item.courtScoreOdds = item[item.court_score_result_bj].toFixed(2);
                                if (item.court_score_result_bj.indexOf("lose_other") != -1) {
                                    item.court_score_result = '负其他';
                                } else if (item.court_score_result_bj.indexOf("win_other" != -1) != -1) {
                                    item.court_score_result = '胜其他';
                                } else if (item.court_score_result_bj.indexOf("draw_other") != -1) {
                                    item.court_score_result = '平其他';
                                } else {
                                    item.court_score_result = item.court_score;
                                }
                            } else {
                                item.court_score_result = "暂无";
                            }
                            item.total_goal_number = 0 - (0 - item.court_score.split(":")[0] - item.court_score.split(":")[1]);
                            item.totalOdds = item[item.total_goal_result].toFixed(2);
                            // 判断是否返回胜平负相关数据
                            _this.dcGameData.push(tempObj);
                        });
                    }
                },
                error: function error(res) {
                    _this.noData = true;
                }
                //(obj.data)
            };base.callCommonApi(obj);
        },
        //获取几天前的日期为某一天
        fun_date: function fun_date(day) {
            var date1 = new Date(),
                time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(); //time1表示当前时间
            var date2 = new Date(date1);
            date2.setDate(date1.getDate() + day);
            var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + (date2.getDate() >= 10 ? date2.getDate() : '0' + date2.getDate());
            return time2;
        },
        // 改变竞彩篮球
        changeBasketTab: function changeBasketTab(key) {
            for (var keys in this.basketTabItem) {
                this.basketTabItem[keys] = false;
            }
            this.basketTabItem[key] = true;
        },
        //获取竞彩篮球相关数据
        getBasketballData: function getBasketballData() {
            this.basketData = [];
            var _this = this;
            var day = $("#selDate").val() ? $("#selDate").val() : _this.fun_date(-1);
            day = _this.getBeforeDays(day, 1);
            day = _this.getBeforeDays(day, -1);
            var obj = {
                type: 'post',
                data: {
                    selectDate: day,
                    source: 1
                },
                url: '/commonAPI/basketball/getBasketballResult',
                success: function success(data) {
                    //(data)
                    _this.onLoad = false;
                    _this.noData = false;
                    if (data.code == 200) {
                        data.body.map(function (item) {
                            item.gameTime = _this.getWeekDay(item.matchDate.substr(0, 10));
                            item.startTime = item.matchDate.substr(11, 5);
                            item.homeTeamScore = item.courtScore.split(':').pop();
                            item.awayTeamScore = item.courtScore.split(':').shift();
                            item.letScoreArr && item.letScoreArr.reverse();
                            item.letScoreResultArr && item.letScoreResultArr.reverse();
                            item.letScoreResult = item.letScoreResultArr ? item.letScoreResultArr[0] : '-';
                            item.letResult = item.letScoreResult != '-' ? item.letScoreResult == "letscore_win" ? '1' : '0' : '-';
                            item.letScoreResult = item.letScoreArr[0];
                            item.bigSmallScoreArr && item.bigSmallScoreArr.reverse();
                            item.bigSmallScore = item.bigSmallScoreArr ? item.bigSmallScoreArr[0] : '-';
                            item.bigSmallScoreResultArr && item.bigSmallScoreResultArr.reverse();
                            item.bsResult = item.bigSmallScoreResultArr ? item.bigSmallScoreResultArr[item.bigSmallScoreResultArr.length - 1] == "big_score" ? '1' : '0' : '-';
                            //(item.bsResult)
                            //(item.bigSmallScoreResultArr)
                            item.winScoreResult = item.winScoreResult.indexOf("lose") != -1 ? item.winScoreResult.replace("lose", "主负") : item.winScoreResult.replace("win", "主胜");
                            item.winScoreResult = item.winScoreResult.replace('_', '-');
                        });
                        _this.basketData = data.body;
                        //(_this.basketData)
                    } else {
                        _this.onLoad = false;
                        _this.noData = true;
                    }
                },
                error: function error(res) {
                    _this.noData = true;
                }
            };
            base.callCommonApi(obj);
        },
        changeBaskSelInfo: function changeBaskSelInfo() {
            this.basketData.map(function (item) {
                item.letResult = item.letScoreResultArr[item.letindex] == "letscore_win" ? "1" : "0";
                item.bsResult = item.bigSmallScoreResultArr[item.bsindex] == "big_score" ? '1' : '0';
            });
        },
        getBeforeDays: function getBeforeDays(currDate, num) {
            //num表示天数，接受正负数
            if (!num) {
                //做num简单验证
                return currDate;
            }
            num = Math.floor(num);
            var symbol = '/';
            if (currDate.indexOf('-') > -1) {
                symbol = '-';
                currDate = currDate.replace(/-/g, '/');
            } else if (currDate.indexOf('.') > -1) {
                symbol = '.';
                currDate = currDate.replace(/\./g, '/');
            }
            //symbol = '-'; //定制输出分隔符
            var myDate = new Date(currDate),
                lw = new Date(Number(myDate) + 1000 * 60 * 60 * 24 * num),
                //num天数
            lastY = lw.getFullYear(),
                lastM = lw.getMonth() + 1,
                lastD = lw.getDate(),
                startdate = lastY + symbol + (lastM < 10 ? "0" + lastM : lastM) + symbol + (lastD < 10 ? "0" + lastD : lastD);
            return startdate;
        },
        getPrizeInfo: function getPrizeInfo() {
            var _this = this;
            _this.prize_store.sfc_prize = {};
            _this.prize_store.rxj_prize = [];
            var data = {
                banner: this.selBanner
                // banner: 17177
            };
            //(this.bannerNumber)
            var obj = {
                type: 'post',
                data: data,
                dataType: 'json',
                url: '/commonAPI/systranprize/selectSfcRxj',
                success: function success(data) {
                    if (data.code == 200) {
                        if (data.body.length != 0) {
                            data.body.map(function (item) {
                                if (item.play_type_id == "14") {
                                    _this.prize_store.sfc_prize = item;
                                } else {
                                    _this.prize_store.rxj_prize = item;
                                }
                            });
                        }
                    }
                },
                error: function error(msg) {
                    //(msg);
                }
            };
            base.callCommonApi(obj);
        },

        //获取福彩3D,重庆时时彩,北京pk10,北京28,安徽快3的开奖记录
        // 获取历史开奖数据
        getHistoryBannerInfo: function getHistoryBannerInfo() {
            var _this = this;
            if (localStorage.img_list) {
                _this.ImgSrc = "../" + JSON.parse(localStorage.img_list)[_this.onetypeid];
            }
            //(_this.ImgSrc);
            var obj = {
                type: "post",
                url: '/commonAPI/hisOpenData',
                data: {
                    one_type_id: parseInt(_this.onetypeid),
                    count: 20,
                    isWhite: true
                },
                success: function success(data) {
                    //(data);
                    if (data.code == 200 && data.body && data.body.length != 0) {
                        _this.history = data.body;
                        _this.onetypeid = data.body[0].one_type_id;
                        var list=localStorage.gameIdList?JSON.parse(localStorage.gameIdList):'',oList;
                        if(list){
                            for(var i in list){
                                oList=list[i].split(",");
                                if(oList.indexOf(_this.onetypeid)!=-1){
                                    _this.gameCode=i;
                                    break
                                }
                            }
                        }
                        

                        for (var i = 0; i < _this.history.length; i++) {
                            if (_this.gameCode == 'PCDD') {
                                data.body[i].luck_number = data.body[i].luck_number.replace(/,/g, ",+,").split(',');
                                var sum = parseInt(data.body[i].luck_number[0]) + parseInt(data.body[i].luck_number[2]) + parseInt(data.body[i].luck_number[4]);
                                data.body[i].luck_number.push("=");
                                data.body[i].luck_number.push(sum);
                            } else {
                                data.body[i].luck_number = data.body[i].luck_number.replace("+", ",=,").split(',');
                            }
                        }
                        _this.recentlyNum = data.body[0].luck_number;

                        //(_this.recentlyNum);

                        _this.presentNum = parseInt(data.body[0].issue);
                        _this.open_time = data.body[0].open_time.substr(0, 10);
                        // _this.Title = data.body[0].type_name_CN;
                        // _this.playTypeName = data.body[0].type_name_CN;
                    } else {}
                },
                error: function error(res) {}
            };
            base.callCommonApi(obj);
        },

        //判断某个元素是否存在某个数组中
        isArrayContainer: function isArrayContainer(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                    return true;
                }
            }
            return false;
        }

    },
    watch: {
        basketData: {
            handler: function handler() {
                // this.changeBaskSelInfo();
            },
            deep: true
        }
    }
});
$('.rule').click(function () {
    $('.rule-detail').css("display", "block");
});
$('.close-rule').click(function () {
    $('.rule-detail').css("display", "none");
});
$('.tab_header span').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.tab_body').children().eq($(this).index()).addClass("active").siblings().removeClass('active');
});