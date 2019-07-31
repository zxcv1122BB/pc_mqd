'use strict';

document.writeln("<div class='header'>");
document.writeln("<div class='top-bar'>");
document.writeln("  <div class='wrap'>");
// 未登录时显示
document.writeln("      <div class='bar-l clearfix' id='user_name_0'>");
document.writeln("<span>Hi，歡迎來到 SSG 彩票網!</span>");
document.writeln("      </div>");
// 已登录时显示
document.writeln("      <div class='bar-l clearfix' id='user_name_1' style='display: none;'>");
document.writeln("          <div class='user-name'>Hi，歡迎");
document.writeln("              <a href='/myCenter/member.html'  id='user_name_'></a>");
document.writeln("          </div>");
document.writeln("          <a href='javascript:void(0)' onclick='quitLogin()'>退出</a>");
document.writeln("          <div class='my-count'>");
document.writeln("              <dt>");
document.writeln("                  <a href='javascript:void(0)'>我的賬戶</a><i></i>");
document.writeln("              </dt>");
document.writeln("              <div class='count-infor'>");
document.writeln("                  <div class='count-money'>餘額:");
document.writeln("                      <span id='money' style='color: #e23a3a;'></span>");
document.writeln("                  </div>");
document.writeln("                  <div class='count-btn clearfix'>");
document.writeln("                      <a href='#' onclick='draw()' class='tx-btn'>提現</a>");
document.writeln("                      <a href='#' onclick='recharge()' class='cz-btn'>充值</a>");
document.writeln("                  </div>");
document.writeln("                  <div class='count-link clearfix'>");
document.writeln("                      <a href='/myCenter/betrecord.html'>投注記錄</a>");
document.writeln("                      <a href='javascript:void(0)' onclick='quitLogin()'>退出</a>");
document.writeln("                  </div>");
document.writeln("              </div>");
document.writeln("          </div>");
document.writeln("          <a href='javascript:void(0)' onclick='recharge()'>充值</a>");
document.writeln("          <a href='javascript:void(0)'  onclick='myCollect()'>我的收藏</a>");
// document.writeln("          <a href='javascript:void(0)' onclick='togoChat()' class='c-red'>聊天室</a>");
// document.writeln("          <a href='javascript:void(0)' class='c-red'><i class=\"iconfont\" id='close' onclick='danMu(0)'>&#xe7bf;</i><i class=\"iconfont\" id='open' onclick='danMu(1)'>&#xe607;</i>彈幕</a>");
document.writeln("      </div>");
// 右侧部份
document.writeln("      <div class='bar-r clearfix'>");
document.writeln("          <a id='logBtn' href='/login/login.html'  class='login_btn' \>登錄</a>");
document.writeln("          <a id='regBtn' href='/login/register.html' class='reg_btn'>註冊</a>");
document.writeln("          <a href='/agency/agentIntro.html' class='agent_center'>代理中心</a>");
document.writeln("          <em>|</em>");
document.writeln("          <a href='javascript:;' onclick='showLine()'><img src='/images/IMG_9848.PNG' style='width: 20px;margin-right: 5px;' />客服中心</a>");
document.writeln("          <em>|</em>");
document.writeln("          <a href='/'>首頁</a>");
document.writeln("          <em>|</em>");
document.writeln("          <a href='/help.html'>幫助</a>");
// document.writeln("          <em>|</em>");
// document.writeln("          <div class='language'>");
// document.writeln("              <dt>");
// document.writeln("                  <a href='javascript:void(0)'>語言</a><i></i>");
// document.writeln("              </dt>");
// document.writeln("              <a id='gb2big5'><span>繁</span></a>");
// document.writeln("                      ");
// document.writeln("                      <div class='cz-btn' onclick='Simplized('简')'>簡體</div>");
// document.writeln("              </div>");
// document.writeln("          </div>");
document.writeln("      </div>");
document.writeln("  </div>");
document.writeln("</div>");
document.writeln("<div class='head-nav' id='head-nav'>");
document.writeln("  <div class='wrap'>");
document.writeln("      <div class='nav-link active'>");
document.writeln("   <a href='/' ><img src='/images/xiao/logo.png' class='logo_img' /> </a>");
document.writeln("      </div>");
document.writeln("      <div class='nav'>");
document.writeln("          <ul class='clearfix selecz'>");
document.writeln("              <li>");
document.writeln("                  <a href='javascript:;' >選擇彩種</a>");
document.writeln("          <div class='select-lottery drop_down'>");
document.writeln("              <ul class='cz-list'>");
document.writeln("                  <li v-for='item in fixedDisplay' v-cloak>");
document.writeln("                      <a href='javascript:;' @click='opendpg(item.bet_url)'>");
document.writeln("                          <img :src='item.pic_url' />");
document.writeln("                          <dt>{{item.show_name}}</dt>");
document.writeln("                          <dd :style='item.style'>{{item.sys_config1}}</dd>");
document.writeln("                      </a>");
document.writeln("                  </li>");
document.writeln("                  <a class='more' href='/lothall.html'>查看更多 ></a>");
document.writeln("              </ul>");
// document.writeln("              <ul class='other-lottery' v-cloak>");
// document.writeln("                  <li>");
// document.writeln("                      <h3>");
// document.writeln("                          <span>高頻");
// document.writeln("                              <i></i>");
// document.writeln("                          </span>");
// document.writeln("                      </h3>");
// document.writeln("                      <div class='inner clearfix' v-cloak>");
// document.writeln("                          <a v-for='item in high.slice(0,6)'  href='javascript:;' @click='opendpg(item.bet_url)' class='c-gray' v-cloak >{{item.show_name}}</a>");
// document.writeln("                          <span class='c-gray' >&gt;</span>");
// document.writeln("                          <div class='line-fff' ></div>");
// document.writeln("                          <div class='more moregames_2 clearfix'>");
// document.writeln("                              <h3>高频</h3>");
// document.writeln("                          <ul class=' clearfix'>");
// document.writeln("                             <li v-for='item in high'><a   href='javascript:;' @click='opendpg(item.bet_url)' class='c-gray' :style='{ color:item.atColor}' v-cloak>{{item.show_name}}</a></li> ");
// document.writeln("                           </ul>");
// document.writeln("                      </div>");
// document.writeln("                      </div>");
// document.writeln("                  </li>");
// document.writeln("                  <li>");
// document.writeln("                      <h3>");
// document.writeln("                          <span>低頻");
// document.writeln("                              <i></i>");
// document.writeln("                          </span>");
// document.writeln("                      </h3>");
// document.writeln("                      <div class='inner clearfix' v-cloak>");
// document.writeln("                          <a v-for='item in low.slice(0,5)'  href='javascript:;' @click='opendpg(item.bet_url)'  class='c-gray' v-cloak >{{item.show_name}}</a>");
// document.writeln("                          <span class='c-gray' >&gt;</span>");
// document.writeln("                          <div class='line-fff' ></div>");
// document.writeln("                          <div class='more moregames_3 clearfix'>");
// document.writeln("                              <h3>低频</h3>");
// document.writeln("                               <ul class='clearfix'>");
// document.writeln("                                  <li v-for='item in low'><a  href='javascript:;' @click='opendpg(item.bet_url)' class='c-gray'  :style='{ color:item.atColor}' v-cloak>{{item.show_name}}</a></li> ");
// document.writeln("                                 </ul>");
// document.writeln("                           </div>");
// document.writeln("                      </div>");
// document.writeln("                  </li>");
// document.writeln("              </ul>");
document.writeln("          </div>");
document.writeln("              </li>");
document.writeln("              <li>");
document.writeln("                  <a href='/lothall.html'>購彩大廳</a>");
document.writeln("              </li>");
document.writeln("              <li>");
document.writeln("                  <a href='/kjgg/lottery.html'>開獎公告</a>");
document.writeln("              </li>");
document.writeln("              <li>");
document.writeln("                  <a  href='/favorable.html'>優惠活動</a>");
document.writeln("              </li>");
document.writeln("              <li class='phone-code'>");
document.writeln("                  <a>");
document.writeln("                      <i class='phone-icon'></i>");
document.writeln("                      <span>手機購彩</span>");
document.writeln("                  </a>");
document.writeln("                  <div class='two-code'>");
document.writeln("                      <p id='qrcode'></p>");
document.writeln("                      <h3>掃碼下載手機版</h3>");
document.writeln("                  </div>");
document.writeln("              </li>");
document.writeln("          </ul>");
document.writeln("      </div>");
document.writeln("  </div>");
document.writeln("  </div>");
document.writeln("  </div>");

