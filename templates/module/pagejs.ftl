<script type="text/javascript">
    if(!document.getElementsByClassName){
        document.getElementsByClassName = function(className, element){
            var children = (element || document).getElementsByTagName('*');
            var elements = new Array();
            for (var i=0; i<children.length; i++){
                var child = children[i];
                var classNames = child.className.split(' ');
                for (var j=0; j<classNames.length; j++){
                    if (classNames[j] == className){
                        elements.push(child);
                        break;
                    }
                }
            }
            return elements;
        };
    }
</script>
<script type="text/javascript">
    <#--pageData = {
        ajaxURL     :异步请求商品的地址
        currentPage :当前页
        totalPage   :总页数
        regionId    :四级区域id：区县
        regionId_2  :二级区域id：市
        ajaxStatus  :页面是否处于请求状态
        isBW        :初始第一页是否有推荐联营商品
        valueBW     :请求推荐联营商品时的参数
        dataBW      :{
            bwsData:Array 推荐联营商品数据，综合第一页时与主商品混合展示
            bwsString: String 推荐联营商品id,用于综合排序时非第一页的异步商品请求
        }
        searchkey   :页面商品的关键词
        isSearch    :是否搜索页面
    }-->
    var pageData = {
        ajaxURL     :"${(varHeader.url)!}",
        currentPage :${(varPageBar.pageNumber)!},
        totalPage   :${(varPageBar.totalPage)!},
        regionId    :'${(varHeader.regionId)!}' || '11010200',
        regionId_2  :'${(varHeader.regionId)!}'.substr(0,4)+"0000" || '11010000',
        ajaxStatus  :false,
        isBW        :${(varHeader.bwSec)?c},
        valueBW     :"${(varHeader.bwFrom)!}x${(varHeader.bwSize)!}",
        dataBW      :{},
        searchkey   :"${(varSelectData.keywords)!}",
        isSearch    :${(varSelectData.isSearch)?string},
        brandId     :"${(varSelectData.brandId)!}"
    };
    pageData.productSite="${(storeConfiguration.productSite)!}";
    <#--如果特殊地区，设置为无货状态-->
    if(pageData.regionId.indexOf("840101")!=-1){
        pageData.noSkusStock = true;
    }else{
        pageData.noSkusStock = false;
    }
    <#--是否有搜索结果-->
    <#if varPageBar.totalCount != 0>
        pageData.isResult = true;
    <#else>
        pageData.isResult = false;
    </#if>
    <#--bug:搜索品牌时，筛选条件多选时丢失品牌条件,保存已选的facetid-->
    <#if searchObj.content.banner?? && !isGomehigo>
    pageData.defaultFacets = "${(varSelectData.facets.brand.items[0].id)!}";
    <#else>
    pageData.defaultFacets = "";
    </#if>
    /*大数据变量设置*/
    var dspData = {};
    dspData.dsp_gome_c1name = "${(varSelectData.category.fir.name)!}";
    dspData.dsp_gome_c2name = "${(varSelectData.category.sec.name)!}";
    dspData.dsp_gome_c3name = "${(varSelectData.category.third.name)!}";

    dspData.dsp_gome_c1id = (function(){
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

    dspData.dsp_gome_c3id = (function(){
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

    dspData.dsp_gome_brid = (function(){
        var el = document.getElementById("brandChoose");
        if(el){
            return el.getAttribute("brandId").substring(1)
        }
        return "";
    })();

    dspData.url={
        dsp_url_s:"//dsp.gome.com.cn/decision/hotword",
        dsp_url_c:"//dsp.gome.com.cn/decision/cat",
        bigdata_url:"//bigd.gome.com.cn/gome/rec"
    };

</script>
<script type="text/javascript">
    var loggerData = {
        "t4":"${(varSelectData.category.third.id)!}",
        "t5":"${((searchReq.question)!)?replace('\\','')?replace('\"','')}",
        "t7":"${(searchReq.facets)!}",
        "t8":"${(varPageBar.totalCount)!}",
        "t19":"${(searchReq.instock)!}",
        "t20":"${(searchReq.productTag)!}",
        "t21":"${(searchReq.sale)!}",
        "t22_s":"${(searchObj.content.commonInfo.showWord)!}",
        "t22_r":"${(searchObj.content.commonInfo.remain)!}",
        "t23":"${(searchObj.content.commonInfo.searchLevel)!}",
        "t31":"${(varHeader.tagWightVersion)!}",
        "t32":"${(searchReq.catId)!}"
    }
</script>


<script src='<!--# include virtual="/n/common/default/script.html"-->,/gmlib/unit/cart/1.0.0/addCart.min.js,/gmlib/unit/g/1.0.0/g.min.js,/gmlib/unit/gcity/1.0.0/gcity.min.js'></script>
<script src='http://localhost:8080/search2017/js/gcontrast.js'></script>
<#--
<script src="//js.gomein.net.cn/??/gmlib/unit/scode/1.0.0/scode.min.js,/gmlib/unit/bigdata/1.0.0/bigdata.min.js,/gmlib/unit/scodecommon/1.0.0/scodecommon.min.js,/gmlib/unit/bigcode/1.0.0/bigcode.js"></script>
-->
<script>
    $('#address').gCity({
        gc_ads: 'chtm',
        gc_evt: function() {
            $.cookie('atgregion', this.xid + "|" + this.chtm + "|" + this.cid + "|" + this.sid + "|" + this.zid, {
                expires: 30,
                path: '/'
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
    window.compare_asyn = $("body").accordion({
        obj:".add-contrast",
        objStyle:{"background-position":"0 -61px"},
        //domain:cookieDomain
        domain:cookieDomain
    })
</script>
