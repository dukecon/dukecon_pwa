<template>
  <div v-if="visible === true" id="search-area">
    <input class="quicksearch" v-model="term" type="search" :placeholder="$t('search')">
    <img src="../../assets/img/search.svg">
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
        this.updateQueryParam(newValue)
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
      },
      updateQueryParam: function (term) {
        // only update the route if it needs to be updated
        if (term !== this.$route.query['search']) {
          // clone the existing query and replace the current term
          let newQuery = Object.assign({}, this.$route.query)
          if (term && term !== '') {
            newQuery['search'] = term
          } else {
            delete newQuery['search']
          }
          this.$router.replace({path: this.$route.path, query: newQuery})
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
