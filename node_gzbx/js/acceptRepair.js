
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


function loginOut(){
	window.parent.location.href="../index.html";
}


var receive = {
	receiveSubmit : function(){
		if(!window.opener || (window.opener && window.opener.closed)){
			loginOut();
			return;
		}
		var level = document.getElementById('level').value;
		var limited = document.getElementById('limited').value;
		
		$.ajax({
			type : "POST",
			url : "../../RepairController/acceptRepair",
			data: {repairId : $.getUrlParam('repairId'),
					level : level,
					limited:limited},
			dataType: "json",
			success: function(data, textStatus){
				debugger;
				if(data.result=='success'){
					alert("受理成功");
					window.opener.location.reload();
					window.close();
				}else{
					alert(data.msg);
					window.opener.location.reload();
					window.close();
				}
				
			}
		});


		
		
	},
	// 拒绝理由对话框确定
	receiveNot : function(){
		if(!window.opener || (window.opener && window.opener.closed)){
			loginOut();
			return;
		}

		var refuseReason = document.getElementById('refuseReason').value;
		
		if(!$.trim(refuseReason)=='') {
			$.ajax({
				type : "POST",
				url : "../../RepairController/refuseRepair",
				data: {repairId : $.getUrlParam('repairId'),
						dealRemark : refuseReason},
				dataType: "json",
				success: function(data, textStatus){
					if(data.result=='success'){
						alert("操作成功");
						window.opener.location.reload();
						window.close();
					}else{
						alert(data.msg);
						window.opener.location.reload();
						window.close();
					}
				}
			});
			
			
		}

	 
	},
	//关闭拒绝理由面板
	receiveNotClose : function(){
		$('#addRepairDialog').dialog('close');

	}
};
		
//打开拒绝理由面板
function openRepairDialog(){
	$('#addRepairDialog').dialog('open');
}
			
