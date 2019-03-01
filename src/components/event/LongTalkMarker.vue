<template>
  <div class="marker-box alternate" v-if="event.durationInMinutes > thresholdInMinutes">
    <div class="starts-before" :style="visibilityStart">^</div>
    <div class="is-long">*</div>
    <div class="ends-after" :style="visibilityEnd">v</div>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: ['event', 'thresholdInMinutes'],
  name: 'long-talk-marker',
  computed: {
    visibilityStart () {
      if (this.event.start === this.event.startOfSlice) {
        return 'visibility: hidden'
      } else {
        return ''
      }
    },
    visibilityEnd () {
      if (this.event.end <= this.event.endOfSlice) {
        return 'visibility: hidden'
      } else {
        return ''
      }
    }
  }
}

</script>
<style lang="less" scoped>
  .marker-box {
    display: none;
  }
  .speaker-talks .long .marker-box {
    display: none;
  }
  .long .marker-box {
    left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 35px;
    bottom: 10px;
  }
</style>
