<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
	<title>我要报修</title>
	<link rel="shortcut icon" href="<%=basePath%>favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>css/css/uploadify/uploadify/uploadify.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>css/css/main-css/index.css">
</head>
<body>
    <div id="panelWrapper" >
   		
	    	<div id="addRepair" class="easyui-panel">
		    	<p class="panelWrapper_title" style="margin:0;">新增报修</p>
		    	 <form action="<%=basePath%>saveOrUpdateRepair/saveOrUpdateRepair" id="repairInfoForm">
	    			<ul class="repairInfo">
	    				<li>
		    				<label for="repair_name">报修人
								<input type="hidden" name="repairId" id="repair_Id" value="" />
								<input type="text" name="repairMan" id="repair_name" value="${sessionScope.user.userName}" readonly="readonly" />
						    </label>
					    </li>
	    				<li>
		    				<label for="repair_unit">报修单位
								<input  type="text" name="department"  id="repair_unit" value="${sessionScope.user.department}"  readonly="readonly" />
						    </label>	
	    				</li>
	    				<li>
		    				<label for="repair_phone">报修电话
								<input  type="text" name="telepone" id="repair_phone" value="${sessionScope.user.telephone}" readonly="readonly"/>
								<span class="attention">可更改为座机号码-分机号码</span>
						    </label>
	    				</li>
	    			</ul>
	    		</form>
	    		<p class="panelWrapper_title" style="margin:0;">问题列表</p>
	    		<div id="questionList" class="easyui-panel">
					<!-- S 表格 -->
					<table id="addQuestionTable" >
						<!--S 表格工具栏 -->
					    <div id="toolBar" style="text-align:right;" class="datagrid-toolbar">
							<a id="btn_add" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_edit_add'"data-idenfy="btn" >新增问题</a>
							<a id="btn_edit" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_trackRecord_win8'" data-idenfy="btn">编辑</a>
							<a id="btn_remove" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_edit_remove'" data-idenfy="btn">移除</a>
						</div>
					<!--E 表格工具栏 -->
					</table>
					<!-- E 表格 -->
	    		</div>
	    	</div>
	    	<!-- S 按钮 -->
			<div>
				<span class="fontStyle">注意:报修单提交之后方能生效,未保存或提交单据之前,刷新或关闭页面,数据会丢失!</span>
				<a id="btn_sava"  class="easyui-linkbutton" data-options="iconCls:'icon-save'" style="display:block;float:right;margin:10px 5px 10px 5px;">保存</a>
				<a id="btn_submit"  class="easyui-linkbutton" data-options="iconCls:'iconok_win8'" style="display:block;float:right;margin:10px 5px 10px 5px;">提交</a>
			</div>
		
		<!-- E 按钮 -->
    </div>

    <!-- S 添加问题面板 -->
    <div class="addQuestionDialog">
    	<div id="addQuestionDialog" title="添加问题">
    	    <form id="addQuestionForm">
	    		<ul>
	    			<li class="line">
	    				<label for="repair_category">报修类别：</label>
				        <input id="repair_category" name="repair_category" class="easyui-combobox" style="width:200px;" data-options="editable:false,panelHeight:'auto'" data-group="input"/>  
	    			</li>
	    			<li class="line">
	    				<label for="repair_project">报修项目：</label>
	    				<select id="repair_project" class="easyui-combobox" name="repair_project" style="width:200px;" data-options="editable:false,panelHeight:'auto'" data-group="input">   
						</select> 
	    			</li>
	    			<li>
	    				<label for="repair_detail">故障明细：</label>
	    				<select id="repair_detail" class="easyui-combobox" name="repair_detail" style="width:467px;" data-options="editable:false,panelHeight:'auto'" data-group="input">       
						</select> 
	    			</li>
	    			<li class="line">
	    				<label for="propertyCode">资产编号：</label>
	    				<input type="text" name="propertyCode" id="propertyCode"  class="textbox" style="width:198px;height:20px;" disabled/>
	    			</li>
	    			<li class="line">
	    				<label for="repair_place">故障地点：</label>
	    				<input type="text" name="repair_place" id="repair_place" class="textbox" style="width:198px;height:20px;" data-group="input"/>
	    			</li>
	    			<li>
	    				<label for="repair_content">报修内容：</label>
	    				
	    				<div class="ratangle" style="display:inline-block; position: relative;">
							<!-- <textarea id="valid-textarea" class="valid"></textarea> -->
							<textarea name="valid-textarea" id="repair_content" style="width:463px;" class="repair_content" data-group="input"></textarea>
							<span id="textarea-count" class="count" style=" position: absolute; right: 5px; bottom: 5px; font-size: 12px; color: #ccc;">300字</span>
						</div>
	    				<!-- <textarea name="repair_content" id="repair_content" style="width:463px;" class="repair_content" data-group="input"></textarea> -->
	    			</li>
	    			<li>
	    				<label for="accessoriesName">附件名称：</label>
	    				<input type="text" name="accessoriesName" id="accessoriesName" class="textbox" style="width:466px;" readonly="readonly">
	    				<input type="hidden" name="newaccessoriesName" id="newaccessoriesName" class="textbox" style="width:466px;" readonly="readonly"> 
	    			</li> 
	    			<li>
	    				<label class="accessoriesLabel">附件上传：</label>
	    				<a href="javascript:void(0);" id="delAtte" class="easyui-linkbutton" onClick="uploadFile();" style="margin-top:-5px;">上传附件</a>
	    				<a href="javascript:void(0);" id="delBtn"style="margin:-5px 0px 0px 0px;" class="easyui-linkbutton" onClick="delFile('');">删除附件</a>
	    			</li>	
	    		</ul>
	    		<div class="formBtn">
					<a id="btn_ok" href="#" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'" style="display:block;float:right;margin:10px 5px 10px 5px;">确认</a>
					<a id="btn_clear" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'" style="display:block;float:right;margin:10px 5px 10px 5px;">关闭</a>
				</div>
    		</form>
    	</div>
    </div>
    <!-- E 添加问题面板 -->

    <!--S 上传附件对话框-->
    <div id="upload_dialog" name='' class="easyui-dialog" data-options="title:'上传附件',closable:true,closed:true,resizable:true,modal:true,width:400,height:400,maximizable:true" style="dispaly:none">
    	<center style="padding:5px;margin:5px;">
	        <ul>
	            <li>
	                <!-- 页面添加用于生成上传按钮的标签     -->
	                <input type="file" name="btn_upload" id="btn_upload" style="float:left;margin-left:20px;" />
	            </li>
	            <li>
	                <p style="padding:10px;">仅支持单个文件上传,小于10MB,若有多个附件,请先压缩成一个!您也可以把文件(文件夹)拖拽到这里进行上传</p>
	            </li>
	            <li>
	                <a class="easyui-linkbutton" data-options="iconCls:'icon-ok'" href="javascript:void(0);" onclick="startUpload();">开始上传</a>
	            </li>
	        </ul>
    	</center>
	</div>
	<!--S 上传附件对话框-->
    
	<script type="text/javascript" src="<%=basePath%>js/lib/jquery-1.12.0.js"></script>
    <script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>css/css/uploadify/uploadify/jquery.uploadify.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/main-js/index1.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/main-js/index2.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/textarea-valid.js"></script>
</body>
</html>