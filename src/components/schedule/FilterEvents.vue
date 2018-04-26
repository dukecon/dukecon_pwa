<template>
  <div v-if="Object.keys(events).length > 0">
    <a href="#menu" id="menuLink" class="menu-link" @click.prevent="toggleMenu" :class="{active: menuVisible}">
      <!-- Hamburger icon -->
      <span class="stretch">&nbsp;
            <span class="badge highlightBack"
                  v-if="totalFilterCount > 0 && filtersActive">{{ totalFilterCount }}</span>
            <span class="badge favorites highlightBack" v-if="onlyFavourites">&thinsp;</span>
        </span>
    </a>

    <div id="menu" :class="{active: menuVisible}">
      <div class="pure-menu custom-restricted-width" id="nav">
        <div class="filter-settings">
                <span class="filter-category darkBack reverse"><span>{{ $t('filterOptions') }}</span>
                    <button @click="resetFilters">{{ $t('reset') }}</button></span>
          <div class="filter-values">
            <div>
              <input type="checkbox" id="active" v-model="filtersActive"/>
              <label for="active">{{ $t('active') }}</label>
            </div>
            <div>
              <input type="checkbox" id="favs" v-model="onlyFavourites"/>
              <label for="favs">{{ $t('toggleFavorites') }}</label>
            </div>
          </div>
        </div>
        <div class="filter-box">
          <!-- HACK: make saveActiveFilters part of the view to trigger save on every change -->
          {{ saveActiveFilters }}
          {{ publishFilterSettings }}
          <!-- END OF HACK -->
          <div v-for="filter in filters" v-bind:key="filter.filterKey">
            <div :class="{ collapsed: filterStatus[filter.filterKey].open === false} " v-if="filter.visible">
                        <span class="filter-category darkBack reverse" @click="toggleCategory(filter)">
                            <span>{{filter.title}}</span>
                            <img class="filter-button" src="../../assets/img/group_expanded_16.svg" alt="+ -"/>
                            <span class="badge highlightBack"
                                  v-if="filter.selectedFilterCount > 0">{{ filter.selectedFilterCount }} </span>
                        </span>
              <div class="filter-values">
                <div v-for="filterValue in filter.filterValues" :key="filterValue.id">
                  <input :id="filter.filterKey + '-' + filterValue.id" type="checkbox"
                         v-model="filterStatus[filter.filterKey].values[filterValue.id]"/>
                  <label :for="filter.filterKey + '-' + filterValue.id">{{ filterValue.name }}</label>
                </div>
              </div>
            </div>
          </div>
          <div id="filter-veil">&nbsp;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Settings from '../../Settings'
import Conference from '../../Conference'
import Vue from 'vue'

const filterActiveKey = 'dukeconfilters_active'
const favsActive = 'dukeconfavs_active'
const filterActivePrefix = 'dukeconfilters_'

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

const filterKeys = ['level', 'language', 'track', 'location']

