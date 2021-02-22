import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'
import fastClick from 'fastclick'
import loading from './plugin/loading/index'
import MetaInfo from 'vue-meta-info'
// import Vconsole from 'vconsole'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
import './assets/css/base-style.scss'
// import fastclick from "fastclick";
Vue.use(VueLazyload, {
  // 懒加载时的占位图片
  loading: require('./assets/images/loading.png')
})
// 解决移动端点击延迟300ms问题
fastClick.attach(document.body)
Vue.use(loading, {
  title: '正在加载。。。'
})
// 生成seo三大标签
Vue.use(MetaInfo)
// fastclick.attach(document.body)
// const console = new Vconsole()
// Vue.use(console)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: c => c(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
})
