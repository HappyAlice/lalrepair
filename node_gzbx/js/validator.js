$(function(){
	//正则表达式
	var re_account = /[^\w\u4E00-\u9FA5]/g;  //任何非ASCII字符或非汉字
	var re_pwd = /[^\w_]/g;  //非字母数字下划线字符
	var re_name = /[\u4E00-\u9FA5]/g; // 汉字
	var re_tel = /^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;     //电话号码验证规则
	var re_mail = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+.+[a-z]{2,4}$/; //邮箱验证规则
	
	var repasswordInput = $("#repassword");
//    repasswordInput.attr("disabled","disabled");

	//表单框获取焦点时，展现提示信息
	$("form :input").focus(function(){
		if ($(this).is('#account')) { // 账号验证
			var registerAccount = $("#register-account");
			registerAccount.addClass("tips");
			registerAccount.text('请输入字母、数字、中文(=2个字符)、6-30位');
		}

		if ($(this).is('#password')) {  //密码验证
			var registerPwd = $("#register-pwd");
			registerPwd.addClass("tips");
			registerPwd.val('请输入字母、数字、下划线、6-16位');
		}

		if ($(this).is('#repassword')) { //确认密码验证
			var registerRePwd = $("#register-rePwd");
			registerRePwd.addClass("tips");
			registerRePwd.text('请输入确认密码！');
		}

		if ($(this).is('#userName')) {  //用户名验证
			var registerUseName = $("#register-useName");
			registerUseName.addClass("tips");
			registerUseName.text('请输入账户名！');
		}

		if ($(this).is('#telephone')) {  //电话号码验证
			var registerTel = $("#register-telnum");
			registerTel.addClass("tips");
			registerTel.text('请输入正确的手机号码！');
		}

		if ($(this).is('#mail')) {  //邮箱验证
			var registerMail = $("#register-mail");
			registerMail.addClass("tips");
			registerMail.text('请输入邮箱号码!');
		}
		if ($(this).is('#code')) {
			var registerCode = $("#register-code");
//			registerCode.addClass("code-tips");
//			registerCode.text('请输入验证码！');
		};
	});

	//表单框失去焦点时，对表单进行各种验证
	$("form :input").blur(function(){
		if ($(this).is('#account')) { // 账号验证
			var registerAccount = $("#register-account");
			var value = $("#account").val();
			if(this.value == '' || this.value.length < 5 || this.value.length > 30){
				registerAccount.addClass('error');
				registerAccount.text('请输入5-30个字符！');
			}else if(re_account.test(this.value)){
				registerAccount.addClass('error');
				registerAccount.text('存在非法字符！');
			}else{
				
				$.ajax({
					url: '../UserController/isExsitAccount',
	                type: 'post',
	                dataType: 'json',
	                data: { account: value},
	                success:function(data){
	                	if(data.valid){
	                		registerAccount.removeClass('error');
	        				registerAccount.addClass('success');
	        				registerAccount.text("");
	                		
	                	}else{
	                		registerAccount.text('账户名已存在！');
	                		registerAccount.addClass('error');
	                	}
	                }
				});
			}
		}

		if ($(this).is('#password')) {  //密码验证
			var registerPwd = $("#register-pwd");
			if (this.value == '' || this.value.length < 6 || this.value.length > 12) {
				registerPwd.addClass('error');
				registerPwd.text('请输入6-16个字符！');
			}else if( re_pwd.test(this.value)){
				registerPwd.addClass('error');
				registerPwd.text('存在非法字符！');
			}else{
				registerPwd.removeClass('error');
				registerPwd.addClass('success');
				registerPwd.text("");
//			    repasswordInput.removeAttr('disabled');
			}
		}

		if ($(this).is('#repassword')) { //确认密码验证
			var registerRePwd = $("#register-rePwd");
			if (this.value == '') {
				registerRePwd.addClass('error');
				registerRePwd.text('确认密码不能为空！');
			}else if($("#repassword").val() !== $("#password").val()){
				registerRePwd.addClass('error');
				registerRePwd.text('两次输入密码不相等！');
			}else{
				registerRePwd.removeClass('error');
				registerRePwd.addClass('success');
				registerRePwd.text("");
			}
		}

		if ($(this).is('#userName')) {  //用户名验证
			var registerUseName = $("#register-useName");
			if (this.value == '' || this.value.length < 2) {
				registerUseName.addClass('error');
				registerUseName.text('请输入账户名！')
			}else if(re_account.test(this.value)){
				registerUseName.addClass('error');
				registerUseName.text('存在非法字符！');
			}else{
				registerUseName.removeClass('error');
				registerUseName.addClass('success');
				registerUseName.text("");
			};
		}

		if ($(this).is('#telephone')) {  //电话号码验证
			var registerTel = $("#register-telnum");
			if (this.value == '' || this.value.length != 11) {
				registerTel.addClass('error');
				registerTel.text('请输入正确的手机号码！')
			}else if(!re_tel.test(this.value)){
				registerTel.addClass('error');
				registerTel.text('手机号码格式不正确！');
			}else{
				registerTel.removeClass('error');
				registerTel.addClass('success');
				registerTel.text("");
			}
		}

		if ($(this).is('#mail')) {  //邮箱验证
			var registerMail = $("#register-mail");
			if (this.value == '') {
				registerMail.addClass('error');
				registerMail.text('请输入邮箱号码！');
			}else if(!re_mail.test(this.value.trim())){
				registerMail.addClass('error');
				registerMail.text('邮箱格式不正确!');
			}else{
				registerMail.removeClass('error');
				registerMail.addClass('success');
				registerMail.text("");
			}
		}

		if ($(this).is('#code')) {   //验证码验证
//			var registerCode = $("#register-code");
//			if (this.value == '') {
//				registerCode.text('请输入验证码！');
//				registerCode.addClass('error');
//			}else{
//				$.ajax({
//					url: '../Register/checkCode',
//	                type: 'post',
//	                dataType: 'json',
//	                data: { code: this.value},
//	                success:function(data){
//	                	if(data.valid){
//	                		registerCode.removeClass('error');
//	                		registerCode.addClass('success');
//	                		registerCode.text("");
//	                	}else{
//	                		registerCode.text('输入有误！');
//	                		registerCode.addClass('error');
//	                	}
//	                }
//				});
//			}
//		};
			var registerCode = $("#register-code");
			if (this.value == '') {
				// registerCode.text('请输入验证码');
				registerCode.addClass('error');
			}else{
				$.ajax({
					url: '../Register/checkCode',
	                type: 'post',
	                dataType: 'json',
	                data: { code: this.value},
	                success:function(data){
	                	if(data.valid){
	                		registerCode.removeClass('error-and');
	                		registerCode.text("");
	                	}else{
	                		registerCode.text('验证码有误');
	                		registerCode.addClass('error-and');
	                	}
	                }
				});
			}
		};
		
	});
	
	//点击提交时验证所有表单是否都验证通过true:提交表单;false:阻止表单提交
	$("#submit").on('click', function(){
		$("form .required:input").trigger('blur');
		var numError = $('form .error').length;
		var numError_and = $('form .error-and').length;
		if (numError) {
			return false;
		}else if(numError_and){
			return false;
		}else{
			$("form").submit();
		}
	});

	 //更改验证码
	  $("#img").on("click",function(){
	  		var img1 = document.getElementById("checkImg");
			img1.src="../Register/checkImg?_=" + (new Date()).getTime();
	  });

	  $.ajax({
	    	url : "../FirmController/findFirm",
	    	type : "GET",
	    	dataType : 'json',
	    	success : function(data){
	    		var company = $("#company");
	            for(var i=0 ; i<data.length; i++){
	            	if(i==2){
	            		var option = $('<option value="" wuwei="" selected></option>').appendTo(company);
	            	}else{
	            		var option = $('<option value="" wuwei="" ></option>').appendTo(company);
	            	}
	            	option.attr('wuwei',data[i].firmId);
	            	option.val(data[i].remark);
	            	option.text(data[i].remark);
	            };
	            change();
	        }
		});
	      
	     
		$("#company").on('change',function(){
	        change();
	    });

	    function change(){
	        var companyId =$("#company>option:selected").attr('wuwei');
	        $.ajax({
	            url:"../FirmController/findDepartment",
	            type : "GET",
	            data : {firmId:companyId},
	            dataType : 'json',
	            success : function(data){
	                var department = $("#department");
	                if($('#department > option')){
	                    $('[data-idenfy="aa"]').remove();
	                };
	                $.each(data,function(index,item){
	                    var option = $('<option value="" data-idenfy="aa"></option>').appendTo(department);
	                    option.val(data[index].remark);
	                    option.text(data[index].remark);
	                });
	            }
	        });
	    }
})