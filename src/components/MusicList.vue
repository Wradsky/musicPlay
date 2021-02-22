<template>
    <div class="item1">
      <div class="title">{{  title }}</div>
      <div class="musiclist">
        <div class="music" v-for="value in MusicList" :key="value.id" @click="musicClick(value.id)">
          <img v-lazy="value.picUrl" >
          <p>{{ value.name }}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'MusicList',
  props: {
    MusicList: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    musicClick (id) {
      console.log(1)
      this.$emit('select', id, this.type)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/font-size";
@import "../assets/css/bg-color";
  .item1{
    width: 100%;
    @include bgColor1();
    .title{
      width: 100%;
      height: 84px;
      line-height: 84px;
      padding: 0 20px;
      border-bottom: 1px solid #cccccc;
      @include data-size($middule-fs);
      @include fontColor();
      @include bgColor2();
    }
    .musiclist{
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .music{
        width: 200px;
        margin: 15px 0;
        img{
          width: 100%;
          height: 200px;
          vertical-align: bottom;
          border-radius: 15px;
        }
        p{
          margin-top: 5px;
          text-align: center;
          @include data-size($min-fs);
          @include fontColor();
          @include clamp(2);
        }
      }
    }
  }
</style>
