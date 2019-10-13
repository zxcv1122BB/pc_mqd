//数据交互
var app = new Vue({
    el: '#main',
    data: {
        datas: '',
        pwd: '',   //密码
        newPwd: '', //新密码
        newPwdAgain: '',  //再次新密码
        coinPwd: '',
        newCoinPwd: '',
        newCoinPwdAgain: '',
        flag: false,
        coinFlag: false,
        coinPrivacyStatus: '',    //资金密码状态
        bankPrivacyStatus: '',     //银行卡绑定状态
        firstName: '',    //真实姓名
        bankName: '',    //银行名字
        bankDot: '',  //开卡网点
        bankAccount: '',  //银行账号
        addCoinPwd: '',   //添加资金密码
        addCoinPwdAgain: '',  //添加资金密码再次
        firName: '',  //
        isTrue: '',    //用户信息
        firname:'',   //绑定真实姓名
        userInfoList: [],
        selectuserInfoList: [],
        perfectMarker:0,//个人完善信息标记
        agencyType: localStorage.agencyType ? localStorage.agencyType : 2,//用户类型
        bankList: ['004 臺湾银行', '005 土地银行', '006 合库商银', '007 第一银行', '008 华南银行', '009 彰化银行', '011 上海银行', '012 台北富邦', '013 国泰世华', '016 高雄银行', '017 兆丰商银', '018 农业金库', '021 花旗(台湾)银行', '025 首都银行', '039 澳商澳盛银行(荷兰银行)', '040 中华开发', '050 臺湾企银',' 052 渣打国际商银(新竹银行)', '053 台中商银','054 京城商银', '075 东亚银行','072 德意志银行', '081 永丰银行','101 大台北银行','102 华泰银行','103 臺湾新光商银','108 阳信银行','118 板信银行','147 三信银行','700 中华邮政','803 联邦银行','805 远东银行','806 元大银行','807 永丰银行','808 玉山银行','809 凯基银行(万泰银行)','810 星展银行(宝华商业银行)','812 台新银行','814 大眾银行','815 日盛银行','816 安泰银行','822 中国信託']
    },
    created: function () {
        this.getUserInfo();
    },

    methods: {
        openLayer: function(e) {
            layer.open({
                type: 1,
                area: ['500px', 'auto'],
                content: $(e.target.dataset.id)
            });
            if(e.target.dataset.id == '.bank'){
                var a = this.selectuserInfoList
                if(this.selectuserInfoList){
                    this.firstName = a.NAME || ''
                    this.bankAccount = a.bankAccount || ''
                    this.bankDot = a.bankAddress || ''
                    this.bankName = a.bankName || ''
                    $('#bankName option').each(function() {
                        $("select").find("option").attr("selected",false);
                        if(parseInt($(this).html()) == parseInt(a.bankName)){
                            var _this = this
                            setTimeout(function(){
                                $(_this).attr('selected',true)
                            },100)
                        }
                    });
                }
            }
        },
        getUserInfo: function () {
            let _this = this,that=this;
            let uname = localStorage.getItem("userName");
            let obj = {
                type: 'post',
                async: false,
                data: {
                    "username": uname,
                },
                dataType: 'json',
                url: '/authApi/AutoLoginGetUserinfoByRedis',
                success: function (data) {
                    if (data.code == 200) {
                        _this.datas = data.body;
                        if (localStorage.coinPrivacyStatus == 0) {
                            _this.coinPrivacyStatus = 0;
                        } else {
                            _this.coinPrivacyStatus = 1;
                        }
                        if (localStorage.bankPrivacyStatus == 0) {
                            _this.bankPrivacyStatus = 0;
                        } else {
                            _this.bankPrivacyStatus = 1;
                        }
                        _this.isTrue = JSON.parse(localStorage.getItem('isTrue'));
                        if(_this.isTrue.passwordLevel==3){
                        	$("#pwdLevel").css("background","forestgreen");
                        }else if(_this.isTrue.passwordLevel==2){
                        	$("#pwdLevel").css("background","dodgerblue");
                        }else{
                        	$("#pwdLevel").css("background","red");
                        }
                    }
                },
                error: function (msg) {
                }
            };
            base.callAuthApi(obj);
             var select = {
	            type: "POST",
	            data: {},
	            async: false,
	            dataType: 'json',
	            url: "/authApi/queryUserData",
	            success: function (data) {
	                that.selectuserInfoList = data.body;
	            }
	        };
       		 base.callAuthApi(select);
	         var localInfo = JSON.parse(localStorage.getItem('isTrue'));
	        that.perfectMarker=localInfo.perfectMarker;
            let obj1 = {
	            type: "POST",
	            data: {
	                "register_type": 1
	            },
	            async: false,
	            dataType: 'json',
	            url: "/commonAPI/querySysRegisterOptionByTypeId",
	            success: function (data) {
	                that.userInfoList = data.body;
	            }
	
	        };
	
	        base.callCommonApi(obj1);
	        if (that.userInfoList.length > 0) {
	            for (var i in that.userInfoList) {
	                that.userInfoList[i]['attr_value'] = that.selectuserInfoList[that.userInfoList[i].attr_name_en];
	            }
	        }
	        
        },
        //验证原登陆密码是否正确
        checkOldPwd: function () {
            let _this = this;
            let uname = localStorage.getItem("userName");
            let oldpwd = hex_md5(uname + _this.pwd);
            let obj = {
                type: 'post',
                data: {
                    "userName": uname,
                    "oldPassword": oldpwd,
                },
                dataType: 'json',
                url: '/authApi/isPassword',
                success: function (data) {
                    if (data.code == 200) {
                        $("#oldPwd").css('background-color', '#fff');
                        _this.flag = true;
                    } else if (data.code == 338) {
                    	layer.msg("原登录密码错误");
                        _this.flag = false;
                    }
                },
                error: function (msg) {
                }
            };
            base.callAuthApi(obj);
        },
        //验证原资金密码是否正确
        checkOldCoinPwd: function () {
            let _this = this;
            let uname = localStorage.getItem("userName");
            let coinPwd_md5 = hex_md5(uname + _this.coinPwd);
            let obj = {
                type: 'post',
                data: {
                    "userName": uname,
                    "oldCoinPssword": coinPwd_md5,
                },
                dataType: 'json',
                url: '/authApi/isPassword',
                success: function (data) {
                    if (data.code == 200) {
                        $("#coinPwd").css('background-color', '#fff');
                        _this.coinFlag = true;
                    } else if (data.code == 338) {
                        _this.coinFlag = false;
                    }
                },
                error: function (msg) {
                }
            };
            base.callAuthApi(obj);
        },
        //修改登陆密码
        updatePwd: function () {
            let _this = this;
            let uname = localStorage.getItem("userName");
            let pwd_md5 = hex_md5(uname + _this.pwd);
            let newPwd_md5 = hex_md5(uname + _this.newPwd);
            let reg = /^[0-9a-zA-Z!@#$%^&*,.]{6,16}$/;
			var middle = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
			var top = /^(?!([a-zA-Z\d]*|[\d!@#\$%_\.]*|[a-zA-Z!@#\$%_\.]*)$)[a-zA-Z\d!@#\$%_\.]{6,16}/;
			var passwordLevel;
            if (_this.pwd == '') {
                $("#oldPwd").css('background-color', 'peachpuff');
                layer.msg('原密码不能为空');
                return;
            } else {
                $("#oldPwd").css('background-color', '#fff');
                if (!_this.flag) {
                    $("#oldPwd").css('background-color', 'peachpuff');
                    layer.msg('原密码错误');
                    return;
                } else {
                    $("#oldPwd").css('background-color', '#fff');
                    if (_this.newPwd == '') {
                        $('#newPwd').css('background-color', 'peachpuff');
                        layer.msg('密码不能为空');
                        return;
                    } else if (!reg.test(_this.newPwd)) {
                        $("#newPwd").css('background-color', 'peachpuff');
                        layer.msg('密码格式为6-16个字符');
                        return;
                    } else {
                        $("#newPwd").css('background-color', '#fff');
                        if (_this.newPwdAgain == '') {
                            $('#newPwdAgain').css('background-color', 'peachpuff');
                            layer.msg('请输入确认密码');
                            return;
                        } else {
                            $("#newPwdAgain").css('background-color', '#fff');
                            if (_this.newPwd != _this.newPwdAgain) {
                                $("#newPwdAgain").css('background-color', 'peachpuff');
                                layer.msg('两次密码不同');
                                return;
                            } else {
                                $("#newPwdAgain").css('background-color', '#fff');
                            }
                        }

                    }
                }
            }
            if(top.test(_this.newPwd)) {
				passwordLevel = 3;
			} else if(middle.test(_this.newPwd)) {
				passwordLevel = 2;
			} else {
				passwordLevel = 1;
			}
            let obj = {
                type: 'post',
                data: {
                    "userName": uname,
                    "oldPassword": pwd_md5,
                    "password": newPwd_md5,
                    'passwordLevel':passwordLevel,
                },
                dataType: 'json',
                url: '/authApi/updatePassword',
                success: function (data) {
                    if (data.code == 200) {
                        layer.msg(data.msg);
                        localStorage.clear();
                        setTimeout(function () {
                            window.location.href = "../login/login.html";
                        },500)
                    } else if (data.code == 339) {
                        layer.msg(data.msg);
                    }
                },
                error: function (msg) {
                }
            };
            base.callAuthApi(obj);
        },

        //修改资金密码
        updateCoinPwd: function () {
            let _this = this;
            let uname = localStorage.getItem("userName");
            let coinPwd_md5 = hex_md5(uname + _this.coinPwd);
            let newCoinPwd_md5 = hex_md5(uname + _this.newCoinPwd);
            let reg = /^\d{6}$/;
            if (_this.coinPwd == '') {
                $("#oldPwd").css('background-color', 'peachpuff');
                layer.msg('原取款密码不能为空');
                return;
            } else {
                $("#coinPwd").css('background-color', '#fff');
                if (!_this.coinFlag) {
                    $("#coinPwd").css('background-color', 'peachpuff');
                    layer.msg('原取款密码错误');
                    return;
                } else {
                    $("#coinPwd").css('background-color', '#fff');
                    if (_this.newCoinPwd == '') {
                        $('#newCoinPwd').css('background-color', 'peachpuff');
                        layer.msg('取款密码不能为空');
                        return;
                    } else if (!reg.test(_this.newCoinPwd)) {
                        $("#newCoinPwd").css('background-color', 'peachpuff');
                        layer.msg('取款密码格式为6个数字');
                        return;
                    } else {
                        $("#newCoinPwd").css('background-color', '#fff');
                        if (_this.newCoinPwdAgain == '') {
                            $('#newCoinPwdAgain').css('background-color', 'peachpuff');
                            layer.msg('请确认取款密码');
                            return;
                        } else {
                            $("#newCoinPwdAgain").css('background-color', '#fff');
                            if (_this.newCoinPwd != _this.newCoinPwdAgain) {
                                $("#newCoinPwdAgain").css('background-color', 'peachpuff');
                                layer.msg('两次取款密码不同');
                                return;
                            } else {
                                $("#newCoinPwdAgain").css('background-color', '#fff');
                            }
                        }
                    }
                }
            }

            let obj = {
                type: 'post',
                data: {
                    "userName": uname,
                    "oldCoinPssword": coinPwd_md5,
                    "coinPssword": newCoinPwd_md5,
                },
                dataType: 'json',
                url: '/authApi/updatePassword',
                success: function (data) {
                    if (data.code == 200) {
                        layer.msg(data.msg);
                        setTimeout(function () {
                            window.location.href = "userInfo.html";
                        },500);
                    } else if (data.code == 339) {
                        layer.msg(data.msg);
                    }
                },
                error: function (msg) {
                }
            };
            base.callAuthApi(obj);
        },
        //设置资金密码
        addCoinPword: function () {
            let _this = this;
            let username = localStorage.getItem("userName");
            let reg = /^\d{6}$/; //资金密码
            if (_this.addCoinPwd == "") {
                layer.msg("取款密码不能为空！");
                $("#addCoinPwd").css('background-color', 'peachpuff');
                return;
            } else if (!reg.test(_this.addCoinPwd)) {
                layer.msg("取款密码为6位数字！");
                $("#addCoinPwd").css('background-color', 'peachpuff');
                return;
            } else {
                $("#addCoinPwdAgain").css('background-color', 'white');
                if (_this.addCoinPwdAgain == "") {
                    layer.msg("请确认取款密码！");
                    $("#addCoinPwdAgain").css('background-color', 'peachpuff');
                    return;
                } else {
                    $("#addCoinPwdAgain").css('background-color', 'white');
                    if (_this.addCoinPwd != _this.addCoinPwdAgain) {
                        layer.msg("两次输入密码不一致！");
                        $("#addCoinPwdAgain").css('background-color', 'peachpuff');
                        return;
                    } else {
                        $("#addCoinPwdAgain").css('background-color', 'white');
                    }
                }
            }
            let passWord = hex_md5(username + _this.addCoinPwd);
            let passWordAgain = hex_md5(username + _this.addCoinPwdAgain);
            let obj = {
                type: 'post',
                data: {
                    "username": username,
                    "privacyStatus": 2,
                    "password1": passWord,
                    "password2": passWordAgain,
                },
                dataType: 'json',
                url: '/authApi/privacy/bindPrivacy',
                success: function (data) {
                    if (data.code == 200) {
                        layer.msg(data.msg);
                        localStorage.coinPrivacyStatus = 0;
                        setTimeout(function () {
                            window.location.href = "userInfo.html";
                        },500)
                    } else {
                        layer.msg(data.msg);
                    }
                },
                error: function (msg) {
                }
            };
            base.callAuthApi(obj);
        },
        //绑定银行卡
        addBank: function () {
            let uname = localStorage.getItem("userName");
            let fullNamePattern = /^[\u4e00-\u9fa5]*$/; //只能输入中文
            let bankAccountPattern = /\d{10}|\d{16}/; //银行卡号
            if (this.bankAccount == "") {
                layer.msg("银行卡号不能为空！");
                $("#bankAccount").css('background-color', 'peachpuff');
                return;
            } else if (!bankAccountPattern.test(this.bankAccount)) {
                layer.msg("请输入正确的银行卡号！");
                $("#bankAccount").css('background-color', 'peachpuff');
                return;
            } else {
                $("#bankDot").css('background-color', 'white');
                if (this.bankDot == "") {
                    layer.msg("开户网点不能为空！");
                    $("#bankDot").css('background-color', 'peachpuff');
                    return;
                } else {
                    $("#bankDot").css('background-color', 'white');
                }
            }
            let _this = this;
            let obj = {
                type: 'post',
                data: {
                    "username": uname,
                    "privacyStatus": 1,
                    "fullName": _this.firstName,
                    "bankAccount": _this.bankAccount,
                    "bankName": _this.bankName,
                    "bankAddress": _this.bankDot
                },
                dataType: 'json',
                url: '/authApi/privacy/bindPrivacy',
                success: function (data) {
                    if (data.code == 200) {
                        layer.msg(data.msg);
                        localStorage.bankPrivacyStatus = 0;
                        setTimeout(function () {
                            window.location.href = "userInfo.html";
                        },500)
                    }else{
                        layer.msg(data.msg);
                    }
                },
                error: function (msg) {
                }
            };
            base.callAuthApi(obj);
        },
        layerCancel: function() {
            layer.closeAll();
        },
        NickNameLength_validate: function (item, index) {
            var that = this;
            var indexValue = $("#" + item.attr_name_en).val();
            if (item.is_check == 1) {
                if (indexValue.trim().length > 0 && indexValue.trim().length <= 30) {
                    that.isCheckFlag = true;
                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                    Vue.set(that.userInfoList[index], "isCheckFlag", true);
                } else {
                	if(item.is_input==0&&indexValue==''){
                		that.isCheckFlag = true;
	                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
	                    Vue.set(that.userInfoList[index], "isCheckFlag", true);
                	}else{
                		Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入1-30位昵称");
	                    Vue.set(that.userInfoList[index], "isCheckFlag", false);
	                    Vue.set(that.userInfoList[index], "msgTipsFlag", true);
	                    that.isCheckFlag = false;
                	}
                }
            } else {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
            }
            return that.isCheckFlag;
        },
        RealName_validate: function (item, index) {
            var that = this;
            var reg = /^[\u4e00-\u9fa5]+$/;//中文校验
            var indexValue = $("#" + item.attr_name_en).val();
            if (item.is_check == 1) {
                if (indexValue.length > 0 && indexValue.length <= 30 && reg.test(indexValue)) {
                    that.isCheckFlag = true;
                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                    Vue.set(that.userInfoList[index], "isCheckFlag", true);
                } else {
                	if(item.is_input==0&&indexValue==''){
                		that.isCheckFlag = true;
	                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
	                    Vue.set(that.userInfoList[index], "isCheckFlag", true);
                	}else{
                		Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入中文");
	                    Vue.set(that.userInfoList[index], "isCheckFlag", false);
	                    Vue.set(that.userInfoList[index], "msgTipsFlag", true);
	                    that.isCheckFlag = false;
                	}
                }
            } else {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
            }
            return that.isCheckFlag;
        },
        email_validate: function (item, index) {
            var that = this;
            var reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/ ; //邮箱校验
            var indexValue = $("#" + item.attr_name_en).val();
            if (item.is_check == 1) {
                if (reg.test(indexValue)) {
                    that.isCheckFlag = true;
                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                    Vue.set(that.userInfoList[index], "isCheckFlag", true);
                } else {
                	if(item.is_input==0&&indexValue==''){
                		that.isCheckFlag = true;
	                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
	                    Vue.set(that.userInfoList[index], "isCheckFlag", true);
                	}else{
                		Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入正确格式的邮箱");
	                    Vue.set(that.userInfoList[index], "isCheckFlag", false);
	                    Vue.set(that.userInfoList[index], "msgTipsFlag", true);
	                    that.isCheckFlag = false;
                	}
                }
            } else {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
            }
            return that.isCheckFlag;
        },
        PhoneNumber_validate: function (item, index) {
            console.log(item)
            var that = this;
            var reg = /^[0|1][3456789]\d{8}$/;
            var indexValue = $("#" + item.attr_name_en).val();
            if (item.is_check == 1) {
                if (reg.test(indexValue)) {
                    that.isCheckFlag = true;
                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                    Vue.set(that.userInfoList[index], "isCheckFlag", true);
                } else {
                	if(item.is_input==0&&indexValue==''){
                		that.isCheckFlag = true;
	                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
	                    Vue.set(that.userInfoList[index], "isCheckFlag", true);
                	}else{
                		Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入10位正确的手机号");
	                    Vue.set(that.userInfoList[index], "isCheckFlag", false);
	                    Vue.set(that.userInfoList[index], "msgTipsFlag", true);
	                    that.isCheckFlag = false;
                	}
                }
            } else {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
            }
            return that.isCheckFlag;
        },
        WeChat_validate: function (item, index) {
            var that = this;
            var reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/ ;
            var indexValue = $("#" + item.attr_name_en).val();
            if (item.is_check == 1) {
                if (reg.test(indexValue)) {
                    that.isCheckFlag = true;
                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                    Vue.set(that.userInfoList[index], "isCheckFlag", true);
                } else {
                	if(item.is_input==0&&indexValue==''){
                		that.isCheckFlag = true;
	                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
	                    Vue.set(that.userInfoList[index], "isCheckFlag", true);
                	}else{
                		Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入5-20位正确的微信号");
	                    Vue.set(that.userInfoList[index], "isCheckFlag", false);
	                    Vue.set(that.userInfoList[index], "msgTipsFlag", true);
	                    that.isCheckFlag = false;
                	}
                }
            } else {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
            }
            return that.isCheckFlag;
        },
        QQ_validate: function (item, index) {
            var that = this;
            var reg = /[1-9]([0-9]{5,16})/ ;
            var indexValue = $("#" + item.attr_name_en).val();
            if (item.is_check == 1) {
                if (reg.test(indexValue)) {
                    that.isCheckFlag = true;
                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                    Vue.set(that.userInfoList[index], "isCheckFlag", true);
                } else {
                	if(item.is_input==0&&indexValue==''){
                		that.isCheckFlag = true;
	                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
	                    Vue.set(that.userInfoList[index], "isCheckFlag", true);
                	}else{
                		Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入5-11位数字正确的QQ号");
	                    Vue.set(that.userInfoList[index], "isCheckFlag", false);
	                    Vue.set(that.userInfoList[index], "msgTipsFlag", true);
	                    that.isCheckFlag = false;
                	}
                }
            } else {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
            }
            return that.isCheckFlag;
        },

        isInput_validate: function (item, index) {
            var that = this;
            if (item.is_input == 1) {
                if ($("#" + item.attr_name_en).val().trim().length > 0) {
                	console.info($("#" + item.attr_name_en).val())
                    Vue.set(that.userInfoList[index], "isInputFlag", true);
                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                    that.isInputFlag = true;
                } else {
                    Vue.set(that.userInfoList[index], "isInputFlag", false);
                    Vue.set(that.userInfoList[index], "msgTipsMsg", that.userInfoList[index].attr_name + "必须输入。");
                    Vue.set(that.userInfoList[index], "msgTipsFlag", true);
                    that.isInputFlag = false;
                }
            } else {
                Vue.set(that.userInfoList[index], "isInputFlag", true);
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                that.isInputFlag = true;
            }
            return that.isInputFlag;
        },
        isCheck_validate: function (item, index) {
            switch (item.attr_name_en) {
                case "NICK_NAME":
                    return this.NickNameLength_validate(item, index);
                    break;
                case "NAME":
                    return this.RealName_validate(item, index);
                    break;
                case "EMAIL":
                    return this.email_validate(item, index);
                    break;
                case "WEIXIN" :
                    return this.WeChat_validate(item, index);
                    break;
                case "PHONE_NUMBER" :
                    return this.PhoneNumber_validate(item, index);
                    break;
                case "QQ" :
                    return this.QQ_validate(item, index);
                    break;
                default:
                    return true;
                    break;
            }
        },
        isOnly_validate: function (item, index) {
            var that = this;
            var test = $("#" + item.attr_name_en).val();
            var obj = {
                type: "POST",
                async: false,
                data: {
                    "type": item.attr_name_en,
                    "value": $("#" + item.attr_name_en).val()
                },
                url: "/authApi/privacy/isOnlyValidate",
                success: function (response) {
                    that.isOnly_Result = response.body;
                    if(that.perfectMarker==1){
                    	if(item.attr_name_en=="PHONE_NUMBER"&&that.phoneNum == $("#PHONE_NUMBER").val()){
	                    	response.body=0;
	                    }
                    }
                    if (item.is_only == 1) {
                        if (response.body == 0) {
                            Vue.set(that.userInfoList[index], "isOnlyFlag", true);
                            Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                            that.isOnlyFlag = true;
                        } else {
                            Vue.set(that.userInfoList[index], "isOnlyFlag", false);
                            Vue.set(that.userInfoList[index], "msgTipsMsg", that.userInfoList[index].attr_name + "已被绑定");
                            Vue.set(that.userInfoList[index], "msgTipsFlag", true);
                            that.isOnlyFlag = false;
                        }
                    } else {
                        Vue.set(that.userInfoList[index], "isOnlyFlag", true);
                        Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                        that.isOnlyFlag = true;
                    }
                },
                error: function (msg) {
                    Vue.set(that.userInfoList[index], "isOnlyFlag", false);
                    Vue.set(that.userInfoList[index], "msgTipsMsg", that.userInfoList[index].attr_name + "校验失败");
                    Vue.set(that.userInfoList[index], "msgTipsFlag", true);
                    that.isOnlyFlag = false;
                }
            };
            base.callAuthApi(obj);
            return that.isOnlyFlag;
        },


        onChange_validate: function (item, index) {
            var that = this;
            var input = that.isInput_validate(item, index);
            if (!input) {
                return false;
            }
            var check = that.isCheck_validate(item, index);
            if (!check) {
                return false;
            }
           
            if(item.is_only && item.is_only == 1
            	&& item.attr_name_en != 'NICK_NAME' && item.attr_name_en != 'NAME'){
            	 var only = that.isOnly_validate(item, index);
	            if (!that.isOnlyFlag) {
	                return false;
	            }
            }else{
            	Vue.set(that.userInfoList[index], "isOnlyFlag", true);
            }
        },
         //注册提交
        submit_validate: function () {
            var that = this;
            var a = true
            for (var i = 0; i < that.userInfoList.length; i++) {
                var b = that.onChange_validate(that.userInfoList[i], i);
                if(b!=undefined){
                    if(!b) return ;
                }
            }
//          that.checkVerifyCodeInput();
            that.totalIsInputFlag = 0;
            that.totalIsCheckFlag = 0;
            that.totalIsOnlyFlag = 0;
            for (var i = 0; i < that.userInfoList.length; i++) {
                if (that.userInfoList[i].isInputFlag) {
                    that.totalIsInputFlag += 1;
                }
                if (that.userInfoList[i].isCheckFlag) {
                    that.totalIsCheckFlag += 1;
                }
                if (that.userInfoList[i].isOnlyFlag) {
                    that.totalIsOnlyFlag += 1;
                }
            }
            var trueNumber = that.userInfoList.length;
            var passwordLevel;
//          if (that.totalIsInputFlag == trueNumber && that.totalIsCheckFlag == trueNumber && that.totalIsOnlyFlag == trueNumber && that.verifyCode) {
                var _password = hex_md5($("#userName").val() + $("#password").val());
                var _rePassword = hex_md5($("#userName").val() + $("#rePassword").val());
                var middle = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
				var top = /^(?!([a-zA-Z\d]*|[\d!@#\$%_\.]*|[a-zA-Z!@#\$%_\.]*)$)[a-zA-Z\d!@#\$%_\.]{6,16}/;
				if(top.test(_password)) {
					passwordLevel = 3;
				} else if(middle.test(_password)) {
					passwordLevel = 2;
				} else {
					passwordLevel = 1;
				}
				 var obj = {
                    type: "POST",
                    data: {
                        "NICK_NAME": $("#NICK_NAME").val(),
                        "NAME": $("#NAME").val(),
                        "EMAIL": $("#EMAIL").val(),
                        "PHONE_NUMBER": $("#PHONE_NUMBER").val(),
                        "QQ": $("#QQ").val(),
                        "LINE": $("#LINE").val(),
                        "WEIXIN": $("#WEIXIN").val(),
						'perfectMarker':that.perfectMarker
                    },
                    dataType: 'json',
                    url: "/authApi/userPerfectInfo",
                    success: function (response) {
                        localStorage.isUserInfo = 0;
                        localStorage.baseIndex = 3;
                        layer.msg(response.msg);
                        setTimeout(function(){
                        	location.reload();
                        },1000)
                    }
                };
                base.callAuthApi(obj);
        },
        
        
    }
});