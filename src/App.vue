<script setup>
</script>

<template>
   <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Charis+SIL:wght@400;700&family=Nunito:wght@300;400;500;600;700;800;900&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
}
html {
    width: 100%;
  height: 100%;
}
body {
  background: #111;
  width: 100%;
  height: 100%;
}
</style>

<script>
import global from './global'
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  data: () => ({
    axios 
  }),
  methods: {
    ...mapMutations(['setUser']),
    async verificationLogin() {
      try{
        const user = localStorage.getItem(global.userStorage)
        const userParsed = JSON.parse(user)
        if(userParsed) {
          this.setUser(userParsed)
          const tokenIsValid = await axios.get(`${global.baseUrl}/validate-token`)
          if(tokenIsValid.data.message){
            return this.setUser(userParsed)
          }else {
            localStorage.removeItem(global.userStorage)
          } 
        }
      }catch(e){
        console.log(e)
      }
    }
  },
  mounted() {
    this.verificationLogin()
  }
}
</script>
