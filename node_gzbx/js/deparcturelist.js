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
	
	// 点击任务分派按钮，弹出对话框
	$("#deparctureBtn").on('click',function(){
		var selected = deparctureProTable.datagrid('getSelected');
		if(selected){
			deparctureDialog.dialog("open");
		}else{
			$.messager.alert('提示消息', '请选择一个单据', 'info');
		};
				
	});

	// search
	$("#taskSearch").on("click", function(){
		debugger;
		var form = $("#taskSearchIndex [name]");
		var table = $("#departture");
		submitData(form, table,'task');
	});

	// reset
	$("#repReset").on("click", function(){
		 $("#taskSearchIndex").form('reset');
	});

	$("#departtureButton").on("click", function(){
		var selected = $("#departture").datagrid('getSelected');
		if (!selected) {
				$.messager.alert('提示消息','请选择一条已受理的记录！','info');
		}else if(selected.repairState != '2'){
				$.messager.alert('提示消息','只能对已受理的单据进行任务派发','info');
		}else{
			window.open('deparcture.jsp?repairId='+selected.repairId); //跳转到受理报修页面
		}
	});

   
	//search
	function submitData(forms,table,parent){
		var param = {};               
		forms.each(function(){    
			var $this = $(this);        
			param[$this.attr("name")] = $this.val().trim();   
		});
		if(parent){
			param['department'] = parent;
		}
		table.datagrid('load',param);		
	}

})



	function detail(value,row,index){
		var rowId = row.repairId;
		return "<a  style='color:#069' href='../business/repairdetail.jsp?repairId="+rowId+"' target='_blank' >详情</a>";
	}
	
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
	
