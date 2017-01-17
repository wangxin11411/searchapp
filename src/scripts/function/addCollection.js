/**
 * [description]
 * 根据请求返回结果判断收藏是否成功
 * 请求地址："//ss"+cookieDomain + "/item/v1/sc/"+ productId +"/"+skuId+"/"+userId+"/homeSite/flag/sc/wishlist",
 * 传入参数：productId,skuId,userId
 */
define(function(require,exports,module){
    function addCollect(skuId,productId,userId,productName,callbackName){

        $.ajax({
            type:"get",
            url:"//ss"+cookieDomain + "/item/v1/sc/"+ productId +"/"+skuId+"/"+userId+"/homeSite/flag/sc/wishlist",
            dataType:"jsonp",
            jsonpCallback:callbackName
        }).done(function(data){
            var content = '';
            var request_tre = function(){};
            var dataType = data.errorType;
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
                case "下架商品不能收藏":
                    content = '<div class="mask-icon icon-waring"></div><h3 class="mask-tit">下架商品不能收藏!</h3>';
                    break;
                default:
                    break;
            }
            content = content + '<div class="mask-addCart-btn"><a class="mask-shopping closeBtn" href="javascript:void(0);">继续购物</a><a class="link" href="http://myhome'+cookieDomain+'/member/myFavorites" target="_blank">查看收藏夹</a></div>'
            require('../function/showMask').showMask(content,request_tre);
        });
    }
	module.exports = {
		addCollect:addCollect
	}
});