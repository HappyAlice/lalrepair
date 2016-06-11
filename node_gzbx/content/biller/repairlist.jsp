<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title data-page="report">报修列表</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- self css -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/nav.css">
	</head>
	<body>
		<div class="easyui-layout" data-options="fit:true">
			<!-- navigation -->
		    <div data-options="region:'north',border : false" >
		    	<jsp:include page="../business/nav.jsp"></jsp:include>
		    	
	   			<!-- searchbar -->
				<form id="searchIndex" class="searchIndex">
					<ul class="searchShow">
						<li>
							<label>状态:</label>
							<select id="repState" class="easyui-combobox input_mid" name="repairState" data-options="editable:false, panelHeight:'auto'">
								<option value="" selected="selected">全部</option>
								<option value="1">待受理</option>
								<option value="2">已受理</option>
								<option value="3">处理中</option>
								<option value="4">已处理</option>
								<option value="5">已拒绝</option>
								<option value="6">已结案</option>
							</select>
						</li>
						<li>
							<label>编号批次:</label>
							<input id="repairNum" type="text" name="repairNum" class="easyui-textbox input_larg" >
						</li>
						<li>
							<label>报修部门:</label>
							<input id="repDepartment" type="text" name="department" class="easyui-textbox input_larg" >
						</li>
					
						<li>
							<label>报修人:</label>
							<input id="repMan" type="text" name="repairMan" class="easyui-textbox input_smal" >
						</li>
						<li>
							<label>报修级别:</label>
							<input id="repLevel" type="text" name="level" class="easyui-textbox input_smal" >
						</li>
						<li>
							<label>报修时间:</label>
							<input id="fromTime" type="text" name="repairTime" class="easyui-datebox input_xmid" data-options="editable:false, formatter:formatter, parser:parser">
							<label>至:</label>
							<input id="toTime" type="text" name="finishTime" class="easyui-datebox input_xmid"  data-options="editable:false, formatter:formatter, parser:parser">
						</li>
							
						<li id="repSearch">
							<a id="rlSearch" class="easyui-linkbutton" data-options="iconCls:'icon_search',plain:true">查询</a>
						</li> 
						<li id="repReset">
							<a class="easyui-linkbutton" data-options="plain: true,iconCls:'icon_reset'" >重置</a>
						</li> 
					</ul>
				</form>
		    </div> 
	
		    <!-- center -->
		    <div data-options="region:'center', border: false">
	   			<!--     table     -->
		    	<table id="repListTable"></table>	
		    </div>
		    	
		</div>	 
			
		<jsp:include page="../setpwd.jsp"></jsp:include>

		<!-- easyui  js -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		<!-- self  js -->
		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/repairlist.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/dateformate.js"></script>	
	</body>
</html>