/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//引入facet相关模块
	__webpack_require__(1);
	//引入toolbar相关模块
	__webpack_require__(3);
	//引入页面事件的模块-价格获取，懒加载图片
	__webpack_require__(6);
	//引入页面事件的模块-商品事件
	__webpack_require__(8);

	if(pageData.isBW){
	 pageData.dataBW = __webpack_require__(12).getShopGoods(pageData.ajaxURL,1,pageData.valueBW);
	 }
	setTimeout(function(){
	    __webpack_require__(4).getGoods();
	},0);

	if(window.isResult){
	    __webpack_require__(13);//右侧店铺精选和底部的推广商品
	    __webpack_require__(15).getData("#prdRight-2");//右侧热销推荐
	    __webpack_require__(17).getData("#prdRight-3");//右侧浏览了还购买商品
	}else{
	    __webpack_require__(18).getData("#prdBottom-1");//无结果情况底部热销推荐
	}

	document.getElementById("lazyajaxloadarea").onmouseenter = function (event) {
	    __webpack_require__(19).getData("#prdBottom-2");//猜你喜欢
	    __webpack_require__(20).getData("list","#prdBottom-recent");//最近浏览
	    this.remove()
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require,exports,module){
	    /**
	     * 【一】给每一个facet盒子（.facets-category）,添加一个存放已选facet参数的属性
	     * 【二】初始化设置，包括热门分类，一般分类的更多按钮是否显示
	     **/
	    $('.facets-category').data('selectFacet','');
	    $(".facets-category-common").each(function(){
	        var _facetHeight = $(this).find(".category-normal ul").height();
	        if( _facetHeight > 35){
	            $(this).find(".fc-option-more").css("visibility","visible");
	        }else{
	            $(this).find(".fc-option-more").remove();
	        }
	    });
	    /**
	     * 初始化已选分类
	     * 【一】滑动控制
	     * 【二】全部清空按钮操作
	     **/
	    var moveSt = (function(){
	        var space = 0;
	        var _li = $(".nSearch-crumb-facetsCurrent").find("li");

	        if(isSearch){
	            space = $("#nSearch-crumb-searchNum").width() + $("#nSearch-crumb-keyWord").width() +65;
	        }else{
	            space = $("#category-first").width() + $("#category-second").width() + $("#category-third").width() +90;
	        }
	        space =  $(".nSearch-crumb").width()-space;
	        /*初始化已选facets样式*/
	        if(_li.length>0){
	            var _width = 0;
	            $(".nSearch-crumb-facetsCurrent").addClass("haschecked");
	            for(var i =0,j=_li.length;i<j;i++){
	                _width+=_li.eq(i).width()+39;
	            }
	            if(_li.length >= 2) {
	                $("#clearallfacts").show();
	                space = space - 110;
	            }
	            $(".nSearch-crumb-facetsCurrent").width(_width);
	            $("#nSearch-crumb-facetsCurrent-warp").width(space);

	            if(_width > space){
	                $(".facetsCurrent-next").show();
	            }
	            return space - _width
	        }
	        return 0;
	    })();
	    $(".facetsCurrent-next").bind("click",function(){
	        $(".nSearch-crumb-facetsCurrent").animate({"left":moveSt+"px"},300,function(){
	            $(".facetsCurrent-prev").show();
	            $(".facetsCurrent-next").hide();
	        });
	    });
	    $(".facetsCurrent-prev").bind("click",function(){
	        $(".nSearch-crumb-facetsCurrent").animate({"left":0},100,function(){
	            $(".facetsCurrent-next").show();
	            $(".facetsCurrent-prev").hide();
	        });
	    });
	    /**
	     * 方法
	     * 重置当前已处于多选状态的facet,
	    **/
	    function clearMultiSelectStatus(){
	        $('.multiSelectStatus').find('.fc-btn-cancel').trigger('click');
	    };
	    /**
	     *  按钮点击事件
	     * 【一】【多选】按钮，设置当前facet是否为可多选状态
	     * 【二】【取消】按钮 对当前分类下的所有已选中的facet触发一次点击事件
	     * 【三】【确定】按钮，调用已封装处理参数的方法，跳转页面，具体参数存放在父级facets-category的data('selectFacet')，此参数由该该facet下的具体筛选项设置
	     * 【四】【更多】按钮，展示隐藏的facet
	     * 【五】【具体筛选项】，根据父级facets-category是否为多选状态（isMultiSelect）。
	     *        true：阻止默认href跳转，设置父级facets-category的值，data('selectFacet')
	    **/
	    $('#module-facet .fc-option-multiple').bind('click',function(){
	        clearMultiSelectStatus();
	        $(this).parents('.facets-category').data('isMultiSelect',true).addClass('multiSelectStatus');
	    });
	    $('#module-facet .fc-btn-cancel').bind('click',function(){
	        var _parent = $(this).parents('.facets-category');
	        _parent.find('.facet').filter(function(){return $(this).data('isSelect')}).trigger('click');
	        _parent.find('.fc-option-more').data("isOpen",true).trigger('click');
	        _parent.data('isMultiSelect',false).removeClass('multiSelectStatus');
	    });
	    $('#module-facet .fc-btn-ok').bind('click',function(){
	        var valueString = $(this).parents('.facets-category').data('selectFacet')
	        if(valueString){
	            __webpack_require__(2).dofacet('facets',valueString);
	        }
	    });
	    $('#module-facet .fc-option-more').data('isOpen',false).bind('click',function (event) {
	        if(!$(this).data("isOpen")){
	            $(this).data("isOpen",true).html('<i></i>收起').parents('.facets-category').addClass('moreStatus');
	        }else{
	            $(this).data("isOpen",false).html('<i></i>展开').parents('.facets-category').removeClass('moreStatus');
	        }
	    });
	    $('#module-facet .facet').bind('click',function(event){
	        var _this = $(this),
	            _parent = _this.parents('.facets-category'),
	            facet_checked = _parent.data('selectFacet');
	        if(_parent.data('isMultiSelect')){
	            event.preventDefault();
	            if(_this.data('isSelect')){
	                _this.removeClass('chk');
	                _this.data('isSelect',false);
	                facet_checked = facet_checked.replace(_this.attr('facetsid'),'');
	            }else{
	                _this.addClass('chk');
	                _this.data('isSelect',true);
	                facet_checked += _this.attr('facetsid');
	            }
	            _parent.data('selectFacet',facet_checked);

	        }
	    });
	    /**
	     *  品牌facet相关事件va
	     * 【一】【已选中品牌facet】点击事件
	     * 【二】按字母筛选品牌划过效果
	     * 【三】【更多】按钮追加事件，收起时重置隐藏的品牌隐藏
	     * 【四】筛选项追加新的点击事件到队列，由于绑定两次事件，所以此处isSelect 值应该为取反操作
	    **/
	    $('#category-brand-hasCheck').delegate('li','click',function(){
	        $('#brandID'+$(this).data('facetId')).trigger('click');
	    });
	    $('.category-brand-f-letter').find('li').bind({
	        'mouseenter':function () {
	            var _this = $(this);
	            if(!_this.hasClass('all')){
	                _this.addClass('cur').siblings("li").removeClass('cur');
	                _this.parents('.fc-content').find('.c-brand').addClass('brand-op').filter(function () {
	                    return $(this).attr('brand-value') == _this.attr('brand-key')
	                }).removeClass('brand-op');
	            }else{
	                _this.addClass('cur').siblings('li').removeClass('cur');
	                _this.parents('.fc-content').find('.brand-op').removeClass('brand-op')
	            }
	        }
	    });
	    $("#facets-category-brand .fc-option-more").bind("click", function () {
	        $(this).parents('#facets-category-brand').find('.category-brand-f-letter .all').trigger("mouseenter")
	    });
	    $('#facets-category-brand .facet').bind('click',function(event){
	        var _this = $(this);
	        if(!_this.data('isSelect')){
	            _this.parent('.c-brand').removeClass('lichk');
	            $("#category-brand-hasCheck li").filter(function(){
	                return _this.attr('facetsid') == $(this).data("facetId");
	            }).remove();
	        }else{
	            _this.parent('.c-brand').addClass('lichk');
	            $('<li class="ckes"><i></i>'+_this.attr("name")+'</li>').appendTo("#category-brand-hasCheck").data("facetId",_this.attr('facetsid'));
	        }
	    });
	    /**
	     * 聚合分类facet
	     * 【一】滑入滑出效果
	     * 【二】聚合分类facet的【取消】按钮 追加处理事件
	    **/
	    $('.category-syn').bind({
	        "mouseenter":function(event){
	            clearMultiSelectStatus();
	            $(this).parents('.facets-category').data('isMultiSelect',true);
	            $(this).addClass("category-syn-open");
	        },
	        "mouseleave":function(event){
	            $(this).parents('.facets-category').data('isMultiSelect',false);
	            $(this).removeClass('category-syn-open')
	        }
	    });
	    $('.facets-category-syn .fc-btn-cancel').bind('click',function(){
	        $(this).parents('.category-syn').removeClass('category-syn-open');
	    });
	    $('.facets-rele').bind({
	        "mouseenter":function(event){
	            $(this).parents('.facets-category').data('isMultiSelect',false);
	        }
	    });
	    /**
	     * 更多选项显示隐藏处理，仅列表页体现
	    **/
	    $('#fc-common-show').bind('click', function (event) {
	        clearMultiSelectStatus();
	        $(this).parents('.fccc-control-warp').addClass('show').siblings(".fc-hide").show();
	    });
	    $('#fc-common-hide').bind('click', function (event) {
	        clearMultiSelectStatus();
	        $(this).parents('.fccc-control-warp').removeClass('show').siblings(".fc-hide").hide();
	    });

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * [description]
	 * 根据不同筛选条件，设置页面跳转地址，包括facet多选，特殊活动，价格区间，在结果中搜索(仅结果页)
	 * &pzpq=0&pzin=v5 用于品牌预测的时候用
	 * queryString:筛选字段facets，promoFlag，price，et(仅搜索结果页调用)
	 * valueString：修改的值，（promoFlag仅限0,1）
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require,exports,module){
	    var href = window.location.href;
	    var queryRelation = {"facets":9,"promoFlag":10,"price":6,"et":-1}; //搜索页面url的query与列表页url中对应query的index位置
	    var pageCategoryQueryArray = [];
	    function assembleHref(queryString,valueString){
	        var reg = new RegExp("(^|&)" + queryString + "=([^&]*)(&|$)", "i");
	        var replaceContent = "";
	        switch(window.tag){
	            case "search":
	                var r =href.substr(1).match(reg);
	                if (r != null && queryString == "facets"){
	                    replaceContent = "&"+queryString+"="+unescape(r[2])+valueString+"&";
	                }else{
	                    replaceContent = "&"+queryString+"="+valueString+"&";
	                }
	                href = (href.indexOf(queryString)!= -1)? href.replace(reg, replaceContent) : href+ "&"+queryString+"="+window.defaultFacets+valueString+(queryString=="price"?"&priceTag=1":"")+"&pzpq=0&pzin=v5";
	                break;
	            case "category":
	                href = window.location.pathname;
	                if(href.split("-").length <= 1){
	                    href = href.split(".html")[0] + "-00-0-48-1-0-0-0-1-0-0-0-0-0-0-0-0-0.html";
	                }
	                pageCategoryQueryArray = href.split("-");
	                if (queryString === "facets" && pageCategoryQueryArray[9] !== "0"){
	                    pageCategoryQueryArray[queryRelation[queryString]] += valueString;
	                }else{
	                    pageCategoryQueryArray[queryRelation[queryString]] = valueString;
	                }
	                href = pageCategoryQueryArray.join("-");
	                break;
	            case "brand":
	                var hre = "search"+cookieDomain+"/search?question="+window.searchkey;
	                href = hre + "&" + queryString + "=" + window.brandId + window.defaultFacets + valueString + (queryString == "price" ? "&priceTag=1" : "") + "&pzpq=0&pzin=v5";
	                break;
	        }
	        window.location.href = href;
	    }
		module.exports = {
			dofacet:assembleHref
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * [description]
	 * 工具栏具体点击事件
	 * sort排序筛选项，地址选择，分页按钮-异步获取商品
	 * 价格区间，在结果中搜索，特殊活动-跳转新页面
	 * 初始化设置，特殊活动是否勾选，分页按钮置灰
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require,exports,module){
	    /**
	     * sort排序点击事件，使用function.getGoods模块获取商品
	     * 【一】价格按钮前置绑定一次事件，设置价格高→低，低→高状态，修改本身sort值
	     * 【二】绑定通用事件，修改pageData.sort，重置pageData.currentPage为1
	     */
	    $('#sort-price').bind('click', function (event) {
	        if(!pageData.ajaxStatus){
	            var _this = $(this);
	            if(_this.attr('data-sort') === "21"){
	                _this.attr('data-sort',"20").removeClass("price-down").addClass("price-up");
	                $(this).find('a').attr("href",$(this).attr("prdurl1"));
	            }else{
	                _this.attr('data-sort',"21").removeClass("price-up").addClass("price-down");
	                $(this).find('a').attr("href",$(this).attr("prdurl2"));
	            }
	        }
	    });

		$('#filter-order-box li').bind('click', function (event) {
	        var _this = $(this),
	            sort_target = _this.attr('data-sort');
	        if(pageData.sort !== sort_target && !pageData.ajaxStatus){
	            pageData.ajaxStatus = true;
	            _this.addClass('cur').siblings('.cur').removeClass('cur');
	            pageData.sort = sort_target;
	            pageData.currentPage=1;
	            if(window.tag== "brand"){
	                window.location.href = $(this).find('a').attr("href");
	            }else {
	                pageData.ajaxURL = $(this).find('a').attr("href");
	                __webpack_require__(4).getGoods();
	            }
	        }
	    }).find('a').click(function(event){
	        event.preventDefault();
	    });
	    /**
	     * 分页点击事件，仅修改pageData.currentPage，使用function.getGoods模块获取商品
	     * 【一】下一页
	     * 【二】上一页
	     */
	    $("#mp-next").bind('click', function (event) {
	        event.preventDefault();
	        if(pageData.currentPage >= pageData.totalPage || pageData.ajaxStatus){
	            return false;
	        }else{
	            pageData.ajaxStatus = true
	        }
	        pageData.currentPage++;

	        __webpack_require__(4).getGoods();
	    });
	    $("#mp-prev").bind('click', function (event) {
	        event.preventDefault();
	        if(pageData.currentPage == 1 || pageData.ajaxStatus){
	            return false;
	        }else{
	            pageData.ajaxStatus = true
	        }
	        pageData.currentPage--;
	        __webpack_require__(4).getGoods();
	    });
	    /**
	     * 特殊活动筛选
	     * 【一】初始换筛选标签是否勾选
	     * 【二】绑定点击事件，调用function.makeHelf模块处理跳转地址*/
	    (function(){
	        var url = window.location.href;
	        if(url.indexOf("promoFlag=1") > 0 || url.split("-")[10] == 1){
	            $("#specialScreening").addClass("checke");
	        }
	    })();
	    $("#specialScreening").bind("click",function(){
	        if($(this).hasClass("checke")){
	            promoFlagVal = 0;
	        }else{
	            promoFlagVal = 1;
	        }
	        __webpack_require__(2).dofacet('promoFlag',promoFlagVal);
	    })
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * [description]
	 * 根据排序pageData.sort，页码pageData.currentPage,异步获取商品,并重组数据（，）
	 * 注：区域字段在请求的cookie里面.
	 * 【一】pageData.bwsStaus==-1:初始请求，获取推荐的联营商品，
	 * 【二】pageData.bwsStaus=='[pid,pid,pid.....pid]':综合排序【大于第一页】，获取以排除推荐联营商品的数据
	 * 【三】pageData.bwsStaus==1：默认排序及分页请求，注：当综合排序第一页时需将 底部推荐联营商品 与 请求数据进行合并，
	 *      合并规则：倒数查找自营商品 替换为 联营商品
	 * 【四】综合第一页时将提前获取的底部推荐联营商品整合到主商品数据
	 * 【五】如果请求有推广活动则再次重组主商品数据结构,根据主商品特性clothes，merchandise，isBigImg设置广告活动高度
	 * 【function 1】综合排序第一页时，将推荐联营商品整合到异步主商品
	 * 【function 2】异步请求如果有推广活动位，将活动数据整合到主商品
	 * 【function 3】重新设置迷你分页器，底部分页器
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require,exports,module){
	    /**
	     * [description]
	     * 商品模板+区域推广活动 art-template
	     * {{noSkusStock}}： 无货标识，pagejs.ftl 根据区域设置
	     * {{isActive}},是否广告位，
	     */
	    var tpl_item = '\
	    {{each products}}\
	    {{if $value.isActive}}\
	    <li class="product-item product-ad" style="height:{{$value.height}}px">\
	        <a class="item-link activeImg" data-code="{{modelid}}-{{pageNumber}}_activities_{{$index+1}}" href="{{$value.mUrl}}" title="{{$value.title}}" target="_blank">\
	        <img src="//img.gomein.net.cn/images/grey.gif" gome-src="{{$value.img}}" alt="{{$value.pTxt}}">\
	        </a>\
	        <span class="product-ad-info">\
	        <em class="product-ad-name">{{$value.title}}</em>\
	        <em class="product-ad-title">{{$value.pTxt}}</em>\
	        <a class="product-ad-btn" data-code="{{modelid}}-{{pageNumber}}_activities_{{$index+1}}" href="{{$value.mUrl}}" target="_blank">点击进入</a>\
	        </span>\
	    </li>\
	    {{else}}\
	    <li class="product-item" from="ajax">\
	        <input class="productInfo" type="hidden" isMCard="{{$value.gomeCardType}}" isHyg="{{$value.marketTag}}" isTaogou="false" pid="{{$value.pId}}" skuid="{{$value.skuId}}" prd-index="{{$index+1}}" saleCount="{{$value.salesVolume}}" evaluateCount="{{$value.evaluateCount}}" firstCat="{{$value.firstCat}}" secondCat="{{$value.secondCat}}" thirdCat="{{$value.defCatId}}" brandIds="" thirdProduct="{{$value.thirdProduct | formatBoolean}}" shopId="{{if $value.shopId}}{{$value.shopId}}{{/if}}"  promoScore="{{$value.promoScore}}" score="{{$value.score}}" pStock="{{$value.stock}}" pWeight="{{$value.promoStock}}"/>\
	        <ul class="arbitrage clearfix {{if $value.taoGou}}bor-bott{{/if}}">\
	        {{if $value.taoGou}}\
	            <li class="arbitrage-num arbitrage-cur" taogou="false" pId="{{$value.pId}}" sId="{{$value.skuId}}">单件</li>\
	            {{each $value.taoGou}}\
	            {{if $index < 3}}\
	            <li class="arbitrage-num" taogou="true" pId="{{$value.pId}}" sId="{{$value.skuId}}">{{$value.num}}件套</li>\
	            {{/if}}\
	            {{/each}}\
	        {{/if}}\
	        </ul>\
	        <div class="item-tab-warp asynPriceBox" id="gm-{{$value.pId}}-{{$value.skuId}}">\
	        {{if $value.isBigImg}}\
	        <p class="item-pic bigp"><a class="emcodeItem item-link" rel="nofollow" href="{{$value.sUrl}}" target="_blank" data-code="{{modelid}}-{{pageNumber}}_{{$index+1}}_1" title="{{$value.alt}}"><img gome-src="{{$value.sImg}}_220_275.jpg" alt="{{$value.alt}}" src="//img.gomein.net.cn/images/grey.gif"></a></p>\
	        {{else}}\
	        <p class="item-pic"><a class="emcodeItem item-link" rel="nofollow" href="{{$value.sUrl}}" target="_blank" data-code="{{modelid}}-{{pageNumber}}_{{$index+1}}_1" title="{{$value.alt}}"><img gome-src="{{$value.sImg}}_210.jpg" src="//img.gomein.net.cn/images/grey.gif" alt="{{$value.alt}}"></a>{{if $value.energyTag == 1}}<span class="save-energy"></span>{{/if}}</p>\
	        {{/if}}\
	        {{if $value.isMulti && $value.images.length>0}}\
	        <div class="item-pic-small-box" index="{{$value.images.length}}" curIndex="{{$value.images.length}}">\
	            {{if $value.images.length> 5 }}\
	            <a href="javascript:void(0);" class="icon-prev disable" onClick="javascript:smallImgSprev(this)"></a>\
	            <a href="javascript:void(0);" class="icon-next" onClick="javascript:smallImgSnext(this)"></a>\
	            {{/if}}\
	            <div class="item-pic-small-wrap">\
	                <ul class="imgList">\
	                    {{each $value.images}}\
	                    <li class="" sid="{{$value.skuId}}">\
	                    <a href="javascript:void(0);" title="{{$value.color}}">\
	                        <img onClick="javascript:smallImgOnClick(this)" gome-src="{{$value.sImg}}_30.jpg" sid="{{$value.skuId}}" d_src="{{$value.sImg}}" alt="{{$value.color}}" src="//img.gomein.net.cn/images/grey.gif" />\
	                    </a>\
	                    </li>\
	                    {{/each}}\
	                </ul>\
	            </div>\
	        </div>\
	        {{/if}}\
	        <div class="item-price-info">\
	            <p class="item-price">\
	                <span class="price asynPrice" pid="{{$value.pId}}" skuid="{{$value.skuId}}"></span>\
	                {{if $value.goodsType == "ZC2M"}}\
	                <span class="promotion-c2m"></span>\
	                {{/if}}\
	                {{if $value.marketTag == 1}}\
	                <span class="promotion-hwg"></span>\
	                {{/if}}\
	                {{if $value.isVip == 1}}\
	                    <span class="promotion-normal">会员商品</span>\
	                {{/if}}\
	            </p>\
	        </div>\
	        <p class="item-name"><a rel="nofollow" class="emcodeItem item-link" data-code="{{modelid}}-{{pageNumber}}_{{$index+1}}_1" href="{{$value.sUrl}}" target="_blank" title="{{$value.alt}}">{{#$value.name}}</a></p>\
	        {{if $value.promoDesc !=""}}\
	        <p class="item-promotional-language">\
	            <!--{{if $value.promoTags && $value.promoTags != null && $value.promoTags.promoType && $value.promoTags.promoType == 2}}\
	                【{{$value.promoTags.promoPrice}}手机专享价】\
	            {{/if}}-->\
	            {{$value.promoDesc}}\
	        </p>\
	        {{/if}}\
	        <p class="item-comment-dispatching">\
	        {{if $value.stock==0 || noSkusStock}}\
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
	            <a href="{{$value.sUrl}}#j-comment-section" target="_blank" class="comment emcodeItem" data-code="{{modelid}}-{{pageNumber}}_{{$index+1}}_2">{{$value.evaluateCount}}</a>\
	        </p>\
	        <p class="item-option clearfix">\
	            <span class="add-contrast display-page-compare-checkbox"></span>\
	            <span class="add-collection">收藏</span>\
	        {{if $value.stock == 0 || noSkusStock}}\
	            <span class="add-cart next-buy">到货通知</span>\
	        {{else if $value.stock == 3 || $value.stock == 4}}\
	            <a href="{{productSite}}/{{$value.pId}}-{{$value.skuId}}.html" target="_blank" class="add-cart prev-buy emcodeItem" data-code="{{modelid}}-{{pageNumber}}_{{$index+1}}_3">预约购买</a>\
	        {{else}}\
	            <a class="add-cart addTo-cart" href="javascript:void(0);" data-code="{{modelid}}-{{pageNumber}}_{{$index+1}}_3">加入购物车</a>\
	        {{/if}}\
	        </p>\
	        </div>\
	        <p class="item-shop">\
	        {{if $value.thirdProduct}}\
	            <a class="nname" data-code="{{modelid}}-{{pageNumber}}_{{$index+1}}_4" target="_blank" href="{{$value.mUrl}}">{{$value.sName}}</a>{{if $value.shopId =="80009736" || $value.shopId =="80010355" || $value.shopId =="80010423"}}<span class="hyg-shopType">国美自营</span>{{/if}}\
	        {{else}}\
	            <span class="nname">国美自营</span>\
	        {{/if}}\
	        </p>\
	    </li>\
	    {{/if}}\
	    {{/each}}\
	    ';
	    /**
	     * [description]
	     * 重组主商品和推荐联营商品
	     */
	    function mixedShopData(mainArray,shopArray){
	        if(shopArray.length == 0) return false;
	        var _index = 0;
	        for(var i = mainArray.length-1,j=shopArray.length;i>0&&j>0;i--){
	            if(!mainArray[i].thirdProduct){
	                j--;
	                mainArray[i] = shopArray[_index++];
	            }
	        }
	    }
	    /**
	     * [description]
	     * 重组主商品和推广活动位，展示位置自定义
	     */
	    function mixActiveData(mainArray,activeArray,activeHeight){
	        var posArr = [11,19,31];//广告位展示位置
	        for(var i= 0;i<posArr.length;i++){
	            var forIndex = posArr[i];
	            if(activeArray[i] && mainArray[forIndex-1]){
	                mainArray.splice(forIndex,0, $.extend({},activeArray[i],{isActive:true,height:activeHeight}));
	            }
	        }
	    }
	    function initPageNumber(){
	        __webpack_require__(5);
	        $("#j-page").ucPager({
	            pageClass: "",
	            currentPage: pageData.currentPage,
	            totalPage: pageData.totalPage,
	            pageSize: 48,
	            clickCallback: function(curPage) {
	                pageData.currentPage = curPage;
	                getGoods();
	            }
	        });
	        $("#min-pager-number").text(pageData.currentPage+'/'+pageData.totalPage);

	        if(pageData.currentPage > 1 && pageData.currentPage < pageData.totalPage){
	            $('#mp-prev').removeClass('mp-disable');
	            $('#mp-next').removeClass('mp-disable');
	        }else{
	            if(pageData.currentPage === 1){
	                $('#mp-prev').addClass('mp-disable');
	            }else{
	                $('#mp-next').addClass('mp-disable');
	            }
	        }
	    }
	    /**
	     * [description]
	     * 异步请求主数据方法，并且渲染页面，主要参数sort，currentPage
	     */
	    function getGoods(){
	        if(pageData.sort === '00' && pageData.currentPage > 1){
	            ajaxData = pageData.dataBW.bwsString;
	        }else{
	            ajaxData = "0";
	        }
	        $.ajax({
	            url:pageData.ajaxURL,
	            dataType:"json",
	            data:{page:pageData.currentPage,bws:ajaxData,type:"json"},
	            timeout:1000,
	            beforeSend:function(){
	                $('#product-waiting').show();
	            }
	        }).always(function () {
	            pageData.ajaxStatus = false;
	            $('#product-waiting').hide();
	        }).done(function (data) {
	            if(!data.content) {return false};
	            pageData.currentPage = data.content.pageBar.pageNumber;
	            pageData.totalPage = data.content.pageBar.totalPage;
	            if(pageData.sort === '00' && pageData.currentPage == 1 && pageData.dataBW.bwsData){
	                //如果是综合第一页时，混合推荐联营商品
	                mixedShopData(data.content.prodInfo.products,pageData.dataBW.bwsData);
	            }
	            if(data.content.activities && data.content.activities.length > 0){
	                var active_h = 427;
	                if(data.content.prodInfo.clothes || data.content.prodInfo.merchandise){active_h=+45};
	                if(data.content.prodInfo.products[0].isBigImg){active_h=+65};
	                mixActiveData(data.content.prodInfo.products,data.content.activities,active_h);
	            }
	            //活动推广位
	            if(data.content.regionPromoInfo){
	                $("#szSpread").remove();
	                $(".product-right-box").prepend("<a id='szSpread' data-code='9000000900-0' target='_blank' href='"+data.regionPromoInfo.promUrl+"'><img src='"+data.regionPromoInfo.imgUrl+"'></a>")
	            }else{
	                $("#szSpread").remove();
	            }
	            //模板渲染
	            template.helper("formatBoolean",function(data,format){
	                return String(data);
	            });
	            var itemHTML = templateSimple.compile(tpl_item)($.extend({},data.content.prodInfo,{'noSkusStock':noSkusStock,'modelid':9000000700,'pageNumber':pageData.currentPage}));
	            if($.trim(itemHTML) !=""){
	                $('#product-box').empty().html(itemHTML);
	                initPageNumber();
	            }
	        }).fail(function () {
	            console.log("请求错误")
	        });
	    }
	    module.exports = {
	        getGoods:getGoods
	    }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * 分页插件
		$(".pager").ucPager({
			currentPage  : "当前页",				
			totalPage    : "总页数",				
			pageSize     : "每页显示的记录数",			
			clickCallback: cback				//分页回调方法
		})
	 */
	(function($){
		var pageNav = {
			pre : "上一页",
			next : "下一页",
			nav : function(p, pn) {
				var html = "";
				if (pn <= 1 || p > pn) {
					html = this.pager(1, 1);
				} else {
					html += (p == 1) ? this.showPre(0) : this.showPre(1, p);
					if (pn > 6) {
						var c = 1;
						if (p >= 5 && p <= pn) {
							html += (p == 1) ? this.numStatusHTML(0, 1) : this.numStatusHTML(1, 1);
						} else {
							for ( var i = 1; i < 4; i++) {
								html += (p == i) ? this.numStatusHTML(0, i) : this.numStatusHTML(1, i);
							}
						}
						html += (p >= 5) ? "<span class='placeholder'></span>" : "";
						c = p - 2; if (c >= 3 && c < pn - 2) html += (p == c) ? this.numStatusHTML(0, c) : this.numStatusHTML(1, c);
						c = p - 1; if (c > 3 && c < pn - 2) html += (p == c) ? this.numStatusHTML(0, c) : this.numStatusHTML(1, c);
						c = p;     if (c > 3 && c < pn - 2) html += (p == c) ? this.numStatusHTML(0, c) : this.numStatusHTML(1, c);
						c = p + 1; if (c > 3 && c < pn - 2) html += (p == c) ? this.numStatusHTML(0, c) : this.numStatusHTML(1, c);
						c = p + 2; if (c > 3 && c < pn - 2) html += (p == c) ? this.numStatusHTML(0, c) : this.numStatusHTML(1, c);
						html += (p <= pn - 4) ? "<span class='placeholder'></span>" : "";
						if (p <= pn - 4) {
							html += (p == pn) ? this.numStatusHTML(0, pn) : this.numStatusHTML(1, pn);
						} else {
							for ( var i = pn - 2; i <= pn; i++) {
								html += (p == i) ? this.numStatusHTML(0, i) : this.numStatusHTML(1, i);
							}
						}
					} else {
						for ( var i = 1; i <= pn; i++) {
							html += (p == i) ? this.numStatusHTML(0, i) : this.numStatusHTML(1, i);
						}
					}
					html += (p == pn) ? this.showNext(0) : this.showNext(1, p);
				}
				return html;
			},
			pager : function(p, pn) {
				var html = "";
				if (pn <= 1) {
					this.p = p;
					this.pn = pn;
					html = this.showPre(0) + this.numStatusHTML(0, p) + this.showNext(0);
				}
				return html;
			},
			go : function(p, pn) {
				var html = this.nav(p, pn) + this.btnHTML(p, pn);
				return html;
			},
			numStatusHTML : function(t, p) {
				return (t == 0) ? ("<span class='cur'>" + p + "</span>") : "<a href='javascript:void(0);' onclick='javascript:doPageNumSearch("	+ p + ");return false;'>" + p + "</a>";
			},
			showPre : function(t, p) {
				var $disable = "<a class='prev disable' href='javascript:void(0);'>&nbsp;"
					+ this.pre + "<s class='icon-prev'></s><i></i></a>";
				var $able = "<a class='prev' href='javascript:void(0);' onclick='javascript:doPageNumSearch("
					+ (p - 1) + ");return false;'>&nbsp;" + this.pre
					+ "<s class='icon-prev'></s><i></i></a>";
				return (t == 0) ? $disable : $able;
			},
			showNext : function(t, p) {
				var $disable = "<a class='next disable' href='javascript:void(0);'>"
					+ this.next + "<s class='icon-next'></s><i></i></a>";
				var $able = "<a class='next' href='javascript:void(0);' onclick='javascript:doPageNumSearch("
					+ (p + 1) + ");return false;'>" + this.next + "<s class='icon-next'></s><i></i></a>";
				return (t == 0) ? $disable : $able;
			},
			btnHTML : function(p, pn) {
				var html = "<label for='pagenum' class='txt-wrap'>到<input type='text' id='pNum' class='txt' bNum='"+ pn +"' value='" + p + "'>页</label>"
					+ "<a href='javascript:void(0)' zdx='nBtn' class='btn'>确定</a>";
				return html;
			}
		};
		$.fn.extend({
			ucPager: function(options) {
				var op = $.extend({currentPage:1,totalPage:0,pageSize:15,clickCallback:function(){}},options);

				return this.each(function() {
					var $this = $(this);

					var clickCallback = function() {
						op.clickCallback(op.currentPage);
						//$this.html(pageNav.go(op.currentPage, op.totalPage));
					}

					$this.html(pageNav.go(op.currentPage, op.totalPage));


					//翻页
					window.doPageNumSearch = function(p){  //p当前页数
						op.currentPage = p.toString();
						clickCallback();
					};
					//删除订单不刷新，执行下一页20150824
					window.doNextPageNum = function(lenOtbody){  //执行下一页；

						if(op.currentPage==op.totalPage){
							//doPrevPageNum();
							op.currentPage --;

						}else{
							op.currentPage ++;
						}

						doPageNumSearch(op.currentPage);
					};


					var $pNum = $("#pNum", $this);

					$pNum.on('keyup', function(event){
						var val = $(this).val(), reg1 = /^\d+$/ig, reg2 = /\d+/ig;
						if (event.which == 13) {
							$('.btn',$this).click();
						} else {
							if(!reg1.test(val)){
								$(this).val(val.match(reg2) ? val.match(reg2)[0] : '');
							};
						}

					})

					$('.btn',$this).bind('click',function(){
						var $val = $.trim($pNum.val());
						if($val<1){
							$pNum.val(1);
							op.currentPage = 1 + '';
						}else if($val>op.totalPage){
							$pNum.val(op.totalPage);
							op.currentPage = op.totalPage.toString();
						}else{
							$pNum.val($val);
							op.currentPage = $val;
						};

						clickCallback();
					});

				});
			}
		})
	})(jQuery);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 页面级事件，
	 * 【一】1.5s定时器,，异步价格盒子asynPriceBox，
	 *  (1)获取可视区域内图片，设置src地址
	 *  (2)获取可视区域内asynPriceBox盒子，异步获取价格信息，成功调用setAsynPriceBox方法设置相关信息
	 *      a,asynPriceBox盒子包括：主体商品，列表页顶部热卖推荐商品（from云眼），底部对比商品，底部最近浏览商品
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require,exports,module){
	var getScreenDom = __webpack_require__(7);
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
	            var addCart = itemBox.find(".addTo-cart"),
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

	    asynPriceBox.find(".asynPrice").text(data.price?"¥"+data.price:"").after(propTag)
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

	},1500);

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 7 */
/***/ function(module, exports) {

	 /**
	 * [getScreenDom 获取可视区域内可见对象]，如获取则此元素success=true，此后将不再获取；
	 * @param  {[string]} focusDom       [目标dom标识 class id elementname]
	 * @param  {[type]} screenAreaTop    [可视区域上边缘]
	 * @param  {[type]} screenAreaBottom [可视区域下边缘]
	 * @return {[type]}                  [description]
	 */
	module.exports = function(focusDom,screenAreaTop,screenAreaBottom){
	    return $(focusDom+":visible").filter(function(){
	        var _h = $(this).offset().top;
	        if(_h>0 && _h >= screenAreaTop && _h<=screenAreaBottom && !$(this).data("success")){
	            $(this).data("success",true);
	            return true;
	        }
	        return false;
	    });
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*加入购物车*/
	$("#product-box").delegate(".addTo-cart", "click", function() {
	    var $info = $(this).parents(".product-item").find(".productInfo");
	    var _type = 0;
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
	        __webpack_require__(9).addCollect("9134521004","1123461018",loginData.loginId,"华为 HUAWEI Mate 9 4GB+32GB 全网通版 月光银","wishlist");

	    });
	});

	/*到货通知*/
	$("#product-box").delegate(".next-buy","click",function(){
	    var cookieAg = $.cookie("atgregion").split("|")[0];
	    var userId = $.cookie("SSO_USER_ID");
	    __webpack_require__(11).arriveNotice("9134521004","1123461018",userId,cookieAg);
	})






