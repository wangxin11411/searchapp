/**
 * [ProductItemTpl description] 商品请求相关模板，所有涉及到主区域商品异步请求
 * @type {Object}
 * ProductItem.getProductItem(sort,pageNumber)  调用方法
 */
var ProductItemTpl = {
    baseTpl:function(op){
        //如果op是true，是套购商品结构
        var hideClass = "";
        var majorItem = "item-price-major";
        var compareBtn = "add-contrast display-page-compare-checkbox";
        if(op){
            hideClass = "item-tab-warp-hidd";
            majorItem = "";
            compareBtn = "add-contrast-no";
        }
    return '\
    <div class="item-tab-warp ancyPrice '+hideClass+'" sid="{{$value.skuId}}" pid="{{$value.pId}}">\
            {{if $value.isGomeart}}\
                <p class="item-pic"><a class="emcodeItem item-link" rel="nofollow" target="_blank" data-code="{{modelid}}-{{content.pageBar.pageNumber}}_{{$value.prdIndex+1}}_1" track="产品列表图片" href="{{$value.pUrl}}" title="{{$value.alt}}"><img gome-src="{{$value.sImg}}" src="//img.gomein.net.cn/images/grey.gif" alt="{{$value.alt}}"></a></p>\
            {{else if $value.isBigImg}}\
                <p class="item-pic bigp"><a class="emcodeItem item-link" rel="nofollow" href="{{$value.pUrl}}" target="_blank" data-code="{{modelid}}-{{content.pageBar.pageNumber}}_{{$value.prdIndex+1}}_1" track="产品列表图片" title="{{$value.alt}}"><img gome-src="{{$value.sImg}}_220_275.jpg" alt="{{$value.alt}}" src="//img.gomein.net.cn/images/grey.gif"></a></p>\
            {{else}}\
                <p class="item-pic"><a class="emcodeItem item-link" rel="nofollow" href="{{$value.pUrl}}" data-code="{{modelid}}-{{content.pageBar.pageNumber}}_{{$value.prdIndex+1}}_1" track="产品列表图片" target="_blank" title="{{$value.alt}}"><img gome-src="{{$value.sImg}}_210.jpg" src="//img.gomein.net.cn/images/grey.gif" alt="{{$value.alt}}"></a>{{if ($value.promoFlag && $value.promoFlag != 1) && ($value.energyTag == 1)}}<span class="save-energy"></span>{{/if}}</p>\
            {{/if}}\
            {{if content.prodInfo.clothes || content.prodInfo.merchandise}}\
                <div class="item-pic-small-box" index="{{$value.images.length}}" curIndex="{{$value.images.length}}">\
                {{if $value.images.length> 5 }}\
                    <a href="javascript:void(0);" class="icon-prev disable" onClick="javascript:smallImgSprev(this)"></a>\
                    <a href="javascript:void(0);" class="icon-next" onClick="javascript:smallImgSnext(this)"></a>\
                {{/if}}\
                    <div class="item-pic-small-wrap">\
                        <ul class="imgList">\
                        {{each $value.images}}\
                            <li class="" sid="{{$value.skuId}}">\
                            <a track="商品小图:{{$value.skuId}}" href="javascript:void(0);" title="{{$value.color}}">\
                                <img onClick="javascript:smallImgOnClick(this)" gome-src="{{$value.sImg}}_30.jpg" sid="{{$value.skuId}}" d_src="{{$value.sImg}}" alt="{{$value.color}}" src="//img.gomein.net.cn/images/grey.gif" />\
                            </a>\
                            </li>\
                        {{/each}}\
                        </ul>\
                    </div>\
                </div>\
            {{/if}}\
            <div class="item-price-info">\
                <p class="item-price '+majorItem+'" data-lazysmart="0">\
                {{if $value.stock == 3 && $value.showPrice == 1}}\
                    <span class="price">敬请期待</span>\
                {{else}}\
                    <span class="price"></span>\
                {{/if}}\
                {{if $value.goodsType && $value.goodsType == "ZC2M"}}\
                    <span class="promotion-c2m"></span>\
                {{/if}}\
                {{if $value.marketTag && $value.marketTag == 1}}\
                    <span class="promotion-hwg"></span>\
                {{/if}}\
                {{if $value.isVip && $value.isVip == 1}}\
                    <span class="promotion-normal">会员商品</span>\
                {{/if}}\
                </p>\
            </div>\
                <p class="item-name"><a rel="nofollow" class="emcodeItem item-link" data-code="{{modelid}}-{{content.pageBar.pageNumber}}_{{$value.prdIndex+1}}_1" track="产品列表名称" href="{{$value.pUrl}}" target="_blank" title="{{$value.alt}}">{{#$value.name}}</a></p>\
                {{if $value.promoDesc !="" || ($value.promoTags && $value.promoTags != null)}}\
                    <p class="item-promotional-language">\
                        <!--{{if $value.promoTags && $value.promoTags != null && $value.promoTags.promoType && $value.promoTags.promoType == 2}}\
                            【{{$value.promoTags.promoPrice}}手机专享价】\
                        {{/if}}-->\
                        {{$value.promoDesc}}\
                    </p>\
                {{/if}}\
                <p class="item-comment-dispatching">\
                {{if noSkusStock}}\
                <span class="dispatching">{{$value.cityName}}无货</span>\
                {{else}}\
                {{if $value.stock==0}}\
                    <span class="dispatching">{{$value.cityName}}无货</span>\
                {{else if $value.stock==1}}\
                    <span class="dispatching">{{$value.cityName}}有货</span>\
                {{else if $value.stock==2}}\
                    <span class="dispatching nOrange">{{$value.cityName}}暂不支持配送</span>\
                {{else if $value.stock==3}}\
                    <span class="dispatching nOrange">正在预约中</span>\
                {{else if $value.stock==4}}\
                    <span class="dispatching nHeigh">正在抢购中</span>\
                {{else}}\
                    <span class="dispatching">{{$value.cityName}}无货</span>\
                {{/if}}\
                {{/if}}\
                    <a href="{{$value.pUrl}}#j-comment-section" target="_blank" class="comment emcodeItem" data-code="{{modelid}}-{{content.pageBar.pageNumber}}_{{$value.prdIndex+1}}_2" track="产品列表评论数">{{$value.evaluateCount}}</a>\
                </p>\
                <p class="item-option clearfix">\
                    <span class="'+compareBtn+' emcodeProp17" track="'+pageData.pageName +':对比"></span>\
                    <span class="add-collection">收藏</span>\
                {{if noSkusStock}}\
                    <span class="add-cart next-buy emcodeProp17" track="'+pageData.pageName +':到货通知">到货通知</span>\
                {{else}}\
                    {{if $value.stock == 0}}\
                        <span class="add-cart next-buy emcodeProp17" track="'+pageData.pageName +':到货通知">到货通知</span>\
                    {{else if $value.stock == 1}}\
                        <!--{{if $value.promoStock==3}}\
                            <a href="//tuan'+cookieDomain+'/deal/{{$value.promoTags.id}}.html" target="_blank" class="add-cart emcodeItem" data-code="{{modelid}}-{{content.pageBar.pageNumber}}_{{$index}}" track="产品列表立即抢购">立即疯抢</a>\
                        {{else if $value.promoStock==4}}\
                            <a href="//q'+cookieDomain+'/item/{{$value.promoTags.id}}.html" target="_blank" class="add-cart emcodeItem" data-code="{{modelid}}-{{content.pageBar.pageNumber}}_{{$index}}" track="产品列表立即疯抢">立即疯抢</a>\
                        {{else}}\
                            <span data-code="{{modelid}}-{{content.pageBar.pageNumber}}_{{$index}}" track="'+pageData.pageName +':添加购物车" class="add-cart addTo-cart emcodeProp17" {{if $value.gomeCardType !=""}}isMCard="{{$value.gomeCardType}}"{{/if}}>加入购物车</span>\
                        {{/if}}-->\
                        <span data-code="{{modelid}}-{{content.pageBar.pageNumber}}_{{$value.prdIndex+1}}_3" track="'+pageData.pageName +':添加购物车" class="add-cart addTo-cart emcodeProp17" {{if $value.gomeCardType !=""}}isMCard="{{$value.gomeCardType}}"{{/if}}>加入购物车</span>\
                    {{else if $value.stock == 3 || $value.stock == 4}}\
                        <a href="'+productSite+'/{{$value.pId}}-{{$value.skuId}}.html" target="_blank" class="add-cart prev-buy emcodeItem" data-code="{{modelid}}-{{content.pageBar.pageNumber}}_{{$value.prdIndex+1}}_3" track="产品列表预约购买">预约购买</a>\
                    {{else}}\
                        <span class="add-cart addTo-cart emcodeProp17" data-code="{{modelid}}-{{content.pageBar.pageNumber}}_{{$value.prdIndex+1}}_3" track="'+pageData.pageName +':添加购物车">加入购物车</span>\
                    {{/if}}\
                {{/if}}\
                </p>\
                <p class="item-shop">\
                {{if $value.thirdProduct}}\
                    <a class="nname" data-code="{{modelid}}-{{content.pageBar.pageNumber}}_{{$value.prdIndex+1}}_4" target="_blank" href="{{$value.mUrl}}">{{$value.sName}}</a>{{if $value.shopId =="80009736" || $value.shopId =="80010355" || $value.shopId =="80010423"}}<span class="hyg-shopType">国美自营</span>{{/if}}\
                {{else}}\
                    <span class="nname">国美自营</span>\
                {{/if}}\
                </p>\
            </div>'
    },
    active_tpl:function() {
            return '\
            <li class="product-item product-ad">\
                <a class="item-link activeImg" data-code="{{modelid}}-{{content.pageBar.pageNumber}}_activities_{{i+1}}" href="{{active.url}}" title="{{active.pTxt}}" target="_blank" style="height:{{activeHeight}}px">\
                    <img src="//img.gomein.net.cn/images/grey.gif" gome-src="{{active.img}}" alt="{{active.pTxt}}">\
                </a>\
                <span class="product-ad-info">\
                    <em class="product-ad-name">{{active.title}}</em>\
                    <em class="product-ad-title">{{active.pTxt}}</em>\
                    <a class="product-ad-btn" data-code="{{modelid}}-{{content.pageBar.pageNumber}}_activities_{{i+1}}" href="{{active.url}}" target="_blank">{{active.btn}}</a>\
                </span>\
            </li>\
           ';
    },
    item_tpl:function(){
        return '\
        {{each content.prodInfo.products}}\
            {{if $index == 11 && content.activities && content.activities.length > 0}}\
                {{each content.activities as active i}}\
                    {{if i == 0}}'+ProductItemTpl.active_tpl()+'{{/if}}\
                {{/each}}\
            {{else if $index == 19 && content.activities && content.activities.length > 0}}\
                {{each content.activities as active i}}\
                    {{if i == 1}}'+ProductItemTpl.active_tpl()+'{{/if}}\
                {{/each}}\
            {{else if $index == 31 && content.activities && content.activities.length > 0}}\
                {{each content.activities as active i}}\
                    {{if i == 2}}'+ProductItemTpl.active_tpl()+'{{/if}}\
                {{/each}}\
            {{/if}}\
            <li class="product-item">\
                <input class="productInfo" type="hidden" gomeert="{{$value.isGomeart}}" marketTag="{{$value.marketTag}}" prd-index="{{$index}}" pId="{{$value.pId}}" sId="{{$value.skuId}}" skuNo="{{$value.skuNo}}" pName="{{$value.name}}" price="{{$value.price}}"  saleCount="{{$value.salesVolume}}" evaluateCount="{{$value.evaluateCount}}" firstCat="{{$value.firstCat}}" secondCat="{{$value.secondCat}}" cateId="{{$value.defCatId}}" brandIds="{{each $value.brandIds as value}}{{if $index==0}}{{value}}{{/if}}{{/each}}" thirdProduct="{{if $value.thirdProduct}}true{{else}}false{{/if}}" shopId="{{$value.shopId}}" sName="{{$value.sName}}" promoScore="{{$value.promoScore}}" score="{{$value.score}}" pStock="{{if $value.stock==1}}1{{else}}0{{/if}}" pWeight="{{if $value.promoStock==3 || $value.promoStock==4}}真划算{{/if}}" pageNumber="{{content.pageBar.pageNumber}}" taogou="0"/>\
                {{if $value.taoGou}}\
                <ul class="arbitrage clearfix bor-bott">\
                    <li class="arbitrage-num arbitrage-cur" gomeert="{{$value.isGomeart}}" prd-index="{{$index}}" pId="{{$value.pId}}" sId="{{$value.skuId}}" skuNo="{{$value.skuNo}}" pName="{{$value.name}}" price="{{$value.price}}"  saleCount="{{$value.salesVolume}}" evaluateCount="{{$value.evaluateCount}}" promoScore="{{$value.promoScore}}" score="{{$value.score}}" pStock="{{if $value.stock==1}}1{{else}}0{{/if}}" pWeight="{{if $value.promoStock==3 || $value.promoStock==4}}真划算{{/if}}" taogou="0">单件</li>\
                    {{each $value.taoGou}}\
                    {{if $index < 3}}\
                    <li class="arbitrage-num" gomeert="{{$value.isGomeart}}" prd-index="{{$index}}" pId="{{$value.pId}}" sId="{{$value.skuId}}" skuNo="{{$value.skuNo}}" pName="{{$value.name}}" price="{{$value.price}}"  saleCount="{{$value.salesVolume}}" evaluateCount="{{$value.evaluateCount}}" promoScore="{{$value.promoScore}}" score="{{$value.score}}" pStock="{{if $value.stock==1}}1{{else}}0{{/if}}" pWeight="{{if $value.promoStock==3 || $value.promoStock==4}}真划算{{/if}}" taogou="1">{{$value.num}}件套</li>\
                    {{/if}}\
                    {{/each}}\
                </ul>\
                {{else}}\
                <ul class="arbitrage clearfix"></ul>\
                {{/if}}\
                '+ProductItemTpl.baseTpl(false)+'\
                {{if $value.taoGou}}\
                {{each $value.taoGou}}\
                {{if $index < 3}}\
                '+ProductItemTpl.baseTpl(true)+'\
                {{/if}}\
                {{/each}}\
                {{/if}}\
            </li>\
        {{/each}}\
    '
    }
}
var ProductItem = {
    "state" : false,
    "currentPage":window.pageCurrentPage,
    "totalPage":window.pageTotalPage,
    "sort":window.pageSort,
    "anyAsk": false,//首页联营商品异步请求标记
    "pageAsk": false,//分页请求标记
    "searchReqData": -1,//初始请求或排序请求参数变量
    "firstAskString": '0',//首次底部联营请求商品id字符串，作为分页请求参数变量
    "anyAskUrl": window.pagePrdUrl,//异步请求url地址，每次请求后更新
    "getProductItem" : function(pageNumber){
        var _this = this;
        if(_this.state) return;
        var request_data = {
            //JsonpName: "callback_product",
            dataType:"json",
            Url:  _this.anyAskUrl,
            RequestData: {page: pageNumber,bws: window.bwsValue,type:"json"},
            BeforeSend: _this.willGetProductItem,
            Callback: _this.didGetProductItem,
            errorFn: _this.askError
            //Param:{},
            //dataType: 'jsonp'
        };
        searchBase.getAjax(request_data);
    },
    "willGetProductItem" : function(){
        ProductItem.state = true;
        $("#product-waiting").show();
    },
    "didGetProductItem" : function(){
        ProductItem.state = false;
        $("#product-waiting").hide();
        var modelId = $("#product-box").attr("modelid");
        //如果请求的数据中没有products或products长度为0时，不在继续执行
        var products = this.data.content.prodInfo.products;
        var activities = this.data.content.activities;
        if(!(products.length > 0)) {
            $("#product-box .product-item").show();
            return;
        }
        //异步请求商品url更新
        ProductItem.pagePrdUrl = this.data.header.url;
        //套购商品埋码处理index,保证套购商品中的每一个的index值一致；
        for(var k=0;k<products.length;k++) {
            if(products[k].taoGou){
                for(var l=0;l<products[k].taoGou.length;l++){
                    products[k].taoGou[l].prdIndex = k;
                }
            }
            products[k].prdIndex = k;
        }
        //商品活动位高度判断
        if(activities && activities.length > 0) {
            var prd = products[0];
            var activeHeight = 0;
            if(prd.isBigImg == true) {
                activeHeight = 455;
            }else if((this.data.content.prodInfo.clothes || this.data.content.prodInfo.merchandise) && prd.isBigImg == false) {
                activeHeight = 390;
            }else {
                activeHeight = 345;
            }
        }
        var _this_data = $.extend(this.data,{"modelid":modelId},{"activeHeight":activeHeight},{"noSkusStock":noSkusStock});

        var listTpl = templateSimple.compile(ProductItemTpl.item_tpl())(_this_data);
        //通过ProductItem.anyAsk属性值为true判断首页请求联营商品插入到$("#product-box")内时不删除原有商品
        if(window.prdBwSec){
            var pIdData = [];
            var showPrd = $("#product-box .product-item:hidden");
            //根据底部联营请求到的商品个数与底部隐藏的自营商品数差值数决定显示被隐藏的商品的个数
            for(var k=0;k<showPrd.length - products.length;k++) {
                showPrd.eq(k).show();
            }
            $("#product-box").append(listTpl);
            //如果首页请求了底部联营商品，则需要将请求到的商品pId组装成字符串数组
            for(var i=0;i<products.length;i++) {
                pIdData.push(products[i].pId)
            }
            window.bwsValue = pIdData.length > 0 ? "['"+pIdData.join("','")+"']":"0";
        }else{
            $("#product-box").empty().append(listTpl);
            ProductItem.setPageInfo(this.data.content.pageBar);
        }
        if(this.data.content.regionPromoInfo){
            $("#szSpread").remove();
            $(".product-right-box").prepend("<a id='szSpread' target='_blank' href='"+this.data.content.regionPromoInfo.promUrl+"'><img style='margin-bottom:10px;' src='"+this.data.content.regionPromoInfo.imgUrl+"'></a>")
        }else{
            $("#szSpread").remove();
        }
    },
    "askError" : function(){
        ProductItem.state = false;
        $("#product-waiting").hide();
        $("#product-box .product-item").show();
    },
    "setPageInfo":function(data){
        ProductItem.currentPage = data.pageNumber;
        ProductItem.totalPage = data.totalPage;

        $("#min-pager-number").text(ProductItem.currentPage+"/"+ProductItem.totalPage);
        $("#mp-prev").removeClass("mp-disable");
        $("#mp-next").removeClass("mp-disable");
        if(ProductItem.currentPage == ProductItem.totalPage){
            $("#mp-next").addClass("mp-disable");
        }
        if(ProductItem.currentPage == 1){
            $("#mp-prev").addClass("mp-disable");
        }

        ProductItem.setPagination();
        compare.addClass();
        compare.compareBoxInit();
        compare.toggle();
    },
    "setPagination":function(){
        if(ProductItem.totalPage > 1){
            $("#j-page").ucPager({
                pageClass: "",
                currentPage: parseInt(ProductItem.currentPage),
                totalPage: parseInt(ProductItem.totalPage),
                pageSize: 48,
                clickCallback: function(curPage) {
                    ProductItem.currentPage = curPage;
                    ProductItem.getProductItem(curPage);
                    var scrollHeight = $("#product-left").offset().top;
                    $(window).scrollTop(scrollHeight);
                }
            });
        }
    }
}
ProductItem.setPagination(); // 初始化底部分页插件
/*点击mini分页下一页*/
$("#mp-next").bind("click", function() {
    if (!$(this).hasClass("mp-disable") && !ProductItem.state) {
        window.prdBwSec = false;
        ProductItem.getProductItem(++ProductItem.currentPage);
    }
});

