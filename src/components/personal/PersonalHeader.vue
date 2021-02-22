<template>
  <div class="header" @click="changePersonal">
    <div class="header-left" @click.stop="back"></div>
    <div class="header-title">
      <span :class="{'active':index===0}" @click.stop="changeName(0)">最近播放</span>
      <span :class="{'active':index===1}" @click.stop="changeName(1)">收藏歌曲</span>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PersonalHeader',
  data: function () {
    return {
      theme: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    ...mapActions([
      'callMinPlayShow'
    ]),
    changePersonal () {
      this.index++
      if (this.index > 2) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-bg', this.theme[this.index])
    },
    changeName (num) {
      this.index = num
      this.$emit('changePlay', num)
    },
    back () {
      this.$emit('change')
      this.callMinPlayShow(true)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/bg-color";
@import "../../assets/css/font-size";
.header {
  width: 100%;
  height: 100px;
  @include bgColor();
  display: flex;
  justify-content: space-between;

  .header-left {
    width: 84px;
    height: 84px;
    margin-top: 8px;
    @include bgUrl("../../assets/images/back_");
    vertical-align: bottom;
  }

  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
    @include bgUrl("../../assets/images/more_");
    vertical-align: bottom;
  }

  .header-title {
    height: 60px;
    line-height: 60px;
    color: #fff;
    font-weight: bold;
    border: 1px solid #fff;
    border-radius: 30px;
    margin-top: 20px;
    @include data-size($middule-fs);
    overflow: hidden;
    span{
      display: inline-block;
      padding: 0 10px;
      &:nth-child(1){
        border-right: 1px solid #fff;
      }
      &.active{
        background: rgba(255,255,255,0.3);
      }
    }
  }
}
</style>
