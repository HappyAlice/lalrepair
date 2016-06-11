$(function(){
	
	/**
	 * 取地址栏参数
	 */
	(function($) {
		$.getUrlParam = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		}
	})(jQuery);
	
	
	myPanel('#reportList','myHeader','报修列表',950,true);
	myPanel('#questionDetail','myHeader','问题详情',950,true);
	myPanel('#handleTime','myHeader','处理人工时',927,false);
	myPanel('#evaluate','myHeader','满意度评价',927,false);
	myPanel('#problemHistory','myHeader','原始问题详情',948,false);
	
	$("#tabs").tabs({});

	$("#handle").datagrid({   
		border:false,
	    url:'../../HandlerController/findHandlers',  
	    queryParams : {problemId: $.getUrlParam('problemId')},
	    rownumbers:true,
	    columns:[[        
	        {field:'handleMan',title:'处理人',width:300,align:'center'},    
	        {field:'leadership',title:'领导批示',width:600,align:'center'}    
	    ]]  

	});  

	
	/**
	 * 报修详情那四条记录
	 */
	$.ajax({
		type:'post',
	    dataType:"json",
		url : '../../RepairController/findRepairByProId',
		data : {problemId: $.getUrlParam('problemId')},
		success : function(date){
			$('#repairMan').textbox('setValue', date.repairMan);
			$('#department').textbox('setValue', date.department);
			$('#telepone').textbox('setValue', date.telepone);
			$('#repairTime').textbox('setValue', date.repairTime);
		},
	});
	
	/**
	 * 显示问题详情
	 */
	var problemState = $('#problemState');
	$.ajax({
		type:'post',
	    dataType:"json",
		url : '../../ProblemController/findProByProId',
		data : {problemId: $.getUrlParam('problemId')},
		success : function(date){
			
			$('#problemId').textbox("setValue",date.problemId);
			$('#repairNum').textbox("setValue",date.repairNum);
			$('#assetNumber').textbox("setValue",date.assetNumber);
			$('#problemAddress').textbox("setValue",date.problemAddress);
			$('#category').textbox("setValue",date.category);
			$('#project').textbox("setValue",date.project);
			$('#detailed').textbox("setValue",date.detailed);
			$('#description').val(date.problemContent);
			
			//给附件下载链接设值
			$('#realenclosure').attr('href',"../../FileController/download?fileName="+date.enclosure);
			
			problemState.val(date.problemState);
			
			if(date.enclosure=="" || date.enclosure==null){
				$('#evaluateEnsolure').css("display","none");
			}else{
				var name = date.enclosure;
				$('#enclosure').textbox("setValue",name.substring(15));
			}
			
		},
	});
	
	/**
	 *************************  处理记录	*********************************
	 */
	
	/**
	 * 点击跟踪记录按钮弹出对话框
	 */
	createDialog("#newRecord", "跟踪记录", true, 680, 250, true, true);
	
	$("#afterRecord").on("click", function(){
		if(problemState.val()!='2'){
			$.messager.alert('提示消息','只能对处理中的问题填写跟踪记录','info');
		}else{
			$("#newRecord").dialog("open");
		}
	});

	/**
	 * 点击关闭按钮关闭对话框
	 */
	$("#btnClose").on("click", function(){
		$("#newRecord").dialog("close");
	});
	
	/**
	 * 点击提交记录按钮 提交记录
	 */
	$("#btnSubmit").on("click",function(){
		
		var text = $("textarea.content").val();
		
		$.ajax({
			type:'post',
		    dataType:"json",
			url : '../../RecordController/saveRecord',
			data : {problemId: $.getUrlParam('problemId'),
					recordContent : text},
			success : function(data){
				if(data.result == 'success'){
					$.messager.alert('提示消息','提交成功','info');
					$("#newRecord").dialog("close");
				}else{
					$.messager.alert('提示消息','操作失败','info');
				}
				
			},
			error : function(a) {
				$.messager.alert("警告", "操作失败！", "error");
			}
		});
	});
	
	// 创建对话框
	createDialog("#wellDoneDialog", "任务完成", true, 500, 250, true, true);

	// 点击处理完成打开对话框
	$("#finished").on("click", function(){
		if(problemState.val()!='2'){
			$.messager.alert('提示消息','只能对处理中的问题填写跟踪记录','info');
		}else{
			$("#wellDoneDialog").dialog("open");
		}
	});
	
	// 点击提交记录按钮 提交记录
	$("#finishSubmit").on("click",function(){
		debugger		
		var text = $("#wellDoneContent").val();
		var completion = $('#completion').combobox('getValue');//完成方式
		$.ajax({
			type:'post',
		    dataType:"json",
			url : '../../RecordController/saveRecord',
			data : {problemId: $.getUrlParam('problemId'),
					recordContent : text,
					completion : completion},
			success : function(data){
				if(data.result == 'success'){
					$.messager.alert('提示消息','提交成功','info');
					$("#wellDoneDialog").dialog("close");					
				}else{
					$.messager.alert('提示消息','操作失败','info');
				}	
			},
			error : function(a) {
				$.messager.alert("警告", "操作失败！", "error");
			}
		});
		
	});

	// 点击关闭时，关闭对话框
	$("#btnClosebtnClose").on("click", function(){
		$("#wellDoneDialog").dialog("close");
	});
	
	//选项卡
	$('#tabs').tabs({
		onSelect:function(title,index){
			$('#addrecord').empty();
			
			if(title=='处理记录'){	
				$.ajax({
					type:'post',
				    dataType:"json",
					url : '../../RecordController/findRecordById',
					data : {problemId: $.getUrlParam('problemId')},
					success : function(date){
						for(var i=0;i<date.length;i++){
							
							var $uul =  $('<ul></ul>');
							
							var li1 = $('<li></li>').appendTo($uul);
							var label1 = $('<label class="labelStyle">记录人:</label>').appendTo(li1);
							var input1 = $('<input class="complainInputs" value="'+date[i].recordMan+'" type="text" readonly="readonly">').appendTo(li1);
							
							var li2 = $('<li></li>').appendTo($uul);
							var label2 = $('<label class="labelStyle">记录时间:</label>').appendTo(li2);
							var input2 = $('<input class="complainInputs"type="text" value="'+date[i].recordTime+'" style="width:170px" readonly="readonly">').appendTo(li2);
							
							var li3 = $('<li></li>').appendTo($uul);
							var label3 = $('<label class="labelStyle">任务完成:</label>').appendTo(li3);
							var input3 = $('<input class="complainInputs" type="text" readonly="readonly">').appendTo(li3);
							
							var li4 = $('<li></li>').appendTo($uul);
							var label4 = $('<label class="labelStyle">记录内容:</label>').appendTo(li4);
							var input4 = $('<textarea class="reportContent" name="description" readonly="readonly">'+date[i].recordContent+'</textarea>').appendTo(li4);
							
							$('#addrecord').append($uul);
							
							if(date[i].problemState == '0'){
								input3.val('未完成');
							}else{
								input3.val('已完成');
							}
						}
					},
				});
				
			}else if(title=='满意度评价'){	
				$.ajax({
					type:'post',
				    dataType:"json",
					url : '../../AssessController/findAssess',
					data : {problemId: $.getUrlParam('problemId')},
					success : function(data){
						if(data){
							createAssess(data);
						}
						
					},
					error : function(){
						$('#assess').remove();
					}
				});
				
			}else if(title=='延期历史'){
				$('#delayHistory').empty();
				$.ajax({
					type:'post',
				    dataType:"json",
				    url : '../../DelayController/findDelay',
					data : {problemId: $.getUrlParam('problemId')},
					success : function(data){
						
						createDelayHistory(data);
					},
				});
				
			}else if(title=='投诉历史'){
				$('#complainHistory').empty();
				//动态创建投诉历史
				$.ajax({
					type:'post',
				    dataType:"json",
					url : '../../ComplainController/findComplainByProId',
					data : {problemId : $.getUrlParam('problemId')},
					success : function(data){
						
//						$('#introduce').val(data[0].complainReason);
						
						for ( var i = 0; i < data.length; i++) {
							
							var $history = $('<div style="border-bottom:1px solid #95b8e7;padding-bottom:10px;">'+
								'<ul>'+
									'<li>'+
										'<label>投诉时间:</label>'+
										'<input type="text" class="complainInputs" value="'+data[i].complainTime+'" readonly="readonly">'+
									'</li>'+
									'<li>'+
										'<label>投诉结果:</label>'+
										'<input type="text" class="complainInputs" id="complainResult'+i+'" readonly="readonly">'+
									'</li>'+
								'</ul>'+
								'<ul>'+
									'<li>'+
										'<label class="complainReasonLabel">投诉原因:</label>'+
										'<textarea class="complainReason" readonly="readonly">'+data[i].complainReason+'</textarea>'+
									'</li>'+
								'</ul>'+
							'</div>');
							
							$('#complainHistory').append($history);
							
							//（待受理1 已受理2 处理中3 已处理4 已拒绝5）
							 if(data[i].complainResult == '0'){
							 	$("#complainResult"+i).val('待处理');
							 }else{
								 $("#complainResult"+i).val(data[i].complainResult);
							 }

						}
					},
				});
				
			}else if(title=='原始问题详情'){
				
				$.ajax({
					type:'post',
				    dataType:"json",
				    url : '../../ProblemController/findProOrigin',
					data : {problemId: $.getUrlParam('problemId')},
					success : function(data){
						if(data.newAssetNumber){
							$('#newAssetNumber').textbox('setValue',data.newAssetNumber);
							$('#newCategory').textbox('setValue',data.newCategory);
							$('#newProject').textbox('setValue',data.newProject);
							$('#newDetailed').textbox('setValue',data.newDetailed);
						}else{
							$('#problemHistory-w').remove();
						}
					},
					error : function(){
						$('#problemHistory-w').remove();
					}
				});
				
			}else{
				return;
			}
			
		}
	});

})

