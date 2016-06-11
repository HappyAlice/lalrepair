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
	
	
	// 创建面板
	creatPanel("#dealRecord","处理记录", true, "changeColor");


	// 创建面板 方法
	function creatPanel(id, mytitle, isborder, changeColor, param){
		$(id).panel({ 
			title : mytitle,      
			border : isborder,
			headerCls: changeColor,
			loader : param,
		});
	}

	// 表格
	$("#recordTable").datagrid({
		url : '../../../RecordController/findRecordById',
		queryParams : {problemId : $.getUrlParam('problemId')},
		rownumbers : true,
		toolbar : '#recordToolbar',
		border : false,
		columns :[[
			{field:'recordMan',title:'记录人', width:200, align:"center"},
			{field:'recordTime',title:'记录时间', width:200, align:"center"},
			{field:'recordContent',title:'记录内容', width:500, align:"center"}
		]]
	});
	
	// 点击新增按钮弹出对话框
	$("#btn_add").on("click", function(){
		$("#newRecord").dialog("open");
	});

	// 点击关闭按钮关闭对话框
	$("#btnClose").on("click", function(){
		$("#newRecord").dialog("close");
	});
	
	// 点击提交记录按钮 提交记录
	$("#btnSubmit").on("click",function(){
		
		var text = $("textarea.content").val();
		
		$.ajax({
			type:'post',
		    dataType:"json",
			url : '../../../RecordController/saveRecord',
			data : {problemId: $.getUrlParam('problemId'),
					recordContent : text},
			success : function(data){
				if(data.result == 'success'){
					$("#newRecord").dialog("close");
					$.messager.alert('提示消息','提交成功','info');
					
					$('#recordTable').datagrid('reload',{
						problemId : $.getUrlParam('problemId')
					});
					
				}else{
					$.messager.alert('提示消息','操作失败','info');
				}
				
			},
			error : function(a) {
				$.messager.alert("警告", "操作失败！", "error");
			}
		});
		
	});
	
	/**
	 * 删除
	 */
	$('#btn_delet').on('click' , function(){
		var selected = $("#recordTable").datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','请选择一条记录！','info');
		}else{
			$.messager.confirm('确认对话框', '确认删除？', function(b){   //确认框
				if (b){   //确认按钮操作
					deleteRecord(selected.recordId,selected.userId);
				}
			});
		}
	});


	// 新增记录弹框dialog
	$("#newRecord").dialog({
		title:'新增记录',
		closable:true,
		width:680,
		height:250,
		modal:true,
		closed: true
	});

	

});

function deleteRecord(recordId,userId){
	
	/**
	 * 评价时，显示问题详情
	 */
	$.ajax({
		type:'post',
	    dataType:"json",
		url : '../../../RecordController/deleteRecord',
		data : {recordId: recordId,userId : userId},
		success : function(data){
			
			if(data.result == 'success'){
				window.location.reload();
				$.messager.alert('提示消息','评价成功','info');
			}else{
				$.messager.alert('提示消息',data.msg,'info');
			}
		},
	});
	
}


