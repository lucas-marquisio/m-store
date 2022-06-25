<template>
  <div class="home">
    <div class="header-fixed">
      <HeaderBar />
    <div class="filter">
      <select v-model="selectFilter" @change="filterProductsByCategory">
        <option value="">Todas as categorias</option>
        <option
          v-for="categorie in categories"
          v-bind:key="categorie.id"
          :value="categorie.category"
        >
          {{ categorie.category }}
        </option>
      </select>
    </div>
    </div>
    <div class="products">
    <Product v-for="product in products" 
             v-bind:key="product.id" 
             :nameProduct="product.name" 
             :about="product.about"
             :price="product.price"
             :image="product.image"
             :offer="product.offer"
             :idProduct="product._id"
             />
  </div>
  </div>
  
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
import Product from '@/components/Product.vue'
import { mapMutations, mapState, mapGetters } from 'vuex'
import axios from 'axios'
import global from '../global'

export default {
  name: 'HomePage',
  components: {
    HeaderBar,
    Product
  },
  data: () => ({
    axios,
    selectFilter: '',
    filters: '',
    products: [],
    allProducts: []
  }),
  computed: {
    ...mapState(['categories']),
  },
  methods: {
    ...mapGetters(['getProducts', 'productsByCategory']),
    ...mapMutations(['setProduct', 'setCategories']),
    async loadCategories(){
      try{
        const categoriesList = await axios.get(`${global.baseUrl}/categories`)
        const categories = categoriesList.data
        this.setCategories(categories)
      }catch(e){}
    },
    async loadProducts(){
      try{
        const categoriesList = await axios.get(`${global.baseUrl}/products`)
        const products = categoriesList.data
        this.setProduct(products)
        this.allProducts = products
        this.products = products
        this.loadCategories()
      }catch(e){}
    },
    filterProductsByCategory(){
      this.products = this.allProducts 
      const category = this.selectFilter
      if(category == "") return
      const productsFiltred = this.products.filter(product => product.category == category)
      return this.products = productsFiltred
    }
  },
  created(){
    this.loadProducts()
  }
}
</script>

<style>
.header-fixed{
  width: 100%;
}
.filter {
  width: 1250px;
  max-width: 95%;
  padding: 6px 0px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
 
}

.filter select {
  background: #7159c1;
  color: #E5E9F0;
  font-weight: bolder;
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
}

.products {
  width: 100%;
  max-width: 1250px;
  padding: 20px;
  
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
</style>