//创建面板
function myPanel(id,headerCls,title,width,isborder){
	$(id).panel({
		headerCls : headerCls,
		title : title,
		width : width,
		border : isborder
	})
}

// 弹框dialog
function createDialog(id, title, iscloseable, itswidth, itsheight, ismodal, isclosed){
	$(id).dialog({
		title: title,
		closable: iscloseable,
		width: itswidth,
		height: itsheight,
		modal: ismodal,
		closed: isclosed
	});
}

//创建一个div用来包裹每个延期历史
function createDelayHistory(data){

	for ( var i = 0; i < data.length; i++) {
	
		var $delayHistory = $("#delayHistory");
		var $ul_1 = $('<ul></ul>').appendTo($delayHistory);	//延期时间和审批结果
		var $ul_2 = $('<ul class="borderBottom" style="margin-top:0"></ul>').appendTo($delayHistory);	
		
		var $li_11 = $('<li class="reportForm"></li>').appendTo($ul_1);	//延期时间 li
		var $label_11 = $('<label class="labelStyle">延期时间:</label><input type="text" value="'+data[i].delayTime+'" style="width:50px" readonly="readonly"><span>小时</span>').appendTo($li_11);	//延期时间 label

		var $li_12 = $('<li class="reportForm"></li>').appendTo($ul_1);	//审批结果
		var $label_12 = $('<label class="labelStyle">审批结果:</label><input value="" type="text" style="width:100px" readonly="readonly">').appendTo($li_12);	//审批结果 label


		var $li_21 = $('<li class="reportForm"></li>').appendTo($ul_2);	//申请时间
		var $label_21 = $('<label class="labelStyle">申请时间:</label><input value="'+data[i].applyTime+'" type="text" readonly="readonly"/>').appendTo($li_21);	//申请时间 label

		var $li_22 = $('<li class="reportForm"></li>').appendTo($ul_2);	//申请完成时间
		var $label_22 = $('<label class="delayHistoryLabel">申请完成时间:</label><input type="text" value="'+data[i].applyFinishtime+'" style="width:130px" readonly="readonly"/>').appendTo($li_22);	//申请完成时间 label

		var $li_23 = $('<li class="reportForm"></li>').appendTo($ul_2);	//计划完成时间
		var $label_23 = $('<label class="delayHistoryLabel">计划完成时间:</label><input type="text" value="'+data[i].applyFinishtime+'" style="width:130px" readonly="readonly"/>').appendTo($li_23);	//计划完成时间 label

		var $li_24 = $('<li class="reportForm"></li>').appendTo($ul_2);	//延期说明
		var $label_24 = $('<label class="labelStyle">延期说明:</label><textarea class="reasonTextarea" name="description" readonly="readonly">'+data[i].delayRemark+'</textarea>').appendTo($li_24);	//延期说明 label
		
		if(data[i].applyResult == '0'){
			$label_12.val('待审批');
		}else if(data[i].applyResult == '1'){
			$label_12.val('同意');
		}else{
			$label_12.val('不同意');
		}
		
		if(data[i].refuseReason){
			var $li_25 = $('<li class="reportForm"></li>').appendTo($ul_2);	//拒绝原因
			var $label_25 = $('<label class="labelStyle">拒绝原因:</label><textarea class="reasonTextarea" name="description" readonly="readonly">'+data[i].refuseReason+'</textarea>').appendTo($li_25);	//拒绝原因 label
		}
		
		
	}

}

