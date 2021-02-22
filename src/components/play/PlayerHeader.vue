<template>
    <div class="playerHeader">
       <div class="header-left" @click="hiddenPlayer"></div>
       <div class="header-title">
         <h3>{{ songs.name }}</h3>
         <h3>{{ songs.singer }}</h3>
       </div>
       <div class="header-right"></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerHeader',
  computed: {
    ...mapGetters([
      'songs'
    ])
  },
  methods: {
    ...mapActions([
      'callPlayShow',
      'callMinPlayShow'
    ]),
    hiddenPlayer () {
      this.callPlayShow(false)
      this.callMinPlayShow(true)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/bg-color";
@import "../../assets/css/font-size";
.playerHeader{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-left{
    width: 84px;
    height: 84px;
    @include bgUrl('../../assets/images/down_')
  }
  .header-title{
    width: 500px;
    overflow: hidden;
    text-align: center;
    @include data-size($max-fs);
    h3{
      white-space: nowrap;
      &:nth-child(2){
        @include data-size($middule-fs);
      }
    }
    color: #FFFFFF;
  }
  .header-right{
    width: 84px;
    height: 84px;
  }
}
</style>
