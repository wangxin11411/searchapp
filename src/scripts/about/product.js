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
    var cookieAg = $.cookie("atgregion").split("|")[0];
    var userId = $.cookie("SSO_USER_ID");
    require('../function/arriveNotice').arriveNotice("9134521004","1123461018",userId,cookieAg);
})




