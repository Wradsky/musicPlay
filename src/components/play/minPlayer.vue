<template>
  <transition :css='false' @enter="enter" @leave="leave" >
  <div class="min-player" v-show="this.getMinPlayShow">
    <div class="min-info">
      <div class="min-left" >
        <img :src="songs.picUrl" @click="changeMinPlayer" ref="minCd">
       <div class="min-title">
         <h3>{{ songs.name }}</h3>
         <h3>{{ songs.singer }}</h3>
       </div>
      </div>
      <ul class="min-right">
        <li @click="changePlay" ref="play"></li>
        <li @click="openFavorite"></li>
      </ul>
    </div>
  </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'minPlayer',
  computed: {
    ...mapGetters([
      'getMinPlayShow',
      'getPlayer',
      'songs',
      'getSongs'
    ])
  },
  methods: {
    ...mapActions([
      'callMinPlayShow',
      'callPlayShow',
      'callPlayer'
    ]),
    changeMinPlayer () {
      this.callMinPlayShow(false)
      this.callPlayShow(true)
    },
    openFavorite () {
      this.$emit('myFn')
    },
    enter: function (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
        done()
      })
    },
    leave: function (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
    },
    changePlay () {
      this.callPlayer(!this.getPlayer)
    }
  },
  watch: {
    getPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
        this.$refs.minCd.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.minCd.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/font-size";
@import "../../assets/css/bg-color";
.min-player{
  position: fixed;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 150px;
  border-top: 1px solid #fff;
  @include bgColor();
  .min-info{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .min-left{
      height: 100%;
      display: flex;
      align-items: center;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        padding: 0 20px;
        vertical-align: bottom;
        animation: rotate 5s linear 0s infinite ;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
      }
      .min-title{
        width: 300px;
        height: 100px;
        overflow: hidden;
        white-space: nowrap;
        h3{
          height: 50px;
          @include data-size($middule-fs);
          color: #c3c3c3;
        }
      }
    }
    .min-right{
      height: 100%;
      display: flex;
      align-items: center;
      li{
        height: 84px;
        width: 84px;
        margin-right: 20px;
        &:nth-child(1){
          @include bgUrl('../../assets/images/play_');
          &.active{
            @include bgUrl('../../assets/images/pause_');
          }
        }
        &:nth-child(2){
          height: 100px;
          width: 100px;
          @include bgUrl('../../assets/images/list_');
        }
      }
    }
  }
  @keyframes rotate {
    from{
      transform: rotate(0);
    }
    to{
      transform: rotate(360deg);
    }
  }
}
</style>
