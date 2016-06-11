$(function(){
	// search
	$("#rlSearch").on("click", function(){
		var form = $("#searchIndex [name]");
		var table = $("#repListTable")
		submitData(form, table,'repair');
	});

	// repairlist datagrid
	$("#repListTable").datagrid({
		url : '../../RepairController/findByCondition',
		queryParams : {from : 'repair'},
		singleSelect : true,
		border : false,
		rownumbers : true,
		fitColumns : true,
		fit: true,
		pagination : true,
		pageSize : 10,
		pageList : [10, 15, 20],
		toolbar : [
			{
				iconCls : 'icon_shouli',
				text : '受理报修',
				onClick : function(){
					var selected = $("#repListTable").datagrid('getSelected');
					if (!selected) {
			 			$.messager.alert('提示消息','请选择一个待受理的单据！','info');
					}else if(selected.repairState != '1'){
			 			$.messager.alert('提示消息','只能对待受理的单据进行操作！','info');
					}else{
						window.open('acceptrepairs.jsp?repairId='+selected.repairId); //跳转到受理报修页面
					};
				}
			 },
			 {
			 	iconCls: 'icon_huifang',
			 	text : '授权回访',
			 	onClick : function(){
			 		var selected = $("#repListTable").datagrid('getSelected');
			 		if (!selected) {
			  			$.messager.alert('提示消息','请选择一个已处理的单据！','info');
			 		}else if(selected.repairState != '已处理'){
			  			$.messager.alert('提示消息','只能对已处理的单据进行操作！','info');
			 		}else{
			 			location.href = 'login.html';   //跳转到授权回访页面
			 		};

			 	}
			 },
			 {
			 	iconCls: 'icon_cancel_win8',
			 	text : '无效报修',
			 	onClick : function(){
			 		var selected = $("#repListTable").datagrid('getSelected');
			 		if (!selected) {
			  			$.messager.alert('提示消息','请选择一个未结束的单据！','info');
			 		}else if(selected.repairState == '已拒绝' || selected.repairState == '已结案'){
			  			$.messager.alert('提示消息','只能对未结束的单据进行操作！','info');
			 		}else{
			 			location.href = '#addRepairDialog';   //跳转到无效报修页面
			 		};

			 	}
			 }
		],
		columns : [[
			{field : 'detail', title : '详情', width : 40, align:'center', formatter:detail},
			{field : 'repairNum', title : '编号批次', width : 100, align:'center'},
			{field : 'repairState', title : '状态', width : 50, align:'center', formatter:repairState},
			{field : 'department', title : '报修部门', width : 100, align:'center'},
			{field : 'repairMan', title : '报修人', width : 50, align:'center'},
			{field : 'level', title : '报修级别', width : 50, align:'center',formatter : level},
			{field : 'repairTime', title : '报修时间', width : 100, align:'center'},
			{field : 'acceptTime', title : '受理时间', width : 100, align:'center'},
			{field : 'planTime', title : '计划完成时间', width : 100, align:'center'},
			{field : 'finishTime', title : '实际完成时间', width : 100, align:'center'}
		]]
	});

	// reset
	$("#repReset").on("click", function(){
		 $("#searchIndex").form('reset');
	});
	
})

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
	
	//detail
	function detail(value,row,index){
		var rowId = row.repairId;
		return "<a  style='color:#069' href='../business/repairdetail.jsp?repairId="+rowId+"' target='_blank' >详情</a>";
	}

	//repair state
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