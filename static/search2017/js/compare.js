var searop_domian = cookieDomain;

if((window.location.href).indexOf("gomehigo") != -1){ searop_domian = ".gomehigo.hk"}
/*******************************************************************************
 * 对比 * addToCompare:添加对比（productId,skuId） compareTemplate:对比数据添加模板(传入后台的查询串)
 * inCookie:根据cookie判断是否添加对比，是则加入cookie（productid，skuid）
 * addOtherHtml:对比模板添加后，填充剩余的空缺项，以及对比操作栏（对比的数量） compareBox:生成对比栏界面
 * collectSIds:获取所有的sudId（收集cookie中所有的skuId） compareInit:初始化对比栏
 * clearCompareBox:清空对比栏 delCompare:删除单个商品--公用方法（当前html对象，删除的对比商品productId）
 * delElement:删除单个商品--点击删除（对比栏的当前元素） backToZero:归零 blind:绑定按钮事件 reload:重新加载
 ******************************************************************************/
var compare = {
    compareBoxes: null,
    compareNewTpl: function() {
        return '\
        <ul  class="clearfix" >\
            <% for(var i=0,l=items.length; i<l; i++){ %>\
            <li class="compare-items add">\
                <input class="productInfo" pId="<%= items[i].pId %>" sId="<%= items[i].skuId %>" type="hidden"/>\
                <p class="pic">\
                    <a target="_blank" href="<%= items[i].pUrl %>" title="<%= items[i].pName %>">\
                        <img alt="<%= items[i].pName %>" gome-src="<%= items[i].pImg %>_50.jpg" src="//img.gomein.net.cn/images/grey.gif"></a>\
                </p>\
                <p class="name">\
                    <a target="_blank" title="<%= items[i].pName %>" href="<%= items[i].pUrl %>"><%= items[i].pName %></a></p>\
                <p class="price-wrap ancyPrice">\
                    <span class="price"></span>\
                    <a class="del" onclick="javascript:compare.delElement(this);" sid="<%= items[i].skuId %>" pid="<%= items[i].pId %>" track="对比栏:删除" href="javascript:;" style="display:none;">删除</a>\
                </p>\
                <s></s>\
            </li>\
            <%}%>\
        </ul>\
        '
    },
    addToCompare: function(productId, skuId) {
        var $type = this.inCookie(productId, skuId);
        if ($type == "add") {
            this.compareBox();
            this.compareShow();
            $("#j-backtop").addClass("after");
            tool.setCookie('g_co', "show");
            this.addClass();
        } else {}
    },
    compareTemplate: function(val) {
        if (val == null)
            return 0;
        var flag = 1;
        $.ajax({
            type: "get",
            url: cloudSite + "/cloud/compare",
            data: {
                id: val,
                type: 0,
                module: "compare",
                from:'compare'
            },
            cache: false,
            dataType: "jsonp",
            timeout: 5000,
            jsonpName: "callback_compare1",
            success: function(data) {
                if (data.compare == "no") {
                    compare.clearCompareBox();
                    flag = 0;
                } else {
                    var id = $("#compare");
                    if (id.length == 0) {
                        $(".compare-bd").append("<ul class='clearfix'></ul>");
                    }
                    var peg = $('#compare');
                    peg.innerHTML = '';
                    var _ren = template.compile(compare.compareNewTpl());
                    var _htm = _ren(data);
                    peg.html(_htm);
                    var count = tool.cookieSize('compare', '|');
                    $("#pCount").html(" (" + count + ")");
                    $("#backCompare").html(" <s></s>(" + count + ")");
                    var str = compare.addOtherHtml(count);
                    $("#compare ul").append(str);
                    compare.blind();
                }
            }
        });
        return flag;
    },
    inCookie: function(productId, skuId) {
        var values = tool.getCookieValue('compare');
        if (values == null) {
            var $cookieValue = productId + ":" + skuId;
            tool.setCookie('compare', $cookieValue);
            return "add";
        } else {
            var $contain = tool.cookieContain(values, skuId);
            var $count = tool.cookieSize('compare', '|');
            if ($contain) {
                compare.error("该商品已经加入对比！");
            } else if ($count == 4) {
                compare.compareShow();
                $("#j-backtop").addClass("after");
                tool.setCookie('g_co', "show");
                $(".display-page-compare-checkbox").attr('checked', false);
                compare.error("对比栏已满,您可以删除不需要的栏内商品再继续添加哦！");
            } else {
                var $cookieValue = values + "|" + productId + ":" + skuId;
                tool.setCookie('compare', $cookieValue);
                return "add";
            }
            return "unadd";
        }
    },
    compareBoxInit: function() {
        var value = tool.getCookieValue('compare');
        var compareHide = tool.getCookieValue('g_co');
        if (value != null) {
            this.compareShow();
            $("#j-backtop").addClass("after");
            tool.setCookie('g_co', "show");
        }
        this.compareTemplate(value);
    },
    compareBox: function() {
        var value = tool.getCookieValue('compare');
        var compareHide = tool.getCookieValue('g_co');
        if (compareHide === "show") {
            this.compareShow();
            $("#j-backtop").addClass("after");
            tool.setCookie('g_co', "show");
        }
        this.compareTemplate(value);
    },
    collectSIds: function() {
        var value = tool.getCookieValue('compare');
        var ids = new Array();
        if (value == null)
            return null;
        var values = value.split('|');
        for (var int = 0; values != null && int < values.length; int++) {
            var tmp = values[int].split(':');
            ids.push(tmp[1]);
        }
        return ids;
    },
    addOtherHtml: function(count) {
        var str = "";
        var cl = "";
        if (count == 0) str = str + '<ul class="clearfix">';
        for (var int = count + 1; int < 5; int++) {
            str = str + "<li class='compare-items'>" + "<p class='pic'>" + int + "</p>" + "<p class='txt'>您还可以继续添加</p> <s></s></li>";
        }
        if (count < 2) cl = "disable";
        str = str + "<li class='compare-items last'>" + "<p class='btn-wrap'><a track='对比栏:对比' target='_blank' class='btn " + cl + "' onclick='javascript:compare.doCompare();return false;' href='javascript:void(0);'>对比</a>" + "<a track='对比栏:清空' class='btn-clear' onclick='javascript:compare.clearCompareBox();return false;' href='javascript:void(0);'>清空对比栏</a></p></li>";
        if (count == 0) str = str + '</ul>';
        return str;
    },
    compareInit: function() {
        this.reload();
        this.addClass();
        this.compareBoxInit();
        this.toggle();
        var value = tool.getCookieValue('compare');
        var co_show = tool.getCookieValue('g_co');
        if (co_show != "show" && value != null) {
            $("#backCompare,.f-compare-text").show();
            tool.setCookie('g_co', "hide");
        }
        var ids = compare.collectSIds();
        if (ids == null) {
            return;
        }
        compareBoxes = $(".display-page-compare-checkbox");
        if (compareBoxes.length > 0) {
            compareBoxes.each(function() {
                var obj = $(this);
                var sId = obj.parents(".item-tab-warp").attr("sid");
                for (var i = 0; i < ids.length; i++) {
                    if (sId == ids[i]) {
                        obj.addClass("click");
                        obj.attr('checked', true);
                        break;
                    }
                }
            });
        }
    },
    doCompare: function() {
        var value = tool.getCookieValue('compare');
        var count = tool.cookieSize('compare', '|');
        if (count < 2) {
            compare.error("至少有两件商品才能对比哦！");
        } else {
            /*
             * var url = $dynsite + $contextPath + "/compare/compare.jsp?pIds=" +
             * value;
             */
            /* 使用静态化地址 */
            value = value.split("|");
            var _v = "",
                _s = value.length,
                _e = 4 - _s;
            for (var i = 0; i < _s; i++) {
                _v += value[i].split(":")[1];
                if (i < _s - 1) _v += "-";
            }
            if (_e > 0) {
                for (var i = 0; i < _e; i++) {
                    _v += "-0";
                }
            }
            value = _v + ".html";
            // 测试环境变量改相对var url = $satsite + "/compare/" + value;
            var url = staSite + "/compare/" + value;
            window.open(url, "_blank");
        }
        $(".compare-bar .hd .more").click(function() {
            var sIds = compare.collectSIds();
            if (sIds == null) {
                $("#backCompare").hide();
                $("#f-compare .f-compare-text").hide();
                $("#j-backtop").addClass("after");
                tool.setCookie('g_co', "hide");
            } else {
                $("#backCompare").show();
                $("#f-compare .f-compare-text").show();
                $("#j-backtop").removeClass("after");
                tool.setCookie('g_co', "hide");
            }
            $(".compare-bar").hide("1200");
        });
        $(".compare_lesat").bind("click", function() {
            $(this).addClass("hover").siblings("li").removeClass("hover");
            $(".compare-bd").hide()
            $(".js-cbox").show();
            historyView.historyTemplate()
        })
        $(".compare_li").bind("click", function() {
            $(this).addClass("hover").siblings("li").removeClass("hover");
            $(".compare-bd").show()
            $(".js-cbox").hide();
        })
    },
    delCompare: function(id) {
        var value = tool.delCookieById(id);
        if (value == null) {
            $("#backCompare").hide();
            $("#f-compare .f-compare-text").hide();
            $("#j-backtop").addClass("after");
            tool.setCookie('g_co', "show");
            this.clearCompareBox();
        } else {
            tool.setCookie('compare', value);
            this.compareBox();
        }
    },
    clearCompareBox: function() {
        tool.clear('compare');
        this.removeClass();
        this.backToZero();
    },
    delElement: function(element) {
        var find = false; // 不在此页
        var $checkVal = $(element).attr("sid");
        var $skuId = "";
        compareBoxes = $(".display-page-compare-checkbox"); // 在此页查找到对应product，移除对比勾选
        if (compareBoxes.length > 0) {
            compareBoxes.each(function() {
                var obj = $(this);
                var $sId = obj.parents(".item-tab-warp").attr("sid");
                if ($checkVal == $sId) {
                    find = true;
                    $skuId = $sId;
                    obj.removeClass("click");
                    obj.attr('checked', false);
                }
            });
        }
        if (find) { // 当前存在该商品,直接删除（不放在循环里头删是由于每删一次会请求一次）
            compare.delCompare($skuId);
        } else { // 当前不存在该商品
            $skuId = $(element).attr("sid");
            this.delCompare($skuId);
        }
    },
    backToZero: function() {
        var str = this.addOtherHtml(0);
        $("#compare").html(str);
        $("#pCount").html(" (" + 0 + ")");
        $("#backCompare").html("<s></s>(" + 0 + ")");
    },
    blind: function() {
        $(".compare-bd li.add").hover(function() {
            $(this).find(".del").show();
        }, function() {
            $(this).find(".del").hide();
        });
    },
    reload: function() {
        $("#product-box").delegate(".add-contrast", "click", function() {
            var has = $(this).hasClass("click");
            var $productInfoInput = $(this).parents(".item-tab-warp");
            var $skuId = $productInfoInput.attr("sid");
            var $productId = $productInfoInput.attr("pid");
            if (has) {
                compare.delCompare($skuId);
                compare.removeClass();
            } else {
                compare.addToCompare($productId, $skuId);
            }
        })
    },
    addClass: function() {
        var ids = this.collectSIds();
        if (ids == null) {
            $(".compare-bar").hide();
            $("#j-backtop").addClass("after");
            tool.setCookie('g_co', "show");
            return;
        }
        compareBoxes = $(".display-page-compare-checkbox");
        if (compareBoxes.length > 0) {
            compareBoxes.each(function() {
                var obj = $(this);
                var sId = obj.parents(".item-tab-warp").attr("sid");
                for (var i = 0; i < ids.length; i++) {
                    if (sId == ids[i]) {
                        obj.addClass("click");
                        break;
                    }
                }
            });
        }
    },
    removeClass: function() {
        compareBoxes = $(".display-page-compare-checkbox");
        if (compareBoxes.length > 0) {
            compareBoxes.each(function() {
                var obj = $(this);
                var sId = obj.parents(".item-tab-warp").attr("sid");
                obj.removeClass("click");
                obj.attr('checked', false);
                var ids = compare.collectSIds();
                if (ids == null)
                    return;
                for (var i = 0; i < ids.length; i++) {
                    if (sId == ids[i]) {
                        obj.addClass("click");
                    }
                }
            });
        }
        tool.setCookie('g_co', "show");
        this.compareBox();
    },
    error: function(title) {
        $("#errorCompare").html("<em>" + title + "</em>");
        $("#errorCompare").show();
        setTimeout("$('#errorCompare').hide();", 6000);
    },
    toggle: function() {
        $("#backCompare").click(function() {
            var $style = tool.elementStyle("compare-bar");
            if ($style == "block") {
                $(".compare-bar").hide("1200");
                $("#backCompare").show();
                $("#f-compare .f-compare-text").show();
                $("#j-backtop").removeClass("after");
                tool.setCookie('g_co', "hide");
            } else {
                $(".compare-bar").show("1200");
                $("#backCompare").hide();
                $("#f-compare .f-compare-text").hide();
                $("#j-backtop").addClass("after");
                tool.setCookie('g_co', "show");
            }
        });
    },
    compareShow: function() {
        $(".compare-bar").show();
        $("#backCompare").hide();
        $("#f-compare .f-compare-text").hide();
    }
}

