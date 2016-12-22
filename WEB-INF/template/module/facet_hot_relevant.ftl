<#--热门分类facets 可能会没有 对标京东版本 相关分类移动到聚合处展示-->
<#assign c1Ids = ""/>
<#assign c3Ids = ""/>
<#if (searchObj.content.facets.hotCategory)?? && !(searchObj.content.selectData.facets.catfacets)??>
    <#assign facetsHot = searchObj.content.facets.hotCategory>
    <#list facetsHot as facetsItem>
        <#if facetsItem_has_next>
            <#assign c1IdsSplit = ","/>
        <#else>
            <#assign c1IdsSplit = ""/>
        </#if>
        <#if (facetsHot?size > 1)>
            <#assign c1Ids = c1Ids + "${facetsItem.id!}${c1IdsSplit!}"/>
        </#if>
        <div class="facets-category facets-category-common clearfix">
            <div class="fc-option">
                <span class="fc-option-multiple fc-visiable">多选</span>
                <span class="fc-option-more"><i></i>更多</span>
            </div>
            <span class="fc-key"><b>${facetsItem.name!}：</b></span>
            <div class="fc-content">
                <div class="category-normal">
                    <ul class="clearfix" modelid="9000000300">
                        <#list facetsItem.items as item>
                            <#if item_has_next>
                                <#assign c3IdsSplit = ","/>
                            <#else>
                                <#assign c3IdsSplit = ""/>
                            </#if>
                            <#assign c3Ids = c3Ids + "${item.id!}${c3IdsSplit!}"/>
                            <li><a class="facet" data-code="9000000300-${(item_index)!}" href="${searchSite!}${(item.url)!}" facetsId="${item.id!}"><i></i>${item.name!}</a></li>
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
</#if>

<#--其他分类 如果是品牌页不展示该内容-->
<#assign webUrl = searchObj.header.serverInfo.refPage>
<#if webUrl?? && (webUrl?index_of("brand") == -1)>
    <#if (searchObj.content.facets.commonfacets)??>
        <#assign facetsCommon = (searchObj.content.facets.commonfacets)!>
        <#list facetsCommon as facetsItem>
            <#if facetsItem_index < facetsCommonIndex>
                <div class="facets-category facets-category-common clearfix">
                    <div class="fc-option">
                        <span class="fc-option-multiple">多选</span>
                        <span class="fc-option-more"><i></i>更多</span>
                    </div>
                    <span class="fc-key">${facetsItem.label!}：</span>
                    <div class="fc-content">
                        <div class="category-normal">
                            <#if (facetsItem_index > 9)>
                                <#assign modelId ="90000005${facetsItem_index}"/>
                            <#else>
                                <#assign modelId ="900000050${facetsItem_index}"/>
                            </#if>
                            <ul class="clearfix" modelid="${modelId}">
                                <#list facetsItem.items as item>
                                    <li><a class="facet" data-code="${modelId}-${item_index}" href="${searchSite!}${(item.url)!}" facetsId="${item.id!}"><i></i>${item.value!}</a></li>
                                </#list>
                            </ul>
                        </div>
                        <div class="fc-btn-box">
                            <a class="fc-btn-ok fc-disable" href="javascript:void(0)">确定</a>
                            <a class="fc-btn-cancel" href="javascript:void(0)">取消</a>
                        </div>
                    </div>
                </div>
            </#if>
        </#list>
    </#if>
</#if>