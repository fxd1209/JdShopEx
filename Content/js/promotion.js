function getPageAdwordService(result) {
    if (result.skuExtInfo != null && result.skuExtInfo != "") {
        var productExt = "<font color=\"#ef0000\">本商品" + result.skuExtInfo + "</font>";
        $("#nocoupon").html(productExt);
        $("#nocoupon").show();
    }
    if (result.promotionInfoList.length > 0) {
        var skuId = result.skuId;
        var jsonData = result.promotionInfoList;
        //单品促销信息
        var unitInfor = "<table cellspacing='0' cellpadding='0' border='0'><tr><td valign='top'>促销信息：</td><td>";
        var tag = 0;
        $.each(jsonData, function(i, item) {
            //单品促销
            if (item.promoType == 1) {

                var userleverPriceInfo = "";
                //会员级别
                var level = item.userLevel;
                //京东价
                var price = item.price;
                //积分
                var score = item.score;
                //直降
                var discount = item.discount;
                //券
                var coupon = item.adwordCouponList;
                //最小购买数
                var minNum = item.minNum;

                <!--拼接单品促销信息-->
                var discountInfo = "";
                if (minNum > 1) {
                    discountInfo += "多买优惠价：￥" + price + ",需购买" + minNum + "件（含）以上";
                } else {
                    if (level <= 50 && discount > 0 && skuId.length != 10) {
                        discountInfo += "已优惠￥" + discount;
                    }
                    else if (level > 50 && price > 0) {
                        userleverPriceInfo = getCustomerLevel(level) + "及以上会员价：￥" + price;
                        discountInfo += userleverPriceInfo;
                    }
                }
                if (score > 0) {
                    discountInfo += " 赠送" + score + "积分";
                }
                if (coupon != null && coupon.length > 0) {
                    $.each(coupon, function(name, value) {
                        if (value.type == 1) {
                            if (value.key != null && value.key != "") {
                                if (value.adWord == null) {
                                    value.adWord = "";
                                }
                                if (value.adWord != null && value.adWord.length > 0) {
                                    discountInfo += " 赠送：" + value.couponQouta + "元限品类电子京券（" + value.adWord + ")";
                                }
                                else {
                                    discountInfo += " 赠送：" + value.couponQouta + "元限品类电子京券";
                                }

                            }
                            else {
                                discountInfo += " 赠送：" + value.couponQouta + "元电子京券";
                            }
                        }
                    });
                }
                if (discountInfo.length > 0) {
                    unitInfor += "<div><font color='red'>" + discountInfo +"</font></div>";
                    tag = 1;
                }
                $("#promotion1").html(userleverPriceInfo);
            }
            //封顶促销
            if (item.promoType == 15) {
                var adword = item.adword;
                var bookTopAdword = "本商品参与图书封顶折扣活动";
                if (adword != null && adword != "") {
                    unitInfor += "<div><font color=\"#ef0000\">" + adword + "</font></div>";
                }
                else {
                    unitInfor += "<div><font color=\"#ef0000\">" + bookTopAdword + "</font></div>";
                }
                tag = 1;
            }


            //赠品促销
            if (item.promoType == 4) {
                var giftfujianList = item.adwordGiftSkuList;
                var couponList = item.adwordCouponList;
                var score = item.score;
                var minNum = item.minNum;
                var jq = 0;
                var giftList = [];
                var fujianList = [];
                if (giftfujianList != null && giftfujianList.length > 0) {
                    $.each(giftfujianList, function(x, gift) {
                        if (gift.giftType == 2)
                            giftList[giftList.length] = gift;
                        if (gift.giftType == 1)
                            fujianList[fujianList.length] = gift;
                    });
                }
                if (couponList != null && couponList.length > 0) {
                    $.each(couponList, function(y, coupon) {
                        if (coupon.type == 1) {
                            jq = jq + coupon.couponQouta;
                        }
                    });
                }
                <!--拼接赠品促销信息-->
                var giftTotalInfo = "<span class=\"fl\"><font color=\"red\">赠&nbsp;&nbsp;&nbsp;&nbsp;品</font>：</span><div id=\"i-largess\" class=\"fl\">";
                var giftInfo = "";
                if (giftList.length > 0) {
                    $.each(giftList, function(a, giftItem) {
                        if (giftItem.giftState != 1 && (giftItem.imagePath == "" || giftItem.imagePath == null)) {
                            giftInfo += giftItem.name + " <font color=red>×" + giftItem.number + "</font>";
                        }
                        else {
                            var wstatestr = "<a target = '_blank' href='http://www.360buy.com/product/" + giftItem.skuId + "\.html'>" + giftItem.name + "</a>"
                                + " <font color='red'>×" + giftItem.number + "</font>";
                            if (giftItem.imagePath != null && giftItem.imagePath != "") {
                                var imgPath = "<a target='_blank' href='http://www.360buy.com/bigimage.aspx?id="
                                    + giftItem.skuId + "\&type=1'><img src='http://img10.360buyimg.com/n5/" + giftItem.imagePath + "' /></a>";
                                giftInfo += "<div> " + imgPath + wstatestr + "</div>";
                            } else {
                                giftInfo += "<div> " + wstatestr + "</div>";
                            }
                        }
                    });
                }

                if (score > 0) {
                    giftInfo += "<div> " + "赠送：" + score + "积分 </div>";
                }
                if (jq > 0) {
                    if (score > 0)
                        giftInfo += "<div> " + "赠送电子京券：" + jq + "元 </div>";
                    else
                        giftInfo += "<div> 赠送电子京券：" + jq + "元 </div>";
                }
                if (giftInfo != "") {
                    giftTotalInfo += giftInfo + "</div>";
                    $("#liLargess").html(giftTotalInfo);
                    $("#liLargess").show();
                }

                <!--拼接附件信息-->
                if (fujianList.length > 0) {
                    var fujianInfo = "<div id='fujianContent'>";
                    $.each(fujianList, function(b, fjItem) {
                        if ((fjItem.imagePath == "" || fjItem.imagePath == null) && fjItem.giftState != 1) {
                            fujianInfo += "<div>" + fjItem.name + " × " + fjItem.number + "</div>";
                        } else {
                            fujianInfo += "<div><a target = '_blank' href='http://www.360buy.com/product/"
                                + fjItem.skuId + "\.html'>" + fjItem.name + "</a> × " + fjItem.number + "</div>";
                        }
                    });
                    fujianInfo += "</div>";
                    if ($("#fujianContent").length <= 0) {
                        $("#bzqd").append(fujianInfo);
                    }
                }
            }

            //满返满赠促销
            if (item.promoType == 10) {
                //满 赠、返
                var FULL_REFUND = 1;
                //每满赠、返
                var FULL_REFUND_PER = 2;
                //加价购
                var EXTRA_PRICE = 4;
                //阶梯满减
                var FULL_LADDER = 6;
                //满返百分比
                var PERCENT = 8;
                //满返满赠促销子类型
                var fullRefundType = item.fullRefundType;
                var reward = item.reward;
                var needMoney = item.needMondey;
                var addMoney = item.addMoney;
                var topMoney = item.topMoney;
                var percent = item.percent;
                var score = item.score;
                var couponList = item.adwordCouponList;
                var haveGifts = item.haveFullRefundGifts;
                var jq = 0;
                var fullLadderList = item.fullLadderDiscountList;
                var adwordLink = item.adwordUrl;

                <!--拼接满返满赠信息-->
                var fullRefundInfo = "";
                if (couponList != null && couponList.length > 0) {
                    $.each(couponList, function(z, couponValue) {
                        if (couponValue.type == 1) {
                            jq = jq + coupon.couponQouta;
                        }
                    });
                }

                if (fullRefundType == FULL_REFUND) {
                    fullRefundInfo = "该商品参加满减活动，购买活动商品满" + needMoney + "元，可减" + reward + "元现金";
                    if (haveGifts) {
                        fullRefundInfo = "热销商品满" + needMoney + "元即赠，先到先得送完即止";
                    } else if (jq > 0) {
                        fullRefundInfo = "该商品参加满减活动，购买活动商品满" + needMoney + "元，可返" + jq + "元京券";
                    }
                } else if (fullRefundType == FULL_REFUND_PER) {
                    if (reward > 0) {
                        fullRefundInfo = "该商品参加满减活动，购买活动商品每满" + needMoney + "元，可减" + reward + "元现金";
                        if (topMoney > 0) {
                            fullRefundInfo += "，最多优惠" + topMoney + "元现金";
                        }
                    } else {
                        if (haveGifts) {
                            fullRefundInfo = "热销商品每满" + needMoney + "元即赠，先到先得送完即止";
                        } else if (jq > 0) {
                            fullRefundInfo = "该商品参加满减活动，购买活动商品每满" + needMoney + "元，可返" + jq + "元京券";
                        }
                    }
                } else if (fullRefundType == EXTRA_PRICE) {
                    if (addMoney > 0) {
                        fullRefundInfo = "热销商品满" + needMoney + "元加" + addMoney + "元即赠，先到先得送完即止";
                    }
                } else if (fullRefundType == PERCENT) {
                    if (percent > 0) {
                        percent = percent * 100;
                        fullRefundInfo = "该商品参加满减活动，购买活动商品满" + needMoney + "元，可减" + percent + "%";
                    }
                } else if (fullRefundType == FULL_LADDER) {
                    if (fullLadderList != null && fullLadderList.length > 0) {
                        fullRefundInfo = "该商品参加阶梯满减活动，购买活动商品<br/>";
                        $.each(fullLadderList, function(z, fullLadderValue) {
                            if (fullLadderValue.needMoney > 0 && fullLadderValue.rewardMoney > 0) {
                                fullRefundInfo = fullRefundInfo + "满" + fullLadderValue.needMoney + "减" + fullLadderValue.rewardMoney + "元、";
                            }
                        });
                        fullRefundInfo = fullRefundInfo.substring(0, fullRefundInfo.length - 1)
                    }
                }

                var fullRefundTotalInfo = "";
                if (fullRefundInfo != "") {
                    if(adwordLink != null && adwordLink.length > 0) {
                        fullRefundInfo = "<a target=\"_blank\" style='color: red' href=\"" + adwordLink + "\">" + fullRefundInfo + "</a>";
                    }
                    fullRefundTotalInfo = "<table cellspacing='0' cellpadding='0' border='0'><tr><td valign='top' width='60'>促销信息：</td><td><font color='red'>"
                        + fullRefundInfo + "</red></td></tr></table>";
                }

                $("#mfms").html(fullRefundTotalInfo);
                $("#mfms").show();

            }

        });
        if (tag == 1) {
            unitInfor += "</td></tr></table>";
            $("#cx").html(unitInfor);
            $("#cx").show();
        }
    }

}

