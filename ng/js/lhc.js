$(function () {
    $(document).attr('title',lhc.typeName);
    // 点击玩法选择界面的某一个选项时切换到改选项下
    $(".play_choice .tab").on("click", "li", function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        $(".playList ul").children("li").css({ display: "none" })
        $(".playList ul").children("li").eq($(this).index()).css({ display: "block" });
        $(".playList li:visible").find(".radio_group.active").removeClass("active");
        $(".playList li:visible").find(".radio_group:first").addClass("active");
    })

    // 控制机选注数控制菜单的显示隐藏
    $(".btnList").on("mouseenter",".draw_menu", function () {
        $(this).children("ul").css({ "display": "block" })
    })
    $(".btnList").on("mouseleave",".draw_menu", function () {
        $(this).children("ul").css({ "display": "none" })
    })


    $("body").on("click", ".radio_group", function () {
        $(this).parents("li").find(".radio_group").removeClass("active");
        $(this).addClass("active");
    })
    $('.orderOdds').hover(function(){
		$('#odds').show();
	},function(){
		$('#odds').hide();
	})

})
let lhc = new Vue({
    el: "#cqssc-container",
    data: {
        oneTypeId: '',
        code:'hk6',
        //当前期数
        preventBanner: "",
        //截止时间
        deadlineStr: "",
        hundMal: 1,
        //收藏
        isCollect: 0,



        recentlyNum: '', // 最近期号
        recentlyColor:'', //最近期号颜色
        parentIndex: 0,
        playExplain: "",


        //储存接受的数据
        menu: [],

        //当前可投注的信息
        betinfo:[],

        off_sale: true,


        betarea:[], //当前投注项

        isCircleBets: false, //圆形下是否有赔率
        isRect:true,  //是否是正方形样式
        isbetshow:true,//赔率是否显示

        ranNum: 1, //选中的随机个数
        randnumList:[], // 随机数数组

        // common共用区域选值
        numberArr: [],

        //控制显示的数字数列区域，0为不显示
        presentAreaList: [0,0,0,0,0,0,0,0],


        //控制机选的数字列表
     ranNumList:[1,1,1,1,1,1,1,1],
		testNumber: [10, 50, 100, 200, 500, 1000, 5000, 10000, 50000],

        //存储当前的下标
        presentIndexList:[0,0],

        typeName:'',
        pic_url:'', // 图片路径

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

//      投注项
        BetsArea:[],

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

        //绿波  红波 蓝波  #07bf00  #ff2600   #008fff
        greenNum:["05","06","11","16","17","21","22","27","28","32","33","38","39","43","44","49"],  //绿波
        blueNum:["03","04","09","10","14","15","20","25","26","31","36","37","41","42","47","48"],  //绿波
        redNum:["01","02","07","08","12","13","18","19","23","24","29","30","34","35","40","45","46"],  //绿波

        gameAreaShow:[0,0,0],

        firstArea_title:"",
        commonArea_title:"",

        present_title:"",
        present_playId:"",

        //特殊号--对应单注中奖金额
        special_sum:"",
        special_indexList:[],

        //上期期号
        presentNum:"",

        //暂未开售禁止投注
        bet_forbid: false,

        judgeList:{
            // 特码B-选码
            tm_xm: {
                judgeId: 11,
                code3:'hk6_tm_xm',
            },
            // 特码B-其他
            tm_qt: {
                judgeId: 12,
                code3:'hk6_tm_qt',

            },
            // 特码A-选码
            // tmA_xm: {
            //     judgeId: 21,
            //     code3:'hk6_tma_xm',
            // },
            // 特码A-其他
            // tmA_qt: {
            //     judgeId: 22,
            //     code3:'hk6_tma_qt',
            // },
            // 色波-色波
            sb_sb: {
                judgeId: 31,
                code3:'hk6_sb_sb',
            },
            // 色波-半波
            sb_bb: {
                judgeId:32,
                code3:'hk6_sb_bb',
            },
            // 色波-半半波
            sb_bbb: {
                judgeId:33,
                code3:'hk6_sb_bbb',
            },
            // 特肖-生肖
            tx_sx: {
                judgeId:41,
                code3:'hk6_tx_sx',
            },
            // 合肖-合肖
            tx_hx: {
                judgeId:51,
                code3:'hk6_hx_hx',
            },
            // 头尾数-头尾数
            tws_tws: {
                judgeId:61,
                code3:'hk6_tws_tws',
            },
            // 正码-选码
            zm_xm: {
                judgeId: 71,
                code3:'hk6_zm_xm',
            },
            // 正码-其他
            zm_qt: {
                judgeId:72,
                code3:'hk6_zm_qt',
            },
            // 正码特-正一特
            zmt_zt1: {
                judgeId:81,
                code3:'hk6_zmt_zt1',
            },
            // 正码特-正一特大小
            zmt_zt1dx: {
                judgeId: 82,
                code3:'hk6_zmt_zt1dx',
            },
            // 正码特-正二特
            zmt_zt2: {
                judgeId:83,
                code3:'hk6_zmt_zt2',
            },
            // 正码特-正二特大小
            zmt_zt2dx: {
                judgeId:84,
                code3:'hk6_zmt_zt2dx',
            },
            // 正码特-正三特
            zmt_zt3: {
                judgeId:85,
                code3:'hk6_zmt_zt3',
            },
            // 正码特-正三特大小
            zmt_zt3dx: {
                judgeId:86,
                code3:'hk6_zmt_zt3dx',
            },
            // 正码特-正四特
            zmt_zt4: {
                judgeId:87,
                code3:'hk6_zmt_zt4',
            },
            // 正码特-正四特大小
            zmt_zt4dx: {
                judgeId:88,
                code3:'hk6_zmt_zt4dx',
            },
            // 正码特-正五特
            zmt_zt5: {
                judgeId:89,
                code3:'hk6_zmt_zt5',
            },
            // 正码特-正五特大小
            zmt_zt5dx: {
                judgeId:810,
                code3:'hk6_zmt_zt5dx',
            },
            // 正码特-正六特
            zmt_zt6: {
                judgeId:811,
                code3:'hk6_zmt_zt6',
            },
            // 正码特-正六特大小
            zmt_zt6dx: {
                judgeId:812,
                code3:'hk6_zmt_zt6dx',
            },
            // 正码1-6-正码一
            zm16_zm1: {
                judgeId:91,
                code3:'hk6_zm16_zm1',
            },
            // 正码1-6-正码二
            zm16_zm2: {
                judgeId:92,
                code3:'hk6_zm16_zm2',
            },
            // 正码1-6-正码三
            zm16_zm3: {
                judgeId:93,
                code3:'hk6_zm16_zm3',
            },
            // 正码1-6-正码四
            zm16_zm4: {
                judgeId:94,
                code3:'hk6_zm16_zm4',
            },
            // 正码1-6-正码五
            zm16_zm5: {
                judgeId:95,
                code3:'hk6_zm16_zm5',
            },
            // 正码1-6-正码六
            zm16_zm6: {
                judgeId:96,
                code3:'hk6_zm16_zm6',
            },
            // 五行-种类
            wx_zl: {
                judgeId:101,
                code3:'hk6_wx_zl',
            },
            // 平特一肖尾数-一肖
            ptyxws_x1: {
                judgeId:111,
                code3:'hk6_ptyxws_x1',
            },
            // 平特一肖尾数-尾数
            ptyxws_ws: {

                judgeId:112,
                code3:'hk6_ptyxws_ws',

            },
            // 正肖-生肖
            zx_sx: {

                judgeId:121,
                code3:'hk6_zx_sx',

            },
            // 7色波-种类
            sb7_z1: {

                judgeId:131,
                code3:'hk6_sb7_z1',

            },
            // 总肖-种类
            zox_z1: {

                judgeId:141,
                code3:'hk6_zox_z1',

            },
            // 自选不中-自选不中
            zxbz_zxbz: {

                judgeId:151,
                code3:'hk6_zxbz_zxbz',

            },
            // 连肖连尾-二连肖
            lxlw_lx2: {

                judgeId:161,
                code3:'hk6_lxlw_lx2',
            },
            // 连肖连尾-三连肖
            lxlw_lx3: {

                judgeId:162,
                code3:'hk6_lxlw_lx3',
            },
            // 连肖连尾-四连肖
            lxlw_lx4: {
                judgeId:163,
                code3:'hk6_lxlw_lx4',
            },
            // 连肖连尾-五连肖
            lxlw_lx5: {

                judgeId:164,
                code3:'hk6_lxlw_lx5',
            },
            // 连肖连尾-二连尾
            lxlw_lw2: {

                judgeId:165,
                code3:'hk6_lxlw_lw2',
            },
            // 连肖连尾-三连尾
            lxlw_lw3: {

                judgeId:166,
                code3:'hk6_lxlw_lw3',
            },
            // 连肖连尾-四连尾
            lxlw_lw4: {
                judgeId:167,
                code3:'hk6_lxlw_lw4',
            },
            // 连肖连尾-五连尾
            lxlw_lw5: {

                judgeId:168,
                code3:'hk6_lxlw_lw5',
            },
            // 连码-三中二
            lm_3z2: {

                judgeId:171,
                code3:'hk6_lm_3z2',

            },
            // 连码-三全中
            lm_3qz: {

                judgeId:172,
                code3:'hk6_lm_3qz',

            },
            // 连码-二全中
            lm_2qz: {

                judgeId:173,
                code3:'hk6_lm_2qz',

            },
            // 连码-二中特
            lm_2zt: {

                judgeId:174,
                code3:'hk6_lm_2zt',

            },
            // 连码-特串
            lm_tc: {


                judgeId:175,
                code3:'hk6_lm_tc',
            },
            // 连码-四全中
            lm_4qz: {
                judgeId:176,
                code3:'hk6_lm_4qz',

            },

            zodiacRule:JSON.parse(localStorage.config).zodiacRule,

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
        localStorage.lottery_id=this.oneTypeId;
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
                window.location.search = '?8';
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


        //判断某个元素是否存在某个数组中
        isArrayContainer:function(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                    return true;
                }
            }
            return false;
        },

        // 获取历史开奖数据
        getHistoryBannerInfo: function() {
            var _this = this,colorList=[],
                obj = {
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
                            _this.history[i].recentlyNum = _this.history[i].luck_number;
                            _this.history[i].color='';
                            colorList = _this.history[i].recentlyNum.split(/[+ ,]/);
                            colorList.map(function (item) {
                                if(_this.isArrayContainer(_this.greenNum,item)){
                                    if(_this.history[i].color!=''){
                                        _this.history[i].color=_this.history[i].color+","+'green';
                                    }else{
                                        _this.history[i].color='green';
                                    }
                                }else if(_this.isArrayContainer(_this.blueNum,item)){
                                    if(_this.history[i].color!=''){
                                        _this.history[i].color =_this.history[i].color+","+'blue' ;
                                    }else{
                                        _this.history[i].color='blue';
                                    }
                                } else if(_this.isArrayContainer(_this.redNum,item)){
                                    if(_this.history[i].color!=''){
                                        _this.history[i].color=_this.history[i].color+","+'red';
                                    }else{
                                        _this.history[i].color='red';
                                    }
                                }
                            });
                            _this.history[i].recentlyColor = _this.history[i].color;
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
                        _this.lastTime=_this.getMilliseconds(data.body.deadline);
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
                        _this.deadlineStr = "数据获取中...";
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
                item.betList = objList.betList;
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
            if (userNameMsg ) {
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
            var numList,  areaList=[0],betList=[];
            switch(jd) {
                case 11: //前三-直选复式
                case 21: //前三-直选复式
                case 71: //前三-直选复式
                case 81: //前三-直选复式
                case 83: //前三-直选复式
                case 85: //前三-直选复式
                case 87: //前三-直选复式
                case 89: //前三-直选复式
                case 811: //前三-直选复式
                case 151: //前三-直选复式
                case 171: //前三-直选复式
                case 172: //前三-直选复式
                case 173: //前三-直选复式
                case 174: //前三-直选复式
                case 175: //前三-直选复式
                case 176: //前三-直选复式
                    // numList=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49];
                    numList=["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"];
                    break;
                case 12: //中三-直选复式
                case 22: //中三-直选复式
                    numList=["特大","特小","特尾大","特尾小","特单","特双","特大单","特大双","特合大","特合小","特小单","特小双","特合单","特合双","特天肖","特地肖","特前肖","特后肖","特家肖","特野肖"];
                    break;
                case 31:
                    numList=["红波","蓝波","绿波"];
                    betList=[
                        ["01","02","07","08","12","13","18","19","23","24","29","30","34","35","40","45","46"],
                        ["03","04","09","10","14","15","20","25","26","31","36","37","41","42","47","48"],
                        ["05","06","11","16","17","21","22","27","28","32","33","38","39","42","44","49"],

                    ];
                    break;
                case 32:
                    numList=["红单","红双","红大","红小","蓝单","蓝双","蓝大","蓝小","绿单","绿双","绿大","绿小"];
                    break;
                case 33:
                    numList=["红大单","红大双","红小单","红小双","蓝大单","蓝大双","蓝小单","蓝小双","绿大单","绿大双","绿小单","绿小双"];
                    break;
                case 41:
                case 51:
                case 111:
                case 121:
                case 161:
                case 162:
                case 163:
                case 164:
                    numList =["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
                    break;
                case 61:
                     numList=["0头","1头","2头","3头","4头","1尾","2尾","3尾","4尾","5尾","6尾","7尾","8尾","9尾","0尾"];
                     break;
                case 72:
                    numList=["总大","总小","总单","总双"];
                    break;
                case 82:
                    numList=["正一大","正一小","正一单","正一双","正一合单","正一合双","正一红","正一蓝","正一绿"];
                    break;
                case 84:
                    numList=["正二大","正二小","正二单","正二双","正二合单","正二合双","正二红","正二蓝","正二绿"];
                    break;
                case 86:
                    numList=["正三大","正三小","正三单","正三双","正三合单","正三合双","正三红","正三蓝","正三绿"];
                    break;
                case 88:
                    numList=["正四大","正四小","正四单","正四双","正四合单","正四合双","正四红","正四蓝","正四绿"];
                    break;
                case 810:
                    numList=["正五大","正五小","正五单","正五双","正五合单","正五合双","正五红","正五蓝","正五绿"];
                    break;
                case 812:
                    numList=["正六大","正六小","正六单","正六双","正六合单","正六合双","正六红","正六蓝","正六绿"];
                    break;
                case 91:
                case 92:
                case 93:
                case 94:
                case 95:
                case 96:
                    numList=["单码","双码","大码","小码","合单","合双","合大","合小","红波","蓝波","绿波","尾大","尾小"];
                    break;
                case 101:
                    numList=["金","木","水","火","土"];
                    betList=[
                        ["04","05","18","19","26","27","34","35","48","49"],
                        ["01","08","09","16","17","30","31","38","39","46","47"],
                        ["06","07","14","15","22","23","36","37","44","45"],
                        ["02","03","10","11","24","25","32","33","40","41"],
                        ["12","13","20","21","28","29","42","43"],

                    ];
                    break;
                case 131:
                    numList=["红波","蓝波","绿波","和局"];
                    break;
                case 141:
                    numList=["2肖","3肖","4肖","5肖","6肖","7肖","总肖单","总肖双"];
                    break;
                case 112:
                case 165:
                case 166:
                case 167:
                case 168:
                    numList=["0尾","1尾","2尾","3尾","4尾","5尾","6尾","7尾","8尾","9尾"];
                    betList=[
                        ["10","20","30","40"],
                        ["01","11","21","31","41"],
                        ["02","12","22","32","42"],
                        ["03","13","23","33","43"],
                        ["04","14","24","34","44"],
                        ["05","15","25","35","45"],
                        ["06","16","26","36","46"],
                        ["07","17","27","37","47"],
                        ["08","18","28","38","48"],
                        ["09","19","19","39","49"],
                    ];
                    break;
                default:
                    areaList = [0];
                    break;
            }
            return {
                numList: numList, areaList: areaList, betList:betList
            }
        },

        //切换玩法
        //参数为外层的下标和内层下标
        switchover_play: function (oi, ii) {
            var _this = this, obj = _this.menu[oi].twoType[ii];
            _this.presentIndexList=[oi,ii];
            _this.game_tips = obj.game_tips;
            _this.maxPrize = obj.max_prize;
            _this.minPrize = obj.min_prize;
            _this.sigleminPrize = obj.max_prize.split("|");
            _this.maxReward = obj.max_reward;
            _this.orderOdds = obj.min_prize;
            _this.rebateNum=0;
            _this.rebate=obj.max_reward;
            _this.present_title=obj.name2+"-"+obj.name3;
            _this.present_playId=obj.judgeId;
            // _this.present_judgeId = obj.judgeId;
            _this.initialize_areaList(obj.areaList, obj.numList,obj.betList); //(第几行数,每列的元素)
        },
        //初始化--区域
        initialize_areaList: function(areaList, numList,betList) {
            var _this = this,jd =  _this.present_playId;
            _this.gameAreaShow=[0,0,0,0];
            _this.presentAreaList = [0, 0, 0, 0, 0, 0, 0, 0];
            _this.numberArr = [];
            numList.map(function(item) {
                _this.numberArr.push({
                    'num': item,
                    isSel: false
                });
            });
            Vue.set(_this.presentAreaList,0, 1);

            _this.numberArr.map(function (item,index) {
                item.odds = _this.sigleminPrize[index];
            });

            //颜色
            _this.numberArr.map(function (item) {
                if(_this.isArrayContainer(_this.greenNum,item.num)){
                    item.color = "green";
                    // item.color = "#07bf00";
                }else if(_this.isArrayContainer(_this.redNum,item.num)){
                    item.color = "red";
                    // item.color = "#ff2600";
                }else if(_this.isArrayContainer(_this.blueNum,item.num)){
                    item.color = "blue";
                }
            });
            if(betList.length!==0){
                _this.numberArr.map(function (item,index) {
                    item.bet = betList[index];
                });
            }else{
                var zodiacRule = JSON.parse(localStorage.config).zodiacRule;
                for(var key in zodiacRule){
                    _this.numberArr.map(function (item) {
                        if(item.num == key){
                            item.bet =  zodiacRule[key].replace("\"","").split(",");
                        }
                    })
                }
            }
            if(jd == 11||jd==21||jd==71||jd==81||jd==83||jd==85||jd==87||jd==89||jd==811||jd==151||jd==171||jd==172||jd==173||jd==174||jd==175||jd==176){
                _this.gameAreaShow[0] = 1;
            }else if(jd == 12||jd==22||jd==32||jd==33||jd==61||jd==72||jd==82||jd==84||jd==86||jd==88||jd==810||jd==812||jd==91||jd==92||jd==93||jd==94||jd==95||jd==96||jd==131||jd==141){
                _this.gameAreaShow[1] = 1;
            }else if(jd==31||jd==41||jd==51||jd==101||jd==111||jd==112||jd==121||jd==161||jd==162||jd==163||jd==164||jd==165||jd==166||jd==167||jd==168){
                _this.gameAreaShow[2] = 1;
            }

            if(jd!==51||jd!==151||jd!==171||jd!==172||jd!==173||jd!==174||jd!==175||jd!==176){
                _this.setSpecialSum();
            }

            switch (jd){
                case 51:
                    _this.randnumList = [2,3,4,5,6,7,8,9,10,11];
                   _this.ranNumList[0] =2;
                    break;
                case 151:
                    _this.randnumList = [6,7,8,9,10,11];
                    _this.ranNumList[0] =6;
                    break;
                case 161:
                    _this.randnumList = [2,3,4,5,6,7,8,9,10,11,12];
                    _this.ranNumList[0] =2;
                    break;
                case 162:
                    _this.randnumList =  [3,4,5,6,7,8,9,10,11,12];
                    _this.ranNumList[0] =3;
                    break;
                case 163:
                    _this.randnumList =  [4,5,6,7,8,9,10,11,12];
                    _this.ranNumList[0] =4;
                    break;
                case 164:
                    _this.randnumList =  [5,6,7,8,9,10,11,12];
                    _this.ranNumList[0] = 5;
                    break;
                case 165:
                    _this.randnumList = [2,3,4,5,6,7,8,9,10];
                    _this.ranNumList[0] = 2;
                    break;
                case 166:
                    _this.randnumList = [3,4,5,6,7,8,9,10];
                    _this.ranNumList[0] =3;
                    break;
                case 167:
                case 176:
                    _this.randnumList = [4,5,6,7,8,9,10];
                    _this.ranNumList[0] = 4;
                    break;
                case 168:
                    _this.randnumList = [5,6,7,8,9,10];
                    _this.ranNumList[0] = 5;
                    break;
                case 171:
                    _this.randnumList = [3,4,5,6,7];
                    _this.ranNumList[0] = 3;
                    break;
                case 172:
                    _this.randnumList =  [3,4,5,6,7,8,9,10];
                    _this.ranNumList[0] = 3;
                    break;
                case 173:
                case 174:
                case 175:
                    _this.randnumList = [2,3,4,5,6,7];
                    _this.ranNumList[0] = 2;
                    break;
                default:
                    _this.ranNumList[0] = 1;
                    break;
            }
            _this.orderOdds = _this.sigleminPrize[0];
        },

        // 点击元素时给元素加上选中的类  可能还要在这里调用自动计算注数的方法
        handleAddClass: function (item,index,type) {
            var _this = this,jd=_this.present_playId,count=0,tempArr=[];
            switch (jd){
                case 51:
                    item.isSel = !item.isSel;
                    _this.numberArr.map(function (item,index) {
                        if(item.isSel){
                            count = count+1;
                            tempArr.push(index)
                        }
                    });
                    tempArr.splice(tempArr.indexOf(index),1);
                    if(item.isSel){
                        tempArr.push(index);
                    }
                    if(tempArr.length>11){
                        var inIndex = parseInt(Math.random() * (tempArr.length-1));
                        _this.numberArr[tempArr[inIndex]].isSel = false;
                        tempArr.splice(tempArr.indexOf(inIndex),1);
                    }
                    if(count == 2){
                        _this.orderOdds = _this.minPrize.split("|")[0];
                    }else  if( count == 3){
                        _this.orderOdds = _this.minPrize.split("|")[1];
                    }else  if(count == 4){
                        _this.orderOdds = _this.minPrize.split("|")[2];
                    }else  if(count == 5){
                        _this.orderOdds = _this.minPrize.split("|")[3];
                    }else  if(count == 6){
                        _this.orderOdds = _this.minPrize.split("|")[4];
                    }else  if(count == 7){
                        _this.orderOdds = _this.minPrize.split("|")[5];
                    }else  if(count == 8){
                        _this.orderOdds = _this.minPrize.split("|")[6];
                    } else  if(count == 9){
                        _this.orderOdds = _this.minPrize.split("|")[7];
                    } else  if(count == 10){
                        _this.orderOdds = _this.minPrize.split("|")[8];
                    }else  if(count == 11){
                        _this.orderOdds = _this.minPrize.split("|")[9];
                    }
                    break;
                case 151:
                    item.isSel = !item.isSel;
                    _this.numberArr.map(function (item,index) {
                        if(item.isSel){
                            count = count+1;
                            tempArr.push(index)
                        }
                    });
                    tempArr.splice(tempArr.indexOf(index),1);
                    if(item.isSel){
                        tempArr.push(index);
                    }
                    if(tempArr.length>11){
                        var inIndex = parseInt(Math.random() * (tempArr.length-1));
                        _this.numberArr[tempArr[inIndex]].isSel = false;
                        tempArr.splice(tempArr.indexOf(inIndex),1);
                    }
                    if(count == 6){
                        _this.orderOdds = _this.minPrize.split("|")[0];
                    }else  if( count == 7){
                        _this.orderOdds = _this.minPrize.split("|")[1];
                    }else  if(count == 8){
                        _this.orderOdds = _this.minPrize.split("|")[2];
                    }else  if(count == 9){
                        _this.orderOdds = _this.minPrize.split("|")[3];
                    }else  if(count == 10){
                        _this.orderOdds = _this.minPrize.split("|")[4];
                    }else  if(count == 11){
                        _this.orderOdds = _this.minPrize.split("|")[5];
                    }
                    break;
                case 172:
                case 176:
                    item.isSel = !item.isSel;
                    _this.numberArr.map(function (item,index) {
                        if(item.isSel){
                            tempArr.push(index)
                        }
                    });
                    tempArr.splice(tempArr.indexOf(index),1);
                    if(item.isSel){
                        tempArr.push(index);
                    }
                    if(tempArr.length>10){
                        var inIndex = parseInt(Math.random() * (tempArr.length-1));
                        _this.numberArr[tempArr[inIndex]].isSel = false;
                        tempArr.splice(tempArr.indexOf(inIndex),1);
                    }
                    break;
                case 171:
                case 173:
                case 174:
                case 175:
                    item.isSel = !item.isSel;
                    _this.numberArr.map(function (item,index) {
                        if(item.isSel){
                            tempArr.push(index)
                        }
                    });
                    tempArr.splice(tempArr.indexOf(index),1);
                    if(item.isSel){
                        tempArr.push(index);
                    }
                    if(tempArr.length>7){
                        var inIndex = parseInt(Math.random() * (tempArr.length-1));
                        _this.numberArr[tempArr[inIndex]].isSel = false;
                        tempArr.splice(tempArr.indexOf(inIndex),1);
                    }
                    break;
                default:
                    item.isSel = !item.isSel;
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
            _this.recentBetInfo.betsClause = [];

            seloptArr.map(function(item) {
                _this.recentBetInfo.betsClause.push(item);
            });

            //          _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins
        },
        //机选元素个数选择
        changeRandomNum: function(index, num) {
            var _this = this;
            Vue.set(_this.ranNumList, index, num);
            $(".draw_menu ul").css("display", "none");
        },

        //机选事件
        //参数index对应区域块，type 0-机选 1-全选
        randomNum: function(index, type,event) {
            var _this=this,numList=[],ranNum,event = event.currentTarget,
                noselList = $(event).parents('.btnList').siblings(".numberList ").find("p:not('.sel_num')"),
                sealList = $(event).parents('.btnList').siblings(".numberList ");
            _this.numberArr.map(function (item,index) {
                numList.push(index);
            });
            if(type==1){
                noselList.map(function (item,index) {
                    $(index).trigger("click");
                });
            }else{
                _this.numberArr.map(function (item) {
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
                    betsClause: _this.recentBetInfo.betsClause.join(","),
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

        //随机数据
        randomData:function(){
            var _this=this,
                outIndex=parseInt(Math.random()*5), //5以内的随机数
                inIndex=parseInt(Math.random()*10), //10以为的随机数
                outIndexList=[], //随机数索引数组
                id3=_this.present_playId; //当前的三级玩法Id
            switch (id3){  //判断当前玩法Id
                case 51:
                case 161:
                case 165:
                case 173:
                case 174:
                case 175:
                    var rxOutIndex,isHas=false,len=_this.numberArr.length;
                    for(var j=0;j<2;j++){
                        do{
                            isHas=false;
                            rxOutIndex=parseInt(Math.random()*len);
                            for(var i=0;i<outIndexList.length;i++){
                                if(outIndexList[i]==rxOutIndex){
                                    isHas=true
                                }
                            }
                        }while(isHas);
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i=0;i<outIndexList.length;i++){
                        _this.numberArr.map(function(item,index){
                            if(index==outIndexList[i]){
                                item.isSel=true;
                            }
                        });
                    }
                    break;
                case 162://连尾连肖-三连肖
                case 166://连尾连肖-三连尾
                case 171://连尾连肖-三连尾
                case 172://连尾连肖-三连尾
                    var rxOutIndex,isHas=false,len=_this.numberArr.length;
                    for(var j=0;j<3;j++){
                        do{
                            isHas=false;
                            rxOutIndex=parseInt(Math.random()*len);
                            for(var i=0;i<outIndexList.length;i++){
                                if(outIndexList[i]==rxOutIndex){
                                    isHas=true
                                }
                            }
                        }while(isHas);
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i=0;i<outIndexList.length;i++){
                        _this.numberArr.map(function(item,index){
                            if(index==outIndexList[i]){
                                item.isSel=true;
                            }
                        });
                    }
                    break;
                case 163:
                case 167:
                case 176:
                    var rxOutIndex,isHas=false,len=_this.numberArr.length;
                    for(var j=0;j<4;j++){
                        do{
                            isHas=false;
                            rxOutIndex=parseInt(Math.random()*len);
                            for(var i=0;i<outIndexList.length;i++){
                                if(outIndexList[i]==rxOutIndex){
                                    isHas=true
                                }
                            }
                        }while(isHas);
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i=0;i<outIndexList.length;i++){
                        _this.numberArr.map(function(item,index){
                            if(index==outIndexList[i]){
                                item.isSel=true;
                            }
                        });
                    }
                    break;
                case 164:
                case 168:
                    var rxOutIndex,isHas=false,len=_this.numberArr.length;
                    for(var j=0;j<5;j++){
                        do{
                            isHas=false;
                            rxOutIndex=parseInt(Math.random()*len);
                            for(var i=0;i<outIndexList.length;i++){
                                if(outIndexList[i]==rxOutIndex){
                                    isHas=true
                                }
                            }
                        }while(isHas);
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i=0;i<outIndexList.length;i++){
                        _this.numberArr.map(function(item,index){
                            if(index==outIndexList[i]){
                                item.isSel=true;
                            }
                        });
                    }
                    break;
                case 151:
                    var rxOutIndex,isHas=false,len=_this.numberArr.length;
                    for(var j=0;j<6;j++){
                        do{
                            isHas=false;
                            rxOutIndex=parseInt(Math.random()*len);
                            for(var i=0;i<outIndexList.length;i++){
                                if(outIndexList[i]==rxOutIndex){
                                    isHas=true
                                }
                            }
                        }while(isHas);
                        outIndexList.push(rxOutIndex)
                    }
                    for(var i=0;i<outIndexList.length;i++){
                        _this.numberArr.map(function(item,index){
                            if(index==outIndexList[i]){
                                item.isSel=true;
                            }
                        });
                    }
                    break;
                default:
                    var len=_this.numberArr.length; //当前投注区的长度
                    outIndex=parseInt(Math.random()*len); //当前投注区长度范围内随机数
                    _this.numberArr.map(function(item,index){ //遍历
                        if(index==outIndex){ //如果当前的索引 = 随机数,当前数为选中
                            item.isSel=true;
//	        					Vue.set(item,"numArr", [inIndex]);
                        }
                    });
                    break;
            }
        },


        //清除当前选择
        //type 0-单注未选 1-单注 2-全部
        clearSelectData: function(type,index) {
            var _this = this;
            if(type === 0) {
                _this.numberArr.map(function (item) {
                    item.isSel = false;
                })
            }else if(type==1){
                _this.BetsList.splice(index,1);
            }else{
                _this.BetsList=[];
            }

            // 重置进度条 反利率 赔率
            _this.rebateNum = 0;
            _this.rebate = _this.maxReward;
            _this.orderOdds = _this.sigleminPrize[0];


            _this.handleBetsCoins();
        },
        //单笔单注奖金限制
        handleCoins: function() {
            var jd= _this.present_playId;
            this.singleCoins = this.singleCoins.replace(/\D+/g, '');
            if(this.singleCoins && this.singleCoins < 1) {
                this.singleCoins = 1;
            }
            if(jd!==51||jd!==151||jd!==171||jd!==172||jd!==173||jd!==174||jd!==175||jd!==176){
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
            }

            this.orderOdds = (this.maxPrize - ((this.maxPrize - this.minPrize) / this.maxReward * this.rebate)).toFixed(3);
        },

        //订单设置界面确定按钮
        handleConfirm: function () {
            var _this = this, id3=_this.present_playId,obj = _this.menu[_this.presentIndexList[0]].twoType[_this.presentIndexList[1]],betsClauseOne,oddOne;
            if(_this.bets==0){
                layui.use('layer',function(){
                    var layer=layui.layer;
                    layer.msg('请根据玩法提示，至少选择一注');
                });
                return
            }
            if (_this.recentBetInfo.betsCount && _this.singleCoins>0){
                if(id3==51||id3==151||id3==161||id3==162||id3==163||id3==164||id3==165||id3==166||id3==167||id3==168||id3==171||id3==172||id3==173||id3==174||id3==175||id3==176){
                    betsClauseOne = _this.recentBetInfo.betsClause.join(',');
                    oddOne = _this.orderOdds;
                    _this.BetsList.unshift({
                        type: _this.recentBetInfo.type,
                        betsCount: _this.bets,
                        betsClause:betsClauseOne,
                        betsCoins: _this.singleCoins * _this.bets,
                        id3:obj.id3,
                        id2:obj.id2,
                        id1:obj.id1,
                        odds:oddOne,
                        banner: _this.preventBanner,
                        singleCoin: _this.singleCoins,
                        rebate:_this.rebate,
                    });
                }else{
                    for(var i=0;i<_this.bets;i++){
                        betsClauseOne = _this.recentBetInfo.betsClause[i];
                        oddOne = _this.orderOdds.split('|')[i];
                        _this.BetsList.unshift({
                            type: _this.recentBetInfo.type,
                            betsCount: 1,
                            betsClause:betsClauseOne,
                            betsCoins: _this.singleCoins * 1,
                            id3:obj.id3,
                            id2:obj.id2,
                            id1:obj.id1,
                            odds:oddOne,
                            banner: _this.preventBanner,
                            singleCoin: _this.singleCoins,
                            rebate:_this.rebate,
                        });
                    }
                }

                // for(var i=0;i<_this.bets;i++){
                //     if(id3==51||id3==151||id3==171||id3==172||id3==173||id3==174||id3==175||id3==176){
                //         betsClauseOne = _this.recentBetInfo.betsClause.join(',');
                //     }else{
                //         betsClauseOne = _this.recentBetInfo.betsClause[i];
                //     }
                //     oddOne = _this.orderOdds.split('|')[i];
                //     _this.BetsList.unshift({
                //         type: _this.recentBetInfo.type,
                //         betsCount: 1,
                //         betsClause:betsClauseOne,
                //         betsCoins: _this.singleCoins * 1,
                //         id3:_this.play_area_manner[_this.preventType].id3,
                //         id2:_this.play_area_manner[_this.preventType].id2,
                //         id1:_this.play_area_manner[_this.preventType].id1,
                //         odds:oddOne,
                //         banner: _this.preventBanner,
                //         singleCoin: _this.singleCoins,
                //         rebate:_this.rebate,
                //     });
                // }

                $(".mask.setting").css({ display: "none" });
                //$(".inner").css({ display: "none" });
                $(".pay").css({display:"block"});

                $("#mainArea").css({display:"none"});
                _this.handleBetsCoins();
                _this.clearSelectData(0);
                ////存储localstorage
                localStorage.BetsList=JSON.stringify(_this.BetsList);
                _this.stopBanner="";
                _this.singleCoins='';
                _this.orderOdds = _this.sigleminPrize[0];
                $("#header").hide();
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
                sessionStorage.loginTo = "../ng/lhc.html";
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
                                        });
                                        _this.betsBanner = _this.preventBanner;
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
                } else {
                    _this.betsBanner = _this.preventBanner;
                    base.callAuthApi(obj);
                }
            }
        },
        //计算数目
        //参数list，依次对应listName,0--不需，1--需要，index为通过计算注数的条件,
        //num为是否进行位数限制(即:严格所选数位置且可为空),0--0(不限制),1--5(5位)
        count_TotalLength:function(index,num,type){
            var rList=[0,0,0,0,0,0],
                strList=["","","","","",""],
                saveList=[],
                count=0,
                _this=this;

            count = _this.totalCountsHandler(_this.numberArr); //个数
            saveList = _this.handleAreaSelNum(_this.numberArr); //元素
            _this.handleRecodeInfo(saveList);

            saveList=[];
            if(index == 1){
                _this.bets = count;
            }else{
                if(num == 0){
                    return -1;
                }
                if(type == 0){
                    if(count>1){
                        _this.bets = 1;
                    }
                }
            }
            if(type==1){
                if(count!==0){
                    _this.setSpecialSum(_this.numberArr);
                }
            }



        },


        //特殊号单注处理
        setSpecialSum:function(list){
            var _this=this,indexList=[],jd = this.present_playId;
            _this.special_orderOddsList=[]; //特殊号玩法的赔率数组
            var OddsList = [];
            var indexl=-1;
            if(list){
                _this.orderOdds="";
                _this.special_orderOddsList=[];
                list.map(function (item) {
                    indexl+=1;
                    if (item.isSel) {
                        OddsList.push(item.odds); //记录投注的赔率
                        _this.special_orderOddsList.push(item.odds);//记录赔率的数组
                        indexList.push(indexl);
                    }
                });
                for(var i=0;i<OddsList.length;i++){
                    _this.orderOdds+=OddsList[i]+"|";
                }
                _this.special_indexList = indexList; //赋值索引
                _this.orderOdds=_this.orderOdds.substring(0,_this.orderOdds.length-1); //去掉赔率最后一个|
                if(jd ==161||jd==162||jd==163||jd==164||jd==165||jd==166||jd==167||jd==168){
                    _this.orderOdds = Math.min.apply(null,_this.orderOdds.split('|'));

                }
                if(indexList.length==1){
                    _this.special_sum=parseFloat(_this.singleCoins*_this.special_orderOddsList[0]).toFixed(2);
                    return
                }
            }else{
                if(jd ==161||jd==162||jd==163||jd==164||jd==165||jd==166||jd==167||jd==168){
                    _this.special_orderOddsList[0]=_this.orderOdds;
                }else{
                    _this.special_orderOddsList=_this.orderOdds.split("|");
                    _this.special_orderOddsList.sort(function(a,b){return a-b});
                }
            }

            if(jd ==161||jd==162||jd==163||jd==164||jd==165||jd==166||jd==167||jd==168){
                _this.special_sum=parseFloat(_this.singleCoins*_this.special_orderOddsList[0]).toFixed(2);

            }else{
                if(_this.special_indexList.length==1){
                    _this.special_sum=parseFloat(_this.singleCoins*_this.special_orderOddsList[0]).toFixed(2);
                    return
                }
                _this.special_sum=parseFloat(_this.singleCoins*_this.special_orderOddsList[0]).toFixed(2)+"~"+parseFloat(_this.singleCoins*_this.special_orderOddsList[_this.special_orderOddsList.length-1]).toFixed(2);

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
        count_betNumber:function(){
            var _this=this,
                id3=_this.present_playId,
                count,
                rList=[],
                parameter={},
                // 记录每一个选择区中的数值
                comLen = 0,
                numArr=[];
            switch (id3){
                case 51://合肖-合肖
                    rList=_this.count_TotalLength(0,1,0);// index, num ,type
                    var count =0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    if(count>1){
                        _this.bets = 1;
                    }else {
                        _this.bets = 0;
                    }
                    if(count == 2){
                        _this.orderOdds = _this.minPrize.split("|")[0];
                    }else  if( count == 3){
                        _this.orderOdds = _this.minPrize.split("|")[1];
                    }else  if(count == 4){
                        _this.orderOdds = _this.minPrize.split("|")[2];
                    }else  if(count == 5){
                        _this.orderOdds = _this.minPrize.split("|")[3];
                    }else  if(count == 6){
                        _this.orderOdds = _this.minPrize.split("|")[4];
                    }else  if(count == 7){
                        _this.orderOdds = _this.minPrize.split("|")[5];
                    }else  if(count == 8){
                        _this.orderOdds = _this.minPrize.split("|")[6];
                    } else  if(count == 9){
                        _this.orderOdds = _this.minPrize.split("|")[7];
                    } else  if(count == 10){
                        _this.orderOdds = _this.minPrize.split("|")[8];
                    }else  if(count == 11){
                        _this.orderOdds = _this.minPrize.split("|")[9];
                    }
                    break;
                case 151: //自选不中-自选不中
                    rList=_this.count_TotalLength(0,0,2);
                    if(rList==-1){
                        var count=0;
                        _this.numberArr.map(function (item) {
                            if(item.isSel){
                                count = count +1;
                            }
                        });
                        if(count>5){
                            _this.bets = 1;
                        }
                        if(count == 6){
                            _this.orderOdds = _this.minPrize.split("|")[0];
                        }else  if( count == 7){
                            _this.orderOdds = _this.minPrize.split("|")[1];
                        }else  if(count == 8){
                            _this.orderOdds = _this.minPrize.split("|")[2];
                        }else  if(count == 9){
                            _this.orderOdds = _this.minPrize.split("|")[3];
                        }else  if(count == 10){
                            _this.orderOdds = _this.minPrize.split("|")[4];
                        }else  if(count == 11){
                            _this.orderOdds = _this.minPrize.split("|")[5];
                        }
                    }else{
                        return

                    }
                    break;
                case 161: //连肖连尾-二连肖
                case 165: //连肖连尾-二连尾
                    rList=_this.count_TotalLength(0,1,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getBcGroupMix_cqssc(count, 2);
                    break;
                case 162: //连肖连尾-三连肖
                case 166: //连肖连尾-三连尾
                    rList=_this.count_TotalLength(0,1,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getBcGroupMix_cqssc(count, 3);
                    break;
                case 163: //连肖连尾-四连肖
                case 167: //连肖连尾-四连尾
                    rList=_this.count_TotalLength(0,1,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getBcGroupMix_cqssc(count, 4);
                    break;
                case 164: //连肖连尾-五连肖
                case 168: //连肖连尾-五连尾
                    rList=_this.count_TotalLength(0,1,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getBcGroupMix_cqssc(count, 5);
                    break;
                case 171: //连码-三中二
                    rList=_this.count_TotalLength(0,0,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getSixGroupDirect(count, 3);
                    break;
                case 172: //连码-三全中
                    rList=_this.count_TotalLength(0,0,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getSixGroupDirect(count, 3);
                    break;
                case 173: //连码-二全中
                case 174: //连码-二中特
                case 175: //连码-特串
                    rList=_this.count_TotalLength(0,0,1);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getBcGroupMix_cqssc(count, 2);
                    break;

                case 176: //连码-四全中
                    rList=_this.count_TotalLength(0,1,0);
                    var count=0;
                    _this.numberArr.map(function (item) {
                        if(item.isSel){
                            count = count +1;
                        }
                    });
                    _this.bets = countUtils.getBcGroupMix_cqssc(count, 4);
                    break;
                default:
                    rList=_this.count_TotalLength(1,1,1);
                    break;

            }
            _this.recentBetInfo.betsCount = _this.bets; //投注注数
            _this.recentBetInfo.betsCoins = _this.bets * _this.singleCoins //投注金额
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
            if(this.tempCoins){
                if (val != 0 && !isNaN(val)) {
                    this.totalCoins = val * this.tempCoins;
                } else {
                    this.totalCoins = this.tempCoins;
                }
            }
        },
        // 监听用户选择的项并计算注数
        //第一位选择项管理对象
        numberArr: {
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