var vm = new Vue({
    el: '#mainBody',
    data: {
        checkNameResult: false, //校验名字的结果
        checkPassword: false, //校验密码的结果
        verifyCode: false, //校验验证码的结果
        imgUrl: ''
    },
    created: function() {
        this.getImgcode();
    },
    methods: {
        //获取验证码,点击更换验证码
        getImgcode: function() {
            var _this = this;
            var obj = {
                type: 'get',
                data: {},
                dataType: 'json',
                url: '/commonAPI/imageCode',
                success: function(data) {
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
        //验证码非空校验
        checkCodeInput: function() {
            var _this = this;
            var code = $("input[id=regVerifyCode]").val();
            if (code) {
                var reg = /^[0-9a-zA-Z]{4}$/;
                if (reg.test(code)) {
                    _this.verifyCode = true;
                    $("#_focus").html("");
                } else {
                    _this.verifyCode = false;
                    $("#_focus").html("请输入4位验证码!!!");
                }
            } else {
                _this.verifyCode = false;
                $("#_focus").html("验证码不可为空!!!");
            }
        },
        //校验用户名
        checkUserName: function() {
            var _this = this;
            var userName = $("#username_login").val().trim();
            if (userName) {
                _this.checkNameResult = true;
                $("#checkUserName").html("");
            } else {
                _this.checkNameResult = false;
                $("#checkUserName").html("用户名不可为空!!!");
            }
        },
        //校验密码:
        checkPassword11: function() {
            var _this = this;
            var password = $("#passwd_login").val().trim();
            if (password) {
                var reg = /^[0-9a-zA-Z!@#$%^&*,.]{6,16}$/;
                if (reg.test(password)) {
                    _this.checkPassword = true;
                    $("#checkPassword").html("");
                } else {
                    _this.checkPassword = false;
                    $("#checkPassword").html("请输入6-16个字符");
                }
            } else {
                _this.checkPassword = false;
                $("#checkPassword").html("密码不可为空!!!");
            }
        },
        //提交
        userLogin: function() {
            var _this = this;
            _this.checkCodeInput();
            _this.checkUserName();
            _this.checkPassword11();
            if (!_this.checkNameResult || !_this.checkPassword || !_this.verifyCode) {
                return;
            }

            var userName = $("#username_login").val().trim();
            var loginPassword = hex_md5(userName + $("#passwd_login").val().trim());
            var verifyCode_ = $("input[id=regVerifyCode]").val().trim();
            var cookieUUID = localStorage.getItem("imageCodeKey");
            localStorage.userName = userName;
            //登陆成功后,返回token,refreshToken并存储的参数
            var options_login = {
                type: "post",
                url: "/api/login",
                async: false,
                data: {
                    "username": userName,
                    "password": loginPassword,
                    "imageCode": verifyCode_,
                    "cookieUUID": cookieUUID,
                    "channel": "pc"
                },
                success: function(data) {
                    //存储访问的token
                    var head = "Bearer ";
                    localStorage.access_token = head + data.token;
                    //存储刷新的token
                    localStorage.refreshToken = head + data.refreshToken;
                    //登陆成功后的后续操作
                    if (data.code == 200) {
                        //存储登录成功的用户名
                        localStorage.ifClose = 0;
                        localStorage.userName = userName;
                        localStorage.removeItem("uuid");
                        localStorage.removeItem("imageCodeKey");
                        if (data.chatAdmin == 0) {
                            localStorage.userType = 1;
                        } else {
                            localStorage.userType = 3;
                        }
                        $("#headerWrap").hide();
                        localStorage.agencyType = data.userType;
                        localStorage.gameRebatesList = data.data;
                        //登陆成功后,跳转到个人中心页面
                        window.location.href = '/myCenter/member.html';
                    } else {
                        localStorage.removeItem("userName");
                        $(".prompt").html(data.msg);
                        _this.getImgcode();
                    }
                }
            };
            base.callAuthApi(options_login)
        },
    }
});

//回车登录
$(function() {
    $("body").keydown(function(e) {
        if (e.which == 13) {
            vm.userLogin();
        }
    })
});