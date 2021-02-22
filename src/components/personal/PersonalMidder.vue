<template>
    <div class="account">
      <div class="account-top" @click="playMusicAll">
        <span></span>
        播放全部
      </div>
      <Iscorll ref="test">
          <ul class="account-middle" >
            <li class="account-list" v-for="(value,index) in song" :key="value.id"
                @click="playMusics(value.id,index)">
              <img :src="value.picUrl" >
              <div>
                <p>{{ value.name }}</p>
                <p>{{ value.singer }}</p>
              </div>
            </li>
            <li class="account-last"></li>
          </ul>
      </Iscorll>
  </div>
</template>

<script>
import Iscorll from '../Iscorll'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'PersonalMidder',
  components: {
    Iscorll
  },
  props: {
    song: {
      type: Array,
      default: () => [],
      require: true
    },
    flag: {
      type: Number,
      default: 0,
      require: true
    }
  },
  computed: {
    ...mapGetters([
      'getHistoryList',
      'getCollectFlag',
      'getPlayShow'

    ])
  },
  methods: {
    ...mapMutations([
      'changeSongs'
    ]),
    ...mapActions([
      'setSongDetail',
      'callPlayShow',
      'callCurrentIndex',
      'callMinPlayShow',
      'callSongs'
    ]),
    playMusics (ids, index) {
      this.callPlayShow(true)
      this.callMinPlayShow(false)
      this.callCurrentIndex(index)
      this.callSongs([ids])
    },
    playMusicAll () {
      this.callPlayShow(true)
      this.callMinPlayShow(false)
      if (this.flag === 0) {
        this.changeSongs(this.getHistoryList)
      } else {
        this.changeSongs(this.getCollectFlag)
      }
      this.callCurrentIndex(0)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/bg-color";
@import "../../assets/css/font-size";
.account{
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
 @include bgColor();
  .account-top{
    width: 100%;
    height: 84px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#fff;
    span{
      display: inline-block;
      width:64px;
      height: 64px;
      @include bgUrl('../../assets/images/play_');
      margin-right: 20px;
    }
  }
  #wrapper{
    overflow: hidden;
  .account-middle {
    width: 100%;
    .account-list {
        width: 100%;
        height: 150px;
        display: flex;
        align-items: center;
        background: #c3c3c3;
        border-bottom: 1px solid #FFFFFF;
        img {
          width: 100px;
          height: 100px;
          margin: 0 20px;
          border-radius: 20px;
        }
        div {
          width: 550px;
          p{
            color: #fff;
          }
        }
      }
    .account-last{
      padding-bottom: 74px;
    }
    }
  }
}
</style>
