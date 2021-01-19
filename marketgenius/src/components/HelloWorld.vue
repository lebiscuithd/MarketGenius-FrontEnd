<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn
          class="font-weight-bold"
          v-for="link in links"
          :key="link"
          text
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!--  -->
              <p>hello</p>
              <Product @clicked="onClickChild" v-for="product in products" :key="product.id" :product="product"/>
            </v-sheet>
          </v-col>
          <v-col cols="4">
            <v-sheet
            rounded="lg"
            min-height="70vh"
            >
              <v-list color="transparent">
                <v-list-item
                  v-for="item in cart"
                  :key="item.name"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Create Ticket
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import Product from './Product.vue'

export default {
  name: 'HelloWorld',
  components: { Product },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates'
      ],
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
    onClickChild (item) {
      this.cart.push(item)
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
