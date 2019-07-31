new Vue({
    el: "#live",
    data: {
        //完赛的比赛
        full:0,

        //控制tools的显示状态
        toolManager: {
            show_selBar: false,
            show_date_tool: false,
            show_banner_tool: false,
            show_bet: false,
        },
        //管理是否显示日期或者期数工具,三级玩法类型
        is_show_date_tool: true,
        is_show_banner_tool: false,
        is_show_type_tool:false,
        // 管理tab栏显示状态
        liveManager: {
            all_game: true,
            jczq: false,
            dc: false,
            zc: false
        },
        // 足彩比分玩法分类
        play_type_manager:{
            sfc:true,
            scjq:false,
            bqc:false,
        },
        //所选日期
        sel_date: '',
        //可查询的近期日期数据
        abble_search_date: [],
        //所选期数
        sel_banner:10086,
        //可选期数
        abble_search_banner:[],
        //联赛类型数组，用于管理显示哪些类型的联赛
        league_type_arr: [],
        //管理根据比赛状态显示比赛的数据
        all_live_manager: {
            not: true,
            in: true,
            end: true
        },
        //用于展示的数据
        display_match_arr:[],
        //存储所有的比赛数据
        match_store_arr:[]
    },
    created: function () {
        //先生成可查询日期
        this.provideDate();
        //主动调用一次事件管理函数，获取初始化页面时需要使用的数据
        this.doThings();
    },
    methods: {
        //根据比赛状态选择向展示数组中推入要展示的数据
        pushDatasToShowObjByMatchStatus: function () {
            //先把展示数组置空
            this.display_match_arr = [];        
            //判断是否是所有的数据都需要展示
            var _this = this;
            var is_show_all = true;    //定义一个记录是否全部显示的变量
            var show_status = '';        //哪种类型   
            for (var key in this.all_live_manager) {
                if (this.all_live_manager[key]) {
                    show_status = key;      //如果当前为值为true就进入下一次迭代
                    continue;
                }
                is_show_all = false;
            }
            //如果需要全部显示
            if (is_show_all) {
                //将所有联赛类型标签显示出来
                _this.league_type_arr.map(function (item) {
                    item.isShow = true;
                })
                //将打勾的联赛类型比赛显示出来
                _this.match_store_arr.map(item => {
                    // 遍历仓库对象
                    _this.league_type_arr.map(ele => {
                        // 遍历联赛类型管理数组
                        if (ele.league_name == item.league_name) {
                            if (ele.isSelected) {
                                // 如果联赛对象中的某一类
                                _this.display_match_arr.push(item)
                            }
                        }
                    })
                })
            } else {
                this.display_match_arr = [];
                var status_code = -1;
                var temp_league_obj = {};
                switch (show_status) {
                    case 'not':
                        status_code = '未开始';
                        break;
                    case 'in':
                        status_code = '进行中';
                        break;
                    case 'end':
                        status_code = '已结束';
                        break;
                    default:
                        break;
                }
                //遍历存储所有赛事数据的根对象
                this.match_store_arr.map(function (item) {
                    if (item.match_status == status_code) {
                        //如果比赛的状态码对应
                        _this.league_type_arr.map(ele => {
                            if (ele.league_name == item.league_name) {
                                if (ele.isSelected) {
                                    _this.display_match_arr.push(item)
                                }
                            }
                            if (!temp_league_obj[item.league_name]) {
                                temp_league_obj[item.league_name] = item.league_name;
                            }
                        })
                    }
                })
                // 判断是否要根据比赛数据在工具栏中生成某一类联赛选择标签
                _this.league_type_arr.map(function (item) {
                    item.isShow = false;
                    if (temp_league_obj[item.league_name]) {
                        item.isShow = true;
                    }
                })
            }
            _this.full=0;
            _this.display_match_arr.map(item=>{
                if(item.match_status=='已结束'){
                    _this.full++;
                }
            })
        },
        //事件管理函数，当显示某一栏时请求相应的数据加载到页面中
        doThings: function () {
            if (this.liveManager.all_game) {
                this.getDatas({ date: this.sel_date });
                document.title="【足球比分直播】";
            } else if (this.liveManager.jczq) {
                this.getDatas({ date: this.sel_date})
                document.title = "【竞彩足球比分直播】";
            } else if (this.liveManager.dc) {
                //这里先传入一个对象，只传递一级玩法分类参数，当期数返回回来之后再传入要查询的期数
                this.getBannerNumber('dc', { data_type: 3 });
                document.title = "【足球单场比分直播】";
            } else if (this.liveManager.zc) {
                this.getBannerNumber('zc', { data_type: 2 });
                document.title = "【足彩比分直播】";
            }
        },
        //点击tab栏选项时改变相应的彩种值，调用事件管理函数执行相应的业务逻辑
        changeLiveManager: function (e) {
            //将所有工具栏的显示展开状态设为false
            for (var key in this.toolManager) {
                this.toolManager[key] = false;
            }
            if (this.liveManager[e]) {
                return;
            }//如果点击的是同一个选项，就不执行下面的逻辑
            for (var key in this.liveManager) {
                this.liveManager[key] = false
            }
            this.liveManager[e] = true;
            switch (e) {
                case 'all_game':
                case 'jczq':
                    this.is_show_date_tool = true;
                    this.is_show_banner_tool = false;
                    this.is_show_type_tool=false;
                    break;
                case 'dc':
                    this.is_show_date_tool = false;
                    this.is_show_banner_tool = true;
                    this.is_show_type_tool = false;
                    break;
                case 'zc':
                    this.is_show_date_tool = false;
                    this.is_show_banner_tool = true;
                    this.is_show_type_tool = true;
                default:
                    break;
            }
            this.doThings()
        },
        //改变selBar的显示状态
        changeToolStatus: function (keys) {
            if (this.toolManager[keys]) {
                this.toolManager[keys] = false;
                return;
            }
            for (var key in this.toolManager) {
                this.toolManager[key] = false;
            }
            this.toolManager[keys] = true;
        },
        //生成可查询的最近几天的比赛数据
        provideDate: function () {
            for (var index = 0; index < 7; index++) {
                this.abble_search_date.push(this.fun_date(-index));
            }
            this.sel_date = this.abble_search_date[0];
        },
        //获取可查询的期数
        getBannerNumber:function(keys,obj) {
            var _this=this;
            var oneTypeId=2;
            // var url_string = "/commonAPI/scoreZB/selectByBannerNumber?oneTypeId="
            this.abble_search_banner=[];
            this.sel_banner=10086;
            // 查询单场和足彩的期数的地址不一样
            if(keys==='dc'){
                oneTypeId=3
            }else{
                // url_string ="/commonAPI/football/selectQiByPlayType?oneTypeId="
                oneTypeId=2
                if (this.play_type_manager.sfc){
                    oneTypeId ='2&play_type_id=14';
                    obj.type_id=14;
                } else if (this.play_type_manager.scjq){
                    oneTypeId = '2&play_type_id=16';
                    obj.type_id = 16;
                } else if (this.play_type_manager.bqc){
                    oneTypeId = '2&play_type_id=17';
                    obj.type_id = 17;
                }
            }
            base.callCommonApi({
                url: "/commonAPI/scoreZB/selectBannerNumberList?one_type_id="+ oneTypeId,
                type:"post",
                success:function(data) {
                    if(data.body){
                        //console.log(data.body)
                        data.body.map(item=>{
                            if (item){
                                if(item.banner_number){
                                    _this.abble_search_banner.push(item.banner_number);
                                }else{
                                    _this.abble_search_banner.push(+item);
                                }
                            }                            
                        })
                        _this.sel_banner=_this.abble_search_banner[0];
                        //console.log(_this.abble_search_banner)
                        // 这里为对象增加期数信息
                        obj.banner=_this.sel_banner,
                        // 传递到获取数据的参数中
                        _this.getDatas(obj)
                    }
                }
            })
        },
        //更改需要显示的杯赛的状况
        changeLeagueType: function (league_key) {
            this.league_type_arr.map(function (item) {
                if (item.league_name == league_key) {
                    item.isSelected = !(item.isSelected)
                }
            })
            this.pushDatasToShowObjByMatchStatus();
        },
        //显示全部联赛的比赛
        showAllLeagueType: function () {
            this.league_type_arr.map(function (item) {
                item.isSelected = true
            })
            this.pushDatasToShowObjByMatchStatus();
        }, // 取反LeagueType显示联赛直播数据
        showNegationLeagueType:function() {
            this.league_type_arr.map(function (item) {
                item.isSelected = !(item.isSelected)
            })
            this.pushDatasToShowObjByMatchStatus();
        },
        //更改是否显示某一比赛状态的数据
        changeGameStatus: function (keys) {
            if (keys == 'not' || keys == 'in' || keys == 'end') {
                for (var key in this.all_live_manager) {
                    this.all_live_manager[key] = false;
                }
                this.all_live_manager[keys] = true;
                this.all_live_manager.all=false;
            } else {
                for (var key in this.all_live_manager) {
                    this.all_live_manager[key] = true;
                }
            }
        },
        //根据日期和期号查询数据
        getDatas:function (obj) {
            var oneTypeId=0;
            var url_arguments='';
            var _this=this;
            _this.match_store_arr=[];
            _this.display_match_arr=[];
            _this.league_type_arr = [];
            _this.sel_banner = obj.banner
            // 判断是否有传入三级玩法分类参数
            if (obj.type_id){

            }else{
                if (_this.play_type_manager.sfc){
                    obj.type_id=14
                } else if (_this.play_type_manager.scjq){
                    obj.type_id=16
                } else if (_this.play_type_manager.bqc){
                    obj.type_id=17
                }
            }
            if(obj.date){
                this.sel_date=obj.date;
                if (this.liveManager.all_game){
                    oneTypeId=0;
                    url_arguments ='?matchDate='+obj.date;
                }else{
                    url_arguments = '?matchDate=' + obj.date + '&ont_type_id=1';
                }
            }else{
                if (this.liveManager.dc){
                    url_arguments = '?matchDate=' + obj.banner + '&ont_type_id=3';
                }else{
                    url_arguments = '?matchDate=' + obj.banner + '&ont_type_id=2&play_type_id='+obj.type_id;
                }
            }
            //console.log(url_arguments);
            //手动调用关闭工具栏
            this.changeToolStatus();
            base.callCommonApi({
                url:'/commonAPI/scoreZB/selectScoreLiveBroadcast'+url_arguments,
                type:'post',
                success:function(data){
                    var flag=true;
                    if(data.body){
                        //console.log(data.body)
                        data.body.map(item=>{
                            var tempObj={};
                            // 判断联赛信息数据
                            tempObj.game_result='-';
                            tempObj.zc_p={
                                win:'25',
                                draw:'22',
                                lose:'1'
                            }
                            if(item.league_name){
                                // 判断联赛是否在联赛列表中
                                for (var i = 0; i < _this.league_type_arr.length;i++){
                                    if (_this.league_type_arr[i].league_name===item.league_name){
                                        flag=false;
                                        break;
                                    }
                                }
                                if(flag){
                                    _this.league_type_arr.push({ league_name: item.league_name , isSelected: true, isShow: true})
                                }
                                flag=true;
                                tempObj.league_name = item.league_name;
                            }
                            // 判断比赛场次
                            if(item.sessions!='undefined'){
                                tempObj.sessions=item.sessions;
                            }else{
                                tempObj.sessions = '-';
                            }
                            // 判断比赛时间
                            tempObj.match_date = item.match_date.slice(5);
                            tempObj.match_date = tempObj.match_date.slice(0, tempObj.match_date.length-3)
                            if(item.match_status!="undefined"){
                                tempObj.match_status = item.match_status ? (item.match_status == 1 ? '未开始' : (item.match_status==2?'进行中':'停赛')):'已结束'
                            }
                            //主队
                            tempObj.home_team_name = item.home_team_name;
                            //客队
                            tempObj.away_team_name = item.away_team_name;
                            // 半场比分
                            if (item.half_court_score){
                                tempObj.half_court_score = item.half_court_score;
                            }else{
                                tempObj.half_court_score='-';
                            }
                            //全场比分
                            if(item.court_score){
                                tempObj.court_score = item.court_score;
                            }else{
                                tempObj.court_score = '-';
                            }
                            // 彩果
                            if (item.match_result!="undefined"){
                                tempObj.match_result=item.match_result?(item.match_result==1?'胜':'平'):"负"
                            }else{
                                tempObj.match_result='-'
                            }
                            //平均值
                            if (item.fbslo) {
                                tempObj.fbslo = {};
                                tempObj.fbslo.avg_win = item.fbslo.avg_win
                                tempObj.fbslo.avg_draw = item.fbslo.avg_draw
                                tempObj.fbslo.avg_lose = item.fbslo.avg_lose
                            } else {
                                tempObj.fbslo = {};
                                tempObj.fbslo.avg_win='-'
                                tempObj.fbslo.avg_draw='-'
                                tempObj.fbslo.avg_lose='-'
                            }
                            //组名称
                            if (item.group_name){
                                tempObj.group_name=item.group_name;
                            }else{
                                tempObj.group_name='--'
                            }
                            //让球结果
                            if (item.letball_result){
                                tempObj.letball_result=item.letball_result;
                            }else{
                                tempObj.letball_result='--'
                            }
                            //不让球结果
                            if (item.not_letball_result) {
                                tempObj.not_letball_result = item.not_letball_result;
                            } else {
                                tempObj.not_letball_result = '--'
                            }
                            //竞彩赔率
                            if (item.foi) {
                                tempObj.foi = {};
                                tempObj.foi.home_win = item.foi.home_win
                                tempObj.foi.home_draw = item.foi.home_draw
                                tempObj.foi.home_lose = item.foi.home_lose
                            } else {
                                tempObj.foi = {};
                                tempObj.foi.home_win = '-'
                                tempObj.foi.home_draw = '-'
                                tempObj.foi.home_lose = '-'
                            }
                            //单场赔率
                            if (item.fbslo) {
                                tempObj.fbslo.home_win = item.fbslo.home_win
                                tempObj.fbslo.home_draw = item.fbslo.home_draw
                                tempObj.fbslo.home_lose = item.fbslo.home_lose
                            } else {
                                tempObj.fbslo.home_win = '-';
                                tempObj.fbslo.home_draw = '-';
                                tempObj.fbslo.home_lose = '-';
                            }
                            //主客队总进球结果
                            if(item.total_goal_result){
                                tempObj.total_goal_result=item.total_goal_result;
                            }else{
                                tempObj.total_goal_result = '_';
                            }
                            //让球数
                            if(item.letball_number!='undefined'){
                                tempObj.letball_number=item.letball_number;
                            }else{
                                tempObj.letball_number = '-'
                            }
                            _this.match_store_arr.push(tempObj);
                        })
                    }
                    _this.pushDatasToShowObjByMatchStatus()
                }
            })
        },
        //改变查询哪一类三级玩法的比赛
        changeTypeManager:function(keys){
            for (var key in this.play_type_manager){
                this.play_type_manager[key]=false;
            }
            this.play_type_manager[keys]=true;
            this.getBannerNumber('zc', { data_type: 2 });
        },
        //获取几天前的日期为某一天
        fun_date: function (day) {
            var date1 = new Date(),
                time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
            var date2 = new Date(date1);
            date2.setDate(date1.getDate() + day);
            var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + (date2.getDate() >= 10 ? date2.getDate() : '0' + date2.getDate());
            return time2;
        }
    },
    watch: {
        all_live_manager: {
            handler: function () {
                this.pushDatasToShowObjByMatchStatus()
            },
            deep: true
        }
    }
})
$(".box_header li").click(function(){
    $(this).addClass("active").siblings().removeClass("active")
})
new m_sideBar("#rightBar");