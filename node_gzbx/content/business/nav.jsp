<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="shiro"  uri="http://shiro.apache.org/tags"%>
<%@ taglib prefix="wuwei" uri="wuwei/jk" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
	

		<nav id='top_navi' class="top_navi" >

			<h1><a href="<%=basePath%>content/business/tasktodo.jsp"><img src="<%=basePath%>logo.png"></img></a></h1>

			<ul>
				<li id="taskto">
					<a href="<%=basePath%>content/business/tasktodo.jsp" class="taskto">
					<img src="<%=basePath%>images/todotask.png">待办任务</a>
				</li>
				
				<shiro:hasAnyRoles name="admin,biller">
					<li id="report">
						<a href="<%=basePath%>content/biller/repairlist.jsp" class="report">
							<img src="<%=basePath%>images/faultRepair.png">报修列表
						</a>
					</li>
				</shiro:hasAnyRoles>
				
				<shiro:hasAnyRoles name="admin,dispacher">
					<li id="problem">
						<a href="<%=basePath%>content/dispacher/problemlist.jsp" class="problem">
							<img src="<%=basePath%>images/complaints.png">问题列表
						</a>
					</li>
				</shiro:hasAnyRoles>

					<li id="myreport">
						<a href="<%=basePath%>content/business/myrepairlist.jsp"><img src="<%=basePath%>images/myrepor.png" class="myreport">我的报修</a>
						<ul>
							<li data-li="myreport">
								<a href="<%=basePath%>content/business/myproblemlist.jsp" id="myProblem" class="displayFalse">我的问题</a>
							</li>
						</ul>
					</li>

				<shiro:hasAnyRoles name="admin,dispacher">
					<li id="dispatcher">
						<a href="<%=basePath%>content/dispacher/deparcturelist.jsp" class="dispatcher">
						<img src="<%=basePath%>images/fenpai.png">任务派发</a>
					</li>
				</shiro:hasAnyRoles>
				
				<shiro:hasAnyRoles name="admin,handler">
					<li id="mytask"><a href="<%=basePath%>content/handler/mytask.jsp" class="mytask" >
						<img src="<%=basePath%>images/mydispatch.png">我的任务</a>
					</li>
				</shiro:hasAnyRoles>
				
				<shiro:hasRole name="admin">
					<li id="docuconfig">
						<a href="<%=basePath%>content/system/menu.jsp" class="docuconfig">
							<img src="<%=basePath%>images/systemManager.png">系统管理
						</a>
					</li>
				</shiro:hasRole>
				
					<li id="setting">
						<a href="#" class="setting"><img src="<%=basePath%>images/admin.png" ><wuwei:wuwei/></a>
						<ul>
							<li data-li="setting">
								<a href="#" id="updatePwd" class="displayFalse">修改密码</a>
							</li>
						</ul>
					</li>
				
				<li><a href="<%=basePath%>UserController/logout"><img src="<%=basePath%>images/close.png">退出</a></li>
			</ul>
		</nav>



