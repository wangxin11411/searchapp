<#assign TDK = searchObj.content.seoData />
<#assign TDKcateame = (searchObj.content.seoData.dispStr)! />
<#assign isGomeDeliv = "" />
<#assign isMarket = "" />
<#assign priceRange=""/>
<#if (searchObj.content.toolBar.deliv.delivGome.isDefault)?? && searchObj.content.toolBar.deliv.delivGome.isDefault>
    <#assign isGomeDeliv = "国美配送" />
</#if>
<#if searchObj.content.toolBar.market.isDefault>
    <#assign isMarket = "海外购" />
</#if>
<#if (searchObj.content.selectData.price)??>
    <#assign isPriceRange=(searchObj.content.selectData.price.lowPrice!)+"到"+(searchObj.content.selectData.price.highPrice!)+"元" />
</#if>

<#switch TDK.sortNo>
    <#case 10>
        <#assign title = "销量最好的${isPriceRange!}${TDKcateame!}价格,${isPriceRange!}${TDKcateame!}销量排行榜【报价、品牌、正品行货】${isGomeDeliv!}${isMarket!}-国美在线">
        <#assign keywords = "销量最好的${isPriceRange!}${TDKcateame!},最好的${isPriceRange!}${TDKcateame!}价格,${isPriceRange!}${TDKcateame!}销量排行榜,最好的${isPriceRange!}${TDKcateame!}报价,${isGomeDeliv!}${isMarket!}">
        <#assign description = "国美在线提供销量最好的${isPriceRange!}${TDKcateame!}价格告诉您${isPriceRange!}${TDKcateame!}销量排行榜,并为您购买销量最好的${isPriceRange!}${TDKcateame!}提供最新报价、价格、促销、评价、排行、图片等选购信息。">
        <#break>
    <#case 21>
        <#assign title = "最便宜的${isPriceRange!}${TDKcateame!}价格_最便宜的${isPriceRange!}${TDKcateame!}多少钱_最便宜的${isPriceRange!}${TDKcateame!}报价大全${isGomeDeliv!}${isMarket!}-国美在线">
        <#assign keywords = "最便宜的${isPriceRange!}${TDKcateame!},最便宜的${isPriceRange!}${TDKcateame!}价格,最便宜的${isPriceRange!}${TDKcateame!}多少钱,最便宜的${isPriceRange!}${TDKcateame!}报价,${isGomeDeliv!}${isMarket!}">
        <#assign description = "国美在线提供最便宜的${isPriceRange!}${TDKcateame!}价格告诉您最便宜的${isPriceRange!}${TDKcateame!}多少钱,并为您购买最便宜的${isPriceRange!}${TDKcateame!}报价大全提供最新报价、价格、促销、评价、排行、图片等选购信息。">
        <#break>
    <#case 20>
        <#assign title = "最贵的${isPriceRange!}${TDKcateame!}价格_最贵的${isPriceRange!}${TDKcateame!}多少钱_最贵的${isPriceRange!}${TDKcateame!}报价大全${isGomeDeliv!}${isMarket!}-国美在线">
        <#assign keywords = "最贵的${isPriceRange!}${TDKcateame!},最贵的${isPriceRange!}${TDKcateame!}价格,最贵的${isPriceRange!}${TDKcateame!}多少钱,最贵的${isPriceRange!}${TDKcateame!}报价,${isGomeDeliv!}${isMarket!}">
        <#assign description = "国美在线提供最贵的${isPriceRange!}${TDKcateame!}价格告诉您最贵的${isPriceRange!}${TDKcateame!}多少钱,并为您购买最便贵的${isPriceRange!}${TDKcateame!}报价大全提供最新报价、价格、促销、评价、排行、图片等选购信息。">
        <#break>
    <#case 50>
        <#assign title = "最好的${isPriceRange!}${TDKcateame!}价格,口碑最好的${isPriceRange!}${TDKcateame!}报价【大全、品牌、评价、正品行货】${isGomeDeliv!}${isMarket!}-国美在线">
        <#assign keywords = "最好的${isPriceRange!}${TDKcateame!},口碑最好的${isPriceRange!}${TDKcateame!},最好的${isPriceRange!}${TDKcateame!}价格,口碑最好的${isPriceRange!}${TDKcateame!}报价${isGomeDeliv!}${isMarket!}">
        <#assign description = "国美在线提供最好的${isPriceRange!}${TDKcateame!}价格告诉您口碑最好的${isPriceRange!}${TDKcateame!}报价,并为您购买最好的${isPriceRange!}${TDKcateame!}提供最新报价、价格、促销、评价、排行、图片等选购信息。">
        <#break>
    <#case 30>
        <#assign title = "最新${isPriceRange!}${TDKcateame!}价格,最新款${isPriceRange!}${TDKcateame!}报价【大全、品牌】${isGomeDeliv!}${isMarket!}-国美在线">
        <#assign keywords = "最新${isPriceRange!}${TDKcateame!},新款${isPriceRange!}${TDKcateame!},最新款${isPriceRange!}${TDKcateame!}价格,最新${isPriceRange!}${TDKcateame!}报价大全${isGomeDeliv!}${isMarket!}">
        <#assign description = "国美在线提供最新${isPriceRange!}${TDKcateame!}价格告诉您最新款${isPriceRange!}${TDKcateame!}报价,并为您购买最新${isPriceRange!}${TDKcateame!}提供最新报价、价格、促销、评价、排行、图片等选购信息。">
        <#break>
    <#default>
        <#assign title = "${isPriceRange!}${TDKcateame!}报价,${isPriceRange!}${TDKcateame!}价格表【大全、品牌、行情、正品行货】${isGomeDeliv!}${isMarket!}-国美在线">
        <#assign keywords = "${isPriceRange!}${TDKcateame!}报价,${isPriceRange!}${TDKcateame!}价格表,${isPriceRange!}${TDKcateame!}报价大全,${isPriceRange!}${TDKcateame!}品牌${isGomeDeliv!}${isMarket!}">
        <#assign description = "国美在线销售${isPriceRange!}${TDKcateame!},并为你购买${isPriceRange!}${TDKcateame!}提供最新${isPriceRange!}${TDKcateame!}报价、${isPriceRange!}${TDKcateame!}价格、价格表、促销、参数、评价、排行、图片等选购信息.有国美，生活美！">
