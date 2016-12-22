<#--站点搜索结果search.gome.com.cn还是列表list.gome.con.cn-->




<#if searchObj.content.selectData.isSearch>

    <#assign searchKeyWords = "${searchObj.header.searchReq.question!}">
    <#assign pageType = "search">
    <#assign pageName = "搜索结果页">
<#else>
    

    <#assign pageType = "category">
    <#assign pageName = "分类列表页">
</#if>
<#--默认占位图片-->
<#assign greyGif ="//app.gomein.net.cn/images/grey.gif">

<#--品牌图片地址2015.12.28     -->
<#assign brandLogoUrl ="http://img.gomein.net.cn/image">



<#assign jsCssVersion = "1101">





<#assign varSearchKeyWords = "${searchObj.header.searchReq.question!}">
<#--品牌图片搜索项目下的地址 搜索指向-->
<#assign varBrandLogo ="${(storeConfiguration.stageJsServer)!}/search/brandlogo/">

<#if storeConfiguration.isHwg == "1">
    <#assign isGomehigo = true>
<#else>
    <#assign isGomehigo = false>
</#if>

<#if searchObj.content.selectData.isSearch>
    <#if isGomehigo>
        <#assign varWebsite="${(storeConfiguration.msearchSite)!}">
    <#else>
        <#assign varWebsite="${(storeConfiguration.searchSite)!}">
    </#if>
<#else>
    
    <#if isGomehigo>
        <#assign varWebsite ="${storeConfiguration.mlistSite}">
    <#else>
        <#assign varWebsite ="${storeConfiguration.listSite}">
    </#if>
</#if>