/***********************************************/
/*基础功能部分*/
/*ajax请求封装   searchBase.getAjax(dat)*/
/*添加收藏 searchBase.addCollection(url, callbackName, productName)*/
/*加入购物车*/
/*对比功能*/
/*页面埋码功能*/
/***********************************************/


var searchBase = {
    /* 
    *dat:{
    *   JsonpName:string,    //jsop情况下回调函数 string
    *   Url:string,         //请求地址string
    *   RequestData:{},      //请求数据-{}
    *   BeforeSend:function, //请求之前方法-function
    *   Callback:function,   //请求成功回调方法-function
    *   Param:{},            //设置回调函数中需要的参数{}
    *   dataType:'jsonp'
    *}
    */
    getAjax:function(dat){
        /* _d:传递给callback方法中需要的数据*/
        /* _d:{data:"请求响应的信息",Param:"特殊参数"}*/
        var _d={};_d.data=undefined;
        try{
            var _ajax = $.ajax({
                type:'get',
                url:dat.Url,
                data:dat.RequestData||{},
                dataType:dat.dataType||'jsonp',
                jsonpName:dat.JsonpName||'',
                jsonpCallback:dat.JsonpName||'',
                timeout:5000,
                beforeSend:function(){
                    if(dat.BeforeSend){
                        dat.BeforeSend.apply();
                    }
                },
                success:function(data){
                    _d.data=data;
                    if(dat.Param)_d.Param=dat.Param;
                    if(dat.Callback){
                        dat.Callback.apply(_d);
                    }
                },
                error:function(req,error){
                    if(dat.errorFn){
                        dat.errorFn.apply();
                    }
                    //console.log(error)
                },
                complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                    if(status=='timeout'){//超时,status还有success,error等值的情况
                     _ajax.abort(); //取消请求
                    }
                }
            });
        }catch(ex){};
    },
    /*搜索页面遮罩显示*/
    showMask:function(){
        var $maskOverlay = $('<div id="mask-overlay" class="mask-overlay"></div>').appendTo('body');
        var $bodyHeight = $("body").height(), $windowHeight = $(window).height();

        $h = Math.max($bodyHeight,$windowHeight);
        $maskOverlay.height($h+20);

    },
    /*content:需要在提示框中显示的内容，callback：拼装内容完成之后需要执行的方法*/
    addMaskContent:function(content, callback){
        $("#mask-overlay").remove();
        $("#mask-box").remove();
        var $maskContentWarp = $('<div class="mask-box" id="mask-box"><a class="mask-close closeBtn" href="javascript:void(0);">╳</a><div class="mask-content-warp" id="mask-content-warp">'+content+'</div></div>').appendTo('body');
        var $contentHeight = $maskContentWarp.height(), $contentWidth = $maskContentWarp.width()

        $maskContentWarp.css({
            "margin-left":-($contentWidth/2),
            "margin-top":-($contentHeight/2)
        })

        if(callback && typeof callback == "function"){
            callback.apply();
        }
        $(".closeBtn").bind("click",function(){
            $("#mask-overlay").remove();
            $maskContentWarp.remove();
        })
    },
    /*
        添加搜藏方法
        url: "//ss.gome.com.cn/item/v1/sc/pid商品id/skuid类别id/用户id/homeSite/flag/sc/wishlist //请求地址，需要pid和skuidhe 用户id
        callbackName：协商好的jsonp回调方法名
        productName：添加搜藏的商品名称
    */
    addCollection:function(productId, skuId, userId, callbackName, productName){
        $.ajax({
            type : "get",
            url : "//ss"+cookieDomain + "/item/v1/sc/"+ productId +"/"+skuId+"/"+userId+"/homeSite/flag/sc/wishlist",
            dataType : "jsonp",
            beforeSend:searchBase.showMask,
            jsonpCallback : callbackName,
            success : function(data) {
                var dataType = data.errorType;
                var content = '';
                var request_tre = function(){};
                switch(dataType){
                    case "isError":
                        content = '<div class="mask-icon icon-waring"></div><h3 class="mask-tit">错误！</h3>';
                        break;
                    case "isSuccess":
                        content = '<div class="mask-icon"></div><h3 class="mask-tit">成功加入收藏夹！</h3><p id="collecion-content-n">'+productName+'</p>';
                        break;
                    case "isCollect":
                        content = '<div class="mask-icon icon-waring"></div><h3 class="mask-tit">您已收藏过此商品！</h3><p id="collecion-content-n">'+productName+'</p>';http://myhome.atguat.com.cn/member/myFavorites
                        break;
                    default:
                        break;
                }
                content = content + '<div class="mask-addCart-btn"><a class="mask-shopping closeBtn" href="javascript:void(0);">继续购物</a><a class="link" href="//myhome'+cookieDomain+'/member/myFavorites" target="_blank">查看收藏夹</a></div>'
                searchBase.addMaskContent(content,request_tre)
            }
        });
    },
    /*
        添加购物车方法
        url: dynSite + "/ec/homeus/support/add.jsp" //请求地址
        cart_parameter：{
            method       : homeus.addNormalItemToOrder //接口参数
            params       : '{"productId" : productId, "catalogRefId" :SkuId, "quantity":数量, "addItemCount" :Sku的种类数量}'
        }
        
    */
    addCart:function(url, cart_parameter, callbackName,pid){
        $.ajax({
            type : "get",
            url : url,
            dataType : "jsonp",
            jsonpCallback : callbackName,
            data : cart_parameter,
            beforeSend:searchBase.showMask,
            success : function(data) {
                var request_tre = function(){};
                if(data.error && data.error.data){//添加失败                    
                    var _errorData = data.error.data,
                        _errorDataText="";
                    switch (_errorData.code){
                        case 'gomeSKU':
                            _errorDataText = '您购物车中的商品种类已达上限'+_errorData.quantityMax +'种';
                            break
                        case 'bookSKU':
                            _errorDataText = '您购物车中的图书种类已达上限'+_errorData.quantityMax +'种';
                            break
                        case 'bbcSKU':
                            _errorDataText = '您购物车中的店铺商品种类已达上限'+_errorData.quantityMax +'种';
                            break
                        case 'gomeQuantity':
                            _errorDataText = '您购物车中的相同商品购买数量不能大于'+_errorData.quantityMax +'件';
                            break
                        case 'bookQuantity':
                            _errorDataText = '您购物车中的相同图书购买数量不能大于'+_errorData.quantityMax +'件';
                            break
                        case 'bbcQuantity':
                            _errorDataText = '您购物车中的相同店铺商品购买数量不能大于'+_errorData.quantityMax +'件';
                            break;
                        case 'bbcQuantityForLimitBuy':
                            _errorDataText = _errorData.message;
                            break;
                        default:
                            _errorDataText = "该商品暂无法购买，请您联系客服解决：4008-708-708";
                            break;
                    }
                    _errorDataText='<div class="mask-icon icon-waring"></div><h3 class="mask-tit">添加失败</h3><div class="mask-text">'+_errorDataText+'</div>'
                    searchBase.addMaskContent(_errorDataText,request_tre)
                }
                if (data.result && data.result.cart) {//添加成功
                    var _successData = data.result.cart.cartSummary,
                        _successDataText = "";
                    _successDataText = _successData.totalQuantity +''+_successData.totalAmount;
                    _successDataText = '<div class="mask-icon"></div><h3 class="mask-tit">添加成功</h3><div class="mask-text">购物车共有<strong>'+_successData.totalQuantity+'</strong>件商品，商品总价：<strong>¥'+_successData.totalAmount+'</strong></div>'
                    _successDataText += '<div class="mask-addCart-btn"><a href="'+dynSite+'/ec/homeus/cart/cart.jsp" class="mask-gotoCart">去购物车结算&nbsp;&gt;</a><a class="mask-shopping closeBtn">继续购物</a></div>'
                    searchBase.addMaskContent(_successDataText,request_tre);
                }
                
            }
        });
    },
    /*加入购物车 页面跳转 新改*/
    addCartNew:function(productId,skuid,time){
        window.open(dynSite+contextPath+"/n/success/index.jsp?productId="+productId+"&catalogRefId="+skuid+"&_l="+time);
    },
    arrivalNotice:function(url){
        $.ajax({
            type : "get",
            url : url+"notice",
            dataType : "jsonp",
            jsonpCallback:"notice",
            success : function(data) { 
                var request_tre = setTimeout(function(){
                    $("#mask-overlay").remove();
                    $("#mask-box").remove();
                },3000);
                searchBase.addMaskContent(data.message,request_tre)
            }
        });  
    },
    /*不需输入的特殊文字正则*/
    exp:{
        "otherCard":/^[0-9.]*$/,
        "normal":/^[a-zA-Z0-9&\u4e00-\u9fa5]+$/,
        'email':/^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9]+)@[A-Za-z0-9]+\.[a-z]{2,4}$/,
        "telphone":/^(1)\d{10}$/
    },
    /*输入自定义价格时替换特殊字符*/
    replacePrice:function(obj,val){
        var txt=$(obj).val();
        if(!searchBase.exp.otherCard.test(val)){
            $(obj).val(val.replace(/[A-Za-z`~!@#$%^&*_+=¥￥（）()<>?:"{},\/;'[\]！。......，…——、‘；—【】|？》《“：\\\-” \u4e00-\u9fa5]/g,''))
        }
    },
    check_email:function(val,obj){
        if(searchBase.exp.email.test(val) && val!==""){
            obj.html("").hide();
            return true;
        }else if(val==""){
            obj.html('<i></i>请填写邮箱地址').show();
            return false
        }else{
            obj.html('<i></i>请填写正确的邮箱地址').show();
            return false
        }
    },
    check_phone:function(val,obj){
        if(searchBase.exp.telphone.test(val) && val!=""){
            obj.html("").hide();
            return true;
        }else if(val==""){
            obj.html('<i></i>请填写手机号码').show();
            return false
        }else{
            obj.html('<i></i>请填写正确的手机号码').show();
            return false
        }
    },
    /*在结果涨搜索*/
    replaceNormal:function(obj,val){
        var txt=$(obj).val();
        if(!searchBase.exp.otherCard.test(val)){
            $(obj).val(val.replace(/[`~!@#$%^&*_+=¥￥（）()<>?:"{},\/;'[\]！。......，…——、‘；—【】|？》《“：\\\-”]/g,''))
        }
    },
    /*异步加载数据埋码*/
    asyncMaima:function(obj,statu) {
        var modelId = obj.attr("modelid");
        var childrenElement = obj.children();
        childrenElement.each(function (index,elem) {
            if (statu) {
                $(elem).find("a").attr("data-code", modelId + "-" + (index+1));
            } else {
                $(elem).attr("data-code", modelId + "-" + (index+1));
            }
        });
    }
}