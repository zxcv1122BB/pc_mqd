let agencyRebate=new Vue({
  el:"#agencyRebateList",
  data:{
      //所有可用id和名称
      allGameID: "",
      //根据code区分
      codeGameID: "",
      //三级id
      oneTypeId: "",
      //赔率列表
      rebateItemList: "",
      //三级玩法名称列表
      gameItemList: "",
      //一级玩法名称
      showName: "",
      //当前玩法对应的code
      code: "",

      agencyType: localStorage.agencyType ? localStorage.agencyType:2,//用户类型
  },
  created() {

    this.initData();
  },
  mounted() {
    $(".slideLeft li:first-child:before").css({
      borderBottomWidth: document.documentElement.clientWidth * 0.3 + "px"
    });
    $(".slideLeft li:first-child:after").css({
      borderBottomWidth: document.documentElement.clientWidth * 0.3 + "px"
    });
  },
  methods: {
    routerBack: function () {
      if (localStorage.turnPathName && localStorage.turnPathName != "login") {
        // this.$router.push({ name: localStorage.turnPathName });
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: "index"
        });
      }

    },
    //初始化第一个数据
    initData() {
      //获取所有的数字彩id
      var _this = this, list = JSON.parse(localStorage.index_sysLottery), gameIDList = [];
      list.map(function (item) {
        if (item.code&&item.gameID!=99) {
          gameIDList.push({
            code: item.code,
            gameID: item.gameID,
            show_name: item.show_name
          })
        }
      })
      //所有id和名称存储
      _this.allGameID = gameIDList;
      //初始化第一个对象数据
      _this.getBetsType('',gameIDList[0]);
    },
    //获取三级玩法表
    getBetsType: function (event,objList) {
      if(event){
        event=event.currentTarget;
        $(".gameNameList span").removeClass("active");
        $(event).addClass("active");
        $(".rebateContent").scrollLeft(0);
      }

      this.closeGameNameMenu();
      //保存当前选中的玩法id,显示中文名称,code
      this.oneTypeId = objList.gameID;
      this.showName = objList.show_name;
      this.code = objList.code;

      var _this = this,
        obj = {
          type: "post",
          // type: 'post',
          url: '/commonAPI/qryGamePlayInfo',
          data: {
            one_type_id: _this.oneTypeId
          },
          success: function (data) {
            if (data.code == 200 && data.body) {
              //console.log(data.body)
              _this.initializeBetsTypeData(data.body)
            } else {
            }
          },
          error: function (res) {

          }
        },
        dataList = localStorage.qryGamePlayInfo ? JSON.parse(localStorage.qryGamePlayInfo) : "",
        ots = localStorage.qryGamePlayInfoTimestamp ? JSON.parse(localStorage.qryGamePlayInfoTimestamp) : "",
        nts = localStorage.contrastTimestamp ? JSON.parse(localStorage.contrastTimestamp).gameTypeSign : "";

      //比对时间戳，看是否需要更新
      if ((!nts[_this.oneTypeId] && !ots[_this.oneTypeId] && dataList[_this.oneTypeId]) || (dataList != "" && ots != "" && nts != "" && nts != null && ots[_this.oneTypeId] && dataList[_this.oneTypeId] && ots[_this.oneTypeId] == nts[_this.oneTypeId])) {
        _this.initializeBetsTypeData(dataList[_this.oneTypeId])
      } else {
        _this.contrastTimestamp();
        base.callCommonApi(obj);
      }
    },
    //获取第一遍加载时的时间戳
    contrastTimestamp: function () {
      var _this = this, timeList,
        obj = {
          type: "post",
          url: "/commonAPI/privacy/getUpdateStatusSign",
          data: {
            isWhite: true
          },
          success: function (data) {
            var ulist = [], nlist = [], oDataList, nameList = ["sysAdvpictureSign", "sysBulletinSign", "sysConfigureSign", "sysLotterySign"];
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
    //初始化投注项数据
    initializeBetsTypeData: function (data) {
      //gameItemList  rebateItemList
      var _this = this,
        gameNameList = [], rebateNameList = [],
        code1 = _this.code,
        middleVal = "",
        objList = [],
        rebateList, backRebate,
        rebateList1 = JSON.parse(localStorage.szcRebateList);
      for (var i in rebateList1) {
        if (rebateList1[i].code == code1) {
          rebateList = rebateList1[i]
          break
        }
      }
      // 计算从最大返点到0.1
      do {
        objList = [rebateList.nowRebate];
        data.map(function (item) {
          if (item.max_prize.indexOf('|') != -1) {
            var maxList = item.max_prize.split('|'), minList = item.min_prize.split('|'), val = "";
            maxList.map(function (items, index) {
              //三级玩法名
              if (rebateNameList.length == 0) {
                gameNameList.push(item.name2 + "-" + item.name3 + "-" + index);
              }
              middleVal = parseFloat((items - minList[index]) / (rebateList.rebate * 10 + 1)).toFixed(3);
              backRebate = parseFloat(items - (middleVal * (rebateList.rebate - rebateList.nowRebate) * 10)).toFixed(3);
              objList.push(backRebate);
            })
          } else {
            //三级玩法名
            if (rebateNameList.length == 0) {
              gameNameList.push(item.name2 + "-" + item.name3);
            }
            middleVal = parseFloat((item.max_prize - item.min_prize) / (rebateList.rebate * 10 + 1)).toFixed(3);
            backRebate = parseFloat(item.max_prize - (middleVal * (rebateList.rebate - rebateList.nowRebate) * 10)).toFixed(3);
            //显示的赔率表
            // rebateNameList.push([])
            objList.push(backRebate);
          }
        })
        rebateNameList.push(objList);
        rebateList.nowRebate = parseFloat(rebateList.nowRebate - 0.1).toFixed(1);

      } while (rebateList.nowRebate != 0)
      //添加返点为0的赔率
      objList = [rebateList.nowRebate];
      data.map(function (item) {
        if (item.max_prize.indexOf('|') != -1) {
          var maxList = item.max_prize.split('|'), minList = item.min_prize.split('|'), val = "";
          minList.map(function (items, index) {
            backRebate = parseFloat(items).toFixed(3);
            objList.push(backRebate);
          })
        } else {
          backRebate = parseFloat(item.min_prize).toFixed(3);
          objList.push(backRebate);
        }
      })
      rebateNameList.push(objList);
      rebateList.nowRebate = parseFloat(rebateList.nowRebate - 0.1).toFixed(1);
      //赋值数据到对象数据中
      _this.gameItemList = gameNameList;
      _this.rebateItemList = rebateNameList;

      //动态设置大小
      $(".rebateContent>div").css({
        width: 100 * rebateNameList.length + "px"
      });


    },
    //玩法名称点击切换
    turnGameName(index) {
      var _this = this, item = _this.allGameID[index];
      _this.getBetsType(item);
    },
    //打开玩法名称菜单
    openGameNameMenu() {
      $(".popups").show();
    },
    //关闭玩法名称菜单
    closeGameNameMenu() {
      $(".popups").hide();
    },

  },
  watch: {

  }
})