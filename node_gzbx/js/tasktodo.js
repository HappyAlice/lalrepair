$(function(){
	var taskNumber = 0;  //总的待办任务条数
	var panels = $(".panels");//取得带有panels类的div

	createPanels();

	function createPanels(){
		
		if (panels.length == 1) {
			panels.css({"width":"100%", "height":"100%"});
		}
		else if(panels.length == 2){
			panels.css({"width":"50%", "height":"100%"});
		}
		else if(panels.length == 3){
			panels.css({"width":"33.3%", "height":"100%"});	
		}
		else if(panels.length == 4){
			panels.css({"width":"50%", "height":"50%"});
		}
		else if(panels.length == 5){
			for(var i = 0; i <= 2; i++){
				panels.eq(i).css({"width":"33.3%", "height":"50%"});
			}
			for(var i = 3; i <= 4 ; i++){
				panels.eq(i).css({"width": "50%", "height":"50%"});
			}
		}
		else if(panels.length == 6){
			panels.css({"width":"33.3%", "height":"50%"});
		}
	}

	taskContain();
	
	function taskContain(){
		for (var i = 0 ; i < panels.length ; i++) {
			var ids = panels.eq(i).attr('id');
			
			/**
			 * 待受理的报修单
			 */
			if (ids == 'taskTodo') {
				$.ajax({
					type: "POST",
				    url: "../../RepairController/findRepairsByState",
				    cache: false,
				    async: false,
				    dataType:"json",
				    data : {state : '1'},
				    success: function(data){
				   		var num = data.length;
				   		taskNumber = taskNumber + num;
				   		var uls = $("#taskTodoul");
				   		for (var i = 0; i <= num - 1; i++) {
							$('<li><a href="../biller/acceptrepairs.jsp?repairId='+data[i].repairId+'" target="_blank" >报修单：'
							+data[i].repairNum+ '未处理, 请及时受理 !</a><span class="taskTime">'+(data[i].repairTime).substring(0,10)+'</span></li>').appendTo(uls);
				   		};
				   }
				});
				/**
				 * 待处理的投诉
				 */
			}else if (ids == 'complainTodo') {
				$.ajax({
					type: "POST",
				    url: "../../ComplainController/findComplain",
				    cache: false,
				    async: false,
				    dataType:"json",
				    success: function(data){
				   		var num = data.length;
				   		taskNumber = taskNumber + num;
				   		var uls = $("#complainTodoul");
				   		for (var i = 0; i <= num - 1; i++) {
							$('<li><a href="../dispacher/dealcomplain.jsp?problemId='+data[i].problemId+'" target="_blank">投诉问题：'+data[i].problemNum+data[i].project+ '</a><span class="taskTime">'
									+(data[i].complainTime).substring(0,10)+'</span></li>').appendTo(uls);
				   		};
				   }
				});

				/**
				 * 待审批的延期
				 */
			}else if (ids == 'delayTodo') {
				$.ajax({
					type: "POST",
				    url: "../../DelayController/findDealDelays",
				    cache: false,
				    async: false,
				    dataType:"json",
				    success: function(data){
				   		var num = data.length;
				   		taskNumber = taskNumber + num;
				   		var uls = $("#delayTodoul");
				   		for (var i = 0; i <= num - 1; i++) {
							$('<li><a href="../dispacher/dealdelay.jsp?problemId='+data[i].problemId+'" target="_blank">问题编号：'+data[i].problemNum+data[i].project +'</a><span class="taskTime">'
									+(data[i].applyTime).substring(0,10)+'</span></li>').appendTo(uls);
				   		};
				   }
				});

				/**
				 * 待评价的问题
				 */
			}else if (ids == 'commentTodo') {
				$.ajax({
					type: "POST",
				    url: "../../ProblemController/findProsByState",
				    cache: false,
				    async: false,
				    dataType:"json",
				    data : {state : '3'},
				    success: function(data){
				   		var num = data.length;
				   		taskNumber = taskNumber + num;
				   		var uls = $("#commentTodoul");
				   		for (var i = 0; i <= num - 1; i++) {
							$('<li><a href="evaluate.jsp?problemId='+data[i].problemId+'" target="_blank" >您有问题编号：'
							+data[i].problemNum+' 未评价, 请及时评价!</a><span class="taskTime">'+(data[i].repairTime).substring(0,10)+'</span></li>').appendTo(uls);
				   		};
				   }
				});
				
				/**
				 * 待派发的报修单
				 */
			}else if (ids == 'deparctureTodo') {
				$.ajax({
					type: "POST",
				    url: "../../RepairController/findRepairsByState",
				    cache: false,
				    async: false,
				    dataType:"json",
				    data : {state : '2'},
				    success: function(data){
				   		var num = data.length;
				   		taskNumber = taskNumber + num;
				   		var uls = $("#deparctureTodoul");
				   		for (var i = 0; i <= num - 1; i++) {
							$('<li><a href="../dispacher/deparcture.jsp?repairId='+data[i].repairId+'" target="_blank" >报修单：'
							+data[i].repairNum+ '已受理, 请及时派发任务!</a><span class="taskTime">'+(data[i].repairTime).substring(0,10)+'</span></li>').appendTo(uls);
				   		};
				   }
				});

				/**
				 * 待处理的问题
				 */
			}else if (ids == 'problemTodo') {
				$.ajax({
					type: "POST",
				    url: "../../ProblemController/findProsByState",
				    cache: false,
				    async: false,
				    dataType:"json",
				    data : {state : '2'},
				    success: function(data){
				   		var num = data.length;
				   		taskNumber = taskNumber + num;
				   		var uls = $("#problemTodoul");
				   		for (var i = 0; i <= num - 1; i++) {
							$('<li><a href="problemdetail.jsp?problemId='+data[i].problemId+'" target="_blank" >您有问题编号：'
							+data[i].problemNum+" "+data[i].project +'未处理, 请及时处理 !</a><span class="taskTime">'+(data[i].repairTime).substring(0,10)+'</span></li>').appendTo(uls);
				   		};
				   }
				});

			};
		}
		
	}
	$("#taskTips").text(taskNumber); // 消息提示总共有几条待办任务
})

	
