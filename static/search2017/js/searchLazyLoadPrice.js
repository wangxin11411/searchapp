/**
 * [getScreenDom 获取可是区域内对象]
 * @param  {[string]} focusDom       [目标dom标识 class id elementname]
 * @param  {[type]} screenAreaTop    [可视区域上边缘]
 * @param  {[type]} screenAreaBottom [可视区域下边缘]
 * @return {[type]}                  [description]
 */
function getScreenDom(focusDom,screenAreaTop,screenAreaBottom){
    return $(focusDom+":visible").filter(function(){
        var _h = $(this).offset().top;
        if(_h>0 && _h >= screenAreaTop && _h<=screenAreaBottom && !$(this).data("success")){
            $(this).data("success",true)
            return true
        }
        return false
    })
}
/**
 * [priceHtml description] 处理价格区域展示内容,展示比价样式或者普通价格样式
 * @param  {[type]} data     [请求的价格相关数据]
 * @param  {[type]} priceBox [价格节点]
 * @return {[type]}          [description]
 */
function doPriceHtml(data,priceBox){
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
   var propTag = "";
   if(itemType[data.priceType] == "tuanqiang"){
    propTag+='<span class="promotion-normal">真划算</span>'
   }
   //if(data.smartbuy){
   // propTag+='<span class="promotion-normal">享优惠</span>'
   //}
   
   priceBox.find(".price").text(data.price?"¥"+data.price:"").after(propTag)
}


/**
 * 根据商品展示的价格类型修改商品跳转地址和加入购物车功能，
 * 团抢商品-修改商品跳转地址为团抢详情页，改变加入购物车功能为跳转到详情页地址
 * @param  {[type]} data    [请求的价格相关数据]
 * @param  {[type]} itemBox [商品节点]
 * @return {[itemType]}     [价格类型对应的商品类型]
 */
var itemType = {
    GOMEPRICE:"normal",
    SALEPRICE:"normal",
    AREAPRICE:"normal",
    AREASALEPRICE:"normal",
    TUANPRICE:"tuanqiang",
    RUSHBUYPRICE:"tuanqiang"
}
function doItemHerf(data,itemBox){
    var _url = "",
        _hash = ""
    switch(itemType[data.priceType]){
        case "normal":
            _url = "//item"+cookieDomain+"/"+data.productId+"-"+data.skuId+".html";
            _hash = "#gm-other-info"
            break;
        case "tuanqiang":
            _url = "//tuan"+cookieDomain+"/deal/"+data.promotionUrl+".html";
            _hash = "#j-comment-section";
            var addCart = itemBox.find(".addTo-cart"),
                cartDataCode = addCart.attr("data-code")
            addCart.undelegate().replaceWith('<a class="add-cart" href="'+_url+'" target="_blank" data-code="'+cartDataCode+'">立即购买</a>')
            break;
        default:
            break;
    }

    itemBox.find(".item-link").attr("href",_url)
    itemBox.find(".comment").attr("href",_url+_hash)

}

function priceInterval(){
    var $windows = $(window);
    var areaBottom = $windows.scrollTop() + $windows.height() +300;
    var areaTop = $windows.scrollTop()-300;

    //var screenItem = getScreenDom(".product-item",areaTop,areaBottom).not(".product-ad")
    var screenItem = getScreenDom(".ancyPrice",areaTop,areaBottom);
    var screenImg = getScreenDom(".nSearchWarp img",areaTop,areaBottom);

    //商品价格异步[主商品价格异步、热卖推荐价格异步、最近浏览价格异步、对比栏中最近浏览价格异步、对比栏价格异步]
    if(screenItem.length > 0){
        $.each(screenItem,function(i){
            var $dom = $(this),
                $infoElement = $dom.parent().find(".productInfo"),
                productID = $infoElement.attr("pid"),
                skuID = $infoElement.attr("sid"),
                $mainBox = $dom;
            $.ajax({
                type:"get",
                url:["//ss.gome.com.cn","search/v1/price/single",productID,skuID,pageData._bdarea_2,"flag/item","fn"+ i].join("/"),
                dataType:"jsonp",
                jsonpCallback:"fn"+ i,
                success:function(data){
                    if(data && data.success){
                        if($mainBox.parent().attr("class").indexOf("product-item") != -1) {
                            doPriceHtml(data.result,$mainBox.find(".item-price-info"));
                            doItemHerf(data.result,$mainBox);
                        }else {
                            $mainBox.parent().find(".ancyPrice span").text(data.result.price?"¥"+data.result.price:"");
                        }
                    }else{
                        $dom.data("success",false);
                    }
                }
            })
        })
    }
    /**
     *  页面图片延迟加载
     */
    if(screenImg.length > 0){
        $.each(screenImg,function(i){
            $(this).attr("src",$(this).attr("gome-src"));
        })
    }

}
