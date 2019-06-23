function log (src) {
    var img = new Image();
    var src = src + "&m=UA-J2011-1&ref=" + encodeURIComponent(document.referrer) + "&random=" + Math.random();

    img.setAttribute('src', src);
}

/**
 * 启动客户端
 * @param pin 用户账号
 * @param pid 商品id
 * @param venderId 商家id
 * @param shopId  店铺id
 * @param venderName 商家名称
 */
function startClient(pin, pid, venderId, shopId, venderName) {
    var type, value,paramStr;
    var pageTitle;
    var csid = "B35D742C-5983-40C1-A8C0-A7DBFA2EF05E";
    if (typeof pid != 'undefined' && pid > 0) {
        type = 1;
        var plugin = getPlugin(csid);
        if (!plugin && plugin.CheckVal >= 1001) {
            type = 5;
            var chatSkuContext = new Object();
            chatSkuContext.skuId = pid;
            value = JSON.stringify(chatSkuContext);
        } else {
            value = pid;
        }
        paramStr = "?entry=cart_shop&pid="+pid;
    } else if (typeof 'venderId' != 'undefined' && venderId > 0) {
        type = 2;
        value = venderId;
        paramStr = "?entry=cart_shop&venderId="+venderId;
    } else if (typeof shopId != 'undefined' && shopId > 0) {
        type = 3;
        value = shopId;
        paramStr = "?entry=cart_shop&shopId="+shopId;
    }

    if(typeof venderName != 'undefined' && venderName.length>0){
        pageTitle = venderName;
    } else {
        pageTitle = "京东咚咚在线客服";
    }

    if(checkInstall(csid, 'CheckVal')){
        startDD(type, value, pin, function(){
            //window.open("//chat.jd.com/index.action"+paramStr, pageTitle, 'status=no,toolbar=no,menubar=no,location=no,titlebar=no,resizable=yes,width=1018px,height=590');
            window.open("//chat.jd.com/index.action"+paramStr, pageTitle);
        });
    } else{
        //window.open("//chat.jd.com/index.action"+paramStr, pageTitle, 'status=no,toolbar=no,menubar=no,location=no,titlebar=no,resizable=yes,width=1018px,height=590');
        window.open("//chat.jd.com/index.action"+paramStr, pageTitle);
    }
}

var isIe = !!window.ActiveXObject || "ActiveXObject" in window;

/**
 * 获取咚咚插件
 * @param CLSID
 * @returns {*}
 */
function getPlugin(CLSID) {
    var plugin = null;
    if (isIe) {
        plugin = document.getElementById("ddplugin-msie");
    } else {
        plugin = document.getElementById("ddplugin");
    }
    return plugin;
}

/**
 * 检查是否安装了咚咚
 * @param clsId
 * @param functionName
 * @returns {boolean}
 */
function checkInstall(clsId, functionName) {
    if (isIe) {
        //检测IE是否安装DD插件
        var pluginDiv = document.createElement("div");
        pluginDiv.id = "pluginDiv";
        pluginDiv.style.display = "none";
        pluginDiv.innerHTML = '<object id="objectForDetectPlugin" classid="CLSID:' + clsId + '"></object>';
        document.body.appendChild(pluginDiv);
        try {
            if (eval("objectForDetectPlugin." + functionName) == undefined) {
                pluginDiv.parentNode.removeChild(pluginDiv);
                return false;
            } else {
                pluginDiv.parentNode.removeChild(pluginDiv);
                return true;
            }
        } catch (e) {
            //log(e);
            return false;
        }
    } else {
        var mimeType = navigator.mimeTypes['application/dd-plugin'];
        if (mimeType) {
            var plugin = mimeType.enabledPlugin;
            if (plugin) {
                return true;
            }
        }
        return false;
    }
}

/**
 * 启动咚咚
 * @param type
 * @param value
 * @param pin
 */
function startDD(type, value, pin, callback) {
    try {
        var csid = "B35D742C-5983-40C1-A8C0-A7DBFA2EF05E";
        var plugin = getPlugin(csid);
        pin = decodeURIComponent(escape(pin));
        var isSecurity = fromSecurity();
        if (checkInstall(csid, "CheckVal")) {
            $.ajax({
                type : "GET",
                dataType : "jsonp",
                url: "//chat.jd.com/dd/auth.action?t=" + new Date().getTime()+(isSecurity?"&security=1":""),
                async: false,
                data: {
                    pin: encodeURIComponent(pin)
                },
                success: function (result) {
                    var aid = result.aid;
                    if ($.trim(aid) != '') {
                        try {
                            var result = plugin.CheckAndStartClient2(type + "", value + "", pin, aid);
                            if (result == 1) {
                            } else {
                                callback();
                            }
                        } catch (e) {
                            console.log('ccccatch:' + e);
                            var flag = restartDd(plugin, type, value, pin, aid, 1);
                            if(!flag){
                                callback();
                            }
                        }
                    } else {
                        callback();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    callback();
                }
            });
        } else {
            callback();
        }
    } catch (e) {
        callback();
    }
}

function fromSecurity(){
    var curUrl = document.location.href;
    var flag = false;
    if(curUrl){
        curUrl = $.trim(curUrl);
        flag = curUrl.indexOf("https")==0;
    }

    return flag;
}

/**
 * 重启咚咚
 * @param plugin
 * @param type
 * @param value
 * @param pin
 * @param aid
 * @param count
 */
function restartDd(plugin, type, value, pin, aid, count) {
    var code = 0;
    try {
        code = plugin.CheckAndStartClient2(type + "", value + "", pin, aid);
    } catch (e) {
        console.log('restartDd ccccatch:' + e);
    }

    if (code == 1) {
        //启动咚咚成功
        return true;
    } else {
        return false;
    }
}