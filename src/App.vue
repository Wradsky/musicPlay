<template >
  <div class="app">
    <Header @select="changeTest"></Header>
    <Taber></Taber>
<!--    <transition>-->
    <keep-alive include="Singer,Ranking">
      <router-view></router-view>
    </keep-alive>
<!--    </transition>-->
    <Player></Player>
  </div>
</template>

<script>
import Header from './components/Header'
import Taber from './components/Taber'
import Player from './views/Player'
export default {
  name: 'App',
  components: {
    Header,
    Taber,
    Player
  },
  methods: {
    changeTest () {
      // this.$router.push({ path: '/personal' })
    }
  }
}
</script>

<style scoped lang="scss">
//.v-enter{
//  transform: translateX(100%);
//}
//.v-enter-to{
//  transform: translateX(0%);
//}
//.v-enter-active{
//  transition: transform 1s;
//}
//.v-leave{
//  transform: translateX(0%);
//}
//.v-leave-to{
//  transform: translateX(100%);
//}
//.v-leave-active{
//  transition: transform 1s;
//}
</style>
