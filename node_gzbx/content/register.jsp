<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title>注册界面</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath%>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/reset.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/relogin.css">
	</head>
	<body>
		<div class="register-wrapper">
			<img src="<%=basePath%>logo_l.png" style="float: left"></img>
			<h1>故障报修系统</h1>
			<form id="register" class="register-form" action="<%=basePath%>Register/register" method="post">
				<ul>
					<li>
						<label>登录账号：</label>
						<input type="text" id="account" class="account required" name="account">
						<span id="register-account"></span>
					</li>
					<li>
						<label>登录密码：</label>
						<input type="password" id="password" class="password required" name="password">
						<span id="register-pwd"></span>
					</li>
					<li>
						<label>确认密码：</label>
						<input type="password" id="repassword" class="repassword required" name="repassword">
						<span id="register-rePwd"></span>
					</li>
					<li>
						<label>用户姓名：</label>
						<input type="text" id="userName" class="username required" name="userName">
						<span id="register-useName"></span>
					</li>
					<li>
						<label>公司名称：</label>
						<select type="text" id="company" class="company" name="company"></select>
						<span id="register-company"></span>
					</li>
					<li>
						<label>部门名称：</label>
						<select type="text" id="department" class="department" name="department"></select>
					</li>
					<li>
						<label>电话号码：</label>
						<input type="text" id="telephone" class="telephone required" name="telephone">
						<span id="register-telnum"></span>
					</li>
					<li>
						<label>邮箱地址：</label>
						<input type="text" id="mail" class="mail required" name="mail">
						<span id="register-mail"></span>
					</li>
					<li>
						<label>验证码：</label>
						<input type="text" id="code" class="code required" name="code">
						<img id="checkImg" class="captchaImage" src="<%=basePath%>Register/checkImg" title="点击更换验证码">
					    <a href="javascript:void(0);" id="img" class="imgchange">看不清楚</a>
						<span id="register-code" style="padding:inherit"></span>
					</li>
				</ul>
			</form>
			<button id="submit" class="submit">注册</button>
			<span class= "login">已有账号！<a href="<%=basePath%>content/login.jsp">立即登录</a></span>

			<!-- 引入jQuery的js文件 -->
			<script type="text/javascript" src="<%=basePath%>js/jquery.js"></script>
			<script type="text/javascript" src="<%=basePath%>js/validator.js"></script>
			
		</div>
	</body>
</html>