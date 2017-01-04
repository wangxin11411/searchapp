<div class="product-box">
<div class="product-waiting" id="product-waiting"></div>
    <ul class="product-lists clearfix" id="product-box">
    <#if (searchObj.content.prodInfo.products)??>
        <#list searchObj.content.prodInfo.products as prd>
        <li class="product-item">
            <ul class="arbitrage clearfix">
                <#if (prd.taoGou)??>
                    <#list prd.taoGou as prdT>
                        <#if prdT_index<3>
                            <li class="arbitrage-num">${prdT.num!}件套</li>
                        </#if>
                    </#list>
                </#if>
            </ul>

            <div class="item-tab-warp">
                <p class="item-pic"><a class="emcodeItem item-link" target="_blank" track="产品列表图片" href="${(prd.sUrl)!}"  title="${(prd.alt)?html}"><img gome-src="${(prd.sImg)!}_210.jpg" alt="${(prd.alt)?html}" src="${greyGif!}"></a></p>
                <#if prd.images??>
                    <div class="item-pic-small-box">
                        <#if (prd.images?size > 5)>
                            <a href="javascript:void(0);" class="icon-prev disable" onClick="javascript:smallImgSprev(this)"></a>
                            <a href="javascript:void(0);" class="icon-next" onClick="javascript:smallImgSnext(this)"></a>
                        </#if>
                        <div class="item-pic-small-wrap">
                            <ul class="imgList">
                                <#list prd.images as thumbnail>
                                    <#if (thumbnail_index < 10)>
                                        <li class="">
                                            <a href="javascript:void(0);" title="${(thumbnail.color)!}">
                                                <img alt='${(thumbnail.color)!}' src="${greyGif!}" />
                                            </a>
                                        </li>
                                    </#if>
                                </#list>
                            </ul>
                        </div>
                    </div>
                </#if>
                <div class="item-price-info">
                    <div class="item-price">
                        <span class="price"></span>
                        <#if (prd.goodsType??) && (prd.goodsType == "ZC2M")>
                            <span class="promotion-c2m"></span>
                        </#if>
                        <#if (prd.marketTag??) && (prd.marketTag == 1)>
                            <span class="promotion-hwg"></span>
                        </#if>
                        <#if (prd.allPromos??) && (prd.allPromos?size &gt; 0)>
                            <#list prd.allPromos as promotion>
                                <span class="promotion-normal">${(promotion.name)!}</span>
                            </#list>
                        </#if>
                    </div>
                </div>

                <p class="item-name"><a class="emcodeItem item-link"  href="${(prd.pUrl)!}" title="${(prd.alt)?html}" target="_blank">${(prd.name)!}</a></p>
                <#if (prd.promoDesc)?? >
                    <p class="item-promotional-language">
                    ${(prd.promoDesc)?html}
                    </p>
                </#if>

                <p class="item-comment-dispatching">
                    <span class="dispatching">${(prd.skus.cityName)!}有货</span>
                    <a href="${(prd.pUrl)!}#j-comment-section" target="_blank" class="comment">${(prd.evaluateCount)!}</a>
                </p>

                <p class="item-option clearfix">
                    <span class="add-contrast display-page-compare-checkbox"></span>
                    <span class="add-collection">收藏</span>
                    <span class="add-cart addTo-cart">加入购物车</span>
                </p>

                <p class="item-shop">
                    <#if (prd.thirdProduct??) && (prd.thirdProduct)>
                        <a class="nname" target="_blank" href="${(prd.mUrl)!}">${(prd.sName)!}</a>
                    <#else>
                        <span class="nname">国美自营</span>
                    </#if>
                </p>
            </div>
        </li>
        </#list>
    </#if>
    </ul>
    <div class="clearfix" id="product-pager">
        <div class="pager" id="j-page"></div>
    </div>
</div>