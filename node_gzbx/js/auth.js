$(function(){

	var authTable = $('#authTable');//获取authTable表格
	var sourcesTable = $("#sourcesTable"); //获取sourcesTable表格
	var addAuthDialog = $("#addAuthDialog"); //新增权限弹框
	var authMessage = $("#authMessage"); // 权限信息
	var configureSource = $("#configureSource"); //权限配置
	
	var authName = $("#authName");//权限名称
	var authDescrib = $("#authRemark");//权限描述
	var sureBtn = $("#sureBtn");

	$("#search").on('click', function(){
		var param = {};
		param['key'] = $("#keyWord").textbox('getValue').trim();
		authTable.datagrid('load',param);
	});


	// ------------------------------------新增权限------------------------------------------------------

	createDialog(addAuthDialog, 1000, '100%', '权限信息'); // 创建新增权限弹框
	createPanel(authMessage, '100%', 50);  //  创建面板 权限信息
	createPanel(configureSource, '100%', 'auto', '配置资源'); // 创建面板配置资源

	//点击新增权限按钮 弹出新增权限对话框,并加载数据
	$("#addAuth").on("click", function(){
		createtable();// 调用方法 创建表格并打开弹框	
		sureBtn.show();//显示确认键
	});

	// ------------------------------------编辑权限------------------------------------------------------

	//点击编辑权限按钮 弹出编辑权限对话框,并加载数据
	$("#editAuth").on('click', function(){
		sureBtn.show();//显示确认键
		//判断权限表格是否选择了一个行
		var selected = authTable.datagrid('getSelected');
		if (selected) {
			createtable(selected.authId);// 调用方法创建表格和打开弹框
			$('#authId').val(selected.authId);
			authName.textbox('setValue',selected.authName);
			authDescrib.textbox('setValue',selected.authRemark);
			authName.textbox('disable');
		}else{
			$.messager.alert('提示消息', '请选择一个行！', 'info');
		};
	});
	
	
	//点击确认 判断后 添加或者编辑修改权限
	sureBtn.on("click", function(){
		var Selections = sourcesTable.datagrid('getSelections');
		var authNameVal = authName.textbox('getValue').trim();
		
		if ((Selections.length != 0) && authNameVal) {
			var param = {};
			var auth = {};
			var resourceIds = [];
			var inputs = $("#authMessage [name]");
			inputs.each(function(){  //取得各个input框的值，存入对象access
				auth[$(this).attr('name')] = $(this).val();
			});

			var authId = $('#authId').val();
			if(authId){
				auth['authId'] = authId;
			}
			for (var i = 0; i <= Selections.length - 1; i++) {
				resourceIds.push(Selections[i].resourceId);
			};	
			param.auth = auth;
			param.resourceIds = resourceIds;

			$.ajax({  //发送ajax传送数据到后台
				type: 			"POST",
				url: 			"../../AuthController/saveOrUpdateAuth",
				contentType :	'application/json;charset=utf-8', //设置请求头信息
				dataType:		"json",
				data:			JSON.stringify(param),
				success: function(data){
					if(data.result=='success'){
						$.messager.alert('我的消息',data.msg,'info');
						authTable.datagrid('reload');
					}else{
						$.messager.alert('我的消息','操作失败','info');
					}
				}
			});
			
			addAuthDialog.dialog('close');
			
		}else if(!authNameVal){
			$.messager.alert('我的消息','请填写权限名称!','info');
		}else{
			$.messager.alert('我的消息','至少将一个以上的权限授予此角色!','info');
		}
	});

	// ------------------------------------查看权限------------------------------------------------------
	//点击查看权限按钮 弹出查看权限对话框,并加载数据
	$("#viewAuth").on('click', function(){
		var selected = authTable.datagrid('getSelected');
		if (selected) {
			
			authName.textbox('setValue',selected.authName);
			$('#authRemark').textbox('setValue',selected.authRemark);
			
			sourcesTable.datagrid({
				url: '../../ResourceController/findResourceByAuthId',
				queryParams : {authId : selected.authId},
				width:984,
				height:510,
				rownumbers: true,
				border: false,
				columns:[[
				          {field:'resourceName',title:'资源名称',width:443,align:'center'},
				          {field:'resourceUrl',title:'资源值',width:443,align:'center'}
				          ]]
			});
			addAuthDialog.dialog('open');
			authName.textbox('disable');
			authDescrib.textbox('disable');	
			sureBtn.hide();//隐藏确认键
		}else{
			$.messager.alert('提示消息', '请选择一个行！', 'info');
		};
	});

	
   //-----------------------------------删除权限-----------------------------------------------------
	
	$('#deletAuth').on("click",function(){	
		var selected = authTable.datagrid('getSelected');
		if (!selected) {
			$.messager.alert("提示","请选择一行记录！"); 
		}else{
			$.messager.confirm("删除确认","您确认想要删除记录吗？",function(result){
				if (result) {
					$.ajax({
						type:			'POST',
					    dataType:		"json",
						url : 			'../../AuthController/delectAuth',
						data : 			{authId : selected.authId},
						success : function(data){
							if(data.result == 'success'){
								$.messager.alert('我的消息',data.msg,'info');
								authTable.datagrid('reload');
							}else{
								$.messager.alert('提示消息','操作失败','info');
							}
						},
						error : function(a) {
							$.messager.alert("警告", "操作失败！", "error");
						}
					});
					
				}
			})
		}	
	});





	function createtable(authId){
		sourcesTable.datagrid({
			url: '../../ResourceController/findResourceByAuth',
			queryParams : {authId : authId},
			width:984,
			height:510,
			rownumbers: true,
			border: false,
			columns:[[
			{field:'resourceName',title:'资源名称',width:460,align:'center'},
			{field:'resourceUrl',title:'资源值',width:460,align:'center'}
			]],
			onLoadSuccess:function(data){
				
				for ( var int = 0; int < data.total; int++) {
					if(data.rows[int].selected=='true'){
						sourcesTable.datagrid("selectRow",int);
					}
				}
			}
		});
		addAuthDialog.dialog("open");
	}

	function createDialog(dialogs, width, height, title){
		dialogs.dialog({
			width: width,
			height: height,
			title: title,
			closeable: true,
			closed : true,
			modal: true,
			onClose:function(){
				$("#setauthForm").form("clear");
				authName.textbox('enable');
				authDescrib.textbox('enable');
				
			}
		});
	}

	function createPanel(panels, width, height, title){
		panels.panel({
			width : width,
			height:height,
			title : title,
			modal: true

		});
	}
})