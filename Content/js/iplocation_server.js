var GeoIpService = "http://price.360buy.com/ows/GetIPLocation.aspx";
var StockSoaService = "http://price.360buy.com/stocksoa/StockHandler.ashx";
var iplocation = {"北京": { id: "1", root: 0, djd: 1,c:72 },"上海": { id: "2", root: 1, djd: 1,c:78 },"天津": { id: "3", root: 0, djd: 1,c:83 },"重庆": { id: "4", root: 3, djd: 1,c:87 },"河北": { id: "5", root: 0, djd: 1,c:142 },"山西": { id: "6", root: 0, djd: 1,c:303 },"河南": { id: "7", root: 0, djd: 1,c:412 },"辽宁": { id: "8", root: 0, djd: 1,c:560 },"吉林": { id: "9", root: 0, djd: 1,c:639 },"黑龙江": { id: "10", root: 0, djd: 1,c:698 },"内蒙古": { id: "11", root: 0, djd: 0,c:799 },"江苏": { id: "12", root: 1, djd: 1,c:904 },"山东": { id: "13", root: 0, djd: 1,c:1000 },"安徽": { id: "14", root: 1, djd: 1,c:1116 },"浙江": { id: "15", root: 1, djd: 1,c:1158 },"福建": { id: "16", root: 2, djd: 1,c:1303 },"湖北": { id: "17", root: 0, djd: 1,c:1381 },"湖南": { id: "18", root: 2, djd: 1,c:1482 },"广东": { id: "19", root: 2, djd: 1,c:1601 },"广西": { id: "20", root: 2, djd: 1,c:1715 },"江西": { id: "21", root: 2, djd: 1,c:1827 },"四川": { id: "22", root: 3, djd: 1,c:1930 },"海南": { id: "23", root: 2, djd: 1,c:2121 },"贵州": { id: "24", root: 3, djd: 1,c:2144 },"云南": { id: "25", root: 3, djd: 1,c:2235 },"西藏": { id: "26", root: 3, djd: 0,c:2951 },"陕西": { id: "27", root: 3, djd: 1,c:2376 },"甘肃": { id: "28", root: 3, djd: 1,c:2487 },"青海": { id: "29", root: 3, djd: 0,c:2580 },"宁夏": { id: "30", root: 3, djd: 1,c:2628 },"新疆": { id: "31", root: 3, djd: 0,c:2652 },"台湾": { id: "32", root: 2, djd: 0,c:2768 },"香港": { id: "42", root: 2, djd: 0,c:2754 },"澳门": { id: "43", root: 2, djd: 0,c:2770 }};
var POPSOPLBP={"10399_0":5,"13726_0":5,"10539_0":5,"12556_0":6,"10918_0":5,"10754_0":6,"10595_0":5,"12278_0":4,"11517_0":5,"12116_0":5,"10551_2":5,"11241_2":4,"10215_2":5,"11001_2":5,"11256_2":5,"10403_2":5,"11559_2":6,"10206_2":5,"10308_2":6};
var stockstatus = { 33: "现货", 34: "无货", 36: "预订", 39: "在途", 0: "统计中" };
var orgname = { 6: "北京仓", 3: "上海仓", 10: "广州仓", 4: "成都仓", 5: "武汉仓", 7: "南京仓", 8: "济南仓", 9: "沈阳仓" };
var shopurls={10831:"http://ochirly.360buy.com"};
var cName = "ipLocation";
var currentLocation = "北京";
$.haveShow=0;$.POPDAYS="";$.ipschange=true;$._ptload=false;$._ptloadcon="";
$.getShopUrl=function(r){if(r.url)return r.url;var id=r.id;if(shopurls[id])return shopurls[id];return "http://mall.360buy.com/index-"+id+".html";};
$.getDeliver = function(r){
	if (wareinfo.pid>1000000000){
		if (r&&r.deliver){
			var unshowtypes = "0,1,2,4,5";
			if (unshowtypes.indexOf(r.type) != -1){
				if(!$.haveShow) {
					//$("<em style='font-style:normal;color:#999;'>（本商品由第三方卖家提供）</em>").appendTo("#summary li:first");
					var key=r.id+"_"+r.type;
					if(POPSOPLBP[key]){
						if(r.type==0) {$.POPDAYS="，<b>平均</b>送达时间："+POPSOPLBP[key]+"天";}
						else if(r.type==2) {$.POPDAYS="<li>第三方卖家<a href='"+$.getShopUrl(r)+"' target='_blank'>"+r.vender+"</a><b>平均</b>送达时间："+POPSOPLBP[key]+"天</li>";}
					}
					r.linkphone=null;
					r.ltxt="<a href='"+$.getShopUrl(r)+"' target='_blank'>进店查看更多商品&gt;&gt;</a>";
					if(r.type==2&&$.POPDAYS){$($.POPDAYS).appendTo("#summary");}
					if(r.type==0){$("<li>此商品由<a href='"+$.getShopUrl(r)+"' target='_blank'><b>"+r.vender+"</b></a>提供，并负责配送及开具发票"+$.POPDAYS+(r.linkphone?"，商家电话："+r.linkphone:"")+"，"+r.ltxt+"</li>").appendTo("#summary");}
					else if(r.type==1){$("<li>本商品由<a href='"+$.getShopUrl(r)+"' target='_blank'><b>"+r.vender+"</b></a>提供，"+r.ltxt+"</li>").appendTo("#summary");}
					else if(r.type==2){$("<li>本商品由<a href='"+$.getShopUrl(r)+"' target='_blank'><b>"+r.vender+"</b></a>提供，由京东商城负责配送及开具发票，"+r.ltxt+"</li>").appendTo("#summary");}
					else if(r.type==5){$("<li>本商品发票由<a href='"+$.getShopUrl(r)+"' target='_blank'><b>"+r.vender+"</b></a>提供，由京东商城负责配送，"+r.ltxt+"</li>").appendTo("#summary");}
					//if(r.prompt)$("<li><font color='#ef0000'>温馨提示："+r.prompt+"</font></li>").appendTo("#summary");
				}
				$.haveShow=1;
				if (r.deliver=="京东商城") return "<a href='#'><b>京东商城</b></a>"
				return "<a href='"+$.getShopUrl(r)+"' target='_blank'><b>"+r.deliver+"</b></a>";
			}
			return "";
		}
		return "";
	}
	return "<a href='#'><b>京东商城</b></a>";
};
$.getStockDesc = function(r,s){
	var d=$.getDeliver(r);
	if(d){
		if (s==33||s==5)
			return "下单后立即由"+d+"发货";
		if (s == 34||s==18)
			return "该商品暂时已售完，<a href='http://notify.home.360buy.com/email.action?type=2&id=" + wareinfo.pid + "&key=" + wareinfo.sid + "' target='_blank'>到货通知</a>";
		if (s == 39)
			return "正在内部配货，预计2~6天到达本仓库后由"+d+"发货";
		if (s == 36)
			return "需要向供货商采购，入库后由"+d+"发货";
	}else{
		if (s==33||s==5)
			return "下单后立即发货";
		if (s==34||s==18)
			return "该商品暂时已售完，<a href='http://notify.home.360buy.com/email.action?type=2&id=" + wareinfo.pid + "&key=" + wareinfo.sid + "' target='_blank'>到货通知</a>";
		if (s == 39)
			return "正在内部配货，预计还有2~6天到达本仓库";
		if (s == 36)
			return "需要向供货商采购，入库后才能发货";
	}
	return "";
};
//NO Stock
$.NoStockSugest = {load:false,container:null,choosedom:$("#choose .amount,.result,.btns"),hidechoosedom:false,choosedom1:$("#choose")};
if ($("#choose .size").length == 0 && $("#choose .color").length == 0){$.NoStockSugest.choosedom=$("#choose");}
var reCookieName = "reWidsSORec";
function reClick2(type2, pwid, sku, num) {
    var reWidsClubCookies = eval('(' + getCookie(reCookieName) + ')');
    if (reWidsClubCookies == null || reWidsClubCookies == '') reWidsClubCookies = new Object();
    if (reWidsClubCookies[type2] == null) reWidsClubCookies[type2] = '';
    var pos = reWidsClubCookies[type2].indexOf(sku);
    if (pos < 0) reWidsClubCookies[type2] = reWidsClubCookies[type2] + "," + sku;
	if(JSON&&JSON.stringify)setCookie(reCookieName, JSON.stringify(reWidsClubCookies), 2, "/", "360buy.com", false);
    sku = sku.split("#");
    if (window.log){log(3, type2, sku[0]);log('RC', 'CK', type2, pwid, sku[0], num);}
}
//Notify
function SetNotifyByNoneStock(stockstatus) {
	if (stockstatus!=34){
		$.NoStockSugest.choosedom.show();
		if ($.NoStockSugest.container){$.NoStockSugest.container.hide();}
		return;
	}
	if (wareinfo && parseInt(wareinfo.pid, 10) > 1000000000) return;
	if ($.NoStockSugest.load){
		if($.NoStockSugest.container)	$.NoStockSugest.container.show();
		if($.NoStockSugest.hidechoosedom){$.NoStockSugest.choosedom.hide();}
	}else{
		window.getProductByNoneStockCallback=function(result) {
			$.NoStockSugest.load = true;
			if (result.html && result.html.length>0) {
				if ($.NoStockSugest.choosedom1.length > 0) {
					$.NoStockSugest.choosedom1.after("<div id='sellout' class='m'><div class='mt'><h2>所选地区商品已售完,欢迎选购其它商品:</h2></div><div class='mc'><ul class='list-h'></ul></div></div>");
					$.NoStockSugest.container = $("#sellout");
					var cont = $("#sellout .mc .list-h");
					var getSiteUrl=function(skuId) {
						if (skuId >= 10000000 && skuId < 20000000){return "http://book.360buy.com/" + skuId + ".html";}
						if (skuId >= 20000000 && skuId < 30000000){return "http://mvd.360buy.com/" + skuId + ".html";}
						return "http://www.360buy.com/product/" + skuId + ".html";
					};
					var html = "";
					for (var i=0; i<result.html.length; i++) {
						var t = result.html[i];
						html += "<li><div class='p-img'><a href='"+getSiteUrl(t.SkuId)+"' title='"+t.Name+"' clstag='product|keycount|sellout|click'><img width='100' height='100' alt='"+t.Name+"' src='"+getRandomDomain(t.SkuId)+"/n4/"+t.ImgUrl+"'></a></div><div class='p-name'><a href='"+getSiteUrl(t.SkuId)+"'>"+t.Name+"</a></div><div class='p-price'><strong><img src='http://price.360buy.com/gp"+t.SkuId+",1.png' onerror=\"this.src='http://www.360buy.com/images/no2.gif'\"></strong></div></li>";	
					}
					if(html){cont.html(html);$.NoStockSugest.choosedom.hide();$.NoStockSugest.hidechoosedom=true;}else{$.NoStockSugest.choosedom.show();}
				}
			}else{
				window.getProductByNoneStockCallback = function(json) {
					if (json.MySoldOut && json.MySoldOut.length > 0) {
						if ($.NoStockSugest.choosedom1.length > 0) {
							$.NoStockSugest.choosedom1.after("<div id='sellout' class='m'><div class='mt'><h2>所选地区商品已售完,欢迎选购其它商品:</h2></div><div class='mc'><ul class='list-h'></ul></div></div>");
							$.NoStockSugest.container = $("#sellout");
							var cont = $("#sellout .mc .list-h");
							var html = "";
							for (var i = 0; i < json.MySoldOut.length; i++) {
								html += "<li onclick = 'reClick2(\"" + $.NoStockSugest.s1 + "&SORec\",\"" + json.MySoldOut[i].Wid + "\",\"" + json.MySoldOut[i].SkuId + "#" + json.MySoldOut[i].WMeprice + "\",\"" + i + "\")'>";
								html += "<div class=\"p-img\"><a title=" + json.MySoldOut[i].Name + " href=" + json.MySoldOut[i].Href + "><img width=\"100\" height=\"100\" src=" + json.MySoldOut[i].ImgUrl + " alt=" + json.MySoldOut[i].Name + "></a></div>";
								html += "<div class=\"p-name\"><a href=" + json.MySoldOut[i].Href + ">" + json.MySoldOut[i].Name + "</a></div>";
								html += "<div class=\"p-price\"><strong>" + json.MySoldOut[i].Priceimg + "</strong></div>";
								html += "</li>";
							}
							if(html){cont.html(html);$.NoStockSugest.choosedom.hide();$.NoStockSugest.hidechoosedom=true;}else{$.NoStockSugest.choosedom.show();}
							if (window.log&&$.NoStockSugest.s1) log($.NoStockSugest.s1 + '&SORec', 'Show');
						}
					}
				};
				var nav = $(".breadcrumb a");
				if (nav.length > 3){
					nav = $(nav[2]).attr("href");
					if (nav) nav=nav.split("-");
					if (nav&&nav.length==3) nav=nav[0];
					if (nav) nav=nav.split("/");
					if (nav&&nav.length>0) nav=nav[nav.length-1];
					if(/^\d+$/.test(nav)) $.NoStockSugest.s1=nav;
				}
				if (window.log&&$.NoStockSugest.s1) log($.NoStockSugest.s1 + "&SORecPage", 'Show');
				$.getJSONP("http://simigoods.360buy.com/SoldOutRec.aspx?ip=" + encodeURIComponent(currentLocation) + "&wids=" + wareinfo.pid + "&callback=getProductByNoneStockCallback", getProductByNoneStockCallback);
			}
		};
		//if ($("#choose .size").length == 0 && $("#choose .color").length == 0){
		$.getJSONP("http://pbss.360buy.com/recomm/getRecommProduct.action?callback=getProductByNoneStockCallback&productId="+wareinfo.pid,getProductByNoneStockCallback);
		//}
	}
	log(1,6,wareinfo.pid);
};
function CheckAllStock(){
	if (wareinfo && parseInt(wareinfo.pid, 10) > 1000000000) return;
	for (var s=0; s<stockdata.length; s++) {		
		if (stockdata[s].Stock==33 || stockdata[s].Stock==36 || stockdata[s].Stock==39){
			var initCartUrl = $("#InitCartUrl");
			if ($("#choose .amount").length == 0){
				$("<dl class='amount'><dt>　我要买：</dt><dd><a href='javascript:void(0)' onclick=\"setAmount.reduce('#pamount')\" class='reduce'>-</a><input type='text' onkeyup=\"setAmount.modify('#pamount')\" id='pamount' value='1'><a href='javascript:void(0)' onclick=\"setAmount.add('#pamount')\" class='add'>+</a></dd></dl>").insertBefore("#choose .btns");
			}
			if (initCartUrl.length == 0) {
				$("#choose .btns").html("<a clstag='shangpin|keycount|product|InitCartUrl' href='http://jd2008.360buy.com/purchase/InitCart.aspx?pid="
										+wareinfo.pid+"&pcount=1&ptype=1' onclick='BuyUrl("+wareinfo.pid+");mark("+wareinfo.pid+",2);' id='InitCartUrl' "
										+"class='btn-append'>添加到购物车</a><input type='button' clstag='shangpin|keycount|product|btn-coll' value='收 藏' "
										+"onclick='mark("+wareinfo.pid+",4);' id='coll"+wareinfo.pid+"' class='btn-coll'><span style='display: none;' "
										+"id='pShowSkuId'>"+wareinfo.pid+"</span><span class='clr'></span>");
			}
			return;
		}
	}
	$("#InitCartUrl").hide().after("<a class='btn-notice' href='http://notify.home.360buy.com/email.action?type=2&id="+wareinfo.pid+"&key="+wareinfo.sid+"'>到货通知我</a>");
}
//stock callback
function getProvinceStockCallback(result) {
	if (result.stock) {
		SetNotifyByNoneStock(result.stock.StockState);
		if (parseInt(wareinfo.pid) > 10000000 && parseInt(wareinfo.pid) < 30000000) {
			$("#stockins").html("送至");
			if (result.stock.PopType == 0) {
				if (result.stock.StockState == 33)
					$("#stocktext").html("下单后立即发货");
				if (result.stock.StockState == 34)
					$("#stocktext").html("该商品暂时已售完，<a href='http://notify.home.360buy.com/email.action?type=2&id=" + wareinfo.pid + "&key=" + wareinfo.sid + "' target='_blank'>到货通知</a>");
				if (result.stock.StockState == 39)
					$("#stocktext").html("其它仓库有货，正在配送至本地仓库");
				if (result.stock.StockState == 36)
					$("#stocktext").html("该商品为预售，供应商送货后可发货");
				if (result.stock.StockState == 40)
					$("#stocktext").html("其它仓库有货");
				$("#storeinfo .i-storeinfo div").html(currentLocation + "(" + (result.stock.StockStateName=="统计中"?"无货":result.stock.StockStateName) + ")");
				$("#storeinfocontainer").show();
				return;
			}
		}
		if (wareinfo.djd == 1 && iplocation[currentLocation].djd == 0) {
			$("#stockins").html("无法送至");
			$("#storeinfo .i-storeinfo div").html(currentLocation);
			$("#stocktext").html("该商品无法送至您所在区域");
			$("#storeinfocontainer").show();
			return;
		}
		else {
			$("#stockins").html("送至");
			if (wareinfo.pid>1000000000){
				if(!$._ptload){
					window._showPopTemplete=function(r){
						$._ptload=true;
						if(result.stock.StockState==36){
							if(r&&r.reserveDeliveryDay){$._ptloadcon=r.reserveDeliveryDay;$("#stocktext").html("此商品为预订商品，下单后由"+$.getDeliver(result.stock.D)+"在"+$._ptloadcon);}
							else{$("#stocktext").html($.getStockDesc(result.stock.D,result.stock.StockState));}
						}
						if(r&&r.wareTemplateContent)$("<div class=\"content\">"+r.wareTemplateContent+"</div>").insertBefore("#detail .tabcon .content:first")
						if(r&&r.wareTemplateBottomContent)$("<div class=\"content\">"+r.wareTemplateBottomContent+"</div>").insertAfter("#detail .tabcon .content:last");}
						$.getJSONP("http://mall.360buy.com/json/wareTemplate/queryWareTemplateContent.action?skuId="+wareinfo.pid+"&jsoncallback=_showPopTemplete",_showPopTemplete)
				}else{
						if($._ptloadcon&&result.stock.StockState==36){$("#stocktext").html("此商品为预订商品，下单后由"+$.getDeliver(result.stock.D)+"在"+$._ptloadcon)}else{$("#stocktext").html($.getStockDesc(result.stock.D,result.stock.StockState))}
				}
			}
			if(result.stock.StockState!=36||wareinfo.pid<1000000000){$("#stocktext").html($.getStockDesc(result.stock.D,result.stock.StockState));}
			$("#storeinfo .i-storeinfo div").html(currentLocation + "(" + (result.stock.StockStateName=="统计中"?"无货":result.stock.StockStateName) + ")");
			$("#storeinfocontainer").show();
			return;
		}
	}
}
//stock
function GetRealStock(provinceid) {
	if (warestatus == 0) {
		$("#storeinfo .i-storeinfo div").html(currentLocation + "(无货)");
		$("#stocktext").html("该商品暂时已售完，<a href='http://notify.home.360buy.com/email.action?type=2&id=" + wareinfo.pid + "&key=" + wareinfo.sid + "' target='_blank'>到货通知</a>");
		$("#storeinfocontainer").show();
		SetNotifyByNoneStock(34);
		return;
	}
	if (wareinfo) {
		$.getJSONP(StockSoaService + "?callback=getProvinceStockCallback&type=provincestock&skuid="+wareinfo.sid+"&provinceid="+provinceid,getProvinceStockCallback);
	}
}
function checkisshow(){
		var iplocation=getCookie("ipLocation");
		var content = $("#service-trade").html();
		if(content&&iplocation&&content.indexOf(iplocation)>0){$("#service-trade").show();}else{$("#service-trade").hide();}
}
//Main Logic
function setDjdCookie(p,c){
	var a = getCookie("ipLoc-djd");
	if (!a||a.split("-")[0]!=p)setCookie("ipLoc-djd", p+(c?("-"+c):""), 30, "/", "360buy.com", false);
}
function ShowStockForAll() {
	if (!stockdata) return false;
	//Notify
	CheckAllStock();
	//Cookie
	var ck = getCookie(cName);
	if (ck) {
		var pid = iplocation[ck];
		if (pid) {currentLocation = ck;GetRealStock(pid.id);}else{currentLocation = "北京";GetRealStock(1);}
	}else {
		$.ajax({
			type: "GET",
			url: GeoIpService,
			dataType: "jsonp",
			success: function(result) {
				if (result.ip) {
					for (var key in iplocation) {
						if (iplocation.hasOwnProperty(key)) {
							if (result.ip.indexOf(key) > -1) {
								currentLocation = key;
								break;
							}
						}
					}
				}
				GetRealStock(iplocation[currentLocation].id);
				setCookie(cName, currentLocation, 30, "/", "360buy.com", false);
				setDjdCookie(iplocation[currentLocation].id,iplocation[currentLocation].c);
			}
		});
		checkisshow();
	}
	$("#storeinfo").find("a").unbind("click").click(function() {
		var t = $(this).attr("p");
		$("#storeinfo").removeClass("hover");
		currentLocation = $(this).html();
		GetRealStock(t);
		setCookie(cName, currentLocation, 30, "/", "360buy.com", false);
		setDjdCookie(t,iplocation[currentLocation].c);
		checkisshow();
	}).end().hoverForIE6();
}
ShowStockForAll();
//cookie operate
function getCookie(name){var start=document.cookie.indexOf(name+"=");var len=start+name.length+1;if((!start)&&(name!=document.cookie.substring(0,name.length))){return null}if(start==-1)return null;var end=document.cookie.indexOf(';',len);if(end==-1)end=document.cookie.length;return unescape(document.cookie.substring(len,end))};function setCookie(name,value,expires,path,domain,secure){var today=new Date();today.setTime(today.getTime());if(expires){expires=expires*1000*60*60*24}var expires_date=new Date(today.getTime()+(expires));document.cookie=name+'='+escape(value)+((expires)?';expires='+expires_date.toGMTString():'')+((path)?';path='+path:'')+((domain)?';domain='+domain:'')+((secure)?';secure':'')};function deleteCookie(name,path,domain){if(getCookie(name))document.cookie=name+'='+((path)?';path='+path:'')+((domain)?';domain='+domain:'')+';expires=Thu, 01-Jan-1970 00:00:01 GMT'};
