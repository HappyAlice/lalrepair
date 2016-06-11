<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title data-page="docuconfig" data-link="resource">资源配置</title>
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/reset.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/source.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/nav.css">
	</head>
	<body  class="easyui-layout">
		<!-- 头部的导航条 -->
	    <div data-options="region:'north',border: false">
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
			<form id="sourceSearch">
				<ul class="searchBar" style="border-bottom:1px solid #ddd;">
					<li class="menuName">
						<label>关键字:</label>
						<input class="easyui-textbox" id="sourceInput" type="text">
						<a id="sourceBtn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_search',plain:true">查询</a>  
					</li>
				</ul>
				<!-- 按钮组 =S -->
				<ul id="sourceButton">
					<li class="btnGroup">
						<a id="addSource" class="easyui-linkbutton" data-options="iconCls:'icon_edit_add',plain:true">新增资源</a>  
					</li>
					<li class="btnGroup">
						<a id="editSource" class="easyui-linkbutton" data-options="iconCls:'icon_trackRecord_win8',plain:true">编辑资源</a>  
					</li>
					<li class="btnGroup">
						<a id="removeSource"  class="easyui-linkbutton" data-options="iconCls:'icon_edit_remove',plain:true">删除</a>  
					</li>
				</ul>
				<!-- 按钮组 =E -->
			</form>
			<!-- 菜单搜索 =E -->			
			<!-- 表格 =S -->						
			<table id="sourceData"></table>
			<!-- 表格 =E -->
	    </div>	
	    <!-- 弹出对话框 -->
	    <!-- 新增菜单 =S -->
	    <div id="setSource">
	    	<form id="resource_form">
		    	<ul class="menuUl">
		    		<li>
		    			<label class="labelStyle">资源名称:</label>
		    			<input  type="hidden" id="setSourceId" >
		    			<input class="easyui-textbox" type="text" id="setSourceName" data-idtify="input" data-name="resourceName">
		    		</li>
		    		<li>
		    			<label class="labelStyle">资源值:</label>
		    			<input class="easyui-textbox" type="text" id="setSourceVal" data-idtify="input" data-name="resourceUrl">
		    		</li>
		    		<li>
		    			<label class="labelStyle">所属菜单:</label>
		    			<input class="easyui-textbox" type="text" id="setSourceMenu" readonly data-idtify="input" data-name="belongMune">
		    			<input type="hidden"  id="setSourceMenuId"  >
		    		</li> 
			    	<a  class="easyui-linkbutton" data-options="iconCls:'iconok_win8'" id="confirmBtn">确认</a> 
			    	<a  class="easyui-linkbutton" id="selectPreMenu">选择上级菜单</a>  
		    	</ul>
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
								<input class="easyui-textbox" id="menuLevelInput" type="text">
								<a id="mLevelBtn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_search',plain:true">查询</a>  
							</li>
						</ul>
					</form>
					<div id="buttons">	
						<a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">确认</a> 
					</div>
					<!-- 菜单搜索 =E -->
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
		   

		<script type="text/javascript" src = "<%=basePath%>js/jquery.min.js"></script>
		<script type="text/javascript" src = "<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src = "<%=basePath%>js/resource.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
	</body>
</html>
