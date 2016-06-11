$(function(){
	var sourceData = $("#sourceData");
	
	$("#sourceBtn").on('click', function(){
		var param = {};
		param['key'] = $("#sourceInput").textbox('getValue').trim();
		sourceData.datagrid('load',param);
	});

		sourceData.datagrid({ 
		url:'../../ResourceController/findResource',   
		border:false, 
		fit:true,
	    rownumbers:true,
	    toolbar:"#sourceSearch",
	    fitColumns: true,
	    pagination: true,
	    pageSize: 10,
	    pageList:[10,15,20,25,30],
	    singleSelect:true,
	    columns:[[        
		    {field:'resourceName',title:'资源名称',width:380,align:'center'},    
	        {field:'resourceUrl',title:'资源值',width:380,align:'center'},
	        {field:'belongMune',title:'所属菜单',width:380,align:'center'},      
	    ]]  

	}); 

//创建dialog =S
	var setSource = $('#setSource');
	createDialog(setSource,"资源配置",400,220,true,true);    //创建资源配置的dialog
	setSource.dialog({
		onClose:function(){
			$("#resource_form").form("reset");
		}
	});
	/*var setEeditSource = $("#setSource");
	createDialog(setEeditSource,"资源配置",400,220,true,true);//创建编辑资源的dialog
	setEeditSource.dialog({
		onClose:function(){
			$("#setmenuForm").form("clear");
		}
	});*/

//创建dialog =E

//触发dialog =S
	var addSource = $("#addSource"); 	//增加资源的jquery对象

	var editSource = $("#editSource");  //编辑资源的jquery对象

	addSource.on("click",function(){

		vInput("#setSourceName");

		vInput("#setSourceVal");

		setSource.dialog("open");   //打开dialog
	})

 	//编辑资源触发dialog
	editSource.on("click",function(){
		
		debugger;
		
		var getStatus = sourceData.datagrid("getSelected");  //返回选中的行的对象

		var getsetSourceId = $("#setSourceId");   //资源id

		var getSourceName = $("#setSourceName");   //资源名称文本框对象

		var getSourceVal = $("#setSourceVal");     //资源值文本框对象

		var getSourceMenu = $("#setSourceMenu");     //所属菜单文本框对象
		
		var getMenuId = $('#setSourceMenuId');				////所属上级菜单 id

		if (getStatus == null) {

			$.messager.alert("提示","请选择一行记录！"); 

		}else{

			//调用setValue方法
			
			getsetSourceId.val(getStatus.resourceId);  
			
			setValue(getSourceName,"setValue",getStatus.resourceName);  

			setValue(getSourceVal,"setValue",getStatus.resourceUrl); 

			setValue(getSourceMenu,"setValue",getStatus.belongMune);  
			
			getMenuId.val(getStatus.menuId);
			
			setSource.dialog("open");   //打开dialog
		}
	});

//触发dialog =E

//删除行
	var removeSource = $("#removeSource");
	removeSource.on("click",function(){
		var getStatus = sourceData.datagrid("getSelected");

		if (getStatus == null) {
			$.messager.alert("提示","请选择一行记录！"); 
		}else{
			$.messager.confirm("删除确认","您确认想要删除记录吗？",function(result){
				if (result) {
					
					$.ajax({
						type:			'POST',
					    dataType:		"json",
						url : 			'../../ResourceController/delectResource',
						data : 			{resourceId : getStatus.resourceId},
						success : function(data){
							if(data.result == 'success'){
								$.messager.alert('提示消息',data.msg,'info');
								$("#setSource").dialog("close");
								$('#sourceData').datagrid('reload');
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

})

// 自定义方法
//  定义一个方法创建dialog
function createDialog(id,title,width,height,isclosed,ismodal){
	id.dialog({    
	    title : title ,    
	    width : width,    
	    height : height,    
	    closed : isclosed,            
	    modal : ismodal, 
	});
}

// 定义一个获取文本框并设置值的方法
function setValue(id,setOrGet,param){
	id.textbox(setOrGet,param);
}

//创建验证框
function vInput(id){
	$(id).validatebox({    
    	required: true,
    	missingMessage:"该项为必填"      
	}); 
}

$(function(){
	var selectPreMenu = $('#selectPreMenu');
	var returnMenu = $("#returnMenu");
	var menuList = $("#menuList");
	var menuLevelData = $("#menuLevelData");
	var setPrevMenu = $("#setSourceMenu");   //菜单名称文本框对象
	var getPreMenuId = $("#setSourceMenuId");  	//上级菜单文本框对象id
	
	selectPreMenu.on('click',function(){
		createDialog(returnMenu,"菜单配置",950,true,true);//创建上一级菜单的dialog
		returnMenu.dialog('open');
		setPanel(menuList,"菜单列表",936,350,"myHeader");
		menuLevelData.datagrid({ 
			url:'../../MenuController/findMenus',   
			border:false, 
		    rownumbers:true,
		    fit:true,
		    pagination: true,
		    pageSize: 10,
		    pageList:[10,15,20,25,30],
		    singleSelect:true,
		    columns:[[        
			    {field:'menuName',title:'菜单名称',width:450,align:'center'},    
		        {field:'parentName',title:'上级菜单名称',width:450,align:'center'}, 
		    ]]  
		});

		$('#btn').on('click',function(){
			var getSelected = menuLevelData.datagrid('getSelected');  //返回选中的行的对象
			if (getSelected == null) {
				$.messager.alert("提示","请选择一行记录！"); 
			}else{
				//选择一行查看数据
				setPrevMenu.textbox('setValue',getSelected.menuName);
				getPreMenuId.val(getSelected.menuId);
				returnMenu.dialog('close');
			}
		});
	});

	$('#confirmBtn').on('click',function(){
		var input = $('[data-idtify="input"]');
		var param ={};
		var resource = {};
		$.each(input,function(){
			var name = $(this).attr('data-name');
			resource[name] = $(this).textbox('getValue');
			
		});
		
		if($('#setSourceId').val()){
			resource['resourceId'] = $('#setSourceId').val();
		}
		param.resource = resource;
		
		var belongMuneId = $('#setSourceMenuId').val();
		param.belongMuneId = belongMuneId;
		
		$.ajax({
			type:			'POST',
		    dataType:		"json",
		    contentType :	'application/json;charset=utf-8', //设置请求头信息
			url : 			'../../ResourceController/saveOrUpdateResource',
			data : 			JSON.stringify(param),
			success : function(data){
				if(data.result == 'success'){
					$.messager.alert('提示消息',data.msg,'info');
					$("#setSource").dialog("close");
					$('#sourceData').datagrid('reload');
				}else{
					$.messager.alert('提示消息','操作失败','info');
				}
			},
			error : function(a) {
				$.messager.alert("警告", "操作失败！", "error");
			}
		});
	});
})

//上级菜单选择
function setPanel(id,title,width,height,headerCls){
	id.panel({
		title:title,
		width:width,
		height:height,
		headerCls:headerCls,
		border:false
	})
}