function getCustomerLevel(level) {
    switch (level) {
        case 50:
            return "注册用户";
        case 56:
            return "铁牌用户";
        case 59:
            return "注册用户";
        case 60:
            return "铜牌用户";

        case 61:
            return "银牌用户";

        case 62:
            return "金牌用户";

        case 63:
            return "钻石用户";

        case 64:
            return "经销商";

        case 65:
            return "VIP";

        case 66:
            return "京东员工";

        case -1:
            return "未注册";

        case 88:
            return "双钻用户";

        case 90:
            return "企业用户";

        case 103:
            return "三钻用户";

        case 104:
            return "四钻用户";

        case 105:
            return "五钻用户";
    }
    return "未知";
}

function refreshPack() {
    var skuId = $("#name").attr("pshowskuid");

    if (skuId % 1 == 0) {
        $.ajax({
			url:"http://jprice.360buy.com/pageadword/"+skuId +"-1-1.html",
			dataType:"script",
			cache:true,
			scriptCharset:"utf-8"
		})
    } else {
        $.getJSONP(
            //"promotioninfo.aspx?callback=getPacks&pid="+so,
            "http://price.360buy.com/promotioninfo.aspx?callback=getPacks&pid=" + skuId,
            getPacks);
    }
}

function getPacks(result) {
    /*
     if (result.pack != null && result.pack != "")
     {
     $("#suit").html(result.pack);
     $("#suit").show();
     $("#suit").jdTab(
     {
     event:"click"
     },setSuitWidth)
     setSuitWidth("",$("#suit").find(".tabcon").eq(0));
     }
     */
    if (result.largess != null && result.largess != "") {
        $("#liLargess").html(result.largess);
        $("#liLargess").show();
    }

    if (result.fujian != null && result.fujian != "") {
        if ($("#fujianContent").length <= 0)
            $("#bzqd").append(result.fujian);

    }

    if (result.product != null && result.product != "") {
        $("#cx").html(result.product);
        $("#cx").show();
    }

    if (result.price != null && result.price != "") {
        $("#promotion1").html(result.price);
    }

    if (result.ext != null && result.ext != "") {
        $("#nocoupon").html(result.ext);
        $("#nocoupon").show();
    }

    if (result.oldtonew != null && result.oldtonew != "") {
        $("#service-trade").html(result.oldtonew);
        var iplocation = null;
        if (getCookie) iplocation = getCookie("ipLocation");
        if ((iplocation && result.oldtonew.indexOf(iplocation) > 0) || !iplocation) {
            $("#service-trade").show();
        } else {
            $("#service-trade").hide();
        }
    }
    if (result.mfms != null && result.mfms != "") {
        $("#mfms").html(result.mfms);
        $("#mfms").show();
    }
//	if(result.promoKey != null && result.promoKey != "")
//	{
//	    $("#choose").find("a").filter(".btn-append").each(function(){
//
//	        if(this.href != null && this.href != undefined && this.href.toLowerCase().indexOf('initcart.aspx') != -1)
//	        {
//	           this.href +="&promId="+result.promoKey;
//	        }
//	    });
//	}
}
refreshPack();