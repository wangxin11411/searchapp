<div id="prdRight-1"><#--搜索-店铺精选商品 dsp--></div>
<div id="prdRight-2"><#--搜索-热销推荐商品 bigdata--></div>
<div id="prdRight-3"><#--搜索-搜了还还购买了 bigdata--></div>
<div id="prdRight-4"><#--搜索-推广活动位 dsp--></div>


<div id="prdRight-5"><#--列表页一周销量排行--></div>

<#if searchObj.content.selectData.isSearch>
    <#--搜索结果页面 热销商品 最终购买了-->
    <div class="prd-right-normal" style="display: none">
        <h3 class="hd">热销推荐</h3>
        <ul class="bd" id="bigD_rexiao"></ul>
    </div>
    <#--搜了此类商品的用户还买了-->
    <div class="prd-right-normal" style="display: none">
        <h3 class="hd">搜了此类商品的用户还买了</h3>
        <ul class="bd" id="bigD_liulan"></ul>
    </div>
    <#--列表页dsp店铺活动推荐-->
    <div class="prd-right-normal" style="display: none" id="dsp_advertisement"></div>
<#else>
    <#--列表页一周销量排行-->
    <div class="prd-right-normal" style="display: none">
        <h3 class="hd">一周销量排行榜</h3>
        <ul class="sell-product" id="bigD_weekTop"></ul>
    </div>
    <#--列表页dsp店铺活动推荐-->
    <div class="prd-right-normal" style="display: none" id="dsp_advertisement"></div>
    <#--最终购买了-->
    <div class="prd-right-normal" style="display: none">
        <h3 class="hd">浏览此类商品的用户最终买了</h3>
        <ul class="bd" id="bigD_finalBuy"></ul>
    </div>
    <#--购买了还购买了-->
    <div class="prd-right-normal" style="display: none">
        <h3 class="hd">购买此类商品的用户还购买了</h3>
        <ul class="bd" id="bigD_alsoBuy"></ul>
    </div>

</#if>


<#--搜索组个性推荐商品 展示 只有走索结果页面才添加具体商品-->
<div id="personrecommend-warp"><div class="personrecommend prd-right-normal" id="personrecommend"></div></div>


