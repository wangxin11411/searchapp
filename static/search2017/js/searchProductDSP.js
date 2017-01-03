/**
 * 大数据商品相关
 */
var DSP = {};
var BigD = {};
var TPL={}
DSP.tpl_normal = function(){
    return '\
        {{each data as value}}\
            <li class="buy-items">\
            {{if !(value.ds) && !(value.skuid) && !(value.productid)}}\
                <a class="dsp-tgImg" href="{{value.ldp}}" target="_blank"><img gome-src="{{value.src}}" src="//img.gomein.net.cn/images/grey.gif"></a>\
            {{else}}\
                <div class="pic"><a href="{{value.ldp}}" target="_blank"><img gome-src="{{value.src}}" src="//img.gomein.net.cn/images/grey.gif"></a></div>\
                <div class="price">¥<span>{{value.pr}}</span></div>\
                <div class="name"><a href="{{value.ldp}}" target="_blank">{{value.ds}}</a></div>\
                {{if value.adver}}<div class="adver">{{#value.adver}}</div>{{/if}}\
            {{/if}}\
            </li>\
        {{/each}}\
    '
}

BigD.top_hotTuiJian = function(){
    return '\
        {{each lst as value}}\
            <li class="item">\
                <p class="pic">\
                    <a target="_blank" class="bigD_item" href="{{value.purl}}" title="{{value.pn}}" track="{{value.maima_param}}">\
                        <img src="{{value.iurl}}" alt="{{value.pn}}">\
                    </a>\
                </p>\
                <p class="name">\
                    <a target="_blank" class="bigD_item" href="{{value.purl}}" target="_blank" title="{{value.pn}}" track="{{value.maima_param}}">{{value.pn}}</a>\
                </p>\
                <p class="price"><span>¥{{value.price}}</span></p>\
                <p class="btn"><a class="bigD_item buy" target="_blank" href="{{value.purl}}" track="{{value.maima_param}}">立即抢购</a></p>\
            </li>\
        {{/each}}\
    '
}

BigD.tpl_normal = function(){
    return '\
        {{each lst as value}}\
            <li class="buy-items">\
                <div class="pic"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank"><img gome-src="{{value.iurl}}" src="//img.gomein.net.cn/images/grey.gif"></a></div>\
                <div class="price">¥<span>{{value.price}}</span></div>\
                <div class="name"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank">{{value.pn}}</a></div>\
            </li>\
        {{/each}}\
    '
}

BigD.tpl_weekTop = function(){
    return '\
        {{each lst as value index}}\
            <li class="active">\
                <p class="num {{if index<3}}num1{{else}}num2{{/if}}">{{index+1}}</p>\
                <p class="pname"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank">{{value.pn}}</a></p>\
                <div class="pdetail">\
                    <p class="pic"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank"><img gome-src="{{value.iurl}}" src="//img.gomein.net.cn/images/grey.gif"></a></p>\
                    <p class="name"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank">{{value.pn}}</a></p>\
                    <p class="price"><em>¥<span>{{value.price}}</span></em></p>\
                </div>\
            </li>\
        {{/each}}\
    '
}

BigD.tpl_quessLike = function(){
    return '\
        {{each lst as value index}}\
            {{if index<18}}\
                <li class="item">\
                    <p class="item-pic"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank"><img gome-src="{{value.iurl}}" src="//img.gomein.net.cn/images/grey.gif"></a></p>\
                    <p class="item-name"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank">{{value.pn}}</a></p>\
                    <p class="item-price-comment"><b class="item-price">¥{{value.price}}</b></p>\
                </li>\
            {{/if}}\
        {{/each}}\
    '
}
/*bigd 列表页顶部热卖推荐*/
BigD.getHotTuiJian = function(){
    var _this = this;
    var request_data = {
        JsonpName: "hotTuiJian",
        Url: pageData.dspIP + "/gome/rec",
        RequestData: {
            boxid: isHyg?"box55":"box01",
            area: pageData._bdarea,
            cid: pageData.cid,
            imagesize: 160,
            c1n: dsp_gome_c1name,
            c3n: dsp_gome_c3name,
            c1id: dsp_gome_c1id,
            c3id: dsp_gome_c3id,
            brid: dsp_gome_brid
        },
        Callback: BigD.renderHotTuiJian,
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data);
}

