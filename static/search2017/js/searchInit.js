/**
 * 设置页面初始属性 浏览器类型 搜索结果页/列表页url包含参数属性；
 * pageData.hashData : 页面参数值
 * pageData.isCondition : 页面是否带参数
 * pageData.specialScreening_flag : 是否特殊活动页面
 * pageData.specialScreening_normal : 返回普通页面的地址
 * pageData.specialScreening_specical : 跳转到特殊活动页面的地址
 * pageData._bdarea : 地区参数
 * pageData.cid : 用户id
 */
var pageData = {};
(function(){
    if(isSearch){
        var _url = window.location.search;
        pageData.hashData = _url.split("&");
        if(pageData.hashData.length > 1){pageData.isCondition = true}

        if(_url.indexOf("promoFlag=1") != -1){pageData.specialScreening_flag = true}
        pageData.specialScreening_specical = _url.replace("&pzin=v5", "") + "&promoFlag=1&pzin=v5";
        if(pageData.hashData.length>3){
            pageData.specialScreening_normal = _url.replace("&promoFlag=1", "");
        }else{
            pageData.specialScreening_normal = _url.replace("&promoFlag=1&pzin=v5", "");
        }
        pageData.pageName = "搜索结果页";
    }else{
        var _url = window.location.pathname;
        pageData.hashData = _url.split("-");
        pageData.hashData_special = $.extend([],pageData.hashData)
        if(pageData.hashData.length > 1){pageData.isCondition = true}

        if (pageData.hashData[10] && pageData.hashData[10] == 1) {
            pageData.specialScreening_flag = true;
            pageData.hashData_special[10] = 0;
            pageData.specialScreening_normal = pageData.hashData_special.join("-");
        } else if (pageData.hashData[10] && pageData.hashData[10] == 0) {
            pageData.hashData_special[10] = 1;
            pageData.specialScreening_specical = pageData.hashData_special.join("-");;
        } else {
            pageData.specialScreening_specical = dsp_gome_catid + "-00-0-48-1-0-0-0-1-0-1-0-0-0-0-0-0-0.html"
        }
        pageData.pageName = "分类列表页";
    }

    if(navigator.userAgent.indexOf('MSIE 6')!=-1){
        pageData.isIE6=true;
    }else{
        pageData.isIE6=false;
    }
    pageData._bdarea ="11010200";
    pageData._bdarea_2 ="11010000";//二级区域
    pageData._bdarea_1 ="11000000";//一级区域
    if($.cookie("atgregion") != undefined && $.cookie("atgregion") != null && $.cookie("atgregion") != ""){
        pageData._bdarea = $.cookie("atgregion").split("|")[0] || "11010200"
        pageData._bdarea_2 = $.cookie("atgregion").split("|")[2] || "11010000"
        pageData._bdarea_1 = $.cookie("atgregion").split("|")[3] || "11000000"
    };
    pageData.cid = $.cookie("__clickidc");

    pageData.dspIP = "//bigd.gome.com.cn";
})()
