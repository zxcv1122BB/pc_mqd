$(function () {
    $('.newTab a').click(function () {
        $(this).siblings().removeClass('curr');
        $(this).addClass('curr');
    });
});
let Report = new Vue({
    el: "#lowerReport",
    data: {
        timeC: '',
        lowerDatas: [],
        currSearchType: 1,
        page: 1, //默认请求的页码-默认第1页
        totalPage: 1, //总页数
        coinUnit: '',
        indexArr: '',

        agencyType: localStorage.agencyType ? localStorage.agencyType:2,//用户类型
    },
    created: function () {
        this.getdatas();

    },
    mounted: function () {


    },
    methods: {
        changeType:function(){
            this.getdatas();
        },
        // 获取代理报表数据
        getdatas:function () {
            var _this = this;
            _this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit?JSON.parse(localStorage.getItem('config')).coinUnit:'元';
            $("#noMessage").hide();
            var obj = {
                type: "post",
                url: "/authApi/proxy/getNextProxyReportInfo",
                data: {
                    'pageIndex': _this.page,
                    'pageNum': 15,
                    'dateType': _this.currSearchType,
                    'nextAgentName': ''
                },
                success: function(data) {
                    //console.log(data);
                    if(data.code == 200) {
                        _this.$nextTick(() => {
                            _this.lowerDatas=[];
                            // _this.totalPage = data.body.pageSize;
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
                            _this.lowerDatas = data.body.list;
                            // var arr = [];
                            // arr = data.body.list;
                            // for(var i = 0; i < arr.length; i++) {
                            //     arr[i].profit = parseInt(arr[i].betAmount - arr[i].bonusAmount);
                            //     arr[i].profit = _this.changeTwoDecimal_f(arr[i].profit);
                            //     _this.lowerDatas.push(arr[i]);
                            // }
                        });

                        //console.log(_this.lowerDatas)
                    }else{
                        _this.lowerDatas = [];
                    }
                },
                error: function(msg) {
                    //console.log(msg)
                },

            }
            base.callAuthApi(obj);

        },
        changeTwoDecimal_f(x) {
            var f_x = parseFloat(x);
            if(isNaN(f_x))　　 {
                return 0;
            }
            var f_x = Math.round(x * 100) / 100;
            var s_x = f_x.toString();
            var pos_decimal = s_x.indexOf('.');
            if(pos_decimal < 0)　　 {
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while(s_x.length <= pos_decimal + 2)　　 {
                s_x += '0';
            }
            return s_x;
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
        Report.page = num;
        Report.getdatas();
    }
});