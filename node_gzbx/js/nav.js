$(function(){
	var title = $('title').attr('data-page');
	var li = $('#top_navi li a');
	
	var tree = $('title').attr('data-link');
	var treeLi = $("#rm_menu li a");
	$.each(li,function(index){
		if($(this).parent().attr('id') == title){
			$(this).css('background','transparent');
		}
		if($(this).parent().attr('data-li') == title){
			$(this).parents('ul').parent('li').css('background','transparent');
		}
	});
	treeLi.each(function(){
		if($(this).attr('id') == tree){
			$(this).css({'color' : 'red'});
		}
	});

	//鼠标移动到我的报修上时，显示二级菜单；我的问题
	$("#myreport").hover(function(){
		$("#myProblem").css("display", "block");
	},function(){
		$("#myProblem").css("display", "none");
	});

	//鼠标移动到个人主页上时，显示二级菜单；修改密码
	$("#setting").hover(function(){
		$("#updatePwd").css("display", "block");
	},function(){
		$("#updatePwd").css("display", "none");
	});

   // 点击修改密码弹出修改密码弹框
	$("#updatePwd").on("click", function(){
		$("#setNewPwd").dialog('open');
	});


	//定义equals规则 验证两次输入的密码是否一致
	$.extend($.fn.validatebox.defaults.rules, {    
	    equals: {    
	        validator: function(value,param){    
	            return value == $(param[0]).val();    
	        },    
	        message: '密码不一致.'   
	    }    
	});
	
	//js获取项目根路径，如： http://localhost:8083/uimcardprj
	function getRootPath(){
	    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	    var curWwwPath=window.document.location.href;
	    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	    var pathName=window.document.location.pathname;
	    var pos=curWwwPath.indexOf(pathName);
	    //获取主机地址，如： http://localhost:8083
	    var localhostPaht=curWwwPath.substring(0,pos);
	    //获取带"/"的项目名，如：/uimcardprj
	    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	    return(localhostPaht+projectName);
	}
	
	// 点击修改密码确认键，提交数据
	$("#btnSure").on("click", function(){
		
		var account = $("#account").val();
		var diaOldPwd = $("#diaOldPwd").val();
		var diaNewPwd = $("#diaNewPwd").val();
		var diaNewPwdConfirm = $("#diaNewPwdConfirm").val();

		var a = getRootPath();

		if (diaNewPwd != diaNewPwdConfirm) {
			$.messager.alert('提示消息', '两次密码不一致！','info');
		}else{
			$.ajax({
				type:			'POST',
			    dataType:		"json",
				url : 			getRootPath()+'/UserController/setPassword',
				data : 			{account:account,password:diaOldPwd,npassword:diaNewPwd},
				success : function(data){
					if(data.result == 'success'){
						$.messager.confirm("提示消息",data.msg,function(result){
							if (result) {
								debugger;
								window.location.href= a+'/UserController/logout';
//								window.location.href= a+'/content/login.jsp';
							}else{
								document.getElementById("loginform").submit();
							}
						});
					}else{
						$.messager.alert('提示消息',data.msg,'info');
						$('#loginform').form("reset");
					}
					
				},
				error : function(a) {
					$.messager.alert("警告", "操作失败！", "error");
				}
				
			});

		};
		
	});
});