BigD.renderHotTuiJian = function(){
    var _this = this;
    var _data = this.data;
    if (_data) {
        var listTpl = templateSimple.compile(BigD.top_hotTuiJian())(this.data);
        $("#hot-list").empty().append(listTpl);
    }
    if (_data.lst.length != 0) {
        $("#hot-list").show();
    }else{
        $("#hot-list").parents(".hot-tj").hide();
    }
}

/*dsp推广商品**/
DSP.getTuiGuang = function(){
    var _url = "";
    var _data = {}
    if(isSearch){
        _url = isHyg?"//dsp.gome.com.cn/decision/cat":"//dsp.gome.com.cn/decision/hotword";
        _data = isHyg?{"p":53,"catid":dsp_gome_c3id,"c":"tuiguang","width_height":"210-210","area":pageData._bdarea}:{"p":12,"catid":dsp_gome_c3id,"searchkey":searchkey,"c":"tuiguang","width_height":"210-210","area":pageData._bdarea}
    }else{
        _url = "//dsp.gome.com.cn/decision/cat";
        _data = {"p":1,"catid":dsp_gome_c3id,"c":"tuiguang","width_height":"210-210","area":pageData._bdarea}
    }
    var request_data = {
        JsonpName: "tuiguang",
        Url:_url,
        RequestData:_data,
        Callback: DSP.renderTuiGuang,
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data);
}

DSP.renderTuiGuang = function(){
    var _data = this.data;

    var _dataShow = [];
    var data_left = {
        "data": _data.splice(0,8)
    };
    var data_bottom = {
        "data": _data.length >= 6?_data.splice(0,6):[]
    };
    _dataShow = _dataShow.concat(data_left.data,data_bottom.data);

    if (_dataShow && _dataShow.length > 0) {
        for(var i=0;i<_dataShow.length;i++){
            new Image().src = _dataShow[i].pm
        }

        //if(isHyg){data_left.data = _data}
        var listTpl = templateSimple.compile(DSP.tpl_normal())(data_left);
        $("#dsp_tuiguang").parent().show();
        $("#dsp_tuiguang").empty().append(listTpl);

        if(data_bottom.data.length >= 6){
            var listTpl = templateSimple.compile(DSP.tpl_normal())(data_bottom);
            $("#dsp_bottomTuiGuang").empty().append(listTpl);
            $("#dsp_bottomTuiGuang").parents(".nSearch-bottomTuiGuang").show();
        }
    }
}
/*dsp推广广告*/
DSP.getAD = function(){
    var _url = "";
    var _data = {}
    if(isSearch){
        _url = "//dsp.gome.com.cn/decision/cat";
        _data = {"p":124,"catid":dsp_gome_c3id,"c":"loadgomedsp","area":pageData._bdarea}
    }else{
        _url = "//dsp.gome.com.cn/decision/cat";
        _data = {"p":123,"catid":dsp_gome_c3id,"c":"loadgomedsp","area":pageData._bdarea}
    }
    var request_data = {
        JsonpName: "loadgomedsp",
        Url:_url,
        RequestData:_data,
        Callback: DSP.renderAD,
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data);
}
DSP.renderAD = function(){
    var _data = this.data
    var maxLength = isSearch?2:1;
    if (_data && _data.length > 0) {
        var listTpl = [];
        for(var i=0;i<_data.length && i<maxLength;i++){
            listTpl.push('<a href="'+_data[i].ldp+'" target="_blank" title="'+_data[i].org+'"><img src="'+_data[i].src+'" /></a>')
            new Image().src = _data[i].pm
        }
        if(!isHyg){
            $("#dsp_advertisement").show().empty().append(listTpl.join(""));
        }
        
        
    }
}
/*dsp底部推广广告*/
DSP.getBottomAD = function(){
    var _url = "";
    var _data = {}
    if(isSearch){
        _url = "//dsp.gome.com.cn/decision/cat";
        _data = {"p":184,"catid":dsp_gome_c3id,"c":"loadgomedspAD","area":pageData._bdarea}
    }else{
        _url = "//dsp.gome.com.cn/decision/cat";
        _data = {"p":183,"catid":dsp_gome_c3id,"c":"loadgomedspAD","area":pageData._bdarea}
    }
    var request_data = {
        JsonpName: "loadgomedspAD",
        Url:_url,
        RequestData:_data,
        Callback: DSP.renderBottomAD,
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data);
}
DSP.renderBottomAD = function(){
    var _data = this.data;

    if (_data && _data.length > 0) {
        $("#dsp_bottomAD").append('<a href="'+_data[0].ldp+'" target="_blank" title="'+_data[0].org+'"><img src="'+_data[0].src+'" /></a>').show()       
        new Image().src = _data[0].pm
    }
}

