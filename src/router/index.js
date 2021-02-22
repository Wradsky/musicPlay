import Vue from 'vue'
import VueRouter from 'vue-router'
// 通过import 导入组件 无论组件有没有用到都会被加载进来 就会造成资源浪费
// import Recommend from '../views/Recommend'
// import Ranking from '../views/Ranking'
// import Search from '../views/Search'
// import Singer from '../views/Singer'

// 实现vue按需加载
const Recommend = res => {
  import('../views/Recommend').then(data => {
    res(data)
  })
}
const Ranking = res => {
  import('../views/Ranking').then(data => {
    res(data)
  })
}
const Search = res => {
  import('../views/Search').then(data => {
    res(data)
  })
}
const Singer = res => {
  import('../views/Singer').then(data => {
    res(data)
  })
}
const Detail = res => {
  import('../views/SongsDeatil').then(data => {
    res(data)
  })
}
const Personal = res => {
  import('../views/Personal').then(data => {
    res(data)
  })
}

Vue.use(VueRouter)
// 这里的规则命名只能是routes
const routes = [
  // 设置默认路径的话，你给我跳转到recommend界面
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: Recommend,
    children: [{
      path: 'detail/:id/:type',
      component: Detail
    }]
  },
  {
    path: '/ranking',
    component: Ranking,
    children: [{
      path: 'detail/:id/:type',
      component: Detail
    }]
  },
  { path: '/search', component: Search },
  {
    path: '/singer',
    component: Singer,
    children: [{
      path: 'detail/:id/:type',
      component: Detail
    }]
  },
  { path: '/personal', component: Personal }
]
const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
export default router
