<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title>延期审批</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/detail.css">
		<!-- 引入自定义css文件 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
	</head>
	<body>
		<div class="panelwrap">
			<div id="dealDelay" class="delay">
				<ul>
					<li class="abouttime">
						<label class="delay">延期时间:</label>
						<input type="hidden" id="delayId" >
						<input type="text" id="delayTime" class="delaytime" name="delayTime" disabled="disabled">
						<label>小时</label>
					</li>
					<li>
						<label class="introduction">延期说明:</label>
						<textarea id="introduce" name="introduce" class="delaytime"  disabled="disabled"></textarea>
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
						<a id="refuseDelayBtn"  class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'">拒绝延期</a>  
						<a id="acceptDelayBtn"  class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">同意延期</a>  
					</li>
				</ul>
			</div>

			<!-- S 延期历史  -->
			<div>
				<div id="delayHistory" style="border-bottom:1px solid #95b8e7"></div>
			</div>
			
			<!-- E 延期历史  -->

		</div>

		
		<!-- 拒绝延期对话框 -->
		<div id="refuseDelayDialog">
			<ul class="refuseReason">
				<li class="refuseDelayrecord">
					<label class="reason">拒绝理由:</label>
					<textarea id="refuseDelayContent" class="refuseDelayContent"></textarea>
				</li>
				<div id="refuseDelaybtn">
					<a id="refuseDelaybtnClose" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'">关闭</a>  
					<a id="refuseDelaybtnSubmit" href="#" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">提交记录</a>  
				</div>
			</ul>
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
