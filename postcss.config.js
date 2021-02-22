module.exports = {
  plugins: {
    // 设置浏览器自动前缀
    autoprefixer: {},
    // 移动端px转rem
    'postcss-pxtorem': {
      rootValue: 100,
      propList: ['*']
    }
  }
}
