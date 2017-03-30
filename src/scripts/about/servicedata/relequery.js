/**
 * 搜索结果页，底部重新栏内的相关搜索词，并且覆盖共同头部的推荐词
 * */


function getReleQuery(keyword){
    $.ajax({
        type: "get",
        dataType: "jsonp",
        url: pageData.cloudSite + "/cloud/releQuery",
        data: {
            question: keyword
        }
    }).done(function(data){
        var headKeyword = "";
        var html = '<li class="related-title">您是不是要找：</li>';
        if (data.releData) {
            var _data = data.releData.rList;
            for (var i = 0, j = _data.length; i < j && i<5; i++) {
                html += '<li class="related-key"><a href="/search?question=' + _data[i].key + '&from=releQuery&intcmp=search-9000000800"'+i+' target="_blank">' + _data[i].key + '</a></li>';
                headKeyword += '<a href="/search?question=' + _data[i].key + '&from=releQuery&intcmp=search-9000001000"'+i+'" target="_blank">'+ _data[i].key +'</a>';
            }
            $("#topSearch .hotkeyword").empty().append(headKeyword);
            $("#related-list").append(html);
        } else {
            $("#related-list").hide();
        }
        $("#topSearch .hotkeyword").css('visibility','visible');
    })
}
$("#search-box-input").bind({
    "keyup": function(event) {
        if (event.which == 13) {
            $("#search-box-btn").click()
        } else {
            var txt=$(this).val();
            $(this).val(txt.replace(/[`~!@#$%^&*_+=¥￥（）()<>?:"{},\/;'[\]！。......，…——、‘；—【】|？》《“：\\\-”]/g,''))
        }
    },
    "blur": function() {
        if ($(this).val() == "") {
            $(this).val($(this).attr("defaultVal"))
        }
    }
});
$("#search-box-btn").bind("click",function(){
    window.location.href = "/search?intcmp=search-9000000801-0&question="+ $("#search-box-input").val();
});
module.exports = {
    getReleQuery:getReleQuery
};