document.writeln("  <div class='concatUs'>");
// document.writeln("  <div class='cPointer'>");
// document.writeln("      <div class='hoverDiv'><img src='/images/customer.png' alt='' id='concatUs'> <span>000000</span></div></div>");
document.writeln("  <div class='cPointer'>");
document.writeln("      <div class='hoverDiv' onclick='showLine()'><img style='width: 20px;left: 50px;' src='/images/customer.png' alt='' id='concatUs'><img src='/images/IMG_9848.PNG' style='width: 30px;left: 14px;' id='concatUs'> <span style='margin-left: 30px;'>LINE</span></div></div>");
// document.writeln("  <div class='cPointer'>");
// document.writeln("      <div class='hoverDiv'><img src='/images/wx.png' alt=''><span>000000</span></div></div>");
document.writeln("  </div>");

initIsLogin();

$(function(){
	$.getScript("https://unpkg.com/vue-i18n/dist/vue-i18n.js", function() {
		console.log(11111);
		Vue.use(VueI18n) // 通过插件的形式挂载
		const i18n = new VueI18n({
		  locale: 'tr',
		  messages: {
		    'cn': cn,   // 中文简体语言包
		    'tr': tr    // 繁体语言包
		  },
		  silentTranslationWarn: true
		})

		/* eslint-disable no-new */
		new Vue({
			el: "#main",
			i18n,  // 不要忘记
		})
	});
})


