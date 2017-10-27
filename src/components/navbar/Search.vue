<template>
  <div v-if="visible === true" id="search-area">
    <input class="quicksearch" v-model="term" type="search" :placeholder="$t('search')">
    <img src="../../assets/img/search.png">
  </div>
</template>

<script language="">
  export default {
    name: 'search',
    data () {
      return {
        term: '',
        visible: false
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.query['search']) {
          this.term = to.query['search']
        }
      },
      term: function (newValue) {
        this.eventbus.$emit('search.term', newValue)
      }
    },
    created () {
      this.eventbus.$on('search.reset', this.resetSearchTerm)
      this.eventbus.$on('search.visible', this.setVisible)
      this.eventbus.$on('search.init', this.publishCurrentStatus)
      if (this.$route.query['search']) {
        this.term = this.$route.query['search']
      }
    },
    beforeDestroy: function () {
      this.eventbus.$off('search.reset', this.resetSearchTerm)
      this.eventbus.$off('search.visible', this.setVisible)
      this.eventbus.$off('search.init', this.publishCurrentStatus)
    },
    methods: {
      resetSearchTerm: function () {
        this.term = ''
      },
      setVisible: function (visible) {
        this.visible = visible
      },
      publishCurrentStatus: function () {
        this.eventbus.$emit('search.term', this.term)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
