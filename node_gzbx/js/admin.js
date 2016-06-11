$(function(){
	$("#box").tabs({
		// width : 300,
		// height : 500,
		// plain : true,
		// fit : true,
		// border : false,
		tabWidth : 200,
		tabHeight : 50,
		tools : [{
			iconCls : 'icon-add',
			handler : function(){
				alert("add");
			}
		},{}],
		// toolPosition : 'left',
		// tabPosition : 'right',
		// selected : 1,
	});
})