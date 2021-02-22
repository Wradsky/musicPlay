<template>
  <transition @enter="enter" @leave="leave" :css="false">
    <div class="normal-player" >
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle :eleCurrentTime="currentTime"></PlayerMiddle>
      <PlayerBottom :musicTime="totalTime" :eleCurrentTime="currentTime"></PlayerBottom>
      <div class="mask">
        <img :src='songs.picUrl' class="mask-in">
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMidder'
import PlayerBottom from './PlayerBottom'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'normal-player',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'songs'
    ])
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      require: true
    },
    currentTime: {
      type: Number,
      default: 0,
      require: true
    }
  },
  methods: {
    ...mapActions([
      'callLyric'
    ]),
    enter: function (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
        done()
      })
    },
    leave: function (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
    }
  },
  watch: {
    songs (newValue, oldValue) {
      if (newValue.id === undefined || null) {
        return
      }
      this.callLyric(newValue.id)
    }
  }
}
</script>

<style scoped lang="scss">
.normal-player{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: -1;
    .mask-in{
      width: 100%;
      height: 100%;
      background: url('../../assets/images/zyjj.jpg') no-repeat center 0;
      background-size: cover;
      opacity: 0.8;
      filter:blur(40px);
      position: relative;
      z-index: -2;
    }
  }
}
</style>
