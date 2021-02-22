<template>
  <div class="singer" >
    <Iscroll ref="iscroll">
      <ul class="artist" >
        <li class="artist-title" v-for="(value,index) in artists.keys" :key="index" ref="title">
          <h6>{{value}}</h6>
          <ul class="artist-info" >
            <li class="artist-name" v-for="singer in artists.list[index]" :key="singer.id"
                @click="changeDetail(singer.id)">
              <img v-lazy="singer.picUrl">
              <p>{{ singer.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </Iscroll>
    <ul class="letter">
      <li :class="{'active': index === currentIndex}" v-for="(value,index) in artists.keys" :key="index" @click="changeScroll(index)">{{ value }}</li>
    </ul>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtist } from '../api/index'
import Iscroll from '../components/Iscorll'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'Singer',
  metaInfo: MetaInfo.singer,
  components: {
    Iscroll
  },
  data () {
    return {
      artists: {},
      currentIndex: 0
    }
  },
  methods: {
    changeScroll (index) {
      this.currentIndex = index
      const offsetTop = this.$refs.title[index].offsetTop
      console.log(this.$refs.title[index].offsetHeight)
      const maxScrollTop = this.$refs.iscroll.iscroll.maxScrollY
      if (-offsetTop <= maxScrollTop) {
        this.$refs.iscroll.scrollTo(0, maxScrollTop)
      } else {
        this.$refs.iscroll.scrollTo(0, -offsetTop)
      }
    },
    changeDetail (id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  },
  created () {
    getAllArtist().then((data) => {
      this.artists = data
    }).catch(function (err) {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/font-size";
@import "../assets/css/bg-color";
.singer{
  position: fixed;
  top: 184px;
  bottom: 0;
  right: 0;
  left: 0;
  background:green;
  overflow:hidden;
  .artist{
    width: 100%;
    .artist-title{
      width: 100%;
      background: red;
      h6{
        height: 60px;
        line-height: 60px;
        padding: 0 40px;
        @include data-size($middule-fs)
      }
    }
    .artist-info{
      width: 100%;
      .artist-name{
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        background: #ccc;
        img{
          width: 84px;
          height: 84px;
          border-radius: 50%;
          padding-right: 20px;
        }
      }
    }
  }
  .letter{
    position:absolute;
    top: 30px;
    right: 20px;
    bottom: 0;
    li{
      height: 40px;
      line-height: 40px;
      @include data-size($min-fs);
      &.active{
        color:#FFFFFF;
      }
    }
  }
}
.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 1s;
}
.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: all 1s;
}
</style>
