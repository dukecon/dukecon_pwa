<template>
  <div id="layout" class="content" :class="{active: menuVisible}">
    <filter-events @menuVisible="onMenuVisibleChange"></filter-events>
    <talks-grid></talks-grid>
  </div>
</template>

<script>
  import Conference from '../Conference'
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
        events: Conference.getAllEvents(),
        eventsByDay: Conference.getEventsByDay(),
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
