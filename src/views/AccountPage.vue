<template>
  <div class="account">
    <HeaderBar />
    <div class="content-account">
      <div class="settings-account">
      <div class="info-user-account">
        <span>Nome do Usuário: {{ user.name }}</span>
      </div>
      <div class="change-password">
        <input type="text" v-model="oldPassword" placeholder="Senha antiga">
        <input type="text" v-model="newPassword" placeholder="Nova senha">
        <button @click="changePassword">Mudar Senha</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState} from 'vuex'
import router from '../routes'
import global from '../global'
import HeaderBar from '../components/HeaderBar.vue'
import axios from 'axios'

export default {
  name: "AccountPage",
  computed: mapState(['user']),
  components: {
    HeaderBar
  },
  data: () => ({
    oldPassword: '',
    newPassword: '',
  }),
  methods: {
    verificationUserInStorage(){
      const userStringfy = localStorage.getItem(global.userStorage)
      const userParse = JSON.parse(userStringfy)
      if(!userParse) return router.push('/login')
    },
    async changePassword(){
      try{
        await axios.put(`${global.baseUrl}/password`, { 
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
      }catch(e){
        console.log(e)
      }
    }
  },
  mounted() {
    this.verificationUserInStorage()
  }
}
</script>

<style>
.account {
  width: 100%;
}
.info-user-account span {
  color: #fff;
}
.content-account {
  width: 95%;
  max-width: 1250px;
  margin: 0 auto;
}

.change-password {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: left;
  justify-content: left;
  margin-top: 10px;
  background: #D8DEE9;
  border-radius: 4px;
  gap: 4px;
}

.change-password input {
  width: 350px;
  max-width: 100%;
  padding: 4px ;
  border: none;
  background: none;
  border-bottom: 2px solid #5E81AC;
  transition: .4s;
}
.change-password input:focus {
    border-bottom: 2px solid #2E3440;
}

.change-password button {
  background: #7159c1;
  color: #D8DEE9;
  padding: 6px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: bold;
    width: 350px;
  max-width: 100%;
  margin-top: 10px;
}
</style>