/*bigd 右侧热销商品**/
BigD.getReXiao = function(){
    var _data ={
        boxid: isResult?(isHyg?"box94":"box91"):"box45",
        area: pageData._bdarea,
        cid: pageData.cid,
        imagesize: 160,
        c1id:dsp_gome_c1id,
        c3id:dsp_gome_c3id,
        brid: dsp_gome_brid,
        search: searchkey
    }
    if(isHyg){_data.shopid = "80009736"};

    var request_data = {
        JsonpName: "reXiao",
        Url: pageData.dspIP + "/gome/rec",
        RequestData:_data,
        //BeforeSend:_this.before_request_item,
        Callback: isResult?BigD.renderReXiao:BigD.renderReXiaoBottom,
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data);
}
BigD.renderReXiao = function(){
    if (this.data.lst && this.data.lst.length > 0) {
        this.data.lst.splice(6,this.data.lst.length)
        var listTpl = templateSimple.compile(BigD.tpl_normal())(this.data);
        $("#bigD_rexiao").empty().append(listTpl);
        $("#bigD_rexiao").parent().show();
    }
}
BigD.renderReXiaoBottom = function(){
    if (this.data.lst && this.data.lst.length > 0) {
        var listTpl = templateSimple.compile(BigD.tpl_quessLike())(this.data);
        var _length = this.data.lst.length;
        $("#bottomHotSale").empty().append(listTpl);
        $("#bottomHotSale").parent().show();
        if(_length<=6){$("#bottomHotSale-refresh").hide()}
        var totlnum = (_length %6 ==0)?(parseInt(_length /6,10)-1):parseInt(_length /6,10);
        var _i = 0;
        $("#bottomHotSale").find(".item").each(function(){
            if($(this).index()<6){
                $(this).addClass("cShow");
            }
            $(this).addClass("item"+parseInt($(this).index()/6,10))
        })
        $("#bottomHotSale-refresh").bind("click",function(){
            $("#bottomHotSale").find(".item").removeClass("cShow");
            if(_i++ == totlnum || _i==3){
                _i=0;
            }
            $("#bottomHotSale").find(".item"+_i).addClass("cShow")
        })
    }
}

/*bigd 右侧购买还购买了商品**/
BigD.getAlsoBuy = function(){
    var request_data = {
        JsonpName: "alsoBuy",
        Url: pageData.dspIP + "/gome/rec",
        RequestData: {
            boxid: isHyg?"box57":"box04",
            area: pageData._bdarea,
            cid: pageData.cid,
            imagesize: 160,
            c1n: dsp_gome_c1name,
            c3n: dsp_gome_c3name,
            c1id: dsp_gome_c1id,
            c3id: dsp_gome_c3id,
            brid: dsp_gome_brid
        },
        Callback: BigD.renderAlsoBuy,
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data);
}
BigD.renderAlsoBuy = function(){
    if (this.data.lst && this.data.lst.length > 0) {
        this.data.lst.splice(4,this.data.lst.length)
        var listTpl = templateSimple.compile(BigD.tpl_normal())(this.data);
        $("#bigD_alsoBuy").empty().append(listTpl);
        $("#bigD_alsoBuy").parent().show();
    }
}

/*bigd 右侧购买最终购买了商品**/
BigD.getFinalBuy = function(){
    var request_data = {
        JsonpName: "finalBuy",
        Url: pageData.dspIP + "/gome/rec",
        RequestData: {
            boxid: isHyg?"box56":"box02",
            area: pageData._bdarea,
            cid: pageData.cid,
            imagesize: 160,
            c1n: dsp_gome_c1name,
            c3n: dsp_gome_c3name,
            c1id: dsp_gome_c1id,
            c3id: dsp_gome_c3id,
            brid: dsp_gome_brid
        },
        Callback: BigD.renderFinalBuy,
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data);
}
BigD.renderFinalBuy = function(){
    if (this.data.lst && this.data.lst.length > 0) {
        var listTpl = templateSimple.compile(BigD.tpl_normal())(this.data);
        $("#bigD_finalBuy").empty().append(listTpl);
        $("#bigD_finalBuy").parent().show();
    }
}

