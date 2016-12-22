<div class="layout">
	<!--最近浏览，猜你喜欢-->
	<div class="listguess">
		<div id="hist" class="dt-sortbox">
			<h2 class="dt-tit">最近浏览</h2>
			<ul class="dt-box clearfix" id="recentlyViewed"></ul>
		</div>
		<div class="dt-gusbox">
			<h2 class="dt-tit">
			<#if (searchObj.content.seoData.totalCount)?exists && searchObj.content.seoData.totalCount=0>
				热销推荐商品
				<#else>
				根据浏览猜你喜欢
			</#if>
			</h2>
			<div class="dt-ulbox js-clsbox">
				<div class="btnl"><em class="last js-clbtnp"></em></div>
				<div class="btnr"><em class="next js-clbtnn"></em></div>
				<div class="dt-ulbox2" id="jscroll">
					<ul class="dt-pushul clearfix js-clsul" id="guessYouLike"></ul>
				</div>
			</div>
		</div>
	</div>
</div>