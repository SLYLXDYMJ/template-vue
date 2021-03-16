const path = require('path')

module.exports = {
  publicPath: './',
  devServer: {
    /**
     *  本地防止跨域
     *  反向代理配置
     *  ! 别忘了修改 target
     **/
    proxy: {
      '/dev-api': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    }
  },
  
  /**
   *  自动化导入 scss 样式
   *  该段代码是从官网拷贝过来后修改的
   **/
  chainWebpack: config => {
    const types = [ 'vue-modules', 'vue', 'normal-modules', 'normal' ]
    types.forEach(type => {
      config
        .module
        .rule('scss')
        .oneOf(type)
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [
            path.resolve(__dirname, './src/assets/styles/variable.scss'),
            path.resolve(__dirname, './src/assets/styles/utils.scss')
          ]
        })
    })
  }
}