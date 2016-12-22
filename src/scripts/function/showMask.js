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
        var $maskContentWarp = $('<div class="mask-box" id="mask-box"><div class="mask-content-warp" id="mask-content-warp">'+content+'</div></div>'),
        	$contentHeight = $maskContentWarp.height(),
        	$contentWidth = $maskContentWarp.width()

        $('<div id="mask-overlay" class="mask-overlay"></div>').css("height",$h).appendTo('body');
        $maskContentWarp.css({
            "margin-left":-($contentWidth/2),
            "margin-top":-($contentHeight/2)
        }).appendTo('body');

        if(callback && typeof callback == "function"){
            callback.apply();
        }
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