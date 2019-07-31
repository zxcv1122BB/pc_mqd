(function(window) {
	var h = $(window).height() + 'px';
	var w = $(window).width() + 'px';
	$('.mask').css({
		width: w,
		height: h,
		background: "rgba(0, 0, 0, 0.4)",
		position: "fixed",
		top: "0",
		right: "0",
	});
})(window);

//数据交互
var luck_number,
canvas_num = [],
issue = [],
numIndex = 1;
var clickIndex = -1;
chartIdAll: 5,
	app = new Vue({
		el: '#trend',
		data: {
			//		Alltitle: ["基本走势", "定位胆"],
			title: "基本走势", //选择
			datas: [], //数据
			mes: [],
			chartId: 5, //彩票类型
			arr: [], //长度
			//		preventBanner:'',   //最新期数
			//		courtDown:'',     //最新期倒计时
			unifyNum:'',


             //六合彩
			 //绿波  红波 蓝波  #07bf00  #ff2600   #008fff
			lhcolor:{
				greenNum:["05","06","11","16","17","21","22","27","28","32","33","38","39","43","44","49"],  //绿波
				blueNum:["03","04","09","10","14","15","20","25","26","31","36","37","41","42","47","48"],  //绿波
				redNum:["01","02","07","08","12","13","18","19","23","24","29","30","34","35","40","45","46"]  //绿波

			},
			 //0 红色  1绿色  2蓝色
			//  colorList:[2,2,1,1,0,0,2,2,1,1,0,2,2,1,1,0,0,2,2,1,0,0,2,2,1,1,0,0,2,2,1,0,0,2,2,2,1,0,0,2,1,1,0,0,2,2,1,1,0]
			colorList:[
				'red', 'red', 'blue', 'blue', 'green', //1
				'green', 'red', 'red', 'blue', 'blue', //2
				'green', 'red', 'red', 'blue', 'blue', //3
				'green', 'green', 'red', 'red', 'blue', //4
				'green', 'green', 'red', 'red', 'blue', //5
				'blue', 'green', 'green', 'red', 'red', //6
				'blue', 'green', 'green', 'red', 'red', //7
				'blue', 'blue', 'green', 'green', 'red', //8
				'blue', 'blue', 'green', 'green', 'red', //9
				'red', 'blue', 'blue', 'green' //10+
			],
			bj28CL:[
                'gray','green','blue','red','green','blue',
                'red','green','blue','red','green',
                'blue','red','gray','gray','red',
                'gray','blue','red','green','blue',
                'red','green','blue','red','green',
                'blue','gray'
            ],
			alllottery: [],
			gameCode: 'PK10'
		},
		created: function() {
			this.getAllGame();
// 			localStorage.removeItem("chartId");
		},
		mounted: function() {
			//      this.getBetsBannerInfo();
			//      setInterval(this.setTimeFn, 1000);
		},
		//利用ajax来查询记录列表
		methods: {
		    getAllGame: function() {
		        var _this = this;
				var obj = {
					type: 'post',
					data: {
						source_type: 1
					},
					dataType: 'json',
					url: '/commonAPI/qryAllGame1Info',
					success: function success(data) {
						if (data.code == 200) {
							_this.alllottery = _this.compare(data.body, 'sort');
							var code = 'PK10';
                			if(localStorage.chartId) {
                				var num = localStorage.chartId;
                			} else {
                				var num = 15;
                			}
							for (var i = 0; i < _this.alllottery.length; i++) {
							    if (_this.alllottery[i]['gameID'] == num) {
							        code = _this.alllottery[i]['code'];
							    }
							}
			                _this.selectType(code, num);
						}
					},
				};
				base.callCommonApi(obj);
			},
			compare: function(array, key) {
				return array.sort(function(a, b) {
					var x = parseInt(a[key]);
					var y = parseInt(b[key]);
					return ((x < y) ? -1 : (x > y) ? 1 : 0)
				})
			},
			//数据加载
			getdatas: function(index, num) {
				var _this = this;
				var avg = []; //平均遗漏数
				canvas_num.length = 0;
				issue.length = 0;
				numIndex = num;
				_this.datas = [];
				_this.mes = [];
				if(!num) {
					num = localStorage.chartId;
				}
				_this.chartId = num;
				chartIdAll = num;
				var obj = {
					type: 'post',
					//					async:false,
					data: {
						one_type_id: _this.chartId,
						count: 30
					},
					dataType: 'json',
					url: '/commonAPI/hisOpenData',
					success: function(data) {
						if(data.code == 200) {

							_this.datas = data.body;
							_this.arr = [];
							 if(_this.chartId == 9||_this.chartId == 40||_this.chartId == 41) {
								_this.arr = new Array(28);
							} else if(_this.chartId == 11||(_this.chartId>=20&&_this.chartId<=25)) {
								_this.arr = new Array(16);
							} else if(_this.chartId == 7||_this.chartId == 16||_this.chartId == 17||_this.chartId == 18) {
								_this.arr = new Array(11);
							}else{
								_this.arr = new Array(10);
							}
							if(_this.chartId==12){
								$("#div_thr").css("width","100%");
								$(".dingweiDan").css("width","100%");
							}
							for(var i = 0; i < _this.datas.length; i++) {
								// _this.datas[i].open_time = _this.datas[i].open_time.slice(0, 10)

								if(_this.datas[i].dwd) {
									_this.mes = _this.datas[i].dwd.split('#', index); //个、十、百位
								}
								if(_this.gameCode=='hk6'){
									_this.datas[i].luck_number = _this.datas[i].luck_number.replace(/\+/,','); //所有中奖号码
								}

								luck_number = _this.datas[i].luck_number.split(',', index); //个、十、百位中奖号码

								var all_luckNum = _this.datas[i].luck_number.split(','); //所有中奖号码
								//北京28
								_this.datas[i].bjluckNum = 0;
								if(_this.gameCode == 'PCDD') {
									_this.datas[i].bjluck = all_luckNum.join("+");
									for(var b = 0; b < all_luckNum.length; b++) {
										_this.datas[i].bjluckNum = parseInt(_this.datas[i].bjluckNum) + parseInt(all_luckNum[b]);
									}
									var bjluckNum = _this.datas[i].bjluckNum;
									
                                    for (var j = 0; j < _this.datas.length; j++) {
                                        var list = _this.datas[j].luck_number.split(','),
                                            lHtml = "";
                                        if (list.length == 3) {
                                            lHtml = list[0] + ",+," + list[1] + ",+," + list[2] + ",=";
                                        }
                                        var sumNum = parseInt(list[0]) + parseInt(list[1]) + parseInt(list[2]);
                                        
                                        _this.datas[j].recentlyNum = lHtml.split(',');
                                        _this.datas[j].recentlyNum.push(sumNum);
                                    }
								}
								var nary = all_luckNum;
								var biao = 0;
								_this.datas[i].total = 0; //中奖号码和值
								for(var x = 0; x < all_luckNum.length; x++) {
									_this.datas[i].total = _this.datas[i].total + parseInt(all_luckNum[x]);
								}
								//计算和值等
								var x = 0;
								if(biao == 0) {
									if(_this.chartId == 5||_this.chartId==19) {
										if(nary[x] == nary[x + 1] && nary[x + 1] == nary[x + 2]) {
											_this.datas[i].shape = '豹子';
										} else if(nary[x] == nary[x + 1] || nary[x + 1] == nary[x + 2] || nary[x] == nary[x + 2]) {
											_this.datas[i].shape = '组三';
										} else {
											_this.datas[i].shape = '组六';
										}
									} else if(_this.chartId == 6||_this.chartId==13||_this.chartId==14) {
										if(nary[x] == nary[x + 1] && nary[x + 1] == nary[x + 2]) {
											_this.datas[i].shape = '豹子';
										} else if(nary[x] == nary[x + 1] || nary[x + 1] == nary[x + 2] || nary[x] == nary[x + 2]) {
											_this.datas[i].shape = '组三';
										} else if(nary[x] != nary[x + 1] && nary[x + 1] != nary[x + 2] && nary[x] != nary[x + 2]) {
											_this.datas[i].shape = '组六';
										}
										if(nary[x + 1] == nary[x + 2] && nary[x + 2] == nary[x + 3]) {
											_this.datas[i].shape1 = '豹子';
										} else if(nary[x + 1] == nary[x + 2] || nary[x + 2] == nary[x + 3] || nary[x + 1] == nary[x + 3]) {
											_this.datas[i].shape1 = '组三';
										} else if(nary[x + 1] != nary[x + 2] && nary[x + 2] != nary[x + 3] && nary[x + 1] != nary[x + 3]) {
											_this.datas[i].shape1 = '组六';
										}
										if(nary[x + 2] == nary[x + 3] && nary[x + 3] == nary[x + 4]) {
											_this.datas[i].shape2 = '豹子';
										} else if(nary[x + 2] == nary[x + 3] || nary[x + 3] == nary[x + 4] || nary[x + 2] == nary[x + 4]) {
											_this.datas[i].shape2 = '组三';
										} else if(nary[x + 2] != nary[x + 3] && nary[x + 3] != nary[x + 4] && nary[x + 2] != nary[x + 4]) {
											_this.datas[i].shape2 = '组六';
										}
									} else if(_this.chartId == 8||_this.chartId == 15) {
										_this.datas[i].shape = parseInt(nary[x]) + parseInt(nary[x + 1]);
										biao = 1;
									} else if(_this.chartId == 9||_this.chartId == 40||_this.chartId == 41) {
										//判断大小
										if(_this.datas[i].bjluckNum <= 5) {
											_this.datas[i].shape = '极小'
										} else if(_this.datas[i].bjluckNum <= 13) {
											_this.datas[i].shape = '小'
										} else if(_this.datas[i].bjluckNum <= 22) {
											_this.datas[i].shape = '大'
										} else if(_this.datas[i].bjluckNum <= 27) {
											_this.datas[i].shape = '极大'
										}
										if(_this.datas[i].bjluckNum <= 5) {
											_this.datas[i].shape = '极小'
										}
										//判断单双
										var b = _this.datas[i].bjluckNum % 2;
										if(b == 0) {
											_this.datas[i].shape = _this.datas[i].shape + "双";
										} else if(b == 1) {
											_this.datas[i].shape = _this.datas[i].shape + "单";
										}
										//判断波色
										var a = _this.datas[i].bjluckNum;
										if(a == 1 || a == 4 || a == 7 || a == 10 || a == 16 || a == 19 || a == 22 || a == 25) {
											_this.datas[i].shape1 = "绿波";
										} else if(a == 2 || a == 5 || a == 8 || a == 11 || a == 17 || a == 20 || a == 23 || a == 26) {
											_this.datas[i].shape1 = "蓝波";
										} else if(a == 3 || a == 6 || a == 9 || a == 12 || a == 15 || a == 18 || a == 21 || a == 24) {
											_this.datas[i].shape1 = "红波";
										} else if(a == 0 || a == 13 || a == 14 || a == 27) {
											_this.datas[i].shape1 = "灰波";
										}
									} else if(_this.chartId == 11|| (_this.chartId >= 20 && _this.chartId <= 25)) {
										if(nary[x] == nary[x + 1] && nary[x + 1] == nary[x + 2]) {
											_this.datas[i].shape = '三同号';
										} else if(nary[x] == nary[x + 1] || nary[x + 1] == nary[x + 2] || nary[x] == nary[x + 2]) {
											_this.datas[i].shape = '二同号';
										} else if(nary[x] == (nary[x + 1] - 1) && nary[x + 1] == (nary[x + 2] - 1)) {
											_this.datas[i].shape = '三连号';
										} else if(nary[x] != nary[x + 1] && nary[x + 1] != nary[x + 2] && nary[x] != nary[x + 2]) {
											_this.datas[i].shape = '三不同号';
										}
									} else if(_this.chartId == 7||_this.chartId == 16||_this.chartId == 17||_this.chartId == 18) {
										if(_this.datas[i].total == 30) {
											_this.datas[i].shape = "和"
										} else if(_this.datas[i].total < 30) {
											_this.datas[i].shape = "小"
										} else if(_this.datas[i].total > 30) {
											_this.datas[i].shape = "大"
										}
										var b = _this.datas[i].total % 2;
										if(b == 0) {
											_this.datas[i].shape1 = "双";
										} else if(b == 1) {
											_this.datas[i].shape1 = "单";
										}
										var left;
										left = [parseInt(nary[x]), parseInt(nary[x + 1]), parseInt(nary[x + 2])]
										left = left.sort();
										if(left[x] + 1 == left[x + 1] && left[x + 1] + 1 == left[x + 2]) {
											_this.datas[i].thr_left = "顺子";
										} else if(left[x] + 1 == left[x + 1] || left[x + 1] + 1 == left[x + 2]) {
											_this.datas[i].thr_left = "半顺";
										} else if(left[x] + 1 != left[x + 1] && left[x + 1] + 1 != left[x + 2]) {
											_this.datas[i].thr_left = "杂六";
										}
										left = [parseInt(nary[x + 1]), parseInt(nary[x + 2]), parseInt(nary[x + 3])]
										left = left.sort();
										if(left[x] + 1 == left[x + 1] && left[x + 1] + 1 == left[x + 2]) {
											_this.datas[i].thr_center = "顺子";
										} else if(left[x] + 1 == left[x + 1] || left[x + 1] + 1 == left[x + 2]) {
											_this.datas[i].thr_center = "半顺";
										} else if(left[x] + 1 != left[x + 1] && left[x + 1] + 1 != left[x + 2]) {
											_this.datas[i].thr_center = "杂六";
										}
										left = [parseInt(nary[x + 2]), parseInt(nary[x + 3]), parseInt(nary[x + 4])]
										left = left.sort();
										if(left[x] + 1 == left[x + 1] && left[x + 1] + 1 == left[x + 2]) {
											_this.datas[i].thr_right = "顺子";
										} else if(left[x] + 1 == left[x + 1] || left[x + 1] + 1 == left[x + 2]) {
											_this.datas[i].thr_right = "半顺";
										} else if(left[x] + 1 != left[x + 1] && left[x + 1] + 1 != left[x + 2]) {
											_this.datas[i].thr_right = "杂六";
										}
									}else if(_this.chartId==31||_this.chartId==37){

											//判断单双
											var b = _this.datas[i].total % 2;
											if(b == 0) {
												_this.datas[i].ds = "总和双";
											} else if(b == 1) {
												_this.datas[i].ds = "总和单";
											}

											//判断大小
										if(_this.datas[i].total <= 174) {
											_this.datas[i].dx = '总和小'
										} else if(_this.datas[i].total >= 175) {
											_this.datas[i].dx = '总和大'
										} 

										//特码单双

										var len = nary.length;

										if(nary[len-1]%2==0){
											_this.datas[i].tmds = '双'

										}else if(nary[len-1]%2==1){
											_this.datas[i].tmds = '单'

										}

										// console.log(nary);

										//  七色波
										var greenNumLen = 0,redNumLen=0,blueNumLen=0;

										for(var nl=0;nl<nary.length;nl++){
												for(var lh in _this.lhcolor){
												if(_this.lhcolor[lh].indexOf(nary[nl])!=-1){
													if(lh=='greenNum'){
														greenNumLen = parseInt(greenNumLen)+1;
													}else if(lh=='blueNum'){
														blueNumLen = parseInt(blueNumLen)+1;
													}else{
														redNumLen = parseInt(redNumLen)+1;
													}
													break;
												}
												
											}
										}


										var colorSort = [greenNumLen,blueNumLen,redNumLen];
										var colorList1 = ["绿波","蓝波","红波"];

										var max = colorSort[0]; //2
										if(colorSort[0]>colorSort[1]){ //2>3
											max = colorSort[0];
											_this.datas[i].colorSort = colorList1[0];
											_this.datas[i].colorSpec = "#38be4f";
										}else if(colorSort[0]==colorSort[1]){
											max = colorSort[1];  //max=3
											var tm = nary[len-1];
										 for(var nz in _this.lhcolor){
											 if(_this.lhcolor[nz].indexOf(tm)!=-1){
												 if(nz=="greenNum"){
													_this.datas[i].colorSort = colorList1[0];
													_this.datas[i].colorSpec = "#38be4f";

												 }else if(nz=="blueNum"){
													_this.datas[i].colorSort = colorList1[1];
													_this.datas[i].colorSpec = "#0e86e3";

												 }else{
													_this.datas[i].colorSort = colorList1[2];
													_this.datas[i].colorSpec = "#e23a3a";

												 }

											 }
										 }
											
											
										}else{
											max = colorSort[1];  //max=3
											_this.datas[i].colorSort = colorList1[1];
											_this.datas[i].colorSpec = "#0e86e3";
										}


										if(max<colorSort[2]){ // 3<2
											_this.datas[i].colorSort = colorList1[2];
											_this.datas[i].colorSpec = "#e23a3a";
										}else if(max==colorSort[2]){
										 var tm = nary[len-1];
										 for(var nz in _this.lhcolor){
											 if(_this.lhcolor[nz].indexOf(tm)!=-1){
												 if(nz=="greenNum"){
													_this.datas[i].colorSort = colorList1[0];
													_this.datas[i].colorSpec = "#38be4f";

												 }else if(nz=="blueNum"){
													_this.datas[i].colorSort = colorList1[1];
													_this.datas[i].colorSpec = "#0e86e3";

												 }else{
													_this.datas[i].colorSort = colorList1[2];
													_this.datas[i].colorSpec = "#e23a3a";

												 }

											 }
										 }

										}

										//特码大小

										if(nary[len-1] >= 25){
											_this.datas[i].tmdx = '大'

										}else if(nary[len-1] <= 24){
											_this.datas[i].tmdx = '小'

										}

										var tm1 = parseInt(nary[len-1].substr(0,1));
										var tm2 = parseInt(nary[len-1].substr(1,1));
										var sum = tm1+tm2;

										//特码合单双
										if(sum%2 == 0){
											_this.datas[i].tmhds = '合双'
										}else if(sum%2 == 1){
											_this.datas[i].tmhds = '合单'
										}

										//特码合大小
										if(sum == 49){
											_this.datas[i].tmhdx = '和'
										}else if(sum <= 6){
											_this.datas[i].tmhdx = '合小'
										}else if(sum >=7){
											_this.datas[i].tmhdx = '合大'

										}

										//特码大小尾
										if(sum == 49){
											_this.datas[i].tmdxw = '和'
										}else if(tm2<=4){
											_this.datas[i].tmdxw = '尾小'
										}else if(tm2>=5){
											_this.datas[i].tmdxw = '尾大'

										}

										



									}
									biao = 1;
								}
								//计算跨度
								_this.datas[i].difference = parseInt(Math.max.apply(null, all_luckNum)) - parseInt(Math.min.apply(null, all_luckNum));
								//								_this.datas[i].difference+='';
								//								//(typeof(_this.datas[i].difference))
								for(var j = 0; j < _this.mes.length; j++) {
									_this.datas[i].num = _this.mes[j].split('|');
								}
								if(_this.chartId == 9||_this.chartId == 40||_this.chartId == 41) {
									canvas_num.push(bjluckNum);
								} else if(_this.chartId == 11|| (_this.chartId >= 20 && _this.chartId <= 25)) {
									var totals = _this.datas[i].total;
									canvas_num.push(totals);
								} else{
									canvas_num.push(luck_number[index - 1]); //个、十、百位中奖号码放入一个数组
								}
								issue.push(_this.datas[i].issue);
							}
							//						//(_this.mes);
							//(_this.arr)
						} else {
							return false
						}
					},
					error: function(msg) {
						//(msg);
					}
				}
				base.callCommonApi(obj);
			},
			selectType: function(index, num) {
				var _this = this;
				this.gameCode = index;
				$("#tr_title #li_" + num).addClass('chooseYes').removeClass('chooseNo').siblings('li').addClass('chooseNo').removeClass('chooseYes');
				_this.selectNum(1, num);
			},
			selectNum: function(index, num) {
				var _this = this;
				_this.getdatas(index, num);
				$('.chart_left_' + index).addClass('cho_yes').siblings('span').removeClass('cho_yes');
			}
		},
		watch: {
			datas: function() {
				this.$nextTick(function() {
					// canvas();
				})
			}
		},
	});

