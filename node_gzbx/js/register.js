$(function(){

	 $.ajax({
    	url : "../FirmController/findFirm",
    	type : "GET",
    	dataType : 'json',
    	success : function(data){
    		var company = $("#reg_company");
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
      
     
	$("#reg_company").on('change',function(){
        change();
    });

    function change(){
        var companyId =$("#reg_company>option:selected").attr('wuwei');
        $.ajax({
            url:"../FirmController/findDepartment",
            type : "GET",
            data : {firmId:companyId},
            dataType : 'json',
            success : function(data){
                var department = $("#reg_department");
                if($('#reg_department > option')){
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


// 实现公司和部门的二级联动
// $(function(){
// 	$('#reg_company').combobox({
// 		url : "b.json",
// 		valueField:'companyId',
//         textField:'companyName',

//         onChange : function(newValue,oldValue){

// 			// 将公司的id发送到后台并取得相应的部门信息
// 	        var companyId = $('#reg_company').combobox("getValue");
// 	        $.ajax({
// 	        	url : "a.json",
// 	        	type : "GET",
// 	        	data : {
// 	        		firmId : companyId
// 	        	},
// 	        	dataType : 'json',
// 	        	success : function(data){
// 	                $('#reg_department').combobox({
// 	                		url : "a.json",
// 	                		textField : 'departmentName',
// 	                		departmentName : 'departmentId'
// 	                });
// 	        	}
// 	        });
// 	    }

// 	});
// })


// 验证两次输入密码是否一致，密码长度为6到16
/*var pasd = $('#reg_password').val();
var rpasd = $('#reg_rpassword').val();

if(pasd.length > 0 && ( pasd.length < 6 || pasd.length > 16 )){
    alert("请输入6到16位密码！");
}else if(rpasd.length < 0){
    alert("请输入确认密码！");
}else{
    if (pasd !== rpasd) {
        alert("两次输入密码不一致");
    };
}*/

