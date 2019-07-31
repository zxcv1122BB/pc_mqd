let collect = new Vue({
    el: "#collect_pg",
    data: {
        collectData: {},
        dataList:[],
        collectListLow:[], // 低频
        collectListHeight:[], // 高频
    },
    created: function () {
         if(localStorage.collectGame){
             this.getDigitalInfo();
         }else {
             window.location.href = '/';
         }
    },
    methods: {
        // 获取彩种信息
        getDigitalInfo: function(id) {
            var _this = this,
                obj = {
                    type: "post",
                    url: '/commonAPI/getDigitalInfo',
                    data: {
                        one_type_id:''
                    },
                    success: function(data) {
                        if(data.code == 200 && data.body.length!=0){
                            var data  = data.body;
                            _this.IdList = JSON.parse(localStorage.collectGame).idList;
                            _this.IdList.map(function (item) {
                                for(var key in data){
                                    if(item == data[key].gameID){
                                        _this.collectData[item]= data[key];
                                    }
                                }
                            });
                            for( var i in _this.collectData){
                                _this.dataList.push(_this.collectData[i]);
                            }
                            _this.dataList.map(function (item) {
                               if(item.game_type == 1){
                                   _this.collectListLow.push(item);
                               }else if(item.game_type == 2||item.game_type == 3){
                                   _this.collectListHeight.push(item);
                               }
                            });
                        }
                    }
                };
            base.callCommonApi(obj);
        },
        cancelCollect: function (gameID) {
            layui.use('layer',function(){
                var layer_confirm=layui.layer;
                layer_confirm.open({
                    content: "<div style='padding: 0 80px 0 20px;height: 42px;line-height: 42px;font-size: 14px;'>确定取消收藏?</div>",
                    area: "400px",
                    type: 1,
                    closeBtn: 0,
                    title: "提示",
                    btn: ["确定", "取消"],
                    yes: function () {
                        var dataList= base.collectGame.set(gameID);
                        localStorage.collectGame =dataList?JSON.stringify(dataList):'';
                        window.location.reload();
                    },
                });
            })
            
        }
    },
});