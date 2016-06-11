<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title data-page="mytask">我的任务</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/reset.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- 引入自定义css文件 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/nav.css">
	</head>
	<body class="easyui-layout">
		<!-- 头部的导航条 -->
	    <div data-options="region:'north', border: false" role="navigation">
	    	<jsp:include page="../business/nav.jsp"></jsp:include>
	    </div> 

	    <!-- 中间内容部分 -->
	    <div data-options="region:'center', border: false" style="background:#eee;">
			
			<!-- toolbar -->
	    	<div id="mytaskSearchIndex">
	    		<!-- 搜索条件 -->
				<form id="SearchIndex" class="mtSearchIndex" name="searchform">
					<ul class="searchShow">
						<li>
							<label>状态:</label>
							<select id="repState" class="easyui-combobox input_smal" name="problemState" data-options="editable:false,panelHeight:'auto'">
								<option value="" selected="selected">全部</option>
								<option value="1">未受理</option>
								<option value="2">处理中</option>
								<option value="3">已处理</option>
								<option value="4">已拒绝</option>
								<option value="5">已结案</option>
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
							<label>报修时间:</label>
							<input id="fromTime" type="text" name="repairTime" class="easyui-datebox input_xmid" data-options="editable:false">  <!-- data-options="formatter:formatter,parser:parser" -->
						</li>
						<li>
							<label>至:</label>
							<input id="toTime" type="text" name="finishTime" class="easyui-datebox input_xmid" data-options="editable:false"> <!-- data-options="formatter:formatter,parser:parser" -->
						</li>
							
						<li id="repSearch">
							<a id="search" class="easyui-linkbutton" data-options="iconCls:'icon_search',plain:true">查询</a>
						</li> 
						<li id="mytaskSearchAdd" class="rm_search_add"></li>
						
						<li id="repReset">
							<a id="reset" class="easyui-linkbutton" data-options="plain: true,iconCls:'icon_reset'" >重置</a>
						</li> 
					</ul>	
					
					<!-- 	隐藏的搜索条件 点击添加后出现或者隐藏 -->
					<ul id="searchHide">
						<li>
							<label>是否过期:</label>
							<select id="timeOut" class="easyui-combobox input_smal" name="isDelay"  data-options="editable:false,panelHeight:'auto'">
								<option value="" selected="selected">全部</option>
								<option value="1">是</option>
								<option value="0">否</option>
							</select>
						</li>
						<li>
							<label>有无投诉:</label>
							<select id="isComplain" class="easyui-combobox input_smal" name="isComplaint"  data-options="editable:false,panelHeight:'auto'">
								<option value="" selected="selected">全部</option>
								<option value="1">有</option>
								<option value="0">无</option>
							</select>
						</li>
						<li>
							<label>投诉处理:</label>
							<select id="doComplain" class="easyui-combobox input_smal" name="isDealComplaint"  data-options="editable:false,panelHeight:'auto'">
								<option value="" selected="selected">全部</option>
								<option value="1">已处理</option>
								<option value="0">未处理</option>
							</select>
						</li>
						<li>
							<label>是否已评价:</label>
							<select id="isComment" class="easyui-combobox input_smal" name="isEvaluate"  data-options="editable:false,panelHeight:'auto'">
								<option value="" selected="selected">全部</option>
								<option value="1">是</option>
								<option value="0">否</option>
							</select>
						</li>
						<li>
							<label>报修部门:</label>
							<input id="repDepartment" type="text" name="department" class="easyui-textbox input_larg" >
						</li>
						<li>
							<label>报修内容:</label>
							<input id="repContent" type="text" name="problemContent" class="easyui-textbox input_larg" >
						</li>
					</ul>
				</form>

				<!-- toolbar -->
		    	<div id="mydutyButton">
		    		<a id="afterRecord" class="easyui-linkbutton" data-options="iconCls:'icon_trackRecord_win8',plain:true">跟踪记录</a>
					<a id="applyDelay" class="easyui-linkbutton" data-options="iconCls:'icon_shenqing',plain:true">申请延期</a>
					<a id="finished" class="easyui-linkbutton" data-options="iconCls:'iconok_win8',plain:true">处理完成</a>
					<a id="problemEdit" class="easyui-linkbutton" data-options="iconCls:'iconok_win8',plain:true">问题编辑</a>
		    	</div>	
	    	</div>
	    	
   			<!--     表格     -->
	    	<table id="mydutyTable" class="easyui-datagrid" 
		    	data-options="
		    	url : '<%=basePath%>ProblemController/showMyTask',
		    	fitclumns: true,
		    	pagination: true,
		    	border : false,
		    	pageSize: 10,
		    	pageList:[10, 15, 20,30],
		    	rownumbers: true,
		    	singleSelect: true,
		    	border: false,
		    	autoRowHeight: true,
		    	fit: true,
		    	toolbar:'#mytaskSearchIndex'">
	    		<thead>
	    			<tr>
	    				<th data-options="field :'detail',width : 50, align:'center',formatter:detail">详情</th>
		    			<th data-options="field :'repairNum',  width : 150, align:'center'">批次编号</th>
		    			<th data-options="field :'problemNum', width : 150, align:'center'">问题编号</th>
	    				<th data-options="field :'problemState',  width : 80, align:'center', formatter:problemState">状态</th>
			    		<th data-options="field :'problemAddress', width : 100, align:'center'">报修地点</th>
			    		<th data-options="field :'repairMan', width : 100, align:'center'">报修人</th>
	    				<th data-options="field :'dealMan',  width : 110, align:'center'">处理人</th>
			    		<th data-options="field :'level', width : 100, align:'center',formatter:level">报修级别</th>
			    		<th data-options="field :'project',  width : 150, align:'center'">报修项目</th>
	    				<th data-options="field :'problemContent',  width : 150, align:'center'">报修内容</th>
	    				<th data-options="field :'repairPhone',  width : 100, align:'center'">报修电话</th>
	    				<th data-options="field :'mark',  width : 80, align:'center'">满意度</th>
	    			</tr>
	    		</thead>
	    	</table>
		
	    </div>

	    <!-- 完成记录弹框 -->
		<jsp:include page="recordfinished.jsp"></jsp:include>	 


		<!-- 问题编辑弹框 -->
		<div id="problemEditDialog">
			<ul class="problemEditDialog">
				<li>
					<label>报修类别:</label>
					<input type="text" id="repairClass" class="easyui-combobox" name="repairClass" data-options="panelHeight:'auto', editable: false">
				</li>
				<li>
					<label>报修项目:</label>
					<input type="text" id="repairProject" class="easyui-combobox" name="repairProject" data-options="panelHeight:'auto', editable: false">
				</li>
				<li>
					<label>报修明细:</label>
					<input type="text" id="repairDetail" class="easyui-combobox" name="repairDetail" data-options="panelHeight:'auto', editable: false">
				</li>
				<li>
					<label>资产编号:</label>
					<input type="text" id="goodsNum" class="easyui-textbox" name="goodsNum" value="">
				</li>
			</ul>
			<div id="problemEditbtn">
				<a id="problemEditClose" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'">关闭</a>  
				<a id="editSubmit" href="#" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">确认</a>  
			</div>
		</div>		
		
			

		<!-- 引入jQuery的js文件 -->
		<%-- <script type="text/javascript" scr="<%=basePath%>js/jquery.js"></script> --%>
		<!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		<!-- 引入自定义js文件 -->
		<script type="text/javascript" src="<%=basePath%>js/mytask.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/dateformate.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
	</body>
</html>