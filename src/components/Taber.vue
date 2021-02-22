<template>
  <div class="taber">
    <router-link tag="div" to="/recommend" class="item">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" to="/singer" class="item">
      <span>歌手</span>
    </router-link>
    <router-link tag="div" to="/ranking" class="item">
      <span>排行</span>
    </router-link>
    <router-link tag="div" to="search" class="item">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Taber'
}
</script>

<style scoped lang="scss">
@import "../assets/css/bg-color";
  .taber{
    width: 100%;
    height: 84px;
    line-height: 84px;
    font-weight: bold;
    @include tableBgColor();
    display: flex;
    justify-content: space-around;
    .item{
      &.router-link-active{
        @include routerActive();
        @include borderColor();
      }
    }
  }
</style>