/*******************************************************************************
 * 最近浏览 * historyTemplate:浏览记录商品展示模板 checked:添加选中状态 sliblings:滑至对比栏 blind:样式绑定
 ******************************************************************************/
var historyView = {
    templateToProcess: null,
    historyTemplate: function() {
        var self = this;
        var values = tool.getCookieValue('proid120517atg');
        if (values == null) {
            $(".nSearch-recentVisit").hide();
            $(".compare_lesat").hide();
            return;
        }else{
            values=values.replace(/\-[^\"]+\"/g,"\"");
        }
        $.ajax({
            type: "get",
            url: cloudSite + "/cloud/compare",
            data: {
                id: values,
                type: 1,
                module: "compare",
                from:'compare'
            },
            cache: false,
            dataType: "jsonp",
            timeout: 5000,
            jsonpName: "callback_compare2",
            success: function(data) {
                // 对比栏浏览历史
                var peg = $('#history');
                var hist = $('#recentVisit-lists');
                var historyBarHTML = ""
                var historyBottomHTML = ""
                if (peg == null) return;
                if(data.items){
                    for (var i = 0; i < data.items.length; i++) {
                        var o = data.items[i];
                        historyBarHTML += '<li class="compare-items goods"><input class="productInfo" pId="'+ o.pId+'" sId="'+ o.skuId +'" type="hidden"/><p class="pic"><a target="_blank" href="' + o.pUrl + '"><img alt="' + o.pName + '" src="' + o.pImg + '_50.jpg"></a></p><p class="name"><a target="_blank" title="' + o.pName + '" href="' + o.pUrl + '">' + o.pName + '</a></p><p class="price ancyPrice"><span></span></p><p class="btn"><a href="javascript:void(0);" class="history-page-compare-checkbox" sid="' + o.skuId + '" pid="' + o.pId + '" track="对比栏:最近浏览:对比"></a></p></li>'
                        historyBottomHTML += '<li class="item"><input class="productInfo" pId="'+ o.pId+'" sId="'+ o.skuId +'" type="hidden"/><p class="item-pic"><a href="' + o.pUrl + '" target="_blank"><img src="//img.gomein.net.cn/images/grey.gif" gome-src="' + o.pImg + '_80.jpg" alt=""></a></p><p class="item-price ancyPrice"><span></span></p></li>'
                    }
                }
                peg.empty().html('<ul class="clearfix js-csum">' + historyBarHTML + '</ul>')
                hist.empty().html(historyBottomHTML)
                searchBase.asyncMaima(hist,true);
                self.checked();
                self.blinds();
                self.moving();

            },
            error: function() {
//                console.log("访问失败")
            }
        });
    },
    checked: function() {
        var $comparehists = $(".history-page-compare-checkbox");
        var sIds = compare.collectSIds();
        if ($comparehists.length > 0) {
            $comparehists.each(function() {
                var obj = $(this);
                var $sId = obj.attr("sid");
                obj.removeClass("click");
                for (var int = 0; sIds !== null && int < sIds.length; int++) {
                    if ($sId == sIds[int]) {
                        obj.addClass("click");
                    }
                }
            });
        }
    },
    sliblings: function() {
        var compareElement = $(".compare-bar .hd li");
        compareElement.eq(0).addClass("hover").siblings().removeClass("hover");
        $(".compare-bar .bd .items").hide().eq(0).show();
    },
    blinds: function() {
        $(".newly-cont li.goods .btn a").unbind('click'); // for IE6
        $(".newly-cont li.goods .btn a").bind('click', function() {

            var has = $(this).hasClass("click");
            var $checkVal = $(this).attr("sid");
            var $productId = $(this).attr("pid");

            if (has) {
                compare.delElement($(this));
                historyView.sliblings(); // 切换至对比栏
                $(this).removeClass("click");
            } else {
                compare.addToCompare($productId, $checkVal);
                historyView.sliblings(); // 切换至对比栏
                var $compareBoxes = $(".display-page-compare-checkbox");
                if ($compareBoxes.length > 0) {
                    $compareBoxes.each(function() {
                        var obj = $(this);
                        var $sId = obj.parents(".item-tab-warp").attr("sid");
                        if ($checkVal == $sId) {
                            obj.addClass("click");
                            return false; // break
                        }
                    });
                }
            }
        });
    },
    moving: function() {
        var _this = this;
        var len = $(".js-csum").find("li").length,
            next_btn = $(".js-cnext"),
            prev_btn = $(".js-cprev"),
            box = $(".js-csum"),
            move_steps = 860,
            total = Math.round(len / 4);
        if (len < 5) {
            next_btn.hide();
            prev_btn.hide();
        }
        next_btn.unbind();
        next_btn.bind("mouseup", function() {
            if (!next_btn.hasClass("disable")) {
                _this.moveindex++
            };
            box.stop(false, true).animate({
                left: move_steps * _this.moveindex * (-1)
            }, 300, function() {
                if (_this.moveindex >= total - 1) {
                    next_btn.addClass("disable");
                    prev_btn.removeClass("disable");
                } else if (_this.moveindex < total - 1 && _this.moveindex > 0) {
                    next_btn.removeClass("disable");
                    prev_btn.removeClass("disable");
                } else if (_this.moveindex <= 0) {
                    prev_btn.addClass("disable");
                    next_btn.removeClass("disable");
                }
            });
        });
        prev_btn.unbind();
        prev_btn.bind("mouseup", function() {
            if (!prev_btn.hasClass("disable")) {
                _this.moveindex--;
            } else {

            }
            box.stop(false, true).animate({
                left: move_steps * _this.moveindex * (-1)
            }, 300, function() {
                if (_this.moveindex >= total - 1) {
                    next_btn.addClass("disable");
                    prev_btn.removeClass("disable");
                } else if (_this.moveindex < total - 1 && _this.moveindex > 0) {
                    next_btn.removeClass("disable");
                    prev_btn.removeClass("disable");
                } else if (_this.moveindex <= 0) {
                    prev_btn.addClass("disable");
                    next_btn.removeClass("disable");
                }
            });
        });
    }

}
/*******************************************************************************
 * 工具 * setCookie:添加cookie（cookie名，cookie值）
 * getCookieValue:获取指定cookie名的值（cookie名称）
 * cookieContain:判断某cookie中是否存在id（cookie值，查询id）
 * cookieSize:计算cookie的大小（cookie名，拆分字符）
 * delCookieById:删除cookie中某个productId的字段（product id） clear:清空cookie（cookie名称）
 * isNum:判断是否为整数 toggleForInput:输入框交互效果核心 gnload:商品图片延时加载
 ******************************************************************************/
var tool = {
    setCookie: function(cookieName, cookieValue) {
        $.cookie(cookieName, cookieValue, {
            expires: 30,
            path: '/',
            domain: searop_domian
        });
    },
    getCookieValue: function(cookieName) {
        return $.cookie(cookieName);
    },
    cookieContain: function(cookieValue, id) {
        if (cookieValue.indexOf(id) > -1) {
            return true;
        } else {
            return false;
        }
    },
    cookieSize: function(cookieName, c) {
        var $cookieValue = this.getCookieValue(cookieName);
        if ($cookieValue == null)
            return 0;
        var values = $cookieValue.split(c);
        return values.length;
    },
    delCookieById: function(skuId) {
        var result = null;
        var value = tool.getCookieValue('compare');
        if (value == null)
            return null;
        var values = value.split('|');

        for (var i = 0; values != null && i < values.length; i++) {
            if (!this.cookieContain(values[i], skuId)) {
                if (result == null)
                    result = values[i];
                else
                    result = result + "|" + values[i];
            }
        }
        return result;
    },
    clear: function(cookieName) {
        $.cookie(cookieName, null, {
            expires: 30,
            path: '/',
            domain: searop_domian
        });
    },
    elementStyle: function(css) {
        var style = $("." + css).attr("style");
        if (style == "display: block;" || style == "")
            return "block";
        else
            return "none";
    }
};
compare.compareInit();
historyView.historyTemplate()
/*** 清空对比栏*/
function clearCompare() {
    compare.clearCompareBox();
}
/*** 清除指定的商品对比*/
function del(element) {
    compare.delElement(element);
}
/** 隐藏 **/
$(".compare-bar .hd .more").click(function() {
    var sIds = compare.collectSIds();
    if (sIds == null) {
        $("#backCompare").hide();
        $("#f-compare .f-compare-text").hide();
        $("#j-backtop").addClass("after");
        tool.setCookie('g_co', "hide");
    } else {
        $("#backCompare").show();
        $("#f-compare .f-compare-text").show();
        $("#j-backtop").removeClass("after");
        tool.setCookie('g_co', "hide");
    }
    $(".compare-bar").hide("1200");
});
$(".compare_lesat").bind("click", function() {
    $(this).addClass("hover").siblings("li").removeClass("hover");
    $(".compare-bd").hide()
    $(".js-cbox").show();
    historyView.historyTemplate()
})
$(".compare_li").bind("click", function() {
    $(this).addClass("hover").siblings("li").removeClass("hover");
    $(".compare-bd").show()
    $(".js-cbox").hide();
})