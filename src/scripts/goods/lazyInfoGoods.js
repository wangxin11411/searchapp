/**
 * 页面级事件，
 * 【一】1.5s定时器,，异步价格盒子asynPriceBox，
 *  (1)获取可视区域内图片，设置src地址
 *  (2)获取可视区域内asynPriceBox盒子，异步获取价格信息，成功调用setAsynPriceBox方法设置相关信息
 *      a,asynPriceBox盒子包括：主体商品，列表页顶部热卖推荐商品（from云眼），底部对比商品，底部最近浏览商品
 */
define(function(require,exports,module){
var getScreenDom = require("../function/getScreenDom");
var itemType = {
    GOMEPRICE:"normal",
    SALEPRICE:"normal",
    AREAPRICE:"normal",
    AREASALEPRICE:"normal",
    TUANPRICE:"tuanqiang",
    RUSHBUYPRICE:"tuanqiang"
};
/**
 * [setAsynPriceBox 设置异步价格盒子内方法]根据获取的价格类型重新定义.item-link点击跳转地址，.addTo-cart加入购物车地址，价格标签
 * @param  {[type]} data    [请求的价格相关数据]
 * @param  {[type]} asynPriceBox [异步价格节点]
 */
/***/
function setAsynPriceBox(data,asynPriceBox){
    var _url = "",
        _hash = "",
        propTag = "";
    switch(itemType[data.priceType]){
        case "normal":
            _url = "//item"+cookieDomain+"/"+data.productId+"-"+data.skuId+".html";
            _hash = "#gm-other-info";
            break;
        case "tuanqiang":
            _url = "//tuan"+cookieDomain+"/deal/"+data.promotionUrl+".html";
            _hash = "#j-comment-section";
            var addCart = asynPriceBox.find(".addTo-cart"),
                cartDataCode = addCart.attr("data-code");
            addCart.undelegate().replaceWith('<a class="add-cart" href="'+_url+'" target="_blank" data-code="'+cartDataCode+'">立即购买</a>');
            break;
        default:
            break;
    }

    /**
     * 比价需求临时下线10.31
     if(data.smartbuy){
        var dataSmart = data.smartbuy
        var jdDefalut = dataSmart.jingdongPrice?'比京东低'+dataSmart.jingdongLower+'元':'比苏宁低'+dataSmart.suningLower+'元';
        var jdShow = dataSmart.jingdongPrice?'<p>京东价：<span>¥'+dataSmart.jingdongPrice+'</span>比京东低'+dataSmart.jingdongLower+'元</p>':'';
        var snShow = dataSmart.suningPrice?'<p>苏宁价：<span>¥'+dataSmart.suningPrice+'</span>比苏宁低'+dataSmart.suningLower+'元</p>':'';
        var compareHtml = ['<div class="sb-item-price-warp"><ul class="sb-item-price"><li class="defaultLi"><span>¥',data.price,'</span>',jdDefalut,'</li><li class="otherLi">',jdShow,snShow,'</li><li><p class="ti">比价时间：'+dataSmart.smartdate+'</p></li></ul><i class="tiger"></i></div>'].join("");
        priceBox.empty().html(compareHtml)
     }else{
        priceBox.find(".price").text("¥"+data.price)
     }
     */

    if(itemType[data.priceType] == "tuanqiang"){
        propTag+='<span class="promotion-normal">真划算</span>'
    }
    /*if(data.smartbuy){
     propTag+='<span class="promotion-normal">享优惠</span>'
     }*/

    asynPriceBox.find(".asynPrice").text(data.price?"¥"+data.price:"暂无售价").after(propTag)
    asynPriceBox.find(".item-link").attr("href",_url);
    asynPriceBox.find(".comment").attr("href",_url+_hash);

}
setInterval(function(){
    var $windows = $(window);
    var areaBottom = $windows.scrollTop() + $windows.height() +300;
    var areaTop = $windows.scrollTop()-300;

    var screenItem = getScreenDom(".asynPriceBox",areaTop,areaBottom);
    var screenImg = getScreenDom(".nSearchWarp img",areaTop,areaBottom);

    if(screenImg.length > 0){
        $.each(screenImg,function(i){
            $(this).attr("src",$(this).attr("gome-src"));
        })
    }

    if(screenItem.length > 0){
        $.each(screenItem,function(i){
            var $dom = $(this),
                $priceDom = $(this).find(".asynPrice");
            $.ajax({
                type:"get",
                url:["//ss"+cookieDomain,"search/v1/price/single",$priceDom.attr("pid"),$priceDom.attr("skuid"),pageData.regionId_2,"flag/item","fn"+ i].join("/"),
                dataType:"jsonp",
                jsonpCallback:"fn"+ i,
                success:function(data){
                    if(data && data.success){
                        setAsynPriceBox(data.result,$dom);
                    }else{
                        $dom.data("success",false);
                    }
                }
            })
        })
    }

},1000);
});