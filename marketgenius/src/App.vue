<template>
  <v-app id="app">
    <Navbar/>
    <v-main class="grey lighten-3">
      <router-view/>
    </v-main>
  </v-app>
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
}
.v-application {
  font-family: 'Poppins', sans-serif;
}
</style>
