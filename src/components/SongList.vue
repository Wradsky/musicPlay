<template>
  <div class="songs">
    <div class="top">最新音乐</div>
    <div class="bottom" v-for="value in SongList" :key="value.id" @click="SongPlayer(value.id)">
      <img v-lazy="value.picUrl" >
      <div class="song-info">
        <p>{{value.name}}</p>
        <p>{{value.song.artists[0].name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongList',
  props: {
    SongList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'callPlayShow',
      'callSongs',
      'callMinPlayShow'
    ]),
    SongPlayer (id) {
      this.callPlayShow(true)
      this.callMinPlayShow(false)
      this.callSongs([id])
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/font-size";
@import "../assets/css/bg-color";
.songs{
  width: 100%;
 .top{
   width: 100%;
   height: 84px;
   line-height: 84px;
   @include data-size($middule-fs);
   padding: 0 20px;
   @include fontColor();
   @include bgColor2();
 }
  .bottom{
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    @include fontColor();
    @include bgColor1();
    border-bottom: 1px solid #000;
    img{
      width: 150px;
      height: 150px;
      border-radius: 15px;
      vertical-align: bottom;
    }
    .song-info{
      margin-left: 20px;
      @include data-size($min-fs);

    }
  }
}
</style>
