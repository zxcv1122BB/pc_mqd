'use strict';

var app = new Vue({
    el: '#lothall',
    data: {
        high: [], //高频
        low: [], //低频
        deadlineStr: [], //倒计时
        oldId: [], // 请求的id
        IdList: [], // 所有的ID
        bj28CL: ['gray', 'green', 'blue', 'red', 'green', 'blue', 'red', 'green', 'blue', 'red', 'green', 'blue', 'red', 'gray', 'gray', 'red', 'gray', 'blue', 'red', 'green', 'blue', 'red', 'green', 'blue', 'red', 'green', 'blue', 'gray'],
        lhcCL: ['red', 'red', 'blue', 'blue', 'green', //1
        'green', 'red', 'red', 'blue', 'blue', //2
        'green', 'red', 'red', 'blue', 'blue', //3
        'green', 'green', 'red', 'red', 'blue', //4
        'green', 'green', 'red', 'red', 'blue', //5
        'blue', 'green', 'green', 'red', 'red', //6
        'blue', 'green', 'green', 'red', 'red', //7
        'blue', 'blue', 'green', 'green', 'red', //8
        'blue', 'blue', 'green', 'green', 'red', //9
        'red', 'blue', 'blue', 'green' //10
        ]

    },
    inject: ['reload'],
    created: function created() {
        this.getDigitalInfo();
    },
    mounted: function mounted() {
        this.initDom();
    },
    methods: {

        initDom: function initDom() {
            $('.nav ul li:nth-child(2) a').css('background-color', '#d42b2b');
        },

        sortNum: function sortNum(property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            };
        },

        isInArray: function isInArray(arr, value) {
            for (var i = 0; i < arr.length; i++) {
                if (value === arr[i]) {
                    return true;
                }
            }
            return false;
        },

        // 获取毫秒数
        getMilliseconds: function getMilliseconds(str) {
            str=""+str+"";
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
        countdown: function countdown(lastTime, startTime, index, id) {
            var _this = this,
                deadlineT = lastTime - startTime,
                deadline_hour = _this.getzf(Math.floor(deadlineT / 1000 / 60 / 60)),
                deadline_minute = _this.getzf(Math.floor(deadlineT / 1000 / 60 % 60)),
                deadline_second = _this.getzf(Math.floor(deadlineT / 1000 % 60));
            if (deadlineT >= 0) {
                _this.deadlineStr = deadline_hour + ":" + deadline_minute + ":" + deadline_second;
                _this.dataList[index].deadlineStr = _this.deadlineStr;
            } else {
                _this.deadlineStr = '正在请求数据...';
                _this.dataList[index].deadlineStr = _this.deadlineStr;
                clearInterval(_this.dataList[index].deadlineTiming);
                _this.dataList[index].deadlineTiming = '';
                var ids = id;
                _this.getDigitalInfo(ids);
            }
        },

        // 获取彩种信息
        getDigitalInfo: function getDigitalInfo(id) {
            $('#loading_wait', parent.document).show();
            var _this = this,
                obj2 = {},
                obj = {
                type: "post",
                url: '/commonAPI/getDigitalInfo',
                data: {
                    one_type_id: id
                },
                success: function success(data) {
                    if (data.code == 200 && data.body.length != 0) {
                        $('#loading_wait', parent.document).hide();
                        if (data.body.length == 1) {
                            if (data.body[0].luck_number) {
                                if (data.body[0].code == 'PCDD') {
                                    data.body[0].luck_number = data.body[0].luck_number.replace(/,/g, ',+,').split(',');
                                    var sum = parseInt(data.body[0].luck_number[0]) + parseInt(data.body[0].luck_number[2]) + parseInt(data.body[0].luck_number[4]);
                                    data.body[0].luck_number.push('=');
                                    data.body[0].luck_number.push(sum);
                                } else {

                                    data.body[0].luck_number = data.body[0].luck_number.replace('+', ',=,').split(',');
                                }
                            }

                            var indexA = _this.IdList.indexOf(id);
                            var indexB = _this.low.map(function (e) {
                                return e.gameID;
                            }).indexOf(id);
                            var indexC = _this.high.map(function (e) {
                                return e.gameID;
                            }).indexOf(id);
                            if (_this.isInArray(_this.IdList, id)) {
                                Vue.set(_this.dataList, indexA, data.body[0]);
                            }
                            if(_this.dataList[indexA].lastTime){
                                _this.dataList[indexA].lastTime = _this.getMilliseconds(_this.dataList[indexA].deadline);
                                _this.dataList[indexA].startTime = _this.getMilliseconds(_this.dataList[indexA].response_date);
                                _this.dataList[indexA].gameID = _this.dataList[indexA].gameID;
                                _this.countdown(_this.dataList[indexA].lastTime, _this.dataList[indexA].startTime, indexA, _this.dataList[indexA].gameID);
                                _this.dataList[indexA].deadlineTiming = setInterval(function () {
                                    _this.dataList[indexA].startTime += 1000;
                                    _this.countdown(_this.dataList[indexA].lastTime, _this.dataList[indexA].startTime, indexA, _this.dataList[indexA].gameID);
                                }, 1000);
                            }
                           
                            if (indexB > 0) {
                                Vue.set(_this.low, indexB, _this.dataList[indexA]);
                            } else {
                                Vue.set(_this.high, indexC, _this.dataList[indexA]);
                            }
                        } else {
                            data.body = data.body.sort(_this.sortNum('sort'));
                            _this.dataList = data.body;
                            _this.dataList.map(function (item, index) {
                                if (item.luck_number) {
                                    if (item.code == 'PCDD') {
                                        item.luck_number = item.luck_number.replace(/,/g, ',+,').split(',');
                                        var sum = parseInt(item.luck_number[0]) + parseInt(item.luck_number[2]) + parseInt(item.luck_number[4]);
                                        item.luck_number.push("=");
                                        item.luck_number.push(sum);
                                    } else {
                                        item.luck_number = item.luck_number.replace('+', ',=,').split(',');
                                    }
                                }

                                _this.IdList.push(item.gameID);
                                if (item.deadline&&item.gameID!="99") {
                                    item.lastTime = _this.getMilliseconds(item.deadline); //结束时间
                                    item.startTime = _this.getMilliseconds(item.response_date); //开始时间
                                    _this.countdown(item.lastTime, item.startTime, index, item.gameID);
                                    if (item.deadlineTiming) {
                                        window.clearInterval(item.deadlineTiming);
                                        item.deadlineTiming = "";
                                    }
                                    item.deadlineTiming = setInterval(function () {
                                        item.startTime += 1000;
                                        _this.countdown(item.lastTime, item.startTime, index, item.gameID);
                                    }, 1000);
                                }
                                obj2[item.gameID] = item.pic_url;
                                localStorage.img_list = JSON.stringify(obj2);
                            });
                            _this.dataList.map(function (item) {
                                if (item.game_type == 1) {
                                    _this.low.push(item);
                                } else if (item.game_type == 2 || item.game_type == 3) {
                                    _this.high.push(item);
                                }
                            });
                        }
                    }
                    // setTimeout(function () {
                    //     parent.onComplete();
                    // },50)
                }
            };
            base.callCommonApi(obj);
        },

        //走势图跳转
        togoChart: function togoChart(id) {
            //(id);
            if ( id == 10 || id == 26 || id == 27 || id == 28 || id == 29 || id == 30 || id == 32 || id == 33 || id == 34 || id == 35 || id == 36 ) {
                window.parent.layui.use('layer', function () {
                    var layer = window.parent.layui.layer;
                    layer.msg('暂无走势图，敬请期待!');
                });
            } else {
                localStorage.chartId = id;
                window.location.href = "ng/trend.html";
            }
        },

        //开奖公告
        togoSkip: function togoSkip(item) {
            // localStorage.lottery_img = item.pic_url;	//开奖页面用到图片url
            // localStorage.lottery_url = item.bet_url;	//开奖页面用到投注页面url
            localStorage.lottery_id = item.gameID; //一级玩法id
            localStorage.lottery_name = item.gameName; //一级玩法name
            window.location.href = 'kjgg/lotdetail.html#' + item.gameID;
        },

        //去购彩
        togoBuy:function(url){
            if(localStorage.userName== undefined){
                window.location.href = 'login/login.html';							
            }else{
                window.location.href = url;
            }
        },
    },
    watch: {}
});