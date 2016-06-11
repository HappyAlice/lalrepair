$(function(){
	var selectedRow={},   //存储已选择的数据
        operat = {}, //判断操作
        formValueArr = [], //用于判断表单是否全填
        formValidArr =[];

	//对话框操作
    var dialog = {
    	addQuestionDialogClose : function(){ //添加问题对话框关闭
    		Btn.offClick();
    		$('#addQuestionDialog').dialog('close');
		    datagrid.resetFormData();  //关闭对话框的时候清空表单数据
	    },
	    addQuestionDialogAppear : function(){  //添加问题对话框打开
	    	$('#addQuestionDialog').dialog({
			   closed : false
		    });
		    //编辑时修改对话框title
	    	if (operat.type == "edit") {
	    		$('#addQuestionDialog').dialog('setTitle','编辑问题'); 
	    	};
	    	//对话框出现带有类别值时资产边框框处理
	    	if (selectedRow.category == '硬件报修') {
	    		$('#propertyCode').attr('disabled',false);
	    	}else{
	    		$('#propertyCode').attr('disabled',true);
	    	}
	    },
	    valid : function(){  //验证
    	    //获取表单中的值
	        var category = $('#repair_category').combobox('getText');
    	    var project = $('#repair_project').combobox('getText');
    	    var detail = $('#repair_detail').combobox('getText');
    	    var place = $('#repair_place').val();
    	    var content = $('#repair_content').val();
    	    var propertyCode = $('#propertyCode').val();
    	    //将表单中的值存到数组formValueArr中
    	    formValueArr.push(category);
    	    formValueArr.push(project);
    	    formValueArr.push(detail);
    	    formValueArr.push(place);
    	    formValueArr.push(content);
    	    formValueArr.push(propertyCode);
            //如果formValueArr中值不为空的项添加到数组formValidArr中
            for(var i=0,j=formValueArr.length;i<j;i++){
            	if(formValueArr[i] != ""){
    	    		formValidArr.push(formValueArr[i]);
    	    	}
            }
            //得到两个数组的长度
    	    var allInput =formValueArr.length;
    	    var validInput = formValidArr.length;
    	    if (category == "硬件报修") {    //对硬件报修情况进行验证
    	    	if(allInput == validInput){
    	    		if (operat.type == "edit") {   //编辑状态执行更新操作
    	    			datagrid.updateRow();
    	    		}else{
    	    			datagrid.appendRow();   //添加状态执行添加操作
    	    		}
    	    		this.addQuestionDialogClose();    //对话框关闭
    	    	}else{
    	    		$.messager.alert('我的消息','请将信息填整，所有信息为必填项！','info');
    	    	};
    	    }else{     //除硬件报修情况外的其他情况
    	    	allInput = allInput-1;
    	    	if(allInput == validInput){
    	    		if (operat.type == "edit") {
    	    			datagrid.updateRow();
    	    		}else{
    	    			datagrid.appendRow();
    	    		}
    	    		this.addQuestionDialogClose();    //对话框关闭
    	    	}else{
    	    		$.messager.alert('我的消息','请将信息填整，所有信息为必填项！','info');
    	    	};
    	    }
    	    //清空数组
    	    formValueArr.length = 0;
    	    formValidArr.length = 0;
	    }
    }

    //combobox联动
	var Combobox= {
		catagory : function(){
			var _self = this;
			$('#repair_category').combobox({
			    url:'../../BarrierController/findBarrier',
			    valueField:'barrierRemark',
			    textField:'barrierRemark',
			    onSelect: function(record){
			    	_self.repairProjectLoad(record.barrierId);
				    if(record.barrierRemark == "硬件报修"){   //资产编号框是否可以编辑
	    				$('#propertyCode').attr('disabled',false);
		    	    }else{
		    	    	$('#propertyCode').attr('disabled',true);
		    	    }
		    	    datagrid.resetEditClear();   //除附件外其他文本框信息清除
		    	    
				}
	        });
	        if (operat.type == "edit") {     //编辑时，对报修类别设置值
	        	$('#repair_category').combobox('setValue',selectedRow.category);
	        };
	       
		},
		repairDetailLoad : function(repairProject){
			$('#repair_detail').combobox({
			    url:'../../BarrierController/findBarrierByParent',
			    queryParams: {barrierId : repairProject},
			    valueField:'barrierRemark',    
			    textField:'barrierRemark'
	        });
		},
		repairProjectLoad : function(categoryType){

			var _self = this;
			$('#repair_project').combobox({
			    url:'../../BarrierController/findBarrierByParent',
			    queryParams: {barrierId : categoryType},
			    valueField:'barrierRemark',    
			    textField:'barrierRemark',
			    onSelect : function(record){
			    	_self.repairDetailLoad(record.barrierId);
			    }
	        });
		}
	}
	
    //表格操作
	var datagrid ={
    	category : "",
    	project : "",
    	detail : "",
    	place : "",
    	content : "",
    	propertyCode : "",
    	/*accessoriesName : "",*/
    	getValue :function(){   //得到表单中的值
    		this.category = $('#repair_category').combobox('getText');
	    	this.project = $('#repair_project').combobox('getText');
	    	this.detail = $('#repair_detail').combobox('getText');
	    	this.place = $('#repair_place').val();
	    	this.content = $('#repair_content').val();
	    	this.propertyCode = $('#propertyCode').val();
	    	this.accessoriesName = $('#newaccessoriesName').val();
    	},
    	setValue : function(){   //对表单赋值
			$('#repair_category').combobox('setText',selectedRow.category);
	    	$('#repair_project').combobox('setText',selectedRow.project);
	    	$('#repair_detail').combobox('setText',selectedRow.detailed);
	    	$('#repair_place').val(selectedRow.problemAddress);
	    	$('#repair_content').val(selectedRow.problemContent);
	    	$('#propertyCode').val(selectedRow.assetNumber);
	    	var enclosure = selectedRow.enclosure;
	    	if(enclosure != null){
	    		$('#accessoriesName').val(enclosure.substring(15));
	    		$('#newaccessoriesName').val(enclosure);
	    	}
	    	
	    	
    	},
    	updateRow : function(){   //更新行
    		$('#addQuestionTable').datagrid('updateRow',{
				index: selectedRow.rowindex,
				row: {
					category : this.category,
					project : this.project,
					detailed : this.detail,
					problemAddress : this.place,
					problemContent : this.content,
					assetNumber : this.propertyCode,
					enclosure : this.accessoriesName
				}
			});
			this.setValueAfterEdit();
    	},
    	setValueAfterEdit : function(){
			//编辑之后对选中数据重新赋值
    		selectedRow.assetNumber = this.propertyCode;
    		selectedRow.category = this.category;
    		selectedRow.project = this.project;
    		selectedRow.detailed = this.detail;
    		selectedRow.problemAddress = this.place;
    		selectedRow.problemContent = this.content;
    		selectedRow.enclosure = this.accessoriesName;
    	},
    	appendRow : function(){   //添加行
    		$('#addQuestionTable').datagrid('appendRow',{
    			category : this.category,
    			project : this.project,
    			detailed : this.detail,
    			problemAddress : this.place,
    			problemContent : this.content,
				assetNumber : this.propertyCode,
				enclosure : this.accessoriesName
		    });
    	},
    	resetFormData : function(){   //重置表单值
    		$('#repair_category').combobox('reset');
    		$('#repair_project').combobox('reset');
	    	$('#repair_detail').combobox('reset');
	    	$('#repair_place').val(null);
	    	$('#repair_content').val(null);
	    	$('#propertyCode').val(null);
            $('#accessoriesName').val(null);
    	},
    	resetEditClear : function(){   //文本框值清除
    		$('#repair_detail').combobox('reset');
	    	$('#repair_place').val(null);
	    	$('#repair_content').val(null);
	    	$('#propertyCode').val(null);
    	},
    	removeRow : function(){   //删除一行
    		$('#addQuestionTable').datagrid('deleteRow',selectedRow.rowindex);
    	}
    }

    //确定按钮操作
    var Btn = {
    	clearBtn : function(){
    		//关闭事件
		    $('#btn_clear').on('click',function(){
		    	dialog.addQuestionDialogClose();   //关闭对话框
		    	$('#btn_clear').off('click');
		    });
    	},
    	upData : function(){
    		$('#btn_ok').on('click',function(){      //对话框确定按钮事件
				datagrid.getValue();   // 得到表单修改后的值
				/*dialog.addQuestionDialogClose();   //对话框关闭
				datagrid.updateRow();   //更新select的那一行*/
				dialog.valid();
		    });
    	},
    	appendToData : function(){
    		//对话框确定按钮事件
		    $('#btn_ok').on('click',function(){
		    	datagrid.getValue();    //得到表单中的值
        		dialog.valid();
		    });
    	},
    	offClick : function(){
    		$('#btn_ok').off('click');
    	}
    }

	//最外围面板
	$('#panelWrapper').panel({
		cls:"addRepairPanel",
		border : false
	});

	//问题列表面板
	$('#questionList').panel({
		cls:"questionListPanel",
		border : false
	});

	//按钮组
	$('[data-idenfy="btn"]').linkbutton({
    	plain:true
    });
	
	(function($) {
		$.getUrlParam = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		}
	})(jQuery);

    //问题列表表格表格
	$('#addQuestionTable').datagrid({
		url : '../../ProblemController/findProblemByRepairId',
		queryParams : {repairId : $.getUrlParam('repairId')},
    	height:300,
    	toolbar: '#toolBar',
    	border:false,
    	nowrap: true,
    	singleSelect : true,
    	fitColumns: true,
    	columns:[[
			{title:'报修类别',width:150,field:'category',align:'center'},
			{title:'报修项目',width:150,field:'project',align:'center'},
			{title:'故障明细',width:150,field:'detailed',align:'center'},
    		{title:'故障地点',width:150,field:'problemAddress',align:'center'},
    		{title:'资产编号',width:150,field:'assetNumber',align:'center'},
    		{title:'报修内容',width:150,field:'problemContent',align:'center'}
//    		{title:'附件',width:150,field:'enclosure',align:'center'}
    	]],
    	rownumbers : true,
    	onSelect : function(index,row){
    		/*将选择的数据存在对象a中*/
    		selectedRow.rowindex = index;
    		selectedRow.id = row.id;
    		selectedRow.assetNumber = row.assetNumber;
    		selectedRow.category = row.category;
    		selectedRow.project = row.project;
    		selectedRow.detailed = row.detailed;
    		selectedRow.problemAddress = row.problemAddress;
    		selectedRow.problemContent = row.problemContent;
    		selectedRow.enclosure = row.enclosure;
    	}
    });

    //初始化对话框
	$('#addQuestionDialog').dialog({
		modal: true,
		width : 675,
		draggable : true,
		closed : true
	});

    //移除
    $('#btn_remove').on('click',function(){
    	var getSelect = $('#addQuestionTable').datagrid('getSelections');   //获取当前选择的行
    	if(getSelect.length == 1){   
	    	$.messager.confirm('确认对话框', '确认删除？', function(b){   //确认框
				if (b){   //确认按钮操作
	    	        datagrid.removeRow();  //删除select的一行
				}
			});
    	}else{
    		$.messager.alert('我的消息','请选择一行！','info');   //消息框
    	}
    });

	//添加问题按钮事件
    $('#btn_add').on('click',function(){
    	operat.type = "add";
    	dialog.addQuestionDialogAppear();   //对话框打开
		Combobox.catagory();  //报修类别combobox框并且联动
		Btn.clearBtn();   //点击取消按钮
		Btn.appendToData();    //点击确认框将数据添加到表格中
    });

    //编辑
	$('#btn_edit').on('click',function(){
		operat.type = "edit";
		var getSelect = $('#addQuestionTable').datagrid('getSelections');   //获取当前选择的行
		if(getSelect.length == 1){    //判断是否有选中行
			dialog.addQuestionDialogAppear();   //添加问题对话框出现
	        datagrid.setValue();  //将select的一行赋值给表单元素
			Combobox.catagory();	 //报修类别combobox框并且联动
			Btn.clearBtn();  //点击取消按钮
			Btn.upData();    //点击确认框将选中行的数据更新
		}else{
			$.messager.alert('我的消息','请选择一行！','info');
		}
	});
});
/*
 * 提交报修
 */
