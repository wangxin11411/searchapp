/**
 * 单独商品的相关事件文件
 * 
 */
/*绑定服装 百货商品等带小图商品点击事件*/
function smallImgSprev(obj) {
    var pars = $(obj).parents(".item-pic-small-box");
    var ingList = pars.find(".imgList");
    var nextbtn = pars.find(".icon-next");
    var index = pars.attr("index");
    var curIndex = pars.attr("curindex");
    if (!$(obj).hasClass("disable")) {
        if (++curIndex <= index) {
            nextbtn.removeClass("disable");
            pars.attr("curindex", curIndex);
            ingList.animate({
                "left": (curIndex - index) * 37 + "px"
            }, 100)
        } else {
            $(obj).addClass("disable");
        }
    }
}
function smallImgSnext(obj){
    var pars = $(obj).parents(".item-pic-small-box");
    var ingList = pars.find(".imgList");
    var prevbtn = pars.find(".icon-prev ");
    var index = pars.attr("index");
    var curIndex = pars.attr("curindex");
    if (!$(obj).hasClass("disable")) {
        if (--curIndex >= 5) {
            prevbtn.removeClass("disable");
            pars.attr("curindex", curIndex);
            ingList.animate({
                "left": (curIndex - index) * 37 + "px"
            }, 100)
        } else {
            $(obj).addClass("disable");
        }
    }
}
function smallImgOnClick(obj){
    var _o = $(obj);
    var pars = _o.parents(".product-item");
    var bigImgBox = pars.find(".item-pic");
    var imgSrc = "";
    var links = bigImgBox.find("a").attr("href").split("-");
    var nSid = _o.attr("sid");
    //var _links = pars.find(".emcode").attr("href").split("-");
    if(bigImgBox.hasClass("bigp")){
        imgSrc = _o.attr("d_src")+"_220_275.jpg";
    }else{
        imgSrc = _o.attr("d_src")+"_210.jpg";
    }
    bigImgBox.find("img").attr("src",imgSrc);
    pars.find(".item-link").attr("href",links[0]+"-"+nSid+".html");
    pars.find(".productInfo").attr("sid",nSid);
    _o.parents("li").addClass("current").siblings("li").removeClass("current");
}

/*套购商品标签切换*/
$("#product-box").delegate(".arbitrage-num", "mouseover", function() {
    var _this = $(this),
        arbitrageNumIndex = _this.index(),
        _productItem = _this.parents(".product-item"),
        _productInfo = _productItem.find(".productInfo"),
        _gomeert = _this.attr("gomeert"),
        _pId = _this.attr("pId"), 
        _sId = _this.attr("sId"),
        _skuNo = _this.attr("skuNo"),
        _pName = _this.attr("pName"),
        _price = _this.attr("price"),
        _evaluateCount = _this.attr("evaluateCount"),
        _promoScore = _this.attr("promoScore"),
        _pStock = _this.attr("pStock"),
        _pWeight = _this.attr("pWeight"),
        _promoStock = _this.attr("promoStock"),
        _score = _this.attr("score"),
        _oBox = _productItem.find(".item-tab-warp").eq(arbitrageNumIndex),
        _oImg = _oBox.find(".item-pic img"),
        _taogou = _this.attr("taogou")

    $(this).addClass("arbitrage-cur").siblings().removeClass("arbitrage-cur")

    if(_oImg.attr("gome-src")!=""){
        _oImg.attr("src",_oImg.attr("gome-src"));
        _oImg.attr("gome-src","");
        _oImg.data("success",true);
    }
    _oBox.show().siblings(".item-tab-warp").hide()
    _productInfo.attr("gomeert",_gomeert)
    _productInfo.attr("pId",_pId)
    _productInfo.attr("sId",_sId)
    _productInfo.attr("skuNo",_skuNo)
    _productInfo.attr("pName",_pName)
    _productInfo.attr("price",_price)
    _productInfo.attr("evaluateCount",_evaluateCount)
    _productInfo.attr("promoScore",_promoScore)
    _productInfo.attr("pStock",_pStock)
    _productInfo.attr("pWeight",_pWeight)
    _productInfo.attr("promoStock",_promoStock)
    _productInfo.attr("score",_score)
    _productInfo.attr("taogou",_taogou)
});


