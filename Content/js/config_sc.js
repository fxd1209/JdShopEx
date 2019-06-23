function PurchaseAppConfig() {

}

PurchaseAppConfig.Domain = '//' + window.location.host;//默认域名
PurchaseAppConfig.AsyncDomain = '//' + window.location.host + '/async';//异步域名
PurchaseAppConfig.stockDomain = '//ss.jd.com/ss/areaStockState';
PurchaseAppConfig.ddDomain = '//chat1.jd.com/api';//咚咚

function SkuItemType() {

}

/**
 * 单品
 */
SkuItemType.Sku = 1;

/**
 * 赠品结构中的主商品
 */
SkuItemType.Gifts_MainSku = 2;

/**
 * 赠品结构中的赠品
 */
SkuItemType.Gifts_Gifts = 3;

/**
 * 普通套装
 */
SkuItemType.Packs = 4;

/**
 * 普通套装中的单品
 */
SkuItemType.SkuOfPacks = 5;

/**
 * 普通套装中的赠品
 */
SkuItemType.GiftOfPacks = 6;

/**
 * 普通套装中的延保商品
 */
SkuItemType.YbOfPacks = 7;

/**
 * 单品或赠品结构中的延保商品
 */
SkuItemType.YbOfSkusOrGifts = 8;

/**
 * 满返套装
 */
SkuItemType.ManFanPacks = 9;

/**
 * 满返套装中的赠品
 */
SkuItemType.GiftOfManFanPacks = 10;

/**
 * 满返套装中的单品
 */
SkuItemType.SkuOfManFanPacks = 11;

/**
 * 满赠套装
 */
SkuItemType.ManZengPacks = 12;

/**
 * 满赠套装中的单品
 */
SkuItemType.SkuOfManZengPacks = 13;

/**
 * 满赠套装中的赠品
 */
SkuItemType.GiftOfManZengPacks = 14;
/**
 * 满赠套装中的可选赠品
 */
SkuItemType.CanSelectGiftOfManZengPacks = 15;

/**
 * 满赠套装中的已选赠品
 */
SkuItemType.SelectedGiftOfManZengPacks = 16;

// 从url中获取参数
function getParam(paramName) {
	var paramValue = "";
	isFound = false;
	if (this.location.search.indexOf("?") == 0
			&& this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1,
				this.location.search.length).split("&");
		i = 0;
		while (i < arrSource.length && !isFound) {
			if (arrSource[i].indexOf("=") > 0) {
				if (arrSource[i].split("=")[0].toLowerCase() == paramName
						.toLowerCase()) {
					paramValue = arrSource[i].split("=")[1];
					isFound = true;
				}
			}
			i++;
		}
	}
	return paramValue;
}

/**
 * Get the value of a cookie with the given name.
 * 
 * @example $.jCookie('the_cookie');
 * @desc Get the value of a cookie.
 * 
 * @param String
 *            name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 * 
 * @name $.jCookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 * 
 * @modifiedBy jizhou
 * @modifiedDate 2012/1/6
 * @modifiedDesciption 遇到中文用escape和unescape进行转码和解码,为了和.net存入cookie的中文保持一致
 */
jQuery.jCookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires
				&& (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime()
						+ (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires
			// attribute,
			// max-age is not
			// supported by IE
		}
		var getDomain = function(d){return d.substring(d.indexOf(".")+1, d.length);};
		var path = '; path=' + (options.path ?  options.path : '/');
		var domain = '; domain=' + (options.domain ? options.domain : getDomain(window.location.host));
		var secure = options.secure ? '; secure' : '';
//		var co = [ name, '=', escape(value), expires, path, domain, secure ].join('').split(';');
//        for(var i=0,len=co.length; i<len; i++){
//            document.cookie = co[i];
//        }
		document.cookie = [ name, '=', escape(value), expires, path, domain,
				secure ].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for ( var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = unescape(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};
/**
 * 异步写cookie
 */
function writeCn() {
	try {
		var cn = $.jCookie("cn");
		var userkey = $.jCookie("user-key");
		if (cn == null || cn == "" || isNaN(cn)) {
			cn = "0";
		}
		if (userkey == null) {
			userkey = "";
		}
		cn = cn.replace(/\\/g, "");
		cn = cn.replace(/\"/g, "");
		userkey = userkey.replace(/\\/g, "");
		userkey = userkey.replace(/\"/g, "");
		var url = "http://cart.360buy.com/cart/writeCn.action?cn=" + cn
				+ "&userkey=" + userkey;
		jQuery.ajax({
			type : "GET",
			dataType : "jsonp",
			url : url,
			data : null,
			cache : false,
			success : function(result) {

			},
			error : function(XMLHttpResponse) {

			}
		});

	} catch (e) {
	}
}
