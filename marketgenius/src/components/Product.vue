<template>
<div>

        {{ product.product_name }}
        <v-btn @click="increaseQuantity()">+</v-btn>
        <v-btn @click="decreaseQuantity()">-</v-btn>
        {{item.quantity}}
        <v-btn :color="cardColor"> Status </v-btn>
        <v-btn @click="resetQuantity()">Delete</v-btn>
        <v-btn @click="onClickButton()">Ajouter au panier</v-btn>

</div>

</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      item: {
        name: this.product.product_name,
        quantity: 0,
        price: this.product.product_price
      }
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
    onClickButton (event) {
      if (this.item.quantity > 0) {
        this.$emit('clicked', this.item)
      }
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
