<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<!DOCTYPE html>
<html>
	<head>
		<title data-page="docuconfig" data-link="auth">权限配置</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath%>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- 引入自定义css文件 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/nav.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/auth.css">
		
		
	</head>
	<body class="easyui-layout">
		
	    <div data-options="region:'north', border : false">
		    <!-- 头部的导航条 -->
			<jsp:include page="../business/nav.jsp"></jsp:include>
	    </div>  
	    <!-- 中间内容部分 -->
	    <div data-options="region:'center', border : false" style="background:#eee;">
	    	<!-- 搜索条件 -->
			<div id="authToolbar">
				<form id="searchIndex" class="searchIndex">
					<ul class="searchShow" style="padding-bottom:0px;">
						<li>
							<label>关键字:</label>
							<input id="keyWord" type="text" name="keyWord" class="easyui-textbox" >
						</li>
						<a id="search" class="easyui-linkbutton" data-options="iconCls:'icon_search',plain:true">查询</a>
					</ul>		
				</form>

				<!-- toolbar -->
		    	<div style="border-top:1px solid #DDD">
		    		<a id="addAuth" class="easyui-linkbutton" data-options="iconCls:'icon_edit_add', plain:true">新增权限</a>
		    		<a id="editAuth" class="easyui-linkbutton" data-options="iconCls:'icon_trackRecord_win8', plain:true">编辑权限</a>
		    		<a id="viewAuth" class="easyui-linkbutton" data-options="iconCls:'icon_search', plain:true">查看权限</a>
		    		<a id="deletAuth" class="easyui-linkbutton" data-options="iconCls:'icon_edit_remove', plain:true">删除</a>
		    	</div>
			</div>
			
			<!--     表格     -->
	    	<table id="authTable" class="easyui-datagrid" data-options="
	    		url:'<%=basePath%>AuthController/findAuth',
	    		fit:true,
	    		toolbar:'#authToolbar',
	    		rownumbers:true,
	    		singleSelect:true,
	    		fitColumns:true,
	    		border:false,
	    		pagination:true,
	    		pageSize:10,
	    		pageList:[10,15,20,25],
	    		columns:[[
	    			{field:'authName', title:'权限名称', width:100, align:'center'},
	    			{field:'authRemark', title:'权限描述', width:100, align:'center'}
	    		]]
	    		"></table>
	    </div>
	    		
    	<!-- 左侧树形菜单 -->
	    <div data-options="region:'west',split:true, border : false" style="width:200px;" class="slidemenu">
    		 <jsp:include page="treemenu.jsp"></jsp:include>
	    </div>

	    <!-- 弹出对话框 -新增权限-->
	    <div id="addAuthDialog">
	    	<div class="panelwrapper">
	    		<form id="setauthForm">
		    		<ul id="authMessage" class="authMessage">
				    	<li>
				    		<label>权限名称</label>
				    		<input type="hidden" id="authId" >
				    		<input type="text" id="authName" name="authName" class="easyui-textbox" required="required">
				    	</li>
			    		<li>
			    			<label>权限描述</label>
			    			<input type="text" id="authRemark" name="authRemark" class="easyui-textbox authDescrib">
			    		</li>
			    		<a id="sureBtn" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">确认</a>
			    	</ul>
		    	</form>
		    	<ul id="configureSource" class="configureSource" style="border:none;">
		    		<table id="sourcesTable"></table>
		    	</ul>
	    	</div>	
	    </div>
	    
	    <!--    修改密码弹框      -->
		<jsp:include page="../setpwd.jsp"></jsp:include>
	    
	  
		<!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
	
		<!-- 引入自定义js文件 -->
		<script type="text/javascript" src="<%=basePath%>js/auth.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
	</body>
</html>