/*点击mini分页上一页*/
$("#mp-prev").bind("click", function() {
    if (!$(this).hasClass("mp-disable") && !ProductItem.state) {
        window.prdBwSec = false;
        ProductItem.getProductItem(--ProductItem.currentPage);
    }
});

/*绑定地区选择插件*/
$('#address').gCity({
    gc_ads: 'chtm',
    gc_evt: function() {
        $.cookie('atgregion', this.xid + "|" + this.chtm + "|" + this.cid + "|" + this.sid + "|" + this.zid, {
            expires: 30,
            path: '/',
            domain: searop_domian
        });
        pageData._bdarea_1 = this.sid;
        pageData._bdarea_2 = this.cid;

        if(this.xid.indexOf("840101")!=-1){
            noSkusStock=true
        }else{
            noSkusStock =false
        }
        if(asyncPrice){
            clearInterval(interVal)
            timerLazyload = setInterval(priceInterval,1000)
        }else{
            clearInterval(timerLazyload)
            interVal = setInterval(nomalInterval,1000);   
        }
        ProductItem.sort = "100";
        $("#filter-order-box li").eq(0).trigger('click');
    }
});

/*综合 销量 新品 评价 价格 排序事件绑定*/
$("#filter-order-box").delegate("li","click",function(event){
    var $this = $(this);
    var _prdUrl = $this.attr("prdUrl");
    if(ProductItem.sort == "21" && $this.attr("data-sort")== "21"){
        $this.addClass("price-up").removeClass("price-down").attr("data-sort","20")
    }
    if(ProductItem.sort == "20" && $this.attr("data-sort")== "20"){
        $this.addClass("price-down").removeClass("price-up").attr("data-sort","21")
        _prdUrl = $this.attr("prdUrl-2");
    }
    if(ProductItem.sort != $this.attr("data-sort")){
        window.prdBwSec = false;
        ProductItem.sort = $this.attr("data-sort");
        $this.addClass('cur').siblings().removeClass('cur');
        if(ProductItem.sort == "20"){$this.removeClass("price-up").addClass('price-down')}
        if(ProductItem.sort == "21"){$this.removeClass("price-down").addClass('price-up')}
        if(window.location.href.indexOf("brand") != -1) return;
        window.bwsValue = "0";
        ProductItem.anyAskUrl = _prdUrl;
        ProductItem.getProductItem(1);
    }
})
/*根据后台字段判断，直接模板上加控制a标签，不需要阻止*/
//$("#filter-order-box").delegate("a","click",function(event){
//    event.preventDefault()
//})

