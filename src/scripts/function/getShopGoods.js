/**
 * [description]
 * 页面初始时，根据标识searchObj.header.searchReq.bwSec 判断是否请求页面底部用于补位的联营商品
 * 如果请求则请求结果存放于pageData.bwsData，用于综合第一页请求时底部替换商品
 */
define(function(require,exports,module){
    function getShopGoods(){
        return $.ajax({
            type:'get',
            url:searchSite+'/cloud/asynSearch',
            data:{
                module: 'product',
                from: $('#pageType').text(),
                page: 1,
                sorts:'00',
                paramJson: $('#searchReq').text(),
                bws:'-1'
            },
            dataType:'jsonp',
            jsonpCallback:'callback_shopProduct',
            timeout:1000,
            success:function(data){
                var data_arr = [];
                if(data.products){
                    var arr = data.products;
                    for(var i = 0,j= arr.length;i<j;i++){
                        data_arr.push('"'+arr[i].pId+'"');
                    }
                    pageData.bwsData = data.products;
                }
                pageData.bwsString = data_arr.join(",") || 0;
            }
        })
    }
    module.exports = {
        getShopGoods:getShopGoods
    }
})