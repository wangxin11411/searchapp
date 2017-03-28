<#assign varSelectData = searchObj.content.selectData>
<#assign varPageBar = searchObj.content.pageBar>
<#assign varSeoData = searchObj.content.seoData>
<#assign varHeader = searchObj.header>

<#if varSelectData.marketPage == "1">
    <#assign isGomehigo = true>
<#else>
    <#assign isGomehigo = false>
</#if>
<#assign greyGif ="//app.gomein.net.cn/images/grey.gif">
<#assign jsCssVersion = "1101">
<#assign varSearchKeyWords = "${varSelectData.keywords!}">
<#--品牌图片搜索项目下的地址 搜索指向-->
<#assign varBrandLogo ="${(storeConfiguration.stageJsServer)!}/search/brandlogo/">