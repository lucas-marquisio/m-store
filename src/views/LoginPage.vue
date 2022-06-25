<template>
  <div class="login">
    <form>
      <h3>{{ isLogin ? "Logue-se" : "Registre-se"}}</h3>
      <div class="inputs">
        <input type="text" v-model="form.userName" placeholder="Nome" v-if="!isLogin">
        <input type="email" v-model="form.email" placeholder="Email">
        <input type="password" v-model="form.password" placeholder="Senha">
        <button type="submit" @click.prevent="loginUser" v-if="isLogin">Logar</button>
        <button type="submit" @click.prevent="createUser" v-if="!isLogin">Registrar-se</button>
      </div>
      <a @click="ChoseLoginOrRegister">{{ textLoginOrRegister}}</a>
    </form>
  </div>
</template>

<script>
import  global from '../global'
import axios from 'axios'
import { mapMutations } from 'vuex'
import router from '../routes'

export default {
  name: 'LoginPage',
  data: () => ({
    form: {userName: '', email: '', password: ''},
    isLogin: true,
    textLoginOrRegister: 'Ainda não tem conta na M. Store? Registre-se',
    axios,
  }),
  methods: {
    ...mapMutations(['setUser']),
    ChoseLoginOrRegister(){
      this.isLogin = !this.isLogin
     this.textLoginOrRegister = this.isLogin ? 'Ainda não tem conta na M. Store? Registre-se' : 'Já possui uma conta? Logue-se'
    },
    clearInputs(){
      this.form =  {userName: '', email: '', password: ''}
    },
    async createUser(){
      try{
        await axios.post(`${global.baseUrl}/register`, {
          registerUser: this.form.userName,
          registerEmail: this.form.email,
          registerPassword: this.form.password
        })
        this.isLogin = true
        this.textLoginOrRegister = 'Ainda não tem conta na M. Store? Registre-se'
        this.clearInputs()
  
        alert('cadastrado com sucesso! logue-se')
      }catch(e){
        console.log(e)
        alert('não foi possivel cadastrar-se, tente novamente')
      }
    },
    async loginUser(){
      try{
        const loginData =  {
          email: this.form.email,
          password: this.form.password
        }
        const user = await axios.post(`${global.baseUrl}/login`, loginData)
        this.setUser(user.data)
        localStorage.setItem(global.userStorage, JSON.stringify(user.data))
        this.clearInputs()
        router.push('/account')
      }catch(e){
        console.log(e)
      }
    },
    
  },
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  width: 350px;
  min-height: 340px;
  max-width: 95%;
  padding: 20px;
  background: #7159c1a5;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.41); 
box-shadow: 5px 5px 15px 3px rgba(0,0,0,0.41);
}

form input {
  padding: 6px 4px;
  border: none;
  background: none;
  border-bottom: 2px solid #4C566A;
  outline: none;
  width: 100%;
  transition: 0.4s;
  color: #D8DEE9;
}

form input:focus {
  border-bottom: 2px solid #D8DEE9;
}

form input::placeholder {
  color: #d8dee9da;
}

form input[type="password"] {
  margin-bottom: 10px;
}

form button {
  padding: 4px;
  border-radius: 2px;
  border: none;
  margin-top: 4px;
  cursor: pointer;
  background: #7159c1;
  color: #D8DEE9;
  font-weight: bolder;
  width: 100%;
}

form button:hover {
  opacity: 0.8;
}

form a {
  text-decoration: underline;
  color: #D8DEE9;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
}

form h3 {
  color: #D8DEE9;
}
</style>