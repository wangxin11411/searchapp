<#--分类列表页面包屑-->
<#assign pageCategory = (searchObj.content.selectData.category)!>
<div class="nSearch-crumb clearfix">
    <#if isHyg=='1'>
        <a id="clearallfacts" class="nSearch-crumb-clearFacets" href="${searchSite!}/${concrete_url!}.html">全部清空</a>
    <#else>
        <a id="clearallfacts" class="nSearch-crumb-clearFacets" href="${searchSite!}/${concrete_url!}-00-0-48-1-0-0-0-1-0-0-0-11-0-0-0-0-0.html">全部清空</a>
    </#if>
    
    <span id="category-first" catgoryId="${(pageCategory.fir.id)!}" data-code="9000000101-1" class="nSearch-crumb-tit-category">${(pageCategory.fir.name)!}</span>
    <dl class="nSearch-crumb-category"  catgoryId="${(pageCategory.sec.id)!}" id="category-second">
        <dt class="category-name">${(pageCategory.sec.name)!}</dt>
        <dd class="category-box clearfix" id="category-box-second" modelid="9000000102">
        </dd>
    </dl>
    <#if (pageCategory.third)??>
        <dl class="nSearch-crumb-category" catgoryId="${(pageCategory.sec.id)!}" id="category-third">
            <dt class="category-name">${(pageCategory.third.name)!}</dt>
            <dd class="category-box"  id="category-box-third" modelid="9000000103">
                <#if (pageCategory.sec.childs)?? && (pageCategory.sec.childs?size gt 0)>
                    <#list pageCategory.sec.childs as thirdItem>
                        <a href="${searchSite!}${(thirdItem.url)!}" data-code="9000000103-${(thirdItem_index+1)!}">${(thirdItem.name)!}</a>
                    </#list>
                </#if>
            </dd>
        </dl>
    </#if>
    <a id="clearallfacts" class="nSearch-crumb-clearFacets" href="javascript:void(0)">全部清空</a>
    <div class="nSearch-crumb-facetsCurrent-warp" id="nSearch-crumb-facetsCurrent-warp">
        <ul class="nSearch-crumb-facetsCurrent">
            <#include "crumb_facetsCurrent.ftl">
        </ul>
        <a href="javascript:void(0)" class="facetsCurrent-prev fc-btn"></a>
        <a href="javascript:void(0)" class="facetsCurrent-next fc-btn"></a>
    </div>
</div>
<div class="nSearchWarp nSearch-crumb-category-results">
    <span class="nFont14"><b class="nHeigh">${(pageCategory.third.name)!}</b>商品筛选</span>
    <span>共 <em id="searchTotalNumber">${searchObj.content.seoData.totalCount!}</em> 个商品</span>
</div>