layui.use(['layer', 'element', 'form'], function() {
	var layer = layui.layer,
	    element = layui.element,
	    form = layui.form;
});

function videoFn(url) {
    layer.open({
        type: 2,
        title: '视频开奖',
        moveOut: true,
        area: ['800px', '550px'],
        content: url
    });
}

function showLine() {
    layer.open({
        type: 1,
        title: '客服',
        content: "<div class='two-code' style='padding:30px;'><img src='/images/IMG_9849.PNG'></p><h3 style='margin-top: 20px;text-align:center;'>客服二維碼</h3></div>",
        success: function() {
            jQuery('#kfCode').qrcode({
                render: "canvas", // 渲染方式有table方式和canvas方式
                width: 150, //默认宽度
                height: 150, //默认高度
                text: '提供二維碼地址', //二维码内容
                typeNumber: -1, //计算模式一般默认为-1
                correctLevel: 0, //二维码纠错级别
                background: "#ffffff", //背景颜色
                foreground: "#000000" //二维码颜色
            });
        }
    });
}

function showRecord() {
	$('.record-box').toggle();
}

function myCollect() {
	if (localStorage.collectGame) {
		openPage('/myCenter/collect.html');
	} else {
		layui.use('layer', function () {
			var layer = layui.layer;
			layer.msg('暂无收藏!');
		});
	}
}

function collectNum() {
	if (localStorage.collectGame) {
		var obj = JSON.parse(localStorage.collectGame);
		base.collectGame.idList = obj.idList;
		base.collectGame.collectList = obj.collectList;
		var count = 0;
		for (var key in obj.collectList) {
			if (obj.collectList[key]) {
				count++;
			}
		}
		if (parseInt(count) == 0) {
			$('.collect').hide();
			goPage('/');
		} else {
			$('.collect').show();
			$('.collect_count').text(count);
		}
	} else {
		$('.collect').hide();
	}
}

//打开、关闭弹幕
function danMu(id) {
	if (id == 0) {
		$('#open').show();
		$('#close').hide();
		base.danMuOpen == 1;
	} else {
		$('#close').show();
		$('#open').hide();
		base.danMuOpen == 0;
	}
}

