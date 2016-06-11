<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset= "utf-8">
		<title>啊哦~出错啦</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/error.css">
	</head>
	<body>
		<div class="error">
			<img src="<%=basePath%>images/error.png">
			<span>${error}</span>
			<a href="<%=basePath%>content/login.jsp">重新登录</a>
		</div>
	</body>
</html>
