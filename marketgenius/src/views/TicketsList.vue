<template>
  <div>
    <v-container>

          <v-col cols="12">
            <v-sheet
              rounded="lg"
              class="pa-7 mx-auto"
            >
                <h1 class=" mx-3 font-weight-bold mb-6 grey--text text--darken-3">Tous les tickets</h1>

                <v-data-table
                  :headers="headers"
                  :items="tickets"
                  :items-per-page="15"
                  class="elevation-1"
                  fixed-header
                  height="500"
                >
                <template v-slot:item.created_at="{ item }">
                 {{ item.created_at.substring(0,10) }}
                </template>
                <template v-slot:item.total_price="{ item }">
                 {{ item.total_price}} €
                </template>
                <template v-slot:item.id="{ item }">
                 <v-btn
                 @click="showTicket(item.id)"
                 small
                 rounded
                 >
                 {{ item.id }}
                 </v-btn>
                </template>

                </v-data-table>

            </v-sheet>
          </v-col>
      </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      tickets: [],
      headers: [
        { text: 'Ticket n°', value: 'id' },
        { text: 'Créé le', value: 'created_at' },
        { text: 'Prix total', value: 'total_price' }
      ]
    }
  },
  created () {
    axios.get('http://localhost:8000/market/tickets/')
      .then(response => {
        this.tickets = response.data
      })
  },
  methods: {
    showTicket (id) {
      this.$router.push({ path: 'ticket', query: { ticketID: id } })
    }
  }
}
</script>

<style>

</style>
