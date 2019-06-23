function initCard(){

	function q() {
		$("#jdpayCards .bankcard-list").hide(),
		$("#jdpayCards").removeClass("switch-on")
		$("#jdpayCards .bankcard-info").bind("click", r),
		$(document).unbind("click", q)
	}
	function r() {
		return $("#jdpayCards .bankcard-list").show(),
		$("#jdpayCards").addClass("switch-on"),
		$("#jdpayCards .bankcard-info").unbind("click", r),
		$(document).bind("click", q),
		!1
	}
	$("#jdpayCards .bankcard-info").bind("click", r);
	//绑定事件
	$(".bankcard-list li").click(function(){
		var lastSelect = $("#jdpy_cardInfo").val();
	    if($(this).hasClass("bc-disabled")){
			return;
		}
	    if(this.id==lastSelect){
			return;
		}
		$("#"+lastSelect).removeClass("bc-selected");//移除原先选中的
		var content = $(this).html();//取出本次选中卡信息添加到info
		$(".bankcard-info").empty().prepend(content+'<div class="arrow"></div>');
		$(this).addClass("bc-selected");
		$("#jdpy_cardInfo").val(this.id);
		isNeedPaymentPassword();
	});

	//页面记录上次选择的，没有则选第一条
	var lastSelect = $("#jdpy_cardInfo").val();
	if(lastSelect=="nocard"){
		var lis=$(".bankcard-list li[valid='1']");//没有卡会选到添加新卡的li
		var content = lis.first().html();//第一个可用的
		$(".bankcard-info").prepend(content+'<div class="arrow"></div>');//添加到info
		lis.first().addClass("bc-selected");//下拉框里选中的span加selected样式
		$("#jdpy_cardInfo").val(lis.first().attr("id"));//记录到隐藏域
	}else{
	    var content = $("#"+lastSelect).html();
		$(".bankcard-info").prepend(content+'<div class="arrow"></div>');
		$("#"+lastSelect).addClass("bc-selected");
	}
	isNeedPaymentPassword();
}