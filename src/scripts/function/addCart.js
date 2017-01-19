/**
 * [description]
 * 到货通知：根据请求返回结果判断到货通知是否成功
 * 请求地址："//ss"+cookieDomain + "/item/v1/sc/"+ productId +"/"+skuId+"/"+userId+"/homeSite/flag/sc/wishlist",
 * 传入参数：productId,skuId,userId
 */
define(function(require,exports,module){
    var base = {
        exp:{
            "otherCard":/^[0-9.]*$/,
            "normal":/^[a-zA-Z0-9&\u4e00-\u9fa5]+$/,
            'email':/^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9]+)@[A-Za-z0-9]+\.[a-z]{2,4}$/,
            "telphone":/^(1)\d{10}$/
        }
    };
    function arriveNotice(pId,sId,cookieSid,cookieAtg,phoneNum,noticeMall,collect){
        $.ajax({
            type:"get",
            url:"//ss"+cookieDomain+"/item/v1/notice/arrival/"+pId+"/"+sId+"/"+cookieSid+"/"+cookieAtg+"/"+phoneNum+"/"+noticeMall+"/"+collect+"/flag/search/notice",
            dataType:"jsonp",
            jsonpCallback:"notice"
        }).done(function(data){
            var request_tre = setTimeout(function(){
                $("#mask-overlay").remove();
                $("#mask-box").remove();
            },3000);
            var content = "一旦该商品到货，我们会通过手机短信或邮件通知您!";
            require('../function/showMask').showMask(content,request_tre);
        })

    }

    function check_phone(val,obj){
        if(base.exp.telphone.test(val) && val!=""){
            obj.html("").hide();
            return true;
        }else if(val==""){
            obj.html('<i></i>请填写手机号码').show();
            return false;
        }else{
            obj.html('<i></i>请填写正确的手机号码').show();
            return false;
        }
    }

    function check_email(val,obj){
        if(base.exp.email.test(val) && val!==""){
            obj.html("").hide();
            return true;
        }else if(val==""){
            obj.html('<i></i>请填写邮箱地址').show();
            return false;
        }else{
            obj.html('<i></i>请填写正确的邮箱地址').show();
            return false;
        }
    }
	module.exports = {
        arriveNotice:arriveNotice,
        check_phone:check_phone,
        check_email:check_email
	}
});