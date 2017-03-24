 /**
  * [getScreenDom 获取可视区域内可见对象]，获取在线客服信息；
  * 【1】获取自营商品客服 cateId：一级分类id_二级分类id_三级分类id  brandId：第一个所属品牌
  * 【2】获取联营营商品客服 shopId：店铺id
  * return  在线客服信息
 */


 function selfsell(cateId,brandId){
     return $.Deferred(function(defer){
         $.ajax({
             type:"get",
             dataType:"jsonp",
             url:"//ss" + window.cookieDomain + "/item/v1/online/" + cateId + "/" + brandId + "/" + pageData.regionId_1 + "/Y/" + loginData.loginId + "/flag/public/live800",
             jsonpName:"live800"
         }).done(function(data){
             var _data = data.result[0];
             if(_data.status == -1){
                 defer.reject();
             }else{
                 defer.resolve({
                     customerHost:_data.host,
                     customerID : _data.customerID,
                     customerInfo : _data.customerInfo
                 })
             }
         })
     }).promise();
 }
 function thirdsell(shopId){
     return $.Deferred(function(defer){
        $.ajax({
             type:"get",
             dataType:"jsonp",
             url:"//ss" + window.cookieDomain + "/item/v1/online/" + shopId + "/" + loginData.loginId + "/flag/public/live800",
             jsonpName:"live800"
        }).done(function(data){
             var _data = data.result[0];
             if(_data.status == -1){
                 defer.reject();
             }else{
                 defer.resolve({
                     customerHost:_data.host,
                     customerID : _data.customerID,
                     customerInfo : _data.customerInfo
                 })
             }
         })
     }).promise();
 }
 module.exports = {
     selfsell:selfsell,
     thirdsell:thirdsell
 };
