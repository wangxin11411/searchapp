<#assign TDK = searchObj.content.seoData />
<#assign TDKcateame = "进口"+(searchObj.content.seoData.dispStr)! />
<#assign isGomeDeliv = "" />
<#assign isMarket = "海外购" />
<#assign priceRange=""/>
<#if (searchObj.content.toolBar.deliv.delivGome.isDefault)?? && searchObj.content.toolBar.deliv.delivGome.isDefault>
    <#assign isGomeDeliv = "国美配送" />
</#if>
<#if (searchObj.content.selectData.price)??>
    <#assign isPriceRange=(searchObj.content.selectData.price.lowPrice!)+"到"+(searchObj.content.selectData.price.highPrice!)+"元" />
</#if>

<#if TDK.sortNo = 10>
    <#assign title = "销量最好的${isPriceRange!}${TDKcateame!}价格,${isPriceRange!}${TDKcateame!}销量排行榜【报价、品牌、正品行货】${isGomeDeliv!}${isMarket!}-国美在线">
    <#assign keywords = "销量最好的${isPriceRange!}${TDKcateame!},最好的${isPriceRange!}${TDKcateame!}价格,${isPriceRange!}${TDKcateame!}销量排行榜,最好的${isPriceRange!}${TDKcateame!}报价,${isGomeDeliv!}${isMarket!}">
    <#assign description = "国美在线提供销量最好的${isPriceRange!}${TDKcateame!}价格告诉您${isPriceRange!}${TDKcateame!}销量排行榜,并为您购买销量最好的${isPriceRange!}${TDKcateame!}提供最新报价、价格、促销、评价、排行、图片等选购信息。">
<#elseif TDK.sortNo = 21>
    <#assign title = "最便宜的${isPriceRange!}${TDKcateame!}价格_最便宜的${isPriceRange!}${TDKcateame!}多少钱_最便宜的${isPriceRange!}${TDKcateame!}报价大全${isGomeDeliv!}${isMarket!}-国美在线">
    <#assign keywords = "最便宜的${isPriceRange!}${TDKcateame!},最便宜的${isPriceRange!}${TDKcateame!}价格,最便宜的${isPriceRange!}${TDKcateame!}多少钱,最便宜的${isPriceRange!}${TDKcateame!}报价,${isGomeDeliv!}${isMarket!}">
    <#assign description = "国美在线提供最便宜的${isPriceRange!}${TDKcateame!}价格告诉您最便宜的${isPriceRange!}${TDKcateame!}多少钱,并为您购买最便宜的${isPriceRange!}${TDKcateame!}报价大全提供最新报价、价格、促销、评价、排行、图片等选购信息。">
<#elseif TDK.sortNo = 20>
    <#assign title = "最贵的${isPriceRange!}${TDKcateame!}价格_最贵的${isPriceRange!}${TDKcateame!}多少钱_最贵的${isPriceRange!}${TDKcateame!}报价大全${isGomeDeliv!}${isMarket!}-国美在线">
    <#assign keywords = "最贵的${isPriceRange!}${TDKcateame!},最贵的${isPriceRange!}${TDKcateame!}价格,最贵的${isPriceRange!}${TDKcateame!}多少钱,最贵的${isPriceRange!}${TDKcateame!}报价,${isGomeDeliv!}${isMarket!}">
    <#assign description = "国美在线提供最贵的${isPriceRange!}${TDKcateame!}价格告诉您最贵的${isPriceRange!}${TDKcateame!}多少钱,并为您购买最便贵的${isPriceRange!}${TDKcateame!}报价大全提供最新报价、价格、促销、评价、排行、图片等选购信息。">
<#elseif TDK.sortNo = 50>
    <#assign title = "最好的${isPriceRange!}${TDKcateame!}价格,口碑最好的${isPriceRange!}${TDKcateame!}报价【大全、品牌、评价、正品行货】${isGomeDeliv!}${isMarket!}-国美在线">
    <#assign keywords = "最好的${isPriceRange!}${TDKcateame!},口碑最好的${isPriceRange!}${TDKcateame!},最好的${isPriceRange!}${TDKcateame!}价格,口碑最好的${isPriceRange!}${TDKcateame!}报价${isGomeDeliv!}${isMarket!}">
    <#assign description = "国美在线提供最好的${isPriceRange!}${TDKcateame!}价格告诉您口碑最好的${isPriceRange!}${TDKcateame!}报价,并为您购买最好的${isPriceRange!}${TDKcateame!}提供最新报价、价格、促销、评价、排行、图片等选购信息。">
