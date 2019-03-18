<template>
  <div class="error-area" :class="cssClass">{{message}}</div>
</template>
<script>
export default {
  name: 'ErrorMessage',
  props: ['message', 'showForSecs'],
  data () {
    return {
      cssClass: 'nothere'
    }
  },
  mounted () {
    this.setHide()
  },
  watch: {
    message () {
      console.log('trigger')
      this.setHide()
    }
  },
  methods: {
    clearMessage () {
      setTimeout(() => {
        this.message = ''
      }, 500)
    },
    setHide () {
      if (this.message && this.message.length > 0) {
        this.cssClass = 'here'
        setTimeout(() => {
          this.cssClass = 'nothere'
          this.clearMessage()
        }, this.showForSecs * 1000)
      }
    }
  }
}
</script>
<style scoped lang="less">
  .error-area {
    position: fixed;
    background: #ffdddd;
    color: #d90000;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    left: 20px;
    right: 20px;
    bottom: 50px;
    transition: bottom ease-in 0.5s;
    &.here {
      bottom: 50px;
    }
    &.nothere {
      bottom: -50px;
    }
  }
</style>
