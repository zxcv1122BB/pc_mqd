$(function () {
    $('.newTab a').click(function () {
        $(this).siblings().removeClass('curr');
        $(this).addClass('curr');
    });
});
var pc = new Vue({
    el: "#agentMember", 
    data: {
        pageIndex:0,


        downPageIndex:1,

        nowloadList:[],

        // userTypeList:[1],
        allLoadList:{

        },

        loading:{
            isLoading:0,
            msg:"加载中..."
        },
        downMsgList:[],

        //计算往下几级
        downNum:0,
        //记录级数
        // userTypeList:[1],
        nowUserType:"1级",

        //级数数据记录
        gradeList:[],

        //参数uid
        pramUid:'',
        //上级参数uid
        prevPramUid:'',
        //子返点列表
        itemRebateList:[],

        lowerUserName:'', //下级代理名称
        userType:'', // 用户类型

        userNameList:[], // 代理名称列表

        uid:'',

        agencyType: localStorage.agencyType ? localStorage.agencyType:2,//用户类型
    },
    created: function () {
        
    },
    mounted: function () {


    },
    methods: {

        loadMemberList(numIndex){

            var paramData={},
            _this=this;
            if(numIndex==0){
                paramData={
                    uid:_this.uid,
                    pageIndex:  _this.downPageIndex,
                    pageNum:10,
                };
            }else{
                paramData={
                    pageIndex:  numIndex,
                    pageNum:10,
                    lowerUserName:_this.lowerUserName,
                    userType:_this.userType
                };
            }
            var obj={
                type:"post",
                url:"/authApi/proxy/queryInvitateUserList",
                data:paramData,
                success:function(data){
                    if(data.code==200){
                        if( data.body.list.length<1){
                            _this.noMsg="暂无数据";
                            $('#fenye').jqPaginator('option', {
                                totalPages: 1,
                                currentPage: 1 
                            });
                        }else{
                            _this.nowloadList = data.body.list;
                            $('#fenye').jqPaginator('option', {
                                totalPages: data.body.pageSize,    //返回总页数
                                currentPage: numIndex
                            });
                        }
                    }else{
                        _this.noMsg="暂无数据";
                        _this.nowloadList = [];
                    }
                },
                error:function(msg){
                },
            };
            base.callAuthApi(obj);
        },
        //返回上层数据
        upDataBack(list,index){
            var _this=this;
            if(_this.userNameList.length == 1) {
                _this.uid = '';
                _this.userNameList.splice(index,1);
            }else{
                _this.uid = list.uid;
                _this.userNameList.splice(index,(_this.userNameList.length-index));
            }

            _this.loadMemberList(0);
        },
        //清除数据
        clearData(){
            var _this=this;
            _this.downPageIndex=1;

            _this.loading.isLoading = 0;
            _this.loading.msg = "点击加载更多";
        },

        //查看下级
        checkDownGrade(){
            var _this=this;
        },
        //弹出框
        showPopover:function(index,key){
            var _this=this;
            if(key==1){
                var str = _this.nowloadList[index].data;
                str=str.replace("ssc","时时彩").replace("k3","快3").replace("11x5","11选5").replace("3D","福彩3D").replace("PK10","PK10").replace('hk6','六合彩').replace('7xc','七星彩').replace('kl10f','快乐十分').replace('PCDD','北京28');
                str=str.split("@");
                str.map(function(item,index){
                    str[index] = item.split("#");
                });
                _this.itemRebateList=str;
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
                    });
                })
                
            }else if(key==0){
                _this.uid = _this.nowloadList[index].uid;
                _this.loadMemberList(0);
                var uidIndex  =  _this.userNameList.indexOf(_this.uid);
                //console.log(uidIndex);
                if(uidIndex == -1){
                    _this.userNameList.push(_this.nowloadList[index]);
                }

            }
            // $(".popover").show();
        },
        //关闭
        closePopover(){
            // $(".popover").hide();
            $(".moreLayer").show();
            $(".itemRebateList").hide();
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
        pc.loadMemberList(num);  
    }
});