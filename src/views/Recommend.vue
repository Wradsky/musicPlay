<template>
  <div class="recommend">
    <Iscorll>
      <div>
        <Banner :Banner="banners"></Banner>
        <MusicList :MusicList="personalized" :title="'推荐歌单'" @select="musicDetail "
                   :type="'personalized'"></MusicList>
        <MusicList :MusicList="albums" :title="'最新专辑'" @select="musicDetail "
                   :type="'albums'"></MusicList>
        <SongList :SongList="newMusic"></SongList>
      </div>
    </Iscorll>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPlayList, getAlbums, getNewMusic } from '../api/index'
import Banner from '../components/Banner'
import MusicList from '../components/MusicList'
import SongList from '../components/SongList'
import Iscorll from '../components/Iscorll'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'Recommend',
  metaInfo: MetaInfo.recommend,
  components: {
    Banner,
    MusicList,
    SongList,
    Iscorll
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      newMusic: []
    }
  },
  methods: {
    musicDetail (id, type) {
      this.$router.push({ path: `/recommend/detail/${id}/${type}` })
    }
  },
  created () {
    // 相当于调用之前获取的数据 获取banner图片数据
    getBanner()
      .then(data => {
        this.banners = data.data.banners
      })
      .catch(function (err) {
        console.log(err)
      })
    // 获取推荐歌单数据
    getPlayList()
      .then(data => {
        this.personalized = data.data.result.splice(0, 6)
      })
      .catch(function (err) {
        console.log(err)
      })
    // 获取最新专辑数据
    getAlbums()
      .then(data => {
        this.albums = data.data.albums.splice(0, 6)
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewMusic()
      .then(data => {
        this.newMusic = data.data.result
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
.recommend{
  width: 100%;
  position: fixed;
  top: 184px;
  bottom: 0;
  left: 0;
  rigth:0;
  overflow: hidden;
}
.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0);
}
.v-enter-active{
  transition: transform 3s;
}
.v-leave{
  transform: translateX(0);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 3s;
}
</style>
