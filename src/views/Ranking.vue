<template>
 <div class="rank">
   <Iscorll>
      <ul>
     <li class="rank—title" v-for="(value,key) in songs.titles" :key="key" >
        <h2>{{value}}</h2>
       <ul class="rank-list" v-if="key === 'officialList'">
         <li v-for="result in songs[key]" :key="result.rank.id" @click="getDetail(result.rank.id)"
             class="rank-info">
           <div class="rank-img">
             <img v-lazy="result.rank.coverImgUrl" >
             <span>{{result.rank.updateFrequency}}</span>
           </div>
           <div class="rank-right" >
             <p v-for="(name,index) in result.rank.tracks" :key="index">{{index}}.{{ name.first
               }}-{{name.second}}</p>
           </div>
         </li>
       </ul>
       <ul class="other-title" v-else>
         <li class="other-list" v-for="result in songs[key]" :key="result.rank.id"
             @click="getOtherDetail(result.rank.id)">
           <img v-lazy="result.rank.coverImgUrl" >
           <p class="other-right">{{result.rank.name}}</p>
         </li>
       </ul>
     </li>
   </ul>
   </Iscorll>
   <transition>
     <router-view></router-view>
   </transition>
 </div>
</template>

<script>
import { getAllRank } from '../api'
import Iscorll from '../components/Iscorll'
import MetaInfo from '../../vue-meta-info'
export default {
  name: 'Ranking',
  metaInfo: MetaInfo.ranking,
  data () {
    return {
      songs: {}
    }
  },
  components: {
    Iscorll
  },
  methods: {
    getDetail (id) {
      this.$router.push(`/ranking/detail/${id}/ranking`)
    },
    getOtherDetail (id) {
      this.$router.push(`/ranking/detail/${id}/ranking`)
    }
  },
  created () {
    getAllRank().then((data) => {
      this.songs = data
    }).catch(function (err) {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/font-size";
.rank{
  position: fixed;
  top: 184px;
  right: 0;
  left: 0;
  bottom: 0;
  background: greenyellow;
  overflow: hidden;
  .rank—title{
    width: 100%;
    background: #ccc;
    h2{
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      @include data-size($middule-fs);
      font-weight: bold;
      border-bottom: 1px solid #fff;
    }
    .rank-list{
      width: 100%;
      background: #ccc;
      .rank-info{
        height: 100%;
        display: flex;
        align-items: center;
        padding: 20px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #fff;
        .rank-img{
          position: relative;
          img{
            width: 160px;
            height: 160px;
            border-radius: 20px;
            margin: 0 20px;
            position: relative;
          }
          span{
            display: inline-block;
            width: 160px;
            text-align: center;
            position: absolute;
            left:50%;
            bottom:15px;
            transform: translateX(-50%);
            @include data-size($minx-fs);
            color: #fff;
          }
        }
        .rank-right{
          width: 70%;
          p{
            width: 100%;
            line-height: 50px;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
    .other-title{
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .other-list {
        width: 200px;
        height: 200px;
        padding: 20px 0;
        img {
          width: 160px;
          height: 160px;
          border-radius: 20px;
        }
        .other-right{
          width: 160px;
          text-align: center;
          @include data-size($minx-fs);
          overflow: hidden;
        }
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
