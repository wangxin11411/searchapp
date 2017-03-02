$.ajax({
    type:"get",
    dataType:"jsonp",
    url:dspData.url.dsp_url_c,
    data:{
        "p":183,
        "catid":dspData.dsp_gome_c3id,
        "c":"dsp_act_b",
        "area":pageData.regionId
    },
    jsonpName:"dsp_act_b",
    success:function(data){
        var listTpl = ""; 
        for(var i=0,j=data.length;i<j && i<2;i++){
            listTpl += '<a href="'+data[i].ldp+'" target="_blank" title="'+data[i].org+'"><img src="'+data[i].src+'" /></a>';
            new Image().src= data[i].pm;
        }
        $("#prdBottom-4").append('<div class="nSearch-bottomTuiGuangAD" id="dsp_bottomAD">'+listTpl+'</div>');
    }
});

