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

	var deparctureDialog =  $("#deparctureDialog");  //分配任务的弹框
	var deparctureProTable = $("#deparctureProTable"); //问题列表 表格
	var deparctureMenSelect = $("#deparctureMenSelect"); //选择处理人对话框
	var depMenTable = $("#depMenTable"); //处理人 人员信息 表格
	var userId = $("#userId"); //处理人id
	var depDealMen = $("#depDealMen"); //处理人
	var ledMessCont = $("#ledMessCont"); // 领导批示

	// 创建 受理报修 面板
	creatPanel($("#deparctureAccept"),"受理报修", true, "changeColor");
	// 创建 报修列表 面板
	creatPanel($("#deparctureRepairList"),"报修列表", true, "changeColor");
	// 创建 问题列表 面板
	creatPanel($("#deparctureProList"),"问题列表", true, "changeColor");

    // 创建一个 问题列表 表格
	deparctureProTable.datagrid({
		url : '../../ProblemController/findProblemByRepairId',
		queryParams : {repairId : $.getUrlParam('repairId')},
		singleSelect : true,
		rownumbers : true,
		fitColumns : true,
		autoRowHeight : true,
		border : false,
	    columns:[[
			{field:'category',title:'报修类别',width:100,align:'center'},
			{field:'project',title:'报修项目',width:100,align:'center'},
			{field:'detailed',title:'故障明细',width:100,align:'center'},
			{field:'problemContent',title:'报修内容',width:300,align:'center'}, 
		    {field:'isComplaint',title:'投诉',width:60,align:'center'},   
			{field:'dealMan',title:'处理人',width:150,align:'center'},
			{field:'detail',width:100,align:'center',formatter:detail}
		]]
	});
	
	// 点击任务分派按钮，弹出对话框
	$("#deparctureBtn").on('click',function(){
		var selected = deparctureProTable.datagrid('getSelected');
		if(selected){
			deparctureDialog.dialog("open");
		}else{
			$.messager.alert('提示消息', '请选择一个单据', 'info');
		};
				
	});

	// 创建一个 任务分派 的对话框
	createDialog(deparctureDialog, '任务分派', true, 500, 260, true, true);

	// 点击弹框中的增加按钮，打开选择处理人弹框
	$("#addDealMen").on("click", function(){
		deparctureMenSelect.dialog("open");
		depMenTable.datagrid("resize");
	});
	
	// 点击弹框中的关闭按钮 关闭弹框
	click($("#depDialogCloseBtn"), deparctureDialog, 'close')

	// 创建人员信息 表格
	depMenTable.datagrid({
		url: '../../UserController/findByCondition',
		height: 415,
		autoRowHeight : false,
		rownumbers : true,
		border: false,
		toolbar : '#depMenTableBar',
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
	createDialog(deparctureMenSelect, '人员信息', true, 700, 451, true, true);
	
	//选择一个或者多个处理人，并将他们添加任务分派弹框
	$("#selectDealMen").on("click", function(){
		var getSelections = depMenTable.datagrid('getSelections');
		if (getSelections.length != 0) {
			var dealManId = [];
			var dealMan = [];
			for (var i = 0; i < getSelections.length; i++) {  //如果有选择，对 选择处理人对话框的处理人进行赋值
				dealMan[i] = getSelections[i].userName;
				dealManId[i] = getSelections[i].userId;
			};
			depDealMen.textbox("setValue", dealMan);
			userId.textbox("setValue", dealManId);
			deparctureMenSelect.dialog("close");   //完成后关闭该对话框	
		}else{
			$.messager.alert('提示消息','请至少选择一个处理人！','info');
		};
	});
	
	// dialog search
	$("#menSearch").on("click", function(){
		var form = $("#searchForm [name]");
		var table = $("#depMenTable");
		submitData(form, table);// task??
	});

	// dialog reset
	$("#reset").on("click", function(){
		 $("#searchForm").form('reset');
	});
	
	var id = new Array();
	var man = new Array();
	var leadership = new Array();
	//点击确认时，判断处理人和领导批示是否都有内容，如果有则发送ajax向后台传送数据
	$("#depDialogSureBtn").on("click", function(){
	 	var dealMan = $('#depDealMen').val().trim();
	 	var leaderMessage = $('#ledMessCont').val().trim();
	 	var selectedRow = deparctureProTable.datagrid('getSelected');
	 	var curRowIndex = deparctureProTable.datagrid('getRowIndex',selectedRow);
	 	
	 	id[curRowIndex] = $('#userId').val();
	 	man[curRowIndex] = $('#depDealMen').val();
	 	leadership[curRowIndex] = leaderMessage;
	 	
		if (dealMan && leaderMessage) {
			deparctureProTable.datagrid('updateRow',{
			index: curRowIndex,
			row: {
				dealMan : dealMan
			}
		});
			deparctureDialog.dialog('close');
			deparctureDialog.form('reset');
			depMenTable.datagrid("load");
		}else{
			if (!dealMan) {
				$.messager.alert('提示消息','请选择处理人！' ,'info');
			}else if (!leaderMessage) {
				$.messager.alert('提示消息','请填写领导批示！' ,'info');

			};
			
		};
		
	});
	  
	$("#depsureBtn").on("click", function(){	
		debugger;
		var delamen = true;
		var getRows = deparctureProTable.datagrid('getRows'); //选择当前页的所有行
		for (var i = 0; i <= getRows.length - 1; i++) {
				if(!getRows[i].dealMan){
					delamen = false;
					break;
				}
			};

		if (delamen) {
			var dispatchRepairModel = {};
			dispatchRepairModel.repairId = $.getUrlParam('repairId');
			dispatchRepairModel.userId = id;
			dispatchRepairModel.userName = man;
			dispatchRepairModel.leadership = leadership;
			dispatchRepairModel.list = getRows;
			
			$.ajax({
				type:'post',
				contentType : 'application/json;charset=utf-8', //设置请求头信息
		        dataType:"json",
				url : '../../RepairController/dispatchRepair',
				data : JSON.stringify(dispatchRepairModel),
				success : function(data){
						alert(data.msg);
						window.opener.location.reload();
						window.close();
				},
				error : function(a) {
					$.messager.alert("警告", "操作失败！", "error");
				}
				
			});
		}else{
			$.messager.alert('提示消息','请完成所有任务的派发再提交','info');
		};

	});
	 
	// ----------------------------------------封装好的方法---------------------------
	// 创建面板 方法
	function creatPanel($panels, mytitle, isborder, changeColor, param, isfit){
		$panels.panel({ 
			title : mytitle,      
			border : isborder,
			headerCls: changeColor,
			loader : param
		});
	}

	// dialog
	function createDialog($dialogs, title, iscloseable, itswidth, itsheight, ismodal, isclosed){
		$dialogs.dialog({
			title: title,
			closable: iscloseable,
			width: itswidth,
			height: itsheight,
			modal: ismodal,
			closed: isclosed
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
			param['department'] = parent;
		}
		table.datagrid('load',param);
		
	}

	// 弹出或关闭对话框的click函数
	function click($btns, $dialogs, isopen){
		$btns.on("click", function(){
			$dialogs.dialog(isopen);
		});
	}

	function detail(value,row,index){
		var rowId = row.problemId;
		return "<a  style='color:#069' href='../business/problemdetail.jsp?problemId="+rowId+"' target='_brank' >详情</a>";
	} 

	
	$(document).ready(function() { 
			$.ajax({
			type:'post',
	        dataType:"json",
			url : '../../RepairController/findRepairDetailById',
			data : {repairId : $.getUrlParam('repairId')},
			success : function(data){
				
				$('#dealDepartment').textbox('setValue',data.dealDepartment);
				$('#level').textbox('setValue',data.level);
				$('#limited').textbox('setValue',data.limited);
				$('#acceptTime').textbox('setValue',data.acceptTime);
				
				$('#repairMan').textbox('setValue',data.repairMan);
				$('#department').textbox('setValue',data.department);
				$('#telepone').textbox('setValue',data.telepone);
				$('#repairTime').textbox('setValue',data.repairTime);
				
			},
		});
	});
})

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
	
	