</#switch>

<#include "module/variable.ftl" >
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title!}</title>
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <meta http-equiv="Cache-Control" content="no-transform"/>
    <meta name="applicable-device" content="pc">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta name="description" content="${description!}">
    <meta name="Keywords" content="${keywords!}">
    <meta property="qc:admins" content="2500556177677556375636"/>
    <meta http-equiv="mobile-agent" content="format=html5; url= http://m.gome.com.cn/category-${(searchObj.header.catId)!}.html">
    <link rel="shortcut icon" href="//app.gomein.net.cn/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href='<!--# include virtual="/n/common/a18/style.html"-->,/css/n/detail/gCity.min.css,/search/search2017/css/style.min.css'>
    <!--# include virtual="/n/common/global/global.html"-->
    <#if (searchObj.header.refPage)!?index_of("-00-0-48-1-0-0-0-1-0-0-0-0-0-0-0-0-0")!=-1>
        <link rel="canonical" href="${(storeConfiguration.listSite)!}/${(searchObj.content.seoData.catId)!}.html"/>
    <#else>
        <link rel="canonical" href="${(searchObj.header.refPage)!?replace("/category/","/")}"/>
    </#if>
    <link rel="alternate" media="only screen and(max-width:640px)" href="http://m.gome.com.cn${(searchObj.header.url)?replace("-48-","-20-")}">
</head>
<body data-page="list">
<div id="delscript">
    <script type="text/javascript">
        var winWidth = window.screen.width,objb = document.body;if (winWidth<=1024) {objb.className += " " +"w990"; }else {objb.className=objb.className.replace("w990", '');};
    </script>
</div>
<div style="display:none" id="severInfolist">
    server:${(searchObj.header.serverIp)!}<br/>
    from:${(searchObj.header.from)!}<br/>
    thread:${(searchObj.header.thread)!}<br/>
    job:${(searchObj.header.job)!}<br/>
    time:${(searchObj.header.time)!}<br/>
</div>
<#--nginx -->
<!--# include virtual="/n/common/a18/head.html"-->
<#--在本地测试环境引入公共头-->
<#--<#include "static/newHeader.html">-->
<#--热卖分类 推送少于4个的时候会异步请求大数据商品-->
<div class="nSearchWarp">
    <div class="hot-tj">
        <span class="icon_tj">热卖<br />推荐</span>
        <ul class="hot-list clearfix" id="hot-list" modelid="9000000000"></ul>
        <div class="hot-cuxiao-list-box">
            <span class="icon_tj">促销<br />活动</span>
            <ul class="hot-cuxiao-list" id="hot-cuxiao-list" modelid="9000000001"></ul>
        </div>
    </div>
