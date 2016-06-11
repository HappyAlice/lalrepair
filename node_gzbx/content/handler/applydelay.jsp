<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title>申请延期</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- 引入自定义css文件 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
	</head>
	<body>
		<div class="panelwrap">
			<div id="applyDelay" class="delay">
				<ul>
					<li class="abouttime">
						<label class="delay">延期时间:</label>
						<input type="number" id="delayTime" class="delaytime" name="delayTime">
						<label>小时</label>
					</li>
					<li>
						<label class="introduction">延期说明:</label>
						<textarea id="introduce" name="introduce" class="delaytime"></textarea>
					</li>
					<!-- <li>
						<label class="enclosure">附件名称:</label>
						<input type="text" id="enclosureName" class="enclosurename" name="enclosureName">
					</li> -->
					<!-- <li>
						<label class="update">附件上传:</label>
						<textarea type="text" id="enclosureUpdate" class="enclosureupdate" name="enclosureUpdate">请点击此处选择文件上传，仅支持单个文件</textarea>
					</li> -->
					<li id="delayBtn">
						<!-- <a id="delayBtnDelet" href="#" class="easyui-linkbutton">删除附件</a>   -->
						<a id="delayBtnClose" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'">关闭</a>  
						<a id="delayBtnSubmit" href="#" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">提交记录</a>  
					</li>
				</ul>
			</div>
		</div>


		<!-- 引入jQuery的js文件 -->
		<%-- <script type="text/javascript" scr="<%=basePath%>js/jquery.js"></script> --%>
		<!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script rel="stylesheet" type="text/css" href="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		<!-- 引入自定义js文件 -->
		<script type="text/javascript" src="<%=basePath%>js/delay.js"></script>
	</body>
</html>