/*配送 库存 促销 真划算 海外购 等商品筛选事件绑定 模板改为a标签*/
/*$("#instock,#deliv,#market,#discountTuan,#discountQiang,#discountPromo").bind("click",function() {
    window.location.href = $(this).attr("url");
})*/

/*价格区间筛选事件绑定*/
$(".priceRange-input input").bind({
    "keydown": function() {
        searchBase.replacePrice($(this), $(this).val());
    },
    "keyup": function() {
        searchBase.replacePrice($(this), $(this).val());
    },
    "focus": function() {
        $(".filter-priceRange-box").addClass("filter-priceRange-click")
    },
    "blur": function() {
        if ($(this).val() == "") {
            $(this).val("¥")
        }
    }
})
$(".filter-priceRange-box").mouseleave(function() {
    $(this).removeClass("filter-priceRange-click")
})
//价格清空按钮
$("#fc-btn-cancel").bind("click", function() {
    $(".priceRange-input input").val("¥")
})
//价格确定按钮
$("#fc-btn-ok").bind("click", function(e) {
    e.preventDefault();
    var priceRange = "";
    var hashUrl = "";
    var price1 = $("#fc-lowPrice").val();
    var price2 = $("#fc-highPrice").val();
    if(price2 == "¥" && price1 == "¥"){
        return false;
    }else if(price1 == "¥"){
        priceRange="0x"+price2;
    }else if(price2 == "¥"){
        priceRange=price1+"x*";
    }else{
        priceRange = Math.min(price1, price2) + "x" + Math.max(price1, price2)
    }
    
    if (isSearch) {
        hashUrl = window.location.search;
        if (hashUrl.indexOf("priceTag") != -1) {
            hashUrl = hashUrl.replace(/\d{1,}[x](\d|\*){1,}/g, priceRange)
        } else {
            hashUrl += "&price=" + priceRange + "&priceTag=1";
        }
    } else {
        if (pageData.isCondition) {
            pageData.hashData[6] = priceRange;
            pageData.hashData[7] = 1;
            for (var i = 0, j = pageData.hashData.length; i < j; i++) {
                hashUrl += "-" + pageData.hashData[i];
            }
            hashUrl = hashUrl.substring(1);
        } else {
            hashUrl = pageData.hashData[0].split(".")[0] + "-00-0-48-1-0-" + priceRange + "-1-1-0-0-0-0-0-0-0-0-0.html"
        }  
    }
    window.location.href = hashUrl;
})

