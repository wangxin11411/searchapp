<#--分类信息-->
<#if searchObj.content.selectData.isSearch>
	<#assign searchSite="${storeConfiguration.searchSite}">
	<#assign concrete_url="search?question=${searchObj.header.searchReq.question!}">
</#if>
<div class="layout crumb">
	<div class="crumbDropAll"><span>全部搜索结果</span><i class="crumbArrow">&gt;</i></div>
	<#if searchObj.content??>
		<#if (searchObj.content.selectData.category.fir)??>
			<span class="firstmenu" style="display:none">${(searchObj.content.selectData.category.fir.name)!}</span>
		</#if>
		<#if (searchObj.content.selectData.category.third)??>
			<span class="thirdmenu" style="display:none">${(searchObj.content.selectData.category.third.name)!}</span>
		</#if>
	</#if>
	<#if (storeConfiguration.searchSite)??>
		<#assign searchSite=(storeConfiguration.searchSite)>
	</#if>
	<ul class="crumb-list">
		<#if searchObj.content??>
				<li class="crumbSelected" style="width:1090px;">
					<ul>	
						<#assign facets = (searchObj.content.selectData.facets)!>
						<#--当前选择条件-->
						<#--品牌-->					
						<#if (facets.brand)?? && (facets.brand)?size &gt; 0 >
							<li class="crumbAttr" id="${(facets.brand.id)!}">
								<a href="${searchSite!}${(facets.brand.url)!}" class="text">
									<#if (facets.brand.items)?? && (facets.brand.items)?size &gt; 0>	
										<span class="fl" title="${(facets.brand.label)!}：<#list facets.brand.items as childItem>${(childItem.value)!}<#if childItem_has_next>、</#if></#list>">${(facets.brand.label)!}：					
										<#if (facets.brand.items)?size &gt; 3>
											...
										<#else>												
												<#list facets.brand.items as childItem>	
													<#if childItem_index &gt; 1>
													...
													<#else>							
													${(childItem.value)!}<#if childItem_has_next>、</#if>
													</#if>							
												</#list>
										</#if>	
									</#if>						
									</span>
									<span href="javascript:;" data-url="" class="close ml5"></span>
								</a>				
							</li>	
						</#if>
						<#--分类-->
						<#if (facets.catfacets)?? && (facets.catfacets)?size &gt; 0 >
							<li class="crumbAttr" id="${(facets.catfacets.id)!}">
								<a href="${searchSite!}${(facets.catfacets.url)!}" class="text">	
										<span class="fl" title="分类：${(facets.catfacets.name)!}">分类：${(facets.catfacets.name)!}</span>
									<span href="javascript:;" data-url="" class="close ml5"></span>
								</a>				
							</li>	
						</#if>
						<#--不确定筛选条件-->					
						<#if (facets.commonfacets)?? && (facets.commonfacets)?size &gt; 0>
							<#list facets.commonfacets as items>
								<li class="crumbAttr" id="${(items.id)!}">
									<a href="${searchSite!}${(items.url)!}" class="text">
										<#if (items.items)?? && (items.items)?size &gt; 0>		
										<span class="fl" title="${(items.label)!}：<#list items.items as childItem>${(childItem.value)!}<#if childItem_has_next>、</#if></#list>">${(items.label)!}：							
											<#if (facets.commonfacets)?size &gt; 3>
												...
											<#else>		
												<#list items.items as childItem>	
														<#if childItem_index &gt; 1>
														...
														<#else>							
														<i>${(childItem.value)!}<#if childItem_has_next>、</#if></i>
														</#if>								
												</#list>
											</#if>								
										</#if>						
										</span>
										<span href="javascript:;" data-url="" class="close ml5"></span>
									</a>				
								</li>	
							</#list>
						</#if>
						<li class="crumbSearch">
							<label class="crumbSearch-label">								
								<#if (searchObj.header.searchReq.et)?? && (searchObj.header.searchReq.et) !=''>
									<input id="crumbSearch-input" type="text" value="${(searchObj.header.searchReq.et)!}" class="crumbSearch-input" />
								<#elseif (searchObj.content.selectData.keywords)??>
									<input id="crumbSearch-input" type="text" value="${(searchObj.content.selectData.keywords)!}" class="crumbSearch-input" />
								<#else>
									<input id="crumbSearch-input" type="text" value="在结果中搜索" class="crumbSearch-input" />
								</#if>
							</label>
							<input type="submit" value="" class="crumbSearch-btn" />
						</li>
					</ul>
					<a href="${searchSite!}/${concrete_url!}" class="p-hide link ml10" id="clearallfacts">清空筛选条件</a>
				</li>	
		</#if>
	</ul>
</div>
<#--分类信息搜索结果展示-->
<div class="search-about crumb layout" id="releKey" style="padding:8px 0;">
	<div class="search-about-top" jsselect="releData" jstcache="1">
		您是不是要找：
	</div>
</div>
<div class="catelog layout">
	<div class="hd">
		<#--
		<span class="title"> <#if (searchObj.content.selectData)?? ><em class="search-keywords">“${searchObj.content.selectData.keywords!}<#if (searchObj.header.searchReq.et)?? && (searchObj.header.searchReq.et) !=''> ${searchObj.header.searchReq.et!}</#if>”</em></#if>
			找到 <i><#if (searchObj.content.pageBar.totalCount)?? >${searchObj.content.pageBar.totalCount!}</#if></i>件相关产品</span>
		-->
		<#if (searchObj.content.commonInfo)?? && (searchObj.content.commonInfo)?size &gt; 0>
			<#assign searchReset=searchObj.content.commonInfo >
			<#if (searchReset.searchLevel)?? && (searchReset.searchLevel) ==2 >
				<#if (searchReset.showWord)?length &gt; 0>
					<span class="title">抱歉，没有找到符合条件的商品，我们为您找到与<span  class="search-keywords">“<em id="search-keywords">${(searchReset.showWord)!}</em>”</span>相关的商品<i><#if (searchObj.content.pageBar.totalCount)?? >${(searchObj.content.pageBar.totalCount)!}</#if></i>件</span>
				<#else>
					<span class="title">抱歉，没有找到符合条件的商品，我们为您找到相关商品<i><#if (searchObj.content.pageBar.totalCount)?? >${(searchObj.content.pageBar.totalCount)!}</#if></i>件</span>					
				</#if>
			<#else>
			<span class="title"><#if (searchObj.content.selectData)??><span class="search-keywords">“<em id="search-keywords">${(searchObj.content.selectData.keywords)!}<#if (searchObj.header.searchReq.et)?? && (searchObj.header.searchReq.et) !=''> ${(searchObj.header.searchReq.et)!}</#if></em>”</span></#if>找到<i><#if (searchObj.content.pageBar.totalCount)??>${(searchObj.content.pageBar.totalCount)!}</#if></i>件相关产品</span>
			</#if>
		</#if>
	</div>
    <script>
        var keyLabelVal = document.getElementById("search-keywords").innerHTML;
        keyLabelVal = keyLabelVal.replace(/\"/g,"'");
        if(keyLabelVal != "在结果中搜索"){
            document.getElementById("keyLabel").setAttribute("default",keyLabelVal+",1",1);
            document.getElementById("keyLabel").innerHTML = keyLabelVal;
            document.getElementById("keyLabel").style.top = "-50px";
            document.getElementById("searchInput").value = keyLabelVal;
        }
    </script>
</div>