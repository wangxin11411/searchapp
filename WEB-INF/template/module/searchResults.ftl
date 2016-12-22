<#--面包屑-->
<div class="nSearchWarp">
<#include "crumb_search.ftl" >
</div>

<#if searchObj.header.isContainsFlow?? && searchObj.header.isContainsFlow>
    <div class="nSearchWarp"><iframe id="xnframe" src="http://game${(storeConfiguration.cookieDomain)!}/gamecard/game/searchvms.html?question=${(searchObj.header.searchReq.question)!}" width="100%" frameborder="0" scrolling="no"></iframe></div>
</#if>
<#--facets分类-->
<div class="nSearchWarp nSearch-facets searchFacet" id="module-facet">
    <#--设置聚合筛选项的筛选条件 如果小于4个时候用普通分类补位-->
    <#if (searchObj.content.facets.hotCategory)?? && ((searchObj.content.facets.hotCategory)?size <= 4)>
        <#assign facetsCommonIndex= 4 - (searchObj.content.facets.hotCategory)?size />
    <#else>
        <#assign facetsCommonIndex= 4>
    </#if>
    <#--如果搜索结果页搜索的是品牌，会展示推荐品牌店铺，隐藏品牌facet筛选项-->
    <#if searchObj.content.banner?? && isHyg !="1">
        <#include "brand_banner.ftl">
    <#else>
        <#include "facet_brand.ftl" >
    </#if>
    <#include "facet_hot_relevant.ftl" >
    <#include "facet_common_syn.ftl" >
</div>
<#--页面商品列表主体-->
<div class="nSearchWarp">
    <div class="nSearchWarp-main clearfix">
        <div class="product-right-box">
        <#include "prd_right.ftl" >
        </div>
        <div class="product-left-list" id="product-left">
        <#include "toolbar.ftl" >
        <#include "prdlist.ftl" >
        </div>
    </div>
    <#include "searchBottomBox.ftl" >
</div>