
function getData(domId){
    $.ajax({
        type:"get",
        dataType:"jsonp",
        url:dspData.url.dsp_url_c,
        data:{
            "p":124,
            "catid":dspData.dsp_gome_c3id,
            "c":"dsp_act",
            "area":pageData.regionId
        },
        jsonpName:"dsp_act",
        success:function(data){
            var listTpl = "";
            for(var i=0,j=data.length;i<j && i<2;i++){
                listTpl += '<a href="'+data[i].ldp+'" target="_blank" title="'+data[i].org+'"><img src="'+data[i].src+'" /></a>';
                new Image().src= data[i].pm;
            }
            $(domId).append('<div class="prd-right-normal" id="dsp_advertisement">'+listTpl+'</div>');
        }
    });
}
module.exports = {
    getData:getData
}