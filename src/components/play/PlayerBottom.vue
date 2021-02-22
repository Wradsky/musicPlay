<template>
  <div class="bottom">
    <div class="progress" >
      <span ref="playTime">00:00</span>
      <div class="progress-bar" ref="bar" @click="changeTime">
        <div class="progress-line" ref="line" >
          <div class="progress-point" ref="point"></div>
        </div>
      </div>
      <span :totalTime="musicTime" ref="time">00:00</span>
    </div>
    <ul class="bottom-play">
      <li class="mode" @click="playMode" ref="mode"></li>
      <li class="previous"  @click="listPre"></li>
      <li class="play" @click='musicPlayer' ref="play"></li>
      <li class="next" @click="listNext"></li>
      <li class="collect" @click="collect(songs)" :class="{'active':isFavorite(songs)}"></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'PlayerBottom',
  data () {
    return {
      flagId: 0,
      indexId: 0
    }
  },
  computed: {
    ...mapGetters([
      'getPlayer',
      'getMode',
      'currentIndex',
      'getSongs',
      'songs',
      'getCurrentTime',
      'getCollectFlag',
      'getFavoriteFlag',
      'getFavoriteIndex'
    ])
  },
  props: {
    musicTime: {
      type: Number,
      default: 0,
      require: true
    },
    eleCurrentTime: {
      type: Number,
      default: 0,
      require: true
    }
  },

  methods: {
    ...mapActions([
      'callPlayer',
      'callMode',
      'callCurrentIndex',
      'callCurrentTime',
      'callCollectFlag',
      'callCurrentIndex',
      'callDelFavorite',
      'callDelThis',
      'callCollectIndex'
    ]),
    musicPlayer () {
      this.callPlayer(!this.getPlayer)
    },
    playMode () {
      if (this.getMode === 0) {
        this.callMode(modeType.one)
        this.$refs.mode.classList.add('one')
      } else if (this.getMode === 1) {
        this.callMode(modeType.random)
        this.$refs.mode.classList.add('random')
        this.$refs.mode.classList.remove('one')
      } else if (this.getMode === 2) {
        this.callMode(modeType.loop)
        this.$refs.mode.classList.remove('random')
      }
    },
    listNext () {
      if (this.getMode === 0 || this.getMode === 1) {
        const index = this.getSongs.length - 1
        this.callCurrentIndex(this.currentIndex + 1)
        if (this.currentIndex > index) {
          this.callCurrentIndex(0)
        }
      } else {
        const index = this.generateRandomValInGivenNum(0, this.getSongs.length - 1)
        this.callCurrentIndex(index)
      }
    },
    listPre () {
      if (this.getMode === 0 || this.getMode === 1) {
        const index = this.getSongs.length - 1
        this.callCurrentIndex(this.currentIndex - 1)
        if (this.currentIndex < 0) {
          this.callCurrentIndex(index)
        }
      } else {
        const index = this.generateRandomValInGivenNum(0, this.getSongs.length - 1)
        this.callCurrentIndex(index)
      }
    },
    dataFormat (time) {
      let minute = parseInt(time / 60)
      let second = parseInt(time % 60)
      minute = minute >= 10 ? minute : '0' + minute
      second = second >= 10 ? second : '0' + second
      return {
        minute: minute,
        second: second
      }
    },
    changeTime (e) {
      const offsetX = e.pageX - e.target.offsetLeft
      const value = offsetX / this.$refs.bar.offsetWidth * 100
      const eleTime = this.musicTime
      if (value >= 100) {
        this.$refs.line.style.width = '100%'
      } else {
        this.$refs.line.style.width = value + '%'
        this.callCurrentTime(eleTime * value / 100)
      }
    },
    generateRandomValInGivenNum (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    collect (song) {
      this.callCollectIndex([song, this.currentIndex])
      this.callCollectFlag([song, this.currentIndex])
      if (!this.getFavoriteFlag) {
        for (const key in this.getCollectFlag) {
          if (this.getCollectFlag[key].id === song.id) {
            this.flagId = key
            this.callDelFavorite(key)
          }
        }
        for (const key in this.getFavoriteIndex) {
          if (this.getFavoriteIndex[key] === song.id) {
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
      const result = this.getCollectFlag.find((currentValue) => {
        return currentValue.id === song.id
      })
      return result !== undefined
    }
  },
  watch: {
    // watch 用于监听数据发生变化
    getPlayer (newValue) {
      // 这里newValue的取值只有true 和 false 所以可以到else里
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    musicTime (newValue, oldValue) {
      const times = this.dataFormat(newValue)
      this.$refs.time.innerHTML = times.minute + ':' + times.second
    },
    eleCurrentTime (newValue, oldValue) {
      const times = this.dataFormat(newValue)
      this.$refs.playTime.innerHTML = times.minute + ':' + times.second
      // 同步进度条
      const precentage = newValue / this.musicTime * 100
      this.$refs.line.style.width = precentage + '%'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/font-size";
@import "../../assets/css/bg-color";
.bottom{
  position: fixed;
  bottom: 0;
  width: 100%;
  .progress{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 5%;
    box-sizing: border-box;
    position: relative;
    left: 0;
    span{
      margin: 0 20px;
      @include data-size($min-fs);
      color: #FFFFFF;
    }
    .progress-bar{
      width: 80%;
      height: 10px;
      border-radius:5px;
      background: #ccc;
      .progress-line{
        width: 0;
        height: 10px;
        background: #fff;
        position: relative;
        .progress-point{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          position: absolute;
          left:100%;
          top: 50%;
          transform: translateY(-50%);
          background: #fff;
        }
      }
    }
  }
  .bottom-play{
    width: 100%;
    padding: 50px 5%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    li{
      width: 84px;
      height: 84px;
    }
    .mode{
      @include bgUrl('../../assets/images/loop_');
      &.one{
        @include bgUrl('../../assets/images/one_');
      }
      &.random{
        @include bgUrl('../../assets/images/shuffle_');
      }
    }
    .previous{
      @include bgUrl('../../assets/images/prev_');
    }
    .play{
      @include bgUrl('../../assets/images/play_');
      &.active{
        @include bgUrl('../../assets/images/pause_');
      }
    }
    .next{
      @include bgUrl('../../assets/images/next_');
    }
    .collect{
      @include bgUrl('../../assets/images/un_favorite_');
      &.active{
        @include bgUrl('../../assets/images/favorite_')
      }
    }
  }
}
</style>
