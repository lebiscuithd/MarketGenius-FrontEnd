<template>
<div>

        {{ product.product_name }}
        <v-btn @click="increaseQuantity()">+</v-btn>
        <v-btn @click="decreaseQuantity()">-</v-btn>
        {{item.quantity}}
        <v-btn :color="cardColor"> Status </v-btn>
        <v-btn @click="resetQuantity()">Delete</v-btn>
        <v-btn v-if="addedToCart === false" @click="addToCart()">Ajouter au panier</v-btn>
        <v-btn v-else @click="deleteToCart()">Supprimer du panier</v-btn>

</div>

</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      item: {
        product_name: this.product.product_name,
        quantity: 0,
        product_price: this.product.product_price,
        product_id: this.product.id
      },
      addedToCart: false
    }
  },
  methods: {
    increaseQuantity () {
      this.item.quantity += 1
    },
    decreaseQuantity () {
      if (this.item.quantity > 0) {
        this.item.quantity -= 1
      }
    },
    resetQuantity () {
      this.item.quantity = 0
    },
    addToCart (event) {
      if (this.item.quantity > 0) {
        this.$emit('addItem', this.item)
        this.addedToCart = true
      }
    },
    deleteToCart (event) {
      this.$emit('deleteItem', this.item)
      this.addedToCart = false
    }
  },
  computed: {
    cardColor () {
      if (this.item.quantity > 0) {
        return 'primary'
      } else {
        return 'secondary'
      }
    }
  }
}
</script>

<style>

</style>
