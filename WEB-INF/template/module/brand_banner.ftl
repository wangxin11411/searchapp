<#assign modelId = "9000002300"/>
<#if searchObj.content.banner.type ==1>
    <#assign shopurl="${searchObj.content.banner.shopurl!}"/>
<#else>
    <#assign shopurl="http://mall.gome.com.cn/${searchObj.content.banner.shopId!}"/>
</#if>
<div class="search-brand">
    <div class="brand-info clearfix" modelid="${modelId!}">
        <div class="brand-info-logo">
            <a data-code="${modelId!}-0" href="${shopurl!}" target="_blank">
                <#if searchObj.content.banner.logo?? && searchObj.content.banner.logo !="">
                    <img src="${brandLogoUrl!}/prodimg${searchObj.content.banner.logo!}">
                <#elseif (searchObj.content.banner.brand.en)??>
                    <span class="color-r">${searchObj.content.banner.brand.en!}</span>
                <#else >
                    <span class="color-r">${searchObj.content.banner.brand.ch!}</span>
                </#if>
            </a>
        </div>
        <div class="brand-info-main">
            <div class="shop-name" style="margin-top:10px;">
                    <a data-code="${modelId!}-1" href="${shopurl!}" class="title" target="_blank">${searchObj.content.banner.name!}</a>
                <#if (searchObj.content.banner.type)?? && searchObj.content.banner.type ==1>
                    <span class="gome-zy">国美自营</span>
                </#if>
            </div>
            <!-- <div class="shop-info">
                <span class="shop-info-l">主营品牌：</span>
                <span class="shop-info-m">海尔（Hairer）</span>
            </div> -->
        </div>
        <div class="brand-info-pj">
            <dl class="pj-score">
                <dt class="score-titl">
                    <span>综合评分</span>
                    <span>商品</span>
                    <span>服务</span>
                    <span>时效</span>
                </dt>
                <dd class="score-cont">
                    <span>
                        <em class="color-r">${searchObj.content.banner.zhscore!}</em>
                        <i></i>
                    </span>
                    <span >
                        <!-- <i class="score-img score-down"></i> -->
                        <em class="color-r">${searchObj.content.banner.prdscore!}</em>
                    </span>
                    <span>
                        <!-- <i class="score-img score-down"></i> -->
                        <em class="color-r">${searchObj.content.banner.srvscore!}</em>
                    </span>
                    <span>
                        <!-- <i class="score-img score-up"></i> -->
                        <em class="color-r">${searchObj.content.banner.tmsocre!}</em>
                    </span>
                </dd>
            </dl>
            <div class="shop-enter">
                    <a data-code="${modelId}-2" target="_blank" href="${shopurl!}">进入店铺</a>
            </div>
        </div>
    </div>
</div>
