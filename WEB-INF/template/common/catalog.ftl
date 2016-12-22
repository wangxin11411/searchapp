<#--分类信息-->
<div class="layout crumb">
<#if searchObj.content.selectData.isSearch>
	<#assign searchSite="${storeConfiguration.searchSite}">
	<#assign concrete_url="search?question=${searchObj.header.searchReq.question!}">
<#else>
	<#assign searchSite ="${storeConfiguration.listSite}">
	<#assign concrete_url="${searchObj.header.searchReq.catId!}.html">
</#if>
<#if (searchObj.content)??>
	<ul class="crumb-list">
		<#if (searchObj.content.selectData.category.fir)?? >
			<#assign firMenu=searchObj.content.selectData.category.fir>
			<li class="crumbName" id="${(firMenu.id)!}">
				<span id="firstNameId" class="p-hide">${(firMenu.name)!}</span>
				<span id="p_catId" class="p-hide">${(firMenu.id)!}</span>
				<strong><a class="firstmenu" href="${(firMenu.url)!}" title="${(firMenu.name)!}">${(firMenu.name)!}</a></strong>
				<i class="crumbArrow">&gt;</i>
			</li>
		</#if>
		<#if (searchObj.content.selectData.category.sec)?exists >
			<#assign secrMenu=searchObj.content.selectData.category.sec>			
			<li date-id="${(secrMenu.id)!}">
				<div class="crumbDrop">
					<!-- crumbHover -->
					<a href="javascript:;" class="crumbDrop-hd crumbDrop-bd-second" date-id="${(secrMenu.id)!}" asked="true"> <em>${(secrMenu.name)!}</em> <i></i>
						<span></span>
					</a>
					<div class="crumbDrop-bd" id="crumbDrop-bd-second">
						
					</div>
				</div>
				<i class="crumbArrow">&gt;</i>
			</li>
		</#if>
		<#if (searchObj.content.selectData.category.third)?exists >
			<#assign thirdMenu=searchObj.content.selectData.category.third>
			<li>
				<div class="crumbDrop" style="z-index:59">
					<span id="thirdNameId" class="p-hide">${(thirdMenu.name)!}</span>
					<a href="${(storeConfiguration.listSite)!}${(thirdMenu.url)!}" class="crumbDrop-hd crumbDrop-hd-third" asked="true"> <em cateId="${(thirdMenu.id)!}" class="thirdmenu">${(thirdMenu.name)!}</em>
						<i></i>
						<span></span>
					</a>
					<div class="crumbDrop-bd" style="width:115px;" id="crumbDrop-bd-third">
					</div>										
				</div>
				<i class="crumbArrow">&gt;</i>
			</li>
		</#if>
		<li class="crumbSelected">
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
				<#--价格-->
				<#if (facets.price)?? && (facets.price)?size &gt; 0 >
					<li class="crumbAttr" id="${(facets.price.id)!}">
						<a href="${(storeConfiguration.listSite)!}${(facets.price.url)!}" class="text">
							<#if (facets.price.items)?? && (facets.price.items)?size &gt; 0>	
								<span class="fl" title="${(facets.price.label)!}：<#list facets.price.items as childItem>${(childItem.value)!}<#if childItem_has_next>、</#if></#list>">${(facets.price.label)!}：					
								<#if (facets.price.items)?size &gt; 3>
									...
								<#else>												
										<#list facets.price.items as childItem>	
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
						<#if (searchObj.content.selectData.keywords)?exists && (searchObj.content.selectData.keywords) != "">
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
	</ul>
	<script>
		var keyLabelVal = document.getElementById("crumbSearch-input").value;
		if(keyLabelVal != "在结果中搜索"){
			document.getElementById("keyLabel").setAttribute("default",keyLabelVal+",1",1);
			document.getElementById("keyLabel").innerHTML = keyLabelVal;
		}else{
            document.getElementById("keyLabel").setAttribute("default",dsp_gome_c3name+",1",1);
            document.getElementById("keyLabel").innerHTML = dsp_gome_c3name;
        }
	</script>
</#if>
</div>