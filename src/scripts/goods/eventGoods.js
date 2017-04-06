/*加入购物车*/
$("#product-box").delegate(".addTo-cart", "click", function() {
    var $this = $(this),
        _type = 0,
        _pid = $this.attr("pid"),
        _sid = $this.attr("skuid"),
        _taogType = $this.attr("taoType"),
        _shopFlag = $this.attr("shopFlag");

    if($this.attr("isHyg") == "1" && _shopFlag != 6 && _shopFlag != 5){_type = 16};

    if(_taogType == 2){_type = 24};
    if(_taogType == 3){
        _type = 24;
        _sid = $this.attr("taoSkuId")
    };

    /* 加入购物车美通卡入口*/
    if($this.attr("isMCard")){
        window.open("//card"+cookieDomain+"?intcmp="+$this.attr("data-code")+"&skuType="+$this.attr("isMCard")+"&productId="+_pid+"&skuId="+_sid+"&count=1","_blank")
    }else{
        window.open("//cart"+cookieDomain+"/addsuccess?intcmp="+$this.attr("data-code")+"&homesite=home&type="+_type+"&sid="+_sid+"&pid="+_pid+"&pcount=1&cr=0"+"&_r="+new Date().getTime(),"_blank")
    }
});


/*添加收藏*/
$("#product-box").delegate(".add-collection", "click", function() {
    var $this = $(this),
        _pid = $this.attr("pid"),
        _sid = $this.attr("skuid"),
        _name = $this.attr("pname");
    g.login(function(){
        require('../function/addCollection').addCollect(_pid,_sid,loginData.loginId,_name);
    });
});

/*到货通知*/
$("#product-box").delegate(".next-buy","click",function(){
    var $this = $(this),
        _pid = $this.attr("pid"),
        _sid = $this.attr("skuid");
    g.login(function(){
        require('../function/arriveNotice').arriveNotice(_pid,_sid,loginData.loginId,pageData.regionId);
    });
});
/*套装商品切换*/
$("#product-box").delegate(".arbitrage-num","mouseenter",function(){
    var _this = $(this).parents(".product-item-tao");
    var _index = $(this).index();
    if($(this).hasClass("arbitrage-cur")) return false;
    $(this).addClass("arbitrage-cur").siblings().removeClass("arbitrage-cur")
    if(!_this.data("taoCompate")){
        var _data = {products:[]};
        var tpl_detail = require("./templateGoods").getTemplate("taogou");
        var tpl_taogou = '{{each products}}'+tpl_detail+'{{/each}}';
        var data = _this.attr("id").split("-");
        $.ajax({
            url:"//apis"+cookieDomain+"/p/taoGou/"+data[1]+"/"+data[2],
            dataType:"jsonp",
            data:{from:"search"},
            timeout:1000
        }).done(function(data){
            _this.data("taoCompate",true);
            _data.products = data;
            var _html = templateSimple.compile(tpl_taogou)($.extend({},_data,{'noSkusStock':pageData.noSkusStock,'modelid':"9000000700",'pageNumber':pageData.currentPage,'productSite':pageData.productSite}));
            _this.find(".item-tab-warp").append(_html).find(".item-tab").eq(_index).show().siblings().hide();
            window.compare_asyn();
        }).fail(function(){
            _this.data("taoCompate",false);
        })
    }else{
        _this.find(".item-tab-warp").find(".item-tab").eq(_index).show().siblings().hide();
    }
});

