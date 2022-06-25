import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    categories: [],
    user: {},
    cart: [],
    totalToPay: 0
  },
  mutations: {
    setUser(state, data){
      if(data.token) axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      return state.user = data
    },
    setCategories(state, category) {
      if(Array.isArray(category)) return state.categories = category
      return state.categories.push(category)
    },
    getProductsByFilter(state, product){
      return (state.products)
    },
    setProduct(state, product){
      console.log(product)
      if(Array.isArray(product)) return state.products = product
      return state.products.push(product)
    },
    setProductInCart(state, product) {
      if(Array.isArray(product)) return state.cart = product
      const productsById = state.cart.filter(e => e.id == product.id)
      const updatedCardt = state.cart
      if(productsById.length > 0) {
        state.cart.forEach((e, i) => {
          if(e.id == product.id){
            updatedCardt[i].totalPrice = (Number(updatedCardt[i].totalPrice) + Number(product.totalPrice)).toFixed(2)
            updatedCardt[i].quantity = (Number(updatedCardt[i].quantity) + Number(product.quantity)).toFixed(0)
          }
        })
        state.cart = updatedCardt
        return
      }
      state.cart.push(product)
    },
    setTotalPriceToPay(state, price) {
      let totalPrice = 0
      price.forEach(e => totalPrice = totalPrice + Number(e.totalPrice))
      state.totalToPay = totalPrice.toFixed(2)
    }
  },
  getters: {
    getProducts(state, product) {
      if(!product.category && !product.name) return (state.products)
    },
    getProductsInCart(state) {
      return (state.cart)
    },
    getTotalToPay(state) {
      return (state.totalToPay)
    }
  }
})

