<template>
  <div id="search-area">
    <input class="quicksearch" v-model="term" type="search" :placeholder="$t('search')">
    <img src="../../assets/img/search.png">
  </div>
</template>

<script language="">
  export default {
    name: 'search',
    data () {
      return {
        term: ''
      }
    },
    watch: {
      term: function (newValue) {
        this.eventbus.$emit('search.term', newValue)
      }
    },
    created () {
      this.eventbus.$on('search.reset', this.resetSearchTerm)
    },
    beforeDestroy: function () {
      this.eventbus.$off('search.reset', this.resetSearchTerm)
    },
    methods: {
      resetSearchTerm: function () {
        this.term = ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
