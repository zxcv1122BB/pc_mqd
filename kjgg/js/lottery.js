new Vue({
    el: "#athletics",

    data: {
        tableData: {
            QiByData: {
                bannerNumber: "",
                goal: [],
            },
            DCData: {
                bannerNumber: "",
                homeTeamName: '',
                awayTeamName: '',
                courtScore: ''
            }
        },
        date:'',
        basket_home:'',
        basket_away:'',
        basket_league:'',
        basket_score:'',
        foot_home:'',
        foot_away:'',
        foot_league:'',
        foot_score:'',
        dc_league:'',
        sf_league:false,

        //绿波  红波 蓝波
        greenNum:[1,4,7,10,16,19,22,25],
        blueNum:[2,5,8,11,17,20,23,26],
        redNum:[3,6,9,12,15,18,21,24],

        //玩法一级id
        oneTypeId:'',

        DigitalGameList:[],

        rang: "",

        basketdate:'',
        footdate:'',

        bj28CL:[
            'gray','green','blue','red','green','blue',
            'red','green','blue','red','green',
            'blue','red','gray','gray','red',
            'gray','blue','red','green','blue',
            'red','green','blue','red','green',
            'blue','gray'
        ],

        lhcCL:[
            'red','red','blue','blue','green', //1
            'green','red','red','blue','blue', //2
            'green','red','red','blue','blue',  //3
            'green','green','red','red','blue', //4
            'green','green','red','red','blue', //5
            'blue','green','green','red','red', //6
            'blue','green','green','red','red',  //7
            'blue','blue','green','green','red',  //8
            'blue','blue','green','green','red', //9
            'red','blue','blue','green'  //10
        ],




    },
    created: function () {
        this.date=this.fun_date(0);
        this.getQiByData();
        this.getDigitalGame();
        this.getDCData();
        // this.getSelCount();
        this.getBasketballData();
        this.getAllData();

        //(this.game_name);
    },
    methods: {
        // 获取胜负彩和任选九的期数
        getQiByData: function () {
            var _this = this;
            base.callCommonApi({
                url:'/commonAPI/football/selectSFC',
                data:{
                    oneTypeId:2,
                    bannerNumber:''
                },
                success: function (data) {
                    //(data);
                    if (data.body) {
                        _this.tableData.QiByData.bannerNumber = data.body[0].qi;
                        _this.tableData.QiByData.goal = data.body.map(function (item) {
                            return item.spf;
                        });
                        _this.sf_league = true;
                    }
                },
                type: 'post'
            })
        },
        //获取单场的期数数据
        getDCData: function (callback) {
            var _this = this;
            base.callCommonApi({
                url: "/commonAPI/football/selectDC",
                data:{
                    oneTypeId:3
                },
                success: function (data) {
                    if (data.body) {
                        _this.tableData.DCData.bannerNumber = data.body.bannerNumber[0];
                        _this.tableData.DCData.homeTeamName = data.body.info.homeTeam.teamName;
                        _this.tableData.DCData.awayTeamName = data.body.info.awayTeam.teamName;
                        _this.tableData.DCData.courtScore = data.body.info.courtScore;
                        _this.dc_league = data.body.info.leagueName;
                    }
                },
                type: 'post'
            })
        },
        //获取开奖记录的条数
        // getSelCount: function () {
        //     var _this = this;
        //     base.callCommonApi({
        //         url: "/commonAPI/football/selectQi",
        //         success: function (data) {
        //             //(data)
        //         },
        //         type: 'post'
        //     })
        // },

        getUserMessageList: function (num) {
            var _this = this,
            userName = localStorage.getItem("userName");
            var data = {
                pageIndex: num,
                pageNum: parseInt(this.pageNum),
                pageSize: 10,
                userName: userName
            };
            var obj = {
                type: 'post',
                data: data,
                dataType: 'json',
                url: '/authApi/msg/getUserMessagePage',
                success: function (data) {
                    if (data.code == 200) {
                        $(".badges").html(data.body.unreadCount);
                        sessionStorage.setItem("unReadInfo", data.body.unreadCount)
                    }
                },
                error: function (msg) {
                }
            };
            base.callAuthApi(obj);
        },
        //点击跳入详情页，存储一些三级玩法信息
        savegameTypeInfo:function(oneType,gameType){
            var tempObj ={};
            if(oneType=='1'){
                sessionStorage.setItem("gameType",gameType);
                location.href ="./lotdetail.html#jczq"
            }else if(oneType=='3'){
                sessionStorage.setItem("gameType", gameType);
                location.href = "./lotdetail.html#dc"
            }else if(oneType=='4'){
                sessionStorage.setItem("gameType", gameType);
                location.href = "./lotdetail.html#jclq"
            }
        },
        //获取几天前的日期为某一天
        fun_date: function (day) {
            var date1 = new Date(),
                time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
            var date2 = new Date(date1);
            date2.setDate(date1.getDate() + day);
            var time2 = date2.getFullYear() + "-" + (date2.getMonth() >= 10 ? date2.getMonth() + 1 : '0' + (date2.getMonth() + 1)) + "-" + (date2.getDate() >= 10 ? date2.getDate() : '0' + date2.getDate());
            return time2;
        },
        //获取竞彩篮球相关数据
        getBasketballData: function () {
            this.basketData = [];
            var _this = this;
            var s1 =  this.fun_date(0);
            var obj = {
                type: 'post',
                data: {
                    selectDate: s1,
                    // selectDate: '2018-01-15',
                    // source: 1
                },
                url: '/commonAPI/basketball/getOneLatestMatch',
                success: function (data) {
                    _this.onLoad = false;
                    _this.noData = false;
                    if (data.code == 200) {
                        _this.basket_league = true;
                        _this.basket_home = data.body.homeTeamName||'';
                        _this.basket_away = data.body.awayTeamName||'';
                        var lsDate = data.body.matchDate.substr(11, 2);
                        if(lsDate >= 12) {
                            _this.basketdate = _this.getBeforeDays(
                                data.body.matchDate.substr(0, 10)
                            );
                        } else {
                            _this.basketdate = _this.getBeforeDays(
                                data.body.matchDate.substr(0, 10), -1
                            );
                        }
                        _this.basket_score = data.body.courtScore || '';
                    } else {
                        _this.basket_league = false;
                    }
                },
                error: function (res) {
                }
            }
            base.callCommonApi(obj)
        },

            getBeforeDays: function(currDate, num) {
                //num表示天数，接受正负数
                if(!num) {
                    //做num简单验证
                    return currDate;
                }
                num = Math.floor(num);
                var symbol = "/";
                if(currDate.indexOf("-") > -1) {
                    symbol = "-";
                    currDate = currDate.replace(/-/g, "/");
                } else if(currDate.indexOf(".") > -1) {
                    symbol = ".";
                    currDate = currDate.replace(/\./g, "/");
                }
                //symbol = '-'; //定制输出分隔符
                var myDate = new Date(currDate),
                    lw = new Date(Number(myDate) + 1000 * 60 * 60 * 24 * num), //num天数
                    lastY = lw.getFullYear(),
                    lastM = lw.getMonth() + 1,
                    lastD = lw.getDate(),
                    startdate =
                        lastY +
                        symbol +
                        (lastM < 10 ? "0" + lastM : lastM) +
                        symbol +
                        (lastD < 10 ? "0" + lastD : lastD);
                return startdate;
            },
        //获取竞彩足球所有比赛的数据
        getAllData: function () {
            let _this = this;
            let s1 =  this.fun_date(0);
            base.callCommonApi({
                url: '/commonAPI/football/selectCount',
                data:{
                    oneTypeId:1,
                    shaiDate:s1,
                    // source:1
                },
                // url: '/commonAPI/football/theLottery?oneTypeId=1&shaiDate=' + '2018-01-15' + '&source=1',
                success: function (data) {
                    if (data.code==200) {
                        _this.foot_league = true;
                        _this.foot_home = data.body.homeTeam.teamName || '';
                        _this.foot_away = data.body.awayTeam.teamName || '';
                        // _this.foot_league = data.body.leagueName || '';
                        _this.foot_score = data.body.courtScore || ''
                        _this.rang = data.body.letballNumber;
                        var lsDate = data.body.matchDate.substr(11, 2);
                        //(lsDate);
                        if(lsDate >= 12) {
                            _this.footdate = _this.getBeforeDays(
                                data.body.matchDate.substr(0, 10)
                            );
                        } else {
                            _this.footdate = _this.getBeforeDays(
                                data.body.matchDate.substr(0, 10), -1
                            );
                        }
                    }else{
                        _this.foot_league = false;

                    }
                },
                type: 'post'
            })
        },

        compareNum: function(property) {
            return function(a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            };
        },

        // 获取彩种开奖
        getDigitalGame: function (id,num) {
            var _this = this,obj2={},gameID,url;
            var obj = {
                type: "post",
                url: '/commonAPI/qryDigitalGameIntro',
                data: {},
                dataType:'json',
                success: function (data) {
             	//(data);
                    if (data.code == 200 && data.body && data.body.length != 0) {
                        for(var i =0; i<data.body.length;i++){
                            if(data.body[i].luck_number){
                                var arr = data.body[i].luck_number.split(",");
                                data.body[i].arr = arr;
                            }else{
                                data.body[i].arr = [];
                            }
                            // if(data.body[i].gameID == 9){
                            //     var sum = parseInt(arr[0])+parseInt(arr[1])+parseInt(arr[2]);
                            //     data.body[i].luck_number = data.body[i].luck_number+","+ sum;
                            //     if(_this.isArrayContainer(_this.greenNum,sum)){
                            //         _this.DigitalGameList.color = "green";
                            //     }else if(_this.isArrayContainer(_this.blueNum,sum)){
                            //         _this.DigitalGameList.color = "blue";
                            //     }else if(_this.isArrayContainer(_this.redNum,sum)){
                            //         _this.DigitalGameList.color = "red";
                            //     }else{
                            //         _this.DigitalGameList.color = "grey";
                            //     }
                            // }
                            if(!data.body[i].issue){
                                data.body.splice(i,1);
                                i--;
                            }
                            _this.DigitalGameList[i] = data.body[i];
                        }
                        _this.DigitalGameList.sort(_this.compareNum('sort'));
                        //();
                        for(var j = 0;j < _this.DigitalGameList.length;j++) {
                             gameID = _this.DigitalGameList[j].gameID;
                             var code=_this.DigitalGameList[j].code;
                            if(code  == 'PCDD'){
                                _this.DigitalGameList[j].luck_number=_this.DigitalGameList[j].luck_number.replace(/,/g,",+,").split(',');
                                var sum =  parseInt(_this.DigitalGameList[j].luck_number[0]) + parseInt(_this.DigitalGameList[j].luck_number[2])+parseInt(_this.DigitalGameList[j].luck_number[4]);
                                _this.DigitalGameList[j].luck_number.push("=");
                                _this.DigitalGameList[j].luck_number.push(sum);
                            }else{
                                _this.DigitalGameList[j].luck_number=_this.DigitalGameList[j].luck_number.replace("+",",=,").split(',');
                            }
                             url = _this.DigitalGameList[j].pic_url;
                            obj2[gameID] = url;
                        }
                        localStorage.img_list = JSON.stringify(obj2);
                        //(JSON.parse(localStorage.img_list));
                    } else {

                    }
                },

                error: function (res) {

                }
            }
            base.callCommonApi(obj);

        },

       togoSkip:function(item){
           // localStorage.lottery_img = item.pic_url;	//开奖页面用到图片url
           // localStorage.lottery_url = item.bet_url;	//开奖页面用到投注页面url
           localStorage.lottery_id = item.gameID;		//一级玩法id
           localStorage.lottery_name = item.gameName;	//一级玩法name
           window.location.href = 'lotdetail.html#'+item.gameID;

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


        //走势图跳转
        togoChart:function (id) {
            // if(id==41||id==40||id==9||id==8||id==6||id==5||id==12||id==23||id==15||id==7||id==31||id==37){
                localStorage.chartId = id;
                window.location.href ="../ng/trend.html";

            // }else{
            //     window.parent.layui.use('layer',function(){
            //         var layer=window.parent.layui.layer;
            //         layer.msg('暂无走势图，敬请期待!');
            //     });
            // }
        },


        togoBuy:function(url){
            if(localStorage.userName== undefined){
                window.location.href = '../login/login.html';							
            }else{
                window.location.href = '../'+url;
            }
        },


    }
});
$('.tab_header span').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.tab_body').children().eq($(this).index()).addClass("active").siblings().removeClass('active')
});
// new m_sideBar("#rightBar");