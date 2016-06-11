<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title data-page="docuconfig" data-link="docuconfig">用户管理</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath%>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- 引入自定义css文件 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/nav.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
		
		
	</head>
	<body class="easyui-layout">
		
	    <div data-options="region:'north', border : false" >
		    <!-- 头部的导航条 -->
			<jsp:include page="../business/nav.jsp"></jsp:include>
	    </div>  
	    <!-- 中间内容部分 -->
	    <div data-options="region:'center', border : false" style="background:#eee;">
	    	<div class="easyui-layout" data-options="fit : true">
	    		<div data-options="region:'north', border:false">
	    			<!-- 搜索条件 -->
					<form id="searchIndex" class="searchIndex">
						<ul class="searchShow" style="padding-bottom:0px;">
							<li>
								<label>员工姓名:</label>
								<input id="rmUserName" type="text" name="userName" class="easyui-textbox input_mid" >
							</li>
							<li>
								<label>账号:</label>
								<input id="rmAccount" type="text" name="account" class="easyui-textbox input_larg" >
							</li>
							<li>
								<label>状态:</label>
								<select id="rm_status" class="easyui-combobox input_mid" name="userState" data-options="panelHeight:'auto',editable:false">
									<option value="" selected="selected">全部</option>
									<option value="1">启用</option>
									<option value="2">禁用</option>
									<option value="0">待审批</option>
								</select>
							</li>
							<li>
								<label>公司名称:</label>
								<input id="rmCompany" type="text" name="company" class="easyui-textbox input_larg" >
							</li>
							<li>
								<label>部门:</label>
								<input id="rmDepartment" type="text" name="department" class="easyui-textbox input_larg" >
							</li>
							<li id="rm_find">
								<a id="rolemanageSearch" class="easyui-linkbutton" data-options="iconCls:'icon_search',plain:true">查询</a>
								<a id="reset" class="easyui-linkbutton" data-options="iconCls:'icon_reset',plain:true">重置</a>
							</li> 
						</ul>
						
					</form>
	    		</div>
	    		<div data-options="region:'center', border:false">
	    			<!--     表格     -->
			    	<table id="rolemanageTable"></table>
	    		</div>
	    	</div>
	    </div>
	    		
    		    <!-- 左侧树形菜单 -->
	    <div data-options="region:'west',split:true, border : false" style="width:200px;" class="slidemenu">
	    	<jsp:include page="treemenu.jsp"></jsp:include>
	    </div>
    	
    	<!-- 弹出对话框 -->
    	<div id="manageDialog" >
    		<div class="userUpdate">
    		    <form id="form" action="<%=basePath%>UserController/updateInfo" method="post">
	    			<ul>
	    				<li>
	    					<label>登录姓名</label>
	    					<input id="diaId" type="hidden" name="userId" disabled >
	    					<input id="diaName" class="input_mid" type="text" name="userName" disabled>
	    				</li>
	    				<li>
	    					<label>登录账号</label>
	    					<input id="diaAccount" type="text" class="easyui-validatebox" name="account" data-options="validType:'length[5,12]'">
	    				</li>
	    				<li>
	    					<label>输入密码</label>
	    					<input id="diaPwdInput" type="password" class="easyui-validatebox" name="password" data-options="validType:'length[6,12]'">
	    				</li>
	    				<li>
	    					<label>确认密码</label>
	    					<input id="diaPwdConfirm" type="password"  name="diaPwdConfirm" class="easyui-validatebox" validType="equals['#diaPwdInput']"  >
	    				</li>
	    				<li>
	    					<label>电子邮件</label>
	    					<input id="diaEmail" type="text" class="easyui-validatebox" name="mail" data-options="validType:'email'">
	    				</li>
	    				<li>
	    					<label>所在部门</label>
	    					<!-- <select id="diaDepartment" class="easyui-combobox" name="diaDepartment"></select> -->
	    					<input type="text" id="diaDepartment" name="department">
	    				</li>
	    				<li>
	    					<label>分配角色</label>
	    					<select id="roleSelect" name="roles" ></select>
	    				</li>
	    				<li>
	    					<input type="radio" id="statusAble" name="userState" value="1" style="width :15px ">
	    					<label for="statusAble">启用</label>
	    				</li>
	    				<li>
	    					<input type="radio" id="statusDisAble" name="userState" value="2" style="width :15px ">
	    					<label for="statusDisAble">禁用</label>
	    				</li>
	    			</ul>
				</form>
				<div class="userUpdateBtn">
					<a href="#" id="rolemanageSave" class="save icon easyui-linkbutton" data-options="iconCls: 'iconok_win8'">保存</a>
				</div>
    			
    		</div>
    	</div> 
    	
    	<!--    修改密码弹框      -->
		<jsp:include page="../setpwd.jsp"></jsp:include>
    	

		<!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
	
		<!-- 引入自定义js文件 -->
		<script type="text/javascript" src="<%=basePath%>js/rolemanage.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
	</body>
</html>