function canvas() {
	var h = $('#testtd').height();
	var w = $('#testtd').width();
	var c = document.getElementById("myCanvas");
	c.width = w - 20;
	c.height = h + 30;
	var table1 = document.getElementById("testtd");
	var TRS = table1.getElementsByTagName("tr");
	var cxt2 = c.getContext("2d");
	$('.dingweiDan td').removeClass('guessYes');
	cxt2.strokeStyle = '#d71a20'; //颜色
	var icount = 0; //计数

	var countNum = []; //出现次数
	var missMax = []; //最大遗漏

	var avg = []; //平均遗漏
	var avgMax = []; //平均*最大遗漏
	var TDS = [];

	var lineOut = []; //最大*连出
	var lineOutMax = []; //最大连出
	var cid = 0;
	if(numIndex == 8||numIndex == 15) {
		cid = 4;
	}else if(numIndex == 12){
		cid=3;
	} else {
		cid = 5;
	}
	for(var i = 0; i < TRS.length; i++) {
		TDS = TRS[i].getElementsByTagName("td");
		for(var j = cid; j < TDS.length; j++) {

			//初始化
			if(countNum[j] == undefined) {
				countNum[j] = 0;
			}
			if(missMax[j] == undefined) {
				missMax[j] = 0;
			}
			if(avg[j] == undefined) {
				avg[j] = 0;
			}
			if(avgMax[j] == undefined) {
				avgMax[j] = 0;
			}
			if(lineOut[j] == undefined) {
				lineOut[j] = 0;
			}
			if(lineOutMax[j] == undefined) {
				lineOutMax[j] = 0;
			}
			//平均最大遗漏
			if(parseInt(TDS[j].innerHTML) > parseInt(avgMax[j])) {
				avgMax[j] = TDS[j].innerHTML;
			}

			//计算最大遗漏
			if(parseInt(TDS[j].innerHTML) > parseInt(missMax[j])) {
				missMax[j] = TDS[j].innerHTML;
			}

			//画线
			if(TDS[j].innerHTML == "0") {
				//				//(TDS[j].innerHTML)
				if(chartIdAll == 8 || chartIdAll == 11|| (chartIdAll >= 20 && chartIdAll <= 25) ||chartIdAll==12 ||chartIdAll == 15) {
					$('#testtd tr').eq(i).children('td').eq(canvas_num[i]).next('td').next('td').next('td').addClass('guessYes');
					$('#testtd tr').eq(i).children('td').eq(canvas_num[i]).next('td').next('td').next('td').text(canvas_num[i]);
//					//console.log(canvas_num[i])
				}else if(chartIdAll == 9||chartIdAll == 40||chartIdAll == 41) {
					$('#testtd tr').eq(i).children('td').eq(canvas_num[i]).next('td').next('td').next('td').next('td').next('td').addClass('guessYes');
					$('#testtd tr').eq(i).children('td').eq(canvas_num[i]).next('td').next('td').next('td').next('td').next('td').text(canvas_num[i]);
				} else {
					$('#testtd tr').eq(i).children('td').eq(canvas_num[i]).next('td').next('td').next('td').next('td').next('td').next('td').addClass('guessYes');
					$('#testtd tr').eq(i).children('td').eq(canvas_num[i]).next('td').next('td').next('td').next('td').next('td').next('td').text(canvas_num[i]);
				} 

				var He = TDS[j].offsetHeight / 2;
				var We = TDS[j].offsetWidth / 2;
				if(icount == 0) {
					cxt2.moveTo(TDS[j].offsetLeft + We, TDS[j].offsetTop + He);
				} else {
					cxt2.lineTo(TDS[j].offsetLeft + We, TDS[j].offsetTop + He);
				}
				icount = icount + 1;
				countNum[j] = countNum[j] + 1; //计算出现次数

				//计算平均遗漏
				avg[j] = parseInt(avg[j]) + parseInt(avgMax[j]);
				avgMax[j] = 0;

				//计算连出
				lineOut[j] = lineOutMax[j] + 1;
			} else {
				lineOutMax[j] = 0;
			}
			if(i == TRS.length - 1) {
				avg[j] = parseInt(avg[j]) + parseInt(avgMax[j]);
			}

		}
		cxt2.stroke();
	}
	//	//console.log(lineOut);
	var j;
	if(numIndex == 8||numIndex == 15) {
		j = 3;
	}else if(numIndex == 9) {
		j = 4;
	}else if(numIndex == 7||numIndex==16||numIndex==17||numIndex==18){
		j = 6;
	}else if(numIndex == 12){
		j = 2;
	}else {
		j = 5;
	} 
	//统计
	for(var i = 1; i < TDS.length; i++) {
		$('#count').children('td').eq(i).html(countNum[i+j]);
		$('#missMax').children('td').eq(i).html(missMax[i+j]);
		$('#avg').children('td').eq(i).html(parseInt(avg[i+j] / (countNum[i+j] + 1)));
		$('#lineOut').children('td').eq(i).html(lineOut[i+j]);
		//console.log(countNum[i+j], lineOut[i+j]);
	}
//	if($("#total").hasClass("haveS")) {
//		$(this).html('-');
//	}
};