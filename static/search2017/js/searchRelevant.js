/**
 * 页面相关操作
 */

if($.browser.msie){
    $("input").click(function(){
        this.blur();
        this.focus();
    });
}           
/*首屏不触发大数据异步请求，除facets极端少情况*/
if($('#product-left').offset().top < windowHeight+50){
    DSP.getTuiGuang();
    DSP.getAD();
    BigD.quessLike()
    DSP.getBottomAD()
    if(isSearch){
        BigD.getReXiao();
        BigD.getBrowseBuy();
        if(!isHyg){getReleQuery();}//
    }else{
        //BigD.getHotTuiJian();
        BigD.getAlsoBuy();
        BigD.getFinalBuy();
        BigD.weekTop();
        getHotCuxiaoList();
    }
}else{
    setTimeout(function(){
        DSP.getTuiGuang();
        DSP.getAD();
        BigD.quessLike()
        DSP.getBottomAD()
        if(isSearch){
            BigD.getReXiao();
            BigD.getBrowseBuy();
            if(!isHyg){getReleQuery();}//
        }else{
            //BigD.getHotTuiJian();
            BigD.getAlsoBuy();
            BigD.getFinalBuy();
            BigD.weekTop();
            getHotCuxiaoList();
        }
    },2000)
}
/*bigd 推荐商品埋码*/
$(".bigD_item").live("click",function(){
    var param = $(this).attr("track");
    recTrack(param)
})
/*页面功能性按钮事件埋码*/
$(".emcodeProp17").live("click", function(){
    var tracks = $(this).attr("track");
    var lName = this.localName;
    if(tracks.indexOf("购物车") == -1){
        trackEvent(tracks, lName, "search")
    }  
});
/*获取前置商品信息*/
function getPrevItemInfo(index){
    var prevItemInfo = []
    $("#product-box").find(".product-item").each(function(){
        var $this = $(this),
            infoTag = $this.find(".productInfo")
        if($this.index() < index){
            prevItemInfo.push(infoTag.attr("pid")+"-"+infoTag.attr("sid"))
        }
    })
    return JSON.stringify(prevItemInfo)
}
/*页面主商品点击时间埋码*/
$(".emcodeItem").live("click",function(){
    var element_info = $(this).parents(".product-item").find(".productInfo");
    var tracks = $(this).attr("track");
    var sid = element_info.attr("sid");
    var pId = element_info.attr("pid");
    var prdIndex = element_info.attr("prd-index");
    var salesVolume = element_info.attr("saleCount");
    var skuName = element_info.attr("pname").replace("<label style=\'color:red;\'>", "").replace("</label>", "");
    var catName = dsp_gome_c1name + ":" + dsp_gome_c2name + ":" + dsp_gome_c3name;
    var evaluateCount = element_info.attr("evaluateCount");
    var promoScore = element_info.attr("promoScore");
    var pStock = element_info.attr("pStock");
    var pWeight = element_info.attr("pWeight");
    var price = element_info.attr("price");
    var promoStock = element_info.attr("promoStock");
    var score = element_info.attr("score");
    var thirdCat = element_info.attr("cateId");
    var from="category";
    if(isSearch)from="search";
    var request_data = {
        JsonpName: "callback_logger",
        Url: cloudSite + "/cloud/log",
        RequestData: {
            module: "logger",
            ts: new Date().getTime(),
            t1:pId,
            t2:skuName,
            t3:salesVolume,
            t4:thirdCat,
            t5:loggerData.t5,
            t6:ProductItem.sort,//params.sorts,
            t7:loggerData.t7,
            t8:loggerData.t8,
            t9:ProductItem.currentPage,
            t10:prdIndex,
            t11:getPrevItemInfo(prdIndex),//pid-skuid,pid-skuid,pid-skuid
            //t12:客户端ip,
            //t13:params.regionId,
            //t14:用户cookieid,
            t15:"",
            //t16:服务ip,
            //t17:userId,
            t18:sid,
            t19:loggerData.t19,
            t20:loggerData.t20,
            t21:loggerData.t21,//?
            t22:loggerData.t22_s || loggerData.t22_r,
            t23:loggerData.t23,
            t24:evaluateCount,
            t25:promoScore,
            t26:pStock,
            t27:pWeight,
            t28:price,
            t29:promoStock,
            t30:score,
            t31:loggerData.t31,
            t32:loggerData.t32, 
            //page: ProductItem.currentPage,
            //sId: sid,
            //id: pId,
            //name: skuName,
            //salesVolume: salesVolume,
            //position: element_info.attr("prd-index"),
            //totalCount: ProductItem.totalPage,
            from:from
        },
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data); //搜索组商品点击统计

    trackProdClk(tracks, pId, catName, dsp_gome_c3id, isSearch);
})
/*搜索组 底部相关搜索词推荐*/
function getReleQuery(){
    var _this = this;
    var request_data = {
        JsonpName: "callback_releQuery",
        Url: cloudSite + "/cloud/releQuery",
        RequestData: {
            question: searchkey
        },
        Callback: renderReleQuery,
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data);
}
function renderReleQuery(){
    var headKeyword = "";
    var html = '<li class="related-title">您是不是要找：</li>';
    if (this.data.releData) {
        var _data = this.data.releData.rList;
        for (var i = 0, j = _data.length; i < j; i++) {
            html += '<li class="related-key"><a track="搜索结果页:相关搜索" class="emcodeProp17" href="/search?question=' + _data[i].key + '&from=releQuery" target="_blank">' + _data[i].key + '</a></li>';
            headKeyword += '<a track="搜索结果页:相关搜索" href="/search?question=' + _data[i].key + '&from=releQuery" target="_blank">'+ _data[i].key +'</a>';
        }
        $("#topSearch .hotkeyword").empty().append(headKeyword);
        $("#related-list").append(html);
        searchBase.asyncMaima($("#related-list"),true);
    } else {
        $("#related-list").hide();
    }
    $("#topSearch .hotkeyword").css('visibility','visible');
}
/*搜索组 列表页顶部右侧 热卖推荐活动*/
function getHotCuxiaoList(){
    var _this = this;
    var request_data = {
        JsonpName: "callback_hotCuxiaoList",
        Url: cloudSite+"/cloud/hotRecommend",
        RequestData: {
            module:"recommendActivity",
            from:"recommend",
            catId:dsp_gome_c3id
        },
        Callback: renderHotCuxiaoList,
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data);
}
function renderHotCuxiaoList(){
    var html_r = [];
    var html_l = [];
    if (this.data.activity.length>4) {
        var _data = this.data.activity;
        var modelId =$("#hot-cuxiao-list").attr("modelid");
        for (var i = 0, j = _data.length; i < j &&i<5; i++) {
            html_r.push('<li><i></i><a href="'+_data[i].url+'" target="_blank">'+_data[i].title+'</a></li>')
        }
        $("#hot-cuxiao-list").empty().append(html_r.join("")).parents(".hot-cuxiao-list-box").show();
        searchBase.asyncMaima($("#hot-cuxiao-list"),true);
    }

    if (this.data.products.length>3) {
        var _data = this.data.products;
        var modelId =$("#hot-list").attr("modelid");
        for (var i = 0, j = _data.length; i < j &&i<4; i++) {
            html_l.push('<li class="item" from="云眼">'
                +'<input class="productInfo" pId="'+_data[i].id+'" sId="'+_data[i].skuId +'" type="hidden"/>'
                +'<p class="pic"><a target="_blank" class="" href="'+_data[i].sUrl+'" title="'+_data[i].alt+'"><img src="'+_data[i].sImg+'_130.jpg" alt="'+_data[i].alt+'"></a></p>'
                +'<p class="name"><a target="_blank" class="" href="'+_data[i].sUrl+'" target="_blank" title="'+_data[i].alt+'">'+_data[i].name+'</a></p>'
                +'<p class="price ancyPrice"><span></span></p>'
                +'<p class="btn"><a target="_blank" class=" buy" href="'+_data[i].sUrl+'">立即抢购</a></p>'
            +'</li>')
        }
        $("#hot-list").empty().append(html_l.join(""));
        searchBase.asyncMaima($("#hot-list"),true);
    }else{
        BigD.getHotTuiJian()
    }
}
/*搜索组页面监控*/
setTimeout(function(){
    if(isSearch){
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','z_ga');
        z_ga('create', 'UA-44955382-1', 'gome.com.cn');
        z_ga('send', 'pageview');
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : '//www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-44955382-1']);
        _gaq.push(['_trackPageview',window.location.href]);
       _gaq.push(['_trackEvent', 'question', 'load', 'searchPage'])
        z_ga('ec:addPromo', {
          'id': 'gomeSearch',
          'name': 'gome 11.11'
        });
    }else{
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','z_ga');
        z_ga('create', 'UA-44955382-1', 'gome.com.cn');
        z_ga('send', 'pageview');
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : '//www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-44955382-1']);
        _gaq.push(['_trackPageview',window.location.href]);
        var p_categoryId = dsp_gome_c3id;
        _gaq.push(['_trackEvent', p_categoryId, 'load', 'catPage'])
        z_ga('ec:addPromo', {
        'id': 'gomeCat',
        'name': 'gome 11.11'
        });
    }
},3000)
//重置顶部搜索大数据埋码
function btnCode (){
    var s=s_gi(s_account);
    s.linkTrackVars="prop17";
    s.prop17="搜索结果页:顶部搜索栏按钮";
    s.tl(this,'o','公共头部');
}
function txtCode (){
    var s=s_gi(s_account);
    s.linkTrackVars="prop17";
    s.prop17="搜索结果页:搜索栏对话框";
    s.tl(this,'o','search');
}

