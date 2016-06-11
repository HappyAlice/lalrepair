<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title data-page="docuconfig" data-link="role">角色配置</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- 引入自定义css文件 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/nav.css">
		<style type="text/css">
			.roleInfomation{
				margin-left: 5%;
				width:90%;
				margin-top: 30px;
			}
			.roleRight{
				width: 100%;
			}
			.panelWrapper_title{
				height: 30px;
				background-color: #1558a6;
				color : #fff;
				font-size: 14px;
				line-height: 30px;
				padding-left: 20px;
			}
			.DialogForm{
				margin:20px 0 20px 20px;
			}
		</style>

	</head>
	<body class="easyui-layout">
	    <!-- 头部的导航条 -->
	    <div data-options="region:'north',border : false" >
	    	<jsp:include page="../business/nav.jsp"></jsp:include>
	    </div>

	    <!-- 树形菜单 -->
        <div data-options="region:'west',split:true, border:false" style="width:200px;    background: rgb(241, 241, 241);">
			<jsp:include page="treemenu.jsp"></jsp:include>
	    </div> 

	    <!-- 中间内容框 -->
	    <div data-options="region:'center'">
	        <div class="easyui-tabs" id="role_tabs" data-options="fit:true">
		    	<div title="角色列表">   
		    		<div class="easyui-layout windowSize" data-options="fit:true,border:false" style="height:520px;">
					    <div data-options="region:'north',border:false">
					        <div class="searchIndex">
					            <ul>
					                <li>
					                    <label>关键字:</label>
					                    <input id="txtQueryRoleName" name="txtQueryRoleName" class="easyui-textbox" style="width:150px;">
					                </li>
					                <a style="margin-top:3px;" id="search" href="##" class="easyui-linkbutton" 
					                data-options="iconCls:'icon_search',plain:true">查询</a>
					            </ul>
					        </div>
					    </div>
					    <div data-options="region:'center',border:false">
					        <table id="tblQueryRoleList" class="easyui-datagrid"></table>
							
					    </div>
					</div>
				</div>

				<div title="角色启用人数"> 
					<div class="easyui-layout windowSize" data-options="fit:true,border:false" style="height:520px;">
						<div data-options="region:'center',border:false">
							<table id="role_use" class="easyui-datagrid"></table> 
					    </div>
					</div>  
				</div>
	        </div>
	    </div>   


        <!-- 角色查看对话框 -->
        <div id="checkRoleDialog">
			<div id="checkRolePanelWrapper" >
				<div id="checkRoleInfomation" class="easyui-panel">
					<p class="panelWrapper_title" style="margin:0;">角色信息</p>
					<form id="checkRoleDetail" class="DialogForm">
						<label>角色名称：</label>
						<input type="hidden" id="roleId" >
						<input type="text" id="roleName" class="easyui-textbox" >
						<label>角色描述：</label>
						<input type="text" id="roleRemark" class="easyui-textbox" style="width:500px" > 
					</form>
					<div id="checkRoleRight" class="easyui-panel">
						<p class="panelWrapper_title" style="margin:0;">角色权限</p>
						<table id="checkRoleRightDataGrid"></table>
					</div>
				</div>
				<a id="btn_submit"  class="easyui-linkbutton" data-options="iconCls:'iconok_win8'" style="display:block;float:right;margin-top:15px;" id="checkRoleBtn">提交</a>
			</div>
		</div>  
		
		<!--    修改密码弹框      -->
		<jsp:include page="../setpwd.jsp"></jsp:include>


        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/role.js"></script>
	</body>
</html>