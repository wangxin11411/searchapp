<#if varSelectData.isSearch>
    <#assign cleanURL="/search?question=${varSearchKeyWords!}&intcmp=search-9000001100-0">
    <#if isGomehigo>
        <#assign cleanURL="/search?question=${varSearchKeyWords!}&market=11&marketPage=1&intcmp=search-9000001100-0">
    </#if>
<#else>
    <#assign cleanURL="${varSeoData.catId!}.html?intcmp=list-9000001100-0">
</#if>
<a id="clearallfacts" class="nSearch-crumb-clearFacets" href="${cleanURL!}">全部清空</a>
<div class="nSearch-crumb-facetsCurrent-warp" id="nSearch-crumb-facetsCurrent-warp">
    <ul class="nSearch-crumb-facetsCurrent">
        <#--页面当前已经选择的分类-->
        <#assign pageFacets = (varSelectData.facets)!>
        <#--已选的品牌分类facets-->
        <#if (pageFacets.brand)??>
        <#assign pageFacetsBrand_choose = "" />
        <#assign pageFacetsBrand_choose_id = "" />
        <#list pageFacets.brand.items as childItem>
            <#assign pageFacetsBrand_choose = pageFacetsBrand_choose+ "${childItem.value!}、" />
            <#assign pageFacetsBrand_choose_id = pageFacetsBrand_choose_id+ ",${childItem.id!}" />
        </#list>
        <li id="brandChoose" brandId="${pageFacetsBrand_choose_id!}"><a href="${pageFacets.brand.url!}"><i>×</i><em>${pageFacets.brand.label!}：</em>${pageFacetsBrand_choose!}</a></li>
        </#if>
        <#--已选的分类列表页价格facets-->
        <#if (pageFacets.price)??>
            <#assign pageFacetsPrice_choose = "" />
            <#list pageFacets.price.items as childItem>
                <#assign pageFacetsPrice_choose = pageFacetsPrice_choose+ "${childItem.value!}、" />
            </#list>
            <li><a href="${pageFacets.price.url!}"><i>×</i><em>${pageFacets.price.label!}：</em>${pageFacetsPrice_choose!}</a></li>
        </#if>
        <#--搜索结果页 只会有一个 热门或者相关分类facets-->
        <#if (pageFacets.catfacets)??>
            <li><a href="${pageFacets.catfacets.url!}"><i>×</i><em>分类：</em>${pageFacets.catfacets.name!}</a></li>
        </#if>
        <#--普通分类facets-->
        <#if (pageFacets.commonfacets)?? && (pageFacets.commonfacets)?size &gt; 0>
        <#list pageFacets.commonfacets as item>
        <#assign pageFacetsCommon_choose = "" />
        <#list item.items as childItem>
            <#assign pageFacetsCommon_choose = pageFacetsCommon_choose+ "${childItem.value!}、" />
        </#list>
        <li><a href="${item.url!}"><i>×</i><em>${item.label!}：</em>${pageFacetsCommon_choose!}</a></li>
        </#list>
        </#if>
    </ul>
    <a href="javascript:void(0)" class="facetsCurrent-prev fc-btn"></a>
    <a href="javascript:void(0)" class="facetsCurrent-next fc-btn"></a>
</div>