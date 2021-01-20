<template>
  <div>
    <v-container>

          <v-col cols="12">
            <v-sheet
              rounded="lg"
              class="pa-7 mx-auto"
              width="500"
            >
                <h1 class=" mx-3 font-weight-bold mb-3 grey--text text--darken-3">Ticket n°{{ ticket.id }}</h1>
                <h2 class=" mx-3 font-weight-medium mb-5 grey--text">Créé le {{ ticket.created_at.substring(0,10) }}</h2>

              <v-list color="transparent">
                <v-list-item
                  v-for="product in ticket.products"
                  :key="product.id"
                  three-line
                >
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold grey--text text--darken-3">{{ product.product_name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      Quantité : {{ product.quantity }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      Prix du lot : {{ (product.quantity * product.product_price).toFixed(2) }} €
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item

                >
                  <v-list-item-content>
                    <v-list-item-title
                    class="font-weight-bold grey--text text--darken-3"
                    >
                    Total : {{ ticket.total_price }} €
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
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
      ticket: ''
    }
  },
  created () {
    axios.get(`http://localhost:8000/market/tickets/${this.$route.query.ticketID}/`)
      .then(response => {
        this.ticket = response.data
      })
  }
}
</script>

<style>

</style>
