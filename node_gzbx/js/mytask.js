<!-- 修改日期框的数据格式 -->
$(function(){
	
	// -------------------------------------我的任务页面-----------------------------------------------------------------
	// 一进来就对datagrid进行resize操作，使得一进来分页就在底部
	$("#mydutyTable").datagrid("resize");
	// 调用方法searchAdd()实现件点击后显示或者隐藏
	searchAdd($("#searchHide"), $("#mytaskSearchAdd"), $("#mydutyTable"));
	
	// 创建对话框
	createDialog("#wellDoneDialog", "任务完成", true, 500, 250, true, true);
	
	//search
	$("#search").on('click', function(){
		var form = $("#mytaskSearchIndex [name]");
		var table = $("#mydutyTable");
		submitData(form, table);
	});
	
	//reset
	$("#reset").on('click', function(){
		debugger
		$("#SearchIndex").form('reset');
	});

	// 点击处理完成打开对话框
	$("#finished").on("click", function(){
		var selected = $("#mydutyTable").datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','未选择问题！','info');
		}else if(selected.problemState != '2'){
				$.messager.alert('提示消息','只能对处理中的问题进行完成操作','info');
		}else{
				$("#wellDoneDialog").dialog("open");
		}
	});
	
	// 点击提交记录按钮 提交记录
	$("#finishSubmit").on("click",function(){
		
		var text = $("#wellDoneContent").val();
		var completion = $('#completion').combobox('getValue');//完成方式
		var selected = $("#mydutyTable").datagrid('getSelected');
		$.ajax({
			type:'post',
		    dataType:"json",
			url : '../../RecordController/saveRecord',
			data : {problemId: selected.problemId,
					recordContent : text,
					completion : completion},
			success : function(data){
					$.messager.alert('提示消息',data.msg,'info');
					window.close();
					$("#wellDoneDialog").dialog("close");
					$('#mydutyTable').datagrid('reload');
					
			},
			error : function(a) {
				$.messager.alert("警告", "操作失败！", "error");
			}
		});
		
	});

	// 点击关闭时，关闭对话框
	$("#btnClosebtnClose").on("click", function(){
		$("#wellDoneDialog").dialog("close");
	});

	 createDialog("#problemEditDialog", "问题编辑", true, 400, 240, true, true);
	 

	// 点击问题编辑打开对话框
	$("#problemEdit").on("click", function(){
		var selected = $("#mydutyTable").datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','未选择问题！','info');
				return;
		}else if(selected.problemState != '2'){
				$.messager.alert('提示消息','只能对处理中的问题问题编辑','info');
				return;
		}else if(selected.newCategory){
				$.messager.alert('提示消息','该问题已经编辑过一次','info');
		}else{
			$("#problemEditDialog").dialog("open");
		}
		
		// 设置如果是软件报修就没有资产编号
		var repairType = $("#repairClass").val();
		if (repairType=='软件报修') {
			$("#goodsNum").css('disabled','disabled');
		}else{
			
		};
	});
	
	$('#editSubmit').on("click", function(){
		var selected = $("#mydutyTable").datagrid('getSelected');
		var problem = {};
		problem.problemId = selected.problemId;
		problem.category = $('#repairClass').combobox('getText');
		problem.project = $('#repairProject').combobox('getText');
		problem.detailed = $('#repairDetail').combobox('getText');
		problem.assetNumber = $('#goodsNum').combobox('getText');
		
		
		$.ajax({
			type:'post',
			dataType:"json",
			contentType : 'application/json;charset=utf-8', //设置请求头信息
			url : '../../ProblemController/problemEdit',
			data : JSON.stringify(problem),
			success : function(data){
				if(data.success){
					$.messager.alert('提示消息',data.msg,'info');
					$("#problemEditDialog").dialog("close");
					$('#mydutyTable').datagrid('reload');
				}else{
					$.messager.alert('提示消息',data.msg,'info');
				}
				
			},
			error : function(a) {
				$.messager.alert("警告", "操作失败！", "error");
			}
		});
	});

	
	// 点击关闭时，关闭对话框
	$("#problemEditClose").on("click", function(){
		$("#problemEditDialog").dialog("close");
	});
	
	
	/**
	 * 申请延期
	 */
	$("#applyDelay").on("click", function(){
		var selected = $("#mydutyTable").datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','未选择问题！','info');
		}else if(selected.problemState != '2'){
				$.messager.alert('提示消息','只能对处理中的问题进行申请延期操作','info');
		}else if(selected.timeEnd == '0'){
				$.messager.alert('提示消息','尚存在待审批的申请,不能再申请','info');
		}else{
			window.open('../handler/applydelay.jsp?problemId='+selected.problemId);
		}
	});
	
	/**
	 * 点击跟踪记录按钮显示新页面
	 */
	// 
	
	$("#afterRecord").on("click", function(){
		var selected = $("#mydutyTable").datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','未选择问题！','info');
		}else if(selected.problemState != '2'){
				$.messager.alert('提示消息','只能对处理中的问题填写跟踪记录','info');
		}else{
			window.open('../business/record/record.jsp?problemId='+selected.problemId);
		}
	});

	// 弹框dialog
	function createDialog(id, title, iscloseable, itswidth, itsheight, ismodal, isclosed){
		$(id).dialog({
			title: title,
			closable: iscloseable,
			width: itswidth,
			height: itsheight,
			modal: ismodal,
			closed: isclosed,
			onOpen : function(){
				 Combobox.catagory();
				 var select = $("#mydutyTable").datagrid('getSelected');
				 $('#repairClass').combobox('setValue',select.category);
				 $('#repairProject').combobox('setValue',select.project);
				 $('#repairDetail').combobox('setValue',select.detailed);
				 $("#goodsNum").textbox("setValue", select.assetNumber);
				
			}
		});
	}
	
	var Combobox= {	
			catagory : function(){
				var _self = this;
				$('#repairClass').combobox({
				    url:'../../BarrierController/findBarrier',
				    valueField:'barrierRemark',
				    textField:'barrierRemark',
				    onSelect: function(record){
				    	_self.repairProjectLoad(record.barrierId);
					}
		        });
			},
			repairDetailLoad : function(repairProject){
				$('#repairDetail').combobox({
				    url:'../../BarrierController/findBarrierByParent',
				    queryParams: {barrierId : repairProject},
				    valueField:'barrierRemark',    
				    textField:'barrierRemark'
		        });
			},
			repairProjectLoad : function(categoryType){
				var _self = this;
				$('#repairProject').combobox({
				    url:'../../BarrierController/findBarrierByParent',
				    queryParams: {barrierId : categoryType},
				    valueField:'barrierRemark',    
				    textField:'barrierRemark',
				    onSelect : function(record){
				    	_self.repairDetailLoad(record.barrierId);
				    }
		        });
			}
		}
	

	// 封装方法searchAdd()实现部分条件点击后显示或者隐藏
	function searchAdd($content, $button, $table){     //$content（要隐藏或显示的内容）, $button（增加减少按钮）
		$content.hide();
		$button.on('click', function(){
			if ($button.hasClass("rm_add_success")) {
				$content.hide();
				$button.removeClass("rm_add_success");
				$table.datagrid('resize');
			}else{
				$content.show();
				$button.addClass("rm_add_success");
				$table.datagrid('resize');
			};
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
	

	
});


//详情
function detail(value,row,index){
	var rowId = row.problemId;
	return "<a  style='color:#069' href='../business/problemdetail.jsp?problemId="+rowId+"' target='_blank' >详情</a>";
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
//问题级别
// function level(value,row,index){
// 	if(value==="1") {
// 		return "低级";
// 	}
// 	if(value==="2") {
// 		return "次中级";
// 	}
// 	if(value==="3") {
// 		return "中级";
// 	}
// 	if(value==="4") {
// 		return "次高";
// 	}
// 	if(value==="5") {
// 		return "高级";
// 	}
// }