function initIsLogin() {
	if (base.danMuOpen == 1) {
		$('#open').show();
		$('#close').hide();
	} else {
		$('#close').show();
		$('#open').hide();
	}
	// 初始化是否登录
	if (localStorage.userName == undefined) {
		document.getElementById('user_name_0').style.display = 'block';
		document.getElementById('user_name_1').style.display = 'none';
		document.getElementById('logBtn').style.display = 'inline-block';
		document.getElementById('regBtn').style.display = 'inline-block';
		$('.agent_center').css('display', 'none');
		// document.getElementById('mask_nologin').style.display = 'block'
		$(function () {
			$('#mask_nologin').show();
		});
	} else {
		document.getElementById('logBtn').style.display = 'none';
		document.getElementById('regBtn').style.display = 'none';
		$('.agent_center').css('display', 'inline-block');
		var ref = {
			type: "post",
			url: "/authApi/AutoLoginGetUserinfoByRedis",
			data: {},
			success: function success(data) {
				if (data.code == 200) {
					var coin = data.body.COIN;
					var fCoin = data.body.FCION;
					var money_ = parseFloat(coin).toFixed(2);
					document.getElementById('money').innerText = money_;

					var obj = {
						type: "post",
						data: {},
						url: "/commonAPI/privacy/getSysConfigureResult",
						success: function success(data) {
							if (data.code == 200) {
								$('head title').html(data.body.webName);
								if (data.body.coinUnit) {
									var _coinUnit = data.body.coinUnit;
								}
								money_ += _coinUnit;
								document.getElementById('money').innerText = money_;
							}
						}
					};
					var config = localStorage.config ? JSON.parse(localStorage.config) : '';
					if (config) {
						if (config.coinUnit) {
							var _coinUnit2 = config.coinUnit;
							money_ += _coinUnit2;
							document.getElementById('money').innerText = money_;
						}
					} else {
						base.callCommonApi(obj);
					}
				}
			}
		};
		base.callAuthApi(ref);
		document.getElementById('user_name_0').style.display = 'none';
		document.getElementById('user_name_1').style.display = 'block';
		// document.getElementById('mask_nologin').style.display = 'none';
		document.getElementById('user_name_').innerText = localStorage.userName;
		$(function () {
			$('#mask_nologin').hide();
		});
	}
}

function recharge() {
	if (localStorage.userType == 2) {
		alert('試玩賬號不能充值');
	} else {
		openPage('/myCenter/recharge.html');
	}
}

function togoChat() {
	if (localStorage.userType == 2) {
		alert('試玩賬號不能進入聊天室');
	} else {
		openPage('/chat/chat.html');
	}
}

function draw() {
	if (localStorage.userType == 2) {
		alert('試玩賬號不能提款');
	} else {
		openPage('/myCenter/draw.html');
	}
}

// 初始化点击退出
function quitLogin() {
	base.callAuthApi({
		type: "post",
		url: "/authApi/loginout",
		data: {
			"userName": localStorage.getItem("userName")
		},
		success: function success(data) {
			var arr = [];
			arr = JSON.stringify({
				messType: '900',
				userName: localStorage.userName,
				code: '001'
			});
// 			base.websock.send(arr);
// 			base.socketIO_send(arr,2);
			if (data.code == 200) {
				var config_2 = JSON.stringify(localStorage.config);
				localStorage.clear();
				sessionStorage.clear();
				localStorage.config = JSON.parse(config_2);
				setTimeout(function () {
					goPage('/');
					initIsLogin();
				}, 500);
			} else {
				$('.collect_count').text(0);
				localStorage.clear();
				sessionStorage.clear();
			}
		}
	});
}

function openPage(url) {
	if (!localStorage.userName) {
		layer.alert("您还未登录，请先登录", function(index) {
			sessionStorage.loginTo = "/";
			goPage("/login/login.html");
		});
	} else {
		goPage(url);
	}
}

function goPage(url) {
    window.location.href = url;
}

