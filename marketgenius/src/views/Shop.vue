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
                class="mx-auto"
                />
              </v-row>
            </v-sheet>
          </v-col>
          <v-col cols="4">
            <v-sheet
            rounded="lg"
            min-height="70vh"
            >
              <v-list color="transparent">
                <v-list-item
                  v-for="cartItem in cart"
                  :key="cartItem.name"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title >
                      Product : {{ cartItem.product_name }}
                      <br>
                      Quantity : {{ cartItem.quantity }}
                      <br>
                      Price/u : {{ cartItem.product_price }}
                      <br>
                      Lot price : {{ (cartItem.quantity * cartItem.product_price).toFixed(2) }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title @click="createTicket()">
                      {{ totalQuantity }} products
                      <br>
                      Total : {{ totalPrice }} €
                      <br>
                      Create Ticket
                    </v-list-item-title>
                  </v-list-item-content>
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
          console.log(response)
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
