/*加入购物车*/
$("#product-box").delegate(".addTo-cart", "click", function() {
    var $info = $(this).parents(".product-item").find(".productInfo");
    var _type = 0;
    var infoBox = $("#item-info-body");
    if($info.attr("isHyg") == "1"){_type = 16};
    if($info.attr("isTaogou") == "true"){_type = 24};
    /* 加入购物车美通卡入口*/
    if($(this).attr("isMCard")){
        window.open("//card"+cookieDomain+"?intcmp="+$(this).attr("data-code")+"&skuType="+$(this).attr("isMCard")+"&productId="+$info.attr("pid")+"&skuId="+$info.attr("skuid")+"&count=1","_blank")
    }else{
        window.open("//cart"+cookieDomain+"/addsuccess?intcmp="+$(this).attr("data-code")+"&homesite=home&type="+_type+"&sid="+$info.attr("skuid")+"&pid="+$info.attr("pid")+"&pcount=1&cr=0"+"&_r="+new Date().getTime(),"_blank")
    }
});



/*添加收藏*/
$("#product-box").delegate(".add-collection", "click", function() {
    g.login(function(){
        //searchBase.addCollection($productInfoInput.attr("pId"),$productInfoInput.attr("sId"), loginData.loginId, "wishlist", $productInfoInput.attr("pName"));
        require('../function/addCollection').addCollect("9134521004","1123461018",loginData.loginId,"华为 HUAWEI Mate 9 4GB+32GB 全网通版 月光银","wishlist");

    });
});

/*到货通知*/
$("#product-box").delegate(".next-buy","click",function(){
    var request_tre = function(){};
    var content = '<div class="dh-warp"><h3 class="dh-title">到货通知</h3><p class="dh-info">一旦该商品到货，我们会通过手机短信或邮件通知您</p><table class="dh-form"><tbody><tr><td class="dh-hd"><em class="nHeigh">*</em>手机号码：</td><td><input class="dh-input-text" id="dh-telNum" type="text"><span id="dh-telNum-warn"></span></td></tr><tr><td class="dh-hd"><em class="nHeigh">*</em>邮箱地址：</td><td><input class="dh-input-text" id="dh-email" type="text"><span id="dh-email-warn"></span></td></tr><tr><td>&nbsp;</td><td class="dh-label-box"><label class="gmform-label" for="dhAddCollection"><input class="gmform-input-check" name="dhAddCollection" id="dhAddCollection" type="checkbox">同时加入收藏夹</label></td></tr><tr><td>&nbsp;</td><td class="dh-btn-box"><a href="javascript:void(0)" class="dh-btn-submite" id="dh-submite">确定</a><a href="javascript:void(0)" class="dh-btn-cancel closeBtn">取消</a></td></tr></tbody></table></div>';
    require('../function/showMask').showMask(content,request_tre);
    $("#mask-overlay").remove();


})




