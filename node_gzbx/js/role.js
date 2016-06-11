$(function(){


	//角色分配标签
	$('#role_tabs').tabs({    
	    border:false,    
	    onSelect:function(title){    
	         
	    }    
	}); 
	
	var roleId = $('#roleId');
	var roleName = $('#roleName');
	var roleRemark = $('#roleRemark');
	
	var checkRoleRightDataGrid= $('#checkRoleRightDataGrid');
	
	var checkRoleDialog = $('#checkRoleDialog');
	
	var tblQueryRoleList = $('#tblQueryRoleList');
	
    //新增角色对话框
	createDialog(checkRoleDialog,'角色信息',1000,600,true,true,true);

	$("#search").on('click', function(){
		var param = {};
		param['key'] = $("#txtQueryRoleName").textbox('getValue').trim();
		tblQueryRoleList.datagrid('load',param);
	});
   
	
    //角色列表表格
	tblQueryRoleList.datagrid({
		url:'../../RoleController/findAllRole',  
		border:false,
		rownumbers:true,
		fitColumns:true,
		fit:true,
		singleSelect : true,
		pagination : true,
	    pageSize : 10,
		pageList : [10, 15, 20],
		toolbar: [{
			iconCls : 'icon_edit_add',
			plain : true,
			text : "新增角色",
			handler : function(){
				checkRoleDialog.dialog('open');
				//新增角色对话框最外围面板
    			createPanel('#addRolePanelWrapper',"roleInfomation",false);
				//新增角色对话框角色权限面板
				createPanel('#roleRight',"roleRight",false);
				//新增角色对话框角色权限分配表格createDatagrid(id,url,border,rownumbers,fitColumns,fit,param,columns)
				createDatagrid('#checkRoleRightDataGrid','../../RoleController/findAuthByroleId',false,true,false,false,null,
					[[	{field:'authName',title:'权限名称',width:400,align:'center'},    
	        			{field:'authRemark',title:'权限描述',width:400,align:'center'},    
	        	    ]])
			}
		},
		{
			iconCls : 'icon_trackRecord_win8',
			plain : true,
			text : "角色编辑",
			handler : function(){
				var getSelect = tblQueryRoleList.datagrid('getSelected');
				if (getSelect) {
					checkRoleDialog.dialog('open');
					
					roleId.val(getSelect.roleId);
					roleName.textbox('setValue',getSelect.roleName);
					roleRemark.textbox('setValue',getSelect.roleRemark);
					
					//角色编辑对话框最外围面板
	    			createPanel('#editRolePanelWrapper',"roleInfomation",false);
					//角色编辑对话框角色权限面板
					createPanel('#editRoleRight',"roleRight",false);
					//角色编辑对话框角色权限分配表格
		        	    
					 checkRoleRightDataGrid.datagrid({
	        	    	url : '../../RoleController/findAuthByroleId',
	        	    	queryParams : {roleId : getSelect.roleId},
	        	    	border : false,
	        	    	rownumbers : true,
	        			columns : 
	        				[[	{field:'authName',title:'权限名称',width:400,align:'center'},    
	        		        	{field:'authRemark',title:'权限描述',width:400,align:'center'},    
	        			     ]],
        			     onLoadSuccess:function(data){

    						for ( var int = 0; int < data.total; int++) {
    							if(data.rows[int].selected=='true'){
    								checkRoleRightDataGrid.datagrid("selectRow",int);
    							}
    						}
        				}
	        	   });
					
				}else{
					$.messager.alert('我的消息','请选择一行！','info');   //消息框
				}
			}
		},
		{
			iconCls : 'icon_search',
			plain : true,
			text : "查看",
			handler : function(){
				var getSelect = tblQueryRoleList.datagrid('getSelected');
				if (getSelect){
					checkRoleDialog.dialog('open');
					//角色编辑对话框最外围面板
					
					roleName.textbox('setValue',getSelect.roleName);
					roleRemark.textbox('setValue',getSelect.roleRemark);
					
					roleName.textbox({
						disabled: true
					});
					roleRemark.textbox({
						disabled: true
					});
					
	    			createPanel('#checkRolePanelWrapper',"roleInfomation",false);
					//角色编辑对话框角色权限面板
					createPanel('#checkRoleRight',"roleRight",false);
					//角色编辑对话框角色权限分配表格(id,url,border,rownumbers,fitColumns,fit,param,columns)
					createDatagrid('#checkRoleRightDataGrid','../../RoleController/findById',false,true,false,false,getSelect.roleId,
						[[	{field:'authName',title:'权限名称',width:400,align:'center'},    
		        			{field:'authRemark',title:'权限描述',width:400,align:'center'},    
		        	    ]])
				}else{
					$.messager.alert('我的消息','请选择一行！','info');   //消息框
				}
			}
		},
		{
			iconCls : 'icon_edit_remove',
			plain : true,
			text : "删除",
			handler : function(){
				var getSelect = tblQueryRoleList.datagrid('getSelected');
				if (getSelect){
					$.messager.confirm('确认对话框', '确认删除？', function(b){   //确认框
						if (b){   //确认按钮操作
			    	        
			    	        $.ajax({
								type:			'POST',
							    dataType:		"json",
								url : 			'../../RoleController/delectAuth',
								data : 			{roleId : getSelect.roleId},
								success : function(data){
									if(data.result == 'success'){
										$.messager.alert('我的消息',data.msg,'info');
										tblQueryRoleList.datagrid('reload');
									}else{
										$.messager.alert('提示消息','操作失败','info');
									}
								},
								error : function(a) {
									$.messager.alert("警告", "操作失败！", "error");
								}
							});
			    	        
						}
					});
				}else{
					$.messager.alert('我的消息','请选择一行！','info');   //消息框
				}
			}
		}],
	    columns:[[
	        {field:'roleName',title:'角色名称',width:100,align:'center'},    
	        {field:'roleRemark',title:'角色描述',width:100,align:'center'},    
	    ]]
	});
	
    //创建对话框
    function createDialog(dialogs,title,width,height,colsed,resizable,modal){
    	dialogs.dialog({    
		    title : title,  
		    width : width,
		    height : height,   
		    closed : colsed,        
		    resizable : resizable,
		    modal : modal,
		    onClose:function(){
				$("#checkRoleDetail").form("clear");
				roleName.textbox({
					disabled: false
				});
				roleRemark.textbox({
					disabled: false
				});
			}
	    });  
    }

    //创建面板
    function createPanel(id,cls,border){
    	$(id).panel({
			cls : cls,
			border : border
		});
    }

    //创建表格
    function createDatagrid(id,url,border,rownumbers,fitColumns,fit,param,columns){

    	$(id).datagrid({
	    	url : url,
	    	border : border,
	    	rownumbers : rownumbers,
	    	fitColumns : fitColumns,
			fit : fit,
			queryParams : {roleId : param},
			columns : columns,
	    });
    }

    $('#role_use').datagrid({
    	url:'',  
    	border:false,
		rownumbers:true,
		fitColumns:true,
		fit:true,
		columns:[[
	        {field:'roleName',title:'角色名称',width:100,align:'center'},    
	        {field:'roleRemark',title:'角色描述',width:100,align:'center'},  
	        {field:'roleRemark',title:'启用人数',width:100,align:'center'}, 
	        {field:'detail' ,width:100,align:'center',formatter:detail},  
	    ]],
	    pagination : true,
	    pageSize : 10,
		pageList : [10, 15, 20],
		singleSelect : true
    });

  //点击确认 判断后 添加权限
	$("#btn_submit").on("click", function(){
		var Selections = checkRoleRightDataGrid.datagrid('getSelections');
		
		var roleName = $("#roleName").textbox('getValue').trim();
		
		if ((Selections.length != 0) && roleName) {
			var param = {};
			var role = {};
			var authIds = [];
			debugger;
			var roleIdval = roleId.val();
			if(roleIdval){
				role['roleId'] = roleIdval;
			}
			role['roleName'] = roleName;
			role['roleRemark'] = roleRemark.textbox('getValue').trim();
			
			for (var i = 0; i <= Selections.length - 1; i++) {
				authIds.push(Selections[i].authId);
			};
			
			param.role = role;
			param.authIds = authIds;
			
			$.ajax({  //发送ajax传送数据到后台
				type: 			"POST",
				url: 			"../../RoleController/saveOrUpdateRole",
				contentType :	'application/json;charset=utf-8', //设置请求头信息
				dataType:		"json",
				data:			JSON.stringify(param),
				success: function(data){
					debugger;
					if(data.result=='success'){
						$.messager.alert('我的消息',data.msg,'info');
						tblQueryRoleList.datagrid('reload');
						checkRoleDialog.dialog('close');
					}else{
						$.messager.alert('我的消息','操作失败','info');
					}
				}
			});
			
			
			
		}else if(!roleName){
			$.messager.alert('我的消息','请填写权限名称!','info');
		}else{
			$.messager.alert('我的消息','至少将一个以上的权限授予此角色!','info');
		}
	});
    
    
    function detail(value,row,index){
		var rowId = row.repairId;
		return "<a  style='color:#069' href='../business/repairdetail.jsp?repairId="+rowId+"' target='_blank' >详情</a>";
	}
})