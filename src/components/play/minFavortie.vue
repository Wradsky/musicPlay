<template>
  <div class="favorite" v-show="iShow">
    <ul class="favorite-list"  ref="play">
      <li class="favorite-title" @click="delAll">
        <p>
          <span ref="listMode"></span>
          <span v-if="this.getMode === 0">循环播放</span>
          <span v-if="this.getMode === 1">单曲播放</span>
          <span v-if="this.getMode === 2">随机播放</span>
        </p>
        <p></p>
      </li>
      <li class="favorite-song" v-for="(value,index) in getSongs" :key="index"
          @click.stop="selectMusic(index)">
        <div class="song-left">
          <p @click.stop="play" v-show="currentIndex === index"></p>
          <p>{{ value.name }}</p>
        </div>
        <div class="song-right">
          <p @click="minFavorite(value,index)" :class="{'active':isFavorite(value)}"></p>
          <p @click.stop="del(index)"></p>
        </div>
      </li>
      <li class="favorite-close" @click="hidden">关闭</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'minFavortie',
  data: function () {
    return {
      iShow: false,
      list: ''
    }
  },
  computed: {
    ...mapGetters([
      'getMode',
      'getPlayer',
      'getSongs',
      'currentIndex',
      'getCollectFlag',
      'songs',
      'getFavoriteFlag',
      'getFavoriteIndex'
    ])
  },
  methods: {
    ...mapActions([
      'callPlayer',
      'callPlayShow',
      'callMinPlayShow',
      'callDelSongs',
      'callCurrentIndex',
      'callCollectFlag',
      'callDelFavorite',
      'callDelThis',
      'callCollectIndex'
    ]),
    show () {
      this.iShow = true
    },
    hidden () {
      this.iShow = false
    },
    play () {
      this.callPlayer(!this.getPlayer)
    },
    del (index) {
      this.callDelSongs(index)
      if (this.getSongs.length === 0) {
        this.hidden()
      }
    },
    delAll () {
      this.callPlayShow(false)
      this.callMinPlayShow(false)
      this.callDelSongs()
      this.hidden()
    },
    selectMusic (index) {
      this.callCurrentIndex(index)
    },
    minFavorite (value, index) {
      this.callCollectIndex([value, index])
      this.callCollectFlag([value, index])
      if (!this.getFavoriteFlag) {
        for (const key in this.getCollectFlag) {
          if (this.getCollectFlag[key].id === value.id) {
            this.flagId = key
            this.callDelFavorite(key)
          }
        }
        for (const key in this.getFavoriteIndex) {
          if (this.getFavoriteIndex[key] === value.id) {
            this.indexId = key
            this.callDelThis(key)
          }
        }
        // console.log(this.getFavoriteIndex)
        // for (const key in this.getFavoriteIndex) {

        // if (this.getFavoriteIndex[key] === song.id) {
        //   // this.callCollectFlag([song, key])
        //   this.callDelFavorite(key)
        //   this.callDelThis(key)
        // }
        // }
        //   const result = this.currentIndex + ''
        //   if (key === result) {
        //     const index = this.getFavoriteIndex[key]
        //     this.callDelFavorite(index)
        //     this.callDelThis(result)
        //   }
        // }
      }
    },
    isFavorite (song) {
      const result = this.getCollectFlag.find(function (currentValue) {
        return currentValue.id === song.id
      })
      return result !== undefined
    }
  },
  watch: {
    getMode (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.listMode.classList.remove('random')
      } else if (newValue === modeType.one) {
        this.$refs.listMode.classList.add('one')
      } else {
        this.$refs.listMode.classList.remove('one')
        this.$refs.listMode.classList.add('random')
      }
    },
    getPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/bg-color";
@import "../../assets/css/font-size";
.favorite{
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  overflow: hidden;
  .favorite-list{
    width: 100%;
    height: 100%;
    li{
      background: #dcdcd9;
      border-bottom: 1px solid #f9f9f9;
    }
    .favorite-title{
      width: 100%;
      height: 84px;
      display: flex;
      justify-content: space-between;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      p{
        height: 100%;
        &:nth-of-type(1){
          display: flex;
          align-items: center;
          span{
            &:nth-child(1){
              width: 64px;
              height: 64px;
              @include bgUrl('../../assets/images/small_loop_');
              margin: 0 10px;
              &.one{
                @include bgUrl('../../assets/images/small_one_');
              }
              &.random{
                @include bgUrl('../../assets/images/small_shuffle_');
              }
            }
            &:nth-child(2){
              @include data-size($middule-fs);
              color: #666666;
            }
          }
        }
        &:nth-of-type(2){
          width: 84px;
          height: 84px;
          @include bgUrl('../../assets/images/small_del_');
        }
       }
    }
    .favorite-song{
      width: 100%;
      height: 84px;
      display: flex;
      justify-content: space-between;
     .song-left{
       height: 100%;
       display: flex;
       align-items: center;
       p{
         margin: 0 10px;
         color: #666666;
         &:nth-child(1){
           width: 54px;
           height: 54px;
           @include bgUrl('../../assets/images/small_play_');
         }
         &:nth-child(2){
          @include data-size($min-fs);
         }
       }
     }
     .song-right{
       height: 100%;
       display: flex;
       align-items: center;
       p{
         width: 54px;
         height: 54px;
         margin: 0 10px;
         &:nth-child(1){
           @include bgUrl('../../assets/images/small_un_favorite_');
           &.active{
             @include bgUrl('../../assets/images/small_favorite_');
           }
         }
         &:nth-child(2){
           @include bgUrl('../../assets/images/small_close_');
         }
       }
     }
    }
    .favorite-close{
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #666666;
      font-weight: bold;
      @include bgColor();
      @include data-size($max-fs);
    }
    &.active{
      .favorite-song{
        .song-left{
          p{
            &:nth-child(1){
              @include bgUrl('../../assets/images/small_pause_');
            }
          }
        }
      }
    }
  }
}
</style>
