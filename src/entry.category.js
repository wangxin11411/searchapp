//引入facet相关模块
require("./scripts/facet/normal");
//引入toolbar相关模块
require("./scripts/toolbar/normal");
require("./scripts/toolbar/pricerange");
//引入页面事件的模块-价格获取，懒加载图片
require("./scripts/about/lazyload");
//引入页面事件的模块-商品事件
require("./scripts/about/product");
if(isBwSec){
    require('./scripts/function/getShopGoods').getShopGoods();
}
setTimeout(function(){
    require('./scripts/function/getGoods').getGoods("三级列表页");
},0);

require("./scripts/about/servicedata/cloudtuijian").getData();//顶部云眼推荐商品
require("./scripts/about/bigdata/category/dsp.promotion");//右侧店铺精选和底部的推广商品
require("./scripts/about/bigdata/category/bigdata.weektop").getData("#prdRight-2");//右侧一周销量排行广商品
require("./scripts/about/bigdata/category/bigdata.lookandbuy").getData("#prdRight-3");//右侧浏览了还购买商品
require("./scripts/about/bigdata/category/bigdata.buyandbuy").getData("#prdRight-4");//右侧购买了还购买商品
require("./scripts/about/bigdata/category/dsp.activity").getData("#prdRight-5");//右侧底部推荐活动（图片）

document.getElementById("lazyajaxloadarea").onmouseenter = function (event) {
    require("./scripts/about/bigdata/category/bigdata.quessyoulike").getData("#prdBottom-2");//猜你喜欢
    require("./scripts/about/bigdata/category/dsp.activity.bottom").getData("#prdBottom-4");//页面底部推荐活动（图片）
    require("./scripts/about/servicedata/recentview").getData("list","#prdBottom-recent");//最近浏览
    this.remove()
};