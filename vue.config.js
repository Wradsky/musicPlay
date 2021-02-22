const jsdom = require('jsdom')
const { JSDOM } = jsdom
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          // html-loader解决script标签中的变量不识别问题
          test: /\.(html)/i,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/recommend',
        '/search',
        '/ranking',
        '/singer',
        '/personal'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess (renderedRoute) {
        // 预渲染内容写入之前的额外操作
        const reg = /<meta name="viewport".*user-scalable=no">/gi
        const res = renderedRoute.html.match(reg)
        renderedRoute.html = renderedRoute.html.replace(res[1], '')

        // 1.根据字符串创建一个网页      jsdom 根据字符串创建一个网页
        const html = new JSDOM(renderedRoute.html)
        // 2.从创建好的网页中拿到document对象
        const dom = html.window.document
        // 3.找到对应的元素, 删除对应的元素
        const loadingEle = dom.querySelector('.container')
        dom.body.removeChild(loadingEle)
        // serizlize 将 renderedRoute.html对象转换成字符串 // 对象转字符串
        renderedRoute.html = html.serialize()
        return renderedRoute
      }
    }
  }
}
