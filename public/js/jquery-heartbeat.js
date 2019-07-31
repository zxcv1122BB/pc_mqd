/*
 * jHeartbeat 0.3.0
 * (C)Alex Richards - http://www.ajtrichards.co.uk/
 */

$.jheartbeat = {
	options: {
		url: "heartbeat_default.asp",
		delay: 60000,
		div_id: "test_div",
		data: {}
	},

	beatfunction: function() {

	},

	timeoutobj: {
		id: -1
	},

	set: function(options, onbeatfunction) {
		if(this.timeoutobj.id > -1) {
			clearTimeout(this.timeoutobj);
		}
		if(options) {
			$.extend(this.options, options);//将2个json进行合并
		}
		if(onbeatfunction) {
			this.beatfunction = onbeatfunction;
		}

		// Add the HeartBeatDIV to the page
		$("body").append("<div id=\"" + this.options.div_id + "\" style=\"display: none;\"></div>");
		
		var userName = localStorage.getItem("userName");
		
		if(userName == null || userName == undefined) {
			window.clearInterval(this.timeoutobj.id);
			return;
		}
		this.timeoutobj.id = setInterval("$.jheartbeat.beat();", this.options.delay);
	},

	beat: function() {
		localStorage.isOnHeartBeat=1;
		$.ajax({
			url: this.options.url,
			dataType: "json",
			"xhrFields": { //跨域
				withCredentials: true
			},
			type: "POST",
			data: this.options.data,  
			error: function(e) {
				$('#' + $.jheartbeat.options.div_id).append("Error Requesting Data");
			},
			success: function(data) {
				localStorage.isOnHeartBeat=0;
				if(data.code != null && data.code == 291) {
					layer.alert('你已被强制下线;确定,将重新登陆!', function(index){
                      localStorage.clear();
                      layer.close(index);
                      window.location.href = '/login/login.html';
                    });       
				}
			}
		});
	}
};

