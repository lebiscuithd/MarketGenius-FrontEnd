<template>

    <div>

        <v-card
        class="my-5 pb-4"
        width="200"
        :class="cardColor"
        rounded="lg"
        >
            <v-img
            height="150"
            :src="product.product_thumbnail"
            />

            <v-card-title>
                {{ product.product_name }}
            </v-card-title>

            <v-card-text>
                <div class="subtitle-1">
                    {{ product.product_price }} €
                </div>
            </v-card-text>

            <v-row class="float-right">

                <v-btn
                class="mx-2"
                fab
                dark
                small
                color="red lighten-1"
                v-if="isInCart"

                @click="deleteToCart()"
                >
                    <v-icon dark>
                        mdi-minus
                    </v-icon>
                </v-btn>

                <v-btn
                class="mx-2"
                fab
                dark
                small
                color="teal accent-4"
                @click="addToCart()"
                >
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>

            </v-row>

        </v-card>

    </div>

</template>

<script>
export default {
  props: ['product', 'cart'],
  data () {
    return {
      item: {
        product_name: this.product.product_name,
        quantity: 1,
        product_price: this.product.product_price,
        product_id: this.product.id
      },
      addedToCart: false
    }
  },
  methods: {
    addToCart (event) {
      this.$emit('addItem', this.item)
    },
    deleteToCart (event) {
      this.$emit('deleteItem', this.item)
    }
  },
  computed: {
    isInCart () {
      let findIndex = this.cart.findIndex(obj => obj.product_id === this.item.product_id)
      if (findIndex !== -1) {
        return true
      } else {
        return false
      }
    },
    cardColor () {
      if (this.isInCart) {
        return 'addedToCart'
      } else {
        return 'notInCart'
      }
    }
  }
}
</script>

<style>

.addedToCart {
    border-bottom: 4px solid #3cd1c2!important;
}

.notInCart {
    border-bottom: 4px solid transparent!important;
}

</style>
