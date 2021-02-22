<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Iscorll from 'iscroll/build/iscroll-probe'
export default {
  name: 'Iscorll',
  mounted () {
    this.iscroll = new Iscorll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      scrollX: false,
      scrollY: true,
      disableMouse: true,
      disablePointer: true,
      disableTouch: false
    })
    const observer = new MutationObserver((mt, ob) => {
      this.iscroll.refresh()
    })
    const config = {
      childList: true,
      subtree: true,
      attributeFilter: ['height', 'offsetHeight']
    }
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    // 提供一个监听方法给用到iscroll的组件拿到滚动距离
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    // 提供一个滚动偏移位给外界用到iscroll的组件
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped lang="scss">
#wrapper{
  width: 100%;
  height: 100%;
}
</style>
