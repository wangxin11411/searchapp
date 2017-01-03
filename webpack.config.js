var webpack = require('webpack');
var path = require('path');
module.exports = {
    //页面入口文件配置
    entry:{
        "search":path.resolve(__dirname,'src/entry.search.js'),
        "category":path.resolve(__dirname,'src/entry.category.js'),
        /*"brand":path.resolve(__dirname,'src/entry.brand.js'),
        "msearch":path.resolve(__dirname,'src/entry.msearch.js'),
        "mcategory":path.resolve(__dirname,'src/entry.mcategory.js')*/
    },
    //入口文件输出配置
    //path.resolve(__dirname,'src/entry.js')，
    output: {
        path: path.resolve(__dirname,'static/search2017/js'),
        filename: '[name].bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            /*{ test: /\.js$/, loader: 'jsx-loader?harmony' }*/
             { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
             //{test: /\.css$/,loader:  ExtractTextPlugin.extract("style-loader","css-loader")},
             { test: /\.js$/, loader: 'jsx-loader?harmony' } 
        ]
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js','.json','.css']
    }
};