</div>
<#--面包屑-->
<div class="nSearchWarp">
    <#--分类列表页面包屑-->
    <#assign pageCategory = (searchObj.content.selectData.category)!>
    <div class="nSearch-crumb clearfix">
        <span id="category-first" catgoryId="${(pageCategory.fir.id)!}" data-code="9000000101-1" class="nSearch-crumb-tit-category">${(pageCategory.fir.name)!}</span>

        <dl class="nSearch-crumb-category"  catgoryId="${(pageCategory.sec.id)!}" id="category-second">
            <dt class="category-name">${(pageCategory.sec.name)!}</dt>
            <dd class="category-box clearfix" id="category-box-second" modelid="9000000102"></dd>
        </dl>

        <#if (pageCategory.third)??>
        <dl class="nSearch-crumb-category" catgoryId="${(pageCategory.sec.id)!}" id="category-third">
            <dt class="category-name">${(pageCategory.third.name)!}</dt>
            <dd class="category-box"  id="category-box-third" modelid="9000000103">
                <#if (pageCategory.sec.childs)?? && (pageCategory.sec.childs?size gt 0)>
                    <#list pageCategory.sec.childs as thirdItem>
                        <a href="${(thirdItem.url)!}?intcmp=list-9000000103-${(thirdItem_index+1)!}">${(thirdItem.name)!}</a>
                    </#list>
                </#if>
            </dd>
        </dl>
        </#if>
        <#--页面当前已经选择的分类-->
        <#include "module/facet/facet_selected.ftl">
    </div>

    <div class="nSearchWarp nSearch-crumb-category-results">
        <span class="nFont14"><b class="nHeigh">${(pageCategory.third.name)!}</b>商品筛选</span>
        <span>共 <em id="searchTotalNumber">${searchObj.content.seoData.totalCount!}</em> 个商品</span>
    </div>
</div>
<#--facets分类-->
<div class="nSearchWarp nSearch-facets" id="module-facet">
    <#assign showThreshold = 5 />
    <#assign showThresholdText = "" />
    <#--【facet】品牌筛选项-->
    <#assign facetsBrands = (searchObj.content.facets.brand)!>
    <#if !(facetsBrands.selected)?? && (facetsBrands.items??)>
        <#assign showThreshold= showThreshold - 1 />
        <#include "module/facet/facet_brand.ftl" >
    </#if>
    <#--【facet】价格筛选-->
    <#assign facetsPrice = (searchObj.content.facets.price)!>
    <#if (facetsPrice.items)?? && !(facetsPrice.selected)??>
        <#assign thisFacets = facetsPrice>
        <#assign showThreshold= showThreshold - 1 />
        <#include "module/facet/facet_common.ftl">
    </#if>
    <#--【facet】一般筛选  【展示方式】超过showThreshold的分类隐藏，通过更多展示按钮控制-->
    <#assign facetsCommon = (searchObj.content.facets.commonfacets)!>
    <#list facetsCommon as facetsItem>
        <#if (facetsItem_index >=  showThreshold)>
        <#assign showThresholdText =showThresholdText+ "," + (facetsItem.label)!/>
        <#assign displayType ="fc-hide"/>
        </#if>
        <#assign thisFacets = facetsItem>
        <#include "module/facet/facet_common.ftl">
    </#list>
    <#if facetsCommon?size &gt; showThreshold>
        <div class="fccc-control-warp">
            <span class="fccc-control"  id="fc-common-show">更多选项（${showThresholdText?substring(1)}）</span>
            <span class="fccc-up" id="fc-common-hide">收起&nbsp;&nbsp;</span>
        </div>
    </#if>
