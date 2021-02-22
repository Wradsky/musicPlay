<template>
  <transition  appear tag="div">
    <div class="personal">
      <personalHeader @change="changeBack" @changePlay="changePlay"></personalHeader>
      <personalMidder :song=" flag === 0 ? getHistoryList : getCollectFlag"
                      :flag="flag"></personalMidder>
    </div>
  </transition>
</template>

<script>
import personalHeader from './../components/personal/PersonalHeader'
import personalMidder from './../components/personal/PersonalMidder'
import { mapGetters } from 'vuex'
import MetaInfo from '../../vue-meta-info'
export default {
  name: 'Personal',
  metaInfo: MetaInfo.personal,
  data () {
    return {
      flag: 0
    }
  },
  components: {
    personalHeader,
    personalMidder
  },
  computed: {
    ...mapGetters([
      'getHistoryList',
      'getCollectFlag'
    ])
  },
  methods: {
    changeBack () {
      window.history.back()
    },
    changePlay (num) {
      this.flag = num
    }
  }
}
</script>

<style scoped lang="scss">
.personal{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: yellow;
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
