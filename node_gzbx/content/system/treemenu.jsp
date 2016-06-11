<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

			<!-- 树形菜单 -->
			<div class="rm_slidmenu">
				<ul id="rm_menu" class="easyui-tree">
					<li>
						<span>基础配置</span>
						<ul>
							<li id=""><a href="#">代码配置</a></li>
						</ul>
					</li>
				    <li>
						<span>系统配置</span>
						<ul>

							<li><a id="menu" href="menu.jsp">菜单配置</a></li>
							<li><a id="role" href="role.jsp">角色配置</a></li>
							<li><a id="auth" href="auth.jsp">权限配置</a></li>
							<li><a id="resource" href="resource.jsp">资源配置</a></li>
							<li><a id="docuconfig" href="user.jsp">用户管理</a></li>
							<li><a id="message" href="message.jsp">消息管理</a></li>

						</ul>
					</li>
				</ul>
			</div>
