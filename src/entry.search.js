//引入facet相关模块
require("./scripts/facet/normal");
//引入toolbar相关模块
require("./scripts/toolbar/normal");
require("./scripts/toolbar/pricerange");
require("./scripts/toolbar/resultsearch");
//引入页面事件的模块-价格获取，懒加载图片
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
    require("./scripts/bigdata/search/dsp.promotion");//右侧店铺精选和底部的推广商品
    require("./scripts/bigdata/search/bigdata.hotsale");//右侧热销推荐
    require("./scripts/bigdata/search/bigdata.searchandbuy");//右侧搜索了还购买了
    require("./scripts/bigdata/search/dsp.activity");//右侧底部推荐活动（图片）
    require("./scripts/bigdata/search/dsp.activity.bottom");//页面底部推荐活动（图片）
}else{
    require("./scripts/bigdata/search/bigdata.hotsale.noresult");//无结果情况底部热销推荐
}

require("./scripts/bigdata/search/bigdata.quessyoulike");//猜你喜欢