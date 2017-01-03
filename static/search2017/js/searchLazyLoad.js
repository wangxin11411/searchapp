/**
 * 页面图片 定时1s 加载可视区域图片  
 */


/*请求得到的数据进行拼接，插入到对应的dom中*/
function comparePrice(dat,curPrice,_this) {
    if(dat && !($.isEmptyObject(dat))) {
        var jdDefalut = dat.jd?'比京东低'+dat.jd.low+'元':'比苏宁低'+dat.sn.low+'元';
        var jdShow = dat.jd?'<p>京东价：<span>¥'+dat.jd.price+'</span>比京东低'+dat.jd.low+'元</p>':'';
        var snShow = dat.sn?'<p>苏宁价：<span>¥'+dat.sn.price+'</span>比苏宁低'+dat.sn.low+'元</p>':'';
        var _compareHtml = '\
			<div class="sb-item-price-warp">\
			    <ul class="sb-item-price">\
			        <li class="defaultLi"><span>¥'+curPrice+'</span>'+jdDefalut+'</li>\
			        <li class="otherLi">\
			            '+jdShow+'\
			            '+snShow+'\
			        </li>\
			        <li><p class="ti">比价时间：'+dat.time+'</p></li>\
			    </ul>\
			    <i class="tiger"></i>\
			</div>\
			';
        _this.empty().append(_compareHtml);
    }
};
function nomalInterval(){
    var max_height = $(window).scrollTop() + $(window).height() +300;
    var min_height = $(window).scrollTop()-300;
    $(".nSearchWarp img").each(function(){
        var _self = $(this);
            _offsetTop = _self.offset().top;
        if(_offsetTop!=0 && _offsetTop <= max_height && _offsetTop > min_height &&  _self.attr("gome-src")!=""){
            var _imgSrc = _self.attr("gome-src");
            _self.attr("src",_imgSrc);
            _self.attr("gome-src","");
            _self.data("success",true)
        }   
    });

    /*
     * 比价需求临时下线10.31   
    $(".product-item").each(function(index,elem){
        var _offsetTop = $(elem).offset().top;
        var $smart_price = $(elem).find(".item-price-major");
        if(_offsetTop!=0 && _offsetTop <= max_height && _offsetTop > min_height){
            if($smart_price.data("lazysmart") == 0){
                $smart_price.data("lazysmart",1)
                var _sid = $(elem).find(".productInfo").attr("sid");
                var _price = $(elem).find(".productInfo").attr("price");
                $.ajax({
                    type: "get",
                    // jsonpName: "comparePrice",
                    url: "//api.search"+ cookieDomain + "/p/smartBuy?",
                    data: {
                        smartFlag: 4,
                        skuId: _sid,
                        from: "search_smart",
                        price: _price
                    },
                    // jsonpCallback: compareing,
                    dataType: 'jsonp',
                    success: function(data) {
                        comparePrice(data,_price,$smart_price.parents(".item-price-info"));
                    }
                });
            }  
        }
    });*/
}