/*筛选特殊活动商品*/
if (pageData.specialScreening_flag) {
    $("#specialScreening").addClass("checke");
} else {
    $("#specialScreening").removeClass("checke");
}
$("#specialScreening").bind("click",function(){
    if($(this).hasClass("checke")){
        window.location.href = pageData.specialScreening_normal;
    }else{
        window.location.href = pageData.specialScreening_specical;
    }

})
/*在结果中搜索*/
$(".filter-resultSearch-input").bind({
    "keyup": function(event) {
        if (event.which == 13) {
            $(".filter-resultSearch-btn").click()
        } else {
            searchBase.replaceNormal($(this), $(this).val());
        }
    },
    "focus": function() {
        if ($(this).val() == "在结果中搜索") {
            $(this).val("")
        }
    },
    "blur": function() {
        if ($(this).val() == "") {
            $(this).val("在结果中搜索")
        }
    }
})
$(".filter-resultSearch-btn").bind("click", function(e) {
    e.preventDefault();
    var _words = $(".filter-resultSearch-input").val()
    if (_words == "" || _words == "在结果中搜索") return false;
    if (isSearch){
        var _reg=/(&et=[^&]*)/g;  
        var _url = window.location.search;
        _url = _url.match(_reg)?_url.replace(_reg,"&et="+_words):_url+"&et="+_words
        window.location.href = _url
    } else {
        var _url = window.location.pathname;
        var arrUrl = _url.split("?question=");
        window.location.href = arrUrl[0] + "?question=" + _words;
    } 
});
/*页面加载完毕时，首页联营商品异步请求*/

$(function() {
    if(window.prdBwSec){
        
        var zyPrd = $(".zyMark").parents(".product-item");
        zyPrd.each(function(index,elem) {
            if(index < window.prdBwSize){
                $(elem).hide();
            }
        });
        ProductItem.getProductItem(1);
    }
});