/*多sku小图点选*/
$("#product-box").delegate(".icon-prev","click",function(){
    var pars = $(this).parents(".item-pic-small-box");
    var ingList = pars.find(".imgList");
    var nextbtn = pars.find(".icon-next");
    var index = pars.attr("index");
    var curIndex = pars.attr("curindex");
    if (!$(this).hasClass("disable")) {
        if (++curIndex <= index) {
            nextbtn.removeClass("disable");
            pars.attr("curindex", curIndex);
            ingList.animate({
                "left": (curIndex - index) * 37 + "px"
            }, 100)
        } else {
            $(this).addClass("disable");
        }
    }
});
$("#product-box").delegate(".icon-next","click",function(){
    var pars = $(this).parents(".item-pic-small-box");
    var ingList = pars.find(".imgList");
    var prevbtn = pars.find(".icon-prev ");
    var index = pars.attr("index");
    var curIndex = pars.attr("curindex");
    if (!$(this).hasClass("disable")) {
        if (--curIndex >= 5) {
            prevbtn.removeClass("disable");
            pars.attr("curindex", curIndex);
            ingList.animate({
                "left": (curIndex - index) * 37 + "px"
            }, 100)
        } else {
            $(this).addClass("disable");
        }
    }
});
$("#product-box").delegate(".icon-li","click",function(){
    var _o = $(this);
    var pars = _o.parents(".item-tab");
    var imgSrc = "";
    var links = _o.attr("surl");
    var nSid = _o.attr("sid");

    if(_o.attr("isBigImg")){
        imgSrc = _o.attr("d_src")+"_220_275.jpg";
    }else{
        imgSrc = _o.attr("d_src")+"_210.jpg";
    }
    pars.data("success",false);
    pars.find(".asynPrice").attr("skuid",nSid);
    pars.find(".item-pic img").attr("src",imgSrc);
    pars.find(".item-pic a").attr("href",links);
    pars.find(".item-name a").attr("href",links);
    pars.find(".item-comment-dispatching a").attr("href",links+"#gm-other-info");
    pars.find(".add-cart").attr("skuid",nSid);
    pars.find(".add-collection").attr("skuid",nSid);

    _o.addClass("current").siblings("li").removeClass("current");
});
/*商品点击 搜索云埋码统计*/
$("#product-box").delegate(".item-link","click",function(){
    var element_info = $(this).parents(".product-item").find(".productInfo");
    require('../about/emcode/gateway').cloudClickMonitor(element_info);
    //trackProdClk(tracks, pId, catName, dsp_gome_c3id, isSearch);
});

/*商品划过 请求在线客服*/
var _onlieTimer = null;
$("#product-box").delegate(".product-item","mouseenter mouseleave",function(e){
    var $this = $(this),
        element_info = $this.find(".productInfo");
    if($this.hasClass("product-ad") || $this.data("hasOnline")) return false;
    if (e.type == "mouseenter") {
        var getOnlineService = require('../function/getOnlineService');

        _onlieTimer = setTimeout(function(){
            $this.data("hasOnline",true);
            if(element_info.attr("thirdProduct") == "0"){
                getOnlineService.selfsell(element_info.attr("cateId"),element_info.attr("brandIds")).done(function(data){
                    $('<a href="javascript:void(0)" class="online-server"></a>').appendTo($this.find(".item-shop")).data("customer",{
                        customerHost:data.customerHost,
                        customerID:data.customerID,
                        customerInfo:data.customerInfo,
                        shopName:""
                    });
                });
            }else{
                getOnlineService.thirdsell(element_info.attr("shopId")).done(function(data){
                    $('<a href="javascript:void(0)" class="online-server"></a>').appendTo($this.find(".item-shop")).data("customer",{
                        customerHost:data.customerHost,
                        customerID:data.customerID,
                        customerInfo:data.customerInfo,
                        shopName:element_info.attr("shopName")
                    });
                });
            }
        },1000);

    }else if(e.type == "mouseleave") {
        clearTimeout(_onlieTimer)
    } else {}
});

$("#product-box").delegate(".online-server", "click", function() {
    var $this = $(this);
    var customerData = $this.data("customer");
    g.login(function(){
        window.open(
            customerData.customerHost+'/chatClient/chatbox.jsp?companyID='+customerData.customerID+'&customerID='+customerData.customerID+
            '&info='+customerData.customerInfo+'&page=0&enterurl='+window.location.href+'&areaCode='+pageData.regionId+'&shopname='+ encodeURI(customerData.shopName)+
            ',customerService=' + customerData.customerID+',toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=1120,height=700'
        );
    });
});
