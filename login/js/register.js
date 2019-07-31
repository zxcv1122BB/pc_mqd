let vm = new Vue({
    el: '#mainBody',
    data: {
        userInfoList: [
            {"id":19,"register_type":3,"attr_name_en":"userName","attr_name":"账号","is_show":1,"is_input":1,"is_check":1,"is_only":1,"status":1,"intro_info":"登录账号"},
            {"id":20,"register_type":3,"attr_name_en":"password","attr_name":"密码","is_show":1,"is_input":1,"is_check":1,"is_only":0,"status":1,"intro_info":"请输入密码"},
            {"id":21,"register_type":3,"attr_name_en":"rePassword","attr_name":"确认密码","is_show":1,"is_input":1,"is_check":1,"is_only":0,"status":1,"intro_info":"确认密码"}
            ],
        selectuserInfoList: [],
        isOnly_Result: 1,
        isInputFlag: false,
        isOnlyFlag: false,
        isCheckFlag: false, //定义单个校验标志位
        totalIsInputFlag: 0,
        totalIsOnlyFlag: 0,
        totalIsCheckFlag: 0, //定义submit校验总标志位
        verifyCode: false,
        imgUrl: '',
        promotionCode: "",//推广码
    },

    created: function () {
        //初始化必填项
        this.getpromotionCode();
        this.getImgcode();
    },
    methods: {
    	//从localStorage拿推广码和注册类型
		getpromotionCode: function() {
			var _this = this,url = window.location.search;
				if(url != "") {
					var code = url.split("?").join(""); //截取？后的注册码
					localStorage.promotionCode = code.substring(0, code.length); //截取推广码
				}
			if(!localStorage.getItem("promotionCode")) {
				_this.promotionCode = "";
				_this.promotFlag = false;
			} else {
				_this.promotionCode = localStorage.promotionCode;
				_this.promotFlag = true;
			}
		},
        //获取验证码,点击更换验证码
        getImgcode: function () {
            var _this = this;
            var obj = {
                type: 'get',
                data: {},
                dataType: 'json',
                url: '/commonAPI/imageCode',
                success: function (data) {
                    if (data.code == 200) {
                        if (data.body != undefined) {
                            localStorage.imageCodeKey = data.body.imageCodeKey;
                            _this.imgUrl = data.body.imageString;
                        }
                    }
                }
            };
            base.callCommonApi(obj);
        },
        //初始化填选框
        requireFiled: function () {
            var that = this;
            var obj = {
                type: "POST",
                data: {
                    "register_type": 1,
                    "pcregister_type": 3
                },
                dataType: 'json',
                url: "/commonAPI/queryPCSysRegisterOptionByTypeId",
                success: function (data) {
                    if(data.code==200){
                        that.userInfoList = data.body;
                    }
                }
            };
            base.callCommonApi(obj);
        },
        //昵称长度校验
        NickNameLength_validate: function (item, index) {
            var that = this;
            var indexValue = $("#" + item.attr_name_en).val();
            if(item.is_input==1||indexValue.length!=0){
            	 if (indexValue.length > 0 && indexValue.length <= 15) {
	                that.isCheckFlag = true;
	                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
	                Vue.set(that.userInfoList[index], "isCheckFlag", true);
	                $('.reg-int').eq(index).css('border','1px solid #ddd');
	            } else {
	                Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入1-15位昵称");
	                Vue.set(that.userInfoList[index], "isCheckFlag", false);
	                Vue.set(that.userInfoList[index], "msgTipsFlag", true);
	                $('.reg-int').eq(index).css('border','1px solid red');
	                that.isCheckFlag = false;
	            }
            }else{
            	that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
                $('.reg-int').eq(index).css('border','1px solid #ddd');
            }
            return that.isCheckFlag;
        },
        //真实用户名校验
        RealName_validate: function (item, index) {
            var that = this;
            var reg = /^[\u4e00-\u9fa5]+$/;//中文校验
            var indexValue = $("#" + item.attr_name_en).val();
            if ( reg.test(indexValue)) {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
                $('.reg-int').eq(index).css('border','1px solid #ddd');
            } else {
                Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入中文");
                Vue.set(that.userInfoList[index], "isCheckFlag", false);
                Vue.set(that.userInfoList[index], "msgTipsFlag", true);
                that.isCheckFlag = false;
                $('.reg-int').eq(index).css('border','1px solid red');
            }
            return that.isCheckFlag;
        },
        //email格式校验
        email_validate: function (item, index) {
            var that = this;
            var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //邮箱校验
            var indexValue = $("#" + item.attr_name_en).val();
            if (reg.test(indexValue)) {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
                $('.reg-int').eq(index).css('border','1px solid #ddd');
            } else {
                Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入正确格式的邮箱");
                Vue.set(that.userInfoList[index], "isCheckFlag", false);
                Vue.set(that.userInfoList[index], "msgTipsFlag", true);
                $('.reg-int').eq(index).css('border','1px solid red');
                that.isCheckFlag = false;
            }
            return that.isCheckFlag;
        },
        //手机号格式校验
        PhoneNumber_validate: function (item, index) {
            var that = this;
            /*var a =item.attr_name_en;*/
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            var indexValue = $("#" + item.attr_name_en).val();
            if (reg.test(indexValue)) {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
                $('.reg-int').eq(index).css('border','1px solid #ddd');
            } else {
                Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入11位正确的手机号");
                Vue.set(that.userInfoList[index], "isCheckFlag", false);
                Vue.set(that.userInfoList[index], "msgTipsFlag", true);
                $('.reg-int').eq(index).css('border','1px solid red');
                that.isCheckFlag = false;
            }
            return that.isCheckFlag;
        },
        //微信号格式校验
        WeChat_validate: function (item, index) {
            var that = this;
            /*var a =item.attr_name_en;*/
            var reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{4,19}$/;
            var indexValue = $("#" + item.attr_name_en).val();
            if (reg.test(indexValue)) {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
                $('.reg-int').eq(index).css('border','1px solid #ddd');
            } else {
                Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入5-20位正确的微信号，必须以字母开头");
                Vue.set(that.userInfoList[index], "isCheckFlag", false);
                Vue.set(that.userInfoList[index], "msgTipsFlag", true);
                $('.reg-int').eq(index).css('border','1px solid red');
                that.isCheckFlag = false;
            }
            return that.isCheckFlag;
        },
        //QQ号校验
        QQ_validate: function (item, index) {
            var that = this;
            var reg = /^[1-9][0-9]{4,9}$/;
            var indexValue = $("#" + item.attr_name_en).val();
            if (reg.test(indexValue)) {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
                $('.reg-int').eq(index).css('border','1px solid #ddd');
            } else {
                Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入5-11位数字正确的QQ号");
                Vue.set(that.userInfoList[index], "isCheckFlag", false);
                Vue.set(that.userInfoList[index], "msgTipsFlag", true);
                $('.reg-int').eq(index).css('border','1px solid red');
                that.isCheckFlag = false;
            }
            return that.isCheckFlag;
        },

        //非空校验
        isInput_validate: function (item, index) {
            var that = this;
            $('.reg-int').eq(index).css('border','2px solid #f1c774');
            if (item.is_input == 1) {
                if ($("#" + item.attr_name_en).val().length > 0) {
                    Vue.set(that.userInfoList[index], "isInputFlag", true);
                    Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                    that.isInputFlag = true;
                } else {
                    Vue.set(that.userInfoList[index], "isInputFlag", false);
                    Vue.set(that.userInfoList[index], "msgTipsMsg", that.userInfoList[index].attr_name + "不能为空。");
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

        //各种格式校验
        isCheck_validate: function (item, index) {
 	      	if(!this.isInputFlag){
            	$('.reg-int').eq(index).css('border','1px solid red');
            }else if(this.isCheckFlag){
        		$('.reg-int').eq(index).css('border','1px solid #ddd');
            }
            if(item.is_check == 1){
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
                case "userName" :
                    return this.userName_validate(item, index);
                    break;
                case "password" :
                    return this.password_validate(item, index);
                    break;
                case "rePassword" :
                    return this.rePassword_validate(item, index);
                    break;
                default:
                    return false;
                    break;
            	}
            }else{
            	this.isCheckFlag = true;
                Vue.set(this.userInfoList[index], "msgTipsFlag", false);
                Vue.set(this.userInfoList[index], "isCheckFlag", true);
                $('.reg-int').eq(index).css('border','1px solid #ddd');
                return this.isCheckFlag;
            }
            
        },
        //确认密码和密码的校验
        rePassword_validate: function (item, index) {
            var that = this;
            var passWord = $("#password").val();
            var rePassword = $("#" + item.attr_name_en).val();
            if (passWord == rePassword) {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
                $('.reg-int').eq(index).css('border','1px solid #ddd');
            } else {
                Vue.set(that.userInfoList[index], "msgTipsMsg", "确认密码和密码不一致,请重新输入!!");
                Vue.set(that.userInfoList[index], "isCheckFlag", false);
                Vue.set(that.userInfoList[index], "msgTipsFlag", true);
                $('.reg-int').eq(index).css('border','1px solid red');
                that.isCheckFlag = false;
            }
            return that.isCheckFlag;
        },
        //密码格式和长度校验
        password_validate: function (item, index) {
            var that = this;
            var reg = /^[0-9a-zA-Z!@#$%^&*,.]{6,16}$/;
            var indexValue = $("#" + item.attr_name_en).val();
            if (reg.test(indexValue)) {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
                $('.reg-int').eq(index).css('border','1px solid #ddd');
            } else {
                Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入6-16个字符");
                Vue.set(that.userInfoList[index], "isCheckFlag", false);
                Vue.set(that.userInfoList[index], "msgTipsFlag", true);
                $('.reg-int').eq(index).css('border','1px solid red');
                that.isCheckFlag = false;
            }
            return that.isCheckFlag;
        },
        //账号字母和数字格式校验
        userName_validate: function (item, index) {
            var that = this;
            var reg = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{5,11}$/;
            var indexValue = $("#" + item.attr_name_en).val();
            if (reg.test(indexValue)) {
                that.isCheckFlag = true;
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                Vue.set(that.userInfoList[index], "isCheckFlag", true);
                $('.reg-int').eq(index).css('border','1px solid #ddd');
            } else {
                Vue.set(that.userInfoList[index], "msgTipsMsg", "请输入5-11个字母和数字的组合");
                Vue.set(that.userInfoList[index], "isCheckFlag", false);
                Vue.set(that.userInfoList[index], "msgTipsFlag", true);
                $('.reg-int').eq(index).css('border','1px solid red');
                that.isCheckFlag = false;
            }
            return that.isCheckFlag;
        },
        //唯一性校验
        isOnly_validate: function (item, index) {
            var that = this;
            var type =  item.attr_name_en;
            if(type=='NICK_NAME'||type=='NAME'){//真实姓名和昵称不用校验唯一性
            	Vue.set(that.userInfoList[index], "isOnlyFlag", true);
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                that.isOnlyFlag = true;
            	return;
            }
            if (item.is_only == 1) {
                var obj = {
                    type: "POST",
                    async: false,
                    data: {
                        "type": item.attr_name_en,
                        "value": $("#" + item.attr_name_en).val()
                    },
                    url: "/commonAPI/isOnlyValidate",
                    success: function (response) {
                        that.isOnly_Result = response.body;
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
                    },
                    error: function (msg) {
                        Vue.set(that.userInfoList[index], "isOnlyFlag", false);
                        Vue.set(that.userInfoList[index], "msgTipsMsg", that.userInfoList[index].attr_name + "校验失败");
                        Vue.set(that.userInfoList[index], "msgTipsFlag", true);
                        that.isOnlyFlag = false;
                    }
                };
                base.callCommonApi(obj);
            } else {
                Vue.set(that.userInfoList[index], "isOnlyFlag", true);
                Vue.set(that.userInfoList[index], "msgTipsFlag", false);
                that.isOnlyFlag = true;
            }
            return that.isOnlyFlag;
        },
        //调用校验
        onChange_validate: function (item, index) {
            var that = this;
            //非空校验
            var input = that.isInput_validate(item, index);
            if (!input) {
                return false;
            }
            //格式校验
            var check = that.isCheck_validate(item, index);
            if (!check) {
                return false;
            }
            //唯一性校验
            var only = that.isOnly_validate(item, index);
            if (!that.isOnlyFlag) {
                return false;
            }

        },
        checkBtn:function(){
        	if(!$("input[name='reg_checkbox']").prop("checked")){//是否同意网络协议
            	$("#btn-sub").css('background','gray');
            	$("#btn-sub").attr('disabled','disabled');
            }else{
            	$("#btn-sub").css('background','#d32036');
            	$("#btn-sub").removeAttr('disabled','disabled');
            }
        },
        //注册提交
        submit_validate: function () {
            var that = this;
            for (var i = 0; i < that.userInfoList.length; i++) {
                that.onChange_validate(that.userInfoList[i], i);
            }
            that.checkVerifyCodeInput();
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
            if (that.totalIsInputFlag == trueNumber && that.totalIsCheckFlag == trueNumber && that.totalIsOnlyFlag == trueNumber && that.verifyCode) {
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
                        "userName": $("#userName").val(),
                        "password": _password,
                        "rePassword": _rePassword,
                        "chanel": 1,
                        'uuid': localStorage.getItem("imageCodeKey"),
                        'imageCode': $("input[id=regVerifyCode]").val(),
                        'passwordLevel': passwordLevel,
                        'promotionCode': (that.promotionCode)?(that.promotionCode):"",
                    },
                    dataType: 'json',
                    url: "/commonAPI/register",
                    success: function (response) {
                        if (response.code == 200) {
							localStorage.userName =$("#userName").val();
							if(localStorage.uuid){
								localStorage.removeItem("uuid");
							}
                            localStorage.gameRebatesList = response.body.data;
							//存储访问的token
							var head = "Bearer ";
							localStorage.access_token = head + response.body.token;
							//存储刷新的token
							localStorage.refreshToken = head + response.body.refreshToken;
							localStorage.agencyType = response.body.userType;
							console.log(1111)
							window.location.href = '/myCenter/member.html';
                            initIsLogin();
							$("#verifyCodeInfo").html('');
							base.initWebSocket();
                        } else {
                            if (response.code==401){
                                $("#verifyCodeInfo").html("验证码超时。");
                                that.getImgcode();
                            }
                            if(response.code == 332){
                                $('#_blurCode').html('x'+response.msg);
                            }
                            if(response.code == 336){
                                $('#_blurCode').html('x'+response.msg);
                            }
                        }
                    }
                }
                base.callCommonApi(obj);
            }
        },
        //验证码校验
        checkVerifyCode: function () {
            var _this = this;
            var uuid = localStorage.getItem("imageCodeKey");
            var code = $("input[id=regVerifyCode]").val();
            if (_this.checkVerifyCodeInput()) {
                var options = {
                    type: "post",
                    data: {
                        'uuid': uuid,
                        'imageCode': code
                    },
                    url: '/commonAPI/checkImageCode',
                    success: function (data) {
                        //console.log(data)
                        if (data.code == 200) {
                            _this.verifyCode = true;
                            $("#verifyCodeInfo").html("");
                        } else if (data.code == 203) {
                            _this.verifyCode = false;
                            $("#verifyCodeInfo").html("验证码输入错误。");
                        } else if (data.code == 204) {
                            _this.verifyCode = false;
                            $("#verifyCodeInfo").html("验证码输入超时。");
                        }
                    }
                };
                base.callCommonApi(options);
            }
        },
        //验证码非空校验
        checkVerifyCodeInput: function () {
            var _this = this;
            var code = $("input[id=regVerifyCode]").val();
            if (code) {
                var reg = /^[0-9a-zA-Z]{4}$/;
                if (reg.test(code)) {
                    _this.verifyCode = true;
                    $("#verifyCodeInfo").html("");
                } else {
                    _this.verifyCode = false;
                    $("#verifyCodeInfo").html("请输入4位验证码!!!");
                }
            } else {
                _this.verifyCode = false;
                $("#verifyCodeInfo").html("验证码不可为空。");
            }
            return _this.verifyCode;
        }
    }
});

//回车注册
$(function () {
    $("body").keydown(function (e) {
        if (e.keyCode == 13) {
            vm.submit_validate();
        }
    })
});
