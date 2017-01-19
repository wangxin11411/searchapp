define(function(require,exports,module){
	/**
	 * [showMask description] 创建弹出层
	 * @param  {[type]} content [html内容]
	 * @param  {Function} callback [description]
	 * @return {[type]}         [description]
	 */
	function showMask(content,callback){
		//遮罩层
        var $bodyHeight = $("body").height(),
	        $windowHeight = $(window).height(),
	        $h = Math.max($bodyHeight,$windowHeight);
        //弹出层主内容
        var $maskContentWarp = $('<div class="mask-box" id="mask-box"><a class="mask-close closeBtn" href="javascript:void(0);">╳</a><div class="mask-content-warp" id="mask-content-warp">'+content+'</div></div>');
        $maskContentWarp.appendTo('body');
        var $contentHeight = $maskContentWarp.height(),
        	$contentWidth = $maskContentWarp.width();


        $('<div id="mask-overlay" class="mask-overlay"></div>').css("height",$h).appendTo('body');
        $maskContentWarp.css({
            "margin-left":-($contentWidth/2),
            "margin-top":-($contentHeight/2)
        });
        if(callback && typeof callback == "function"){
            callback.apply();
        }
        $(".closeBtn").on('click',function(){
            closeMask();
        })
        $(".dh-btn-submite").on('click',function(){
            var a = $("#dhAddCollection").attr("checked");
            var collect = "";
            var cookieAg = $.cookie("atgregion").split("|")[0];
            var userId = $.cookie("SSO_USER_ID");
            require('../function/addCart').check_phone($("#dh-telNum").val(),$("#dh-telNum-warn"));
            if(require('../function/addCart').check_phone($("#dh-telNum").val(),$("#dh-telNum-warn"))== true){
                require('../function/addCart').check_email($("#dh-email").val(),$("#dh-email-warn"));
                if(require('../function/addCart').check_email($("#dh-email").val(),$("#dh-email-warn")) == true){
                    if(a=="checked"){
                        collect = true;
                    }else{
                        collect = false;
                    }
                    require('../function/addCart').arriveNotice("9134521004","1123461018",userId,cookieAg,$("#dh-telNum").val(),$("#dh-email").val(),collect);
                    closeMask();
                }
            }
        })
	}

	function closeMask(){
		$("#mask-overlay").remove();
        $("#mask-box").remove();
	}


	module.exports = {
		showMask:showMask,
		closeMask:closeMask
	}
})