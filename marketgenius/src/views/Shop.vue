<template>
  <div>
      <v-container class="mt-10">
        <v-row>
          <v-col cols="8">
            <v-sheet
              min-height="70vh"
              rounded="lg"
              class="pa-7"
            >
            <h1 class="font-weight-bold ml-2 mb-5 grey--text text--darken-3">Produits</h1>
              <v-row>
                <Product
                @addItem="addToCart"
                @deleteItem="deleteToCart"
                v-for="product in products"
                :key="product.id"
                :product="product"
                :cart="cart"
                class="mx-auto mx-xl-3"
                />
              </v-row>
            </v-sheet>
          </v-col>
          <v-col cols="4">
            <v-sheet
            rounded="lg"
            min-height="70vh"
            class="pa-7"
            >

            <v-badge
            :value="totalQuantity"
            :content="totalQuantity"
            color="teal accent-4"
            overlap
          >
            <h1 class=" mx-3 font-weight-bold mb-5 grey--text text--darken-3">Panier</h1>
          </v-badge>

              <v-list color="transparent">
                <v-list-item
                  v-for="cartItem in cart"
                  :key="cartItem.name"
                  three-line
                >
                  <v-list-item-content>
                    <v-list-item-title
                    class="font-weight-bold grey--text text--darken-3"
                    >
                      {{ cartItem.product_name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Quantité : {{ cartItem.quantity }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      Prix du lot : {{ (cartItem.quantity * cartItem.product_price).toFixed(2) }} €
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  two-line
                >
                  <v-list-item-content v-if="totalQuantity > 0">
                    <v-list-item-subtitle>
                      {{ totalQuantity }} produits
                    </v-list-item-subtitle>
                    <v-list-item-title
                    class="font-weight-bold grey--text text--darken-3"
                    >
                      Total : {{ totalPrice }} €
                    </v-list-item-title>
                    <v-btn
                      color="teal accent-4"
                      class="mt-4 white--text col-8"
                      @click="createTicket()"
                    >
                      Créer le ticket
                      <v-icon
                        right
                        dark
                      >
                        mdi-receipt
                      </v-icon>
                    </v-btn>
                  </v-list-item-content>
                  <v-row v-else>
                    <v-icon x-large color="grey">
                      mdi-cart-remove
                    </v-icon>
                    <p class="grey--text my-auto ml-3">Votre panier est vide</p>
                  </v-row>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import Product from '../components/Product.vue'

export default {
  name: 'Shop',
  components: { Product },
  data () {
    return {
      products: [],
      cart: []
    }
  },
  created () {
    axios.get('http://localhost:8000/market/products/')
      .then(response => {
        this.products = response.data
      })
  },
  methods: {
    addToCart (item) {
      let findIndex = this.cart.findIndex(obj => obj.product_id === item.product_id)
      if (findIndex !== -1) {
        const number = this.cart[findIndex].quantity
        this.cart[findIndex].quantity = number + 1
      } else {
        this.cart.push(item)
      }
    },
    deleteToCart (item) {
      let findIndex = this.cart.findIndex(obj => obj.product_id === item.product_id)
      if (findIndex !== -1) {
        const number = this.cart[findIndex].quantity
        if (number > 1) {
          this.cart[findIndex].quantity = number - 1
        } else {
          this.cart = this.cart.filter(el => el.product_id !== item.product_id)
        }
      }
    },
    createTicket () {
      axios.post('http://localhost:8000/market/tickets/',
        {
          'total_price': this.totalPrice,
          'products': this.cart
        }
      )
        .then(response => {
          this.$router.push({ path: 'ticket', query: { ticketID: response.data.id } })
        })
    }
  },
  computed: {
    totalQuantity () {
      return this.cart.reduce(
        (total, item) => total + item.quantity,
        0
      )
    },
    totalPrice () {
      return this.cart.reduce(
        (total, item) => parseFloat((parseFloat(total) + item.quantity * item.product_price).toFixed(2)),
        0
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
