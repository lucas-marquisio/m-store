<template>
  <div class="admin">
    <HeaderBar />
    <div class="add-product">
      <form>
        <div class="add-category">
          <input
            type="text"
            placeholder="Nome da categoria"
            v-model="newCategory"
          />
          <button @click.prevent="addNewCategory">Adicionar Categoria</button>
        </div>
        <select required v-model="newProduct.category">
          <option disabled value="">Selecione a categoria</option>
          <option
            v-for="categorie in categories"
            v-bind:key="categorie.id"
            :value="categorie.category"
          >
            {{ categorie.category }}
          </option>
        </select>
        <input
          type="text"
          required
          placeholder="Nome do Produto"
          v-model="newProduct.name"
        />
        <input
          type="number"
          required
          placeholder="Preço do produto"
          v-model="newProduct.price"
        />
        <textarea
          cols="30"
          rows="10"
          required
          placeholder="Sobre o produto"
          v-model="newProduct.about"
        ></textarea>
        <input
          type="number"
          placeholder="Desconto do produto em %"
          v-model="newProduct.offer"
        />
        <input type="text" v-model="newProduct.image"  placeholder="Url Imagem"/>
        <button @click.prevent="addNewProduct" type="submit">
          Adicionar Produto
        </button>
      </form>
    </div>
    <div class="all-products">
      <div class="menu">
        <div class="checkbox-show-all-products">
          <label for="showAllProducts">Carregar Lista dos produtos</label>
          <input type="checkbox" v-model="showProducts" id="showAllProducts" @change="loadAllProducts">
        </div>
        <div class="search-in-products">
          <input type="search" placeholder="Nome do produto" v-model="searchProduct" >
          <button @click="searchForProduct(searchProduct)">Pesquisar</button>
        </div>
      </div>

      <div class="product-edit" v-for="product in allProducts" v-bind:key="product.id">
        <span>Nome: {{ product.name }}</span>
        <div class="price-product">
          <label>Preço Total: <strong>{{ product.price }}</strong></label>
        <input type="number"               v-model="productChangePrice.productPrice"
              placeholder="Novo preço">
              
        </div>
        <div class="discount-produc">
          <label>Oferta % <strong>{{ product.offer }}</strong></label>
          <input type="number" 
          v-model="productChangePrice.productOffer"
          placeholder="Novo % de desconto" />
        </div>
          <button @click="editProduct(product._id)">Salvar</button>
          <button @click="deleteProduct(product._id)">Deletar</button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
import { mapState, mapGetters, mapMutations } from "vuex";
import axios from 'axios'
import global from '../global'

export default {
  name: "PageAdmin",
  components: {HeaderBar},
  methods: {
    ...mapGetters(['getProducts']),
    ...mapMutations(['setProduct', 'setCategories']),
    async getCategories(){
      try{
        const categoriesList = await axios.get(`${global.baseUrl}/categories`)
        const categories = categoriesList.data
        this.setCategories(categories)
      }catch(e){}
    },
    searchForProduct(productName){
      if(productName == "") return this.loadAllProducts()
      const productsFilter = this.allProducts.filter(e => e.name.toLowerCase().includes(productName.toLowerCase()))
      if(productName.length < 1) return this.loadAllProducts()
      this.allProducts = productsFilter
    },
    loadAllProducts(){
      if(!this.showProducts) return this.allProducts = []
      this.allProducts = this.getProducts()
    },
    async addNewCategory() {
      try{
        const categoryName = this.newCategory
        await axios.post(`${global.baseUrl}/category`, { name: categoryName })
        this.newCategory = ""
        this.getCategories()
      }catch(e) {
        console.log(e)
      }
    },
    async addNewProduct() {
      try{
        await axios.post(`${global.baseUrl}/product`, {...this.newProduct})
        this.newProduct = { offer: "", category: "", name: "",   price: "", about: "", image: "" }
        this.getAllProductsDB()
      }catch(e){
        console.log(e)
      }
    },
    editProduct(productId) {
      console.log(productId);
      const products = this.getProducts()
      console.log(products)
      const productsEdited = products.map(e => {
        console.log(e.id)
        if(e.id == productId) {
          e.price = this.productChangePrice.productPrice
          e.offer = this.productChangePrice.productOffer
        return e
        }
        return e
      })
      this.setProduct(productsEdited)
    },
    async deleteProduct(productId){
      try{
        await axios.delete(`${global.baseUrl}/product/${productId}`)
        const productsReloaded = this.allProducts.filter(item => item._id != productId)
        this.allProducts = productsReloaded
        this.setProduct(productsReloaded)
      }catch(e){}
    },
    async getAllProductsDB(){
      try{
        const products = await axios.get(`${global.baseUrl}/products`)
        this.setProduct(products.data)
        if(this.showProducts) this.allProducts = products.data
      }catch(e){}
    }
  },
  data: () => ({
    newCategory: "",
    allProducts: [],
    showProducts: false,
    searchProduct: '',
    newProduct: {
      offer: "",
      category: "",
      name: "",
      price: "",
      about: "",
      image: "",
    },
    productChangePrice: {
      productPrice: '',
      productOffer: ''
    },
    axios
  }),
  computed: mapState(["categories", "products"]),
  created(){
    this.getAllProductsDB()
    this.getCategories()
  }
};
</script>

<style>
* {
  outline: none;
}

form {
  padding: 20px;
  width: 95%;
  max-width: 500px;
  background: #7159c1b5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 auto;
}

.add-category {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

form textarea {
  resize: none;
  width: 100%;
  height: 120px;
  max-width: 100%;
  border: none;
  border-radius: 4px;
  padding: 8px;
}
form input,
form button {
  width: 100%;
  padding: 4px 6px;
  border: none;
  border-radius: 2px;
}

form button {
  background: #a3be8c;
  color: #2e3440;
  cursor: pointer;
}

form select {
  background: #5e81ac;
  border: none;
  padding: 4px 6px;
  width: 100%;
  border-radius: 4px;
  color: aliceblue;
}
form input[type="file"] {
  color: #d8dee9;
}
.product-edit {
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: row;
  flex-wrap: wrap;
    padding: 12px;
  background: #D8DEE9;
  border-radius: 4px;
}
.product-edit span {
  width: 100%;

}

.product-edit input {
  border: none;
  background: none;
  border-bottom: 1px solid #2e3440;
}

.all-products {
  width: 95%;
  margin: 0 auto;
  display: flex;
  gap: 10px;
  flex-direction: row;
  flex-wrap: wrap;
}

.price-product,
.discount-produc{
  display: flex;
  flex-direction: column;
}

.product-edit button {
  height: 23px;
  align-self: flex-end;
  padding: 4px 6px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #000;
  color: #D8DEE9;
  font-weight: bold;
}

.menu {
  margin-top: 40px;
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.menu  .checkbox-show-all-products {
  padding: 6px 8px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #7159c1;
  border-radius: 4px;
  color: #fff;
}

.menu .search-in-products{
    padding: 6px 8px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #7159c1;
  border-radius: 4px;
  color: #fff;
}

.search-in-products input {
  background: none;
  border: none;
  border-bottom: 1px solid #2e3440;
}

.search-in-products input::placeholder {
  color: #D8DEE9;
}

.search-in-products  button {
  padding: 4px 6px;
  border: none;
  background: #6159c1;
  border-radius: 4px;
  color: #d8dee9;
  cursor: pointer;
}
</style>

