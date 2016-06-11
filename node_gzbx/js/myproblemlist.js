$(function(){
	
	// 一进来就对datagrid进行resize操作，使得一进来分页就在底部
	$("#myproListTable").datagrid("resize");
	// 调用方法searchAdd()实现件点击后显示或者隐藏
	var searchHide = $("#searchHide");
	searchHide.hide();
	searchAdd(searchHide, $("#searchAdd"), $("#myproListTable"));
	
	// 对查询按钮绑定点击事件，向后台传送数据
	$("#myplSearch").on("click", function(){
		var form = $("#myplSearchIndex [name]");
		var table = $("#myproListTable");
		submitData(form, table,'myproblem');
	});

	// 重置
	$("#repReset").on("click", function(){
		 $("#searchIndex").form('reset');
	});
	
	/* 满意度评价*/
	$('#commentBtn').on('click' , function(){
		var selected = $("#myproListTable").datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','未选择问题！','info');
		}else if(selected.problemState != '3'){
				$.messager.alert('提示消息','只能对已处理问题进行评价','info');
		}else if(selected.isEvaluateDelay =='1'){
				$.messager.alert('提示消息','评价已过期','info');
		}else{
				window.open('evaluate.jsp?problemId='+selected.problemId); //跳转到受理报修页面
		}
	});

	
	//对相应的选择框 设置combobox框
	creatCombobox($("#repState"), false, false);
	creatCombobox($("#plDelay"), false, false);
	creatCombobox($("#doDelay"), false, false);
	creatCombobox($("#timeOut"), false, false);
	creatCombobox($("#isComplain"), false, false);
	creatCombobox($("#doComplain"), false, false);
	creatCombobox($("#isComment"), false, false);

	// 新增记录弹框dialog
	$("#complain").dialog({
		title:'投诉:',
		closable:true,
		width:680,
		height:250,
		modal:true,
		closed: true
	});
	/**
	 * 我要投诉
	 */
	$('#tpusuBtn').on('click' , function(){
		var selected = $("#myproListTable").datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','未选择问题','info');
		}else if(selected.problemState == '0'){
				$.messager.alert('提示消息','不能对保存的问题进行投诉!','info');
		}else if(selected.isDealComplaint == '0'){
				$.messager.alert('提示消息','投诉未被处理，不能继续投诉!','info');
		}else{
			$("#complain").dialog("open");
		}
	});
	
	/**
	 * 点击确认投诉按钮 
	 */ 
	$("#btnSubmit").on("click",function(){
		var selected = $("#myproListTable").datagrid('getSelected');
		var text = $("#complainReason").val();
		debugger;
		$.ajax({
			type:'post',
		    dataType:"json",
			url : '../../ComplainController/saveComplain',
			data : {problemId: selected.problemId,
					complainReason : text},
			success : function(data){
				if(data.result == 'success'){
					$("#complain").dialog("close");
					$.messager.alert('提示消息','提交成功','info');
					
					$('#myproListTable').datagrid('reload')
					
				}else{
					$.messager.alert('提示消息','操作失败','info');
				}
				
			},
			error : function(a) {
				$.messager.alert("警告", "操作失败！", "error");
			}
		});
		
	});
	
	
});
	//create a combobox selections
	function creatCombobox(createComboxs, isrequired, ismultiple){
		createComboxs.combobox({   
		    required : isrequired,    
		    multiple : ismultiple,
		    panelHeight:'auto',
		    editable: false
		});  
	}
	//search
	function submitData(forms,table,parent){
		var param = {};               
		forms.each(function(){    
			var $this = $(this);        
			param[$this.attr("name")] = $this.val().trim();   
		});
		if(parent){
			param['from'] = parent;
		}
		table.datagrid('load',param);
		
	}
	
	// add search conditions
	//content（content to show or hidden）, button（the buttons）, table (the table to refresh)
	function searchAdd(content, button, table){ 
		button.on('click', function(){
			if (button.hasClass("rm_add_success")) {
				content.hide();
				button.removeClass("rm_add_success");
				table.datagrid("resize");
			}else{
				content.show();
				button.addClass("rm_add_success");
				table.datagrid("resize");
			};
		});
	}

	//详情
	function detail(value,row,index){
		var rowId = row.problemId;
		return "<a  style='color:#069' href='problemdetail.jsp?problemId="+rowId+"' target='_blank' >详情</a>";
	}
	//状态
	function problemState(value,row,index){
		if(value==="0") {
			return "保存";
		}
		if(value==="1") {
			return "未受理";
		}
		if(value==="2") {
			return "处理中";
		}
		if(value==="3") {
			return "已处理";
		}
		if(value==="4") {
			return "已拒绝";
		}
		if(value==="5") {
			return "已结案";
		}
	}
	//问题级别
	function level(value,row,index){
		if(value==="1") {
			return "低级";
		}
		if(value==="2") {
			return "次中级";
		}
		if(value==="3") {
			return "中级";
		}
		if(value==="4") {
			return "次高";
		}
		if(value==="5") {
			return "高级";
		}
	}
	//评价过期 
	function isEvaluateDelay(value,row,index){
		if(value==="1") {
			return "<span style='color:red'>是</span>";
		}
		else{
			return "否";
		}
	}
	//投诉 
	function isComplaint(value,row,index){
		if(value==="1") {
			return "<span style='color:red'>有</span>";
		}
		else{
			return "无";
		}
	}
	//投诉已处理
	function isDealComplaint(value,row,index){
		if(value==="1") {
			return "已处理";
		}
		else if(value==="0"){
			return "未处理";
		}else{
			return "";
		}
}
//已过期 
function isDelay(value,row,index){
	if(value==="1") {
		return "<span style='color:red'>是</span>";
	}
	else{
		return "否";
	}
}
//已申请延期 
function timeBegin(value,row,index){
	if(value==="1") {
		return "<span style='color:red'>是</span>";
	}
	else{
		return "否";
	}
}
//延期审批
function timeEnd(value,row,index){
	if(value==="1") {
		return "已审批";
	}
	else if(value==="0"){
		return "未审批";
	}else{
		return "";
	}
}