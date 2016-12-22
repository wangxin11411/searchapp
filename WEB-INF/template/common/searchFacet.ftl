<div class="catelog layout">
	<div id="J_catalogs">
		<div class="bd" id="single_catalogs">
			<#if (searchObj.content.selectData.isSearch)??>
				<#assign searchSite=(storeConfiguration.searchSite)!>
			</#if>
			<#if searchObj.content??>
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
									<li><a href="javascript:;" date-search="all" title="所有品牌" class="cur allbrand" id="allCate">所有品牌</a></li>
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
													<a href="${searchSite!}${(item.url)!?replace('more','promoFlag')}" gomehref="${searchSite!}${(item.url)!?replace('more','promoFlag')}" id="${(item.id)!}" title="${(item.value)!}">
														${(item.value)!}
														<s></s>
													</a>
												</li>
						    				</#list>
						    			</#if>
				    				</ul>									
									<div class="col-options">
										<a href="javascript:;" class="multiple emcodeProp17" title="多选" track="所有品牌:多选">多选</a>
										<a href="javascript:;" class="more emcodeProp17" track="所有品牌:更多">更多<i class="arrow"></i></a>
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
				<#--热门分类-->
				<#if facets.catfacets?? && (facets.catfacets)?size &gt; 0>
				
				<#else>
					<#if (searchObj.content.facets.hotCategory)?? && (searchObj.content.facets.hotCategory.items)?size &gt; 0 >
						<#assign hotCategory=searchObj.content.facets.hotCategory>				
						<div class="row clearfix borderbold" id="${(hotCategory.id)!}">					
					    		<div class="column-hd"><span class="column-hd-icon"></span>${(hotCategory.label)!}：</div>
					    		<div class="column-bd J_catelist">
									<ul class="items col-collapse1 clearfix">
					    				<#if (hotCategory.items)?? && (hotCategory.items)?size &gt; 0 >
						    				<#list hotCategory.items as item>
						    					<#if item.isVirtual?exists && item.isVirtual == true>
						    						<#if item.virtualData?? && (item.virtualData)?size &gt; 1>
								    					<li id="${(item.id)!}" class="items-irtual">
															<a href="javascript:;" id="${(item.id)!}" title="${(item.name)!}">
																<em>${(item.name)!}</em>
																<s></s>
															</a>
															
																<dl class="column-thirdbox">
																<#list item.virtualData as childs>
																	<dd>
																		<a style="border:none;padding-left:10px;height:30px;line-height:30px;" href="${searchSite!}${childs.url!}" id="${childs.id!}" title="${childs.secName !}"><em>${childs.secName!}</em><s></s></a>
																	</dd>														
																</#list>
																</dl>										
														</li>
													<#else>
														<li id="${(item.id)!}">
															<a href="${searchSite!}${(item.url)!}" gomehref="${searchSite!}${(item.url)!}" id="${(item.id)!}" title="${(item.name)!}">
																<em>${(item.name)!}</em>
																<s></s>
															</a>												
														</li>
													</#if>	
												<#else>
													<li id="${(item.id)!}">
														<a href="${searchSite!}${(item.url)!}" gomehref="${searchSite!}${(item.url)!}" id="${(item.id)!}" title="${(item.name)!}">
															<em>${(item.name)!}</em>
															<s></s>
														</a>												
													</li>
												</#if>
						    				</#list>
						    			</#if>
				    				</ul>
				    				<div class="col-options">
										<a href="javascript:;" class="more-virtua">更多<i class="arrow"></i></a>
									</div>			    		
					    		</div>
					    </div>
					</#if>
					<#--其他分类-->
					<#if (searchObj.content.facets.commomCatFacets)?? && (searchObj.content.facets.commomCatFacets.items)?size &gt; 0 >
						<#assign comCatFacets=searchObj.content.facets.commomCatFacets>				
						<div class="row clearfix borderbold" id="${(comCatFacets.id)!}">					
					    		<div class="column-hd"><span class="column-hd-icon-qt"></span>${(comCatFacets.label)!}：</div>
					    		<div class="column-bd J_catelist">
									<ul class="items col-collapse1 clearfix">
					    				<#if (comCatFacets.items)?? && (comCatFacets.items)?size &gt; 0 >
						    				<#list comCatFacets.items as item>
						    					<#if item.isVirtual?exists && item.isVirtual == true>
						    						<#if item.virtualData?? && (item.virtualData)?size &gt; 1>
							    						<li id="${(item.id)!}" class="items-irtual">
															<a href="javascript:;" id="${(item.id)!}" title="${(item.name)!}">
																<em>${(item.name)!}</em>
																<s></s>
															</a>
															
																<dl class="column-thirdbox">
																<#list item.virtualData as childs>
																	<dd>
																		<a style="border:none;padding-left:10px;height:30px;line-height:30px;" href="${searchSite!}${(childs.url)!}" id="${(childs.id)!}" title="${(childs.secName)!}"><em>${(childs.secName)!}</em><s></s></a>
																	</dd>														
																</#list>
																</dl>										
														</li>
													<#else>
														<li id="${(item.id)!}">
															<a href="${searchSite!}${(item.url)!}" gomehref="${searchSite!}${(item.url)!}" id="${(item.id)!}" title="${(item.name)!}">
																<em>${(item.name)!}</em>
																<s></s>
															</a>
														</li>
													</#if>	
						    					<#else>
							    					<li id="${(item.id)!}">
														<a href="${searchSite!}${(item.url)!}" gomehref="${searchSite!}${(item.url)!}" id="${(item.id)!}" title="${(item.name)!}">
															<em>${(item.name)!}</em>
															<s></s>
														</a>
													</li>
												</#if>
						    				</#list>
						    			</#if>
				    				</ul>
				    				<div class="col-options">
										<a href="javascript:;" class="more-virtua">更多<i class="arrow"></i></a>
									</div>
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
										<ul class="items price clearfix col-collapse">									
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
											<a href="javascript:;" class="multiple" title="多选">多选</a>
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
										<ul class="items price clearfix col-collapse">									
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
											<a href="javascript:;" class="multiple emcodeProp17" title="多选" track="所有品牌:多选">多选</a>
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
	<div class="show-more-catelog" id="J_more_catalog">
		更多属性
		<#if searchObj.content??>
			<#if (searchObj.content.facets.commonfacets)?? && (searchObj.content.facets.commonfacets)?size &gt; 0>
				<span>
					<#list searchObj.content.facets.commonfacets as item>
							<#if item_index &gt; 0>
								${(item.label)!}<#if item_has_next>、</#if>
							</#if>						
					</#list>
				</span>
			</#if>	
		</#if>
		<s></s>
	</div>
</div>
