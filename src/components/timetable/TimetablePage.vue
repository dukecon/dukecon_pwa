<template>
  <div id="timetable" class="content">
    <!-- use this for testing -->
    <!-- <span @click="draw">redraw</span> -->
    <div id="content">
      <div id="nothingtoshow" class="alternate" v-if="false">
        <!-- TODO allow filtering for timetable -->
        <span data-bind="resource: 'notalksfound'"></span>
        <a class="clickable" data-bind="click: deactivateFilters, resource: 'deactivate'"></a> <span
        data-bind="resource: 'or'"></span>
        <a class="clickable" data-bind="click: resetFilters, resource: 'reset'"></a><span>!</span><br>
        <span data-bind="resource: 'disablefavorites'"></span>
      </div>

      <div id="talks-schedule">
        <div class="timeline-menu">
          <input @click="zoom(-0.2)" type="button" id="zoomIn" value="+"/>
          <input @click="zoom(+0.2)" type="button" id="zoomOut" value="-"/>
          <input @click="move(-2)" type="button" id="moveLeft" value="&lt;"/>
          <input @click="move(2)" type="button" id="moveRight" value="&gt;"/>
          <input @click="reset" type="button" id="reset" value="o"/>
        </div>
        <div id="visualization">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Conference from '../../Conference'
  import TimetableItem from './TimetableItem'
  import Vis from 'vis'
  import Moment from 'moment'
  import Vue from 'vue'

  require('../../../node_modules/vis/dist/vis.css')

  const sortByOrder = function (o1, o2) {
    const l1 = o1.order
    const l2 = o2.order
    if (l1 === l2) {
      return 0
    } else if (l1 < l2) {
      return -1
    } else {
      return 1
    }
  }

  export default {
    components: {Event},
    name: 'timetable-page',
    data () {
      return {
        events: Conference.getAllEvents(),
        locations: Conference.getAllLocations(),
        conference: Conference.getConference(),
        visible: false,
        shownComponents: new Map(),
        timeline: null
      }
    },
    mounted: function () {
      this.draw()
    },
    watch: {
      'events': function () {
        // ensure that the timetable is redrawn once the events have been loaded
        this.draw()
      }
    },
    computed: {},
    methods: {
      generateLocations: function (visGroup) {
        Object.values(this.locations).sort(sortByOrder).forEach(l => {
          visGroup.add({id: l.id, order: l.order, content: l.names[this.$i18n.locale]})
        })
      },
      minStartTime: function () {
        let startTime
        Object.values(this.events).forEach(e => {
          if (!startTime || e.start < startTime) {
            startTime = e.start
          }
        })
        return Moment(startTime).locale(this.$i18n.locale)
      },
      maxEndTime: function () {
        let endTime
        Object.values(this.events).forEach(e => {
          if (!endTime || e.end > endTime) {
            endTime = e.end
          }
        })
        return Moment(endTime)
      },
      getOptions: function () {
        let talkOptions = {
          locale: this.$i18n.locale,
          stack: false,
          min: this.minStartTime(),
          start: this.minStartTime(), // TODO
          end: this.minStartTime().add(4, 'hours'), // TODO
          max: this.maxEndTime(),
          moveable: true,
          zoomable: false,
          hiddenDates: {
            start: '2016-01-01T20:00:00',
            end: '2016-01-02T07:30:00',
            repeat: 'daily'
          },
          editable: false,
          dataAttributes: ['tooltip', 'id'],
          margin: {
            item: 5, // minimal margin between items
            axis: 5   // minimal margin between items and the axis
          },
          orientation: 'top'
        }
        return talkOptions
      },

      generateTableItems: function () {
        let tableItems = []
        Object.values(this.events).forEach(event => {
          let tableItem = {
            id: event.id,
            group: event.locationId,
            tooltip: event.title,
            content: '<aside id="ev-' + event.id + '"></aside>',
            start: event.start,
            end: event.end
          }
          tableItems.push(tableItem)
        })
        return tableItems
      },
      zoom: function (percentage) {
        let range = this.timeline.getWindow()
        let interval = range.end - range.start
        this.timeline.setWindow({
          start: range.start.valueOf() - interval * percentage,
          end: range.end.valueOf() + interval * percentage
        })
      },
      reset: function () {
        this.timeline.setWindow({
          start: this.timeline.options.start,
          end: this.timeline.options.end
        })
      },
      rebindVueTimetableItems: function () {
        let timeline = this.timeline
        let shownComponents = this.shownComponents
        let items = timeline.getVisibleItems()
        items.filter(id => !shownComponents.has(id)).forEach(id => {
          let e = this.events[id]
          let vm = new Vue({
            ...TimetableItem,
            propsData: {
              event: e,
              name: 'timetable-item'
            },
            parent: this
          }).$mount('#ev-' + e.id)
          shownComponents.set(id, vm)
        })
        // items will not be destroyed once they have been displayed - maybe only when data changes
        items.filter(id => !shownComponents.has(id)).forEach(id => {
          let vm = shownComponents.get(id)
          vm.$destroy()
          shownComponents.delete(id)
        })
        window.setTimeout(() => {
          // we bound the Vue components, the height of the elements changed
          // let's ask timeline to redraw - this will adjust the heights
          timeline.redraw()
        }, 0)
      },
      move: function (hours) {
        const range = this.timeline.getWindow()
        const newStart = Moment(range.start).add(hours, 'hours')
        const newEnd = Moment(range.end).add(hours, 'hours')
        this.timeline.setWindow({
          start: newStart,
          end: newEnd
        })
      },
      draw: function () {
        if (Object.keys(this.events).length === 0) {
          return
        }
        // remove previous components
        this.shownComponents.forEach((item, key, map) => {
          item.$destroy()
          map.delete(key)
        })
        // clear previous container
        const container = document.getElementById('visualization')
        container.innerHTML = ''

        // create timeline
        const groups = new Vis.DataSet()
        this.generateLocations(groups)
        const options = this.getOptions() // firstStart, lastEnd)
        this.timeline = new Vis.Timeline(container)
        const timeline = this.timeline
        timeline.setOptions(options)
        timeline.setGroups(groups)

        timeline.setItems(new Vis.DataSet(this.generateTableItems()))

        timeline.on('rangechange', this.rebindVueTimetableItems)

        window.setTimeout(() => {
          this.rebindVueTimetableItems()
        }, 0)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="true">
  div.talk-widget {
    width: 100%
  }
</style>
