//引入facet相关模块
require("./scripts/facet/normal");
//引入toolbar相关模块
require("./scripts/toolbar/normal");
require("./scripts/toolbar/pricerange");
require("./scripts/toolbar/resultsearch");
//引入页面事件的模
// 块-价格获取，懒加载图片
require("./scripts/about/lazyload");
//引入页面事件的模块-商品事件
require("./scripts/about/product");

if(isBwSec){
    require('./scripts/function/getShopGoods').getShopGoods();
}
setTimeout(function(){
    require('./scripts/function/getGoods').getGoods("搜索结果页");
},0);

if(window.isResult){
    require("./scripts/about/bigdata/search/dsp.promotion");//右侧店铺精选和底部的推广商品
    require("./scripts/about/bigdata/search/bigdata.hotsale").getData("#prdRight-2");//右侧热销推荐
    require("./scripts/about/bigdata/search/bigdata.searchandbuy").getData("#prdRight-3");//右侧搜索了还购买了
    require("./scripts/about/bigdata/search/dsp.activity").getData("#prdRight-4");//右侧底部推荐活动（图片）
    require("./scripts/about/bigdata/search/dsp.activity.bottom").getData("#prdBottom-4");//页面底部推荐活动（图片）
}else{
    require("./scripts/about/bigdata/search/bigdata.hotsale.noresult").getData("#prdBottom-1");//无结果情况底部热销推荐
}
document.getElementById("lazyajaxloadarea").onmouseenter = function (event) {
    require("./scripts/about/bigdata/search/bigdata.quessyoulike").getData("#prdBottom-2");//猜你喜欢
    require("./scripts/about/servicedata/recentview").getData("search","#prdBottom-recent");//最近浏览
    this.remove()
};

