$(function () {
    $('.newTab a').click(function () {
        $(this).siblings().removeClass('curr');
        $(this).addClass('curr');
    });
});
let Report = new Vue({
    el: "#agentReport",
    data: {
        Reportdatas:[],
        currSearchType: 1,
        nextAgentName:'',
        coinUnit:'',
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
            _this.coinUnit = JSON.parse(localStorage.getItem('config')).coinUnit;
            var obj = {
                type: "post",
                url: "/authApi/proxy/getProxyCenterReportInfo",
                data: {
                    dateType: _this.currSearchType,
                    nextAgentName:_this.nextAgentName
                },
                success: function(data) {
                    if(data.code == 200) {
                        _this.Reportdatas = data.body;
                    }else{
                        _this.Reportdatas = [];
                        window.parent.layui.use('layer', function () {
                            var layer = window.parent.layui.layer;
                            layer.msg('找不到该下级代理');
                        });
                    	
                    }
                },
                error: function(msg) {
                    //console.log(msg)
                },

            }
            base.callAuthApi(obj);
            
        },


    },


});