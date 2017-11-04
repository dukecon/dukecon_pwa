<template>
  <div id="layout" class="content" :class="{active: menuVisible}">
    <filter-events @menuVisible="onMenuVisibleChange"></filter-events>
    <talks-grid></talks-grid>
  </div>
</template>

<script>
  import FilterEvents from './schedule/FilterEvents.vue'
  import TalksGrid from './schedule/TalksGrid.vue'

  export default {
    components: {
      TalksGrid,
      FilterEvents
    },
    name: 'schedule',
    data () {
      return {
        menuVisible: false
      }
    },
    methods: {
      onMenuVisibleChange (newValue) {
        this.menuVisible = newValue
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
