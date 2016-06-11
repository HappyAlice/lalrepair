<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
		<!-- 修改密码弹框 -->
		<div id="setNewPwd" class="easyui-dialog " data-options="width: 350, height:230, modal:true, title:'修改密码', closed:true">
			<form id="loginform" class="setpassword">
				<li>
					<label>输入旧密码</label>
					<input id="account" type="hidden" name="account" value="${sessionScope.user.account}">
					<input id="diaOldPwd" type="password" name="diaOldPwd" required="required">
				</li>
				<li>
					<label>输入新密码</label>
					<input id="diaNewPwd" type="password" class="easyui-validatebox" name="diaNewPwd" data-options="validType:'length[6,12]'">
				</li>
				<li>
					<label>确认新密码</label>
					<input id="diaNewPwdConfirm" type="password" class="easyui-validatebox" name="diaNewPwdConfirm" validType="equals['#diaNewPwd']" >
				</li>
			</form>
			<a id="btnSure" href="#" class="easyui-linkbutton btnsure" data-options="iconCls:'iconok_win8'">确定</a>   

			<span class="pwdTips">建议 : 密码使用字母+数字、6~12位字符</span>
		</div>