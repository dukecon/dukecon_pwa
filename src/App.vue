<template>
  <div id="app">
    <header>
      <homeicon></homeicon>
      <language ></language>
      <login ></login>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <links ></links>
    </footer>
  </div>
</template>

<script>
  import Language from './components/navbar/Language.vue'
  import Login from './components/navbar/Login.vue'
  import Links from './components/footer/Links.vue'
  import Homeicon from './components/navbar/Homeicon.vue'

  export default {
    components: {
      Homeicon, Login, Language, Links},
    name: 'app'
  }
</script>

<style>
  body {
    margin: 0;
  }

  header a {
    color: white;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    text-align: center;
    margin-top: 40px;
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
  }

</style>
