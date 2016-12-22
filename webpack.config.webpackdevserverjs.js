var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require("webpack-dev-server");


 
module.exports = {
    //页面入口文件配置
    entry:[
        path.resolve(__dirname,'assets/scripts/entry.js')
    ],
    //入口文件输出配置
    //path.resolve(__dirname,'src/entry.js')，
    output: {
        path: path.resolve(__dirname,'assets/scripts/'),
        filename: 'searchApp.js',
        publicPath: "http://localhost:9090/assets/scripts/"
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
    },
    devServer: {
        historyApiFallback: true,
        contentBase: "./",
        quiet: false, //控制台中不输出打包的信息
        noInfo: false,
        hot: true,
        inline: true,
        lazy: false,
        progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        port: '9090'
    }
};