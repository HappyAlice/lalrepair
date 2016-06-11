
$(function(){

	// -------------------------------------管理员角色分配页面------------------------------------------------------

	// 调用方法searchAdd()实现件点击后显示或者隐藏
	searchAdd($("#searchHide"), $("#rmSearchAdd"), $("#proListTable"));

	// =对查询按钮绑定点击事件，向后台传送数据
	$("#rolemanageSearch").on("click", function(){
		var form = $('#searchIndex [name]');
		var table = $('#rolemanageTable');
		submitData(form, table);
	})

	// 弹框==部门选择-不能为空，不能多选
	selections($("#diaDepartment"), true, false, 150);
	 // 弹框==角色不能为空，可以多选
	selections($("#roleSelect"), true, true, 120);

	// 弹框==保存按钮
	$("#rolemanageSave").on("click", function(){
		
		if($('#diaPwdInput').val()!=$('#diaPwdConfirm').val()){
			$.messager.alert('我的消息','密码不一致！','info');
		}else{
			
			var param = {};
			var user = {};
			$(".userUpdate input").each(function(){
				user[$(this).attr("name")] = $(this).val();
			});
			
			user[$('input[type="radio"]:checked').attr("name")] = $('input[type="radio"]:checked').val();
	
			user[$('#roleSelect').attr("comboname")] = $('#roleSelect').combobox('getValues').toString();
			console.info(user);
			param.user = user;
			$.ajax({
				 type: 'post',
				 contentType : 'application/json;charset=utf-8', //设置请求头信息
				 dataType: "json",
				 url : "../../UserController/updateInfo",
				 data : JSON.stringify(param),
				 success : function(data) {
				 	$.messager.alert('我的消息','保存成功！','info');
				 	manageDialog.dialog('close');
				 	$("#rolemanageTable").datagrid('reload');
				 },
				 error : function(data) {
					$.messager.alert('我的消息','保存失败！','info');
				 }
			});
		}
	});

	//创建一个弹框
	var manageDialog = $("#manageDialog");
	createDialog(manageDialog, 355, 380, "账号管理", "true", "true");

	
	// 管理员管理角色页面  设置数据表格并模拟数据
	$("#rolemanageTable").datagrid({
		url : '../../UserController/findByCondition',
		border : false,
		rownumbers : true,
		fitColumns : true,
		singleSelect : true,
		fit : true,
		pagination : true,
		pageSize : 15,
		pageList : [10, 15, 20],
		toolbar : [{
			iconCls : 'icon_trackRecord_win8',
			text : '账户管理',
			// 对账号管理按钮绑定一个click事件，弹出对话框
			onClick : function(){
				var selected = $("#rolemanageTable").datagrid('getSelected');
				if(selected){
					manageDialog.dialog("open");
					setAjax(selected);
				}else{
					$.messager.alert('提示消息', '请选择一个行', 'info');
				};
				
			}			
		}],

		// 双击可以打开
		onDblClickRow : function(){
			manageDialog.dialog("open");
			
			var selected = $("#rolemanageTable").datagrid('getSelected');
			setAjax(selected);
		},		
		columns : [[
			{field : 'account', title : '登陆账号', width : 50, align:'center' },
			{field : 'userName', title : '姓名', width : 50, align:'center' },
			{field : 'company', title : '公司', width : 100, align:'center' },
			{field : 'department', title : '部门', width : 100, align:'center' },
			{field : 'telephone', title : '电话号码', width : 100, align:'center' },
			{field : 'mail', title : '邮箱', width : 100, align:'center' },
			{field : 'userState', title : '状态', width : 50, align:'center', formatter:userState }
		]]
	});
	//用户状态
	function userState(value,row,index){
		if(value==="0") {
			return "<span style='color:red'>待审批</span>";
		}
		if(value==="2") {
			return "<span style='color:red'>禁用</span>";
		}
		return "启用";
	}
	
	//点击disabled按钮时将弹框中的各个字段disabled
	$("#statusDisAble").on("click", function(){
		disOrEnable(true,'disable');
	});
	
	//点击abled按钮时将弹框中的各个字段disabled
	$("#statusAble").on("click", function(){
		disOrEnable(false,'enable');
	});

// -------------------------------------------以下为封装好的方法------------------------------------------------------------
	
	//封装方法  创建一个对话框
	function createDialog($createDialog, width, height, title, isclosed, modal){
		$createDialog.dialog({
			width : width,
			height : height,
			title : title,
			closed : isclosed, //定义是否关闭窗口（不显示窗口） 默认为false
			modal : modal
		});
	}


	// 封装方法searchAdd()实现部分条件点击后显示或者隐藏
	function searchAdd($content, $button, $table){     //$content（要隐藏或显示的内容）, $button（增加减少按钮）
		$content.hide();
		$button.on('click', function(){
			if ($button.hasClass("rm_add_success")) {
				$content.hide();
				$button.removeClass("rm_add_success");
				$table.datagrid("resize");
			}else{
				$content.show();
				$button.addClass("rm_add_success");
				$table.datagrid("resize");
			};
		});
	}


    // 封装选择框方法
	function selections(comboxs, isrequired, ismultiple, height){
		comboxs.combobox({  
			panelHeight : height,  
		    required : isrequired,    
		    multiple : ismultiple,
		    panelHeight:'auto',
		    editable:false
		});  
	}

	// 封装submitData 方法，调用load方法传送并加载新数据
	function submitData(selector,tableid,wuwei){
		var param = {};               
		selector.each(function(){    
			var $this = $(this);        
			param[$this.attr("name")] = $this.val().trim();   
		});

		if(wuwei){
			param['from'] = wuwei;
		}
		tableid.datagrid('load',param);  // easyui 自带的load方法
		
	}

//	 封装方法disOrEnable()实现启用或者禁用该用户样式的修改
   	function disOrEnable(isable,isenable){			
			$("#diaAccount").attr("disabled", isable);
			$("#diaPwdInput").attr("disabled", isable);
			$("#diaPwdConfirm").attr("disabled", isable);
			$("#diaEmail").attr("disabled", isable);
			$("#selectButton").attr("disabled", isable);
			$("#roleSelect").attr("disabled", isable);
			$('#diaDepartment').combobox(isenable);  
			$("#roleSelect").combobox(isenable);
	}

	
	function setAjax(row){
		//部门
		$.ajax({
			url : "../../FirmController/findDepByFirmName",
			type : "post",
			dataType : 'json',
			data : {firmName : row.company},
			success : function(data){
				$('#diaDepartment').combobox({
					valueField: 'remark',
					textField : 'remark',
					data: data
				});
				$("#diaId").attr("value", row.userId);
				$("#diaName").attr("value", row.userName);
				$("#diaAccount").attr("value", row.account);
				$("#diaEmail").attr("value", row.mail);
				$("#diaDepartment").combobox("select", row.department);
				if(row.userState == '0'|| row.userState == '2'){//禁用
					$('#statusAble').removeAttr("checked");
					$('#statusDisAble').attr("checked","checked");
					disOrEnable(true,'disable');
				}else{
					$('#statusDisAble').removeAttr("checked");
					$('#statusAble').attr("checked","checked");
					disOrEnable(false,'enable');
				}
			}
		});
		
		//角色
		$.ajax({
			url : "../../RoleController/findAllRoleRemark",
			type : "post",
			dataType : 'json',
			success : function(data){
				$('#roleSelect').combobox({
					valueField: 'roleId',
					textField : 'roleRemark',
					data: data
				});
				var a=row.roles;
				var arr = [];
				if(a){
					arr = a.split(",");
				}
				
				$("#roleSelect").combobox("setValues", arr);
			}
		});
		
		if(row.userState == '0'|| row.userState == '2'){//禁用
			disOrEnable(true,'disable');
		}else{
			disOrEnable(false,'enable');
		}
	}	
})


