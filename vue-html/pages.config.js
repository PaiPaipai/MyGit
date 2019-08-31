const HtmlWebpackPlugin = require('html-webpack-plugin');

// 所有页面通用模板配置
// page：所在页面，默认入口entry名称对应pageName
// isSingle：是否单页面，默认否，加入common模块
const getHtmlTplConfig = (pageName, isSingle) => {
    let chunks = [pageName]
    if (!isSingle) chunks.push('common')
    return new HtmlWebpackPlugin({
        filename: `${pageName}.html`,
        template: `src/views/${pageName}/${pageName}.html`,
        meta: tplMetaArr,
        chunks: chunks
    })
}
// 所有页面通用meta配置
const tplMetaArr = [
    { charset: 'UTF-8'},
    { name: 'renderer', content: 'webkit|ie-comp|ie-stand' },
    { name: 'viewport', content: 'user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'format-detection', content: 'telephone=no, email=no' },
    // { name: 'keyword', content: '女人花,智创工场,单店自循环,店务管理,商圈自循环,基地培训,合作方案,智享城市,智推,智管,智扮,智享,智享云店' },
    // { name: 'description', content: '智享城市，智能经营，智慧生活' }
]

module.exports = {
    entry: {
        
        index: './src/views/index/index.js',
        settlement: './src/views/settlement/settlement.js',
    },
    pages: [
        getHtmlTplConfig('index'),
        getHtmlTplConfig('settlement'),
    ]
}