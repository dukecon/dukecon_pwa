<template>
  <div id="app">
    <div class="header">
      <h1 id="headertitle" class="darkBack reverse">
        <homeicon></homeicon>
        <div id="login-area" class="darkBack">
          <login></login>
        </div>
        <div id="mainmenu-items" class="darkBack">
          <talks></talks>
          <speakers></speakers>
          <language></language>
        </div>
      </h1>
    </div>
    <!-- this keep-alive allows ultra-fast switching between views, especially the speakers page -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <footer>
      <links></links>
    </footer>
  </div>
</template>

<script>
  import Language from './components/navbar/Language.vue'
  import Login from './components/navbar/Login.vue'
  import Links from './components/footer/Links.vue'
  import Homeicon from './components/navbar/Homeicon.vue'
  import Talks from './components/navbar/Talks.vue'
  import Speakers from './components/navbar/Speakers.vue'

  export default {
    components: {
      Speakers, Talks, Homeicon, Login, Language, Links
    },
    name: 'app'
  }
</script>

<style>
</style>
