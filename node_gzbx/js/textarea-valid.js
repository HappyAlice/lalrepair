//将非单字符替换成两个单字符
function getLength(str){
		return str.replace(/[^\x00-xff]/g, "xx").length; 
	}	

$(function(){
	var textarea_length = 0; //textarea的字符数
	var max_length = 300; //限制的最大字符数
	var less_length; //还能输入多少个字符
	var value; //textarea的值

	var validTextarea = $("#valid-textarea");
	var accountTextarea = $("#textarea-count");

	validTextarea.focus(function(){
		less_length = max_length - textarea_length;
		if (less_length <= 0) {less_length = 0;}
		accountTextarea.val(less_length);
	});

	//键盘放开时
	validTextarea.keyup(function(){
		textarea_length = getLength(this.value);
		less_length = max_length - textarea_length;

		// 当输入字符数大于限制的最大字符数时
		if (less_length <= 0) {
			less_length = 0;
			value = validTextarea.val().substring(0,max_length);
			validTextarea.val(value);
		};
		accountTextarea.text(less_length);
	});

    // 数去焦点时再判断一次，避免鼠标右键黏贴超出限制字数
	validTextarea.blur(function(){
		// 当输入字符数大于限制的最大字符数时
		if (less_length <= 0) {
			value = validTextarea.val().substring(0,max_length);
			validTextarea.val(value);
		};
	});
});