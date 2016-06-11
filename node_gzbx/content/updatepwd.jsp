<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/nav.css">
	</head>
	<body>

		<!-- 修改密码弹框 -->
		<div id="setNewPwd" class="easyui-dialog " data-options="width: 350, height:230, modal:true, title:'修改密码', closed:false">
			<form id="loginform" class="setpassword" action="<%=basePath%>UserController/login" method="post" >
				<li>
					<label>输入旧密码</label>
					<input id="account" type="hidden" name="account" value="${account}">
					<input id="diaOldPwd" type="password" name="diaOldPwd" required="required">
				</li>
				<li>
					<label>输入新密码</label>
					<input id="diaNewPwd" type="password" class="easyui-validatebox" name="password" data-options="validType:'length[6,12]'">
				</li>
				<li>
					<label>确认新密码</label>
					<input id="diaNewPwdConfirm" type="password" class="easyui-validatebox" name="diaNewPwdConfirm" validType="equals['#diaNewPwd']" >
				</li>
			</form>
			<a id="btnSure" href="#" class="easyui-linkbutton btnsure" data-options="iconCls:'iconok_win8'">确定</a>   

			<span class="pwdTips">建议 : 密码使用字母+数字、6~12位字符</span>
		</div>


		<!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
	</body>
</html>