//海外购商品滑动
if(!$("body").hasClass("hwg")){
    var catetime;
    function cateleave (){
        $("#o-menubox").hide();
    };
    function timerun(){
        catetime=setTimeout(cateleave,100);
    };
    $(".sidecategory").hover(function(){
        clearTimeout(catetime);
        $("#o-menubox").show();
    },function(){
        timerun();
    });
}else{
    $("#o-menubox").show();
};
$("#o-menubox li").each(function() {
    $(this).hover(function() {
        $(this).addClass('cur');
    }, function() {
        $(this).removeClass('cur');
    });
});
/**
 *
 *搜索组 3s请求个性推荐商品 
 *设置搜素结果 个性化推荐位置高度 如果浏览器窗口高度大于680 展示3个商品 否则2个
 * 0.5s请求在线客服
 */

var timer = null;
var timerOnline = null;
$(".product-item").live("mouseenter mouseleave", function(e) {
    if($(this).hasClass("product-ad"))return;//如果该商品为活动位广告不请求个性推荐商品及在线客服
    if (e.type == "mouseenter") {
        var _that = $(this);
        var element_info = _that.find(".productInfo");
        var firstCat= element_info.attr("firstCat");
        var secondCat= element_info.attr("secondCat");
        var thirdCat = element_info.attr("cateId");
        var brandId = element_info.attr("brandIds");
        var thirdProduct = element_info.attr("thirdProduct");
        var shopId = element_info.attr("shopId");
        var sName = element_info.attr("sName");
        clearTimeout(timer);
        timer = setTimeout(function () {
            var sid = element_info.attr("sid");
            var pId = element_info.attr("pid");
            var prdIndex = element_info.attr("prd-index");
            var salesVolume = element_info.attr("saleCount");
            var skuName = element_info.attr("pname").replace("<label style=\'color:red;\'>", "").replace("</label>", "");
            var evaluateCount = element_info.attr("evaluateCount");
            var promoScore = element_info.attr("promoScore");
            var pStock = element_info.attr("pStock");
            var pWeight = element_info.attr("pWeight");
            var price = element_info.attr("price");
            var promoStock = element_info.attr("promoStock");
            var score = element_info.attr("score");
            var from = "category";
            if (isSearch)from = "search";
            var request_data = {
                JsonpName: "callback_logger",
                Url: cloudSite + "/cloud/log",
                RequestData: {
                    module: "logger",
                    ts: new Date().getTime(),
                    t1: "1-" + pId,
                    t2: skuName,
                    t3: salesVolume,
                    t4: thirdCat,
                    t5: loggerData.t5,
                    t6: ProductItem.sort,//params.sorts,
                    t7: loggerData.t7,
                    t8: loggerData.t8,
                    t9: ProductItem.currentPage,
                    t10: prdIndex,
                    t11: getPrevItemInfo(prdIndex),//pid-skuid,pid-skuid,pid-skuid
                    //t12:客户端ip,
                    //t13:params.regionId,
                    //t14:用户cookieid,
                    t15: "",
                    //t16:服务ip,
                    //t17:userId,
                    t18: sid,
                    t19: loggerData.t19,
                    t20: loggerData.t20,
                    t21: loggerData.t21,//?
                    t22: loggerData.t22_s || loggerData.t22_r,
                    t23: loggerData.t23,
                    t24: evaluateCount,
                    t25: promoScore,
                    t26: pStock,
                    t27: pWeight,
                    t28: price,
                    t29: promoStock,
                    t30: score,
                    t31: loggerData.t31,
                    t32:loggerData.t32,
                    //page: ProductItem.currentPage,
                    //sId: sid,
                    //id: pId,
                    //name: skuName,
                    //salesVolume: salesVolume,
                    //position: element_info.attr("prd-index"),
                    //totalCount: ProductItem.totalPage,
                    from: from
                },
                dataType: 'jsonp'
            };

            var recommondData = {
                JsonpName: "recommend",
                Url: cloudSite + "/cloud/recomend",
                dataType: 'jsonp',
                RequestData: {recoPosition: "1", recoProductId: pId + '-' + sid},
                Callback: renderRecommondProduct,
                from: 'recommend'
            }
            //if (isSearch) {
            //    //根据划过商品个性推荐
            //    searchBase.getAjax(recommondData); //搜索组3s商品点击统计
            //}
            searchBase.getAjax(request_data); //搜索组商品3悬停统计
        }, 3000);

        //在线客服功能
        if(!$(this).prop("hasOnline")) {
            clearTimeout(timerOnline);
            timerOnline = setTimeout(function(){
            //如果是国美自营请求自营接口，如果是联营请求联营接口；
            var onlineData = {};
            if (thirdProduct == "false") {
                onlineData = {
                    Url: "//ss" + cookieDomain + "/item/v1/online/" + firstCat + "_" + secondCat + "_" + thirdCat + "/" + brandId + "/" + pageData._bdarea_1 + "/Y/" + loginData.loginId + "/flag/public/live800",
                    dataType: 'jsonp',
                    JsonpName: 'live800',
                    Callback: onlineResponseStatus,
                    Param: {
                        _this: _that,
                        _sName: sName
                    }
                };
            } else {
                onlineData = {
                    Url: "//ss" + cookieDomain + "/item/v1/online/" + shopId + "/" + loginData.loginId + "/flag/public/live800",
                    dataType: 'jsonp',
                    JsonpName: 'live800',
                    Callback: onlineResponseStatus,
                    Param: {
                        _this: _that,
                        _sName: sName
                    }
                };
            }
            searchBase.getAjax(onlineData);
            },500);
        }
    } else if (e.type == "mouseleave") {
        clearTimeout(timer);
        clearTimeout(timerOnline);
    } else {}
});
function renderRecommondProduct(){
    if (this.data) {
        var _data = $.extend(this.data);
        var purchase_box = $("#personrecommend").show();
        var listTpl = template.compile(tpl_recommondProduct());
        purchase_box.empty().append(listTpl(_data));
    }
}
function onlineResponseStatus() {
    if(this.data) {
        var _data = this.data;
        var pageNumber = this.Param._this.find(".productInfo").attr("pageNumber");
        var prdIndex = parseInt(this.Param._this.find(".productInfo").attr("prd-index")) + 1;
        var onlineIcon = $('<a href="javascript:;" class="online-server" data-code='+"9000000700-"+pageNumber+"_"+prdIndex+"_5"+' ></a>');
        if(_data.success == true) {
            this.Param._this.prop("hasOnline",true);
            if(_data.result[0].status == -1) {
                return ;
            }else {
                var host = _data.result[0].host;
                var customerID = _data.result[0].customerID;
                var customerInfo = _data.result[0].customerInfo;
                var shopName = this.Param._sName;
                this.Param._this.find(".item-shop").append(onlineIcon);
                //在线客服点击事件
                this.Param._this.delegate(".online-server", "click", function() {
                    g.login(function(){
                        window.open(
                            host+'/chatClient/chatbox.jsp?'+'companyID='+customerID+'&customerID='+customerID+
                            '&info='+customerInfo+'&page=0'+'&enterurl='+location.href+
                            '&areaCode='+encodeURI(encodeURI($.cookie("atgregion")))+'&shopname='+ encodeURI(shopName),
                            'customerService' + customerID,
                            'toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=1120,height=700'
                        );
                    });
                });
            }
        }
    }
};
function tpl_recommondProduct(){
    return '\
    <%if(product && product.length>0){%>\
        <h3 class="hd">个性推荐</h3>\
        <ul class="bd">\
        <% for(var i=0;i<product.length && i<3;i++){%>\
            <li class="buy-items">\
            <div class="pic"><a track="" target="_blank" href="'+productSite+'/<%=product[i].id%>.html?intcmp=search-tuijian-0<%=i+1%>"><img src="<%=product[i].image %>_130.jpg" alt="<%=product[i].name%>"></a></div>\
            <div class="price">¥<span><%=product[i].price%></span></div>\
            <div class="name"><a href="'+productSite+'/<%=product[i].id%>.html?intcmp-search-tuijian-0<%=i+1%>" target="_blank" title="<%=product[i].name%>"><%=product[i].name%></a></div>\
            </li>\
        <%}%>\
        </ul>\
    <%}%>\
    '
}
/*底部搜索按钮*/
$("#search-box-input").bind({
    "keyup": function(event) {
        if (event.which == 13) {
            $("#search-box-btn").click()
        } else {
            searchBase.replaceNormal($(this), $(this).val());
        }
    },
    "blur": function() {
        if ($(this).val() == "") {
            $(this).val($(this).attr("defaultVal"))
        }
    }
})
$("#search-box-btn").bind("click",function(){
    var dataPage = $("body").attr("data-page");
    var modelId = $(this).attr("data-code");
    window.location.href = searchSite +"/search?intcmp="+dataPage+"-"+modelId+"&question="+ $("#search-box-input").val();
})
//当滚动到工具栏的时候 工具栏跟随滚动
if(document.documentElement.clientHeight>=680){
    $("#personrecommend").css("max-height","676px")
}else{
    $("#personrecommend").css("max-height","462px")
}
if(pageData.isIE6 || $(".product-item").length <= 28){$("#personrecommend").height(0)}
var windowHeight = $(window).height();

