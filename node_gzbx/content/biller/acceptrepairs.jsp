<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<link rel="shortcut icon" href="<%=basePath %>favicon.ico"/>
        <title>故障报修系统</title>
        <!-- easyui style -->
        <link rel="stylesheet" href="<%=basePath%>easyui/themes/default/easyui.css">
        <link rel="stylesheet" href="<%=basePath%>easyui/themes/icon.css">
        <!-- //easyui style -->


        <link rel="stylesheet" href="<%=basePath%>css/acceptRepair.css">
	    <!--[if lt IE 10]>
	  	    <script src="js/html5shiv.js"></script>
            <script src="js/respond.js"></script>
  	    <![endif]-->
    </head>

    <body>
        <div class="wapContent con_form">
            <!-- 受理报修 -->
            <p class="wapContent_title">受理报修</p>
            <form id="accept" class="easyui-panel con_form"> 
                <ul>
                    <li>
                        <label>处理单位：</label>
                        <input type="text" id="" value="${sessionScope.user.department}" class="base-input" data-options="editable:false" style="width:150px;"  readonly="readonly">
                    </li>
                    <li>
                        <label>报修级别:</label>
                        <select type="text" id="level" class="base-input" style="width:100px;">
                        <option value="1">低级</option>
                        <option value="2">次中级</option>
                        <option value="3">中级</option>
                        <option value="4">次高</option>
                        <option value="5">高级</option>
                        </select>
                    </li>
                    <li>
                        <label>处理时限：</label>
                        <input type="number" id="limited" value="16" class="base-input" style="width:50px;"></input>
                        <label>小时</label>
                    </li>
                </ul> 
                   
            </form>  
            <!-- //受理报修 --> 

            <!-- 报修列表 -->
            <p class="wapContent_title">报修列表</p>
            <div id="repair" class="easyui-panel con_form"> 
                <form>
                    <ul>
                        <li>
                            <label>报修人：</label>
                            <input type="text" id="repairMan" class="base-input" style="width:120px;" readonly="readonly">
                        </li>
                        <li>
                            <label>报修单位：</label>
                            <input type="text" id="department" class="base-input" style="width:120px;" readonly="readonly">
                        </li>
                        <li>
                            <label>报修电话: </label>
                            <input type="text" id="telepone" class="base-input" style="width:120px;" readonly="readonly">
                        </li>
                        <li>
                            <label>联系时间: </label>
                            <input type="text" id="repairTime" class="base-input" style="width:160px;" readonly="readonly">
                        </li>
                    </ul>
                </form>      
            </div>  
            <!-- //报修列表 --> 

             <!-- 问题列表 -->
            <p class="wapContent_title">问题列表</p>
            <div id="question" class="easyui-panel">    
                <table id="question-table"></table>     
            </div>  
            <!-- //问题列表 --> 
			
            <!-- 按钮 -->
            <a href="javascript:void(0);" class="easyui-linkbutton" style="float:right;margin:10px 0px 0px 0px;" data-options="iconCls:'iconok_win8'" onClick="receive.receiveSubmit();">受理</a>
            <a href="javascript:void(0);" class="easyui-linkbutton" style="float:right;margin:10px 5px 0px 0px;" data-options="iconCls:'icon_cancel_win8'" onClick="openRepairDialog()">拒绝受理</a>
            <!-- //按钮 -->      
        </div>


        <!-- 拒绝理由对话框 -->
        <div class="easyui-dialog" id="addRepairDialog" title="拒绝备注" style="width:500px;height:240px;padding:10px;" data-options="closed:true,border:false,modal:true">
            <textarea class="base-input" style="width:455px;height:140px;" id="refuseReason" name="refuseReason"></textarea>
            <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'iconok_win8'" style="float:right;margin:10px 0px 0px 0px;" onClick="receive.receiveNot();">确认</a>
            <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon_cancel_win8'" style="float:right;margin:10px 5px 0px 0px;" onClick="receive.receiveNotClose();">关闭</a>
        </div>
    <!-- easyui js -->
    
    <a href="<%=basePath%>ProblemController/findProblemByRepairId?repairId=2c9081de537447130153744970090003">ok</a>
    <script src="<%=basePath%>easyui/jquery.min.js"></script>   
    <script src="<%=basePath%>easyui/jquery.easyui.min.js"></script>  
    <script src="<%=basePath%>easyui/locale/easyui-lang-zh_CN.js"></script> 
    <!-- //easyui js --> 

    <script src="<%=basePath%>js/acceptRepair.js"></script>
    <input id="repairId" type="hidden" value="${param.repairId}">
    <script type="text/javascript">
    $(function() {
	/* 问题列表表格 */
		$('#question-table').datagrid({    
	    	url:'<%=basePath%>ProblemController/findProblemByRepairId',    
	    	queryParams : {repairId : $('#repairId').val()},
		    fitColumns: true,
		    rownumbers: true,
		    border : false,
		    fixed : true,
		    
		    columns:[[
		        {field:'problemNum',title:'问题标号',width:300,align:'center'}, 
		        {field:'problemState',title:'状态',width:150,align:'center',formatter:status}, 
		        {field:'dealMan',title:'处理人',width:150,align:'center'},
		        {field:'category',title:'报修类别',width:100,align:'center'},
		        {field:'project',title:'报修项目',width:100,align:'center'},
		        {field:'problemContent',title:'报修内容',width:300,align:'center'}, 
		        {field:'isComplaint',title:'投诉',width:60,align:'center'},   
		        {field:'finishTime',title:'完成时间',width:100,align:'center'}, 
		        {field:'groupBillNo',title:'合并状态',width:100,align:'center'},
		        {field:'enclosure',title:'附件',width:100,align:'center',formatter:enclosure}, 
		        {field:'detail',width:100,align:'center',formatter:detail}
		    ]]
		}); 
	});
	

	function status(value){
		if(value==="1") {
			return "未受理";
		}
		if(value==="2") {
			return "处理中";
		}
		if(value==="3") {
			return "已处理";
		}
		if(value==="4") {
			return "已拒绝";
		}
		if(value==="5") {
			return "已结案";
		}
		
	}
	
	function detail(value,row,index){
		var rowId = row.problemId;
		return "<a  style='color:#069' href='../business/problemdetail.jsp?problemId="+rowId+"' target='_brank' >详情</a>";
	} 

	
	function enclosure(value,row,index){
		var rowId = row.enclosure;
		if(rowId){
			return "<a style='color:#069' href=<%=basePath%>FileController/download?fileName="+rowId+">下载</a>";
		}
		
	} 
	
	$(document).ready(function() { 
			$.ajax({
			type:'post',
	        dataType:"json",
			url : '<%=basePath%>RepairController/findRepairDetailById',
			data : {repairId : $('#repairId').val()},
			success : function(date){
				$('#repairMan').val(date.repairMan);
				$('#department').val(date.department);
				$('#telepone').val(date.telepone);
				$('#repairTime').val(date.repairTime);
			},
		});
	});
	
    </script>
    </body>

</html>
