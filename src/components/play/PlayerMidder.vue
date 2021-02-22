<template>
  <swiper :options="swiperOptions" class="middle">
    <swiper-slide >
      <div class="middle-one">
        <div class="middle-top" ref="cd">
          <img :src="songs.picUrl" >
        </div>
        <div class="middle-bottom">
          <p>{{ setLyric() }}</p>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide ref="swiper">
      <Iscroll ref="scrollView">
      <div class="middle-two" ref="test">
        <ul class="middle-info">
          <li v-for="(value,index) in getLyric" :key="index" :class="{'active' : index ===lyricKey}">{{
              value }}</li>
        </ul>
      </div>
      </Iscroll>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Iscroll from '../Iscorll'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'PlayerMidder',
  data () {
    return {
      swiperOptions: {
        direction: 'horizontal',
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet', // 需设置.my-bullet样式
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      lyricKey: '0',
      index: false
    }
  },
  props: {
    eleCurrentTime: {
      type: Number,
      default: 0,
      require: true
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    Iscroll
  },
  computed: {
    ...mapState([
      'lyric'
    ]),
    ...mapGetters([
      'getPlayer',
      'songs',
      'getLyric',
      'currentIndex'
    ])
  },
  watch: {
    getPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.cd.classList.add('active')
      } else {
        this.$refs.cd.classList.remove('active')
      }
    },
    eleCurrentTime (newValue, oldValue) {
      console.log(newValue)
      const res = Math.floor(newValue)
      this.lyricKey = this.getNum(res)
      if (this.lyricKey > 0) {
        const offsetTop = document.querySelector('.middle-info .active').offsetTop
        const boxHeight = this.$refs.swiper.$el.offsetHeight
        const maxTop = this.$refs.scrollView.iscroll.maxScrollY
        const result = boxHeight / 2 - offsetTop
        if (result <= maxTop) {
          this.$refs.scrollView.scrollTo(0, maxTop, 100)
          return
        }
        if (offsetTop >= boxHeight / 2) {
          this.$refs.scrollView.scrollTo(0, result, 100)
        } else {
          this.$refs.scrollView.scrollTo(0, 0, 100)
        }
      }
    },
    getLyric (newValue, oldValue) {
      if (newValue === undefined) return
      for (const key in newValue) {
        this.lyricKey = key
        return
      }
    }
  },
  methods: {
    setLyric () {
      for (const key in this.getLyric) {
        this.index = true
        return this.getLyric[key]
      }
    },
    getNum (num) {
      if (num < 0) {
        return this.lyricKey
      }
      const result = this.getLyric[num + '']
      if (result === undefined || result === '') {
        num--
        return this.getNum(num)
      } else {
        return num + ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/font-size";
.middle{
  position: fixed;
  top: 150px;
  bottom:250px;
  left: 0;
  right: 0;
  .middle-one{
    width: 100%;
    height: 100%;
    .middle-top{
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 20px solid #fff;
      margin: 0 auto;
      overflow: hidden;
      animation: rotate 5s linear 0s infinite ;
      animation-play-state: paused;
      &.active{
        animation-play-state: running;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    .middle-bottom{
      width: 100%;
      height: 200px;
      margin-top: 40px;
      p{
        width: 100%;
        padding: 0 10%;
        box-sizing: border-box;
        text-align: center;
        line-height: 60px;
        word-break:break-all;
      }
    }
  }
  .middle-two{
    width: 100%;
    overflow: hidden;
    .middle-info{
      width: 100%;
      padding: 0 10%;
      box-sizing: border-box;
      word-break:break-all;
      li{
        width: 100%;
        line-height: 64px;
        text-align: center;
        color: #ccc;
        &:last-child{
          padding-bottom:40px;
        }
        @include data-size($middule-fs);
        &.active{
          color: #fff;
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
<style lang="scss">
.my-bullet{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: #fff;
  margin: 0 10px;
}
.my-bullet-active{
  display: inline-block;
  width: 50px;
  height: 20px;
  background: greenyellow;
}
</style>
