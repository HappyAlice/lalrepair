<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title>登陆页面</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath%>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/reset.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/relogin.css">
	</head>
	<body>
		<div class="login-wrapper">
			<img src="<%=basePath%>logo_l.png" style="float: left"></img>
			<h1>故障报修系统</h1>
			<form class="login-form" action="<%=basePath%>UserController/login" method="post">
				<ul>
					<li>
						<input type="text" id="account" class="account" name="account">
					</li>
					<li>
						<input type="password" id="password" class="password" name="password">
					</li>
				</ul>
				<input type="submit" id="submit" class="submit" value="登录">
			</form>
			<span class= "register">没有账号？<a href="<%=basePath%>content/register.jsp">立即注册</a></span>
		</div>
		<footer>
			<address><small>建议使用IE8以上浏览器，分辨率不低于1280*780 CopyRight2&2016-2018 集美学村</small></address>
		</footer>
		
		<script type="text/javascript">
				var info = '${param.from}';
				if(info=="register"){
					alert("注册成功，等待管理员审批");
				}
				if('${info}'){
					alert('${info}');
				}
		</script>

	</body>
</html>