<#elseif TDK.sortNo = 30>
    <#assign title = "最新${isPriceRange!}${TDKcateame!}价格,最新款${isPriceRange!}${TDKcateame!}报价【大全、品牌】${isGomeDeliv!}${isMarket!}-国美在线">
    <#assign keywords = "最新${isPriceRange!}${TDKcateame!},新款${isPriceRange!}${TDKcateame!},最新款${isPriceRange!}${TDKcateame!}价格,最新${isPriceRange!}${TDKcateame!}报价大全${isGomeDeliv!}${isMarket!}">
    <#assign description = "国美在线提供最新${isPriceRange!}${TDKcateame!}价格告诉您最新款${isPriceRange!}${TDKcateame!}报价,并为您购买最新${isPriceRange!}${TDKcateame!}提供最新报价、价格、促销、评价、排行、图片等选购信息。">
<#else>
    <#assign title = "${isPriceRange!}${TDKcateame!}报价,${isPriceRange!}${TDKcateame!}价格表【大全、品牌、行情、正品行货】${isGomeDeliv!}${isMarket!}-国美在线">
    <#assign keywords = "${isPriceRange!}${TDKcateame!}报价,${isPriceRange!}${TDKcateame!}价格表,${isPriceRange!}${TDKcateame!}报价大全,${isPriceRange!}${TDKcateame!}品牌${isGomeDeliv!}${isMarket!}">
    <#assign description = "国美在线销售${isPriceRange!}${TDKcateame!},并为你购买${isPriceRange!}${TDKcateame!}提供最新${isPriceRange!}${TDKcateame!}报价、${isPriceRange!}${TDKcateame!}价格、价格表、促销、参数、评价、排行、图片等选购信息.有国美，生活美！">
</#if>
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
    <meta http-equiv="mobile-agent" content="format=html5; url= http://m.gome.com.cn/category-${(searchObj.header.searchReq.catId)!}.html">
    <link rel="shortcut icon" href="//app.gomein.net.cn/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href='${(storeConfiguration.stageCssServer)!}/??<!--# include virtual="/n/common/b01/css.html"-->'>
    <link rel="stylesheet" href="${(storeConfiguration.stageCssServer)!}/??/css/n/detail/gCity.min.css,/search/search2016/css/search2015.min.css,/f2ecss/stage/overseasbuy/overseas-basic.min.css?${jsCssVersion!}">
    <!--# include virtual="/n/common/global/global.html"-->
    <#if (searchObj.header.serverInfo.refPage)!?index_of("-00-0-48-1-0-0-0-1-0-0-0-0-0-0-0-0-0")!=-1>
        <link rel="canonical" href="${(storeConfiguration.listSite)!}/${(searchObj.content.seoData.catId)!}.html"/>
    <#else>
        <link rel="canonical" href="${(searchObj.header.serverInfo.refPage)!?replace("/category/","/")}"/>
    </#if>
    <link rel="alternate" media="only screen and(max-width:640px)" href="http://m.gome.com.cn/category-${(searchObj.header.searchReq.catId)!}.html">
</head>
<body class="marketPage" data-page="list">
<div id="delscript">
    <script type="text/javascript">
        var winWidth = window.screen.width,objb = document.body;if (winWidth<=1024) {objb.className += " " +"w990"; }else {objb.className=objb.className.replace("w990", '');};
    </script>
</div>
<div style="display:none" id="severInfolist">
    server:${(searchObj.header.serverInfo.serverIp)!}<br/>
    from:${(searchObj.header.serverInfo.from)!}<br/>
    thread:${(searchObj.header.serverInfo.thread)!}<br/>
    job:${(searchObj.header.serverInfo.job)!}<br/>
    time:${(searchObj.header.serverInfo.time)!}<br/>
</div>
<#--nginx -->
<!--# include virtual="/n/common/b01/head.html"-->
<#--在本地测试环境引入公共头-->
<#--<#include "static/newHeader.html">-->
<#--热卖分类 推送少于4个的时候会异步请求大数据商品-->
<div class="nSearchWarp">
    <div class="hot-tj">
        <span class="icon_tj">热卖<br/>推荐</span>
        <#assign modelId="9000000000">
        <ul class="hot-list clearfix" id="hot-list" modelid=${modelId}>
        <#if (searchObj.content.recommends.size)?? && (searchObj.content.recommends.size >3)>
            <#assign recommendsPrds=(searchObj.content.recommends.products)!>
            <#list recommendsPrds as item>
                <li class="item" from="云眼">
                    <p class="pic">
                        <a target="_blank" class="bigD_item" href="${(item.skus.sUrl)!}" title="${(item.skus.name)!}" data-code="${modelId}-${item_index}" track="click|热卖推荐|box01|${item_index?if_exists}|${(item.pId)!}|三级列表：${(searchObj.content.selectData.category.third.name )!}|三级列表|${(searchObj.content.selectData.category.third.name )!}|0|0|0">
                            <img src="${(item.skus.sImg)!}_130.jpg" alt="1${(item.skus.alt)!}">
                        </a>
                    </p>
                    <p class="name">
                        <a target="_blank" class="bigD_item" href="${(item.skus.sUrl)!}" target="_blank" title="${(item.skus.name)!}" data-code="${modelId}-${item_index}" track="click|热销推荐|box01|${item_index?if_exists}|${(item.pId)!}|三级列表：${(searchObj.content.selectData.category.third.name )!}|三级列表|${(searchObj.content.selectData.category.third.name )!}|0|0|0">
                        ${(item.skus.name)!}
                        </a>
                    </p>
                    <p class="price">
                        <span>¥${(item.skus.price)!}</span>
                    </p>
                    <p class="btn">
                        <a target="_blank" class="bigD_item" href="${(item.skus.sUrl)!}" data-code="${modelId}-${item_index}" track="click|热销推荐|box01|${item_index?if_exists}|${(item.pId)!}|三级列表：${(searchObj.content.selectData.category.third.name )!}|三级列表|${(searchObj.content.selectData.category.third.name )!}|0|0|0" class="buy">立即抢购</a>
                    </p>
                </li>
            </#list>
        </#if>
        </ul>
    </div>
