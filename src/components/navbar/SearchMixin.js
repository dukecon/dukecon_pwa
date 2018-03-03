/* By default the search is hidden. When you add a component on the page that wants to use the search,
 * then add this as a mixin. It will use CSS to activate the search while the component is shown.
 *
 * WARNING: this assumes that it is called within a <keep-alive> tag, therefore it listens
 * at activated/deactivated lifecycle hooks.
 */
export default {
  data () {
    return {
      searchTerm: ''
    }
  },
  activated: function () {
    this.eventbus.$emit('search.reset')
    this.eventbus.$emit('search.visible', true)
  },
  deactivated: function () {
    this.eventbus.$emit('search.visible', false)
  },
  created () {
    this.eventbus.$on('search.term', this.searchEventReceived)
    this.eventbus.$emit('search.init')
  },
  beforeDestroy: function () {
    this.eventbus.$off('search.term', this.searchEventReceived)
  },
  methods: {
    searchEventReceived (term) {
      this.searchTerm = term
    }
  }
}
