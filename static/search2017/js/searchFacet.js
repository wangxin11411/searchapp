/**
 * facets 相关操作
 */
var facetsOperation = {
    multiSelectFacets: "",
    multiSelectFacetsBrand: "",
    facets_timer_syn:"",
    setFaectsDefault:function(){
        var space = 0;
        var _li = $(".nSearch-crumb-facetsCurrent").find("li");

        if(isSearch){
            space = $("#nSearch-crumb-searchNum").width() + $("#nSearch-crumb-keyWord").width() +65;
        }else{
            space = $("#category-first").width() + $("#category-second").width() + $("#category-third").width() +90;
        }
        space =  $(".nSearch-crumb").width()-space;
        /*初始化已选facets样式*/
        if(_li.length>0){
            var _width = 0;
            $(".nSearch-crumb-facetsCurrent").addClass("haschecked");
            for(var i =0,j=_li.length;i<j;i++){
                _width+=_li.eq(i).width()+39
            }
            if(_li.length >= 2) {
                $("#clearallfacts").show();
                space = space - 110
            }
            $(".nSearch-crumb-facetsCurrent").width(_width);
            $("#nSearch-crumb-facetsCurrent-warp").width(space)

            if(_width > space){
                setTimeout(function(){$(".facetsCurrent-next").show()},0)  
            }
            
            $(".facetsCurrent-next").bind("click",function(){
                $(".nSearch-crumb-facetsCurrent").animate({"left":-(_width-space)+"px"},300,function(){
                    $(".facetsCurrent-prev").show();
                    $(".facetsCurrent-next").hide()
                });   
            })
            $(".facetsCurrent-prev").bind("click",function(){
                $(".nSearch-crumb-facetsCurrent").animate({"left":0},100,function(){
                    $(".facetsCurrent-next").show();
                    $(".facetsCurrent-prev").hide()
                });
                
            })
        }
        /*初始化 商品列表页 facets*/
        var facetHide = $(".nSearch-facets").find(".fc-hide");
        $("#fc-common-control").bind("click",function(){
            facetHide.show();
            $(this).parent().addClass("show")
        })

        $("#fc-common-up").bind("click",function(){
            facetHide.hide();
            $(this).parent().removeClass("show")
        })
    },
    showMore: function() {
        //列表页普通facets 和 搜索结果页热门facets 更多事件绑定
        $(".facets-category-common").each(function() {
            var $this = $(this),
                more_btn = $(this).find(".fc-option-more"),
                multiSelect_btn = $(this).find(".fc-option-multiple"),
                multiSelect_confirm = $(this).find(".fc-btn-box"),
                multiSelect_confirm_ok = multiSelect_confirm.find(".fc-btn-ok"),
                multiSelect_confirm_cancel = multiSelect_confirm.find(".fc-btn-cancel"),
                facet_box = $(this).find(".category-normal"),
                facet_li = facet_box.find("li"),
                more_box_height = facet_box.height();
            if (facet_box.find("ul").height() > 34) {
                more_btn.show();
            }
            more_btn.bind("click", function() {
                if ($(this).hasClass("open")) {
                    $(this).removeClass("open");
                    $(this).html("<i></i>更多");
                    facet_box.height(more_box_height);
                } else {
                    $(this).addClass("open");
                    $(this).html("<i></i>收起");
                    facet_box.height("auto")
                }
            })
            multiSelect_btn.bind("click", function() {
                facetsOperation.clearMultiSelect();
                facetsOperation.clearMultiSelectBrand();
                $this.addClass("multiSelectStatus");
                //多选操作，点击添加、删除facetsOperation.multiSelectFacets里的字段
                facet_li.find("a").bind("click", function() {
                    if ($(this).hasClass("chk")) {
                        $(this).removeClass("chk");
                        facetsOperation.multiSelectFacets = facetsOperation.multiSelectFacets.replace($(this).attr("facetsid"), "");
                    } else {
                        $(this).addClass("chk");
                        facetsOperation.multiSelectFacets += $(this).attr("facetsid");
                    }
                    (facetsOperation.multiSelectFacets != "") ? multiSelect_confirm_ok.removeClass("fc-disable") : multiSelect_confirm_ok.addClass("fc-disable");
                    return false;
                })
                facetsOperation.multiSelectFacets = "";
            })
            multiSelect_confirm_ok.bind("click", function(e) {
                if (!$(this).hasClass("fc-disable")) {
                    e.preventDefault();
                    facetsOperation.setFacetsLocation(facetsOperation.multiSelectFacets);
                    //alert(facetsOperation.multiSelectFacets)
                }
            })
            multiSelect_confirm_cancel.bind("click", function() {
                facetsOperation.clearMultiSelect();
            })
        })
        //品牌facets更多事件绑定
        $("#facets-category-brand").each(function() {
            var $this = $(this),
                more_btn = $(this).find(".fc-option-more"),
                brand_box = $(this).find(".category-brand"),
                letter_box = $(this).find(".category-brand-f-letter"),
                brandChecked_box = $(this).find("#category-brand-hasCheck"),
                brand_li = brand_box.find("li"),
                brand_li_hide = brand_box.find(".brand-hide"),
                multiSelect_btn = $(this).find(".fc-option-multiple"),
                multiSelect_confirm = $(this).find(".fc-btn-box"),
                multiSelect_confirm_ok = multiSelect_confirm.find(".fc-btn-ok"),
                multiSelect_confirm_cancel = multiSelect_confirm.find(".fc-btn-cancel")

            if (brand_li.length > 14) {
                more_btn.show()
            }
            if (brand_li.length < 2) {
                multiSelect_btn.hide()
            }
            more_btn.bind("click", function() {
                if ($(this).hasClass("open")) {
                    $(this).removeClass("open");
                    $(this).html("<i></i>更多");
                    brand_li.show();
                    brand_li_hide.hide();
                    letter_box.hide().find("li").removeClass("cur");
                    letter_box.find(".all").addClass("cur");
                    $this.removeClass("moreStatus");
                } else {
                    $(this).addClass("open");
                    $(this).html("<i></i>收起");
                    brand_li_hide.show();
                    letter_box.show();
                    letter_box
                    $this.addClass("moreStatus");
                }
            })
            multiSelect_btn.bind("click", function() {
                $this.addClass("multiSelectStatus");
                facetsOperation.clearMultiSelect();
                brand_li.find("a").bind("click", function() {
                    var _faceid = $(this).attr("facetsid")
                    if ($(this).hasClass("chk")) {
                        $(this).removeClass("chk");
                        $(this).parents(".c-brand").removeClass("lichk");
                        brandChecked_box.find("#ck_"+_faceid).remove();
                        facetsOperation.multiSelectFacetsBrand = facetsOperation.multiSelectFacetsBrand.replace(_faceid,"");
                    } else {
                        $(this).addClass("chk");
                        $(this).parents(".c-brand").addClass("lichk");
                        brandChecked_box.append('<li class="ckes" id="ck_'+_faceid+'" valuer="'+_faceid+'"><i></i>'+$(this).attr("name")+'</li>')
                        facetsOperation.multiSelectFacetsBrand += $(this).attr("facetsid");
                    }
                    (facetsOperation.multiSelectFacetsBrand != "") ? multiSelect_confirm_ok.removeClass("fc-disable") : multiSelect_confirm_ok.addClass("fc-disable");
                    (brandChecked_box.find(".ckes").length>0)?brandChecked_box.show():brandChecked_box.hide();
                    return false;
                })
                facetsOperation.multiSelectFacetsBrand = "";
            })
            multiSelect_confirm_ok.bind("click", function(e) {
                if (!$(this).hasClass("fc-disable")) {
                    e.preventDefault();
                    facetsOperation.setFacetsLocation(facetsOperation.multiSelectFacetsBrand);
                }
            })
            multiSelect_confirm_cancel.bind("click", function() {
                facetsOperation.clearMultiSelectBrand();
                if (more_btn.hasClass("open")) {
                    more_btn.removeClass("open");
                    more_btn.html("<i></i>更多");
                    brand_li.show();
                    brand_li_hide.hide();
                    letter_box.hide().find("li").removeClass("cur");
                    letter_box.find(".all").addClass("cur");
                    $this.removeClass("moreStatus");
                }

            })
            //字母点击筛选品牌
            letter_box.find("li").bind("hover",function(){
                var keyletter = $(this).attr("brand-key");
                $(this).addClass("cur").siblings("li").removeClass("cur");
                if(keyletter=="all"){
                    brand_li.show()
                }else{
                    brand_li.hide()
                    brand_li.each(function(){
                        var _thi = $(this);
                        if(_thi.attr("brand-value")==keyletter){
                            _thi.show()
                        }
                    })
                }
            })
            //已经多选的品牌，点击取消
            brandChecked_box.delegate("li","click",function(){
                if(!$(this).hasClass("hasCheckedTit")){
                    var _val = $(this).attr("valuer");
                    $(this).remove();
                    $("#brandID"+_val).click();
                    facetsOperation.multiSelectFacetsBrand = facetsOperation.multiSelectFacetsBrand.replace(_val,"");
                }
            })
        })
        //搜索结果页面聚合facets点击展开
        $(".category-syn").each(function() {
            var $this = $(this),
                syn_li = $this.find("li"),
                multiSelect_confirm = $(this).find(".category-syn-btn"),
                multiSelect_confirm_ok = multiSelect_confirm.find(".fc-btn-ok"),
                multiSelect_confirm_cancel = multiSelect_confirm.find(".fc-btn-cancel")
                /*$this.find(".category-syn-tit").bind("mouseup", function() {
                    if ($this.hasClass("category-syn-open")) {
                        facetsOperation.clearMultiSelect();
                    } else {
                        facetsOperation.clearMultiSelect();
                        $this.addClass("category-syn-open");
                    }
                })*/
                $this.bind({
                    "mouseenter":function(){
                        clearTimeout(facetsOperation.facets_timer_syn)
                        facetsOperation.clearMultiSelect();
                        facetsOperation.clearMultiSelectBrand();
                        $this.addClass("category-syn-open");
                    },
                    "mouseleave":function(){
                        facetsOperation.facets_timer_syn = setTimeout(facetsOperation.clearMultiSelect,500);
                        // facetsOperation.clearMultiSelect();
                    }
                })
                //多选操作，点击添加、删除facetsOperation.multiSelectFacets里的字段
                syn_li.bind("click", function() {
                    if ($(this).hasClass("chk")) {
                        $(this).removeClass("chk");
                        facetsOperation.multiSelectFacets = facetsOperation.multiSelectFacets.replace($(this).attr("facetsid"), "");
                    } else {
                        $(this).addClass("chk");
                        facetsOperation.multiSelectFacets += $(this).attr("facetsid");
                    }
                    (facetsOperation.multiSelectFacets != "") ? multiSelect_confirm_ok.removeClass("fc-disable") : multiSelect_confirm_ok.addClass("fc-disable");
                })
                multiSelect_confirm_ok.bind("click", function(e) {
                    if (!$(this).hasClass("fc-disable")) {
                        e.preventDefault();
                        facetsOperation.setFacetsLocation(facetsOperation.multiSelectFacets);
                    }
                })
                multiSelect_confirm_cancel.bind("click", function() {
                    facetsOperation.clearMultiSelect();
                })
        })
    },
    clearMultiSelect: function() {
        $(".facets-category-common").removeClass("multiSelectStatus");
        $(".category-normal").find("a").removeClass("chk").unbind();
        $(".category-syn").removeClass("category-syn-open").find("li").removeClass("chk")
        $(".facets-category-common").find(".fc-btn-ok").addClass("fc-disable");
        $(".category-syn").find(".fc-btn-ok").addClass("fc-disable");
        facetsOperation.multiSelectFacets = "";
        
    },
    clearMultiSelectBrand: function() {
        $("#facets-category-brand").removeClass("multiSelectStatus").find("#category-brand-hasCheck").empty().html('<li class="hasCheckedTit">已选：</li>').hide();
        $("#facets-category-brand").find(".fc-btn-ok").addClass("fc-disable");
        $(".category-brand").find("li").removeClass("lichk");
        $(".category-brand").find("li").find("a").removeClass("chk").unbind();
        facetsOperation.multiSelectFacetsBrand = "";
    },
    setFacetsLocation: function(facets) {
        var facetsUrl = "";
        var defauleFacets = "";
        if (isSearch) {
            facetsUrl = window.location.search;
            if (facetsUrl.indexOf("facets") != -1) {
                defauleFacets = facetsUrl.split("&facets=")[1].split("&")[0];
                facetsUrl = facetsUrl.replace(/(&facets=)([a-zA-Z0-9]{1,})(&)/g, "&facets=" + defauleFacets + facets + "&");
            } else {
                facetsUrl += "&facets=" + facets+"&pzpq=0&pzin=v5";
            }
            
            if(window.location.href.indexOf("brand.")!=-1){
                window.location.href = "//search"+cookieDomain+"/search?question="+searchkey +facetsUrl
            }else{
                window.location.href = facetsUrl;
            }
        } else {
            if (pageData.isCondition) {
                (pageData.hashData[9] == 0) ? (pageData.hashData[9] = facets) : (pageData.hashData[9] += facets);
                for (var i = 0, j = pageData.hashData.length; i < j; i++) {
                    facetsUrl += "-" + pageData.hashData[i];
                }
                facetsUrl = facetsUrl.substring(1);
            } else {
                facetsUrl = pageData.hashData[0].split(".")[0] + "-00-0-48-1-0-0-0-1-" + facets + "-0-0-0-0-0-0-0-0.html";
            }
            window.location.href = facetsUrl;
        }
    }
}
facetsOperation.setFaectsDefault();//设置已选中的facets展示情况
facetsOperation.showMore()