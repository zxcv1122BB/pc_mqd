$(function () {
    $('.newTab a').click(function () {
        $(this).siblings().removeClass('curr');
        $(this).addClass('curr');
    });
});
let downAccount = new Vue({
    el: "#downAccount",
    data: {
        //头部切换
        topStatus:0,
        pageIndex:1,

        //2为会员，1为代理
        userType:1,
        //玩法最大返点列表
        maxRebatesList:[],
        nameRebatesList:[],

        modelRebatesList:[],

        //下拉加载列表
        downList:[],
        loading:{
            isLoading:0,
            msg:"加载中"
        },

        //子返点列表
        itemRebateList:[],
        //子id
        invitateId:"",
        agencyType: localStorage.agencyType ? localStorage.agencyType:2,//用户类型
    },
    created: function () {
        this.getGameRebatesList();

    },
    mounted: function () {},
    methods: {
        //检查数据
        checkData(index,item){
            var _this=this,
                text1 = parseFloat(item),
                text2 = parseFloat(_this.nameRebatesList[index].nowRebate);
                if (isNaN(text1)) {
                    layui.use('layer', function () {
                        var layer = layui.layer;
                        layer.msg(_this.nameRebatesList[index].codeName ? _this.nameRebatesList[index].codeName : _this.nameRebatesList[0].codeName + "返点设置不正确");
                    });
                    _this.$set(_this.modelRebatesList, index, "");
                    layui.use('layer', function () {
                        var layer = layui.layer;
                        layer.msg("请输入正确格式");
                    });
                } else if (text1 < 0) {
                    layui.use('layer', function () {
                        var layer = layui.layer;
                        layer.msg(_this.nameRebatesList[index].codeName + "返点要大于0.0");
                    });
                    _this.$set(_this.modelRebatesList, index, "0.0");
                } else if (text1 > text2) {

                    layui.use('layer', function () {
                        var layer = layui.layer;
                        layer.msg(_this.nameRebatesList[index].codeName + "返点要小于" + text2.toFixed(1));
                    });
                    _this.$set(_this.modelRebatesList, index, text2.toFixed(1));
                }
        },
        copyUrl: function(event){
            event = event.currentTarget;
            var obj= $(event).parent('td').children('input');
            window.clipboardData.setData("Text",obj.value);//设置数据
            alert('复制成功!');
        },

        // 获取代理报表数据
        getGameRebatesList:function () {

            if (localStorage.szcRebateList){
                var _this=this;
                _this.nameRebatesList = JSON.parse(localStorage.szcRebateList);
                _this.nameRebatesList.map(function (item) {
                    _this.modelRebatesList.push(item.nowRebate);
                });
                return
            }
            var strList = localStorage.gameRebatesList,obj={},_this=this;
            strList=strList.split("@");
            strList.map(function(item){
                var list=item.split("#");
                obj[list[0]] = list[1];
            });
            // _this.maxRebatesList = obj;
            var obj = {
                type: "post",
                url: "/authApi/proxy/getRebateConfigList",
                data: {},
                success: function(data) {
                    //console.log(data);
                    data.body.map(function(item){
                        _this.modelRebatesList.push("");
                    });
                    _this.nameRebatesList=data.body;
                },
                error: function(msg) {
                    //console.log(msg)
                },

            }
            base.callAuthApi(obj);

        },
        creadtedCode:function () {
            var check=this.checkRebatesFn();
            if (check.check==1){
                return
            }
            var _this = this,
                obj = {
                    type: "post",
                    url: "/authApi/proxy/addInvitateInfo",
                    data: {
                        userType: _this.userType,
                        data: check.str
                    },
                    success: function (data) {
                        if (data.code == 200) {
                            _this.modelRebatesList.map(function(item,index){
                                _this.$set(_this.modelRebatesList,index,"");
                            });
                            layui.use('layer',function(){
                                var layer=layui.layer;
                                layer.msg("已成功生成！");
                            });
                            //console.log(data);
                        } else {

                        }
                    },
                    error: function (msg) {
                        //console.log(msg)
                    },
                };
            base.callAuthApi(obj);
            
        },

        //生成邀请码的参数验证
        checkRebatesFn:function () {
            // data(彩种返点拼接字符串 eg: ssc#8.0@k3#8.5@11x5#7.5@3D#7.5@PK10#8.0@hk6#10.0)
            var _this=this,check=0,isNoContinue=0,str="";
            // console.log(_this.modelRebatesList);
            // console.log(_this.nameRebatesList);
            _this.modelRebatesList.map(function(item,index){
                var text1=parseFloat(item),
                    text2 = parseFloat(_this.nameRebatesList[index].nowRebate);

                if (isNoContinue==0){
                    if(str){
                        str += "@" + _this.nameRebatesList[index].code + "#" + item;
                    }else{
                        str += _this.nameRebatesList[index].code + "#" + item;
                    }

                    if (isNaN(text1)) {
                        layui.use('layer',function(){
                            var layer=layui.layer;
                            layer.msg(_this.nameRebatesList[index].codeName ? _this.nameRebatesList[index].codeName : _this.nameRebatesList[0].codeName+"返点设置不正确");
                        });
                        _this.$set(_this.modelRebatesList, index, "");
                        isNoContinue =1;
                        check = 1;
                    } else if (text1 < 0) {
                        layui.use('layer',function(){
                            var layer=layui.layer;
                            layer.msg(_this.nameRebatesList[index].codeName + "返点要大于0.0");
                        });
                        _this.$set(_this.modelRebatesList, index, 0.0);
                        isNoContinue = 1;
                        check = 1;
                    } else if (text1 > text2) {

                        layui.use('layer',function(){
                            var layer=layui.layer;
                            layer.msg(_this.nameRebatesList[index].codeName + "返点要小于" + text2.toFixed(1));
                        });
                        _this.$set(_this.modelRebatesList, index, text2.toFixed(1));
                        isNoContinue = 1;
                        check = 1;
                    }
                }

            });
            return {
                "check":check,
                "str":str
            };
        },

        //邀请码加载数据
        loadList(){
            if (this.loading.isLoading ==1){
                return;
            }
            var _this=this,
                obj={
                    type:"post",
                    url:"/authApi/proxy/queryInvitateInfo",
                    data:{
                        userType: _this.userType,
                        pageIndex:  _this.pageIndex,
                        pageNum:10
                    },
                    success:function(data){
                        if(data.code==200){

                            _this.downList=data.body.list;

                            //分页的(右边点击)
                            // if(data.body.list.length>0){
                            //     $('#fenye').jqPaginator('option', {
                            //         totalPages: data.body.pageSize,    //返回总页数
                            //         currentPage: data.body.pageIndex
                            //     });
                            // }else {
                            //     $('#fenye').jqPaginator('option', {
                            //         totalPages: 1,
                            //         currentPage: 1
                            //     });
                            // }
                            //console.log(data);
                        }else{
                            _this.downList = []
                        }
                    },
                    error:function(msg){
                        //console.log(msg)
                    },
                };
            base.callAuthApi(obj);
        },

        showPopover:function(index){

            var _this=this,
                str = _this.downList[index].data;
            str=str.replace("ssc","时时彩").replace("k3","快3").replace("11x5","11选5").replace("3D","福彩3D").replace("PK10","PK10").replace('hk6','六合彩').replace('7xc','七星彩').replace('kl10f','快乐十分').replace('PCDD','北京28');
            str=str.split("@");
            str.map(function(item,index){
                str[index] = item.split("#");
            });
            _this.itemRebateList=str;
            _this.invitateId = _this.downList[index].invitateId;
            _this.$nextTick(function () {
                window.parent.layui.use('layer', function () {
                    var layer = window.parent.layui.layer;
                    layer.open({
                        type: 1,
                        title: '返点详情',
                        area: ['600px', '500px'], //宽高
                        content: $('#popover').html(),
                        btn: ['关闭'],
                        yes: function (index, layero) {
                            window.parent.layer.closeAll('page');
                        }
                    });
                })
            })
            
        },

        delItemRebate(index){
            var _this = this;
            _this.invitateId = _this.downList[index].invitateId;
            window.parent.layui.use('layer', function () {
                var layer_confirm = window.parent.layui.layer;
                layer_confirm.open({
                    content: "<div style='padding: 0 80px 0 20px;height: 42px;line-height: 42px;font-size: 14px;'>确定删除?</div>",
                    area: "400px",
                    type: 1,
                    closeBtn: 0,
                    title: "提示",
                    btn: ["确定", "取消"],
                    yes: function () {
                        window.parent.layer.closeAll('page');
                        $('body').css('overflow', "auto");
                        var obj = {
                                type: "post",
                                url: "/authApi/proxy/removeInvitateInfo",
                                data: {
                                    invitateId: _this.invitateId
                                },
                                success: function (data) {
                                    if (data.code == 200) {
                                        // _this.closePopover();
                                        _this.clearLoadingData();
                                        _this.loadList();
                                        layer.msg("删除成功");
                                    }
                                },
                                error: function (msg) {
                                    //console.log(msg)
                                },
                            };
                        base.callAuthApi(obj);
                    },
                    btn2: function () {
                        $('body').css('overflow', "auto");
                    },
                });
            });


        },

        //清空数据
        clearLoadingData(){
            var _this=this;
            _this.loading.isLoading = 0;
            _this.loading.msg = "点击加载更多";
            _this.pageIndex = 1;
            _this.downList = [];
        },


        onCopy: function (e) {
            layer.msg('复制成功');
        },
        onError: function (e) {
            layer.msg('复制失败');
        },








    },
    watch:{
        topStatus(val){
            if (val == 1){
                this.loadList();
            }
        },
        userType(val){
            if(this.topStatus==1){
                this.clearLoadingData();
                this.loadList();
            }
            //console.log(val)
        },
    }


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
        downAccount.pageIndex = num;
        downAccount.loadList();
    }
});