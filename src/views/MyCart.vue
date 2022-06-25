<template>
  <div class="car">
    <HeaderBar />
    <div class="itens-cart" v-if="cart.length > 0">
      <ItemCart 
        v-for="product in cart"
        v-bind:key="product.id"
        :image="product.img"
        :productId="product.id"
        :productName="product.name"
        :quantity="product.quantity"
        :totalPrice="product.totalPrice"
        :about="product.about"
      />
      <div class="total-to-pay">
        <span>Total a pagar <strong>R$: {{totalToPay}}</strong></span>
      </div>
    </div>
    <div class="no-products-in-cart" v-if="cart.length == 0">
      <h3>
        {{ 
          user.name 
          ? 
          "Parece que você não tem itens no seu carrinho 🙇"
          :
          "Você precisa estar logado para ver seu carrinho!"
        }}
      </h3>
      <router-link to="/" v-if="user.name">Voltar a lista de produtos.</router-link>
      <router-link to="/login" v-if="!user.name">Ir para tela de login</router-link>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
import ItemCart from '@/components/ItemCart.vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Cart',
  computed: mapState(['cart', 'totalToPay', 'user']),
  components: {
    HeaderBar,
    ItemCart
  },
  methods: {
    ...mapMutations(['setTotalPriceToPay']),
    ...mapGetters(['getProductsInCart']),
  },
  data: () => ({
  
  }),
  mounted(){
    const products = this.getProductsInCart()
    this.setTotalPriceToPay(products)
  }
}
</script>

<style>
.cart{
    width: 100%;
}
.itens-cart {
  width: 1250px;
  max-width: 90%;
  
  margin: 0 auto;
}
  .no-products-in-cart {
    text-align: center;
    width: 90%;
    max-width: 1250px;
    margin: 0 auto;
    padding: 20px;
    background: #dbe1ec;
    border-radius: 4px;
  }
  .no-products-in-cart a {
    color: #2E3440;
  }
  .no-products-in-cart a:hover {
    color: #4C566A;
  }
  .total-to-pay{
    color: #fff;
  }
</style>