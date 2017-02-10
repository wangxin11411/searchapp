/**
 * [description]
 * 根据不同筛选条件，设置页面跳转地址，包括facet多选，特殊活动，价格区间，在结果中搜索(仅结果页)
 * &pzpq=0&pzin=v5 用于品牌预测的时候用
 * queryString:筛选字段facets，promoFlag，price，et(仅搜索结果页调用)
 * valueString：修改的值，（promoFlag仅限0,1）
 */
define(function(require,exports,module){
    var href = window.location.href;
    var queryRelation = {"facets":9,"promoFlag":10,"price":6,"et":-1}; //搜索页面url的query与列表页url中对应query的index位置
    var pageCategoryQueryArray = [];
    function assembleHref(queryString,valueString){
        var reg = new RegExp("(^|&)" + queryString + "=([^&]*)(&|$)", "i");
        var replaceContent = "";
        if(window.tag == "search"){
            var r =href.substr(1).match(reg);
            if (r != null && queryString == "facets"){
                replaceContent = "&"+queryString+"="+unescape(r[2])+valueString+"&";
            }else{
                replaceContent = "&"+queryString+"="+valueString+"&";
            }
            href = (href.indexOf(queryString)!= -1)? href.replace(reg, replaceContent) : href+ "&"+queryString+"="+window.defaultFacets+valueString+(queryString=="price"?"&priceTag=1":"")+"&pzpq=0&pzin=v5";
        }else if(window.tag == "category"){
            href = window.location.pathname;
            if(href.split("-").length <= 1){
                href = href.split(".html")[0] + "-00-0-48-1-0-0-0-1-0-0-0-0-0-0-0-0-0.html";
            }
            pageCategoryQueryArray = href.split("-");
            if (queryString === "facets" && pageCategoryQueryArray[9] !== "0"){
                pageCategoryQueryArray[queryRelation[queryString]] += valueString;
            }else{
                pageCategoryQueryArray[queryRelation[queryString]] = valueString;
            }
            href = pageCategoryQueryArray.join("-");
        }else if(window.tag == "brand"){
            var hre = "search"+cookieDomain+"/search?question="+window.searchkey;
            href = hre + "&" + queryString + "=" + window.brandId + window.defaultFacets + valueString + (queryString == "price" ? "&priceTag=1" : "") + "&pzpq=0&pzin=v5";
        }
        window.location.href = href;
    }
	module.exports = {
		dofacet:assembleHref
	}
});