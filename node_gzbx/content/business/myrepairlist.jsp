<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title data-page="myreport">我的报修列表</title>
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
	    	<jsp:include page="nav.jsp"></jsp:include>
	    </div> 

	    <!-- 中间内容部分 -->
	    <div data-options="region:'center',border:false">
		    <div class="easyui-layout" data-options="fit:true">
		    	<!-- 搜索条件 -->
		    	<div data-options="region:'north', border: false">
					<form id="searchIndex" class="searchIndex">
						<ul class="searchShow">
							<li>
								<label>状态:</label>
								<select id="repState" class="easyui-combobox input_mid" name="repairState" data-options="panelHeight:'auto', editable:false">
									<option value="" selected="selected">全部</option>
									<option value="0">保存</option>
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
								<input id="repairNum" type="text" name="repairNum" class="easyui-textbox input_larg">
							</li>
							<li>
								<label>报修部门:</label>
								<input id="repDepartment" type="text" name="department" class="easyui-textbox input_larg">
							</li>
						
							<li>
								<label>报修人:</label>
								<input id="repMan" type="text" name="repairMan" class="easyui-textbox input_smal" >
							</li>
							<li>
								<label>报修时间:</label>
								<input id="fromTime" type="text" name="repairTime" class="easyui-datebox input_xmid" data-options="editable:false, formatter:formatter, parser:parser">
								<label>至:</label>
								<input id="toTime" type="text" name="finishTime" class="easyui-datebox input_xmid" data-options="editable:false, formatter:formatter, parser:parser">
							</li>
								
							<li id="repSearch">
								<a id="search" class="easyui-linkbutton" data-options="iconCls:'icon_search',plain:true">查询</a>
							</li> 
							<li>
								<a id="reset" class="easyui-linkbutton" data-options="plain: true,iconCls:'icon_reset'" >重置</a>
							</li> 
						</ul>	
					</form>
		    	</div>

		    	<div data-options="region:'center', border:false">
		    		<!--    表格     -->
					<table id="myRepairTable" class="easyui-datagrid" data-options="
						url : '../../RepairController/findByCondition',
						queryParams : {from : 'myrepair'},
					    pagination:true,
					    pageSize : 10,
						pageList : [10, 15, 20],
		                fit:true,
		                fitClumns: true,
		                rownumbers:true,
		                border:false,
		                singleSelect:true,
		                toolbar: '#toolButton'">
						<thead >
				    		<tr>
				    			<th data-options="field :'detail', width : 50, align:'center', formatter:detail">详情</th>
				    			<th data-options="field :'repairNum',  width : 150, align:'center'">批次编号</th>
				    			<th data-options="field :'repairState', width : 100, align:'center', formatter:repairState">状态</th>
				    			<th data-options="field : 'department', width : 150, align:'center'">报修部门</th>
				    			<th data-options="field : 'repairMan', width : 100, align:'center'">报修人</th>
				    			<th data-options="field : 'filler', width : 100, align:'center'">填单人</th>
				    			<th data-options="field : 'level', width : 100, align:'center', formatter:level">级别</th>
				    			<th data-options="field :'repairTime',  width : 140, align:'center'">报修时间</th>
				    			<th data-options="field :'acceptTime',  width : 140, align:'center'">受理时间</th>
				    			<th data-options="field :'planTime',  width : 140, align:'center'">计划完成时间</th>
				    			<th data-options="field :'finishTime',  width : 140, align:'center'">实际完成时间</th>
				    		</tr>
				    	</thead>
					</table>

					<div id="toolButton">
						<a href="<%=basePath%>content/business/addrepair.jsp" target="_blank" id="willrepair" class="easyui-linkbutton"
						 data-options="iconCls:'icon_edit_add',plain:true">我要报修</a>
						<a id="willedit" class="easyui-linkbutton" data-options="iconCls:'icon_trackRecord_win8',plain:true">编辑</a>
						<a id="willdelete" class="easyui-linkbutton" data-options="iconCls:'icon_edit_remove',plain:true">删除</a>

					</div>
		    	</div>
		    </div>
		   
	    
	    </div>
		 
		<!--    修改密码弹框      -->
		<jsp:include page="../setpwd.jsp"></jsp:include>

		<!-- easyui  js-->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		<!--sself  js -->
		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/myrepairlist.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/dateformate.js"></script>
	</body>
</html>