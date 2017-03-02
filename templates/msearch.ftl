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
    <link rel="stylesheet" href='<!--# include virtual="/n/common/b01/css.html"-->,/css/n/detail/gCity.min.css'>
    <link rel="stylesheet" href="http://localhost:8080/search2017/css/style.css">
    <!--# include virtual="/n/common/global/global.html"-->
</head>

<body class="marketPage" data-page="search">
<div id="delscript">
    <script type="text/javascript">
        var winWidth = window.screen.width,objb = document.body;if (winWidth<=1024) {objb.className += " " +"w990"; }else {objb.className=objb.className.replace("w990", '');};
    </script>
</div>
<#--nginx  -->
<!--# include virtual="/n/common/b01/head.html"-->
<#if searchObj.content.pageBar.totalCount != 0>
    <div class="nSearchWarp">
        <div class="nSearch-crumb nSearch-crumb-search clearfix">
            <span class="nSearch-crumb-keyWord" id="nSearch-crumb-keyWord"><b class="nFont14">${varSearchKeyWords!}</b></span>
            <span class="nSearch-crumb-searchNum" id="nSearch-crumb-searchNum">共 <em id="searchTotalNumber">${searchObj.content.seoData.totalCount!}</em> 个商品</span>
            <#--页面当前已经选择的分类-->
            <#include "module/facet/facet_selected.ftl">
        </div>
    </div>

    <#--facets分类-->
    <div class="nSearchWarp nSearch-facets searchFacet" id="module-facet">
        <#--【facet】品牌筛选项-->
        <#assign facetsBrands = (searchObj.content.facets.brand)!>
        <#if !(facetsBrands.selected)?? && (facetsBrands.items??)>
            <#include "module/facet/facet_brand.ftl" >
        </#if>

        <#--设置聚合筛选项的筛选条件 如果小于4个时候用普通分类补位-->
        <#if (searchObj.content.facets.hotCategory)?? && ((searchObj.content.facets.hotCategory)?size <= 4)>
            <#assign facetsCommonIndex= 4 - (searchObj.content.facets.hotCategory)?size />
        <#else>
            <#assign facetsCommonIndex= 4>
        </#if>

        <#--【facet】热门分类  【展示方式】有多少展示多少-->
        <#if (searchObj.content.facets.hotCategory)??>
            <#assign facetsHot = (searchObj.content.facets.hotCategory)!>
            <#assign displayType = "facets-hot">
            <#assign facethotitem = "facets-hot-item">
            <#list facetsHot as facetsItem>
                <#assign thisFacets = facetsItem>
                <#include "module/facet/facet_common.ftl">
            </#list>
            <#assign displayType = "">
            <#assign facethotitem = "">
        </#if>

        <#--【facet】普通分类  【展示方式】最多展示4个没，多余的放在聚合分类里面-->
        <#assign facetsCommon = (searchObj.content.facets.commonfacets)!>
        <#if facetsCommon?size &gt; 0>
            <#list facetsCommon as facetsItem>
                <#if facetsItem_index < facetsCommonIndex>
                    <#assign thisFacets = facetsItem>
                    <#include "module/facet/facet_common.ftl">
                </#if>
            </#list>
        </#if>

        <#--【facet】普通分类+相关分类  【展示方式】聚合展示-->
        <#assign facetsRelevant = (searchObj.content.facets.commomCatFacets)!>
        <#assign facetsSelect = (searchObj.content.selectData.facets.selectCat)!>
        <#if (facetsCommon?size >= facetsCommonIndex) || (facetsRelevant.items)?? && !facetsSelect>
            <div class="facets-category facets-category-syn clearfix">
                <span class="fc-key">高级筛选：</span>
                <div class="fc-content">
                    <#list facetsCommon as facetsItem>
                        <#if (facetsItem_index &gt; facetsCommonIndex) && (facetsItem_index &lt; 8)>
                            <#include "module/facet/facet_together.ftl">
                        </#if>
                    </#list>
                <#--相关分类facets-->
                <#if (facetsRelevant.items)?? && facetsRelevant.items ?size &gt; 0>
                    <#assign facetsItem = facetsRelevant>
                    <#assign displayType = "facets-rele">
                    <#include "module/facet/facet_together.ftl">
                </#if>
                </div>
            </div>
        </#if>
    </div>

    <#--页面商品列表主体-->
    <div class="nSearchWarp">
        <div class="nSearchWarp-main clearfix">
            <div class="product-right-box">
                <div id="prdRight-1"><#--店铺精选商品 dsp--></div>
                <div id="prdRight-2"><#--热销推荐商品 bigdata--></div>
                <div id="prdRight-3"><#--搜了还还购买了 bigdata--></div>
                <div id="prdRight-4"><#--推广活动位 dsp--></div>
            </div>
            <div class="product-left-list" id="product-left">
                <#include "module/toolbar.ftl" >
                <#include "module/prdlist.ftl" >
            </div>
        </div>
    </div>
<#else>
    <div class="nSearchWarp">
        <div class="listmain">
            <#assign searchReset=searchObj.content.commonInfo >
            <#if (searchReset.searchLevel)?? && (searchReset.searchLevel) == 4>
                <div class="srabox">非常抱歉，根据相关法律法规和政策，无法显示与<span>“${(searchObj.content.commonInfo.illegal)!}”</span>相关的商品。</div>
            <#elseif (searchObj.header.searchReq.et)?? && (searchObj.header.searchReq.et) !=''>
                <div class="srabox">非常抱歉，没有找到与<span>“${(searchObj.header.searchReq.et)!}”</span>相关的商品。</div>
            <#elseif (searchObj.content.selectData.keywords)??>
                <div class="srabox">非常抱歉，没有找到与<span>“${(searchObj.content.selectData.keywords)!}”</span>相关的商品。</div>
            <#elseif (searchReset.searchLevel)?? && (searchReset.searchLevel) == 5>
                <div class="srabox">非常抱歉，没有找到与<span>“${(searchObj.content.selectData.keywords)!}”</span>相关的商品。</div>
            </#if>
            <em></em> <i></i>
        </div>
    </div>
</#if>

<div id="lazyajaxloadarea"><div></div></div>
<div class="nSearchWarp">
    <div id="prdBottom-1"><#--推广商品（有搜索结果） dsp 或者 热销推荐商品（无搜索结果） bigdata--></div>
    <div id="prdBottom-2"><#--猜你喜欢 bigdata--></div>
    <div id="prdBottom-recent"><#--最近浏览--></div>
</div>
<!--# include virtual="/n/common/b01/aside.html"-->
<!--# include virtual="/n/common/b01/foot_new.html"-->
<script>
    var productId_list = "";
    var keyword = "";
    var order = [];
    var orderby= "";
    var catid= "";
    var s_account = "gome-prd,gome-higo-prd";
</script>
<script type="text/javascript">
    var isHyg = true//${(storeConfiguration.isHwg)!};
    window.pageName = '海外购搜索结果页';
</script>
<#include "module/pagejs.ftl">
<script src="${(storeConfiguration.stageJsServer)!}/search2017/js/msearch.bundle.js"></script>
</body>
</html>