var nav = new Vue({
    el: '.head-nav',
    data: {
        fixedDisplay: [],
        typeList: [],
        comp: [], //竞技彩
        high: [], //高频
        low: [], //低频
        // contrastTimestamp:[]
        localhostPath: '',
        gameIdList: {}

    },
    mounted: function mounted() {
        this.contrastTimestamp();
        var fullPath = window.document.location.href;
        var pathName = window.document.location.pathname;
        var pos = fullPath.indexOf(pathName);
        this.localhostPath = fullPath.substring(0, pos);
        this.get_ConfigureResult();
    },
    methods: {
        //获取系统配置
        get_ConfigureResult: function get_ConfigureResult() {
            var config = localStorage.config ? JSON.parse(localStorage.config) : '',
                that = this;
            if (config) {
                if (config.appDownloadPageUrl) {
                    $(".bar-l .phone").attr("href", config.appDownloadPageUrl);
                }
            }
            var _this = this;
            var obj = {
                type: "post",
                data: {},
                url: "/commonAPI/privacy/getSysConfigureResult",
                success: function success(data) {
                    if (data.code == 200) {
                        if (data.body.appDownloadPageUrl) {
                            $(".bar-l .phone").attr("href", data.body.appDownloadPageUrl);
                        }
                        localStorage.setItem('config', JSON.stringify(data.body));
                    }
                }
            };
            base.callCommonApi(obj);
        },
        
    	opendpg: function openPage(url) {
    	    var _this = this;
    		if (!localStorage.userName) {
    			layer.alert("您还未登录，请先登录", function(index) {
    				sessionStorage.loginTo = "/";
    				_this.goPage("/login/login.html");
    			});
    		} else {
    			_this.goPage(url);
    		}
    	},
    	
    	goPage: function (url) {
    	    window.location.href = url;
    	},

        getheadnav: function getheadnav() {
            if (this.typeList.length != 0) {
                return;
            }
            var _this = this,
                obj = {
                type: "post",
                url: '/commonAPI/qryAllGame1Info',
                data: {
                    source_type: 2
                },
                success: function success(data) {
                    if (data.code == 200 && data.body.length != 0) {
                        data.body = data.body.sort(_this.compareNum('sort'));
                        for (var i = 0; i < data.body.length; i++) {
                            data.body[i].bet_url = _this.localhostPath + "/" + data.body[i].bet_url;
                            data.body[i].pic_url = _this.localhostPath + "/" + data.body[i].pic_url;
                            var sn = data.body[i].show_name;
                            // if (data.body[i].is_hot == 1) {
                                _this.fixedDisplay.push(data.body[i]);
                            // }
                            if (!data.body[i].show_type == 2 || !data.body[i].show_type == 3) {
                                data.body.splice(i, 1);
                                i--;
                            }
                            if (data.body[i].is_hot == 1) {
                                data.body[i].atColor = 'red';
                            }
                        }
                        _this.fixedDisplay = _this.fixedDisplay.slice(0, 20);

                        var gameList = [],
                            codeList = [],
                            isJC = 0;
                        _this.gameIdList = {};
                        data.body.map(function (item) {
                            if (item.code) {
                                if (!_this.gameIdList[item.code]) {
                                    _this.gameIdList[item.code] = item.gameID;
                                    codeList.push(item.code);
                                    gameList.push([item]);
                                } else {
                                    _this.gameIdList[item.code] = _this.gameIdList[item.code] + ',' + item.gameID;
                                    gameList[codeList.indexOf(item.code)].push(item);
                                }
                            } else {
                                if (isJC == 0) {
                                    codeList.unshift("isJC");
                                    gameList.unshift([item]);
                                } else {
                                    gameList[codeList.indexOf('isJC')].push(item);
                                }
                            }
                        });
                        gameList.map(function (item) {
                            item.sort(function (a, b) {
                                return a.gameID - b.gameID;
                            });
                        });
                        //将二维数组转为一维数组
                        gameList = [].concat.apply([], gameList);
                        data.body = gameList;
						if(!localStorage.gameIdList){
							var list=_this.gameIdList;
							localStorage.gameIdList = JSON.stringify(list);
						}
                        localStorage.index_sysLottery = JSON.stringify(data.body);
                        _this.typeList=[];
                        data.body.map(function (item) {
                            _this.typeList.push(item);
                            if (item.game_type == 0) {
                                _this.comp.push(item);
                            } else if (item.game_type == 2) {
                                //高频
                                _this.high.push(item);
                            } else if (item.game_type == 1) {
                                //低频
                                _this.low.push(item);
                            }
                        });
                    }
                },
                error: function error(res) {}
            };
            base.callCommonApi(obj);
        },

        contrastTimestamp: function contrastTimestamp() {
            var _this = this,
                obj = {
                type: "post",
                url: "/commonAPI/privacy/getUpdateStatusSign",
                data: {
                    isWhite: true
                },
                success: function success(data) {
                    var ulist = [],
                        nlist = [],
                        oDataList,
                        cacheNameList = ["index_sysLottery"],
                        nameList = ["sysLotterySign"];
                    if (data.body) {
                        if (localStorage.contrastTimestamp) {
                            oDataList = JSON.parse(localStorage.contrastTimestamp);
                            for (var i = 0; i < 1; i++) {
                                var oData = oDataList[nameList[i]],
                                    nData = data.body[nameList[i]],
                                    dataList = localStorage[cacheNameList[i]];
                                if ((oData == null || !oData) && dataList) {
                                    //(缓存的时间戳为空 或不存在) 且 dataList存在
                                    if (nData == null || !nData) {
                                        //获取的时间戳为空 或 不存在
                                        nlist.push(i); //nlist追加i
                                    } else {
                                        //否则ulist 追加i
                                        ulist.push(i);
                                    }
                                } else {
                                    //如果获取的时间戳为空 或 不存在
                                    if (nData == null || !nData) {
                                        ulist.push(i);
                                    } else {
                                        if (nData == oData && dataList) {
                                            nlist.push(i);
                                        } else {
                                            ulist.push(i);
                                        }
                                    }
                                }
                            }
                            //(ulist+"---"+nlist);
                            localStorage.contrastTimestamp = JSON.stringify(data.body);
                            if (ulist.length > 0) {
                                _this.updateData();
                            }
                            if (nlist.length > 0) {
                                _this.noUpdateData();
                            }
                        } else {
                            _this.updateData();
                            localStorage.contrastTimestamp = JSON.stringify(data.body);
                        }
                    }
                }

            };
            base.callCommonApi(obj);
        },

        //不更新数据
        noUpdateData: function noUpdateData() {
            var _this = this,
                dataList;
            _this.comp = [];
            _this.high = [];
            _this.low = [];
            dataList = JSON.parse(localStorage.index_sysLottery);
            dataList = dataList.sort(_this.compareNum('sort'));
            for (var i = 0; i < dataList.length; i++) {
                var sn = dataList[i].show_name;
                // if (dataList[i].is_hot == 1) {
                    _this.fixedDisplay.push(dataList[i]);
                // }
            }

            _this.fixedDisplay = _this.fixedDisplay.slice(0, 20);
            var gameList = [],
                codeList = [],
                isJC = 0;
            _this.gameIdList = {};
            dataList.map(function (item) {
                if (item.code) {
                    if (!_this.gameIdList[item.code]) {
                        _this.gameIdList[item.code] = item.gameID;
                        codeList.push(item.code);
                        gameList.push([item]);
                    } else {
                        _this.gameIdList[item.code] = _this.gameIdList[item.code] + ',' + item.gameID;
                        gameList[codeList.indexOf(item.code)].push(item);
                    }
                } else {
                    if (isJC == 0) {
                        codeList.unshift("isJC");
                        gameList.unshift([item]);
                    } else {
                        gameList[codeList.indexOf('isJC')].push(item);
                    }
                }
            });
            gameList.map(function (item) {
                item.sort(function (a, b) {
                    return a.gameID - b.gameID;
                });
            });
            //将二维数组转为一维数组
            gameList = [].concat.apply([], gameList);
			if(!localStorage.gameIdList){
				var list=_this.gameIdList;
				localStorage.gameIdList = JSON.stringify(list);
			}
            _this.typeList=[];
            dataList.map(function (item) {
                            _this.typeList.push(item);
                            if (item.game_type == 0) {
                                _this.comp.push(item);
                            } else if (item.game_type == 2) {
                                //高频
                                _this.high.push(item);
                            } else if (item.game_type == 1) {
                                //低频
                                _this.low.push(item);
                            }
                        });
        },

        //更新数据
        updateData: function updateData() {
            this.getheadnav();
            //("更新数据!");
        },

        compareNum: function compareNum(property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            };
        },

        opendlg: function opendlg(title, url, width, height) {
            if (typeof width == 'undefined') width = 1080;
            if (typeof height == 'undefined') height = 700;
            layer.open({
                type: 2, //此处以iframe举例
                title: title,
                area: [width + 'px', height + 'px'],
                shade: 0.5,
                content: url
            });
        }

    }
});

