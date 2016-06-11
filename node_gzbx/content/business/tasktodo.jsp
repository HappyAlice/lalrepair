<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title data-page="taskto">我的任务</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/reset.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- 引入自定义css样式 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/todotask.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/nav.css">
	</head>
	<body>
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north', border:false" >
				<jsp:include page="nav.jsp"></jsp:include>
				<div class="backgroundcolor">
					<span class="taskTips">您共有<em id="taskTips"></em>条待办任务,其中：</span>
				</div>
			</div>
			<div data-options="region:'center', border:false">

			<shiro:hasRole name="biller">
				<div id="taskTodo" class="panels" style="float:left">
					<div class="taskCatogry" style="height:100%">
						<dl>
							<dt class="panelTitle">待受理的报修单 <a class="panelTitleMore" href="<%=basePath%>content/biller/repairlist.jsp">更多</a></dt>
						</dl>
						<ul id="taskTodoul" class="taskList">
							
						</ul>
					</div>	
				</div>
			</shiro:hasRole>

			<shiro:hasRole name="dispacher">
				<div id="complainTodo" class="panels" style="float:left">
					<div class="taskCatogry" style="height:100%">
						<p class="panelTitle">待处理的投诉 <a class="panelTitleMore" href="<%=basePath%>content/dispacher/problemlist.jsp">更多</a></p>
						<ul id="complainTodoul" class="taskList">
							
						</ul>
					</div>
				</div>
			</shiro:hasRole>

			<shiro:hasRole name="dispacher">
				<div id="delayTodo" class="panels" style="float:left">
					<div class="taskCatogry" style="height:100%">
						<p class="panelTitle">待审批的延期 <a class="panelTitleMore" href="<%=basePath%>content/dispacher/problemlist.jsp">更多</a></p>
						<ul id="delayTodoul" class="taskList">
							
						</ul>
					</div>
				</div>
			</shiro:hasRole>

			<shiro:lacksRole name="admin">
				<div id="commentTodo" class="panels" style="float:left">
					<div class="taskCatogry" style="height:100%">
						<p class="panelTitle">待评价的问题 <a class="panelTitleMore" href="<%=basePath%>content/business/myproblemlist.jsp">更多</a></p>
						<ul id="commentTodoul" class="taskList">
							
						</ul>
					</div>
				</div>
			</shiro:lacksRole>

			<shiro:hasRole name="dispacher">
				<div id="deparctureTodo" class="panels" style="float:left">
					<div class="taskCatogry" style="height:100%">
						<p class="panelTitle">待派发的报修单 <a class="panelTitleMore" href="<%=basePath%>content/dispacher/deparcturelist.jsp">更多</a></p>
						<ul id="deparctureTodoul" class="taskList">
							
						</ul>
					</div>
				</div>
			</shiro:hasRole>

			<shiro:hasRole name="handler">
				<div id="problemTodo" class="panels" style="float:left">
					<div class="taskCatogry" style="height:100%">
						<p class="panelTitle">待处理的问题 <a class="panelTitleMore" href="<%=basePath%>content/handler/mytask.jsp">更多</a></p>
						<ul id="problemTodoul" class="taskList">
						
						</ul>
					</div>
				</div> 
			</shiro:hasRole>
				
			</div>

		</div>
	</div>
		<!--    修改密码弹框      -->
		<jsp:include page="../setpwd.jsp"></jsp:include>

		<!-- 引入jQuery的js文件 -->
		<script type="text/javascript" src="<%=basePath%>js/jquery.js"></script>
		<!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/tasktodo.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
	</body>
</html>
