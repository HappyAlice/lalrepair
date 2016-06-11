<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
		<title data-page="docuconfig" data-link="menu">菜单配置</title>
		<link rel="shortcut icon" href="<%=basePath%>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/reset.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/menu.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/menuLevel.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/nav.css">
	</head>
	<body  class="easyui-layout">
		<!-- 头部的导航条 -->
	    <div data-options="region:'north',border: false" >
	    	<jsp:include page="../business/nav.jsp"></jsp:include>
	    </div> 
	    <!-- 左侧树形菜单 -->
	    <div data-options="region:'west',split:true, border:false" style="width:200px;" class="slidemenu">
	    	<!-- 树形菜单 -->
			<jsp:include page="treemenu.jsp"></jsp:include>
	    </div> 
	    <!-- 中间内容部分 -->

	    <div data-options="region:'center', border:false">
	    	<!-- 菜单搜索 =S -->
			<form id="menuSearch">
				<ul class="searchBar">
					<li class="menuName">
						<label>菜单名称:</label>
						<input class="easyui-textbox" id="menuInput" type="text">
						<a id="menuBtn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_search',plain:true">查询</a>  
					</li>
				</ul>
				<!-- 按钮组 =S -->
				<ul id="menuButton">
					<li class="btnGroup">
						<a id="addMenu" href="#setMenu" class="easyui-linkbutton" data-options="iconCls:'icon_edit_add',plain:true">新增菜单</a>  
					</li>
					<li class="btnGroup">
						<a id="editMenu" href="#setEeditMenu" class="easyui-linkbutton" data-options="iconCls:'icon_trackRecord_win8',plain:true">编辑菜单</a>  
					</li>
					<li class="btnGroup">
						<a id="removeMenu" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_edit_remove',plain:true">删除</a>  
					</li>
				</ul>
				<!-- 按钮组 =E -->
			</form>
			<!-- 菜单搜索 =E -->			
			<!-- 表格 =S -->						
			<table id="menuData"></table>
			<!-- 表格 =E -->
	    </div>	
	    <!-- 弹出对话框 -->
	    <!-- 新增菜单 =S -->
	    <div id="setMenu">
	    	<form id="setmenuForm" class="menuUl">
	    		<li>
	    			<label class="labelStyle">菜单名称:</label>
	    			<input class="easyui-textbox" type="text" id="setMenuName">
	    		</li>
	    		<li>
	    			<label class="labelStyle">排序值:</label>
	    			<input class="easyui-textbox" type="text" id="setMenuVal">
	    		</li>
	    		<li>
	    			<label class="labelStyle">菜单图片:</label>
	    			<input class="easyui-textbox" type="text" id="setMenuImg">
	    		</li>
	    		<li>
	    			<label class="labelStyle">上级菜单:</label>
	    			<input type="hidden" class="easyui-textbox" id="parentId" name="parentName" />
	    			<input class="easyui-textbox" type="text" id="parentName" disabled="disabled">
	    		</li> 
		    	<a href="#" id="savemenu" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">确认</a> 
		    	<a href="#returnMenu" id="prevMenu" class="easyui-linkbutton">选择上级菜单</a>  
	    	</form>
	    </div>
	    <!-- 新增菜单 =E -->


	    <div id="returnMenu">
			<div class="wapContent">
				<!-- 选择上级菜单 =S -->
				<div id="cPrevMenu">
					<!-- 菜单搜索 =S -->
					<form id="menuLevelSearch">
						<ul class="searchBar">
							<li class="menuName">
								<label>菜单名称:</label>
								<input class="easyui-textbox" id="menuLevelInput" type="text" name="menuName">
								<a id="mLevelBtn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_search',plain:true">查询</a>  
							</li>
						</ul>
					</form>
					<!-- 菜单搜索 =E -->
					<a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">确认</a> 
				</div>
				<!-- 选择上级菜单 =E -->

				<!-- 菜单列表 =S -->
				<div id="menuList">
					<table id="menuLevelData"></table>
				</div>
				<!-- 菜单列表 =E -->
			</div>
		</div>
		
		 <!--    修改密码弹框      -->
		<jsp:include page="../setpwd.jsp"></jsp:include>
	    
		<script type="text/javascript" src ="<%=basePath%>js/jquery.min.js"></script>
		<script type="text/javascript" src ="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src ="<%=basePath%>js/menu.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
	</body>
</html>