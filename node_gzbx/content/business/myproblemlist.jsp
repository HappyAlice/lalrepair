<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title data-page="myreport">我的问题列表</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- 引入自定义css文件 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/nav.css">
	</head>
	<body class="easyui-layout">
		<!-- 头部的导航条 -->
	    <div data-options="region:'north', border: false" >
	    	<jsp:include page="nav.jsp"></jsp:include>
	    </div> 

	    <!-- 中间内容部分 -->
	    <div data-options="region:'center', border: false" style="background:#eee;">

	    			<!-- 搜索条件 -->
	    	<div id="myplSearchIndex">
	    		<form id="searchIndex" class="searchIndex">
					<ul class="searchShow">
						<li class="status">
							<label>状态:</label>
							<select id="repState" class="easyui-combobox input_mid" name="problemState">
								<option value="" selected="selected">全部</option>
								<option value="0">已保存</option>
								<option value="1">未受理</option>
								<option value="2">处理中</option>
								<option value="3">已处理</option>
								<option value="4">已拒绝</option>
								<option value="5">已结案</option>
							</select>
						</li>
						<li>
							<label>批次编号:</label>
							<input id="repairNum" type="text" name="repairNum" class="easyui-textbox input_larg" >
						</li>
						<li>
							<label>问题编号:</label>
							<input id="problemNum" type="text" name="problemNum" class="easyui-textbox input_larg" >
						</li>
						<li>
							<label>处理人:</label>
							<input id="dealMan" type="text" name="dealMan" class="easyui-textbox input_smal" >
						</li>
						<li>
							<label>报修人:</label>
							<input id="repMan" type="text" name="repairMan" class="easyui-textbox input_smal" >
						</li>						
						<li>
							<label>申请延期:</label>
							<select id="plDelay" class="easyui-combobox input_smal" name="timeBegin">
								<option value="" selected="selected">全部</option>
								<option value="1">是</option>
								<option value="0">否</option>
							</select>
						</li>
						<li>
							<label>延期审批:</label>
							<select id="doDelay" class="easyui-combobox input_mid" name="timeEnd">
								<option value="" selected="selected">全部</option>
								<option value="1">已审批</option>
								<option value="0">未审批</option>
							</select>
						</li>
						<li id="repSearch">
							<a id="myplSearch" class="easyui-linkbutton" data-options="iconCls:'icon_search',plain:true">查询</a>
						</li> 
						<li id="searchAdd" class="rm_search_add"></li>

						<li id="repReset">
							<a class="easyui-linkbutton" data-options="plain: true,iconCls:'icon_reset'" >重置</a>
						</li> 
					</ul>

					<!-- 	隐藏的搜索条件 点击添加后出现或者隐藏 -->
					<ul id="searchHide">
						<li>
							<label>是否过期:</label>
							<select id="timeOut" class="easyui-combobox input_smal" name="isDelay">
								<option value="" selected="selected">全部</option>
								<option value="1">是</option>
								<option value="0">否</option>
							</select>
						</li>
						<li>
							<label>有无投诉:</label>
							<select id="isComplain" class="easyui-combobox input_smal" name="isComplaint">
								<option value="" selected="selected">全部</option>
								<option value="1">有</option>
								<option value="0">无</option>
							</select>
						</li>
						<li>
							<label>投诉处理:</label>
							<select id="doComplain" class="easyui-combobox input_mid" name="isDealComplaint">
								<option value="" selected="selected">全部</option>
								<option value="1">已处理</option>
								<option value="0">未处理</option>
							</select>
						</li>
						<li>
							<label>是否已评价:</label>
							<select id="isComment" class="easyui-combobox input_smal" name="isEvaluate">
								<option value="" selected="selected">全部</option>
								<option value="1">是</option>
								<option value="0">否</option>
							</select>
						</li>
						<li>
							<label>报修部门:</label>
							<input id="repDepartment" type="text" name="department" class="easyui-textbox input_larg" >
						</li>
						<li>
							<label>报修内容:</label>
							<input id="repContent" type="text" name="problemContent" class="easyui-textbox input_larg" >
						</li>
						<li>
							<label>报修时间:</label>
							<input id="fromTime" type="text" name="repairTime" class="easyui-datebox input_xmid" data-options="editable:false, formatter:formatter, parser:parser">
							<label>至:</label>
							<input id="toTime" type="text" name="finishTime" class="easyui-datebox input_xmid"  data-options="editable:false, formatter:formatter, parser:parser">
						</li>
					</ul>
					
				</form>

					<!-- toolbar -->
    			<div id="myProblemToolbar">
    				<a id="commentBtn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_fenpei', plain: true">满意度评价</a>  
    				<a id="tpusuBtn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_tousu',plain: true">我要投诉</a>  
    			</div>
	    	</div>
    			
    		<!--     表格     -->
		    <table id="myproListTable" class="easyui-datagrid" 
		    	data-options="
		    		url : '<%=basePath%>ProblemController/findByCondition',
		    		queryParams : {from : 'myproblem'},
				    pagination:true,
				    pageSize : 10,
					pageList : [10, 15, 20],
	                rownumbers:true,
	                border:false,
	                singleSelect:true,
	                fit : true,
				    toolbar:'#myplSearchIndex'">
		    	<thead frozen="true">
		    		<tr>
		    			<th data-options="field :'detail', width : 50, align:'center', formatter:detail ">详情</th>
		    			<th data-options="field :'repairNum',  width : 150, align:'center'">批次编号</th>
		    			<th data-options="field :'problemNum', width : 150, align:'center'">问题编号</th>
		    			<th data-options="field :'problemState',  width : 80, align:'center', formatter:problemState ">状态</th>
		    			<th data-options="field :'project',  width : 150, align:'center'">报修项目</th>
		    			<th data-options="field :'problemContent',  width : 150, align:'center'">报修内容</th>
		    		</tr>
		    	</thead>
		    	<thead>
		    		<tr>
		    			<th data-options="field :'dealMan',  width : 150, align:'center'">处理人</th>
		    			<th data-options="field :'level',  width : 80, align:'center', formatter:level ">级别</th>
		    			<th data-options="field :'mark',  width : 50, align:'center'">满意度</th>
		    			<th data-options="field :'isEvaluateDelay',  width : 80, align:'center', formatter:isEvaluateDelay ">评价过期</th>
		    			<th data-options="field :'isComplaint',  width : 50, align:'center', formatter:isComplaint ">投诉</th>
		    			<th data-options="field :'isDealComplaint', width : 80, align:'center', formatter:isDealComplaint ">投诉已处理</th>
		    			<th data-options="field :'isDelay',  width : 50, align:'center', formatter:isDelay ">已过期</th>
		    			<th data-options="field :'timeBegin',  width : 70, align:'center',  formatter:timeBegin ">申请延期</th>
		    			<th data-options="field :'timeEnd',  width : 70, align:'center',  formatter:timeEnd">延期审批</th>
		    			<th data-options="field :'completion',  width : 70, align:'center'">完成方式</th>
		    			<th data-options="field :'combine',  width : 100, align:'center'">合并状态</th>
		    			<th data-options="field :'repairTime',  width : 150, align:'center'">报修时间</th>
		    			<th data-options="field :'finishTime',  width : 150, align:'center'">计划完成时间</th>
		    			<th data-options="field :'actualTime',  width : 150, align:'center'">实际完成时间</th>	    			
		    		</tr>
		    	</thead>
		    </table>
    		<!-- </div> -->
	    <!-- 	</div>	
	    </div>	  -->
		
		<!--    修改密码弹框      -->
		<jsp:include page="../setpwd.jsp"></jsp:include>
		
		<!-- 投诉弹框 -->
		<div id="complain">
			<ul class="add_content">
				<li>
					<label class="add">我要投诉:</label>
					<textarea id="complainReason" class="content"></textarea>
					<div id="newRecordbtn">
						<a id="btnClose" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'">关闭</a>  
						<a id="btnSubmit" href="#" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">确认投诉</a>  
					</div>
				</li>
			</ul>
		</div>
		
		<!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>

		<script type="text/javascript" src="<%=basePath%>js/nav.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/myproblemlist.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/dateformate.js"></script>
		
		
		
	</body>
</html>