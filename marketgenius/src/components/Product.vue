<template>
<div>

        {{ product.product_name }}
        <v-btn @click="addToCart();">+</v-btn>
        <v-btn @click="deleteToCart()">-</v-btn>
        {{item.quantity}}
        <v-btn color="primary"> Status </v-btn>

</div>

</template>

<script>
export default {
  props: ['product'],
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
      this.addedToCart = true
    },
    deleteToCart (event) {
      this.$emit('deleteItem', this.item)
      this.addedToCart = false
    }
  },
  computed: {
  }
}
</script>

<style>

</style>
