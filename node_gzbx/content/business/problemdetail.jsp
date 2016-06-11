<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>问题详情</title>
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/reset.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/detail.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
	</head>
	<body>

		<div class="wapContent">
			<!-- 报修列表 =S -->
			<div id="reportList">
				<form>
					<ul>
						<li class="reportForm">
							<label class="labelStyle">报修人:</label>
							<input class="easyui-textbox"type="text" style="width:120px" id="repairMan" readonly="readonly">
						</li>
						<li class="reportForm">
							<label class="labelStyle">报修单位:</label>
							<input class="easyui-textbox"type="text" style="width:120px" id="department" readonly="readonly">
						</li>
						<li class="reportForm">
							<label class="labelStyle">报修电话:</label>
							<input class="easyui-textbox"type="text" style="width:120px" id="telepone" readonly="readonly">
						</li>
						<li class="reportForm">
							<label class="labelStyle">报修时间:</label>
							<input class="easyui-textbox"type="text" style="width:150px" id="repairTime" readonly="readonly">
						</li>
					</ul>
				</form>
			</div>
			<!-- 报修列表 =E -->
			<!-- 问题详情 =S -->
			<div id="questionDetail">
				<ul>
					<li class="reportForm">
						<label class="labelStyle">批次编号:</label>
						<input class="easyui-textbox"type="text" name="repairNum" id="repairNum" readonly="readonly">
					</li>
					<li class="reportForm">
						<label class="labelStyle">资产编号:</label>
						<input class="easyui-textbox"type="text" name="assetNumber" id="assetNumber" readonly="readonly">
					</li>
					<li class="reportForm">
						<label class="labelStyle">故障地点:</label>
						<input class="easyui-textbox"type="text" name="problemAddress" id="problemAddress" readonly="readonly">
					</li>
					<li class="reportForm">
						<label class="labelStyle">报修类别:</label>
						<input class="easyui-textbox"type="text" name="category" id="category" readonly="readonly">
					</li>
					<li  class="reportForm"> 
						<label class="labelStyle">报修项目:</label>
						<input class="easyui-textbox"type="text" name="project" id="project" readonly="readonly">
					</li>
					<li class="reportForm">
						<label class="labelStyle">故障明细:</label>
						<input class="easyui-textbox"type="text" name="detailed" id="detailed" readonly="readonly">
					</li>
					<li id="evaluateEnsolure" class="reportForm">
						<label class="labelStyle">
							<a id="realenclosure" href="#"style="color: #069;text-decoration:underline;">附件下载:</a>
						</label>
						<input class="easyui-textbox"type="text"style = "width:800px"id="enclosure" readonly="readonly">
					</li>
					<li class="reportForm">
						<label class="labelStyle">报修内容:</label>
						<textarea id="description" name="description" readonly="readonly"></textarea>
					</li>
				</ul>
			</div>
			
			<!-- 隐藏问题的状态，在点击跟踪记录等时候判断，只能对处理中的问题进行编辑 -->
			<input id="problemState" type="hidden">
			
			<!-- 选项卡面板 =S -->
			<div id="tabs"style="height:350px;">
				<!-- 处理人 =S -->
				<div title="处理人">
					<table id="handle"></table>
				</div>
				<!-- 处理人 =E -->

				<!-- 处理记录 =S -->
				<div title="处理记录" id="tabs_record" >
					<div id="record">
					
						<ul id="recordButton" style="border-bottom:1px solid #95B8E7;">
							<li style="margin-top:0;">
								<a href="#" id="afterRecord" class="easyui-linkbutton" data-options="iconCls:'icon_trackRecord_win8'">跟踪记录</a>
							</li>
							<li style="margin-top:0;">
								<a href="#" id="finished" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">任务完成</a>
							</li>
							<li style="margin-top:0;">
								<a href="#" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">问题编辑</a>
							</li>
						</ul>
						
						<div id="addrecord"></div>	
					</div>
				</div>
				
				<!-- 处理记录 =S -->

				<!-- 满意度评价 =S -->
				<div title="满意度评价" >
					<div id="assess">
						<div id="assess-child">
							 <div id="handleTime">
								<ul>
									<li class="reportForm">
										<label>处理此问题实际用了:</label>
										<input class="easyui-textbox"type="text" id="timeDays" readonly="readonly">
										&nbsp天
									</li>
									<li  class="reportForm">
										<input class="easyui-textbox"type="text"  id="timeHours" readonly="readonly">
										&nbsp小时
									</li>
									<li  class="reportForm">
										<input class="easyui-textbox"type="text"  id="timeMinutes" readonly="readonly">
										&nbsp分钟
									</li>
								</ul>
							</div>
							<div id="evaluate">
								<ul>
									<li>
										<label>服务态度:</label>
										<input class="easyui-textbox"type="text" id="service" readonly="readonly">
									</li>
									<li>
										<label>沟通能力:</label>
										<input class="easyui-textbox"type="text" id="communicate" readonly="readonly">
									</li>
									<li>
										<label>故障响应速度:</label>
										<input class="easyui-textbox"type="text" id="response" readonly="readonly">
									</li>
									<li>
										<label>将故障原因及避免故障的常识告知使用者:</label>
										<input class="easyui-textbox"type="text" id="reason" readonly="readonly">
									</li>
								</ul>
								<ul>
									<li>
										<label>责任心:</label>
										<input class="easyui-textbox"type="text" id="responsibility" readonly="readonly">
									</li>
									<li>
										<label>技术水平:</label>
										<input class="easyui-textbox"type="text" id="technology" readonly="readonly">
									</li>
									<li>
										<label>故障处理时间:</label>
										<input class="easyui-textbox"type="text" id="time" readonly="readonly">
									</li>
									<li>
										<label>主动对使用者的设备进行定期巡检维护:</label>
										<input class="easyui-textbox"type="text" id="maintain" readonly="readonly">
									</li>
								</ul>
								<ul style="margin-right:0;margin-top:-4px;margin-bottom:12px">
									<li style="margin-bottom:0px">
										<label>意见与建议:</label>
										<div class="ratangle" style="float:right";>
											<textarea class="textareaStyle" id="suggest" name="description" readonly="readonly"></textarea>
											<span id="textarea-count" class="count" style="position:absolute; right:20px;">300</span>
										</div>
										
									</li>
								</ul>
							</div> 
						</div> 
					</div>
				</div>
				<!-- 满意度评价 =E -->

				<!-- 延期历史 =S -->
				<div title="延期历史">
					<div id="delayHistory">
						
						
					</div>
				</div>
				<!-- 延期历史 =E -->

				<!-- 投诉历史 =S -->
				<div title="投诉历史">
					<div id="complainHistory">
						<!-- <ul>
							<li class="reportForm">
								<label class="labelStyle">投诉时间:</label>
								<input class="easyui-textbox complainTime"type="text">
							</li>
							<li class="reportForm">
								<label class="labelStyle">投诉结果:</label>
								<input class="easyui-textbox complainResult"type="text">
							</li>
							<li>
								<label class="labelStyle">投诉原因:</label>
								<textarea class="complainAdvice" name="description" readonly="readonly"></textarea>
							</li>
						</ul> -->
					</div>
				</div>
				<!-- 投诉历史 =E -->

				<!-- 原始问题详情 =S -->
				<div title="原始问题详情" id="problemHistory-w">
					<div id="problemHistory">
						<ul>
							<li>
								<label>资产编号:</label>
								<input class="easyui-textbox" id="newAssetNumber" type="text" readonly="readonly">
							</li>
							<li>
								<label>报修类别:</label>
								<input class="easyui-textbox" id="newCategory" type="text" readonly="readonly">
							</li>
						</ul>
						<ul>
							<li>
								<label>报修项目:</label>
								<input class="easyui-textbox" id="newProject" type="text" readonly="readonly">
							</li>
							<li>
								<label>故障明细:</label>
								<input class="easyui-textbox" id="newDetailed" type="text" readonly="readonly">
							</li>
						</ul>
					</div>
				</div>
				<!-- 原始问题详情 =E -->
			</div>
			<!-- 选项卡面板 =E -->
			<!-- 问题详情 =E -->
			
		</div>
		
		<!-- 新增记录弹框 -->
		<jsp:include page="record/recordbox.jsp"></jsp:include>
		
		<!-- 完成记录弹框 -->
		<jsp:include page="../handler/recordfinished.jsp"></jsp:include>
		
		<script type="text/javascript" src="<%=basePath%>js/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/problemdetail.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/textarea-valid.js"></script>
	</body>
</html>