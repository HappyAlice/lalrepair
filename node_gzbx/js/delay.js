$(function(){
	
	/**
	 * 取地址栏参数
	 */
	(function($) {
		$.getUrlParam = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		}
	})(jQuery);
	
	/**
	 * 显示延期历史
	 */
	$.ajax({
		type:'post',
	    dataType:"json",
		url : '../../DelayController/findDelay',
		data : {problemId: $.getUrlParam('problemId')},
		success : function(data){

			$('#delayTime').val(data[0].delayTime);
			$('#introduce').val(data[0].delayRemark);
			$('#delayId').val(data[0].delayId);
			
			createDelayHistory(data);
		},
	});
	
	// 创建一个div用来包裹每个延期历史
	function createDelayHistory(data){

		for ( var i = 0; i < data.length; i++) {
		
			var $delayHistory = $("#delayHistory");
			var $ul_1 = $('<ul></ul>').appendTo($delayHistory);	//延期时间和审批结果
			var $ul_2 = $('<ul class="borderBottom" style="margin-top:0"></ul>').appendTo($delayHistory);	
			
			var $li_11 = $('<li class="reportForm"></li>').appendTo($ul_1);	//延期时间 li
			var $label_11 = $('<label class="labelStyle">延期时间:</label><input type="text" value="'+data[i].delayTime+'" style="width:50px"><span>小时</span>').appendTo($li_11);	//延期时间 label
	
			var $li_12 = $('<li class="reportForm"></li>').appendTo($ul_1);	//审批结果
			var $label_12 = $('<label class="labelStyle">审批结果:</label><input value="" type="text" style="width:100px">').appendTo($li_12);	//审批结果 label
	
	
			var $li_21 = $('<li class="reportForm"></li>').appendTo($ul_2);	//申请时间
			var $label_21 = $('<label class="labelStyle">申请时间:</label><input value="'+data[i].applyTime+'" type="text"/>').appendTo($li_21);	//申请时间 label
	
			var $li_22 = $('<li class="reportForm"></li>').appendTo($ul_2);	//申请完成时间
			var $label_22 = $('<label class="delayHistoryLabel">申请完成时间:</label><input type="text" value="'+data[i].applyFinishtime+'" style="width:130px"/>').appendTo($li_22);	//申请完成时间 label
	
			var $li_23 = $('<li class="reportForm"></li>').appendTo($ul_2);	//计划完成时间
			var $label_23 = $('<label class="delayHistoryLabel">计划完成时间:</label><input type="text" value="'+data[i].applyFinishtime+'" style="width:130px"/>').appendTo($li_23);	//计划完成时间 label
	
			var $li_24 = $('<li class="reportForm"></li>').appendTo($ul_2);	//延期说明
			var $label_24 = $('<label class="labelStyle">延期说明:</label><textarea class="reasonTextarea" name="description" readonly="readonly">'+data[i].delayRemark+'</textarea>').appendTo($li_24);	//延期说明 label
			
			if(data[i].applyResult == '0'){
				$label_12.val('待审批');
			}else if(data[i].applyResult == '1'){
				$label_12.val('同意');
			}else{
				$label_12.val('不同意');
			}
			
			if(data[i].refuseReason){
				var $li_25 = $('<li class="reportForm"></li>').appendTo($ul_2);	//拒绝原因
				var $label_25 = $('<label class="labelStyle">拒绝原因:</label><textarea class="reasonTextarea" name="description" readonly="readonly">'+data[i].refuseReason+'</textarea>').appendTo($li_25);	//拒绝原因 label
			}
			
			
		}
		

	}
	
// -----------------------------S---------申请延期页面----------------------------------
	// 申请延期页面  创建面板
	creatPanel("#applyDelay","申请延期", true, "changeColor");

	// 点击关闭时关闭申请延期页面
	$("#delayBtnClose").on("click", function(){
		console.info($("#btnClose"));
		window.opener = null;
		window.open('','_self');
		window.close();
	});

	/**
	 * 申请延期
	 */
	$("#delayBtnSubmit").on("click", function(){
		var param = {};
		var delay = {};
		delay['delayTime'] = $('#delayTime').val();
		delay['delayRemark'] = $('#introduce').val();
		
		param.delay = delay;
		param.problemId = $.getUrlParam('problemId');
		
		$.ajax({
			type:			'post',
			contentType :	'application/json;charset=utf-8', //设置请求头信息
			dataType:		"json",
			url : 			'../../DelayController/saveDelay',
			data : JSON.stringify(param),
			success : function(date){
					debugger;
					alert(date.msg);
					window.opener.location.reload();
					window.close();
			}
		});
		
	});

// -----------------------------E---------申请延期页面----------------------------------



// -----------------------------S---------处理延期页面----------------------------------
	// 创建面板
	creatPanel("#dealDelay","延期审批", true, "changeColor");

	// 创建一个拒绝理由的对话框
	createDialog("#refuseDelayDialog", '拒绝原因', true, 650, 250, true, true);


	// 拒绝延期按钮
	$("#refuseDelayBtn").on("click", function(){
		$("#refuseDelayDialog").dialog("open");
	})

	// 点击关闭按钮，关闭拒绝理由的对话框
	$("#refuseDelaybtnClose").on("click", function(){
		$("#refuseDelayDialog").dialog("close");
	});

	// 点击提交按钮，提交拒绝理由
	$("#refuseDelaybtnSubmit").on("click", function(){
		var refuseContent = $("#refuseDelayContent").val();

		$.ajax({
			type:			'post',
			dataType:		"json",
			url : 			'../../DelayController/dealDelay',
			data : 			{problemId : $.getUrlParam('problemId'),
							refuseReason : refuseContent,
							delayId : $('#delayId').val()},
			success : function(date){
					alert(date.msg);
					window.opener.location.reload();
					window.close();
			}
		});
		
		$("#refuseDelayDialog").dialog({
			queryParams: refuseContent,
			closed : true
		});
		
	});
	
	// 同意延期
	$("#acceptDelayBtn").on("click", function(){
		
		$.ajax({
			type:			'post',
			dataType:		"json",
			url : 			'../../DelayController/dealDelay',
			data : 			{problemId : $.getUrlParam('problemId'),
							delayId : $('#delayId').val()},
			success : function(date){
				if(date.result == 'success'){
					alert(date.msg);
					window.opener.location.reload();
					window.close();
				}else{
					
				}
			}
		});
		
	});


// -----------------------------E---------处理延期页面----------------------------------


// -----------------------------S---------延期历史页面----------------------------------
	// 创建面板
	creatPanel("#delayHistory","延期历史", true, "changeColor");

	// 根据“审批结果”决定“拒绝原因”框是否要显示


// -----------------------------S---------延期历史页面----------------------------------




// ----------------------------------------封装好的方法---------------------------
	// 创建面板 方法
	function creatPanel(id, mytitle, isborder, changeColor, param){
		$(id).panel({ 
			title : mytitle,      
			border : isborder,
			headerCls: changeColor,
			loader : param
		});
	}

	// 新增记录弹框dialog
	function createDialog(id, title, iscloseable, itswidth, itsheight, ismodal, isclosed){
		$(id).dialog({
			title: title,
			closable: iscloseable,
			width: itswidth,
			height: itsheight,
			modal: ismodal,
			closed: isclosed
		});
	}


})