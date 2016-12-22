<#--普通分类 和 相关分类 搜索结果页面聚合展示-->
<#assign categorySelect = (searchObj.content.selectData.facets)!>
<#assign facetsCommon = (searchObj.content.facets.commonfacets)!>
<#assign facetsRelevant = (searchObj.content.facets.commomCatFacets)!>
<#if (facetsCommon?size>facetsCommonIndex) || (facetsRelevant.items??&&(facetsRelevant.items)?size > 0 && categorySelect.selectCat?? && !categorySelect.selectCat)>
<div class="facets-category facets-category-syn clearfix">
    <span class="fc-key">高级筛选：</span>
    <div class="fc-content">
    <#list facetsCommon as facetsItem>
        <#if (facetsItem_index >= facetsCommonIndex) && (facetsItem_index < 8)>
        <dl class="category-syn">
            <dt class="category-syn-tit">${facetsItem.label!}<i></i></dt>
            <dd class="category-syn-con">
                <ul class="category-syn-list clearfix">
                    <#list facetsItem.items as item>
                        <li facetsid ="${item.id!}" class="facet"><i></i>${item.value!}</li>
                    </#list>
                </ul>
                <p class="category-syn-btn">
                    <a href="javascript:void(0)" class="fc-btn-ok  fc-disable">确定</a>
                    <a href="javascript:void(0)" class="fc-btn-cancel">取消</a>
                </p>
            </dd>
        </dl>
        </#if>
    </#list>
    <#--相关分类facets-->
    <#if !(selectCat.catfacets)??&&facetsRelevant.items?? &&(facetsRelevant.items)?size &gt; 0>
        <dl class="category-syn">
            <dt class="category-syn-tit">其他分类<i></i></dt>
            <#assign modelId = "9000002400"/>
            <dd class="category-syn-con clearfix" modelid="${modelId!}">
                <#list facetsRelevant.items as item>
                    <a href="${searchSite!}${(item.url)!}" class="category-syn-list-rel" data-code="${modelId!}-${(item_index)!}">${item.name!}</a>
                </#list>
            </dd>
        </dl>
    </#if>
    </div>
</div>
</#if>