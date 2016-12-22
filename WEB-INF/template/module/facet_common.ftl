<#--普通分类facets 分类列表页全部展示-->
<#assign facetsCommon = (searchObj.content.facets.commonfacets)! />
<#assign showThreshold = 5 />
<#assign showThresholdText = "" />
<#if (searchObj.content.facets.brand)??>
    <#assign showThreshold=showThreshold-1 />
</#if>
<#if (searchObj.content.facets.price)??>
    <#assign showThreshold= showThreshold - 1 />
</#if>
<#list facetsCommon as facetsItem>
    <#if (facetsItem_index >=  showThreshold)>
    <div class="facets-category facets-category-common fc-hide clearfix">
    <#assign showThresholdText =showThresholdText+ "," + (facetsItem.label)!/>
    <#else>
    <div class="facets-category facets-category-common clearfix">
    </#if>
    <div class="fc-option">
        <span class="fc-option-multiple">多选</span>
        <span class="fc-option-more"><i></i>更多</span>
    </div>
    <span class="fc-key">${facetsItem.label!}：</span>
    <div class="fc-content">
        <div class="category-normal">
            <#if (facetsItem_index > 9)>
                <#assign modelId ="90000005${(facetsItem_index)!}"/>
            <#else>
                <#assign modelId ="900000050${(facetsItem_index)!}"/>
            </#if>
            <ul class="clearfix" modelid="${modelId!}">
                <#list facetsItem.items as item>
                    <li><a class="facet" data-code="${modelId!}-${(item_index)!}" href="${searchSite!}${(item.url)!}" facetsId="${item.id!}"><i></i>${item.value!}</a></li>
                </#list>
            </ul>
        </div>
        <div class="fc-btn-box">
            <a class="fc-btn-ok fc-disable" href="javascript:void(0)">确定</a>
            <a class="fc-btn-cancel" href="javascript:void(0)">取消</a>
        </div>
    </div>
</div>
</#list>
<#if facetsCommon?size &gt; showThreshold>
    <div class="fccc-control-warp">
        <span class="fccc-control"  id="fc-common-show">更多选项（${showThresholdText?substring(1)}）</span>
        <span class="fccc-up" id="fc-common-hide">收起&nbsp;&nbsp;</span>
    </div>
</#if>
