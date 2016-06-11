<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

		<!-- 新增记录弹框 -->
		<div id="newRecord">
			<ul class="add_content" style="margin-left:30px;">
				<li>
					<label class="add">新增内容:</label>
					<div class="ratangle">
						<textarea id="valid-textarea" class="content"></textarea>
						<span id="textarea-count" class="count">300</span>
					</div>
					<!-- <textarea class="content"></textarea> -->
					<div id="newRecordbtn" style="margin-top:15px; margin-right:20px">
						<a id="btnClose" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'">关闭</a>  
						<a id="btnSubmit" href="#" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">提交记录</a>  
					</div>
				</li>
			</ul>
		</div>
