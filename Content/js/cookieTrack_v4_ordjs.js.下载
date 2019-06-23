/**
 * UED代上CDN文件，负责人(成都：王丹 Danlise 、北京：刘晓日)
 * 2015/05/14
 */
var COOKIETRACK = {
	/**
	 * js取得http cookie
	 * @param name cookie名字
	 */
	getCookie:function(name) {
	    var start = document.cookie.indexOf( name + "=");
	    var len = start + name.length + 1;
	    if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
	        return null;
	    }
	    if ( start == -1 ) return null;
	    var end = document.cookie.indexOf( ';', len );
	    if ( end == -1 ) end = document.cookie.length;
	    return unescape( document.cookie.substring( len, end ) );
	},	
	/**
	 * js设置 http cookie
	 * @param name     cookie名字
	 * @param value    cookie值
	 * @param expires  时间(天)
	 * @param path     路径
	 * @param domain   域名
	 * @param secure   标示
	 */
	setCookie:function( name, value, expires, path, domain, secure ) {
	    var today = new Date();
	    today.setTime( today.getTime() );
	    if ( expires ) {
	        expires = expires * 1000 * 60 * 60 * 24;
	    }
	    var expires_date = new Date( today.getTime() + (expires) );
	    document.cookie = name+'='+escape( value ) +
	        ( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + //expires.toGMTString()
	        ( ( path ) ? ';path=' + path : '' ) +
	        ( ( domain ) ? ';domain=' + domain : '' ) +
	        ( ( secure ) ? ';secure' : '' );
	},
	
	/**
	 * js 删除 http cookie
	 * @param name   名字
	 * @param path   路径
	 * @param domain 域名
	 */
	deleteCookie:function( name, path, domain ) {
	    if ( getCookie( name ) ) document.cookie = name + '=' +
	            ( ( path ) ? ';path=' + path : '') +
	            ( ( domain ) ? ';domain=' + domain : '' ) +
	            ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
	},
	
	/**
	 * js 获取cookie中的TrackID值，并设置到TrackID隐藏域中
	 */
	setTrackIDValue:function(){
		httpTrackID = COOKIETRACK.getCookie("TrackID");
		jQuery("#TrackID").val(httpTrackID);//将组合好的串写入隐藏域
	},
	
	
	/**
	 * js 测试设置cookie中的TrackID值
	 */
	testSetTrackID:function(){
		COOKIETRACK.setCookie("TrackID", "建琼建琼建琼建琼建琼建琼建琼9999999999", 30, "/" ,"yql.jd.net");
//		alert("设置cookie完成");
	}
}

window.onload=function(){COOKIETRACK.setTrackIDValue();}