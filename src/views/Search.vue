<template>
  <div class="search">
      <div class="search-top">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==">
        <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" v-input="inputChange">
      </div>
    <div class="search-scroll">
      <Iscroll>
        <ul class="search-box" v-show="keywords !== ''">
          <li class="search-info" v-for="value in searchList" :key="value.id"
              @click="getSearch(value.id,value.name)">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==">
            <p>{{ value.name }}-{{value.artists[0].name}}</p>
          </li>
        </ul>
      </Iscroll>
    </div>
    <ul class="search-hot" v-show="keywords === ''">
      <li class="hot-info" v-for="(value,index) in searchHot" :key="index" @click="getHot(value.first)">{{
          value.first }}</li>
    </ul>
    <ul class="search-history" v-show="keywords === ''">
      <h6>历史搜索</h6>
      <li class="history-info" v-for="(obj,index) in searchHistory" :key="index"
          @click="getHistory(obj)">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==">
        <p>{{ obj }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSearch, getSearchHot } from '../api/index'
import Iscroll from '../components/Iscorll'
import { mapActions } from 'vuex'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'Search',
  metaInfo: MetaInfo.search,
  components: {
    Iscroll
  },
  data () {
    return {
      keywords: '',
      searchList: [],
      searchHot: [],
      searchHistory: []
    }
  },
  directives: {
    input: {
      // 指令的定义
      inserted: function (el, obj) {
        let flag = true
        let timer = null
        el.addEventListener('input', function () {
          // 函数防抖
          if (!flag) return
          flag = false
          timer && clearTimeout(timer)
          timer = setTimeout(function () {
            obj.value()
            flag = true
          }, 1000)
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'callPlayShow',
      'callSongs',
      'callMinPlayShow'
    ]),
    inputChange () {
      if (this.keywords === '') return
      getSearch({ keywords: this.keywords }).then((data) => {
        this.searchList = data.data.result.songs
      }).catch(function (err) {
        console.log(err)
      })
    },
    getHot (data) {
      this.keywords = data
      this.inputChange()
    },
    getSearch (id, name) {
      this.callPlayShow(true)
      this.callMinPlayShow(false)
      this.callSongs([id])
      this.searchHistory.push(name)
      if (this.searchHistory.includes(name)) {
        return
      }
      window.localStorage.setItem('searchList', JSON.stringify(this.searchHistory))
    },
    getHistory (obj) {
      this.keywords = obj
      this.inputChange()
    }
  },
  created () {
    getSearchHot().then(data => {
      this.searchHot = data.data.result.hots
    }).catch(function (err) {
      console.log(err)
    })
    const data = JSON.parse(window.localStorage.getItem('searchList'))
    if (data === undefined || data === null) {
      return
    }
    this.searchHistory = data
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/font-size";
@import "../assets/css/bg-color";
.search{
  width: 100%;
  position: fixed;
  top: 184px;
  bottom: 0;
  background: #f2f2f2;
  .search-top{
    display: flex;
    align-items: center;
    height: 60px;
    margin:40px 20px;
    border-radius: 20px;
    overflow: hidden;
    background: #fff;
    img{
      width: 40px;
      height: 40px;
      margin: 0 20px;
    }
    input{
      width: 100%;
      border: none;
      outline: none;
      height: 60px;
      background: transparent;
      @include data-size($middule-fs)
    }
  }
  .search-scroll{
    width: 100%;
    position: fixed;
    top: 300px;
    bottom: 0px;
    overflow: hidden;
    .search-box{
      margin: 0 20px;
      .search-info{
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #FFFFFF;
        img{
          width: 40px;
          height: 40px;
          padding: 0 20px;
        }
        p{
          @include data-size($middule-fs)
        }
      }
    }
  }
  .search-hot{
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 999;
    .hot-info{
      border: 1px solid #020202;
      border-radius: 20px;
      padding: 10px 10px;
      margin: 10px 10px;
      @include data-size($min-fs);
    }
  }
  .search-history{
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 999;
    h6{
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #000;
    }
    .history-info{
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #fff;
      img{
        height: 30px;
        width: 30px;
        margin-right: 10px;
      }
      p{
        @include data-size($min-fs);
      }
    }
  }
}
</style>
