<template>
  <v-app-bar
      app
      color="white"
      flat
    >

        <v-tabs
        centered
        class="ml-n9"
        color="teal accent-4"
        >
            <v-tab
            to="/"
            class="font-weight-bold"
            >
            Magasin
            </v-tab>

            <v-tab
            to="/tickets"
            class="font-weight-bold"
            >
            Tickets
            </v-tab>
        </v-tabs>

        <v-spacer></v-spacer>

    </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      links: [
        'Magasin',
        'Tickets'
      ]
    }
  }
}
</script>

<style>

</style>
