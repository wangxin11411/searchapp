<#assign shopReq = shopObj.req>
<#assign quession = shopReq.question>

<#assign title = "${quession!}官网提供${quession!}大全及${quession!}官网报价-国美在线">
<#assign description ="国美在线$${quession!}官网提供${quession!}最新商品,查看最新${quession!}官网报价,网购就到国美在线${quession!}大全产品专区"  >
<#assign keywords = "${quession!},${quession!}大全, ${quession!}官网,${quession!}官网报价">

<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title!}</title>
    <meta name="description" content="${description!}">
    <meta name="Keywords" content="${keywords!}">
    <link rel="shortcut icon" href="//app.gomein.net.cn/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href='${(storeConfiguration.stageCssServer)!}/??<!--# include virtual="/n/common/a18/css.html"-->'>

    <style type="text/css">
        /*统一样式*/
        body {
            color: #5e5e5e;
        }
        a {
            color: #404040;
            cursor: pointer;
            outline: 0 none;
            text-decoration: none;
        }

        /*店铺主体*/
        .store-wrap{
            width: 1200px;
            margin: 0 auto;
            position: relative;
        }
        .store-crumb{
            padding: 8px 0 8px 10px;
        }
        .store-crumb span{
            float: left;
            height: 22px;
            line-height: 22px;
            color: #5e5e5e;
        }
        .store-crumb .store-keyWord{
            padding: 0 10px;
            font-size: 14px;
            font-weight: bold;
            color: #cc0000;
        }
        .store-box{
            margin-top: -13px;
        }
        .store-box .store-list{
            padding: 22px 0 27px 10px;
            border-bottom: 1px solid #e6e6e6;
        }
        .store-info{
            float: left;
            margin-top: 4px;
        }
        .store-info .store-info-logo{
            width: 100px;
            height: 30px;
            margin-right: 24px;
            float: left;
        }
        .store-info .store-info-logo img{
            width: 100%;
            height: 100%;
        }
        .store-info .store-info-name{
            height: 30px;
            float: left;
            margin-right: 5px;
            color: #5e5e5e;
            font: bold 14px/30px "Microsoft YaHei";
        }
        .store-info .store-info-name:hover{
            text-decoration: none;
            color: #e3101e;
        }
        .store-info .store-info-name em{
            color: #ff5757;
        }
        .store-info .store-info-type{
            width: 60px;
            height: 22px;
            border: 1px solid #ffd9dd;
            line-height: 22px;
            float: left;
            margin-top: 2px;
            color: #e3101e;
            text-align: center;
        }
        .store-score{
            width: 396px;
            float: right;
            text-align: center;
        }
        .store-score .store-score-list{
            float: left;
            padding-right: 15px;
            color: #909090;
        }
        .store-score .store-score-list span{
            width: 52px;
            display: inline-block;
            margin-right: 18px;
            float: left;
            font-family: "Microsoft YaHei";
        }
        .store-score-title span{
            height: 22px;
            line-height: 22px;
        }
        .store-score-num span{
            height: 12px;
            margin-top: -2px;
        }
        .store-score .store-enter{
            width: 94px;
            height: 24px;
            float: right;
            line-height: 24px;
            color: #fff;
            background: #ff5757;
            margin-top: 8px;
            font-family: "Microsoft YaHei";
        }
        .store-score .store-enter:hover{
            text-decoration: none;
            background: #f64949;
        }
        .store-score .store-score-list .store-title-diff,
        .store-score .store-score-list .store-num-diff{
            color: #5e5e5e;
            font-size: 13px;
            margin-right: 25px;
            font-weight: bold;
        }
        .store-score .store-score-list .store-num-diff{
            color: #e3101e;
        }

        /*为搜索到店铺样式*/
        .listmain {
            position: relative;
            background-color: #f8f8f8;
            border: 1px solid #e6e6e6;
            /*height: 258px;*/
            padding-left: 60px;
            padding-top: 15px;
            margin: 10px 0;
            padding-bottom: 15px;
        }
        .srabox {
            font: 700 14px/30px simsun;
        }
        .srabox span {
            color: #e3101e;
        }
        .listmain em {
            background: url(//css.gome.com.cn/search/search2017/image/search.png) 0 -135px no-repeat;
            height: 41px;
            left: 15px;
            position: absolute;
            top: 8px;
            width: 41px;
        }

        /*底部搜索框*/
        .searchBox-bottom{
            display: none;
            clear: both;
            overflow: hidden;
            padding: 5px 0 20px 50px;
            margin: 10px 0;
            background-color: #F8F8F8;
            /*background-color: #e3101e;*/
        }
        .related-list{
            width: 500px;
            height: 32px;
            margin: 0 auto 10px;
            line-height: 32px;
            /*text-align: center;*/
            /*white-space: nowrap;*/
            overflow: hidden;
        }
        .related-title{
            *float: left;
            margin-right: -5px;
            vertical-align: middle;
            display: inline-block;
        }
        .related-key{
            *float: left;
            overflow: hidden;
            padding-left: 10px;
            vertical-align: middle;
            display: inline-block;
        }
        .related-key a{
            color: #069;
        }
        .related-key:after{
            content: "|";
            color: #A5A5A5;
            padding-left: 10px;
        }
        .related-key:last-child:after{
            display: none;
        }
        .search-box{
            width: 500px;
            height: 34px;
            margin: 0 auto;
        }
        .search-box-input{
            float: left;
            width: 425px;
            height: 28px;
            border: 2px solid #e3101e;
            color: #5e5e5e;
            font: 400 14px/28px "Arial";
            text-indent: 10px;
        }
        .search-box-btn{
            float: left;
            width: 69px;
            height: 32px;
            background-color: #e3101e;
            text-align: center;
            color: #FFF;
            font: 400 16px/32px "microsoft yahei";
        }
        .search-box-btn:hover{
            color: #FFF;
            text-decoration: none;
        }
        #f-compare{
            overflow: hidden;
        }

        /*推广商品*/
        .nSearch-bottomTuiGuang{
            border:1px solid #e0e0e0;
            margin-bottom: 10px;
        }
        .nSearch-bottomTuiGuang .hd{
            padding: 0 10px;
            font: 400 15px/31px "microsoft yahei";
        }
        #dsp_bottomTuiGuang{
            height: 227px;
            margin: 0 28px 20px;
            overflow: hidden;
        }
        #dsp_bottomTuiGuang li {
            float: left;
            margin: 0 15px;
            width: 160px;
        }
        #dsp_bottomTuiGuang .pic{
            margin-bottom: 10px;
            overflow: hidden;
            text-align: center;
            width: 160px;
            height: 160px;
            font-size: 0;
        }
        .item-name a:hover,
        .name a:hover,
        .adver a:hover{
            text-decoration: none;
            color: #e3101e;
        }
        #dsp_bottomTuiGuang .pic img{ width:160px; height: 160px;}
        #dsp_bottomTuiGuang .dsp-tgImg img{ width:160px; height: 232px;}
        #dsp_bottomTuiGuang .price{
            font-weight: 700;
            color: #e3101e;
            font-size: 14px;
            margin-bottom: -57px;
            margin-top: 46px;
        }
        #dsp_bottomTuiGuang .name{
            height: 36px;
            line-height: 18px;
            overflow: hidden;
            word-break: break-all;
            word-wrap: break-word;
        }
        .dsp-tuiguangIdentifi {
            color: #ccc;
            float: right;
            font-size: 12px;
            padding-right: 8px;
        }
        #dsp_tuiguang .pic{ width: 160px; height: 160px;}
        #dsp_tuiguang img{ width: 160px; height: 160px;}
        #dsp_tuiguang .dsp-tgImg img{ width: 176px; height: 232px; }
        #dsp_advertisement a{ display: block; margin-bottom: 10px; width: 196px; overflow: hidden; border: 1px solid #e6e6e6}
        #dsp_advertisement img{ width: 198px; font-size: 0; height:auto;}

        .adver {
            background-color: #fff;
            color: #e3101e;
            height: 18px;
            margin-top: -18px;
            overflow: hidden;
            position: relative;
            text-align: left;
        }
        .adver a{
            color: #e3101e;
        }

        /*猜你喜欢*/
        .nSearch-bottom-advertisement{
            border:1px solid #e0e0e0;
            margin-bottom: 10px;
        }
        .nSearch-bottom-advertisement .hd{
            padding: 0 10px;
            font: 400 15px/31px "microsoft yahei";
        }
        .bottom-advertisement-lists{
            margin: 0 28px 20px;
            height: 227px;
            overflow: hidden;
        }
        .bottom-advertisement-refresh{
            float: right;
            font-size: 12px;
            cursor: pointer;
        }
        .bottom-advertisement-refresh:hover{
            color: #e3101e;
        }
        .bottom-advertisement-refresh:after{
            content: " ";
            display: inline-block;
            width: 16px;
            height: 16px;
            margin:-2px 0 0 5px;
            vertical-align: middle;
            line-height: 31px;
            background: url(//css.gome.com.cn/search/search2017/image/search.png) -35px -15px;
        }
        .bottom-advertisement-lists li{
            float: left;
            width: 160px;
            margin: 0 15px;
            *margin-left: 10px;
            *margin-right: 10px;
            _display:inline;
            display: none;
        }
        .bottom-advertisement-lists li.cShow{
            display: block;
        }
        .bottom-advertisement-lists .item-pic{
            width: 160px;
            margin-bottom: 10px;
            overflow: hidden;
            text-align: center;
        }
        .bottom-advertisement-lists .item-name{
            height: 36px;
            line-height: 18px;
            overflow: hidden;
            word-wrap:break-word;
            word-break:break-all;
        }
        .bottom-advertisement-lists .item-comment{
            float: right;
            color: #069;
            line-height: 20px;
            background: url(//css.gome.com.cn/search/search2017/image/search.png) -51px 5px no-repeat;
            padding-left: 17px;
        }
        .bottom-advertisement-lists .item-price{
            color: #e3101e;
            font-size: 14px;
        }

        /*加载logo*/
        .product-waiting{
            position: absolute;
            left: 50%;
            top: 50px;
            margin: 0 0 -80px -40px;
            height: 80px;
            width: 80px;
            background: url("//img.gomein.net.cn/gmlib/ui/loading/3.0.0/loading.gif") no-repeat;
            z-index: 3;
            display: none;
        }

        /*分页插件样式*/
        .pager{float:right;height:32px;padding-top: 35px;margin-bottom: 30px;position:relative;margin-right: 19px;}
        .pager a,.pager span,.pager label,.pager button{float:left}
        .pager a,.pager span.cur{position:relative;min-width:4px;height:30px;margin:0 0 0 -1px;padding:0 13px;background:#FFF;border:1px solid #ddd;z-index:0;font:normal 12px/30px arial;color:#5e5e5e}
        .pager span.cur{background:#f8f8f8;border:1px solid #e6e6e6;color:#888;font-weight:500;text-decoration:none;z-index:10;color:#a5a5a5}
        .pager a:hover{color:#e3101e;text-decoration:none}
        .pager a.prev:hover,.pager a.next:hover{font-weight:normal;color:#e3101e;background:#fff}
        .pager s{position:absolute}
        .pager .prev{padding:0 8px 0 21px;font-size:12px;width:40px;}
        .pager .prev s{overflow:hidden;top:10px;left:10px;width:6px;height:10px;background:url(../../../search/search2017/image/search.png) no-repeat -20px 0}
        .pager .disable .icon-prev{background-position:0 0}
        .pager .disable .icon-next{background-position:-10px 0}
        .pager .next{padding:0 21px 0 8px;font-size:12px;width:40px;}
        .pager .next s{overflow:hidden;top:10px;right:10px;width:6px;height:10px;background:url(../../../search/search2017/image/search.png) no-repeat -30px 0}
        .pager .placeholder{overflow:hidden;width:16px;height:16px;margin:0 8px;border-bottom: 1px dotted}
        .pager .txt-wrap{margin:0 5px 0 10px;color:#959595;line-height:30px}
        .pager .txt{width:32px;height:18px;line-height:18px;margin:0 5px 0;padding:4px 0;border:1px solid #ccc;text-align:center;vertical-align:middle;color:#5e5e5e;}
        .pager .btn{width:42px;height:26px;line-height:28px;padding:0;background:#FFF;border:1px solid #ddd;color:#5e5e5e;text-align:center;cursor:pointer;margin-top:2px;background:#f8f8f8;font:normal 12px/26px}
        .pager .btn:hover{border:1px solid #ccc;color:#333}
        .pager .btn:active{background:#f3f3f3}
        .pager .disable{cursor:default;background:#f8f8f8;color:#ccc}
        .pager a.disable:hover{color:#ccc;background:#f8f8f8}
    </style>

    <!--# include virtual="/n/common/global/global.html"-->
</head>

<body data-page="shop">
<#--nginx  -->
<!--# include virtual="/n/common/a18/head.html"-->

<div id="store-content" class="store-wrap">
    <div id="store-crumb" class="store-crumb clearfix">
        <span class="store-keyWord">${(shopReq.question)!}</span>
        <span class="store-num">
            共
            <em>${(shopObj.totalCount)!}</em>
            个店铺
        </span>
    </div>
    <div id="product-waiting" class="product-waiting"></div>
    <#--店铺主体-->
    <ul id="store-box" class="store-box" modelid="9000000002"></ul>
    <#--底部分页-->
    <div class="clearfix" id="product-pager">
        <div class="pager" id="j-page"></div>
    </div>
    <#---底部搜索框--->
    <div class="searchBox-bottom">
        <#--相关搜索异步内容-->
        <ul class="related-list clearfix" id="related-list" modelid="9000000800"></ul>
        <div class="search-box clearfix" modelid="9000000801">
            <input type="text" class="search-box-input" id="search-box-input" value="${quession!}" defaultVal="${quession!}">
            <a href="javascript:void(0)" class="search-box-btn emcodeProp17" id="search-box-btn" data-code="9000000801-0" track="搜索结果页:底部搜索栏对话框">搜索</a>
        </div>
    </div>
</div>
<div class="store-wrap">
    <#--推广商品-->
    <dl class="nSearch-bottomTuiGuang" id="nSearch-bottomTuiGuang">
        <dt class="hd"><i class="dsp-tuiguangIdentifi">广告</i>推广商品</dt>
        <dd class="bd">
            <ul class="clearfix" id="dsp_bottomTuiGuang">
            </ul>
        </dd>
    </dl>
    <#--猜你喜欢的商品-->
    <dl class="nSearch-bottom-advertisement" id="nSearch-quessYouLike">
        <dt class="hd"><span id="quessYouLike-refresh" class="bottom-advertisement-refresh" curp="0">换一组</span>根据浏览猜你喜欢</dt>
        <dd class="bd">
            <ul class="bottom-advertisement-lists clearfix" id="bigD_quessLike"></ul>
        </dd>
    </dl>
</div>

<!--# include virtual="/n/common/default/aside.html"-->
<!--# include virtual="/n/common/default/foot.html"-->
<script type="text/javascript">
    var searchkey = "${(shopObj.req.question)!}";
    var _c3id = ["cat10000070","cat10000054","cat10000058","cat10000062","cat10000182","cat10000199","cat10000012","cat10000008","cat10000009","cat10000010","cat10000043","cat31665542","cat10000004","cat10000005"];
    var dsp_c3id = _c3id[Math.floor(Math.random()*14)];
</script>
<script src='${(storeConfiguration.stageJsServer)!}/??<!--# include virtual="/n/common/default/js.html"-->,/gmlib/unit/g/1.0.0/g.min.js,/gmlib/unit/cart/1.0.0/addCart.js,/gmlib/unit/gcity/1.0.0/gcity.min.js,/search/search2017/js/pager.min.js'></script>
<script type="text/javascript">
    /*获取区域和用户id*/
    var pageData = {
        _bdarea: ($.cookie("atgregion") != undefined && $.cookie("atgregion") != null && $.cookie("atgregion") != "")?$.cookie("atgregion").split("|")[0]:"11010200",
        _cid: $.cookie("__clickidc")
    };
    /*店铺模板*/
    var store_tpl = '\
        {{each shopList as store i}}\
            <li class="store-list clearfix">\
                <div class="store-info">\
                    <a class="store-info-logo" href="//mall'+ cookieDomain +'/{{store.shopId}}" target="_blank" data-code="9000000002-{{i+1}}">\
                        <img src="{{store.icon}}" alt="">\
                    </a>\
                    <a class="store-info-name" href="//mall'+ cookieDomain +'/{{store.shopId}}" target="_blank" data-code="9000000002-{{i+1}}">{{store.name}}</a>\
                    {{if store.isSelf == 1}}\
                        <span class="store-info-type">国美自营</span>\
                    {{/if}}\
                </div>\
                <div class="store-score">\
                    <dl class="store-score-list">\
                        <dt class="store-score-title clearfix">\
                            <span class="store-title-diff">综合评价</span>\
                            <span>商品描述</span>\
                            <span>发货速度</span>\
                            <span>服务质量</span>\
                        </dt>\
                        <dd class="store-score-num clearfix">\
                            <span class="store-num-diff">{{store.score}}</span>\
                            <span>{{store.match}}</span>\
                            <span>{{store.speed}}</span>\
                            <span>{{store.serv}}</span>\
                        </dd>\
                    </dl>\
                    <a class="store-enter" href="//mall'+ cookieDomain +'/{{store.shopId}}" target="_blank" data-code="9000000002-{{i+1}}">进入店铺</a>\
                </div>\
            </li>\
        {{/each}}\
    ';

    /*
    ajax异步获取店铺信息
    _curPage：当前请求的页码
    _question：搜索关键词
    */
    function getStore(_curPage,_question) {
        $.get("//apis"+ cookieDomain + "/p/mall/10/"+ _curPage +"/" + _question +"?from=self",$.noop,"jsonp")
         .always(function() {
                    $("#product-waiting").hide();
        })
         .done(function(data) {
            if(data.totalCount != 0) {
                var listTpl = templateSimple.compile(store_tpl)(data);
                $("#store-box").empty().append(listTpl);
                $(".searchBox-bottom").show()
                if(data.totalPage > 1) {
                    pageGet(data.currentPage,data.totalPage,data.req.question);
                }
            }else {
                var noStore = '<div class="listmain">\
                    <div class="srabox">非常抱歉，没有找到与<span>'+_question+'</span>相关的店铺。</div>\
                    <em></em>\
                    </div>\
                    ';
                $("#store-content").empty().append(noStore);
            }
        });
    };
    /*底部分页插件调用*/
    function pageGet(_currentPage,_totalPage,_question) {
        $("#j-page").ucPager({
            pageClass: "",
            currentPage: _currentPage,
            totalPage: _totalPage,
            pageSize: 10,
            clickCallback: function(curPage) {
                $("#product-waiting").show();
                getStore(curPage,_question);
                $(window).scrollTop(0);
            }
        });
    };
    getStore(1,searchkey);

    /*底部搜索框数据渲染*/
    $.get('//search'+ cookieDomain + '/cloud/releQuery',{question: searchkey},$.noop,'jsonp')
    .done(function(data) {
        var headKeyword = "";
        var html = '<li class="related-title">您是不是要找：</li>';
        if (data.releData) {
            var _data = data.releData.rList;
            for (var i = 0, j = _data.length; i < j; i++) {
                html += '<li class="related-key"><a track="搜索结果页:相关搜索" class="emcodeProp17" href="/search?question=' + _data[i].key + '&from=releQuery" target="_blank" data-code="9000000800-'+(i+1)+'">' + _data[i].key + '</a></li>';
                headKeyword += '<a track="搜索结果页:相关搜索" href="/search?question=' + _data[i].key + '&from=releQuery" target="_blank">'+ _data[i].key +'</a>';
            }
            $("#topSearch .hotkeyword").empty().append(headKeyword);
            $("#related-list").append(html);
        } else {
            $("#related-list").hide();
        }
    });

    /*底部搜索按钮*/
    $("#search-box-input").bind({
        "keyup": function(event) {
            if (event.which == 13) {
                $("#search-box-btn").click()
            } else {
                if(!(/^[0-9.]*$/.test($(this).val()))) {
                    $(this).val($(this).val().replace(/[`~!@#$%^&*_+=¥￥（）()<>?:"{},\/;'[\]！。......，…——、‘；—【】|？》《“：\\\-”]/g,''));
                }
            }
        },
        "blur": function() {
            if ($(this).val() == "") {
                $(this).val($(this).attr("defaultVal"))
            }
        }
    });
    $("#search-box-btn").bind("click",function(){
        var dataPage = $("body").attr("data-page");
        var modelId = $(this).attr("data-code");
        window.location.href = "/search?intcmp="+dataPage+"-"+modelId+"&question="+ $("#search-box-input").val();
    });

    /*
        底部大数据模块(推广商品和猜你喜欢)
        tpl_tuiguang：推广商品模板；
        tpl_quessLike：猜你喜欢模板；
    */
    var tpl_tuiguang = '\
        {{each data as value}}\
            <li class="buy-items">\
            {{if !(value.ds) && !(value.skuid) && !(value.productid)}}\
                <a class="dsp-tgImg" href="{{value.ldp}}" target="_blank"><img src="{{value.src}}"></a>\
            {{else}}\
                <div class="pic"><a href="{{value.ldp}}" target="_blank"><img src="{{value.src}}"></a></div>\
                <div class="price">¥<span>{{value.pr}}</span></div>\
                <div class="name"><a href="{{value.ldp}}" target="_blank">{{value.ds}}</a></div>\
                {{if value.adver}}<div class="adver">{{#value.adver}}</div>{{/if}}\
            {{/if}}\
            </li>\
        {{/each}}\
    ';
    $.ajax({
        type: "get",
        url: "//dsp.gome.com.cn/decision/hotword",
        dataType: "jsonp",
        jsonpName: "tuiguang",
        data: {
            "p":12,
            "catid":dsp_c3id,
            "searchkey":searchkey,
            "c":"tuiguang",
            "width_height":"210-210",
            "area": pageData._bdarea
        }
    }).done(function(data) {
        var _data = {data: data.splice(8)};
        var listTpl = templateSimple.compile(tpl_tuiguang)(_data);
        $("#dsp_bottomTuiGuang").append(listTpl);
        for(var i= 0,j=_data.data.length;i<j;i++) {
            new Image().src = _data.data[i].pm;
        }
    });

    var tpl_quessLike = '\
        {{each lst as value index}}\
            {{if index<18}}\
                <li class="item">\
                    <p class="item-pic"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank"><img src="{{value.iurl}}"></a></p>\
                    <p class="item-name"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank">{{value.pn}}</a></p>\
                    <p class="item-price-comment"><b class="item-price">¥{{value.price}}</b></p>\
                </li>\
            {{/if}}\
        {{/each}}\
    ';
    $.get("//bigd.gome.com.cn/gome/rec",{boxid: "box92",area: pageData._bdarea,cid: pageData._cid,imagesize: 160,search: searchkey,c1id:"",c3id:dsp_c3id,brid: ""},function(data) {
        var listTpl = templateSimple.compile(tpl_quessLike)(data);
        $("#bigD_quessLike").append(listTpl);
    },"jsonp").then(function() {
        var _length = $("#bigD_quessLike").find(".item").length;
        if(_length<=6){$("#quessYouLike-refresh").hide()}
        var totlnum = (_length %6 ==0)?(parseInt(_length /6,10)-1):parseInt(_length /6,10);
        var _i = 0;
        $("#bigD_quessLike").find(".item").each(function(){
            if($(this).index()<6){
                $(this).addClass("cShow");
            }
            $(this).addClass("item"+parseInt($(this).index()/6,10));
        });
        $("#quessYouLike-refresh").bind("click",function(){
            $("#bigD_quessLike").find(".item").removeClass("cShow");
            if(_i++ == totlnum || _i==3){
                _i=0;
            }
            $("#bigD_quessLike").find(".item"+_i).addClass("cShow");
        });
    });
</script>
</body>
</html>
