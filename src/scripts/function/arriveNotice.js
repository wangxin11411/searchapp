/**
 * [description]
 * 到货通知：根据请求返回结果判断到货通知是否成功
 * 请求地址："//ss"+cookieDomain+"/item/v1/notice/arrival/"+pId+"/"+sId+"/"+cookieSid+"/"+cookieAtg+"/"+phoneNum+"/"+noticeMall+"/"+collect+"/flag/search/notice",
 * 传入参数：pId,sId,cookieSid,cookieAtg
 */
define(function(require,exports,module){
    var base = {
        exp:{
            'email':/^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9]+)@[A-Za-z0-9]+\.[a-z]{2,4}$/,
            "telphone":/^(1)\d{10}$/
        }
    };
    function arriveNotice(pId,sId,cookieSid,cookieAtg){
        var request_tre1 = function(){};
        var content = '<div class="dh-warp"><h3 class="dh-title">到货通知</h3><p class="dh-info">一旦该商品到货，我们会通过手机短信或邮件通知您</p><table class="dh-form"><tbody><tr><td class="dh-hd"><em class="nHeigh">*</em>手机号码：</td><td><input class="dh-input-text" id="dh-telNum" type="text"><span id="dh-telNum-warn"></span></td></tr><tr><td class="dh-hd"><em class="nHeigh">*</em>邮箱地址：</td><td><input class="dh-input-text" id="dh-email" type="text"><span id="dh-email-warn"></span></td></tr><tr><td>&nbsp;</td><td class="dh-label-box"><label class="gmform-label" for="dhAddCollection"><input class="gmform-input-check" name="dhAddCollection" id="dhAddCollection" type="checkbox">同时加入收藏夹</label></td></tr><tr><td>&nbsp;</td><td class="dh-btn-box"><a href="javascript:void(0)" class="dh-btn-submite" id="dh-submite">确定</a><a href="javascript:void(0)" class="dh-btn-cancel closeBtn">取消</a></td></tr></tbody></table></div>';
        require('../function/showMask').showMask(content,request_tre1);
        $("#mask-overlay").remove();
        $(".dh-btn-submite").on('click',function(){
            var a = $("#dhAddCollection").attr("checked");
            var collect = "",
            phoneNum = $("#dh-telNum").val(),
            noticeMall = $("#dh-email").val();
            check_phone(phoneNum,$("#dh-telNum-warn"));
            if(check_phone(phoneNum,$("#dh-telNum-warn"))== true){
                check_email(noticeMall,$("#dh-email-warn"));
                if(check_email(noticeMall,$("#dh-email-warn")) == true){
                    if(a=="checked"){
                        collect = true;
                    }else{
                        collect = false;
                    }
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
                        $("#mask-box").remove();
                        require('../function/showMask').showMask(content,request_tre);
                    })
                }
            }
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
        arriveNotice:arriveNotice
	}
});