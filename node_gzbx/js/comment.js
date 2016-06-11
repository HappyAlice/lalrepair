$(function(){
	// 创建面板
	creatPanel("#problemDetail","问题详情", true, "changeColor");
	creatPanel("#dealTime","处理人工时", true, "changeColor");
	creatPanel("#comment","满意度评价", true, "changeColor");

	// 创建面板 方法
	function creatPanel(id, mytitle, isborder, changeColor, param){
		$(id).panel({ 
			title : mytitle,      
			border : isborder,
			headerCls: changeColor,
			loader : param
		});
	}

	// 点击关闭时关闭页面
	$("#close").on("click", function(){
		window.opener = null;
		window.open('','_self');
		window.close();
	});


	// 点击确认评价时传送数据给后台
	$("#submitComment").on("click",function(){
		var param = {};
		var assess = {};
		var paramTime = $("#dealTime li select");
		var paramComment = $("#comment li select");
		$.each(paramTime,function(){
			assess[$(this).attr('comboname')] = $(this).combobox('getValue');
		});
		$.each(paramComment,function(){
			assess[$(this).attr('comboname')] = $(this).combobox('getValue');
		});
		assess['suggest'] = $('#suggest').val();
		
		param.assess = assess;
		param.problemId = $('#problemId').val();

		$.ajax({
			type:			'post',
			contentType : 	'application/json;charset=utf-8', //设置请求头信息
	        dataType:		"json",
			url : 			'../../AssessController/submitComment',
			data : 			JSON.stringify(param),
			success : function(date){
				if(date.result == "success"){
					$.messager.alert('提示消息','评价成功','info');
					window.opener.location.reload();
					window.close();
				}
				
			},
			error : function(a) {
				$.messager.alert("警告", "操作失败！", "error");
			}
			
		});
		
		
	});
	
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
	
	/**
	 * 评价时，显示问题详情
	 */
	$.ajax({
		type:'post',
	    dataType:"json",
		url : '../../ProblemController/findProByProId',
		data : {problemId: $.getUrlParam('problemId')},
		success : function(date){
			
			$('#problemId').val(date.problemId);
			$('#repairNum').val(date.repairNum);
			$('#assetNumber').val(date.assetNumber);
			$('#problemAddress').val(date.problemAddress);
			$('#category').val(date.category);
			$('#project').val(date.project);
			$('#detailed').val(date.detailed);
			$('#problemContent').val(date.problemContent);
			
			if(date.enclosure=="" || date.enclosure==null){
				$('#evaluateEnsolure').css("display","none");
			}else{
				var name = date.enclosure;
				$('#enclosure').textbox("setValue",name.substring(15));
			}
			
		},
	});
	

})