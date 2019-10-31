const path = require('path');
const merge = require('webpack-merge');
const dev = require('./config/webpack.dev');
const prod = require('./config/webpack.prod');
const webpack = require('webpack');
module.exports = env => {
    const isProd = env && env.NODE_ENV === 'prod';
    const InjectConfig = {
        module: {
            rules: [
               
            ]
        },
        plugins: [
           
        ]
    }
    return merge(isProd ? prod : dev, InjectConfig);
}