function initUploadify(){
    $("#btn_upload").uploadify({
    'uploader'  : '../../FileController/download',
    'swf'    : '../../css/css/uploadify/uploadify/uploadify.swf',
    'buttonImage' :'../../css/css/uploadify/uploadify/browse-btn.png',
    //如果屏蔽图片，那么buttonText生效
    'cancelImg' : '../../css/css/uploadify/uploadify/uploadify-cancel.png',
    'folder'    : '../../css/css/uploadify/uploadify/upload',
    'queueId'   :   "fileQueue",  
    'fileTypeExts'   :'*.bmp;*.jpg;*.jpeg;*.png;*.excel;*.doc;*.docx;*.txt;*.xlsx',  
    'auto'      :   false,  
    'multi'     :   false,//是否允许多文件上传  
    'queueSizeLimit' : 10, //如果选择的文件数量超出此限制将会出发onSelectError
    'fileSizeLimit' : '5MB',
    'buttonText':   "选择文件",
    //解决BUG：打开页面报404错误
    'removeCompleted' : true, 
    "successTimeout":1800,   //上传超时时间,默认是30s
    'method'    :   "POST",
    'overrideEvents' : ['onUploadError', 'onSelectError'],
    'onSelectError' : uploadify_onSelectError,//方法被重写
    'onUploadError' : uploadify_onUploadError,//方法被重写
    // onUploadError:function(file, errorCode, errorMsg, errorString){
    //     $.messager.alert("警告", "导入失败！", "warn");
    // },
    //文件浏览选择窗口关闭
    onDialogClose:function(queueData){
    },
    onClearQueue : function(queueItemCount) {
      $.messager.alert("info", "上传队列被清空！", "success");
    },
    'onCancel' : function(file) {
          //alert('The file ' + file.name + ' was cancelled.');
    },
    //验证文件名称长度
    onSelect:function(file){
        if(file.name.length > 20){
            alert(file.name+"文件名过长,不能超过20个字,无法添加到上传队列！");
            $('#btn_upload').uploadify('cancel',file.id);
        }
    },
    //上传开始的时候，设置传递参数
    onUploadStart:function(file){
        // var element = {};
        // element.qdApplyId=$("#qdapply_id").val();
        // element.adApplyId=$("#adapply_id").val();
        // element.sectorType=$("#sector_type").val();
        // $("#btn_upload").uploadify("settings","formData",element);
    },
    onFallback : function() { //Flash无法加载错误
        alert("您未安装FLASH控件，无法上传！请安装FLASH控件后再试。");
    },
    onUploadSuccess : function(file,date,response){
    	var data = jQuery.parseJSON(date);
    	$('#accessoriesName').val(data.name);
    	$('#newaccessoriesName').val(data.newName);
    },
    onQueueComplete:function(data){//队列中的文件都上传成功触发的事件
        if(data.uploadsSuccessful>0){
                //$.messager.alert('提示',data.uploadsSuccessful+'个图片上传成功!\t\n'+data.uploadsErrored+'个图片上传失败!','info',function(){
                $.messager.alert('提示','上传成功!','info',function(){
                    //关闭上传弹窗
                    $('#upload_dialog').dialog('close');
                });
            // $('#'+ID).datagrid("reload");
        }else{
            $.messager.alert("提示", "上传失败！", "info");
        }
    }
});
//模糊匹配
/* $("object[id*='SWFUpload_']").css('position','');*///解决BUG：浏览按钮有一半不能点击
// $('#SWFUpload_0').css('position','');//解决BUG：浏览按钮有一半不能点击
}
/******************************重写报错提示语句开始***************************/
var uploadify_onSelectError = function(file, errorCode, errorMsg) {
    var msgText = "上传失败\n";
    switch (errorCode) {
        case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
            //this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
            msgText += "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
            break;
        case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
            msgText += "文件大小超过限制( " + this.settings.fileSizeLimit + " )";
            break;
        case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
            msgText += "文件大小为0";
            break;
        case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
            msgText += "文件格式不正确\n" + this.settings.fileTypeDesc;
            break;
        default:
            msgText += "错误代码：" + errorCode + "\n" + errorMsg;
    }
    alert(msgText);
}

var uploadify_onUploadError = function(file, errorCode, errorMsg, errorString) {
    // 手工取消不弹出提示
    if (errorCode == SWFUpload.UPLOAD_ERROR.FILE_CANCELLED
            || errorCode == SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED) {
        return;
    }
    var msgText = "上传失败\n";
    switch (errorCode) {
        case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
            msgText += "HTTP 错误\n" + errorMsg;
            break;
        case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
            msgText += "上传文件丢失，请重新上传";
            break;
        case SWFUpload.UPLOAD_ERROR.IO_ERROR:
            msgText += "IO错误";
            break;
        case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
            msgText += "安全性错误\n" + errorMsg;
            break;
        case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
            msgText += "每次最多上传 " + this.settings.uploadLimit + "个";
            break;
        case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
            msgText += errorMsg;
            break;
        case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
            msgText += "找不到指定文件，请重新操作";
            break;
        case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
            msgText += "参数错误";
            break;
        default:
            msgText += "文件:" + file.name + "\n错误码:" + errorCode + "\n"
                    + errorMsg + "\n" + errorString;
    }
    alert(msgText);
}

function startUpload(){
    $('#btn_upload').uploadify('upload','*');
}

function uploadFile(){
	$('#upload_dialog').dialog('open');
	initUploadify();
}
function delFile(ID){
    var url="";
    var msg="删除成功!";
    commonInvokeAction(ID,url,true,msg);
}
function commonInvokeAction(ID,url,ShowSuccess,msg){
    var rows = $("#"+ID).datagrid("getSelections");
    if(rows.length == 0 || !rows){
        //去掉按Enter键事件
        document.onkeydown = "";
        var msgDict_2 = $.messager.alert("提示", "请先选择一行记录", "info");
        //捕捉messager关闭事件
        msgDict_2.window({onClose:function(){
            dialogClose();
        }});
        return;
    }
    var ids = "";
    for (var i = 0; i<rows.length; i++) {
        var temp = (i+1==rows.length)?"":",";
        ids+= rows[i].id + temp;
    };
    if (ShowSuccess) {
        $.messager.confirm('提示信息' , "确认删除？", function(r){
        if (r) {
                $.ajax({
                type:'post',
                url:url,
                data:{
                   ids:ids
                },
                datatype:'json',
                success : function(data) {
                    if (ShowSuccess) {
                        if (data=='success'){
                            $.messager.alert('提示',msg,'success');
                            $("#"+ID+"").datagrid("reload");
                        }   
                    };
                }, 
                error : function(a) {
                    $.messager.alert("警告", "系统出错，请联系管理员！", "error");
                }
            });
            }
        });
    }else{
        $.ajax({
            type:'post',
            url:url,
            data:{
               ids:ids
            },
            datatype:'json',
            error : function(a) {
                $.messager.alert("警告", "系统出错，请联系管理员！", "error");
            }
        });
    }
}

$('#delBtn').on('click',function(){
	$.messager.confirm('提示信息' , "确认删除？", function(r){
		if(r){
			var id = $('#newaccessoriesName').val();
			$.ajax({
				type : "POST",
				url : "../../FileController/deleteFile",
				data: {fileName : id},
				dataType: "json",
				success:function(data){
					console.info(data);
					var info = data.info;
					$.messager.alert('提示','删除成功!','info');
					$('#accessoriesName').val("");
					$('#newaccessoriesName').val("");
				}
			});
		}
		
	});

});