<div class="result-wrap clearfix" id="prodByAjax">
	<#if (searchObj.content.prodInfo)??>
		<#if searchObj.content.prodInfo.products?? && searchObj.content.prodInfo.products?size &gt; 0>
			<ul class="products">
				<#assign prdObj = searchObj.content.prodInfo>
				<#list prdObj.products as prd>
					<li class="prdli" g-li="${prd.pId!}" g-data="${prd_index + 1}">
						<div class="p-hide" id="${prd.pId!}">
							<span id="${prd.skus.skuId!}-sku-id">${(prd.skus.skuId)!}</span>
							<span id="${prd.skus.skuId!}-product-id">${(prd.pId)!}</span>
				      		<span id="${prd.skus.skuId!}-display-name">${(prd.skus.name)!}</span>
				      		<span id="${prd.skus.skuId!}-sku-url">${(prd.skus.pUrl)!}</span>
				      		<span id="${prd.skus.skuId!}-3G-cart">${(prd.skus.partGroup)!}</span>
				      		<span id="${prd.skus.skuId!}-sale-count">${(prd.salesVolume)!}</span>
				      		<span id="${prd.skus.skuId!}-gome-art">false</span>
				      		<span id="${prd.skus.skuId!}-product-tag">${(prd.productTag)!}</span>
						    <span id="${prd.skus.skuId!}-stock">${(prd.stock)!}</span>
						    <span id="${prd.skus.skuId!}-defCatId">${(prd.defCatId)!}</span>
						</div>
						<#if (prdObj.clothes??) && (prdObj.clothes == true)><#--clothes为服装的情况-->
							<div class="J_zoom">
								<#if (prd.isGomeart??) && (prd.isGomeart == true)>
							    	<a class="emcodeItem" target="_blank" track="产品列表:图片:${(prd.pId)!}" href="${(prd.skus.pUrl)!}"  title="${((prd.skus.alt)!)?xhtml}${((prd.skus.promoDesc)!)?xhtml}"><img class="bigImg" gome-src="${(prd.skus.sImg)!}" alt="${((prd.skus.alt)!)?xhtml}" src="http://img.gomein.net.cn/images/grey.gif"></a>
							    <#elseif (prd.isBigImg??) && (prd.isBigImg == true)>
							    	<a class="emcodeItem" target="_blank" track="产品列表:图片:${(prd.pId)!}" href="${(prd.skus.pUrl)!}"  title="${((prd.skus.alt)!)?xhtml}${((prd.skus.promoDesc)!)?xhtml}"><img class="bigImg" gome-src="${(prd.skus.sImg)!}_220_275.jpg" alt="${((prd.skus.alt)!)?xhtml}" src="http://img.gomein.net.cn/images/grey.gif"></a>
							    <#else>
							    	<a class="emcodeItem" target="_blank" track="产品列表:图片:${(prd.pId)!}" href="${(prd.skus.pUrl)!}"  title="${((prd.skus.alt)!)?xhtml}${((prd.skus.promoDesc)!)?xhtml}"><img class="bigImg" gome-src="${(prd.skus.sImg)!}_160.jpg" alt="${((prd.skus.alt)!)?xhtml}" src="http://img.gomein.net.cn/images/grey.gif"></a>
							    </#if>
							</div>
							<#if prd.images??>
							<div class="img-wrap clearfix">
								<#if (prd.images?size > 5)>
								 	<a href="javascript:void(0);" class="icon prev disable js-prev"><s class="icon_prev"></s></a>
								 	<a href="javascript:void(0);" class="icon next js-next"><s class="icon_next"></s></a>
								</#if>
					 			<div class="small-wrap">
							    	<ul class="imgList">
							      		<#list prd.images as thumbnail>
								      		 <#assign imgCurrent = "" >
								      		 <#if (thumbnail.skuId)?? && (thumbnail.skuId == prd.skus.skuId)>
								      			<#assign imgCurrent = "current" >
								      		 </#if>
								             <li i-li="${(prd.pId)!}-${(prd.skus.skuId)!}" class="${imgCurrent!}">
									            <s></s>
									            <a track="商品小图:${(prd.skus.skuId)!}" href="javascript:void(0);" title="${(thumbnail.color)!}">
									            	<img pid="${(thumbnail.pId)!}" sid="${(thumbnail.skuId)!}" gome-src='${(thumbnail.sImg)!}_30.jpg' alt='${(thumbnail.color)!}' src="http://img.gomein.net.cn/images/grey.gif" />
									            </a>
								             </li>
								      	 </#list>
							      	</ul>
								</div>
							</div>
							</#if>
						<#elseif (prdObj.merchandise)?? && (prdObj.merchandise == true)><#--merchandise为百货商品的情况-->
							<div class="merchandise">
								<a class="emcodeItem" target="_blank" track="产品列表:图片:${(prd.pId)!}" href="${(prd.skus.pUrl)!}"  title="${((prd.skus.alt)!"")?xhtml}${((prd.skus.promoDesc)!"")?xhtml}"><img class="bigImg" gome-src="${(prd.skus.sImg)!}_210.jpg" alt="${((prd.skus.alt)!)?xhtml}" src="http://img.gomein.net.cn/images/grey.gif"></a>
							</div>
							<#if prd.images??>
								<div class="img-wrap clearfix">
									<#if (prd.images?size > 5)>
									 	<a href="javascript:void(0);" class="icon prev disable js-prev"><s class="icon_prev"></s></a>
									 	<a href="javascript:void(0);" class="icon next js-next"><s class="icon_next"></s></a>
									</#if>
						 			<div class="small-wrap">
								    	<ul class="imgList">
								      		<#list prd.images as thumbnail>
									      		 <#assign imgCurrent = "" >
									      		 <#if (thumbnail.skuId)?? && (thumbnail.skuId == prd.skus.skuId)>
									      			<#assign imgCurrent = "current" >
									      		 </#if>
									             <li i-li="${(prd.pId)!}-${(prd.skus.skuId)!}" class="${imgCurrent!}">
										            <s></s>
										            <a track="商品小图:${(prd.skus.skuId)!}" href="javascript:void(0);" title="${(thumbnail.color)!}">
										            	<img pid="${(thumbnail.pId)!}" sid="${(thumbnail.skuId)!}" class="js-merchandise-img" gome-src='${(thumbnail.sImg)!}_30.jpg' alt='${(thumbnail.color)!}' src="http://img.gomein.net.cn/images/grey.gif" />
										            </a>
									             </li>
									      	 </#list>
								      	</ul>
									</div>
								</div>
							</#if>
							<#else>
							<p class="pic-wrap">
								<#if (prdTao.isGomeart??) && (prd.isGomeart == true)>
									<a class="emcodeItem" track="产品列表:图片:${(prd.pId)!}" target="_blank" href="${(prd.skus.pUrl)!}"  title="${((prd.skus.alt)!"")?xhtml}${((prd.skus.promoDesc)!"")?xhtml}"><img alt="${((prd.skus.alt)!)?xhtml}" gome-src="${(prd.skus.sImg)!}" src="http://img.gomein.net.cn/images/grey.gif"></a>
								<#else>
									<a class="emcodeItem" track="产品列表:图片:${(prd.pId)!}" target="_blank" href="${(prd.skus.pUrl)!}"  title="${((prd.skus.alt)!"")?xhtml}${((prd.skus.promoDesc)!"")?xhtml}"><img alt="${((prd.skus.alt)!)?xhtml}" gome-src="${(prd.skus.sImg)!}_210.jpg" src="http://img.gomein.net.cn/images/grey.gif"></a>
								</#if>
				            </p>
						</#if>
						<p class="name">
				        	<a class="emcodeItem" track="产品列表:链接:${(prd.pId)!}" href="${(prd.skus.pUrl)!}" title="${((prd.skus.alt)!"")?xhtml}${((prd.skus.promoDesc)!"")?xhtml}" target="_blank">${(prd.skus.name)!}<em class="hot">${(prd.skus.promoDesc)!}</em></a>
				        </p>
				        <p class="price-wrap">
				        	<#if  (prd.skus.stock??) && (prd.skus.stock == 3) && (prd.skus.showPrice??) && (prd.skus.showPrice == 1)>
								<span class="pre-price">敬请期待</span>
							<#else>
				            	<span class="price"><em>¥</em>${(prd.skus.price)!}</span>
							</#if>
                          <#if (prd.marketTag??) && (prd.marketTag == 1)>
                                <span class="price-hwg"></span>
                                <span class="price-hwg-ms"></span>
                          </#if>
							<#if (prd.allPromos??) && (prd.allPromos?size &gt; 0)>
								<#list prd.allPromos as promotion>
									<span class="price-hot">${(promotion.name)!}</span>
								</#list>
							</#if>
			            </p>
			            <p class="info">
			              	<a class="metatit" target="_blank" href="http://review${storeConfiguration.cookieDomain}/${(prd.pId)!}-0-1.html">已有<em>${(prd.evaluateCount)!}</em>人评价</a>
			              	<#if (prd.skus.stock??) && (prd.skus.stock==0)>
			              		<span class="post no-post">${(prd.skus.cityName)!}无货</span>
			              	<#elseif  (prd.skus.stock??) && (prd.skus.stock==1)>
			              		<span class="post">${(prd.skus.cityName)!}有货</span>
			              	<#elseif  (prd.skus.stock??) && (prd.skus.stock==2)>
			              		<span class="post post-reserve">${(prd.skus.cityName)!}暂不支持配送</span>
			              	<#elseif  (prd.skus.stock??) && (prd.skus.stock==3)>
			              		<span class="post post-reserve">正在预约中</span>
			              	<#elseif  (prd.skus.stock??) && (prd.skus.stock==4)>
			              		<span class="post no-post">正在抢购中</span>
			              	<#else>
			              		<span class="post post-reserve">${(prd.skus.cityName)!}无货</span>
			              	</#if>
			            </p>
			            <p class="btn-wrap clearfix">
			            	<#if prd.skus.stock??>
                                <#if ((prd.shopId)?? && (prd.shopId == "80007081"))>
                                    <span track="添加购物车:${(prd.pId)!}:${(prd.skus.price)!}"  pid="${(prd.pId)!}" defCat="${(prd.defCatId)!}" sid="${(prd.skus.skuId)!}" onclick="window.location.href='${(storeConfiguration.staSite)!}/product/${(prd.pId)!}-${(prd.skus.skuId)!}.html';return false">立即购买</span>
                                <#elseif ( prd.skus.stock == 3 || prd.skus.stock == 4)>
			            			<span onclick="window.location.href='${(storeConfiguration.productSite)!}/${(prd.pId)!}-${(prd.skus.skuId)!}.html';return false;"  pid="${(prd.pId)!}" class="product-list-add-shopcart" defCat="${(prd.defCatId)!}" sid="${(prd.skus.skuId)!}">预约购买</span>
			            		<#elseif prd.skus.stock == 1>
                                    <span track="添加购物车:${(prd.pId)!}:${(prd.skus.price)!}"  pid="${(prd.pId)!}" class="product-list-add-shopcart addca" defCat="${(prd.defCatId)!}" sid="${(prd.skus.skuId)!}" market="${(prd.marketTag)!}">加入购物车</span>
                                <#elseif prd.skus.stock == 0>
                                    <span class="product-list-add-shopcart" onclick="window.location.href='${(storeConfiguration.productSite)!}/${(prd.pId)!}-${(prd.skus.skuId)!}.html';return false">到货通知</span>
                                <#else>
                                    <span track="添加购物车:${(prd.pId)!}:${(prd.skus.price)!}"  pid="${(prd.pId)!}" class="product-list-add-shopcart addca" defCat="${(prd.defCatId)!}" sid="${(prd.skus.skuId)!}" market="${(prd.marketTag)!}">加入购物车</span>
			            		</#if> 
			            	</#if>
			            	<span track="产品列表:收藏:${(searchObj.content.selectData.category.third.id)!}" pid="${(prd.pId)!}" class="collect product-list-add-wishList emcodeProp17" sid="${(prd.skus.skuId)!}">收藏</span>
			                <span track="产品列表:对比" class="compare display-page-compare-checkbox emcodeProp17" type="checkbox" pid="${(prd.pId)!}" sid="${(prd.skus.skuId)!}" id="shareChk"></span>
			            </p>
			            <div class="shopName">
			            	<#if (prd.thirdProduct??) && (prd.thirdProduct == true)>
			            		<a track="产品列表:${(prd.sName)!}" style="color:#0066CC;"  target="_blank" href="${(prd.mUrl)!}">${(prd.sName)!}</a>
			            	<#else>
			            		国美自营
			            	</#if>
			            	
			            </div>
					</li>
				</#list>
			</ul>
		<#else>
			<center>抱歉，没有找到符合条件的商品！ <a onclick="javascript:window.history.go(-1);return false;" href="javascript:void(0);">返回上一步</a></center>
		</#if>
	</#if>
	<#-- <span style="display:none" value="">${searchObj.content.prodInfo?size}</span> -->
	<div class="pop-icon"></div>
