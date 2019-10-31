const merge = require('webpack-merge');
const base = require('./webpack.base');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackProdConfig = merge(base, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
    },
    optimization: {
        moduleIds: 'hashed',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/env'],
                            plugins: [
                                [
                                    '@babel/plugin-transform-runtime',
                                    {
                                        corejs: 3
                                    }
                                ]
                            ],
                            ignore: ['node_modules/**']
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname, '../src')
                ],
            },
        ]
    },
    plugins: [
        // new WorkboxPlugin.GenerateSW({
        //     cacheId: 'seed-cache',
        //     importWorkboxFrom: 'cdn', // 可填`cdn`,`local`,`disabled`,
        //     // importScripts: '/scripts-build/commseed/workboxswMain.js',
        //     skipWaiting: true, //跳过waiting状态
        //     clientsClaim: true, //通知让新的sw立即在页面上取得控制权
        //     cleanupOutdatedCaches: true,//删除过时、老版本的缓存
            
        //     //最终生成的service worker地址，这个地址和webpack的output地址有关
        //     swDest: './sw.js', 
        //     // include: [
        //     // ], 
        //     //缓存规则，可用正则匹配请求，进行缓存
        //     //这里将js、css、还有图片资源分开缓存，可以区分缓存时间(虽然这里没做区分。。)
        //     //由于种子农场此站点较长时间不更新，所以缓存时间可以稍微长一些
        //     runtimeCaching: [
        //         {
        //             urlPattern: /.*\.js.*/i,
        //             handler: 'CacheFirst',
        //             options: {
        //                 cacheName: 'seed-js',
        //                 expiration: {
        //                     maxEntries: 20,  //最多缓存20个，超过的按照LRU原则删除
        //                     maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        //                 },
        //             },
        //         },
        //         {
        //             urlPattern: /.*css.*/,
        //             handler: 'CacheFirst',
        //             options: {
        //                 cacheName: 'seed-css',
        //                 expiration: {
        //                     maxEntries: 30,  //最多缓存30个，超过的按照LRU原则删除
        //                     maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        //                 },
        //             },
        //         },
        //         {
        //             urlPattern: /.*(png|svga).*/,
        //             handler: 'CacheFirst',
        //             options: {
        //                 cacheName: 'seed-image',
        //                 expiration: {
        //                     maxEntries: 30,  //最多缓存30个，超过的按照LRU原则删除
        //                     maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        //                 },
        //             },
        //         }
        //     ]
        // })
    ]
})

// console.log(WebpackProdConfig);
module.exports = WebpackProdConfig;