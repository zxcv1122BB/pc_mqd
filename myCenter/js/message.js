var readStatu=0;
    app = new Vue({
		el: '#mainBody',
		data: {
			 pageNum: 5,//默认每页5条数据
			 ContentList:[],
			 changeTitle:'',
			 changeContent:'',
			 changeId:'',
			 readStatus:'',
			agencyType: localStorage.agencyType ? localStorage.agencyType : 2,//用户类型
		},
	
		created: function() {
			//		this.initUserInfo();
			if(localStorage.userType==2){
				$(".registerFree").hide();
			}
		},
		methods: {
			//初始化用户信息
			getUserMessageList: function(num,readStatus) {
				var _this = this;
				userName = localStorage.getItem("userName");
	            var data = {
	                pageIndex: num,
	                pageNum: parseInt(this.pageNum),
	                pageSize: 1,
	                userName:userName,
					readStatus:readStatus,
					unreadMsg:''
	            };
	            var obj = {
	                type: 'post',
	                data: data,
	                dataType: 'json',
	                url: '/authApi/msg/getUserMessagePage',
	                success: function (data) {
	                	if(data.code==200){
							_this.ContentList = data.body.list;
							//总条数
							$("#all_all").html(data.body.rowSize);
							//未读数据
							$("#all_unread").html(data.body.unreadCount);	
							$(".badges").html(data.body.unreadCount);	
							_this.unreadMsg = data.body.unreadCount	
							sessionStorage.setItem("unReadInfo",data.body.unreadCount)
							if(readStatus==0){
								if(data.body.pageSize===0){
									$('#fenye').jqPaginator('option', {
										totalPages: 1,
										currentPage: 1
									});
								}else{
									$('#fenye').jqPaginator('option', {
										totalPages: data.body.pageSize,
										currentPage: num
									});
								}
							}else{
								if(data.body.pageSize===0){
									$('#fenye').jqPaginator('option', {
										totalPages: 1,
										currentPage: 1
									});
								}else{
									$('#fenye').jqPaginator('option', {
										totalPages: data.body.unreadPageSize,
										currentPage: num
									});
								}
							}
							
						}else{
							_this.ContentList = [];
							$('#fenye').jqPaginator('option', {
								totalPages: 1,
								currentPage: 1
							});
						}
	                },
	                error: function (msg) {
	                }
	            };
	           base.callAuthApi(obj);
			},
			 //点击出现详情弹框
	        getMessageInfo: function (id, title, content,readStatus,index) {
				var _this = this;
				if (_this.ContentList[index].readStatus){
					_this.unreadMsg--;
					$("#all_unread").html(_this.unreadMsg);
					$(".badges").html(_this.unreadMsg);
				}
				_this.ContentList[index].readStatus=0;
	            _this.changeTitle = title;
	            _this.changeContent = content;
	            _this.changeId = id;
	            _this.readStatus = readStatus;
	            _this.remarkRead(2);
	            layer.open({
	//              title:'公告信息详情',
	                type:1,
	                content:$('#popEdit'),
	                title:title,
	                area:['550px','260px'],
	                btn:['确定'],
	                yes:function () {
						// location.reload();
						layer.close(layer.index);
	                },
	                btn2:function () {
	                	
	                },
	                end: function () {
		                // location.reload();
		            }

	            })
	            
	            
	        },
	        //点击删除按钮
	         delMsg:function(id,readStatus){
	         	var msg = "确定要删除所选信件吗？"
	         	var delUrl ="";//路径
	         	 var data = {};//参数data
				if(id!=null && readStatus !=null ){//单个删除
					data = {
		                 id:id,//信息id
		                 readStatus:readStatus
		              };
					msg = "确定要删除该信件吗？";
					delUrl = '/authApi/msg/deleteMessageByid';
				}else{//批量删除
					var idArray = [];
					$(".deleteCheckbox:checked").each(function(){
						var value = $(this).val();
						idArray.push(value);
					})
					id = idArray.join(",");
					if(!id){
						layer.msg('请选择消息', {
									icon : 5
								});
								return;
					}
					data = {
		                 id:id	                
		              };
		            delUrl = '/authApi/msg/deleteBatchMessageByid';
				}
				layer.confirm(msg, {
					btn : [ '确定', '取消' ],offset : ['30%' ],icon:3
				}, function() {
		        	  var _this = this;	             
		              var obj = {
		                  type: 'post',
		                  data: data,
		                  dataType: 'json',
		                  url: delUrl,
		                  success: function (data) {
		                      if (data.code == 200) {
		                      		layer.alert("删除成功！", {offset : ['30%' ],
									icon : 1
									}, function(index) {
										$("#allSelectType input[type=checkbox]").prop("checked",false).parent().removeClass("check_span_checked");
										layer.close(index);
										 setTimeout(function () {
				                            window.location.reload();
				                         }, 1000);
									});
		                          
		                      }else if(data.code == 333){
			                      	layer.msg(data.msg, {
										icon : 5
									});
		                      }
		                  },
		                  error: function (msg) {

		                  }
		              };
		              base.callAuthApi(obj);
				})
	         },
	         //更改未读状态
	        remarkRead:function(index){
	        	if(index==1){
	        		var idArray = [];
					$(".deleteCheckbox:checked").each(function(){
						idArray.push($(this).val());
					})
					var id = idArray.join(",");
	        	}else{
	        		var id = this.changeId+"_"+this.readStatus;
	        	}
	        	if(!id){
	        		layer.msg('请选择消息', {
									icon : 5
								});
					return;
	        	}
				var data = {
					id : id
				};
				var _this = this;
				var obj = {
					type: 'post',
					data: data,
					dataType: 'json',
					url: "/authApi/msg/batchUpdateUserMessageStatus",
					success: function(data) {
						if(data.code == 200) {
							if(index==1){
								layer.msg("更改成功！", {offset : ['30%' ],
									icon : 1
									}, function(index) {
										$("#allSelectType input[type=checkbox]").prop("checked",false).parent().removeClass("check_span_checked");
										layer.close(index);
									});
		                    	  setTimeout(function () {
		                              window.location.reload();
		                          }, 1000);
							}
						} else if(data.code == 333) {
							layer.msg(data.msg, {
									icon : 5
								});
						}
					},
					error: function(msg) {
					}
				};
				base.callAuthApi(obj);
	      	},
	        showMessage:function(index){
	        	$("#new_lottery_tab_"+index).show().siblings('table').hide();
	        	$("#on_"+index).addClass('on').siblings('span').removeClass('on');
	        	readStatu = index;
	        	this.getUserMessageList(1,readStatu);
	        },
	        //全选,全不选
	        checkAll: function(){
	        	var checkboxLength=$(".deleteCheckbox").prop("checked",$("#checkAll").prop("checked"));
	        },
	        //其他多选框的点击事件
	        otherDelCheckBox:function(){
	        	if($(".deleteCheckbox:checked").length==$(".deleteCheckbox").length){
	        		$("#checkAll").prop("checked",true);
	        	}else{
	        		$("#checkAll").prop("checked",false);
	        	}
			},
		},
		
		watch: {
	//		page_num: function() {
	//			this.getUserMessageList(num);
	//		}
		}
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
        app.getUserMessageList(num,readStatu);
    }
});