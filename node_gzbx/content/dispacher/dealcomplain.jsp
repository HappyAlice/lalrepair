<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title>投诉</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- 引入自定义css文件 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
	</head>
	<body>
		<div class="panelwrap">
			<div id="complain" class="delay">
				<ul>
					<li >
						<label class="responsibility">责任人:</label>
						<input type="text" id="responMen" class="easyui-textbox responsible" name="responMen"  readonly="readonly">
						<a href="#" id="addMen" class="easyui-linkbutton" data-options="iconCls:'icon_edit_add',plain:true"></a>
					</li>
					<li>
						<label class="introduction">投诉原因:</label>
						<textarea id="introduce" name="introduce" class="responsible" readonly="readonly"></textarea>
					</li>
					<li id="delayBtn">
						<a id="refuseComplainBtn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'">无效关闭</a>  
						<a id="acceptComplainBtn" href="#" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">确认投诉</a>  
					</li>
				</ul>
			</div>

			<!-- S 投诉历史  -->
			<div id="complainHistory" >
			
			</div>
			
			<!-- E 投诉历史  -->

		</div>

		<!-- 选择处理人弹框 -->
        <div id="responMenSelect">
            <input type="text" id="responMenSear" class="easyui-textbox" data-options="iconCls : 'icon-search'">
            <div id="responMenPanel">
                <table id="responMenTable"></table>

                <!-- toolbar -->
                <div id="responMenTableBar">
                    <a id="selectResponMen"  class="easyui-linkbutton" data-options="iconCls : 'icon_edit_add', plain: true"></a>
                </div>
            </div>
        </div>

		<!-- 处理投诉弹框 -->
		<div id="dealComplain">
			<form id="docomplain" class="docomplain">
				<li>
					<label class="deal-result">处理结果:</label>
					<textarea id="complainResult" class="content"></textarea>
				</li>
			</form>
			<ul class="dealComplainbtn">
				<a id="btnClose" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'">关闭</a>  
				<a id="btnSubmit" href="#" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">确认</a>  
			</ul>
		</div>




		<!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script rel="stylesheet" type="text/css" href="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		<!-- 引入自定义js文件 -->
		<script type="text/javascript" src="<%=basePath%>js/complain.js"></script>
	</body>
</html>