</div>
<#--面包屑-->
<div class="nSearchWarp">
    <#include "module/crumb_category.ftl" >
</div>
<#--facets分类-->
<div class="nSearchWarp nSearch-facets">
    <#include "module/facet_brand.ftl" >
    <#include "module/facet_price.ftl" >
    <#include "module/facet_common.ftl" >
</div>
<#--页面商品列表主体-->
<div class="nSearchWarp">
    <div class="nSearchWarp-main">
        <div class="product-right-box">
            <#include "module/prd_right.ftl" >
        </div>
        <div class="product-left-list" id="product-left">
            <#include "module/toolbar.ftl" >
            <#include "module/prdlist.ftl" >
        </div>
    </div>
</div>
<div class="nSearchWarp">
    <#--底部推广商品-->
    <#include "module/bottom_DSP_tuiguang.ftl">
    <#--猜你喜欢的商品-->
    <#include "module/bottom_mayBeLike.ftl">
    <#--最近浏览商品-->
    <#include "module/bottom_recentVisit.ftl">
</div>
<div id="search_info_box" style="display:none">
    <div id="searchReq">${searchReq!}</div>
    <div id="pageType">${pageType!}</div>
</div>
<!--# include virtual="/n/common/b01/aside.html"-->
<!--# include virtual="/n/common/b01/foot_new.html"-->
<script>
    var productId_list = "";
    var keyword = "";
    var order = [];
    var orderby=""
    var catid="";
    var s_account = "gome-prd,gome-higo-prd"
</script>
<script type="text/javascript">
    var isHyg = true//${(storeConfiguration.isHwg)!};
    var searchSite = "http://list.gomehigo.hk";
    var timerLazyload = null;
    var interVal = null;
    <#if asyncPrice>
        var asyncPrice = true;
    <#else>
        var asyncPrice = false;
    </#if>
</script>
<#include "module/pagejs.ftl">
<script>
<#if asyncPrice>
clearInterval(interVal)
timerLazyload = setInterval(priceInterval,1000)
<#else>
clearInterval(timerLazyload)
interVal=setInterval(nomalInterval,1000);   
</#if>
    $(function(){
        var  productId_list=""
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
            <#if (searchObj.content.pageBar.pageNumber)??>
                <#assign gomePageCur=(searchObj.content.pageBar.pageNumber)>
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
            var catMap ="${(firMenu.name)!}:${(secrMenu.name)!}:${(thirdMenu.name)!}";
            s.pageName="商品列表:${(thirdMenu.name)!}";
            s.channel=s.pageName.split(':')[0];
            s.prop1=s.pageName.split(':')[0]+":"+catMap.split(':')[0];
            s.prop2=s.pageName.split(':')[0]+":"+catMap.split(':')[0]+":"+catMap.split(':')[1];
            s.prop3="商品列表:"+catMap;
            s.prop4=s.pageName.split(':')[0];
            s.prop24="${classCur}:${gomePageCur!}";
            s.eVar3="分类浏览";
            s.eVar30="分类浏览";
            s.events="event50";
            s.eVar41="商品列表B";
            var url = window.location.pathname;
            var arr = url.split("-");
            if(arr[10] && arr[10]==1){s.eVar35 ="三级列表页:活动筛选";};
            s.products=";null;;;event50=1;eVar37=${(firMenu.name)!}:${(secrMenu.name)!}:${(thirdMenu.name)!}:${(thirdMenu.id)!}";
            var s_code=s.t();
            if(s_code)document.write(s_code);
        },2000);
    })
</script>
</body>
</html>