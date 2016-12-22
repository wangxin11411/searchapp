<div class="catelog layout">
	<div id="J_catalogs">
		<div class="bd" id="single_catalogs">
			<#assign searchSite=(storeConfiguration.listSite)!>
			<#if (searchObj.content)??>
				<#--品牌-->
				<#assign facets = (searchObj.content.selectData.facets)!>
				<#if (facets.brand)?? && (facets.brand)?size &gt; 0 >
								
				<#else>
					<#if (searchObj.content.facets.brand)?? && (searchObj.content.facets.brand)?size &gt; 0 >				
						<div class="row clearfix borderbold" id="${(searchObj.content.facets.brand.id)!}">					
					    	<div class="column-hd">${(searchObj.content.facets.brand.label)!}：</div>
				    		<div class="column-bd brand-bd">
				    			<#--字母-->
				    			<ul class="items letter clearfix">
									<li>
										<a href="javascript:;" date-search="all" title="所有品牌" class="cur allbrand" id="allCate">所有品牌</a>
									</li>
									<#assign blistObj = searchObj.content.facets.brandprofix.blist>
									<#assign blistDisableObj = searchObj.content.facets.brandprofix.prefixItem>
									<#if (blistObj)?? && (blistObj)?size &gt; 0>
										<#list blistObj as item>											
											<li>
												<#if blistDisableObj[item]??>
													<a href="javascript:;" date-search="${item!}" title="${item!}" >${item!}</a>
												<#else>
													<span class="disable">${item!}</span>
												</#if>												
											</li>
										</#list>
									</#if>
								</ul>
				    			<div class="list-pr">
									<ul class="items clearfix items-brand col-collapse">
					    				<#if (searchObj.content.facets.brand.items)?? && (searchObj.content.facets.brand.items)?size &gt; 0 >
						    				<#list searchObj.content.facets.brand.items as item>
						    					<li prefix="${(item.prefix)!}">
													<a href="${searchSite!}${(item.url)!}" gomehref="${searchSite!}${(item.url)!}" id="${(item.id)!}" title="${(item.value)!}">
														${(item.value)!}
														<s></s>
													</a>
												</li>
						    				</#list>
						    			</#if>
				    				</ul>									
									<div class="col-options">
										<a href="javascript:;" class="multiple emcodeProp17" title="多选" track="品牌:多选">多选</a>
										<a href="javascript:;" class="more emcodeProp17" track="品牌:更多">更多<i class="arrow"></i></a>
									</div>
									<div class="col-btns">
										<a href="javascript:;" class="J_submit col-btn-primary col-btn-disable">确定</a>
										<a href="javascript:;" class="J_cancl col-btn-cancl">取消</a>
									</div>								
				    			</div>
				    		</div>
					    </div>
					</#if>
				</#if>
				<#--价格-->
				<#if (facets.price)?? && (facets.price)?size &gt; 0 >
								
				<#else>
					<#if (searchObj.content.facets.price)?? && (searchObj.content.facets.price)?size &gt; 0 >				
						<div class="row clearfix borderbold" id="${searchObj.content.facets.price.id!}">					
					    		<div class="column-hd">${searchObj.content.facets.price.label!}：</div>
					    		<div class="column-bd J_catelist">
									<ul class="items col-collapse clearfix">
					    				<#if (searchObj.content.facets.price.items)?? && (searchObj.content.facets.price.items)?size &gt; 0 >
						    				<#list searchObj.content.facets.price.items as item>
						    					<li id="${item.id!}">
													<a class="emcodeProp17" track="价格:${item.value!}" href="${searchSite!}${item.url!}" gomehref="${(storeConfiguration.listSite)!}${item.url!}" id="${item.id!}" title="${item.value!}">
														<em>${item.value!}</em>
														<s></s>
													</a>
												</li>
						    				</#list>
						    			</#if>
				    				</ul>
					    		</div>
					    </div>
					</#if>
				</#if>
				<#--不固定部分-->
				<#assign selectcommonfacets = (searchObj.content.selectData.facets.commonfacets)!>
				<#assign commonfacets = (searchObj.content.facets.commonfacets)!>
				<#if selectcommonfacets?? && selectcommonfacets?size &gt; 0>
					<#if commonfacets?? && commonfacets ?size &gt; 0>
						<#list commonfacets as item>
							<#assign itemID=item.id>
							<#assign contains = false >		
							<#list selectcommonfacets as selectitems>
								<#if selectitems.id == itemID>
									<#assign contains = true ><#break>
								</#if>							
							</#list>
							<#if contains == false>
								<div class="row clearfix" id="${(item.id)!}">
									<div class="column-hd">${(item.label)!}：</div>
									<div class="column-bd">
										<ul class="items price clearfix">									
											<#list item.items as childItem>
												<li>
													<a href="${searchSite!}${(childItem.url)!}" gomehref="${searchSite!}${(childItem.url)!}" id="${(childItem.id)!}" title="${(childItem.value)!}">
														<em>${(childItem.value)!}</em>
														<s></s>
													</a>
												</li>
											</#list>
										</ul>
										<div class="col-options">
											<a href="javascript:;" class="multiple emcodeProp17" title="多选" track="${(item.label)!}:多选">多选</a>
											<a href="javascript:;" class="more emcodeProp17" track="${(item.label)!}:更多">更多<i class="arrow"></i></a>
										</div>
										<div class="col-btns">
											<a href="javascript:;" class="J_submit col-btn-primary col-btn-disable">确定</a>
											<a href="javascript:;" class="J_cancl col-btn-cancl">取消</a>
										</div>
									</div>
								</div>
							</#if>
						</#list>
					</#if>
				<#else>
						<#if commonfacets?? && commonfacets ?size &gt; 0>		
							<#list commonfacets as item>									
								<div class="row clearfix" id="${(item.id)!}">
									<div class="column-hd">${(item.label)!}：</div>
									<div class="column-bd">
										<ul class="items price clearfix">									
											<#list item.items as childItem>
												<li>
													<a href="${searchSite!}${(childItem.url)!}" gomehref="${searchSite!}${(childItem.url)!}" id="${(childItem.id)!}" title="${(childItem.value)!}">
														<em>${(childItem.value)!}</em>
														<s></s>
													</a>
												</li>
											</#list>
										</ul>
										<div class="col-options">
											<a href="javascript:;" class="multiple emcodeProp17" title="多选" track="${(item.label)!}:多选">多选</a>
											<a href="javascript:;" class="more emcodeProp17" track="${(item.label)!}:更多">更多<i class="arrow"></i></a>
										</div>
										<div class="col-btns">
											<a href="javascript:;" class="J_submit col-btn-primary col-btn-disable">确定</a>
											<a href="javascript:;" class="J_cancl col-btn-cancl">取消</a>
										</div>
									</div>
								</div>							
							</#list>
						</#if>
				</#if>
			</#if>
		</div>
	</div>
	<div class="show-more-catelog emcodeProp17" id="J_more_catalog" track="更多属性:更多属性">
		更多属性
		<#if searchObj.content??>
			<#if (searchObj.content.facets.commonfacets)?? && (searchObj.content.facets.commonfacets)?size &gt; 0>
				<span>
					<#list searchObj.content.facets.commonfacets as item>
							<#if item_index &gt; 2>
								${(item.label)!}<#if item_has_next>、</#if>
							</#if>						
					</#list>
				</span>
			</#if>	
		</#if>
		<s></s>
	</div>
</div>