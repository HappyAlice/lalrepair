<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title data-page="dispatcher">任务派发</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- 引入自定义css文件 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/nav.css">
	</head>
	<body class="easyui-layout">
		<!-- 头部的导航条 -->
	    <div data-options="region:'north',border:false" >
	    	<jsp:include page="../business/nav.jsp"></jsp:include>
	    </div> 

	    <!-- 中间内容部分 -->
	    <div data-options="region:'center',border:false" style="padding:5px;background:#eee;">
	    	<div class="easyui-layout" data-options="fit: true">
	    		<div data-options="region:'north',border:false">
	    			<!-- 搜索条件 -->
					<form id="taskSearchIndex" class="searchIndex">
						<ul class="searchShow">
							<li>
								<label>编号批次:</label>
								<input id="repairNum" type="text" name="repairNum" class="easyui-textbox input_larg" >
							</li>
							<li>
								<label>报修部门:</label>
								<input id="department" type="text" name="department" class="easyui-textbox input_larg" >
							</li>
						
							<li>
								<label>报修人:</label>
								<input id="repairMan" type="text" name="repairMan" class="easyui-textbox input_smal" >
							</li>
							<li>
								<label>报修级别:</label>
								<input id="level" type="text" name="level" class="easyui-textbox input_smal" >
							</li>
							<li>
								<label>报修时间:</label>
								<input id="level" type="text" name="repairTime" class="easyui-datebox input_xmid" data-options="editable:false, formatter:formatter, parser:parser"/> 
							</li>
							<li>
								<label>至:</label>
								<input id="toTime" type="text" name="finishTime" class="easyui-datebox input_xmid" data-options="editable:false, formatter:formatter, parser:parser"/> 
							</li>
								
							<li id="repSearch">
								<a id="taskSearch" class="easyui-linkbutton" data-options="iconCls:'icon_search',plain:true">查询</a>
							</li> 
							<li id="repReset">
								<a id="repReset" class="easyui-linkbutton" data-options="plain:true, iconCls:'icon_reset'">重置</a>
							</li> 
						</ul>	
					</form>
	    		</div>
	    		<div data-options="region:'center',border:false">
	    			<!--     表格     -->
			    	<table id="departture" class="easyui-datagrid" 
				    	data-options="
				    	url : '../../RepairController/findByCondition',
				    	queryParams : {from : 'task'},
				    	fitclumns: true,
				    	pagination: true,
				    	pageSize: 10,
				    	pageList:[10, 15, 20],
				    	rownumbers: true,
				    	singleSelect: true,
				    	border: false,
				    	autoRowHeight: true,
				    	fit: true,
				    	toolbar:'#departtureButton'">
			    		<thead>
			    			<tr>
			    				<th data-options="field :'detail',width : 80, align:'center',formatter:detail">详情</th>
				    			<th data-options="field :'repairNum',  width : 150, align:'center'">批次编号</th>
				    			<th data-options="field :'repairState', width : 150, align:'center',formatter:repairState">状态</th>
			    				<th data-options="field :'department',  width : 80, align:'center'">报修部门</th>
					    		<th data-options="field : 'repairMan', width : 150, align:'center'">报修人</th>
					    		<th data-options="field : 'level', width : 100, align:'center',formatter:level">级别 </th>
			    				<th data-options="field :'repairTime',  width : 150, align:'center'">报修时间 </th>
					    		<th data-options="field : 'acceptTime', width : 150, align:'center'">受理时间</th>
					    		<th data-options="field :'planTime',  width : 150, align:'center'">计划完成时间 </th>
			    				<th data-options="field :'finishTime',  width : 150, align:'center'">完成时间 </th>
			    			</tr>
			    		</thead>
			    	</table>

			    	<!-- toolbar -->
			    	<div id="departtureButton">
			    		<a id="departturebtn"  href="#" class="easyui-linkbutton" data-options="iconCls:'icon_edit_add',plain:true">任务派发</a>
			    	</div>
	    		</div>
	    	</div>				
	    </div>	 

		<!--    修改密码弹框      -->
		<jsp:include page="../setpwd.jsp"></jsp:include>

		<!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		
		<!-- 引入自定义js文件 -->
		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/deparcturelist.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/dateformate.js"></script>
	</body>
</html>