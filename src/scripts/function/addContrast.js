//cookie-name compare
(function($) {
  
  

    


  $.fn.accordion = function(options) {
    Array.prototype.removeValve = function(val) {
      for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
          this.splice(i, 1);
          break;
        }
      }
    };

    var _default = {
      style:"",
      isMultiple:true
    };
    var _opt = $.extend({},_default,options);
    var _max = 4;//可对比的商品数量

    var _dataCompared = $.cookie("compare")?$.cookie("compare").replace(":","-").split(",").splice(0,max) : [];


    for(var i=0,j=_dataCompared.length;i<j&&i<_max;i++){
      $(dataCompared[i]).data("isCompared",true).style = _opt.style;
    }



    function assemble(){
      var compareBoxHTML = '<div class="gm-compareBox"><ul class="gm-compareBox-hd"><li class="tabs-hide">隐藏</li><li class="tabs cur">对比栏(0)</li></ul><div class="gm-compareBox-bd"><div class="gm-compareBox-opt"><p><a href="javascript:void(0)" class="go-commpare disable">对比</a></p><p><a href="javascript:void(0)" class="clear-commpare">清空对比栏</a></p></div><ul class="gm-compareBox-list"><li class="item-compare"><div class="default"><span>1</span>您还可以继续添加</div><div class="product"></div></li><li class="item-compare"><div class="default"><span>2</span>您还可以继续添加</div><div class="product"></div></li><li class="item-compare"><div class="default"><span>3</span>您还可以继续添加</div><div class="product"></div></li><li class="item-compare"><div class="default"><span>4</span>您还可以继续添加</div><div class="product"></div></li></ul></div></div>';
      var compareBoxStyle='<style type="text/css">.gm-compareBox{position:fixed;bottom:0;z-index:10;overflow:hidden;width:990px;height:142px;background:#fff;box-shadow:0 0 20px rgba(0,0,0,.19)}.gm-compareBox-hd{height:32px;border-bottom:1px solid #e6e6e6;background:#f3f3f3;line-height:32px}.gm-compareBox-hd .tabs-hide{float:right;margin-right:10px;color:#06c;cursor:pointer}.gm-compareBox-hd .tabs{float:left;width:140px;height:32px;text-align:center}.gm-compareBox-hd .cur{position:relative;border-right:1px solid #e6e6e6;border-bottom:1px solid #fff;background-color:#fff;color:#c00;font-weight:700}.gm-compareBox-bd{overflow:hidden;padding-top:25px;padding-right:110px;height:85px}.gm-compareBox-list .item-compare{position:relative;float:left;margin-right:3px;width:215px;height:84px}.gm-compareBox-list .default{padding:0 12px;width:191px;height:80px;border-bottom:4px solid #e6e6e6;color:#ccc}.gm-compareBox-list .default span{float:left;overflow:hidden;margin-right:12px;width:50px;height:50px;border:1px solid #e7e7e7;background:#f6f6f6;text-align:center;font:46px/50px "Microsoft YaHei"}.gm-compareBox-list .product{padding:0 12px;width:191px;height:80px;border-bottom:4px solid #c00}.gm-compareBox-list .product .pic{float:left;overflow:hidden;margin-right:12px;width:50px;height:50px;border:1px solid #e7e7e7;background:#f6f6f6;text-align:center}.gm-compareBox-list .product .name{overflow:hidden;height:36px;word-wrap:break-word;word-brak:break-all}.gm-compareBox-list .product .price{color:#e3101e}.gm-compareBox-list .product .delete{float:right;visibility:hidden;color:#06c}.gm-compareBox-list .product:hover .delete{visibility:visible}.gm-compareBox-opt{float:right;margin-right:-110px;width:110px;text-align:center}.gm-compareBox-opt .go-commpare{display:inline-block;margin-bottom:3px;width:68px;height:30px;line-height:30px}.gm-compareBox-opt .disable{border:1px solid #e6e6e6;background:#f8f8f8 none repeat scroll 0 0;color:#ccc;cursor:default}.gm-compareBox-opt .clear-commpare{color:#06c}</style>';
      $("body").append(compareBoxStyle+compareBoxHTML);
    }

    $(this).on("click",function(){
      var _this = $(this);
      if(_this.data("isCompared")){
        if(_dataCompared.length >= 4){return false;}
        _dataCompared.push(_this.prop('id'));
      }else{
        _dataCompared.removeValve(_this.prop('id'));
      }
      _this.data("isCompared",!_this.data("isCompared")) 
      $.cookie("compare", _dataCompared.join("|").replace("-",":"), {expires: 30,path: '/'});
    })



    if('addEventListener' in document) {
        window.addEventListener('message', set_height, false);
    }else('attachEvent' in document){
        window.attachEvent('onmessage', set_height);
    }

    
    function set_height(msg){
        //根据计划使用msg.data数据
        document.getElementById("xnframe").style.height = msg.data+"px"
    }

    function set_basicStructure(){
        
    }

    return this.each(function() {
      if($(this).)
    });
 
    function onClick() {
      $(this).siblings('dt').each(hide);
      $(this).next().slideDown('fast');
      return false;
    }
 
    function hide() {
      $(this).next().slideUp('fast');
    }
 
    function reset() {
      $(this).next().hide();
    }

    //初始
    
    //点击
    
    //展示
    //隐藏
    
    //对比跳转
    //清空对比
    //删除对比
  }
})(jQuery);