//创建一个div用来包裹满意度评价
function createAssess(date){
	
/*	var $assess = $(
			'<div id="handleTime">'+
				'<ul>'+
					'<li class="reportForm">'+
						'<label>处理此问题实际用了:</label>'+
						'<input class="easyui-textbox"type="text" id="timeDays" readonly="readonly">'+
						'&nbsp天'+
					'</li>'+
					'<li  class="reportForm">'+
						'<input class="easyui-textbox"type="text"  id="timeHours" readonly="readonly">'+
						'&nbsp小时'+
					'</li>'+
					'<li  class="reportForm">'+
						'<input class="easyui-textbox"type="text"  id="timeMinutes" readonly="readonly">'+
						'&nbsp分钟'+
					'</li>'+
				'</ul>'+
			'</div>'+
			'<div id="evaluate">'+
				'<ul>'+
					'<li>'+
						'<label>服务态度:</label>'+
						'<input class="easyui-textbox"type="text" id="service" readonly="readonly">'+
					'</li>'+
					'<li>'+
						'<label>沟通能力:</label>'+
						'<input class="easyui-textbox"type="text" id="communicate" readonly="readonly">'+
					'</li>'+
					'<li>'+
						'<label>故障响应速度:</label>'+
						'<input class="easyui-textbox"type="text" id="response" readonly="readonly">'+
					'</li>'+
					'<li>'+
						'<label>将故障原因及避免故障的常识告知使用者:</label>'+
						'<input class="easyui-textbox"type="text" id="reason" readonly="readonly">'+
					'</li>'+
				'</ul>'+
				'<ul>'+
					'<li>'+
						'<label>责任心:</label>'+
						'<input class="easyui-textbox"type="text" id="responsibility" readonly="readonly">'+
					'</li>'+
					'<li>'+
						'<label>技术水平:</label>'+
						'<input class="easyui-textbox"type="text" id="technology" readonly="readonly">'+
					'</li>'+
					'<li>'+
						'<label>故障处理时间:</label>'+
						'<input class="easyui-textbox"type="text" id="time" readonly="readonly">'+
					'</li>'+
					'<li>'+
						'<label>主动对使用者的设备进行定期巡检维护:</label>'+
						'<input class="easyui-textbox"type="text" id="maintain" readonly="readonly">'+
					'</li>'+
				'</ul>'+
				'<ul style="margin-right:0;margin-top:-4px;margin-bottom:12px">'+
					'<li style="margin-bottom:0px">'+
						'<label>意见与建议:</label>'+
						'<textarea class="textareaStyle" id="suggest" name="description" readonly="readonly"></textarea>'+
					'</li>'+
				'</ul>'+
			'</div>'
	);
	$('#assess').append($assess);*/
	
	$('#timeDays').textbox('setValue', date.timeDays);
	$('#timeHours').textbox('setValue', date.timeHours);
	$('#timeMinutes').textbox('setValue', date.timeMinutes);
	$('#service').textbox('setValue', date.service);
	$('#communicate').textbox('setValue', date.communicate);
	$('#response').textbox('setValue', date.response);
	$('#reason').textbox('setValue', date.reason);
	$('#responsibility').textbox('setValue', date.responsibility);
	$('#technology').textbox('setValue', date.technology);
	$('#time').textbox('setValue', date.time);
	$('#maintain').textbox('setValue', date.maintain);
	$('#suggest').val(date.suggest);

}
