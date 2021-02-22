<template>
  <div class="header" @click="changeBg">
    <div class="header-left"></div>
    <h1 class="header-title">知渔音乐</h1>
    <div class="header-right" @click.stop="personal"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Header',
  data: function () {
    return {
      theme: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  computed: {
    ...mapGetters([
      'getTest',
      'getMinPlayShow'
    ])
  },
  methods: {
    ...mapActions([
      'callTest',
      'callMinPlayShow'
    ]),
    changeBg () {
      this.index++
      if (this.index > 2) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-bg', this.theme[this.index])
    },
    personal () {
      // this.$emit('select')
      this.$router.push({ path: '/personal' })
      this.callTest()
      this.callMinPlayShow(false)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/bg-color";
@import "../assets/css/font-size";
.header{
  width: 100%;
  height: 100px;
  @include bgColor();
  display: flex;
  justify-content: space-between;
  .header-left{
    width: 84px;
    height: 84px;
    margin-top: 8px;
    @include bgUrl("../assets/images/logo_");
    vertical-align: bottom;
  }
  .header-right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
    @include bgUrl("../assets/images/account_");
    vertical-align: bottom;
  }
  .header-title{
    line-height: 98px;
    color: #fff;
    font-weight: bold;
    @include data-size($max-fs)
  }
}
</style>
