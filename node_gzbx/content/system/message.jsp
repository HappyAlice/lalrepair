<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title data-page="docuconfig" data-link="message">消息管理</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath%>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- 引入自定义css文件 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/nav.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/auth.css">
		
		
	</head>
	<body class="easyui-layout">
		
	    <div data-options="region:'north', border : false" >
		    <!-- 头部的导航条 -->
			<jsp:include page="../business/nav.jsp"></jsp:include> 
	    </div>  
	    <!-- 中间内容部分 -->
	    <div data-options="region:'center', border : false" style="background:#eee;">
			<!-- 搜索条件 -->
			<div id="messageToolbar">
				<form id="searchIndex" class="searchIndex">
					<ul class="messageSearchIndex" style="padding-bottom:0px;">
						<li>
							<label>Email:</label>
							<input id="email" type="text" name="toAddress" class="easyui-textbox email" >
						</li>
						<li>
							<label>主题:</label>
							<input id="count" type="text" name="subject" class="easyui-textbox account" >
						</li>
						<li>
							<label>状态:</label>
							<select id="state" class="easyui-combobox input_mid" name="userState" data-options="panelHeight:'auto',editable:false">
									<option value="" selected="selected">全部</option>
									<option value="1">发送成功</option>
									<option value="0">发送失败</option>
								</select>
						</li>
						<a id="search" class="easyui-linkbutton" data-options="iconCls:'icon_search',plain:true">查询</a>
						<a href="#" id="emailSend" class="easyui-linkbutton" data-options="iconCls:'iconok_win8',plain:true">确认发送</a>	
					</ul>	
				</form>
			</div>
			
			<!--     表格     -->
	    	<table id="emailTable" class="easyui-datagrid" data-options="
		    		url:'<%=basePath%>MailController/findMail',
		    		fit:true,
		    		toolbar:'#messageToolbar',
		    		rownumbers:true,
		    		fitColumns:true,
		    		border:false,
		    		pagination:true,
		    		pageSize:5,
		    		pageList:[5,10,15,20,25],
		    		columns:[[
		    			{field:'toAddress', title:'E-mail', width:250, align:'center'},
		    			{field:'time', title:'发送时间', width:250, align:'center'},
		    			{field:'subject', title:'标题', width:250, align:'center'},
		    			{field:'state', title:'状态', width:150, align:'center',formatter:state},
		    			{field:'allowNumbers', title:'允许次数', width:100, align:'center',formatter:allowNumbers},
		    			{field:'num', title:'重发次数', width:100, align:'center'},
		    			{field:'operation', title:'操作', width:150, align:'center',formatter:operation}
		    		]]
		    		"></table>
	    </div>
	    		
    	<!-- 左侧树形菜单 -->
	    <div data-options="region:'west',split:true, border : false" style="width:200px;" class="slidemenu">
    		 <jsp:include page="treemenu.jsp"></jsp:include> 
	    </div>
	    
	    <!--    修改密码弹框      -->
		<jsp:include page="../setpwd.jsp"></jsp:include>
	    
	    
		<!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
	
		<!-- 引入自定义js文件 -->
		<script type="text/javascript" src="<%=basePath%>js/message.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
	</body>
</html>