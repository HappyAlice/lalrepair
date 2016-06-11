<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
    <head>
        <title>任务分派</title>
        <meta charset= "utf-8">
        <link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
        <link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/default/easyui.css">
        <link rel="stylesheet" type="text/css" href="<%=basePath%>easyui/themes/icon.css">
        <!-- 引入自定义css文件 -->
        <link rel="stylesheet" type="text/css" href="<%=basePath%>css/rolemanage.css">
    </head>
    <body>
        <div class="panelwrap">
            <!-- 受理报修 -->
            <div id="deparctureAccept" class="deparctureAccept">
                <ul>
                    <li>
                        <label>处理单位:</label>
                        <input type="text" id="dealDepartment" class="easyui-textbox" readonly="readonly">
                    </li>
                    <li>
                        <label>报修级别:</label>
                        <input type="text" id="level" class="easyui-textbox" readonly="readonly">
                    </li>
                    <li>
                        <label>处理时限:</label>
                        <input type="text" id="limited" class="easyui-textbox" readonly="readonly">
                        <label>小时</label>

                    </li>
                    <li>
                        <label>受理时间:</label>
                        <input type="text" id="acceptTime" class="easyui-textbox" readonly="readonly">
                    </li>
                </ul>
            </div>
            <!-- 报修列表 -->
            <div id="deparctureRepairList" class="deparctureRepairList">
                <ul>
                    <li>
                        <label>报修人:</label>
                        <input type="text" id="repairMan" class="easyui-textbox" readonly="readonly">
                    </li>
                    <li>
                        <label>报修单位:</label>
                        <input type="text" id="department" class="easyui-textbox" readonly="readonly">
                    </li>
                    <li>
                        <label>报修电话:</label>
                        <input type="text" id="telepone" class="easyui-textbox" readonly="readonly">
                    </li>
                    <li>
                        <label>报修时间:</label>
                        <input type="text" id="repairTime" class="easyui-textbox" readonly="readonly">
                    </li>
                </ul>
            </div>
            <!-- 问题列表 -->
            <div id="deparctureProList" class="record">
                <!-- 表格 -->
                <table id="deparctureProTable"></table>
            </div>
            <!-- 右下角两个按钮 -->
            <div id="deparctureLinkBtn" class="deparctureLinkBtn">
                <a id="deparctureBtn" class="easyui-linkbutton" data-options="iconCls : 'icon_edit_add'">任务分派</a>
                <a id="depsureBtn" class="easyui-linkbutton" data-options="iconCls : 'iconok_win8'">确认</a>
            </div>
        </div>  

        <!-- 任务分派弹框 -->
        <form id="deparctureDialog" class="deparctureDialog">
            <ul>
                <li>
                    <label>处理人:</label>
                    <input type="hidden" id="userId" class="easyui-textbox">
                    <input type="text" id="depDealMen" class="easyui-textbox" data-options="editable: false" required="required">
                    <a id="addDealMen" class="easyui-linkbutton" data-options="iconCls : 'icon_edit_add', plain: true"></a>
                </li>
                <li>
                    <label class="lederMessage">领导批示:</label>
                    <textarea id="ledMessCont" required="required"></textarea>
                </li>
            </ul>
            <ul class="depDialogBtn">
                <a id="depDialogCloseBtn" class="easyui-linkbutton" data-options="iconCls : 'icon_cancel_win8'">关闭</a>
                <a id="depDialogSureBtn" class="easyui-linkbutton" data-options="iconCls : 'iconok_win8'">确认</a>
            </ul>
        </form>

        <!-- 选择处理人弹框 -->
        <div id="deparctureMenSelect">
           <table id="depMenTable"></table>

           <!-- toolbar -->
           <div id="depMenTableBar">
	           <form id="searchForm" style="float:left;margin-top:5px;">
	           		<label>部门：</label>
	          		<input type="text" name="department" class="easyui-textbox" >
	           </form>
           		<a id="menSearch"  class="easyui-linkbutton" data-options="iconCls : 'icon_search',plain:true">查询</a>
                <a id="reset"  class="easyui-linkbutton" data-options="iconCls : 'icon_reset',plain:true">重置</a>
                <a id="selectDealMen"  class="easyui-linkbutton" data-options="iconCls : 'iconok_win8',plain:true">确定</a>
           </div>
        </div>

        <!-- 引入easyui的js文件 -->
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.min.js"></script>
        <script type="text/javascript" src="<%=basePath%>easyui/jquery.easyui.min.js"></script>
        <script type="text/javascript" src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script>
        <!-- 引入自定义js文件 -->
        <script type="text/javascript" src="<%=basePath%>js/deparcture.js"></script>
    </body>
</html>