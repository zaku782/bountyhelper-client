const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BabiliPlugin = require("babili-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new BabiliPlugin(), //js压缩
            new OptimizeCSSPlugin({}) //css压缩
        ],
        runtimeChunk: {
            name: 'manifest'  //将webpack运行时代码独立打包
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                plugin: {
                    test: /[\\/]plugin[\\/]/, //缓存组设置将plugin目录下的文件独立打包
                    priority: 0,
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), //build前清空dist目录
        new webpack.HashedModuleIdsPlugin(), //防止因为module应为解析顺序变化导致hash id变化
        /*new webpack.optimize.AggressiveSplittingPlugin({
            minSize: 30000,
            maxSize: 50000
        }),//bundle拆分成更小的chunk*/
    ]
});