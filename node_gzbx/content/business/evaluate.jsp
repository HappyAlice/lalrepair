<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<title>评价</title>
		<meta charset= "utf-8">
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
		<!-- 引入自定义css文件 -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
	</head>
	<body>
		<div class="panelwrap">
			<div id="problemDetail" class="scorelist">
				<ul class="problemDetail">
					<li>
						<label>批次编号:</label>
						<input type="hidden" name="problemId" id="problemId">
						<input type="text" name="repairNum" id="repairNum" readonly="readonly">
					</li>
					<li>
						<label>资产编号:</label>
						<input type="text" name="assetNumber" id="assetNumber" readonly="readonly">
					</li>
					<li>
						<label>故障地点:</label>
						<input type="text" name="problemAddress" id="problemAddress" readonly="readonly">
					</li>
				</ul>
				<ul class="problemDetail">
					<li>
						<label>报修类别:</label>
						<input type="text" name="category" id="category" readonly="readonly">
					</li>
					<li>
						<label>报修项目:</label>
						<input type="text" name="project" id="project" readonly="readonly">
					</li>
					<li>
						<label>故障明细:</label>
						<input type="text" name="detailed" id="detailed" readonly="readonly">
					</li>
					
					<li id="evaluateEnsolure" class="evaluateEnsolure">
						<label class="labelStyle">
							<a href="#" style="color: #069; text-decoration:underline;">附件下载:</a>
						</label>
						<input class="easyui-textbox" type="text" id="enclosure" readonly="readonly">
					</li>
					
				</ul>
				<ul class="com_content">
					<li>
						<label class="suggest">报修内容:</label>
						<textarea class="sug_content" id="problemContent" readonly="readonly"></textarea>
					</li>
				</ul>
			</div>

			<div id="dealTime" class="scorelist">
				<span>处理此问题实际使用了：</span>
				<ul class="selectTime">
					<li>
						<select class="easyui-combobox easyui-validatebox input_xmid" name="timeDays" data-options="editable:false, required:true" >
							<option></option>
							<option>0</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
						<span>天</span>
					</li>
					<li>
						<select class="easyui-combobox input_xmid" name="timeHours" data-options="editable:false, required:true">
							<option></option>
							<option>0</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
							<option>6</option>
							<option>7</option>
						</select>
						<span>小时</span>
					</li>
					<li>
						<select class="easyui-combobox input_xmid" name="timeMinutes" data-options="editable:false, required:true">
							<option></option>
							<option>0</option>
							<option>10</option>
							<option>20</option>
							<option>30</option>
							<option>40</option>
							<option>50</option>
						</select>
						<span>分钟</span>
					</li>
					<span class="tips">注意:天+时+分不可以等于0,三个选项都不能为空！</span>
				</ul>
			</div>	 

			<div id="comment" class="scorelist">
				<ul class="com left">
					<li>
						<label>服务态度:</label>
						<select class="easyui-combobox" name="service" data-options="editable:false, panelHeight: 'auto'" required>
							<option value=""></option>
							<option>10</option>
							<option>9</option>
							<option>8</option>
							<option>7</option>
							<option>6</option>
							<option>4</option>
							<option>3</option>
							<option>2</option>
							<option>1</option>
						</select>
					</li>
					<li>
						<label>沟通能力:</label>
						<select class="easyui-combobox" name="communicate" data-options="editable:false, panelHeight: 'auto'" required>
							<option value=""></option>
							<option>10</option>
							<option>9</option>
							<option>8</option>
							<option>7</option>
							<option>6</option>
							<option>4</option>
							<option>3</option>
							<option>2</option>
							<option>1</option>
						</select>
					</li>
					<li>
						<label>故障响应速度:</label>
						<select class="easyui-combobox" name="response" data-options="editable:false, panelHeight: 'auto'" required>
							<option value=""></option>
							<option>10</option>
							<option>9</option>
							<option>8</option>
							<option>7</option>
							<option>6</option>
							<option>4</option>
							<option>3</option>
							<option>2</option>
							<option>1</option>
						</select>
					</li>
					<li>
						<label>将故障原因及避免故障的常识告知使用者:</label>
						<select class="easyui-combobox" name="reason" data-options="editable:false, panelHeight: 'auto'" required>
							<option value=""></option>
							<option>10</option>
							<option>9</option>
							<option>8</option>
							<option>7</option>
							<option>6</option>
							<option>4</option>
							<option>3</option>
							<option>2</option>
							<option>1</option>
						</select>
					</li>
				</ul>
				<ul class="com right">
					<li>
						<label>责任心:</label>
						<select class="easyui-combobox" name="responsibility" data-options="editable:false, panelHeight: 'auto'" required>
							<option value=""></option>
							<option>10</option>
							<option>9</option>
							<option>8</option>
							<option>7</option>
							<option>6</option>
							<option>4</option>
							<option>3</option>
							<option>2</option>
							<option>1</option>
						</select>
					</li>
					<li>
						<label>技术水平:</label>
						<select class="easyui-combobox" name="technology" data-options="editable:false, panelHeight: 'auto'" required>
							<option value=""></option>
							<option>10</option>
							<option>9</option>
							<option>8</option>
							<option>7</option>
							<option>6</option>
							<option>4</option>
							<option>3</option>
							<option>2</option>
							<option>1</option>
						</select>
					</li>
					<li>
						<label>故障处理时间:</label>
						<select class="easyui-combobox" name="time" data-options="editable:false, panelHeight: 'auto'" required>
							<option value=""></option>
							<option>10</option>
							<option>9</option>
							<option>8</option>
							<option>7</option>
							<option>6</option>
							<option>4</option>
							<option>3</option>
							<option>2</option>
							<option>1</option>
						</select>
					</li>
					<li>
						<label>主动对使用者的设备进行定期巡检维护:</label>
						<select class="easyui-combobox" name="maintain" data-options="editable:false, panelHeight: 'auto'" required>
						    <option value=""></option>
							<option>10</option>
							<option>9</option>
							<option>8</option>
							<option>7</option>
							<option>6</option>
							<option>4</option>
							<option>3</option>
							<option>2</option>
							<option>1</option>
						</select>
					</li>
				</ul>
				<ul class="com_content" > 
					<li>
						<label class="suggest">意见建议:</label>
						<div class="ratangle" style="float: right">
							<textarea class="sug_content" id="suggest"></textarea>
							<span id="textarea-count" class="count">300</span>
						</div>
						<!-- <textarea class="sug_content" id="suggest" required></textarea> -->
					</li>
				</ul>
				<div class="com_linkbutton">
					<a id="close" class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'" >关闭</a>  
					<a id="submitComment" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">确认评价</a>  
				</div>
			</div>
		</div>	 


		<!-- 引入jQuery的js文件 -->
		<%-- <script type="text/javascript" scr="<%=basePath%>js/jquery.js"></script> --%>
		<!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
		<script rel="stylesheet" type="text/css" href="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
		<!-- 引入自定义js文件 -->
		<script type="text/javascript" src="<%=basePath%>js/comment.js"></script>
		<script src="<%=basePath%>js/textarea-valid.js"></script>
	</body>
</html>
