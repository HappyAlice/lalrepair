$(function(){
	// datagrid resize 
	$("#proListTable").datagrid("resize");
	
	// searchAdd
	var searchHide = $("#searchHide");
	searchHide.hide();
	searchAdd(searchHide, $("#searchAdd"), $("#proListTable"));

	// click to search
	$("#addSearch").on("click", function(){
		var form = $("#searchIndex [name]");
		var table = $("#proListTable");
		submitData(form, table,'problem');
	});

	// reset
	$("#repReset").on("click", function(){
		 $("#searchIndex").form('reset');
	});
	
	//set the select box to combobox
	creatCombobox($("#repState"), false, false);
	creatCombobox($("#plDelay"), false, false);
	creatCombobox($("#doDelay"), false, false);
	creatCombobox($("#timeOut"), false, false);
	creatCombobox($("#isComplain"), false, false);
	creatCombobox($("#doComplain"), false, false);
	creatCombobox($("#isComment"), false, false);
	
	//	跟踪记录
	$("#afterRecord").on("click", function(){
		var selected = $("#proListTable").datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','未选择问题！','info');
		}else if(selected.problemState != '2'){
				$.messager.alert('提示消息','只能对处理中的问题填写跟踪记录','info');
		}else{
			window.open('../business/record/record.jsp?problemId='+selected.problemId);
		}
	});

	// 
	$("#dealdelay").on("click", function(){
		var selected = $("#proListTable").datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','未选择问题！','info');
		}else if(selected.timeEnd != '0'){
				$.messager.alert('提示消息','该问题没有需要审批的延期','info');
		}else{
			window.open('dealdelay.jsp?problemId='+selected.problemId);
		}
	});	
	
	/**
	 * 投诉处理
	 */
	$("#reDeparctureBtn").on("click", function(){
		var selected = $("#proListTable").datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','未选择问题！','info');
		}else if(selected.isDealComplaint != '0'){
				$.messager.alert('提示消息','该报修问题没有未处理的投诉记录','info');
		}else{
			window.open('dealcomplain.jsp?problemId='+selected.problemId);
		}
	});	
	
})

	// create a combobox selections
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
		return "<a  style='color:#069' href='../business/problemdetail.jsp?problemId="+rowId+"' target='_blank'>详情</a>";
	}
	//状态
	function problemState(value,row,index){
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
	
