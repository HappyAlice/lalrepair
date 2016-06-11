<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title>处理记录</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- 引入自定义css文件 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
	</head>
	<body>
		<div class="panelwrap">
			<div id="dealRecord" class="record">
				<!-- Toolbar -->
				<div id="recordToolbar" >
					<a id="btn_add" class="easyui-linkbutton" data-options="iconCls:'icon_edit_add', plain:true">新增记录</a>
					<a id="btn_delet" class="easyui-linkbutton" data-options="iconCls:'icon_edit_remove', plain:true">删除</a> 
				</div>

				<!-- 表格 -->
				<table id="recordTable"></table>
			</div>
			<span class="worn">注意:若报修信息有误或填写不全,请在处理记录中说明!</span> 
		</div>	

		<!-- 新增记录弹框 -->
		<div id="newRecord">
			<ul class="add_content">
				<li>
					<label class="add">新增内容:</label>
					<textarea class="content"></textarea>
					<div id="newRecordbtn">
						<a id="btnClose" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'">关闭</a>  
						<a id="btnSubmit" href="#" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">提交记录</a>  
					</div>
				</li>
			</ul>
		</div>


		<!-- 引入jQuery的js文件 -->
		<script type="text/javascript" scr="<%=basePath%>js/jquery.js"></script>
		<!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script rel="stylesheet" type="text/css" href="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		<!-- 引入自定义js文件 -->
		<script type="text/javascript" src="<%=basePath%>js/dealrecord.js"></script>
	</body>
</html>