/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * [description]
	 * 根据请求返回结果判断收藏是否成功
	 * 请求地址："//ss"+cookieDomain + "/item/v1/sc/"+ productId +"/"+skuId+"/"+userId+"/homeSite/flag/sc/wishlist",
	 * 传入参数：productId,skuId,userId
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require,exports,module){
	    function addCollect(skuId,productId,userId,productName,callbackName){

	        $.ajax({
	            type:"get",
	            url:"//ss"+cookieDomain + "/item/v1/sc/"+ productId +"/"+skuId+"/"+userId+"/homeSite/flag/sc/wishlist",
	            dataType:"jsonp",
	            jsonpCallback:callbackName
	        }).done(function(data){
	            var content = '';
	            var request_tre = function(){};
	            var dataType = data.errorType;
	            switch(dataType){
	                case "isError":
	                    content = '<div class="mask-icon icon-waring"></div><h3 class="mask-tit">错误！</h3>';
	                    break;
	                case "isSuccess":
	                    content = '<div class="mask-icon"></div><h3 class="mask-tit">成功加入收藏夹！</h3><p id="collecion-content-n">'+productName+'</p>';
	                    break;
	                case "isCollect":
	                    content = '<div class="mask-icon icon-waring"></div><h3 class="mask-tit">您已收藏过此商品！</h3><p id="collecion-content-n">'+productName+'</p>';http://myhome.atguat.com.cn/member/myFavorites
	                    break;
	                case "下架商品不能收藏":
	                    content = '<div class="mask-icon icon-waring"></div><h3 class="mask-tit">下架商品不能收藏!</h3>';
	                    break;
	                default:
	                    break;
	            }
	            content = content + '<div class="mask-addCart-btn"><a class="mask-shopping closeBtn" href="javascript:void(0);">继续购物</a><a class="link" href="http://myhome'+cookieDomain+'/member/myFavorites" target="_blank">查看收藏夹</a></div>'
	            __webpack_require__(10).showMask(content,request_tre);
	        });
	    }
		module.exports = {
			addCollect:addCollect
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require,exports,module){
		/**
		 * [showMask description] 创建弹出层
		 * @param  {[type]} content [html内容]
		 * @param  {Function} callback [description]
		 * @return {[type]}         [description]
		 */
		function showMask(content,callback){
			//遮罩层
	        var $bodyHeight = $("body").height(),
		        $windowHeight = $(window).height(),
		        $h = Math.max($bodyHeight,$windowHeight);
	        //弹出层主内容
	        var $maskContentWarp = $('<div class="mask-box" id="mask-box"><a class="mask-close closeBtn" href="javascript:void(0);">╳</a><div class="mask-content-warp" id="mask-content-warp">'+content+'</div></div>');
	        $maskContentWarp.appendTo('body');
	        var $contentHeight = $maskContentWarp.height(),
	        	$contentWidth = $maskContentWarp.width();


	        $('<div id="mask-overlay" class="mask-overlay"></div>').css("height",$h).appendTo('body');
	        $maskContentWarp.css({
	            "margin-left":-($contentWidth/2),
	            "margin-top":-($contentHeight/2)
	        });
	        if(callback && typeof callback == "function"){
	            callback.apply();
	        }
	        $(".closeBtn").on('click',function(){
	            closeMask();
	        })
		}

		function closeMask(){
			$("#mask-overlay").remove();
	        $("#mask-box").remove();
		}


		module.exports = {
			showMask:showMask,
			closeMask:closeMask
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * [description]
	 * 到货通知：根据请求返回结果判断到货通知是否成功
	 * 请求地址："//ss"+cookieDomain+"/item/v1/notice/arrival/"+pId+"/"+sId+"/"+cookieSid+"/"+cookieAtg+"/"+phoneNum+"/"+noticeMall+"/"+collect+"/flag/search/notice",
	 * 传入参数：pId,sId,cookieSid,cookieAtg
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require,exports,module){
	    var base = {
	        exp:{
	            'email':/^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9]+)@[A-Za-z0-9]+\.[a-z]{2,4}$/,
	            "telphone":/^(1)\d{10}$/
	        }
	    };
	    function arriveNotice(pId,sId,cookieSid,cookieAtg){
	        var request_tre1 = function(){};
	        var content = '<div class="dh-warp"><h3 class="dh-title">到货通知</h3><p class="dh-info">一旦该商品到货，我们会通过手机短信或邮件通知您</p><table class="dh-form"><tbody><tr><td class="dh-hd"><em class="nHeigh">*</em>手机号码：</td><td><input class="dh-input-text" id="dh-telNum" type="text"><span id="dh-telNum-warn"></span></td></tr><tr><td class="dh-hd"><em class="nHeigh">*</em>邮箱地址：</td><td><input class="dh-input-text" id="dh-email" type="text"><span id="dh-email-warn"></span></td></tr><tr><td>&nbsp;</td><td class="dh-label-box"><label class="gmform-label" for="dhAddCollection"><input class="gmform-input-check" name="dhAddCollection" id="dhAddCollection" type="checkbox">同时加入收藏夹</label></td></tr><tr><td>&nbsp;</td><td class="dh-btn-box"><a href="javascript:void(0)" class="dh-btn-submite" id="dh-submite">确定</a><a href="javascript:void(0)" class="dh-btn-cancel closeBtn">取消</a></td></tr></tbody></table></div>';
	        __webpack_require__(10).showMask(content,request_tre1);
	        $("#mask-overlay").remove();
	        $(".dh-btn-submite").on('click',function(){
	            var a = $("#dhAddCollection").attr("checked");
	            var collect = "",
	            phoneNum = $("#dh-telNum").val(),
	            noticeMall = $("#dh-email").val();
	            check_phone(phoneNum,$("#dh-telNum-warn"));
	            if(check_phone(phoneNum,$("#dh-telNum-warn"))== true){
	                check_email(noticeMall,$("#dh-email-warn"));
	                if(check_email(noticeMall,$("#dh-email-warn")) == true){
	                    if(a=="checked"){
	                        collect = true;
	                    }else{
	                        collect = false;
	                    }
	                    $.ajax({
	                        type:"get",
	                        url:"//ss"+cookieDomain+"/item/v1/notice/arrival/"+pId+"/"+sId+"/"+cookieSid+"/"+cookieAtg+"/"+phoneNum+"/"+noticeMall+"/"+collect+"/flag/search/notice",
	                        dataType:"jsonp",
	                        jsonpCallback:"notice"
	                    }).done(function(data){
	                        var request_tre = setTimeout(function(){
	                            $("#mask-overlay").remove();
	                            $("#mask-box").remove();
	                        },3000);
	                        var content = "一旦该商品到货，我们会通过手机短信或邮件通知您!";
	                        $("#mask-box").remove();
	                        __webpack_require__(10).showMask(content,request_tre);
	                    })
	                }
	            }
	        })
	    }

	    function check_phone(val,obj){
	        if(base.exp.telphone.test(val) && val!=""){
	            obj.html("").hide();
	            return true;
	        }else if(val==""){
	            obj.html('<i></i>请填写手机号码').show();
	            return false;
	        }else{
	            obj.html('<i></i>请填写正确的手机号码').show();
	            return false;
	        }
	    }

	    function check_email(val,obj){
	        if(base.exp.email.test(val) && val!==""){
	            obj.html("").hide();
	            return true;
	        }else if(val==""){
	            obj.html('<i></i>请填写邮箱地址').show();
	            return false;
	        }else{
	            obj.html('<i></i>请填写正确的邮箱地址').show();
	            return false;
	        }
	    }
		module.exports = {
	        arriveNotice:arriveNotice
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * [description]
	 * 页面初始时，根据标识searchObj.header.searchReq.bwSec 判断是否请求页面底部用于补位的联营商品
	 * 如果请求则请求结果存放于pageData.bwsData，用于综合第一页请求时底部替换商品
	 */

	function getShopGoods(url,pageNumber,bwValue){
	    var bwsData = [];
	    var bwsString = "";
	    $.ajax({
	        url:url,
	        dataType:"json",
	        async:false,
	        data:{page:pageNumber,bws:bwValue,type:"json"}
	    }).done(function(data){
	        if(data.content.prodInfo.products){
	            bwsData = data.content.prodInfo.products;
	            for(var i = 0,j= bwsData.length;i<j;i++){
	                bwsString += '"'+bwsData[i].pId+'"'
	            }
	            bwsString = "["+bwsString+"]";
	        }
	    });
	    return {
	        "bwsData":bwsData,
	        "bwsString":bwsString
	    }
	}

	module.exports = {
	    getShopGoods:getShopGoods
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var tpl_normal = __webpack_require__(14).tpl;
	$.ajax({
	    type:"get",
	    dataType:"jsonp",
	    url:window.url.dsp_url_c,
	    data:{
	        "p":1,
	        "catid":window.dsp_gome_c3id,
	        "c":"dsp_tg",
	        "width_height":"210-210",
	        "area":pageData.regionId
	    },
	    jsonpName:"dsp_tg",
	    success:function(data){
	        var _dataShow = [];
	        var data_left = {
	            "data": data.splice(0,8)
	        };
	        var data_bottom = {
	            "data": data.length >= 6?data.splice(0,6):[]
	        };
	        if(data_left.data.length > 0){
	            var listTpl = templateSimple.compile(tpl_normal)(data_left);
	            $("#prdRight-1").append('<div class="prd-right-normal"><h3 class="hd"><i class="dsp-tuiguangIdentifi">广告</i>店铺精选</h3><ul class="bd" id="dsp_tuiguang">'+listTpl+'</ul></div>');
	            _dataShow = _dataShow.concat(data_left.data)
	        }
	        if(data_bottom.data.length > 0){
	            var listTpl = templateSimple.compile(tpl_normal)(data_bottom);
	            $("#prdBottom-1").append('<dl class="nSearch-bottomTuiGuang"><dt class="hd"><i class="dsp-tuiguangIdentifi">广告</i>推广商品</dt><dd class="bd"><ul class="clearfix" id="dsp_bottomTuiGuang">'+listTpl+'</ul></dd> </dl>');
	            _dataShow = _dataShow.concat(data_bottom.data)
	        }
	        if (_dataShow.length > 0) {
	            for(var i=_dataShow.length-1;i>=0;i--){
	                new Image().src = _dataShow[i].pm;
	            }
	        }
	    }
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = {
	    tpl:'{{each data as value}}\
	        <li class="buy-items">\
	        {{if !(value.ds) && !(value.skuid) && !(value.productid)}}\
	            <a class="dsp-tgImg" href="{{value.ldp}}" target="_blank"><img gome-src="{{value.src}}" src="//img.gomein.net.cn/images/grey.gif"></a>\
	        {{else}}\
	            <div class="pic"><a href="{{value.ldp}}" target="_blank"><img gome-src="{{value.src}}" src="//img.gomein.net.cn/images/grey.gif"></a></div>\
	            <div class="price">¥<span>{{value.pr}}</span></div>\
	            <div class="name"><a href="{{value.ldp}}" target="_blank">{{value.ds}}</a></div>\
	            {{if value.adver}}<div class="adver">{{#value.adver}}</div>{{/if}}\
	        {{/if}}\
	        </li>\
	    {{/each}}'
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var tpl_normal = __webpack_require__(16).tpl;
	function getData(domId){
	    $.get(
	        window.url.bigdata_url,
	        {
	            boxid: "box94",
	            area: pageData.regionId,
	            cid: $.cookie("__clickidc"),
	            imagesize: 160,
	            c1id:window.dsp_gome_c1id,
	            c3id:window.dsp_gome_c3id,
	            brid: window.dsp_gome_brid,
	            search: window.searchkey
	        },
	        function(data){
	            if (data.lst && data.lst.length > 0) {
	                data.lst.splice(6,data.lst.length)
	                var listTpl = templateSimple.compile(tpl_normal)(data);
	                $(domId).append('<div class="prd-right-normal"><h3 class="hd">热销推荐</h3><ul class="bd" id="bigD_rexiao">'+listTpl+'</ul></div>');
	            }
	        }
	    );
	}
	module.exports = {
	    getData:getData
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = {
	    tpl:'{{each lst as value}}\
	            <li class="buy-items">\
	                <div class="pic"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank"><img gome-src="{{value.iurl}}" src="//img.gomein.net.cn/images/grey.gif"></a></div>\
	                <div class="price">¥<span>{{value.price}}</span></div>\
	                <div class="name"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank">{{value.pn}}</a></div>\
	            </li>\
	        {{/each}}'
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var tpl_normal = __webpack_require__(16).tpl;
	function getData(domId){
	    $.get(
	        window.url.bigdata_url,
	        {
	            boxid: "box02",
	            area: pageData.regionId,
	            cid: $.cookie("__clickidc"),
	            imagesize: 160,
	            c1n: window.dsp_gome_c1name,
	            c3n: window.dsp_gome_c3name,
	            c1id: window.dsp_gome_c1id,
	            c3id: window.dsp_gome_c3id,
	            brid: window.dsp_gome_brid
	        },
	        function(data){
	            if (data.lst && data.lst.length > 0) {
	                data.lst.splice(6,data.lst.length)
	                var listTpl = templateSimple.compile(tpl_normal)(data);
	                $(domId).append('<div class="prd-right-normal"><h3 class="hd">搜了此类商品的用户还买了</h3><ul class="bd" id="bigD_liulan">'+listTpl+'</ul></div>');
	            }
	        }
	    );
	}
	module.exports = {
	    getData:getData
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	var tpl = '{{each lst as value}}\
	    <li class="buy-items">\
	        <div class="pic"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank"><img gome-src="{{value.iurl}}" src="//img.gomein.net.cn/images/grey.gif"></a></div>\
	        <div class="price">¥<span>{{value.price}}</span></div>\
	        <div class="name"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank">{{value.pn}}</a></div>\
	    </li>\
	{{/each}}'

	function getData(domId){
	    $.get(
	        window.url.bigdata_url,
	        {
	            boxid: "box45",
	            area: pageData.regionId,
	            cid: $.cookie("__clickidc"),
	            imagesize: 160,
	            c1id:window.dsp_gome_c1id,
	            c3id:window.dsp_gome_c3id,
	            brid: window.dsp_gome_brid,
	            search: window.searchkey
	        },
	        function(data){
	            if (data.lst && data.lst.length > 0) {
	                var listTpl = templateSimple.compile(tpl)(data);
	                var _length = data.lst.length;
	                $(domId).append('<dl class="nSearch-bottom-advertisement" id="nSearch-bottomHotSale"><dt class="hd"><span id="bottomHotSale-refresh" class="bottom-advertisement-refresh" curp="0">换一组</span>热销推荐</dt><dd class="bd"><ul class="bottom-advertisement-lists clearfix" id="bottomHotSale">'+listTpl+'</ul></dd></dl>');
	                if(_length<=6){$("#bottomHotSale-refresh").hide()}
	                var totlnum = (_length %6 ==0)?(parseInt(_length /6,10)-1):parseInt(_length /6,10);
	                var _i = 0;
	                $("#bottomHotSale").find(".item").each(function(){
	                    if($(this).index()<6){
	                        $(this).addClass("cShow");
	                    }
	                    $(this).addClass("item"+parseInt($(this).index()/6,10))
	                })
	                $("#bottomHotSale-refresh").bind("click",function(){
	                    $("#bottomHotSale").find(".item").removeClass("cShow");
	                    if(_i++ == totlnum || _i==3){
	                        _i=0;
	                    }
	                    $("#bottomHotSale").find(".item"+_i).addClass("cShow")
	                })
	            }
	        }
	    );
	}
	module.exports = {
	    getData:getData
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	var tpl = '{{each lst as value}}\
	    <li class="buy-items">\
	        <div class="pic"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank"><img gome-src="{{value.iurl}}" src="//img.gomein.net.cn/images/grey.gif"></a></div>\
	        <div class="price">¥<span>{{value.price}}</span></div>\
	        <div class="name"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank">{{value.pn}}</a></div>\
	    </li>\
	{{/each}}'

	$.get(
	    window.url.bigdata_url,
	    {
	        boxid: "box05",
	        area: pageData.regionId,
	        cid: $.cookie("__clickidc"),
	        imagesize: 160,
	        c1n: dsp_gome_c1name,
	        c3n: dsp_gome_c3name,
	        c1id: window.dsp_gome_c1id,
	        c3id: window.dsp_gome_c3id,
	        brid: window.dsp_gome_brid
	    },
	    function(data){
	        if (data.lst && data.lst.length > 0) {
	        var listTpl = templateSimple.compile(tpl)(data);
	        var _length = data.lst.length;
	        $("#prdBottom-2").append('<dl class="nSearch-bottom-advertisement" id="nSearch-quessYouLike"><dt class="hd"><span id="quessYouLike-refresh" class="bottom-advertisement-refresh" curp="0">换一组</span>根据浏览猜你喜欢</dt><dd class="bd"><ul class="bottom-advertisement-lists clearfix" id="bigD_quessLike">'+listTpl+'</ul></dd></dl>');
	        
	        if(_length<=6){$("#quessYouLike-refresh").hide()}
	        var totlnum = (_length %6 ==0)?(parseInt(_length /6,10)-1):parseInt(_length /6,10);
	        var _i = 0;
	        $("#bigD_quessLike").find(".item").each(function(){
	            if($(this).index()<6){
	                $(this).addClass("cShow");
	            }
	            $(this).addClass("item"+parseInt($(this).index()/6,10))
	        })
	        $("#quessYouLike-refresh").bind("click",function(){
	            $("#bigD_quessLike").find(".item").removeClass("cShow");
	            if(_i++ == totlnum || _i==3){
	                _i=0;
	            }
	            $("#bigD_quessLike").find(".item"+_i).addClass("cShow")
	        })
	    }
	    }
	);

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * 根据cookie--proid120517atg 请求前台组获取最近浏览商品信息
	 * pagename 接口标识，判断请求来源
	 * */
	var tpl = '{{each result as value}}\
	            <li class="item">\
	                <p class="pic"><a href="{{value.url}}" target="_blank"><img gome-src="{{value.pic}}" src="//img.gomein.net.cn/images/grey.gif"></a></p>\
	                <p class="name"><a href="{{value.url}}" target="_blank">{{value.name}}</a></p>\
	                <p class="price">¥<span>{{value.price}}</span></p>\
	            </li>\
	        {{/each}}';
	function getData(pagename,domId){
	    var product_id = $.cookie("proid120517atg");
	    if(product_id == null || product_id ==""){return false;}

	    $.ajax({
	        type:"get",
	        dataType:"jsonp",
	        url:"//ss"+window.cookieDomain+"/item/v1/browse/prdreturn/"+$.parseJSON(product_id).join("")+"/80/flag/"+pagename+"/recentViewed",
	        jsonpName:"recentViewed"
	    }).done(function(data){
	        if(data.success && data.result.length>0){
	            var listTpl = templateSimple.compile(tpl)(data);
	            $(domId).html('<dl class="nSearch-recentVisit"><dt class="hd">最近浏览</dt><dd class="bd"><ul class="recentVisit-lists clearfix" id="recentVisit-lists" modelid="9000002000">'+listTpl+'</ul></dd></dl>');
	        }
	    }).fail(function(){
	        console.log("请求失败")
	    });
	}
	module.exports = {
	    getData:getData
	}



/***/ }
/******/ ]);