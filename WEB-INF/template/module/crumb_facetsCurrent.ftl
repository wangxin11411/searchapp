<#--页面当前已经选择的分类-->
<#assign pageFacets = (searchObj.content.selectData.facets)!>

<#--已选的品牌分类facets-->
<#if (pageFacets.brand)??>
<#assign pageFacetsBrand_choose = "" />
<#list pageFacets.brand.items as childItem>
    <#assign pageFacetsBrand_choose = pageFacetsBrand_choose+ "${childItem.value!}、" />
    <#assign brandIds = brandIds + "${childItem.id!}、" />
</#list>
<li><a href="${searchSite!}${pageFacets.brand.url!}"><i>×</i><em>${pageFacets.brand.label!}：</em>${pageFacetsBrand_choose!}</a></li>
</#if>

<#--已选的分类列表页价格facets-->
<#if (pageFacets.price)??>
    <#assign pageFacetsPrice_choose = "" />
    <#list pageFacets.price.items as childItem>
        <#assign pageFacetsPrice_choose = pageFacetsPrice_choose+ "${childItem.value!}、" />
    </#list>
    <li><a href="${searchSite!}${pageFacets.price.url!}"><i>×</i><em>${pageFacets.price.label!}：</em>${pageFacetsPrice_choose!}</a></li>
</#if>

<#--搜索结果页 只会有一个 热门或者相关分类facets-->
<#if (pageFacets.catfacets)??>
    <li><a href="${searchSite!}${pageFacets.catfacets.url!}"><i>×</i><em>分类：</em>${pageFacets.catfacets.name!}</a></li>
</#if>

<#--普通分类facets-->
<#if (pageFacets.commonfacets)?? && (pageFacets.commonfacets)?size &gt; 0>
<#list pageFacets.commonfacets as item>
<#assign pageFacetsCommon_choose = "" />
<#list item.items as childItem>
    <#if childItem_has_next>
        <#assign pageFacetsSplite = "、" />
    <#else>
        <#assign pageFacetsSplite = "" />
    </#if>
    <#assign pageFacetsCommon_choose = pageFacetsCommon_choose+ "${childItem.value!}${pageFacetsSplite!}" />
</#list>
<li><a href="${searchSite!}${item.url!}"><i>×</i><em>${item.label!}：</em>${pageFacetsCommon_choose!}</a></li>
</#list>

</#if>
