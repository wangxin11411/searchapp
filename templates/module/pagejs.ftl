<script type="text/javascript">
    window.dsp_gome_c1name = "${(varSelectData.category.fir.name)!}";
    window.dsp_gome_c2name = "${(varSelectData.category.sec.name)!}";
    window.dsp_gome_c3name = "${(varSelectData.category.third.name)!}";
    window.dsp_gome_c1id = (function(){
            var el = document.getElementsByClassName('facets-hot-itemfir');
            if(el.length > 0){
                var str=[];
                for(var i = 0,j=el.length;i<j;i++){
                    str.push(el[i].getAttribute("facetsid"))
                }
                return str.join(",");
            }
            return "";
        })() || "${(varSelectData.category.fir.id)!}";

    window.dsp_gome_c3id = (function(){
            var el = document.getElementsByClassName('facets-hot-item');
            if(el.length > 0){
                var str=[];
                for(var i = 0,j=el.length;i<j &&i <10;i++){
                    str.push(el[i].getAttribute("facetsid"))
                }
                return str.join(",");
            }
            return "";
        })() || "${(varSelectData.category.third.id)!}";

    window.dsp_gome_brid = (function(){
        var el = document.getElementById("brandChoose");
        if(el){
            return el.getAttribute("brandId").substring(1)
        }
        return "";
    })();

    window.searchkey = "${(varSelectData.keywords)!}";
    window.brandId = "${(varSelectData.brandId)!}";


    window.url={
        dsp_url_s:"//dsp.gome.com.cn/decision/hotword",
        dsp_url_c:"//dsp.gome.com.cn/decision/cat",
        bigdata_url:"//bigd.gome.com.cn/gome/rec"
    };
    <#if searchObj.content.pageBar.totalCount != 0>
    window.isResult = true;
    <#else>
    window.isResult = false;
    </#if>

    <#if searchObj.content.selectData.isSearch == true>
        <#if searchObj.content.selectData.brandId??>
        window.tag = "brand"; //品牌
        <#else>
        window.tag = "search"; //搜索
        </#if>
    <#else>
        window.tag = "category"; //分类
    </#if>

</script>

<script type="text/javascript">
    var pageData = {
        ajaxURL     :"${(searchObj.header.url)!}",
        currentPage :${(searchObj.content.pageBar.pageNumber)!},
        totalPage   :${(searchObj.content.pageBar.totalPage)!},
        regionId    :'${(searchObj.header.searchReq.regionId)!}' || '11010200',
        regionId_2  :'${(searchObj.header.searchReq.regionId)!}'.substr(0,4)+"0000" || '11010000',
        ajaxStatus  :false,
        isBW        :${(searchObj.header.bwSec)?c},
        valueBW     :"${(searchObj.header.bwFrom)!}x${(searchObj.header.bwSize)!}",
        dataBW      :{} //存放店铺商品数据
    };
    var loggerData = {
        "t4":"${(varSelectData.category.third.id)!}",
        "t5":"${((searchObj.header.searchReq.question)!)?replace('\\','')?replace('\"','')}",
        "t7":"${(searchObj.header.searchReq.facets)!}",
        "t8":"${(searchObj.content.seoData.totalCount)!}",
        "t19":"${(searchObj.header.searchReq.instock)!}",
        "t20":"${(searchObj.header.searchReq.productTag)!}",
        "t21":"${(searchObj.header.searchReq.sale)!}",
        "t22_s":"${(searchObj.content.commonInfo.showWord)!}",
        "t22_r":"${(searchObj.content.commonInfo.remain)!}",
        "t23":"${(searchObj.content.commonInfo.searchLevel)!}",
        "t31":"${(searchObj.header.tagWightVersion)!}",
        "t32":"${(searchObj.header.searchReq.catId)!}"
    };
</script>

<script>
    var productSite="${(storeConfiguration.productSite)!}";
    var isSearch=false;
<#if searchObj??>
    isSearch=${(searchObj.content.selectData.isSearch)?string};
</#if>



<#if noSkusStock?? && noSkusStock>
    var noSkusStock = true;
<#else>
    var noSkusStock = false;
</#if>

    <#--bug:搜索品牌时，筛选条件多选时丢失品牌条件-->
<#if searchObj.content.banner?? && !isGomehigo>
    var defaultFacets = "${(searchObj.content.selectData.facets.brand.items[0].id)!}";
<#else>
    var defaultFacets = "";
</#if>




</script>

<script src='<!--# include virtual="/n/common/default/script.html"-->,/gmlib/unit/cart/1.0.0/addCart.min.js,/gmlib/unit/g/1.0.0/g.min.js,/gmlib/unit/gcity/1.0.0/gcity.min.js'></script>

<#--
<script src="//js.gomein.net.cn/??/gmlib/unit/scode/1.0.0/scode.min.js,/gmlib/unit/bigdata/1.0.0/bigdata.min.js,/gmlib/unit/scodecommon/1.0.0/scodecommon.min.js,/gmlib/unit/bigcode/1.0.0/bigcode.js"></script>
-->
<script>
    $('#address').gCity({
        gc_ads: 'chtm',
        gc_evt: function() {
            $.cookie('atgregion', this.xid + "|" + this.chtm + "|" + this.cid + "|" + this.sid + "|" + this.zid, {
                expires: 30,
                path: '/',
                domain: "localhost"
            });

            pageData.sort = "0";
            pageData.currentPage=1;
            pageData.regionId= this.xid;
            pageData.regionId_2= this.cid;
            if(this.xid.indexOf("840101")!=-1){
                noSkusStock=true
            }else{
                noSkusStock =false
            }
            $('#sort-general').trigger("click")
        }
    });

</script>
