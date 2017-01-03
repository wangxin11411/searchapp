<#assign TDK = searchObj.content.seoData>
<#assign selectD = searchObj.content.selectData>
<#assign quession = "${(selectD.keywords)?if_exists}">
<#assign prdBrand = "">
<#assign hotFacet = "">
<#if (TDK.hasBrand)??>
    <#list selectD.facets.brand.items as item>
        <#assign prdBrand = prdBrand + "${(item.value)!}">
    </#list>
</#if>
<#if (selectD.facets.selectCat)?? && (selectD.facets.selectCat?string == "true")>
    <#assign hotFacet = "${(selectD.facets.catfacets.name)!}">
</#if>
<#assign title = "${prdBrand!}${hotFacet!}${(TDK.otherFacet)!}${quession!}性价比_${prdBrand!}${hotFacet!}${(TDK.otherFacet)!}${quession!}规格_${prdBrand!}${hotFacet!}${(TDK.otherFacet)!}${quession!}系列_导购_国美在线">
<#assign keywords = "${prdBrand!}${hotFacet!}${(TDK.otherFacet)!}${quession!}性价比,${prdBrand!}${hotFacet!}${(TDK.otherFacet)!}${quession!}规格,${prdBrand!}${hotFacet!}${(TDK.otherFacet)!}${quession!}系列,${prdBrand!}${hotFacet!}${(TDK.otherFacet)!}${quession!}导购">
<#assign description =  "国美在线搜索为您提供${prdBrand!}${hotFacet!}${(TDK.otherFacet)!}${quession!}性价比最高的商品信息,包含了${prdBrand!}${hotFacet!}${(TDK.otherFacet)!}${quession!}规格,${prdBrand!}${hotFacet!}${(TDK.otherFacet)!}${quession!}系列等内容,了解更多${prdBrand!}${hotFacet!}${(TDK.otherFacet)!}${quession!}导购信息,就上国美在线!正品行货，价格更低,24小时按需配送,为您提供便捷、诚信的服务.">
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
    <link rel="shortcut icon" href="//app.gomein.net.cn/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href='${(storeConfiguration.stageCssServer)!}/??<!--# include virtual="/n/common/b01/css.html"-->'>
    <link rel="stylesheet" href="${(storeConfiguration.stageCssServer)!}/??/css/n/detail/gCity.min.css,/search/search2016/css/search2015.min.css,/f2ecss/stage/overseasbuy/overseas-basic.min.css?${jsCssVersion!}">
    <!--# include virtual="/n/common/global/global.html"-->
</head>

<body class="marketPage" data-page="search">
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
<#--nginx  -->
<!--# include virtual="/n/common/b01/head.html"-->
<#if searchObj.content.pageBar.totalCount != 0>
    <#include "module/searchResults.ftl" >
<#else>
    <#include "module/searchResultsNo.ftl">
</#if>

<div class="nSearchWarp">
    <#--底部推广商品-->
    <#include "module/bottom_DSP_tuiguang.ftl">
    <#--猜你喜欢的商品-->
    <#include "module/bottom_mayBeLike.ftl">
    <#--最近浏览商品-->
    <#include "module/bottom_recentVisit.ftl">
</div>
<div id="search_info_box"  style="display:none">
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
    var searchSite = "${(storeConfiguration.mSearchSite)!}";
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
        //getRelevant_search.init();

        window.setTimeout(function(){
            <#if searchObj.content??>
                <#if (searchObj.content.selectData.keywords)??>
                    <#assign gomeResultWord=(searchObj.content.selectData.keywords)?replace('\\','')?replace('\"','')>
                </#if>
                <#if (searchObj.content.pageBar.pageNumber)??>
                    <#assign gomePageCur=(searchObj.content.pageBar.pageNumber)>
                </#if>
                <#if (searchObj.content.pageBar.totalCount)??>
                    <#assign gomePageTotal=(searchObj.content.pageBar.totalCount)>
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
                <#if (searchObj.header.tagWightVersion)??>
                    <#assign version=(searchObj.header.tagWightVersion)>
                </#if>
                var pageCur = $(".page-nav .num em").html();
                s.pageName = "站内搜索:搜索结果页:${(gomeResultWord)!}";
                s.channel = s.pageName.split(':')[0];
                s.prop1 = s.pageName;
                s.prop2 = s.pageName;
                s.prop3 = s.pageName;
                s.prop4 = <#if (((searchObj.header.isNotContains??) && searchObj.header.isNotContains=true) && (searchObj.content.prodInfo.products?size = 0))>"站内搜索失败页面"<#else>"站内搜索成功页面"</#if>;
                s.prop23 = "站内搜索:${(gomeResultWord)!}:全部";
                s.prop24 = "${classCur!}:${(gomePageCur)!}";
                s.eVar1 = "一般搜索:${(gomeResultWord)!}";
                s.eVar1 = "一般搜索:${(gomeResultWord)!}";
                s.eVar7 =${(gomePageTotal)!};
                s.eVar3 = "站内搜索";
                s.eVar30 = "站内搜索";
                s.eVar41 = "站内搜索${(version)!}";
                var url = window.location.search;
                var arr = url.split("&");
                for (var i = 0, j = arr.length; i < j; i++) {
                    if (arr[i] == "promoFlag=1") {
                        s.eVar35 ="搜索结果页:活动筛选";
                        break;
                    }
                }
                var s_code = s.t();
                if (s_code)document.write(s_code);
        },2000);
    })
</script>
</body>
</html>