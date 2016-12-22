<#--商品三级分类列表分类价格facets 搜索结果页面没有-->
<#assign facetsPrice = (searchObj.content.facets.price)!>
<#if (facetsPrice.items)?? && !(facetsPrice.selected)??>
<div class="facets-category facets-category-common clearfix">
    <div class="fc-option">
        <span class="fc-option-multiple fc-visiable">多选</span>
        <span class="fc-option-more"><i></i>更多</span>
    </div>
    <span class="fc-key">${facetsPrice.label!}：</span>
    <div class="fc-content">
        <div class="category-normal">
            <ul class="clearfix" modelid="9000000400">
                <#if facetsPrice.items??>
                    <#list facetsPrice.items as item>
                        <li><a class="emcodeProp17" data-code="9000000400-${(item_index)!}" track="${facetsPrice.label!}:${item.value!}" href="${searchSite!}${(item.url)!}" facetsId="${item.id!}">${item.value!}</a></li>
                    </#list>
                </#if>
            </ul>
        </div>
    </div>
</div>
</#if>