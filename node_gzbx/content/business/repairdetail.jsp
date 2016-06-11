<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
		<title></title>
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/reset.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/panel.css">
	</head>
	<body>
		<div class="wapContent">
		  	<!-- 报修列表 -->
			<div id="reportList" >
				<form >
					<ul>
						<li class="reportForm">
							<label>报修人:</label>
							<input class="easyui-textbox" id="repairMan" type="text" style="width:116px" readonly="readonly">
						</li>
						<li class="reportForm">
							<label>报修单位:</label>
							<input class="easyui-textbox" id="department" type="text" style="width:116px" readonly="readonly">
						</li>
						<li class="reportForm">
							<label>报修电话:</label>
							<input class="easyui-textbox" id="telepone" type="text" style="width:116px" readonly="readonly">
						</li>
						<li class="reportForm">
							<label>报修时间:</label>
							<input class="easyui-textbox" id="repairTime" type="text" style="width:146px" readonly="readonly">
						</li>
					</ul>
				</form>
			</div>
			
			<!-- 问题列表 -->
			<div id="questionList">
				<table class="easyui-datagrid"
				 data-options="
					url:'<%=basePath%>ProblemController/findProblemByRepairId',
					queryParams : {repairId : '${param.repairId}'},
					border:false,
					nowrap:false,
					rownumbers:true,
					fitColumns:true">
				    <thead>
				        <tr>
				            <th data-options="field:'problemNum',width:154,align:'center'">问题编号</th>   
				            <th data-options="field:'problemState',width:78,align:'center',formatter:problemState">状态</th>   
				            <th data-options="field:'dealMan',width:52,align:'center'">处理人</th>   
				            <th data-options="field:'category',width:55,align:'center'">报修类别</th>      
				            <th data-options="field:'project',width:55,align:'center'">报修项目</th>   
				            <th data-options="field:'problemContent',width:154,align:'center'">报修内容</th>
				            <th data-options="field:'isComplaint',width:32,align:'center',formatter:isComplaint">投诉</th>   
				            <th data-options="field:'actualTime',width:78,align:'center'">完成时间</th>
				            <th data-options="field:'combine',width:128,align:'center'">合并状态</th>
				            <th data-options="field:'enclosure',width:52,align:'center',formatter:enclosure">附件</th>
				            <th data-options="field:'blank',width:46,align:'center',formatter:detail ">详情</th>
				        </tr>   
				    </thead>   
				</table>
			</div>
			
			<!-- 过程记录 -->
			<div style="width:950px;clear:both">
				<div  style="width:805px;float:left; margin-right:5px;">
					<div id="repairListDetail"  class="easyui-panel" data-options="title:'过程列表',collapsible:false,headerCls:'myHeader'">
				    	<form id="prossess"></form>
				    </div>  
				</div>
			    <div id='processImg' class="easyui-panel" data-options="title:'流程图',collapsible:false,headerCls:'myHeader'" style="width:140px; height:512px;"></div>
			</div>
		</div>
		<script type="text/javascript" src = "<%=basePath%>js/jquery.min.js"></script>
		<script type="text/javascript" src = "<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src = "<%=basePath%>js/repairdetail.js"></script>
	</body>
</html>