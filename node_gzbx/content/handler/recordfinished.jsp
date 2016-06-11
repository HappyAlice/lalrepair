<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<div id="wellDoneDialog">
			<ul class="add_content">
				<li>
					<label>完成方式:</label>
					<select id="completion" type="text" class="easyui-combobox donestyle" data-options="panelHeight:'auto', editable: false">
						<option value="电话协助">电话协助</option>
						<option value="现场协助">现场协助</option>
					</select>
				</li>
				<li class="welldownrecord">
					<label class="add">完成记录:</label>
					
					<div class="ratangle">
						<textarea id="wellDoneContent" class="wellDoneContent"></textarea>
						<span id="textarea-count" class="count" style="position: absolute; right:55px;">300</span>
					</div>
					<!-- <textarea id="wellDoneContent" class="wellDoneContent"></textarea> -->
				</li>
				<div id="wellDonebtn">
					<a id="btnClosebtnClose" href="#" class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'">关闭</a>  
					<a id="finishSubmit" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'">提交记录</a>  
				</div>
			</ul>
		</div>		
