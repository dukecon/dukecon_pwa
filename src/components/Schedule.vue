<template>
  <div id="layout" class="content" :class="{active: menuVisible}">
    <filter-events @menuVisible="onMenuVisibleChange"></filter-events>
    <talks-grid :day="day" @dayChanged="onDayChanged"></talks-grid>
  </div>
</template>

<script>
import FilterEvents from './schedule/FilterEvents.vue'
import TalksGrid from './schedule/TalksGrid.vue'
import Settings from '../Settings'

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
  computed: {
    day: function () {
      return Settings.getSetting('scheduleWithDay', this.$route.params.day)
    }
  },
  methods: {
    onMenuVisibleChange (newValue) {
      this.menuVisible = newValue
    },
    onDayChanged (day) {
      this.$router.push({ name: 'scheduleWithDay', params: { day: day } })
      Settings.saveSetting('scheduleWithDay', day)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