</div>
<#--页面商品列表主体-->
<div class="nSearchWarp">
    <div class="nSearchWarp-main clearfix">
        <div class="product-right-box">
            <div id="prdRight-1"><#--店铺精选商品 dsp--></div>
            <div id="prdRight-2"><#--一周销量排行榜 bigdata--></div>
            <div id="prdRight-3"><#--浏览此类商品的用户最终买了 bigdata--></div>
            <div id="prdRight-4"><#--购买此类商品的用户还购买了 bigdata--></div>
            <div id="prdRight-5"><#--推广活动位 dsp--></div>
        </div>
        <div class="product-left-list" id="product-left">
        <#include "module/toolbar.ftl" >
        <#if (searchObj.content.prodInfo.products)?? && searchObj.content.prodInfo.products?size &gt; 0 >
            <#include "module/prdlist.ftl" >
        <#else>
            <div class="nSearch-noProductBox" style="padding-left:250px;">
                <div class="noProductBox-content" style="display:inline-block;padding-top:20px;text-align:left;line-height:22px;">
                <h3 style="color:#e3101e">抱歉，没有找到相关的商品</h3>
                <p>建议您：</p>
                <p>1、修改筛选条件</p>
                <p>2、调整价格区间</p>
                <p>3、使用其他关键字</p>
                <a href="javascript:void(0)" id="noResultReturnBack" class="nBlue">返回上一步</a>
                </div>
                <script>
                    document.getElementById("noResultReturnBack").onclick = function(){
                        window.history.back()
                    }
                </script>
            </div>
        </#if>
        </div>
    </div>
</div>
</div>
<div id="lazyajaxloadareaBox"><div id="lazyajaxloadarea"></div></div>
<div class="nSearchWarp">
    <div id="prdBottom-1"><#--推广商品（） dsp--></div>
    <div id="prdBottom-2"><#--猜你喜欢 bigdata--></div>
    <div id="prdBottom-recent"><#--最近浏览--></div>
    <div id="prdBottom-4"><#--底部推荐广告 dsp--></div>
</div>

<!--# include virtual="/n/common/default/aside.html"-->
<!--# include virtual="/n/common/default/foot.html"-->
<script>
    var productId_list = "";
    var keyword = "";
    var order = [];
    var orderby=""
    var catid="";
</script>
<script type="text/javascript">
    var isHyg = false;//${(storeConfiguration.isHwg)!};
    window.pageName = '三级列表页';
</script>
<#include "module/pagejs.ftl">
<script src="${(storeConfiguration.stageJsServer)!}/search/search2017/js/category.bundle.js"></script>
<script>
    var  productId_list="";
    //各种埋码
    window.setTimeout(function(){
    <#if searchObj.content??>
        <#if (searchObj.content.selectData.category.fir)?? >
            <#assign firMenu=searchObj.content.selectData.category.fir>
        </#if>
        <#if (searchObj.content.selectData.category.sec)?exists >
            <#assign secrMenu=searchObj.content.selectData.category.sec>
        </#if>
        <#if (searchObj.content.selectData.category.third)?exists >
            <#assign thirdMenu=searchObj.content.selectData.category.third>
        </#if>
        <#if (searchObj.content.toolBar.sort)??>
            <#assign toolItem = searchObj.content.toolBar.sort>
            <#if toolItem.default.isDefault??>
                <#assign classCur="综合">
            <#elseif toolItem.sale.isDefault??>
                <#assign classCur="销量">
            <#elseif toolItem.price.isDefault??>
                <#assign classCur="价格">
            <#elseif toolItem.startDate.isDefault??>
                <#assign classCur="新品">
            <#else>
                <#assign classCur="评价">
            </#if>
        </#if>
    </#if>

        s.pageName="商品列表:${(thirdMenu.name)!}";
        s.channel="商品列表";
        s.prop1="商品列表:${(firMenu.name)!}";
        s.prop2="商品列表:${(firMenu.name)!}:${(secrMenu.name)!}";
        s.prop3="商品列表:${(firMenu.name)!}:${(secrMenu.name)!}:${(thirdMenu.name)!}";
        s.prop4="商品列表";
        s.prop24="${classCur}:"+pageData.currentPage;
        s.eVar3="分类浏览";
        s.eVar30="分类浏览";
        s.events="event50";
        s.eVar41="商品列表${(searchObj.header.tagWightVersion)!}";
        var url = window.location.pathname;
        var arr = url.split("-");
        if(arr[10]==1){
            s.eVar35 ="三级列表页:活动筛选";
        };
        s.products=";null;;;event50=1;eVar37=${(firMenu.name)!}:${(secrMenu.name)!}:${(thirdMenu.name)!}:${(thirdMenu.id)!}";
        var s_code=s.t();
        if(s_code)document.write(s_code);
    },2000);
</script>
</body>
</html>