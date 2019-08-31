const path = require('path');
const webpack = require('webpack');
const pageConfig = require('./pages.config.js');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

// process.env.NODE_ENV
// 直接根据命令判断环境
const isDev = process.env.npm_lifecycle_event === 'dev'

const plugins = pageConfig.pages.concat([
    // 提取css到/css目录
    new MiniCssExtractPlugin({
        filename: isDev? 'css/[name].[hash:8].css': 'css/[name].[contenthash:8].css',
        chunkFilename: isDev? '[id].[hash:8].css': '[id].[contenthash:8].css',
    }),
    // 复制static目录和favicon文件
    new CopyWebpackPlugin([
        { from: 'static', to: 'static', toType: 'dir' },
        { from: 'src/assets', to: 'assets', toType: 'dir' },
        { from: 'favicon.ico', to: 'favicon.ico', toType: 'file'}
    ]),
    new VueLoaderPlugin()
])
// 开发环境插件
const plugins_dev = plugins.concat([
    // 热替换
    new webpack.HotModuleReplacementPlugin()
])
// 生产环境插件
const plugins_prod = plugins.concat([
    // 清除dist目录
    new CleanWebpackPlugin(['dist'])
]);

// 开发环境/生产环境css处理
let cssRule = [
    { loader: 'css-loader', options: { minimize: !isDev, sourceMap: isDev } },
    { loader: 'postcss-loader', options: { ident: 'postcss', sourceMap: isDev, plugins: (loader) => [require('autoprefixer')()] } },
    { loader: 'sass-loader', options: { sourceMap: isDev } }
]
const devCssRule = [{ loader: 'style-loader', options: { sourceMap: isDev } }].concat(cssRule);
const prodCssRule = [{ loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } }].concat(cssRule);

module.exports = {
    mode: isDev ? 'development': 'production',
    devServer: {
        contentBase: 'dist',
        compress: true,
        open: true,
        hot: true,
        inline:true,
        port: 8090,
        proxy: {
            '/zxcity_restful/ws/rest': {
                target: 'http://139.129.216.37:8081'
            }
        }
    },
    entry: pageConfig.entry,
    output: {
        filename: isDev? 'js/[name].[hash:8].js': 'js/[name].[contenthash:8].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    plugins: isDev ? plugins_dev : plugins_prod,
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                // use: isDev ? devCssRule : prodCssRule
                use: prodCssRule
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: !isDev,
                        attrs: ['img:src'],
                        interpolate: 'require'
                    },
                }]
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        extractCSS: true,
                        interpolate: 'require'
                    },
                }]
            },
            
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: 'media/[name].[hash:7].[ext]'
                    }
                }]
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }]
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue: 'vue/dist/vue.js',
            '~': path.resolve('src/common'),
            '@': path.resolve('src/components'),
        }
    }
  };