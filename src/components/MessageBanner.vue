<template>
  <div class="status-area" :class="errorClass + cssClass">{{status.message}}</div>
</template>
<script>

export default {
  name: 'MessageBanner',
  props: ['showForSecs'],
  data () {
    return {
      messages: [],
      status: {
        message: '',
        error: false
      },
      cssClass: 'nothere'
    }
  },
  created () {
    this.eventbus.$on('message.popup', this.addMessage)
  },
  computed: {
    errorClass () {
      return this.status.error ? 'error ' : ''
    }
  },
  watch: {
    status: {
      handler () {
        console.log('trigger')
        this.setHide()
      },
      immediate: false,
      deep: true
    }
  },
  methods: {
    clearMessage () {
      setTimeout(() => {
        this.status.message = ''
        this.status.error = false
        if (this.messages.length > 0) {
          const message = this.messages.shift()
          this.status.error = message.error
          this.status.message = message.message
        }
      }, 500)
    },
    addMessage (msgObject) {
      if (this.status.message !== '') {
        this.messages.push(msgObject)
      } else {
        this.status.message = msgObject.message
        this.status.error = msgObject.error
      }
    },
    setHide () {
      if (this.status.message && this.status.message.length > 0) {
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