var productFinalPos = $("#product-box").offset()!=null?($("#product-box").height() + $("#product-box").offset().top):0;
var recommondProductWillPosisition = 0;

$(window).bind("scroll",function(){
    var scrollheigth = $(document).scrollTop()+windowHeight;
    var recommondProductOffsetTop = $("#personrecommend-warp").offset().top;
    var productLeftOffsetTop = $("#product-left").offset()!=null?$("#product-left").offset().top:0;
    if($(document).scrollTop() >= productLeftOffsetTop){  
        if(!pageData.isIE6){
            $("#filter-box").addClass("onfixed");
        } 
    }else{    
        if(!pageData.isIE6){
            $("#filter-box").removeClass("onfixed");
        }
    }
    var _addPos = $(document).scrollTop() + $("#personrecommend").height();
    if( _addPos<= productFinalPos){
        recommondProductWillPosisition = 0
    }else{
        recommondProductWillPosisition = productFinalPos -_addPos
    }
    /*个性推荐随屏滚动*/
    if($(document).scrollTop() >= recommondProductOffsetTop){
        $("#personrecommend").addClass("onfixed").css("top",recommondProductWillPosisition);
    }else{    
        $("#personrecommend").removeClass("onfixed");
    }

})
/*列表页面包屑划过展示请求相关方法*/
var listCrumb = {
    second_op: false, //二级分类是否已请求
    third_op: false, //三级分类是否已请求
    init: function() {
        var _this = this;
        //二级分类划过请求其他二级分类信息和当前二级下的三级分类
        // $("#category-second").bind({
        //     "mouseover": function() {
        //         if (!_this.second_op) {
        //             _this.second_op = true;
        //             _this.catgoryChildSecond_req();
        //         };
        //         $(this).addClass("categoryHover");
        //     },
        //     "mouseleave": function() {
        //         $(this).removeClass("categoryHover")
        //     }
        // })
        $("#category-third").bind({
            "mouseover": function() {
                /*
                 三级分类由异步请求修改为同步数据渲染，改段代码需要被注释20160918
                 */
                //if (!_this.third_op) {
                //    _this.third_op = true;
                //    _this.catgoryChildThird_req($(this).attr("catgoryId"), false);
                //}
                $(this).addClass("categoryHover");
            },
            "mouseleave": function() {
                $(this).removeClass("categoryHover");
            }
        })
        if(isHyg){
            $("#category-third").unbind()
        }
    },
    catgoryChildSecond_req: function() {
        var _this = this;
        var request_data = {
            JsonpName: "callback_catalog",
            Url: cloudSite + "/cloud/category",
            //{module:'catalog',parentId:parentIdMesg,cateId:cateIdMesg,brother:1}
            RequestData: {
                module: "catalog",
                parentId: $("#category-first").attr("catgoryId"),
                cateId: $("#category-second").attr("catgoryId"),
                brother: 1,
                from:'cate'
            },
            //BeforeSend:_this.before_request_item,
            Callback: _this.catgoryChildSecond_render,
            //Param:{},
            dataType: 'jsonp'
        };
        searchBase.getAjax(request_data);
    },
    catgoryChildThird_req: function(catgoryId, op) {
        var _this = this;
        var request_data = {
            JsonpName: "callback_catalogChild",
            Url: cloudSite + "/cloud/category",
            //{module:'catalog',parentId:parentIdMesg,cateId:cateIdMesg,brother:1}
            RequestData: {
                module: "catalog",
                cateId: catgoryId,
                brother: 0,
                from:'cate'
            },
            //BeforeSend:_this.before_request_item,
            Callback: _this.catgoryChildThird_render,
            Param: {
                "op": op
            },
            dataType: 'jsonp'
        };
        searchBase.getAjax(request_data);
    },
    catgoryChild_Tpl: function() { //二级三级小分类模板 op= true为二级分类 false为三级分类
        if (isSecond) {
            return '\
                <%var catgoryChild = response.pageJson.content.catObj.brothers%>\
                <%for(var i = 0;i<catgoryChild.length;i++){%>\
                    <a <%if(i==0){%>class="ckis"<%}% href="'+searchSite +'/<%=catgoryChild[i].catId%>.html"><%=catgoryChild[i].catName%></a>\
                <%}%>\
            '
        } else {
            return '\
                <%var catgoryChild = response.pageJson.content.catObj.children%>\
                <%for(var i = 0;i<catgoryChild.length;i++){%>\
                <a href="'+searchSite +'/<%=catgoryChild[i].catId%>.html"><%=catgoryChild[i].catName%></a>\
                <%}%>\
            '
        }
    },
    catgoryChildSecond_render: function() { //二级三级小分类模板 op= true为二级分类 false为三级分类
        var listTpl = template.compile(listCrumb.catgoryChild_Tpl());
        $("#category-box-second").empty().append(listTpl(this.data));
        searchBase.asyncMaima($("#category-box-second"),false);
    },
    catgoryChildThird_render: function() { //二级三级小分类模板 op= true为二级分类 false为三级分类
        var listTpl = template.compile(listCrumb.catgoryChild_Tpl(false));
        $("#category-box-third").append(listTpl(this.data));
        searchBase.asyncMaima($("#category-box-third"),false);
    }
    //id="category-second"
}
listCrumb.init();