$("#product-box").delegate(".addTo-cart", "click", function() {
    var $productInfoInput = $(this).parents(".product-item").find(".productInfo");
    ////新购物车跳转
    /*当前阶段，精简出来的商品类型 只有普通商品 海外购商品 如果有其他商品时需重新考虑开发*/
    var _type = 0;
    if($productInfoInput.attr("markettag") == "1"){_type = 16};
    if($productInfoInput.attr("taogou") == "1"){_type = 24};
    
    var skuId = $productInfoInput.attr("sid");
    var pId = $productInfoInput.attr("pid");
    var price = $productInfoInput.attr("price");
    var skuName = $productInfoInput.attr("pname").replace("<label style=\"color:red;\">", "").replace("</label>", "");
    var lName = this.localName;
    var catName = dsp_gome_c1name + ":" + dsp_gome_c2name + ":" + dsp_gome_c3name;

    var dataPage = $("body").attr("data-page");
    var dataCode = $(this).attr("data-code");
    var url = "//cart"+cookieDomain+"/addsuccess?intcmp="+dataPage+"-"+dataCode;
   /* $.createProgress({
        Jump:true,
        openJump:true,
        url:url+"?homesite=home&type="+_type+"&sid="+skuId+"&pid="+pId+"&pcount=1&cr=0"+"&_r="+new Date().getTime()
    });*/
    /* 加入购物车美通卡入口*/
    if($(this).attr("isMCard")){
        window.open("//card"+cookieDomain+"?skuType="+$(this).attr("isMCard")+"&productId="+pId+"&skuId="+skuId+"&count=1","_blank")
    }else{
        $.createProgress({
            Jump:true,
            openJump:true,
            url:url+"&homesite=home&type="+_type+"&sid="+skuId+"&pid="+pId+"&pcount=1&cr=0"+"&_r="+new Date().getTime()
        });
    }
    

    trackCart(pId, price, lName, catName, dsp_gome_c3id, skuId, isSearch, skuName);
})
//添加收藏
$("#product-box").delegate(".add-collection", "click", function() {
    var $productInfoInput = $(this).parents(".product-item").find(".productInfo");
    var $skuId = $productInfoInput.attr("sId");
    var $pId = $productInfoInput.attr("pId");
    if($productInfoInput.attr("gomeert")=="true"){return;}//如果是果汁没商品返回
    g.login(function(){
        searchBase.addCollection($productInfoInput.attr("pId"),$productInfoInput.attr("sId"), loginData.loginId, "wishlist", $productInfoInput.attr("pName"));
    });
    gomeClicki('send', 'event', '购物流程','加入收藏',$skuId,{'customActionId':'888','customActionLabel1':$pId,'customActionLabel2':$skuId});
})
//预约购买
$("#product-box").delegate(".prev-buy", "click", function() {
    var element_info = $(this).parents(".product-item").find(".productInfo");
    var tracks = $(this).attr("track");
    var sid = element_info.attr("sid");
    var pId = element_info.attr("pid");
    var salesVolume = element_info.attr("saleCount");
    var skuName = element_info.attr("pname").replace("<label style=\"color:red;\">", "").replace("</label>", "");
    var catName = dsp_gome_c1name + ":" + dsp_gome_c2name + ":" + dsp_gome_c3name;
    trackProdClk(tracks, pId, catName, dsp_gome_c3id, isSearch);
})
//到货通知 登录情况出现弹出层，输入邮件手机号码
var arrivalNoticeHtml = '<div class="dh-warp"><h3 class="dh-title">到货通知</h3><p class="dh-info">一旦该商品到货，我们会通过手机短信或邮件通知您</p>'
                +'<table class="dh-form"><tr><td class="dh-hd"><em class="nHeigh">*</em>手机号码：</td><td><input type="text" class="dh-input-text" id="dh-telNum"><span id="dh-telNum-warn"></span></td></tr>'
                +'<tr><td class="dh-hd"><em class="nHeigh">*</em>邮箱地址：</td><td><input type="text" class="dh-input-text" id="dh-email"><span id="dh-email-warn"></span></td></tr>'
                +'<tr><td>&nbsp;</td><td class="dh-label-box"><label class="gmform-label" for="dhAddCollection"><input class="gmform-input-check" type="checkbox" name="dhAddCollection" id="dhAddCollection">同时加入收藏夹</label></td></tr>'
                +'<tr><td>&nbsp;</td><td class="dh-btn-box"><a href="javascript:void(0)" class="dh-btn-submite" id="dh-submite">确定</a><a href="javascript:void(0)" class="dh-btn-cancel closeBtn">取消</a></td></tr></table></div>'
//注册到货通知事件
$("#product-box").delegate(".next-buy", "click", function() {
    var $productInfoInput = $(this).parents(".product-item").find(".productInfo")
    var productInfo = {
        "productId":$productInfoInput.attr("pId"),
        "skuId":$productInfoInput.attr("sId"),
        "city":pageData._bdarea,
        "uid":pageData.cid,
        "mail":"",
        "tell":"",
        "isSelcet":"false"
    }

    g.login(function(){
        searchBase.showMask();
        searchBase.addMaskContent(arrivalNoticeHtml);//展开弹出层设置弹出层内容
        
        //绑定提交按钮事件
        $("#dh-submite").bind("click",function(){
            var email_val = $("#dh-email").val(),
                email_warnObj = $("#dh-email-warn"),
                phone_val = $("#dh-telNum").val(),
                phone_warnObj = $("#dh-telNum-warn")
            if(searchBase.check_phone(phone_val,phone_warnObj) && searchBase.check_email(email_val,email_warnObj)){
                productInfo.mail = email_val;
                productInfo.tell = phone_val;
                if($("#dhAddCollection").attr("checked") == "checked"){
                    productInfo.isSelcet = "true"
                }
                var url = "//ss"+cookieDomain + "/item/v1/notice/arrival/"+productInfo.productId+"/"+productInfo.skuId+"/"+loginData.loginId+"/"+productInfo.city+"/"+productInfo.tell+"/"+productInfo.mail+"/"+productInfo.isSelcet+"/flag/search/";
                searchBase.arrivalNotice(url,"notice");
            }
        })   
    })
})
/*比价 划过效果*/
$("#product-box").delegate(".item-price-info",{
    "mouseenter":function(){
        var _height = $(this).find(".sb-item-price-warp .sb-item-price .otherLi p").length * 20;
        $(this).find(".sb-item-price-warp .sb-item-price .otherLi").animate({"height":_height},333)
    },
    "mouseleave":function(){
        $(this).find(".sb-item-price-warp .sb-item-price .otherLi").stop(true,false).animate({"height":0},333)
    }
});