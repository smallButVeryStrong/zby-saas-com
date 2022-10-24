/**
 * 增加配置 减少包大小
 */

module.exports = {
  configureWebpack: (config) => {
    console.log('查看环境==', process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
      
      config.externals = {
        'vue': 'Vue',
        'element-ui': 'elementUI'
      }
    }
  }
}