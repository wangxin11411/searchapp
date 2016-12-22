<div class="filter-section clearfix" id="filterSection">
	<div class="filter-layout clearfix">
		<#--sorting-->
		<div class="filter-item sorting">
			<#if searchObj.content.selectData.isSearch>
				<#assign searchSite="${storeConfiguration.searchSite}">
			<#else>
				<#assign searchSite ="${storeConfiguration.listSite}">
			</#if>
			<#if searchObj.content??>
				<#if (searchObj.content.toolBar.sort)??>
				<#assign toolItem = searchObj.content.toolBar.sort>
			        <#if toolItem.default.isDefault??>
				        <a href="javascript:void(0)" class="sorting-btn cur emcodeProp17" track="筛选条件:综合">综合</a>
			        <#else>
			        	<a href="${searchSite!}${(toolItem.default.url)!}#filterSection" class="sorting-btn emcodeProp17" title="点击后恢复默认排序" track="筛选条件:综合">综合</a>
			        </#if>
			        <#if toolItem.sale.isDefault??>
				        <a href="${searchSite!}${(toolItem.default.url)!}#filterSection" class="sorting-btn cur emcodeProp17" title="点击后恢复默认排序" track="筛选条件:销量">销量</a>
			        <#else>
			        	<a href="${searchSite!}${(toolItem.sale.url)!}#filterSection" class="sorting-btn emcodeProp17" title="点击后销量从高到低排序" track="筛选条件:销量">销量</a>
			        </#if>
				    <#if toolItem.price.isDefault??>
				    	<#assign priceStyle = "" >
				    	<#if (toolItem.price.sort??) && (toolItem.price.sort == "21")>
				    		<#assign priceStyle = 'class="priceAsc"' >
				    		<a href="${searchSite!}${(toolItem.price.url)!}#filterSection" class="sorting-btn cur emcodeProp17" style="width:36px;text-align:left;" title="点击后价格从高到低排序" track="筛选条件:价格">价格<s ${priceStyle!}></s></a>
				        <#else>
				        	<#assign priceStyle = 'class="priceDesc"' >
				        	<a href="${searchSite!}${(toolItem.price.url)!}#filterSection" class="sorting-btn cur emcodeProp17" style="width:36px;text-align:left;" title="点击后价格从低到高排序" track="筛选条件:价格">价格<s ${priceStyle!}></s></a>
			        	</#if>
			        	<#else>
			        	<a href="${searchSite!}${(toolItem.price.url)!}#filterSection" class="sorting-btn emcodeProp17" title="点击后价格从低到高排序" track="筛选条件:价格">价格</a>
			        </#if>
			        <#if toolItem.startDate.isDefault??>
			        	<a href="${searchSite!}${(toolItem.default.url)!}#filterSection" class="sorting-btn cur emcodeProp17" title="点击后恢复默认排序" track="筛选条件:新品">新品</a>
			        <#else>
		        	<a href="${searchSite!}${(toolItem.startDate.url)!}#filterSection" class="sorting-btn emcodeProp17" title="" track="筛选条件:新品">新品</a>
			        </#if>
			        <#if toolItem.evaluateCount.isDefault??>
			        	<a href="${searchSite!}${(toolItem.default.url)!}#filterSection" class="sorting-btn cur emcodeProp17" title="点击后价格从高到低排序" track="筛选条件:评价">评价</a>
			        <#else>
			        	<a href="${searchSite!}${(toolItem.evaluateCount.url)!}#filterSection" class="sorting-btn emcodeProp17" title="点击后评价数从高到低排序" track="筛选条件:评价">评价</a>
			        </#if>
		        </#if>
	        </#if>
	     </div>
	     <#--priceRange-->
	     <div class="filter-item price-range" id="J_price_range_form">
	          <em>按价格筛选</em>
	          <div class="form-wrap">
      			<#if (searchObj.content.selectData.price)??>
		             <b class="pri-item"><i class="ui-price-plain">￥</i><input type="text" class="txt js-check" id="salePriceStart" value="${(searchObj.content.selectData.price.lowPrice)!}" /></b>
		             <s>-</s>
		             <b class="pri-item"><i class="ui-price-plain">￥</i><input type="text" class="txt js-check" id="salePriceEnd" value="${(searchObj.content.selectData.price.highPrice)!}" /></b>
		            <#else>
		            <b class="pri-item"><i class="ui-price-plain">￥</i><input type="text" class="txt js-check" id="salePriceStart" value="" /></b>
		             <s>-</s>
		             <b class="pri-item"><i class="ui-price-plain">￥</i><input type="text" class="txt js-check" id="salePriceEnd" value="" /></b>
		         </#if>
	          	<a href="javascript:void(0);" class="btn emcodeProp17" id="rangeBtn" track="筛选条件:按价格筛选">确定</a>
	          </div>
	      </div>
	      <div class="filter-item">
	      	<!--<label class="specialScreening"><input type="checkbox" id="specialScreening" /></label>-->
	      	  <span style="color:#f8f8f8;">${(searchObj.header.serverInfo.server)!}</span>
	      </div>
	      <#--pageNav-->
	      <div class="filter-item page-nav">
	      	<#if searchObj.content??>
	      		<#if (searchObj.content.pageBar)??>
	      			<#assign totalPage = searchObj.content.pageBar.totalPage?number>
	      			<#assign pageSize = searchObj.content.pageBar.pageSize?number>
	      			<span class="info">共${(searchObj.content.pageBar.totalCount)!}商品</span>
	      			 <span class="num"><em>${(searchObj.content.pageBar.pageNumber)!}</em>/<i>${(searchObj.content.pageBar.totalPage)!}</i></span>
	      			 <input type="hidden" id="hiddenTotalPage" value="${(searchObj.content.pageBar.totalPage)!}" />
					 <input type="hidden" id="hiddenPageNumber" value="${(searchObj.content.pageBar.pageNumber)!}" />
					 <input type="hidden" id="hiddenTotalCount" value="${(searchObj.content.pageBar.totalCount)!}" />
	      			 <#if searchObj.content.pageBar.pageNumber == 1>
	      			 	<a href="javascript:void(0)" class="prev disable"><s class="icon-prev"></s></a>
	      			 <#else>
	      			 	<a href="javascript:void(0);" class="emcodeProp17" track="筛选条件:上一页"><s class="icon-prev"></s></a>
	      			 </#if>
	      			 
	      			 <#if searchObj.content.pageBar.pageNumber == searchObj.content.pageBar.totalPage>
	      			 	<a class="next disable"><s class="icon-next"></s></a>
	      			 <#else>
	      			 	<a href="javascript:void(0);" class="next emcodeProp17" track="筛选条件:下一页"><s class="icon-next"></s></a>
	      			 </#if>
	      		</#if>
	      	</#if>
	      </div>
	</div>
	<div class="filter-layout">
		<span class="dt filter-item" style="height:24px; line-height:24px;padding-left:15px;">送至：</span>
		<div class="filter-item address dn" id="J-address">
            <span class="regon" id="address">
                <a href="javascript:;" id="stockaddress"></a>
                <i></i>
                <span class="space"></span>
            </span>
            <div class="gCity clearfix"></div>
		</div>
		<div class="filter-item goods">
        <#if (searchObj.content.toolBar.instock.isDefault??) && (searchObj.content.toolBar.instock.isDefault=true)>
            <label for="filter-goods" class="mr10"><input type="checkbox" name="filter-goods" id="filter-goods" onfocus="this.blur();" onclick="javascript:window.location.href='${searchSite!}${(searchObj.content.toolBar.instock.url)!}#filterSection'" checked />仅显示有货商品</label>
        <#else>
            <label for="filter-goods" class="mr10"><input type="checkbox" name="filter-goods" id="filter-goods" onfocus="this.blur();" onclick="javascript:window.location.href='${searchSite!}${(searchObj.content.toolBar.instock.url)!}#filterSection'" />仅显示有货商品</label>
        </#if>


       <!-- <#if (searchObj.content.toolBar.market.isDefault??) && (searchObj.content.toolBar.market.isDefault=true)>
        <label for="filter-market"><input type="checkbox" name="filter-market" id="filter-market" onfocus="this.blur();" onclick="javascript:window.location.href='${searchSite!}${(searchObj.content.toolBar.market.url)!}#filterSection'" checked />海外购</label>
        <#else>
        <label for="filter-market"><input type="checkbox" name="filter-market" id="filter-market" onfocus="this.blur();" onclick="javascript:window.location.href='${searchSite!}${(searchObj.content.toolBar.market.url)!}#filterSection'" />海外购</label>
        </#if>-->
      	</div>
      	<div class="filter-item delivMode">
            <b class="filter-icon ver-line">&nbsp;</b>
            <label>配送类型：</label>
            <#if searchObj.content??>
				<#if (searchObj.content.toolBar)??>
					<#if searchObj.content.toolBar.deliv.delivAll.isDefault??>
						<input type="radio" name="deliv" id="deliv-all" value="" onfocus="this.blur();" onclick="javascript:window.location.href='${searchSite!}${(searchObj.content.toolBar.deliv.delivAll.url)!}#filterSection'" checked  />
					<#else>
						<input type="radio" name="deliv" id="deliv-all" value="" onfocus="this.blur();" onclick="javascript:window.location.href='${searchSite!}${(searchObj.content.toolBar.deliv.delivAll.url)!}#filterSection'"  />
					</#if>
		            <label class="label-deliv" for="deliv-all">全部</label>
		            <#if searchObj.content.toolBar.deliv.delivGome.isDefault??>
		            	<input class="emcodeProp17" track="配送类型:国美配送" type="radio" name="deliv" id="deliv-gome" value="" onfocus="this.blur();" onclick="javascript:window.location.href='${searchSite!}${(searchObj.content.toolBar.deliv.delivGome.url)!}#filterSection'" checked />
		            <#else>
		            	<input class="emcodeProp17" track="配送类型:国美配送" type="radio" name="deliv" id="deliv-gome" value="" onfocus="this.blur();" onclick="javascript:window.location.href='${searchSite!}${(searchObj.content.toolBar.deliv.delivGome.url)!}#filterSection'" />
		            </#if>
		            <label class="label-deliv" for="deliv-gome" >国美配送</label>
		            <#if searchObj.content.toolBar.deliv.delivMerchant.isDefault??>
		            	<input class="emcodeProp17" track="配送类型:第三方配送" type="radio" name="deliv" id="deliv-thparty" value="" onfocus="this.blur();" onclick="javascript:window.location.href='${searchSite!}${(searchObj.content.toolBar.deliv.delivMerchant.url)!}#filterSection'" checked />
		            <#else>
		            	<input class="emcodeProp17" track="配送类型:第三方配送" type="radio" name="deliv" id="deliv-thparty" value="" onfocus="this.blur();" onclick="javascript:window.location.href='${searchSite!}${(searchObj.content.toolBar.deliv.delivMerchant.url)!}#filterSection'"  />
		            </#if>
		            <label class="label-deliv" for="deliv-thparty">第三方配送</label>
				</#if>
			</#if>
          </div>
	</div>
</div>