const merge = require('webpack-merge');
const base = require('./webpack.base');
const path = require('path');
const WebpackDevConfig = merge(base, {
    mode: 'development',
    output: {
        filename: '[name].js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9000,
        publicPath: '/',
        hot: true
    },
})

// console.log(WebpackDevConfig);

module.exports = WebpackDevConfig;