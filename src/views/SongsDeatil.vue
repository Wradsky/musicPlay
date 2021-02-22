<template>
  <div class="song-detail" >
    <div class="songHeader" @click="changeBg">
      <div class="header-left" @click.stop="back"></div>
      <h1 class="header-title">{{playlist.name}}</h1>
      <div class="header-right"></div>
    </div>
    <div class="songImg" ref="listBox">
      <img v-lazy="playlist.coverImgUrl" >
    </div>
    <Iscorll ref="iscroll">
      <div>
        <ul class="list" >
          <li class="list-title" >
            <a @click="test">
              <span></span>
              <span>播放全部</span>
            </a>
          </li>
          <li class="list-info" v-for="(value,index) in playlist.tracks" :key="value.id"
              @click="musicPlayer(value.id, index)">
            <div>
              <p>{{ value.name }}</p>
              <p>{{ value.ar[0].name }}</p>
            </div>
          </li>
          <li class="padding"></li>
        </ul>
      </div>
    </Iscorll>
  </div>
</template>

<script>
import { getMusicDetail, getAlbumDetail, getArtistSong } from '../api/index'
import Iscorll from '../components/Iscorll'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'SongsDeatil',
  components: {
    Iscorll
  },
  data () {
    return {
      theme: ['theme', 'theme1', 'theme2'],
      index: 0,
      playlist: []
    }
  },
  computed: {
    ...mapGetters([
      'songs'
    ])
  },
  methods: {
    ...mapActions([
      'callPlayShow',
      'callMinPlayShow',
      'callSongs',
      'callCurrentIndex'
    ]),
    changeBg () {
      this.index++
      if (this.index > 2) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-bg', this.theme[this.index])
    },
    back () {
      window.history.back()
    },
    musicPlayer (id, index) {
      console.log(1)
      this.callPlayShow(true)
      this.callMinPlayShow(false)
      this.callCurrentIndex(index)
      this.callSongs([id])
    },
    test () {
      this.callPlayShow(true)
      this.callMinPlayShow(false)
      const ids = this.playlist.tracks.map(value => {
        return value.id
      })
      this.callSongs([ids])
    },
    testchange () {
      console.log(1)
    }
  },
  created () {
    if (this.$route.params.type === 'albums') {
      getAlbumDetail({ id: this.$route.params.id }).then(data => {
        this.playlist = {
          name: data.data.album.name,
          coverImgUrl: data.data.album.picUrl,
          tracks: data.data.songs
        }
      }).catch(function (err) {
        console.log(err)
      })
    } else if (this.$route.params.type === 'personalized') {
      getMusicDetail({ id: this.$route.params.id }).then(data => {
        this.playlist = data.data.playlist
      }).catch(function (err) {
        console.log(err)
      })
    } else if (this.$route.params.type === 'singer') {
      getArtistSong({ id: this.$route.params.id }).then(data => {
        console.log(data)
        this.playlist = {
          name: data.data.artist.name,
          coverImgUrl: data.data.artist.picUrl,
          tracks: data.data.hotSongs
        }
      }).catch(function (err) {
        console.log(err)
      })
    } else if (this.$route.params.type === 'ranking') {
      getMusicDetail({ id: this.$route.params.id }).then(data => {
        console.log(data)
        this.playlist = {
          name: data.data.playlist.name,
          coverImgUrl: data.data.playlist.coverImgUrl,
          tracks: data.data.playlist.tracks
        }
        console.log(this.playlist)
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    const offsetY = this.$refs.listBox.offsetHeight
    this.$refs.iscroll.scrolling(offset => {
      const scale = 1 + offset / offsetY
      if (scale > 1) {
        this.$refs.listBox.style.transform = `scale(${scale})`
      } else {
        this.$refs.listBox.style.opacity = Math.abs(scale)
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/font-size";
@import "../assets/css/bg-color";
.song-detail{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  @include bgColor();
  .songHeader{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 999;
    @include bgColor();
    @include fontColor();
    .header-left{
      width: 84px;
      height: 84px;
      margin-top: 8px;
      @include bgUrl('../assets/images/back_');
      background-image: variable-exists(bottom);
    }
    .header-right{
      width: 84px;
      height: 84px;
      margin-top: 8px;
      @include bgUrl('../assets/images/more_');
      background-image: variable-exists(bottom);
    }
    .header-title{
      width: 50%;
      line-height: 100px;
      @include  data-size($max-fs);
      font-weight: bold;
      text-align: center;
      overflow: hidden;
    }
  }
  .songImg{
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  #wrapper{
    position: fixed;
    left: 0;
    top: 550px;
    height: 60%;
    .list{
      width: 100%;
      height:945px;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
     @include bgColor3();
      .list-title{
        width: 100%;
        height: 84px;
        border-bottom: 1px solid #fff;
        a{
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          span{
            margin: 0 20px;
            &:nth-child(1){
              display: inline-block;
              width: 60px;
              height: 60px;
              @include bgUrl('../assets/images/small_play_')
            }
            &:nth-child(2){
              @include data-size($min-fs);
              color: #030303;
              @include fontColor();
            }
          }
        }
      }
      .list-info{
        width: 100%;
        height: 84px;
        border-bottom: 1px solid #fff;
        @include bgColor3();
       div{
          display: inline-block;
          height: 100%;
          color: #030303;
          @include fontColor();
          @include data-size($minx-fs);
          line-height: 42px;
          margin-left: 20px;
        }
      }
      .padding{
        height: 10px;
      }
    }
  }

}
</style>
