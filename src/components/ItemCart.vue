<template>
  <div class="item">
    <div class="image">
      <img :src="image" alt="">
    </div>
    <div class="info">
      <h3>{{productName}}</h3>
      <p>{{about}}</p>
      <p >Quantidade: {{quantity}} uni</p>
      <div class="info-price-delete">
        <p>Total <strong>R$: {{totalPrice}}</strong></p>
        <button @click="deleteProduct(productId)">Deletar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'ItemCart',
  props: {
    image: String,
    productId: String,
    productName: String,
    quantity: Number,
    totalPrice: Number,
    about: String
  },
  methods: {
    ...mapGetters(['getTotalValueToPay', 'getProductsInCart']),
    ...mapMutations(['getProductsByFilter', 'setProductInCart', 'setTotalPriceToPay']),
    deleteProduct(id){
      const products = this.getProductsInCart()
      const productsUpdated = products.filter(product => product.id != id)
      this.setProductInCart(productsUpdated)
      this.setTotalPriceToPay(productsUpdated)
    }
  }
}
</script>

<style scoped>
.item {
  padding: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  border-bottom: 1px solid rgba(128, 128, 128, 0.672);
  color: #fff;
}
.item .image{
  width: 200px;
  max-width: 100%;
  align-items: center;
  justify-content: center;
}

.image img {
  width: 120px;
  border-radius: 4px;
}

.info {
  min-width: 250px;
  width: 350px;
  max-width: 100%;
}
.info button {
  border: none;
  background: #BF616A;
  padding: 2px 10px;
  border-radius: 4px;
  color: aliceblue;
  cursor: pointer;
  font-weight: bolder;
}

.info button:hover {
  opacity: 0.8;
}

@media (max-width: 620px) {
  .item {
    display: flex;
    flex-direction: column !important;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .image, .info {
    width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
  .info-price-delete {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
}
</style>
