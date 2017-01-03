<div class="layout">
<!--顶部推荐-->
<#if (searchObj.content.recommends.size)?exists && (searchObj.content.recommends.size >3)>
	<div class="hot-tj">
		<span class="icon_tj">热卖推荐</span>
		<ul class="hot-list clearfix">
			<#assign recommendsPrds=searchObj.content.recommends.products>
			<#list recommendsPrds as item>
				<#if (item_index < 4)>
				<li class="item">
					<p class="pic">
						<a target="_blank" href="${(item.skus.sUrl)!}" title="${(item.skus.name)!}" track="click|热销推荐|box01|${item_index?if_exists}|${(item.pId)!}|三级列表：${(searchObj.content.selectData.category.third.name )!}|三级列表|${(searchObj.content.selectData.category.third.name )!}|0|0|0">
							<img src="${(item.skus.sImg)!}_130.jpg" alt="1${(item.skus.alt)!}">
						</a>
					</p>
					<p class="name">
						<a target="_blank" href="${(item.skus.sUrl)!}" target="_blank" title="${(item.skus.name)!}" track="click|热销推荐|box01|${item_index?if_exists}|${(item.pId)!}|三级列表：${(searchObj.content.selectData.category.third.name )!}|三级列表|${(searchObj.content.selectData.category.third.name )!}|0|0|0">
							${(item.skus.name)!}
						</a>
					</p>
					<p class="price">
						<span>¥${(item.skus.price)!}</span>
					</p>
					<p class="btn">
						<a target="_blank" href="${(item.skus.sUrl)!}" track="click|热销推荐|box01|${item_index?if_exists}|${(item.pId)!}|三级列表：${(searchObj.content.selectData.category.third.name )!}|三级列表|${(searchObj.content.selectData.category.third.name )!}|0|0|0" class="buy">立即抢购</a>
					</p>
				</li>
				</#if>
			</#list>
		</ul>
	</div>
	<#else>
	<div id="bigDrxtj"></div>	
</#if>
</div>