<template>
  <swiper :options="swiperOptions" class="banner" v-if="Banner.length >0">
    <swiper-slide v-for="value in Banner" :key="value.bannerId" class="item">
      <img :src="value.pic" @click="myfn">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
export default {
  name: 'Banner',
  data () {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 3000
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: {
    Banner: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  methods: {
    myfn () {
      console.log(1)
    }
  }
}
</script>

<style scoped lang="scss">
.banner{
  .item{
    img{
      width: 100%;
      height: 300px;
      vertical-align: bottom;
    }
  }
}
</style>
<style lang="scss">
@import "../assets/css/bg-color";
.banner{
  .swiper-pagination-bullet{
    width: 20px;
    height: 20px;
    background: #FFFFFF;
    opacity: 1;
  }
  .swiper-pagination-bullet-active{
    @include bgColor();
  }
}
</style>
