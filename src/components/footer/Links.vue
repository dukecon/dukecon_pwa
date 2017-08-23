<template>
  <div class="footer hidden">
    <a v-if='links.imprint' target="_blank" :href="links.imprint">Imprint</a>
    <a v-if='links.privacy' target="_blank" :href="links.privacy">Privacy</a>
    <a v-if='links.termsOfUse' target="_blank" :href="links.termsOfUse">Terms of Use</a>
    <span id="poweredByDukecon">powered by<a href="http://www.dukecon.org" target="_blank">DukeCon</a></span>
  </div>
</template>

<script language="">
  import Conference from '../../Conference'

  export default {
    name: 'links',
    data () {
      return {
        links: null
      }
    },
    created () {
      this.links = Conference.getLinks()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .footer {
    background: white;
    bottom: 0;
    font-size: smaller;
    padding: 0.5em;
    margin: 0;
    position: fixed;
    text-align: center;
    min-height: 1em;
    width: 100%;
    z-index: 1005; /* side-menu has 1000 */
    box-shadow: 0 0 4px -2px #000000;
  }

  .footer #poweredByDukecon {
    position: absolute;
    right: 1em;
    padding: 0.2em 1em 0 0;
    font-size: smaller;
  }

</style>
