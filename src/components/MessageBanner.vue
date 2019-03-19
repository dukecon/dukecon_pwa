<template>
  <div class="status-area" :class="errorClass + cssClass">{{message}}</div>
</template>
<script>
export default {
  name: 'MessageBanner',
  props: ['message', 'showForSecs', 'isError'],
  data () {
    return {
      errorClass: this.isError ? 'error ' : '',
      cssClass: 'here'
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
        this.isError = false
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
  .status-area {
    background: #ddffdd;
    color: #00d900;
    position: fixed;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    left: 20px;
    right: 20px;
    bottom: 50px;
    transition: bottom ease-in 0.5s;
    &.error {
      background: #ffdddd;
      color: #d90000;
    }
    &.here {
      bottom: 50px;
    }
    &.nothere {
      bottom: -50px;
    }
  }
</style>
