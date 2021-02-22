// 封装axios
import axios from 'axios'
import Vue from 'vue'
// import Vue from 'vue'
// axios.defaults.baseURL = 'http://192.168.1.2:3000/'
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
axios.defaults.timeout = 3000
let count = 0
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  count++
  Vue.showLoading()
  return config
}, function (error) {
  // 对请求错误做些什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count--
  if (count === 0) {
    Vue.hiddenLoading()
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})
// 这里就相当于之前的MusicHttp
export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, { params: data }).then(function (respons) {
        resolve(respons)
      }).catch(err => console.log(err))
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, {}).then(function (respons) {
        resolve(respons)
      }).catch(err => console.log(err))
    })
  },
  all: (obj) => {
    return new Promise(function (resolve, reject) {
      axios.all(obj)
        .then(axios.spread(function (...data) {
          resolve(data)
        })).catch(function (err) {
          reject(err)
        })
    })
  }

}