/*bigd 右侧一周销量**/
BigD.weekTop = function(){
    var request_data = {
        JsonpName: "weekTop",
        Url: pageData.dspIP + "/gome/rec",
        RequestData: {
            boxid: "box03",
            area: pageData._bdarea,
            cid: pageData.cid,
            imagesize: 160,
            c1n: dsp_gome_c1name,
            c3n: dsp_gome_c3name,
            c1id: dsp_gome_c1id,
            c3id: dsp_gome_c3id,
            brid: dsp_gome_brid
        },
        Callback: BigD.renderWeekTop,
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data);
}
BigD.renderWeekTop = function(){
    if (this.data.lst && this.data.lst.length > 0) {
        var listTpl = templateSimple.compile(BigD.tpl_weekTop())(this.data);
        $("#bigD_weekTop").empty().append(listTpl);
        $("#bigD_weekTop").parent().show();
    }
}
/*bigd 底部猜你喜欢**/
BigD.quessLike = function(){
    var _data = {}
    if(isSearch){
        _data = {boxid: "box92",area: pageData._bdarea,cid: pageData.cid,imagesize: 160,search: searchkey,c1id:dsp_gome_c1id,c3id:dsp_gome_c3id,brid: dsp_gome_brid}
        if(isHyg){_data.shopid = "80009736"}
    }else{
        _data = {boxid: "box05",area: pageData._bdarea,cid: pageData.cid,imagesize: 160,c1n: dsp_gome_c1name,c3n: dsp_gome_c3name,c1id: dsp_gome_c1id,c3id: dsp_gome_c3id,brid: dsp_gome_brid}
    }
    var request_data = {
        JsonpName: "quessLike",
        Url: pageData.dspIP + "/gome/rec",
        RequestData: _data,
        Callback: BigD.renderQuessLike,
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data);
}
BigD.renderQuessLike = function(){
    if (this.data.lst && this.data.lst.length > 0) {
        var listTpl = templateSimple.compile(BigD.tpl_quessLike())(this.data);
        var _length = this.data.lst.length
        $("#bigD_quessLike").empty().append(listTpl);
        $("#bigD_quessLike").parent().show();

            if(_length<=6){$("#quessYouLike-refresh").hide()}
            var totlnum = (_length %6 ==0)?(parseInt(_length /6,10)-1):parseInt(_length /6,10);
            var _i = 0;
            $("#bigD_quessLike").find(".item").each(function(){
                if($(this).index()<6){
                    $(this).addClass("cShow");
                }
                $(this).addClass("item"+parseInt($(this).index()/6,10))
            })
            $("#quessYouLike-refresh").bind("click",function(){
                $("#bigD_quessLike").find(".item").removeClass("cShow");
                if(_i++ == totlnum || _i==3){
                    _i=0;
                }
                $("#bigD_quessLike").find(".item"+_i).addClass("cShow")
            })
    }
}
/*bigd 搜了此类商品的用户还买了**/
BigD.getBrowseBuy = function(){
    var request_data = {
        JsonpName: "browseBuy",
        Url: pageData.dspIP + "/gome/rec",
        RequestData: {
            boxid: isHyg?"box95":"box93",
            area: pageData._bdarea,
            cid: pageData.cid,
            imagesize: 160,
            c1n: dsp_gome_c1name,
            c3n: dsp_gome_c3name,
            c1id: dsp_gome_c1id,
            c3id: dsp_gome_c3id,
            brid: dsp_gome_brid,
            search: searchkey
        },
        Callback: BigD.renderBrowseBuy,
        dataType: 'jsonp'
    };
    searchBase.getAjax(request_data);
}
BigD.renderBrowseBuy = function(){
    if (this.data.lst && this.data.lst.length > 0) {
        var listTpl = templateSimple.compile(BigD.tpl_normal())(this.data);
        $("#bigD_liulan").empty().append(listTpl);
        $("#bigD_liulan").parent().show();
    }
}