// 拿二维码
if (localStorage.config != undefined) {
    var obj = JSON.parse(localStorage.config);
    jQuery('#qrcode').qrcode({
        render: "canvas", // 渲染方式有table方式和canvas方式
        width: 120, //默认宽度
        height: 120, //默认高度
        text: obj.appDownloadPageUrl, //二维码内容
        typeNumber: -1, //计算模式一般默认为-1
        correctLevel: 0, //二维码纠错级别
        background: "#ffffff", //背景颜色
        foreground: "#000000" //二维码颜色
    });
} else {
    var _obj = {
        type: "post",
        data: {},
        url: "/commonAPI/privacy/getSysConfigureResult",
        success: function success(data) {
            //(data);
            if (data.code == 200) {
                var config2 = data.body;
                localStorage.config = JSON.stringify(data.body);
                jQuery('#qrcode').qrcode({
                    render: "canvas", // 渲染方式有table方式和canvas方式
                    width: 120, //默认宽度
                    height: 120, //默认高度
                    text: config2.appDownloadPageUrl, //二维码内容
                    typeNumber: -1, //计算模式一般默认为-1
                    correctLevel: 0, //二维码纠错级别
                    background: "#ffffff", //背景颜色
                    foreground: "#000000" //二维码颜色
                });
            } else {
                //('获取缓存失败');
            }
        }
    };
    base.callCommonApi(_obj);
}
