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

      <!-- HACK: make calculateOptions and calculatedItems change  -->
      {{ calculateOptions }}
      {{ calculatedItems }}
      <!-- END OF HACK -->

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
  import Moment from 'moment'
  // use this one instead of 'vis' to have a smaller dependency
  // and avoid two instances of moment.js that would lead to not-changing date locale
  // to make this work, the babel-loader in the webpack.base.conf.js needs to include the vis files
  // as they will not be transpiled otherwise and would not work in phantomJS and Internet Explorer
  import Vis from '../../../node_modules/vis/index-timeline-graph2d'
  import Vue from 'vue'

  const hiddenDates = [
    // these don't normally need to change because of the "repeat", so leave it hard-coded
    // TODO: Vis hiddenDates only seem to work as long as the year matches the year of the conference
    {
      start: '2018-01-01T20:00:00',
      end: '2018-01-02T07:30:00',
      repeat: 'daily'
    }
  ]

  function getNewTimePoint (oldTime, hours) {
    let index, hiddenStart, hiddenEnd, hiddenSpan
    const oldMoment = Moment(oldTime)
    let newMoment = Moment(oldTime).add(hours, 'hours')
    for (index in hiddenDates) {
      hiddenStart = Moment(hiddenDates[index].start)
      hiddenEnd = Moment(hiddenDates[index].end)
      hiddenSpan = hiddenEnd.diff(hiddenStart, 'minutes')
      if (hours > 0 && (newMoment.hour() > hiddenStart.hour() || oldMoment.day() < newMoment.day())) {
        newMoment = newMoment.add(hiddenSpan, 'minutes')
        break
      }
      if (hours < 0 && (newMoment.hour() < hiddenEnd.hour() || oldMoment.day() > newMoment.day())) {
        newMoment = newMoment.subtract(hiddenSpan, 'minutes')
        break
      }
    }
    return newMoment
  }

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
      // add timeline, items, group and + shownComponents outside of watched elements
      // as they are updated by the computed elements
      this.timeline = null
      this.items = null
      this.groups = null
      this.shownComponents = new Map()
      return {
        events: Conference.getAllEvents(),
        locations: Conference.getAllLocations(),
        conference: Conference.getConference()
      }
    },
    mounted: function () {
      this.draw()
    },
    computed: {
      calculateOptions: function () {
        // always calculate options so Vue known when to re-calculate the options
        const options = this.getOptions()
        // but only set this to the timeline if it is already rendered
        if (this.timeline) {
          this.timeline.setOptions(options)
          // we need to rebind the Vue components as otherwise the click events will not work
          this.timeline.redraw()
          window.setTimeout(() => {
            this.rebindVueTimetableItems(true)
          }, 0)
        }
      },
      calculatedItems: function () {
        // always calculate locations and items so Vue known when to re-calculate the options
        const locations = this.generateLocations()
        const items = this.generateTableItems()
        // but only set this to the timeline if it is already rendered
        if (this.timeline) {
          locations.forEach(e => {
            if (this.groups.get(e.id)) {
              this.groups.update(e)
            } else {
              this.groups.add(e)
            }
          })
          this.groups.getIds().filter(id => this.locations[id] === undefined).forEach(id => this.groups.remove(id))

          items.forEach(e => {
            if (this.items.get(e.id)) {
              this.items.update(e)
            } else {
              this.items.add(e)
            }
          })
          this.items.getIds().filter(id => this.events[id] === undefined).forEach(id => this.items.remove(id))
          // we need to rebind the Vue components as otherwise the click events will not work
          window.setTimeout(() => {
            this.timeline.redraw()
            window.setTimeout(() => {
              this.rebindVueTimetableItems(true)
            }, 0)
          }, 0)
        }
      }
    },
    methods: {
      generateLocations: function () {
        let locations = []
        Object.values(this.locations).sort(sortByOrder).forEach(l => {
          locations.push({id: l.id, order: l.order, content: l.names[this.$i18n.locale]})
        })
        return locations
      },
      minStartTime: function () {
        let startTime
        Object.values(this.events).forEach(e => {
          if (!startTime || e.start < startTime) {
            startTime = e.start
          }
        })
        if (!startTime) {
          startTime = '2017-01-01T08:00:00'
        }
        return Moment(startTime).locale(this.$i18n.locale)
      },
      maxEndTime: function () {
        let endTime
        Object.values(this.events).forEach(e => {
          if (!endTime || e.end > endTime) {
            endTime = e.end
          }
        })
        if (!endTime) {
          endTime = '2017-01-02T20:00:00'
        }
        return Moment(endTime)
      },
      getOptions: function () {
        return {
          locale: this.$i18n.locale,
          stack: false,
          min: this.minStartTime(),
          start: this.minStartTime(), // TODO
          end: this.minStartTime().add(4, 'hours'), // TODO
          max: this.maxEndTime(),
          moveable: true,
          zoomable: false,
          hiddenDates: hiddenDates,
          editable: false,
          dataAttributes: ['tooltip', 'id'],
          margin: {
            item: 5, // minimal margin between items
            axis: 5   // minimal margin between items and the axis
          },
          orientation: 'top'
        }
      },
      generateTableItems: function () {
        let tableItems = []
        Object.values(this.events).forEach(event => {
          if (event !== undefined) {
            tableItems.push({
              id: event.id,
              group: event.locationId,
              tooltip: event.title,
              content: '<aside id="ev-' + event.id + '"></aside>',
              start: event.start,
              end: event.end
            })
          }
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
      rebindVueTimetableItems: function (clear) {
        let timeline = this.timeline
        let items = timeline.getVisibleItems()
        let shownComponents = this.shownComponents
        if (clear === true) {
          shownComponents.forEach((item, key, map) => {
            item.$destroy()
            map.delete(key)
          })
        }
        let boundComponents = false
        items.filter(id => !shownComponents.has(id)).forEach(id => {
          if (document.getElementById('ev-' + id) !== null) {
            let e = this.events[id]
            let vm = new Vue({
              ...TimetableItem,
              propsData: {
                event: e,
                name: 'timetable-item'
              },
              parent: this
            }).$mount('#ev-' + e.id)
            boundComponents = true
            shownComponents.set(id, vm)
          }
        })
        if (boundComponents) {
          window.setTimeout(() => {
            // we bound the Vue components, the height of the elements changed
            // let's ask timeline to redraw - this will adjust the heights
            timeline.redraw()
          }, 0)
        }
      },
      move: function (hours) {
        const range = this.timeline.getWindow()
        const newStart = getNewTimePoint(range.start, hours)
        const newEnd = getNewTimePoint(range.end, hours)
        this.timeline.setWindow({
          start: newStart,
          end: newEnd
        })
      },
      draw: function () {
        // clear previous container
        const container = document.getElementById('visualization')
        container.innerHTML = ''

        // create timeline
        this.timeline = new Vis.Timeline(container)
        const timeline = this.timeline
        timeline.setOptions(this.getOptions())
        this.groups = new Vis.DataSet(this.generateLocations())
        timeline.setGroups(this.groups)
        this.items = new Vis.DataSet(this.generateTableItems())
        timeline.setItems(this.items)

        // once the range changes and more items become visible we need to re-bind the missing elements
        // no parameter 'true' here as this would otherwise slow down the rendering and is not necessary
        timeline.on('changed', this.rebindVueTimetableItems)
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
