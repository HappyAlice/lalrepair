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
	
	var complain = $("#complain");
	var complainHistory = $("#complainHistory");
	var responMenTable = $("#responMenTable");
	var responMen = $("#responMen");
	var dealComplain = $("#dealComplain");
	// 创建面板
	creatPanel(complain,"投诉处理", true, "changeColor");
	// 创建面板
	creatPanel(complainHistory,"投诉历史", true, "changeColor");

	// 创建人员信息 表格
	responMenTable.datagrid({
		url: '../../UserController/findByCondition',
		height: 415,
		autoRowHeight : false,
		rownumbers : true,
		border: false,
		toolbar : '#responMenTableBar',
		pagination : true,
		pageSize : 10,
		pageList: [10,15,20],
		columns : [[
			{field: 'userName', title : '姓名', width: 80, align: 'center' },
			{field: 'company', title : '公司', width: 80, align: 'center' },
			{field: 'department', title : '部门', width: 160, align: 'center' },
			{field: 'telephone', title : '电话', width: 160, align: 'center' },
			{field: 'mail', title : '邮件', width: 160, align: 'center' }

		]]
	});

	// 创建一个 选择处理人 的对话框
	var responMenSelect = $("#responMenSelect");
	createDialog(responMenSelect, '人员信息', true, 700, 473, true, true);

	//点击加号，添加责任人
	$("#addMen").on('click', function(){		
		responMenSelect.dialog('open');
	});

	//选择一个或者多个处理人，并将他们添加任务分派弹框
	$("#selectResponMen").on("click", function(){
		var getSelections = responMenTable.datagrid('getSelections');
		if (getSelections.length != 0) {
			var dealManId = [];
			var dealMan = [];
			for (var i = 0; i < getSelections.length; i++) {  //如果有选择，对 选择处理人对话框的处理人进行赋值
				dealMan[i] = getSelections[i].userName;
				dealManId[i] = getSelections[i].userId;
			};
			responMen.textbox("setValue", dealMan);
			responMenSelect.dialog("close");   //完成后关闭该对话框
			
		}else{
			$.messager.alert('提示消息','请至少选择一个责任人！','info');
		};
	});

	//无效投诉  TODO
	$("#refuseComplainBtn").on('click', function(){
		
		$.ajax({
			type:'post',
	        dataType:"json",
			url : '../../ComplainController/updateComplain',
			data : {problemId : $.getUrlParam('problemId')},
			success : function(date){
				alert(date.msg);
				window.opener.location.reload();
				window.close();
			}
		});
		
	});

	createDialog(dealComplain, '处理投诉', true, 680, 250, true, true);
	//确认投诉
	$("#acceptComplainBtn").on('click', function(){
		var dutyMan = $('#responMen').textbox('getValue');
		if(dutyMan){
			dealComplain.dialog('open');
		}else{
			$.messager.alert('提示消息','请选择责任人！' ,'info');
			
		}
	});
	
	//点击关闭按钮
	$("#btnClose").on('click', function(){
		dealComplain.dialog('close');
		$("#docomplain").form('reset');
	});

	//点击确认时，判断处理人和领导批示是否都有内容，如果有则发送ajax向后台传送数据
	$("#btnSubmit").on("click", function(){
	 	var complainResult = $('#complainResult').val().trim();
	 	var dutyMan = $('#responMen').textbox('getValue');
		if (complainResult) {
			//将数据传入投诉历史中
			dealComplain.dialog('close');
			$("#docomplainw").form('reset');
			
			$.ajax({
				type:'post',
		        dataType:"json",
				url : '../../ComplainController/updateComplain',
				data : {problemId : $.getUrlParam('problemId'),
						complainResult : complainResult,
						dutyMan : dutyMan},
				success : function(date){
						alert(date.msg);
						window.opener.location.reload();
						window.close();
					
				}
			});
			
		}else{
			$.messager.alert('提示消息','请填写处理结果！' ,'info');	
		}
	});


	//动态创建投诉历史
	$.ajax({
		type:'post',
	    dataType:"json",
		url : '../../ComplainController/findComplainByProId',
		data : {problemId : $.getUrlParam('problemId')},
		success : function(data){
			
			$('#introduce').val(data[0].complainReason);	
			for ( var i = 0; i < data.length; i++) {		
				var $history = $('<div style="border-bottom:1px solid #95b8e7">'+
					'<ul>'+
						'<li>'+
							'<label>投诉时间:</label>'+
							'<input type="text" class="complainInputs" value="'+data[i].complainTime+'" readonly="readonly">'+
						'</li>'+
						'<li>'+
							'<label>投诉结果:</label>'+
							'<input type="text" class="complainInputs" id="complainResult'+i+'" readonly="readonly">'+
						'</li>'+
					'</ul>'+
					'<ul>'+
						'<li>'+
							'<label class="complainReasonLabel">投诉原因:</label>'+
							'<textarea class="complainReason" readonly="readonly">'+data[i].complainReason+'</textarea>'+
						'</li>'+
					'</ul>'+
				'</div>');
				
				$('#complainHistory').append($history);
				
				//（待受理1 已受理2 处理中3 已处理4 已拒绝5）
				 if(data[i].complainResult == '0'){
				 	$("#complainResult"+i).val('待处理');
				 }else{
					 $("#complainResult"+i).val(data[i].complainResult);
				 }
			}
		},
	});



	// ----------------------------------------封装好的方法---------------------------
	// 创建面板 方法
	function creatPanel(panels, mytitle, isborder, changeColor, param){
		panels.panel({ 
			title : mytitle,      
			border : isborder,
			headerCls: changeColor,
			loader : param
		});
	}

	// 新增记录弹框dialog
	function createDialog(dialogs, title, iscloseable, itswidth, itsheight, ismodal, isclosed){
		dialogs.dialog({
			title: title,
			closable: iscloseable,
			width: itswidth,
			height: itsheight,
			modal: ismodal,
			closed: isclosed
		});
	}

})

	











