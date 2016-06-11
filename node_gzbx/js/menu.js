$(function(){
	
	//上级菜单查询
	var menuData = $("#menuData");
	$("#menuBtn").on('click', function(){
		var param = {};
		param['menuName'] = $("#menuInput").textbox('getValue').trim();
		menuData.datagrid('load',param);
	});


	menuData.datagrid({ 
		url:'../../MenuController/findMenus',
		border:false, 
		fit:true,
	    rownumbers:true,
	    toolbar:"#menuSearch",
	    pagination: true,
	    fitClumns: true,
	    pageSize: 10,
	    pageList:[10,15,20,25,30],
	    singleSelect:true,
	    columns:[[
		    {field:'menuName',title:'菜单名称',width:280,align:'center'},    
	        {field:'menuNum',title:'排序号',width:280,align:'center'},
	        {field:'menuImg',title:'菜单图片',width:280,align:'center'},    
	        {field:'parentName',title:'上级菜单名称',width:280,align:'center'}   
	    ]]  

	});

	var menuList = $("#menuList");

	var menuLevelData = $("#menuLevelData");

	setPanel(menuList,"菜单列表",950,350,"myHeader");


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

//创建dialog =S
	var setMenu = $('#setMenu');
	createDialog(setMenu,"菜单配置",400,250,true,true);    //创建菜单配置的dialog
	
	setMenu.dialog({
		onClose:function(){
			$("#setmenuForm").form("clear");
		}
	});
	
	var setEeditMenu = $("#setMenu");
	createDialog(setEeditMenu,"菜单配置",400,220,true,true);//创建编辑菜单的dialog
	
	setEeditMenu.dialog({
		onClose:function(){
			$("#setmenuForm").form("reset");
		}
	});
	
	var returnMenu = $("#returnMenu");
	createDialog(returnMenu,"菜单配置",965,true,true);//创建上一级菜单的dialog
	
	//上级菜单查询
	$("#mLevelBtn").on('click', function(){
		var param = {};
		param['menuName'] = $("#menuLevelInput").textbox('getValue').trim();
		menuLevelData.datagrid('load',param);
	});

//创建dialog =E

//触发dialog =S
	var addMenu = $("#addMenu"); 	//增加菜单的jquery对象

	var editMenu = $("#editMenu");  //编辑菜单的jquery对象

	var prevMenu = $("#prevMenu");

	getDialog(addMenu,"click",setMenu,"open"); //新增菜单触发dialog

	getDialog(prevMenu,"click",returnMenu,"open");

 	//编辑菜单触发dialog
	editMenu.on("click",function(){
	
		var getStatus = menuData.datagrid("getSelected");  //返回选中的行的对象

		var getMenuName = $("#setMenuName");   //菜单名称文本框对象

		var getMenuVal = $("#setMenuVal");     //排序值文本框对象

		var getMenuImg = $("#setMenuImg");     //菜单图片文本框对象

		var getPrevMenu = $("#parentName");   //上级菜单文本框对象名称
		
		var getPreMenuId = $("#parentId");   //上级菜单文本框对象id

		if (getStatus == null) {

			$.messager.alert("提示","请选择一行记录！"); 

		}else{

			//选择一行查看数据
			setValue(getMenuName,"setValue",getStatus.menuName);  
			
			setValue(getMenuVal,"setValue",getStatus.menuNum); 

			setValue(getMenuImg,"setValue",getStatus.menuImg);  

			setValue(getPrevMenu,"setValue",getStatus.parentName);  

			setEeditMenu.dialog("open");   //打开dialog
		}
	});

		// 返回上一级菜单
	/**
	 * 选择上一级菜单
	 */
	$("#btn").on("click",function(){
		var getSelected = menuLevelData.datagrid("getSelected");  //返回选中的行的对象	
		var setPrevMenu = $("#parentName");   //菜单名称文本框对象
		var getPreMenuId = $("#parentId");  	//上级菜单文本框对象id

		if (getSelected == null) {
			$.messager.alert("提示","请选择一行记录！"); 
		}else{
			//选择一行查看数据
			setValue(setPrevMenu,"setValue",getSelected.menuName); 
			setValue(getPreMenuId,"setValue",getSelected.menuId); 	
			returnMenu.dialog("close");
		}
	});



//触发dialog =E
// 新增菜单

	$('#savemenu').on("click",function(){
		
		var param = {};
		var menu = {};
		menu['menuName'] = $('#setMenuName').textbox('getValue');
		menu['menuNum'] = $('#setMenuVal').textbox('getValue');
		menu['menuImg'] = $('#setMenuImg').textbox('getValue');
	
		if($('#parentName').textbox('getValue')){
			menu['parentName'] = $('#parentName').textbox('getValue');
			menu['parentId'] = $('#parentId').textbox('getValue');
		}
		param.menu = menu;
		
		$.ajax({
			type:			'POST',
		    dataType:		"json",
		    contentType :	'application/json;charset=utf-8', //设置请求头信息
			url : 			'../../MenuController/saveOrUpdateMenu',
			data : 			JSON.stringify(param),
			success : function(data){
				if(data.result == 'success'){
					$.messager.alert('提示消息','操作成功','info');
					$("#setMenu").dialog("close");
					$('#menuData').datagrid('reload');
				}else{
					$.messager.alert('提示消息','操作失败','info');
				}
				
			},
			error : function(a) {
				$.messager.alert("警告", "操作失败！", "error");
			}
			
		});
	});
	
//删除行
	var removeMenu = $("#removeMenu");
	removeMenu.on("click",function(){
		var getStatus = menuData.datagrid("getSelected");

		if (getStatus == null) {
			$.messager.alert("提示","请选择一行记录！"); 
		}else{
			$.messager.confirm("删除确认","您确认想要删除记录吗？",function(result){
				if (result) {
	
					$.ajax({
						type:'post',
					    dataType:"json",
						url : '../../MenuController/deleteMenu',
						data : {menuId : getStatus.menuId},
						success : function(data){
							if(data.result == 'success'){
								$.messager.alert('提示消息',data.msg,'info');
								$("#setMenu").dialog("close");
								$('#menuData').datagrid('reload');
								
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
function createDialog(dialogs,title,width, height, isclosed,ismodal){
	dialogs.dialog({    
	    title : title ,    
	    width : width, 
	    height :height,
	    closed : isclosed,            
	    modal : ismodal,
	});
}

//事件触发dialog
function getDialog(id,event,param,status){
	id.on(event,function(){
		param.dialog(status);
	})

}

// 定义一个获取文本框并设置值的方法
function setValue(id,setOrGet,param){
	id.textbox(setOrGet,param);
}

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

		
