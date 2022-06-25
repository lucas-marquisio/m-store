<template>
  <div class="product">
    <div class="img">
      <img :src="image" alt="" />
    </div>
    <div class="info-product">
      <div class="name-and-about">
        <h3>{{ nameProduct }}</h3>
        <p>{{ about }}</p>
      </div>
      <div class="price">
        <div class="total-price">
          <span v-if="offer > 0" class="percentOffert">{{offer}} % Oferta</span>
          <span :class="offerProduct">R$ {{price.toFixed(2)}}</span>
          <div class="price-offer" v-if="offer > 0">R$ {{ ( price - (price * offer / 100) ).toFixed(2)}}</div>
        </div>
      </div>
      <div class="buttons">
        <div class="quantity-product">
          <button 
          @click="changeQuantityProduct(sum = false)"
          v-if="totalProduct != 1" >-</button>
          <span>{{ totalProduct }}</span>
          <button @click="changeQuantityProduct()">+</button>
        </div>
        <button @click="addToCart">Adicionar ao Carrinho</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "Product",
  props: {
    image: String,
    nameProduct: String,
    about: String,
    price: Number,
    offer: Number,
    idProduct: String
  },
  data: () => ({
    offerProduct: '',
    totalProduct: 1
  }),
  methods: {
    ...mapMutations(['setProductInCart']),
    changeQuantityProduct(sum = true){
      if(sum) return this.totalProduct ++
      if(this.totalProduct > 1) return this.totalProduct --
    },
    addToCart(){
      const productAddCart = {
        id: this.idProduct,
        img: this.image,
        name: this.nameProduct,
        about: this.about,
        quantity: this.totalProduct,
        totalPrice: this.offer > 0 ? parseFloat((this.price - ((this.price * this.offer) / 100)) * this.totalProduct).toFixed(2) : parseFloat(this.price * this.totalProduct).toFixed(2)
      }
      this.setProductInCart(productAddCart)
    }
  },
  created(){
    if(this.offer > 0) this.offerProduct = 'offer'
  }
};
</script>

<style>
.product {
  width: 300px;
  max-width: 100%;
  min-height: 350px;
  background: #b19aff53;
  display: flex;
  justify-content: center;
  color: #fff;

  flex-wrap: wrap;
  padding: 12px 5px;
  gap: 20px;
  border-radius: 4px;
  box-shadow: 5px 5px 15px 1px #7159c155;
}
.product .img {
  min-width: 150px;
  width: 100%;
  max-width: 100%;
  height: 150px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.product .img img {
  border-radius: 8px;
  max-height: 150px;
  max-width: 150px;
  background-size: cover;
  align-self: center;
}

.info-product {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  width: 400px;
  max-width: 100%;
  text-align: center;
}
.percentOffert {
  margin-right: 10px;
}
.offer{
  text-decoration: line-through;
  font-size: 12px;
}
.price {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
.price-offer {
  font-size: 18px;
  font-weight: bold;
}
span {
  font-style: 18px;
}

.buttons {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 10px;
}
.buttons button {
  padding: 6px;
  background: #7159c1;
  color: #D8DEE9;
  border: none;
  border-radius: 4px;
  font-weight: bolder;
  cursor: pointer;
  transition: .4s;
}

.buttons button:hover {
  opacity: .8;
}

.quantity-product {
  display: flex;
  align-items: center;
  gap: 4px;
}


@media (max-width: 690px) {
  .product {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    
  }
  .product .buttons {
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
}
</style>