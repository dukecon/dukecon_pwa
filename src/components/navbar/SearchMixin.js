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
    /* this appends a new CSS to the header at the very end. This ensures that it gets the highest
       priority and it will override the standard hidden setting */
    console.log('activated called')
    let style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode('#search-area { display: inline-block; }'))
    this.styleNode = style.childNodes[0] // a reference I store in the data hash
    document.head.appendChild(style)
  },
  deactivated: function () {
    console.log('deactivated called')
    this.styleNode.remove()
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
