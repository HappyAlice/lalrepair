$(function(){
	myPanel('#reportList','myHeader','报修列表',950,83);
	myPanel('#questionList','myHeader','问题列表',950);
	
	//创建面板
	function myPanel(id,headerCls,title,width){
		$(id).panel({
			headerCls : headerCls,
			title : title,
			width : width,
		});
		
	}

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
	 * 报修详情那四条记录
	 */
	$.ajax({
		type:'post',
	    dataType:"json",
		url : '../../RepairController/findRepairDetailById',
		data : {repairId: $.getUrlParam('repairId')},
		success : function(date){
			$('#repairMan').textbox('setValue', date.repairMan);
			$('#department').textbox('setValue', date.department);
			$('#telepone').textbox('setValue', date.telepone);
			$('#repairTime').textbox('setValue', date.repairTime);
		},
	});
	
	/**
	 * 过程记录
	 */
	$.ajax({
		type:'post',
	    dataType:"json",
		url : '../../ProcessController/findProcessByRepairId',
		data : {repairId: $.getUrlParam('repairId')},
		success : function(data){
			var num = data.length - 1;
			for ( var i = 0; i <= num; i++) {
				
				var $pro = $('<ul style="border-bottom:1px solid #95B8E7;">'+
						'<li class="inputGroup">'+
						'<label>序号:</label>'+
						'<input class="complainInputs" type="text" value="'+(i+1)+'" style="width:50px" readonly="readonly"></li>'+
					
						'<li class="inputGroup">'+
							'<label>报修状态:</label>'+
							'<input id="state'+i+'" class="complainInputs" type="text" style="width:55px" readonly="readonly">'+
						'</li>'+
						'<li class="inputGroup">'+
							'<label>处理人:</label>'+
							'<input class="complainInputs" type="text" value="'+data[i].dealMen+'" style="width:150px" readonly="readonly">'+
						'</li>'+
						'<li class="inputGroup">'+
							'<label>处理时间:</label>'+
							'<input class="complainInputs" type="text" value="'+data[i].processTime+'" style="width:140px" readonly="readonly">'+
						'</li>'+
						'<li class="inputGroup">'+
							'<label style="margin-left:12px">处理记录:</label>'+
							'<textarea id="textarea'+i+'" style="width:615px;height:75px;border:1px solid #95B8E7; border-radius:3px;" readonly="readonly"></textarea>'+
						'</li>'+
					'</ul>');
				
				$('#prossess').append($pro);
				
				//（待受理1 已受理2 处理中3 已处理4 已拒绝5）
				if(data[i].state == '1'){
					$("#state"+i).val('待受理');
				}else if(data[i].state == '2'){
					$("#state"+i).val(' 已受理');
				}else if(data[i].state == '3'){
					$("#state"+i).val('处理中');
				}else if(data[i].state == '4'){
					$("#state"+i).val('已处理');
				}else if(data[i].state == '5'){
					$("#state"+i).val('已拒绝');
				}
				
				//为处理记录设值（处理换行问题）
				var textarea = (data[i].dealRemark).replace(/@/g,"\n");
				$("#textarea"+i).val(textarea);
				
			}

			//根据状态控制流程图的图片展示
			var processImg = $("#processImg");
			if(data[num].state == '1'){
				processImg.css({'background': 'url(../../images/batchdetails1.gif) no-repeat center center'});
			}else if(data[num].state == '2'){
				processImg.css({'background': 'url(../../images/batchdetails2.gif) no-repeat center center'});
			}else if(data[num].state == '3'){
				processImg.css({'background': 'url(../../images/batchdetails3.gif) no-repeat center center'});
			}else if(data[num].state == '4'){
				processImg.css({'background': 'url(../../images/batchdetails4.gif) no-repeat center center'});
			}else if(data[num].state == '5'){
				processImg.css({'background': 'url(../../images/batchdetails5.gif) no-repeat center center'});
			}
		},
	});	
	
});
	

//状态
function problemState(value,row,index){
	if(value==="0") {
		return "保存";
	}
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

//详情
function detail(value,row,index){
	var rowId = row.problemId;
	return "<a  style='color:#069' href='problemdetail.jsp?problemId="+rowId+"' target='_blank' >详情</a>";
}

function enclosure(value,row,index){
	var rowId = row.enclosure;
	if(rowId){
		return "<a style='color:#069' href=../../FileController/download?fileName="+rowId+">下载</a>";
	}
	
} 

//投诉 
function isComplaint(value,row,index){
	if(value==="1") {
		return "<span style='color:red'>有</span>";
	}
	else{
		return "无";
	}
}

