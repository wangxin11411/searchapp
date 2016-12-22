<#--搜索结果页面包屑-->
<div class="nSearch-crumb nSearch-crumb-search clearfix">

    <a id="clearallfacts" class="nSearch-crumb-clearFacets" href="${searchSite!}/${concrete_url!}<#if isHyg=='1'>&market=11&marketPage=1</#if>">全部清空</a>
    <span class="nSearch-crumb-keyWord" id="nSearch-crumb-keyWord"><b class="nFont14">${searchKeyWords!}</b></span>
    <span class="nSearch-crumb-searchNum" id="nSearch-crumb-searchNum">共 <em id="searchTotalNumber">${searchObj.content.seoData.totalCount!}</em> 个商品</span>
    <div class="nSearch-crumb-facetsCurrent-warp" id="nSearch-crumb-facetsCurrent-warp">
        <ul class="nSearch-crumb-facetsCurrent">
            <#--<#if searchObj.content.banner?? && storeConfiguration.isHwg !="1">-->
                <#--<li><a href="${searchSite!}${pageFacets.brand.url!}"><i>×</i><em>品牌：</em>${searchObj.content.banner.name!}</a></li>-->
            <#--</#if>-->
            <#include "crumb_facetsCurrent.ftl">
        </ul>
        <a href="javascript:void(0)" class="facetsCurrent-prev fc-btn"></a>
        <a href="javascript:void(0)" class="facetsCurrent-next fc-btn"></a>
    </div>
    <#assign searchReset=searchObj.content.commonInfo >
    <#if (searchReset.searchLevel)?? && (searchReset.searchLevel) ==2 >
        <#if (searchReset.showWord)?length &gt; 0><#--纠错-->
            <div class="nSearch-crumb-check"><span class="title">非常抱歉，没有找到与"<em class="nHeigh">${(searchObj.content.selectData.keywords)!}</em>"相关的商品，为您推荐与"<em class="nHeigh">${searchKeyWords!}</em>"相关的商品。</span></div>
            <script>
                var keyLabelVal = "${(searchObj.content.selectData.keywords)?replace('\\','')?replace('\"','')}";
                keyLabelVal = keyLabelVal.replace(/\"/g,"'");
                document.getElementById("keyLabel").setAttribute("default",keyLabelVal+",1",1);
                document.getElementById("keyLabel").innerHTML = keyLabelVal;
                document.getElementById("keyLabel").style.top = "-50px";
                document.getElementById("searchInput").value = keyLabelVal;
            </script>
        <#else><#--降维-->
            <div class="nSearch-crumb-check"><span class="title">非常抱歉，没有找到与"<em class="nHeigh">${(searchObj.content.selectData.keywords)!}</em>"相关的商品，为您推荐与"<em class="nHeigh">${searchKeyWords!}</em>"相关的商品。</span></div>
            <script>
                var keyLabelVal = "${(searchObj.content.selectData.keywords)?replace('\\','')?replace('\"','')}";
                keyLabelVal = keyLabelVal.replace(/\"/g,"'");
                document.getElementById("keyLabel").setAttribute("default",keyLabelVal+",1",1);
                document.getElementById("keyLabel").innerHTML = keyLabelVal;
                document.getElementById("keyLabel").style.top = "-50px";
                document.getElementById("searchInput").value = keyLabelVal;
            </script>
        </#if>
    <#elseif (searchReset.searchLevel)?? && (searchReset.searchLevel) ==3 >
        <div class="nSearch-crumb-check"><span class="title">非常抱歉，根据相关法律法规和政策，无法显示与"<em class="nHeigh">${(searchObj.content.selectData.keywords)!}</em>"相关的商品，为您推荐与"<em class="nHeigh">${searchKeyWords!}</em>"相关的商品。</span></div>
        <script>
            var keyLabelVal = "${(searchObj.content.selectData.keywords)?replace('\\','')?replace('\"','')}";
            keyLabelVal = keyLabelVal.replace(/\"/g,"'");
            document.getElementById("keyLabel").setAttribute("default",keyLabelVal+",1",1);
            document.getElementById("keyLabel").innerHTML = keyLabelVal;
            document.getElementById("keyLabel").style.top = "-50px";
            document.getElementById("searchInput").value = keyLabelVal;
        </script>
    <#else>
        <script>
            var keyLabelVal = "${searchKeyWords?replace('\\','')?replace('\"','')}";
            keyLabelVal = keyLabelVal.replace(/\"/g,"'");
            document.getElementById("keyLabel").setAttribute("default",keyLabelVal+",1",1);
            document.getElementById("keyLabel").innerHTML = keyLabelVal;
            document.getElementById("keyLabel").style.top = "-50px";
            document.getElementById("searchInput").value = keyLabelVal;
        </script>
    </#if>  
</div>