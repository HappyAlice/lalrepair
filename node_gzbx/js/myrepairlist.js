
$(function(){
	var myRepairTable = $("#myRepairTable");
	
	// 对查询按钮绑定点击事件，向后台传送数据
	$("#myrlSearch").on("click", function(){
		var form = $("#myrlSearchIndex [name]");
		var table = $("#myreportTable");
		submitData(form, table,'myrepair');
	});
	
	// search
	$("#search").on("click", function(){
		var form = $("#searchIndex [name]");
		var table = myRepairTable;
		submitData(form, table);
	});

	// reset
	$("#reset").on("click", function(){
		debugger
		 $("#searchIndex").form('reset');
	});

	$('#willedit').on('click' , function(){
		var selected = myRepairTable.datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','请选择一个已保存的单据！','info');
		}else if(selected.repairState != '0'){
				$.messager.alert('提示消息','只能对已保存的单据进行操作！','info');
		}else{
			window.open('addrepair.jsp?repairId='+selected.repairId); //跳转到受理报修页面
		}
	});
	
	$('#willdelete').on('click' , function(){
		var selected = myRepairTable.datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','请选择一个已保存的单据！','info');
		}else if(selected.repairState != '0'){
				$.messager.alert('提示消息','只能对已保存的单据进行操作！','info');
		}else{
			$.messager.confirm('确认对话框', '确认删除？', function(b){   //确认框
				if (b){   //确认按钮操作
					deleteRepair(selected.repairId);
				}
			});
		}
	});

	
	function deleteRepair(repairId){
		$.ajax({
			type:'post',
		    dataType:"json",
			url : '../../RepairController/delectRepair',
			data : {repairId: repairId},
			success : function(date){
				alert(date.msg);
				$('#myRepairTable').datagrid('reload');
			}
		});
	};
	
});

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

//详情
function detail(value,row,index){
	var rowId = row.repairId;
	return "<a  style='color:#069' href='repairdetail.jsp?repairId="+rowId+"' target='_blank' >详情</a>";
}

//报修状态
function repairState(value,row,index){
	if(value==="0") {
		return "保存";
	}
	if(value==="1") {
		return "待受理";
	}
	if(value==="2") {
		return "已受理";
	}
	if(value==="3") {
		return "处理中";
	}
	if(value==="4") {
		return "已处理";
	}
	if(value==="5") {
		return "已拒绝";
	}
	if(value==="6") {
		return "已结案";
	}
}

//报修级别
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