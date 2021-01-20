<template>
  <div id="app">
    <Navbar class="navbar"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: { Navbar },
  name: 'App'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.v-application .navbar {
  font-family: 'Poppins', sans-serif;
}
</style>