</div>
<div style="display:none" id="searchReq">${searchReq!}</div>
<input type="hidden" id="hiddenPageCount" value="${(searchObj.content.pageBar.totalPage)!}" />
<input type="hidden" id="hiddenPageSize" value="${(searchObj.content.pageBar.pageSize)!}" />
<div class="compare-bar" style="display: none;">
	<div id="errorCompare" class="error" style="display: none;"></div>
	<div class="hd">
		<ul class="title clearfix">
			<li class="compare_li hover">对比栏<em id="pCount">（0）</em>
			</li>
			<li class="compare_lesat">最近浏览</li>
		</ul>
		<a class="more" href="javascript:void(0);">隐藏</a>
	</div>

	<div class="bd clearfix">
		<div class="items compare-bd" id="compare">
			<ul class="clearfix">
				<li class="compare-items">
					<p class="pic">1</p>
					<p class="txt">您还可以继续添加</p> <s></s></li>
				<li class="compare-items">
					<p class="pic">2</p>
					<p class="txt">您还可以继续添加</p> <s></s></li>
				<li class="compare-items">
					<p class="pic">3</p>
					<p class="txt">您还可以继续添加</p> <s></s></li>
				<li class="compare-items">
					<p class="pic">4</p>
					<p class="txt">您还可以继续添加</p> <s></s></li>
				<li class="compare-items last">
					<p class="btn-wrap">
						<a class="btn disable" href="javascript:void(0);">对比</a> <a class="btn-clear" onclick='javascript:clearCompare();return false;' href="javascript:void(0);">清空对比栏</a>
					</p></li>
			</ul>
		</div>
		
		<div style="display:none" class="items newly-bd js-cbox">
		<a track="对比栏:left" href="javascript:void(0);" class="icon icon-prev js-cprev"><i class="prev"></i></a>
		<a track="对比栏:right" href="javascript:void(0);" class="icon icon-next js-cnext"><i class="next"></i></a>
		<div class="newly-cont" id="history">
		</div>
		<p class="noItem" style="display:none;">您最近没有查看过商品！</p>
		</div>
	</div>
</div>
<textarea id="templateCompare" style="display:none;">
	<ul  class="clearfix" >
	    <% for(var i=0,l=items.length; i<l; i++){ %>
	    <li class="compare-items add">
	       <p class="pic">
	           <a target="_blank" href="<%= items[i].pUrl %>" title="<%= items[i].pName %>">
	           <img alt="<%= items[i].pName %>" src="<%= items[i].pImg %>_50.jpg"></a>
	       </p>
	       <p class="name">
	       <a target="_blank" title="<%= items[i].pName %>" href="<%= items[i].pUrl %>"><%= items[i].pName %></a></p>
	       <p class="price-wrap">
	           <span class="price">¥<%= items[i].price %></span>
	           <a class="del" onclick="javascript:del(this);" sid="<%= items[i].skuId %>" pid="<%= items[i].pId %>" track="对比栏:删除" href="javascript:;" style="display:none;">删除</a>
	       </p>
	       <s></s>
	    </li>
	    <%
	    }
	    %>
	</ul>
</textarea>
