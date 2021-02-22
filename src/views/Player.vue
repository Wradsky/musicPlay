<template>
<div class="player" >
  <normalPlay v-show="this.getPlayShow " :totalTime="time" :currentTime="currentTime"></normalPlay>
  <minPlayer @myFn="show"></minPlayer>
  <minFavortie ref="list"></minFavortie>
  <audio :src="songs.url" ref="audio" @timeupdate="getPlayTime" @ended="playEnd"></audio>
</div>
</template>

<script>
import normalPlay from '../components/play/normal-player'
import minPlayer from '../components/play/minPlayer'
import minFavortie from '../components/play/minFavortie'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Player',
  components: {
    normalPlay,
    minPlayer,
    minFavortie
  },
  data () {
    return {
      time: 0,
      currentTime: 0
    }
  },
  computed: {
    ...mapGetters([
      'getPlayShow',
      'songs',
      'getPlayer',
      'currentIndex',
      'getCurrentTime',
      'getMode',
      'getSongs',
      'getCollectFlag',
      'getFavoriteIndex',
      'getKey',
      'getHistoryList'
    ])
  },
  methods: {
    ...mapActions([
      'callCurrentTime',
      'callCurrentIndex',
      'callSongs',
      'callSetCollectFlag',
      'callSetCollectIndex',
      'callSetKey',
      'callHistoryList',
      'callDelHistory'
    ]),
    show () {
      this.$refs.list.show()
    },
    getPlayTime (e) {
      this.currentTime = e.target.currentTime
    },
    playEnd () {
      if (this.getMode === 0) {
        this.callCurrentIndex(this.currentIndex + 1)
      } else if (this.getMode === 1) {
        this.$refs.audio.play()
      } else {
        const index = this.generateRandomValInGivenNum(0, this.getSongs.length - 1)
        console.log(index, this.currentIndex)
        if (index === this.currentIndex) {
          this.$refs.audio.play()
        } else {
          this.callCurrentIndex(index)
        }
      }
    },
    generateRandomValInGivenNum (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  },
  watch: {
    getPlayer (newValue, oldValue) {
      if (newValue) {
        this.callHistoryList(this.songs)
        this.$refs.audio.play()
        // this.time = this.$refs.audio.duration
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex (newValue, oldValue) {
      // oncanplay 在ios上无效  要用ondurationchange 支持安卓和ios
      this.$refs.audio.ondurationchange = () => {
        this.time = this.$refs.audio.duration
        if (this.getPlayer) {
          this.$refs.audio.play()
          this.callHistoryList(this.songs)
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    getCurrentTime (newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
    },
    getCollectFlag (newValue, oldValue) {
      window.localStorage.setItem('favorite', JSON.stringify(newValue))
    },
    getFavoriteIndex (newValue, oldValue) {
      window.localStorage.setItem('favoriteIndex', JSON.stringify(newValue))
    },
    getHistoryList (newValue, oldValue) {
      window.localStorage.setItem('historyList', JSON.stringify(newValue))
      if (newValue.length >= 30) {
        this.callDelHistory(0)
      }
    }
  },
  created () {
    const local = JSON.parse(window.localStorage.getItem('favorite'))
    const localIndex = JSON.parse(window.localStorage.getItem('favoriteIndex'))
    const historyList = JSON.parse(window.localStorage.getItem('historyList'))
    if (historyList !== null) {
      historyList.forEach((value) => {
        this.callHistoryList(value)
      })
    }
    if (local !== null) {
      this.callSetCollectFlag(local)
    }
    if (localIndex !== null) {
      this.callSetCollectIndex(localIndex)
    }
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
      this.time = this.$refs.audio.duration
    }
  }
}
</script>

<style scoped lang="scss">
//.player{
//  position: fixed;
//  top: 0;
//  left: 0;
//  bottom: 0;
//  right: 0;
//  background: red;
//}
</style>
