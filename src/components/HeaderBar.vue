<template>
  <header>
    <div class="header-bar">
      <div class="logoname">
        <router-link to="/">M. Store</router-link >
      </div>
      <div class="shoppingcar-and-login">
        <router-link class="login-or-create-account" :to="user.name ? '/account' : '/login'" >
          <img :src="images.user" alt="">
        </router-link>
        <router-link class="shoppingcart" to="/cart" v-if="!user.admin">
          <img :src="images.shoppingCart" alt="">
          <span v-if="cart.length > 0">{{ cart.length }}</span>
        </router-link>
        <router-link class="shoppingcart" to="/admin" v-if="user.admin">
          <img :src="images.adminUser" alt="">
        </router-link>
        <router-link class="shoppingcart" @click="logout"  to="/" v-if="user.name">
          <img :src="images.logout" alt="">
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import shoppingCart from '@/assets/shopping-cart.svg'
import adminUser from '@/assets/admin-user.svg'
import user from '@/assets/user-settings.svg'
import logout from '@/assets/logout.svg'
import { mapState, mapMutations } from 'vuex'
import global from '../global'
export default {
  name: "HeaderBar",
  data: () => ({
    images: { shoppingCart, user, adminUser, logout}
  }),
  computed: mapState(['cart', 'user']),
  methods: {
    ...mapMutations(['setUser']),
    logout(){
      localStorage.removeItem(global.userStorage)
      this.setUser({})
    }
  }
};
</script>

<style>
header {
  padding: 20px 0px;
  
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
.header-bar {
  width: 1250px;
  max-width: 95%;
  margin: 0 auto;
  height: 55px;
  display: flex;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  justify-content: space-between;

}
.header-bar a {
  font-family: "Charis SIL", serif;
  color: #ECEFF4;
  padding: 0px 14px;
  font-size: 18px;
  text-decoration: navajowhite;
}

.shoppingcar-and-login {
  padding: 0px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.shoppingcar-and-login img {
  width: 25px;
  height: 25px;
  align-self: center;
  cursor: pointer;
}

.shoppingcar-and-login img:hover {
  opacity: 0.7;

}
.shoppingcar-and-login .shoppingcart,
.shoppingcar-and-login .login-or-create-account {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

a > span {
  font-size: 12px;
  margin-bottom: -4px;
  align-self: flex-end;
  padding: 1px;
}
</style>