$('#btn_submit').on('click',function(){
	var saveRepairModel={};
	var repair = {};
	var list = {};
	var repairs = $('#repairInfoForm input');
	$.each(repairs,function(){
		repair[$(this).attr('name')] = $(this).val();
	});
	list = $('#addQuestionTable').datagrid('getRows');
	
	saveRepairModel.repair = repair;
	saveRepairModel.list = list;
	$.ajax({
		type:'post',
		contentType : 'application/json;charset=utf-8', //设置请求头信息
        dataType:"json",
		url : '../../RepairController/submitRepair',
		data : JSON.stringify(saveRepairModel),
		success : function(date){
			if(date.result=='success'){
				alert(date.msg);
				window.opener.location.reload();
				window.close();
			}
		}
	})
});

/*
 * 保存报修
 */
$('#btn_sava').on('click',function(){
	var saveRepairModel={};
	var repair = {};
	var list = {};
	var repairs = $('#repairInfoForm input');
	$.each(repairs,function(){
		repair[$(this).attr('name')] = $(this).val();
	});
	list = $('#addQuestionTable').datagrid('getRows');
	saveRepairModel.repair = repair;
	saveRepairModel.list = list;
	
	debugger;
	
	$.ajax({
		type:'post',
		contentType : 'application/json;charset=utf-8', //设置请求头信息
		dataType:"json",
		url : '../../RepairController/saveOrUpdateRepair',
		data : JSON.stringify(saveRepairModel),
		success : function(date){
			if(date.result=='success'){
				alert(date.msg);
				window.opener.location.reload();
				window.close();
			}
		}
	})
});

$(document).ready(function() { 
	var repairId = $.getUrlParam('repairId');
	$('#repair_Id').val(repairId);
});
