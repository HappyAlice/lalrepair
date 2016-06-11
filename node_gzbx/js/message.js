$(function(){

	//点击查询，发送数据，后重新加载表格
	$("#search").on("click", function(){
		var form = $('#searchIndex [name]');
		var emailTable = $("#emailTable");
		submitData(form, emailTable);
	});

	//点击确认发送，发送邮件
	$("#mailContent").on('click', function(){
		
	});


	//点击查询提交数据
	function submitData(selector,tableid,wuwei){
		var param = {};               
		selector.each(function(){    
			var $this = $(this);        
			param[$this.attr("name")] = $this.val().trim();   
		});

		if(wuwei){
			param['from'] = wuwei;
		}
		tableid.datagrid('load',param);  // easyui 自带的load方法
	}

	//创建对话框
	function createDialog(dialogs, width, height, title){
		dialogs.dialog({
			width: width,
			height: height,
			title: title,
			closeable: true,
			closed : false,
			modal: true
		});
	}

});

//允许次数
function allowNumbers(value,row,index){
	return "999";
}
//操作
function operation(value,row,index){
	return "<a style='color:#069'>详情</a>&nbsp&nbsp<a style='color:#069'>重发</a>";
}
//状态
function state(value,row,index){
	if(value==="0") {
		return "<span style='color:red'>发送失败</span>";
	}
	return "<span style='color:#069'>发送成功</span>";
}