export default {
  name: 'filter-events',
  data () {
    let filterStatus = {}
    filterKeys.forEach(k => {
      filterStatus[k] = {open: false, values: {}}
      Settings.getSetting(filterActivePrefix + k, []).forEach(v => {
        filterStatus[k].values[v] = true
      })
    })
    return {
      events: Conference.getAllEvents(),
      filtersActive: Settings.getSetting(filterActiveKey, true),
      onlyFavourites: Settings.getSetting(favsActive, false),
      languages: Conference.getAllLanguages(),
      tracks: Conference.getAllTracks(),
      locations: Conference.getAllLocations(),
      audiences: Conference.getAllAudiences(),
      filterStatus: filterStatus,
      menuVisible: false
    }
  },
  computed: {
    filters: function () {
      let filters = [
        {
          filterKey: 'level'
        },
        {
          filterKey: 'language'
        },
        {
          filterKey: 'track'
        },
        {
          filterKey: 'location'
        }
      ]
      filters[0].filterValues = Object.values(this.audiences)
        .sort(sortByOrder)
        .map(
          (l) => {
            if (this.filterStatus['level'].values[l.id] === undefined) {
              Vue.set(this.filterStatus['level'].values, l.id, false)
            }
            return {
              'id': l.id,
              'name': l.names[this.$i18n.locale]
            }
          }
        )
      filters[1].filterValues = Object.values(this.languages)
        .sort(sortByOrder)
        .map(
          (l) => {
            if (this.filterStatus['language'].values[l.id] === undefined) {
              Vue.set(this.filterStatus['language'].values, l.id, false)
            }
            return {
              'id': l.id,
              'name': l.names[this.$i18n.locale]
            }
          }
        )
      filters[2].filterValues = Object.values(this.tracks)
        .sort(sortByOrder)
        .map(
          (l) => {
            if (this.filterStatus['track'].values[l.id] === undefined) {
              Vue.set(this.filterStatus['track'].values, l.id, false)
            }
            return {
              'id': l.id,
              'name': l.names[this.$i18n.locale]
            }
          }
        )
      filters[3].filterValues = Object.values(this.locations)
        .sort(sortByOrder)
        .map(
          (l) => {
            if (this.filterStatus['location'].values[l.id] === undefined) {
              Vue.set(this.filterStatus['location'].values, l.id, false)
            }
            return {
              'id': l.id,
              'name': l.names[this.$i18n.locale]
            }
          }
        )
      filters.forEach(e => {
        // fetch the translation of the filter group
        e.title = this.$t(e.filterKey)
        // count the set filters in the current group
        e.selectedFilterCount = Object.values(this.filterStatus[e.filterKey].values).filter(v => v === true).length
        if (e.filterValues.length <= 1) {
          e.visible = false
        } else {
          e.visible = true
        }
      })
      return filters
    },
    saveActiveFilters: function () {
      // save each filter group
      // HACK: this only works if saveActiveFilters is part of the view as it would otherwise not trigger
      filterKeys.forEach(k => {
        Settings.saveSetting(filterActivePrefix + k, Object.entries(this.filterStatus[k].values).filter(a => a[1] === true).map(a => a[0]))
      })
      // return dummy value
      return null
    },
    publishFilterSettings: function () {
      // publish current filter settings. Will emit 'null' if filters are not active
      // HACK: this only works if saveActiveFilters is part of the view as it would otherwise not trigger.
      this.publishCurrentStatus()
      // return dummy value
      return null
    },
    totalFilterCount: function () {
      // return the total count
      return Object.values(this.filters).map(f => f.selectedFilterCount).reduce((a, b) => a + b)
    }
  },
  watch: {
    filtersActive: function (newSetting) {
      Settings.saveSetting(filterActiveKey, newSetting)
    },
    onlyFavourites: function (newSetting) {
      Settings.saveSetting(favsActive, newSetting)
    },
    menuVisible: function (newValue) {
      this.$emit('menuVisible', newValue)
    }
  },
  created () {
    /* use this event in other components to reset the filter. This is used for example if a component
     * finds out that no results are shown any more due to the filters. */
    this.eventbus.$on('filter.reset', this.resetFilters)

    /* use this event in other components to deactivate the filter. This is used for example if a component
     * finds out that no results are shown any more due to the filters. */
    this.eventbus.$on('filter.deactivate', this.deactivateFilters)

    /* use this event in other components to ask the current status to be published. This might be handy
     * whenever a new component is initialized and wants to have the up-to-date status. */
    this.eventbus.$on('filter.init', this.publishCurrentStatus)

    /* catches this event to deactivate the filter, if the search term is 3 or more characters long */
    this.eventbus.$on('search.term', this.searchEventReceived)
  },
  beforeDestroy: function () {
    this.eventbus.$off('filter.reset', this.resetFilters)
    this.eventbus.$off('filter.deactivate', this.deactivateFilters)
    this.eventbus.$off('filter.init', this.publishCurrentStatus)
    this.eventbus.$off('search.term', this.searchEventReceived)
  },
  methods: {
    toggleCategory: function (filter) {
      this.filterStatus[filter.filterKey].open = !this.filterStatus[filter.filterKey].open
    },
    toggleMenu: function () {
      this.menuVisible = !this.menuVisible
    },
    resetFilters: function () {
      this.filtersActive = true
      this.onlyFavourites = false
      filterKeys.forEach(k => {
        this.filterStatus[k].values = {}
      })
      this.eventbus.$emit('search.reset')
    },
    deactivateFilters: function () {
      this.filtersActive = false
    },
    searchEventReceived: function (term) {
      if (term.length >= 3) {
        this.filtersActive = false
      } else {
        this.filtersActive = true
      }
    },
    publishCurrentStatus: function () {
      let filter = null
      if (this.filtersActive) {
        // fill contents only if filters are active
        filter = {
          onlyFavourites: this.onlyFavourites,
          categories: {}
        }
        filterKeys.forEach(entry => {
          filter.categories[entry] = {}
          Object.keys(this.filterStatus[entry].values).forEach((k) => {
            // PARANOIA:
            // * ensure that we touch all entries so that we listen correctly for all changes
            // * deep copy by value to create an immutable object
            if (this.filterStatus[entry].values[k] === true) {
              filter.categories[entry][k] = this.filterStatus[entry].values[k]
            }
          })
        })
      }
      this.eventbus.$emit('filter.status', filter)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
