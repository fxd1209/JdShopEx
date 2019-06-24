/**
 * 同步发送数据
 *url 发送路径
 * data 发送的数据
 * return  成功  msg="ok"  失败  msg="fail"
 **/
function sendMessageSync(url, data) {
    var msg = "fail";
    if ((url == null) || (url == "")) {
        console.log("发送路径url为空！位置-js-sendMessageSync()");
        return;
    }
    $.ajax({
        url: url,
        type: "post",
        async: false, //等发送完并接受返回参数后在执行后面的,必须有
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (res) {
            //TODO:此处应该直接返回res,而不是res.msg,因为这样无法接受返回的其他附带信息
            //msg=res.msg;
            if (res.msg == "ok") {
                msg = "ok";
            } else if (res.msg == "fail") {
                msg = "fail";
            } else {
                msg = res.msg;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("发送错误：位置-js-sendMessageSync()");
            msg = "fail";
            return false;
        }
    });
    return msg;
}
/**
 * 异步发送数据
 * 实际发送数据为异步发送,但是利用Deferred来模拟同步发送。
 *url 发送路径
 * data 发送的数据
 * return  成功 结果
 **/
function sendMessageSyncByDeferred(url, data) {
    if ((url == null) || (url == "")) {
        console.log("发送路径url为空！位置-js-sendMessageSync()");
        return;
    }
    var deferred = $.Deferred();
    $.ajax({
        url: url,
        type: "post",
        async: true,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (res) {
            deferred.resolve(res);//这里的res数据会传
            // 到$.when(sendMessageSyncByDeferred()).done(function(res) res里面
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.warn("发送错误：位置-js-sendMessageSyncByDeferred()");
            let res = { "msg": "fail" };
            deferred.resolve(res);
        }
    });
    return deferred.promise();
}


var isEmpty = function (str) {
    return (str == "" || str == null);
}