<script setup lang="ts">
import { ref } from 'vue'
import router from "@/router";

const username = ref('')
const password = ref('')
const validatePassword = ref('')

const sendRegister = async () => {
  let res = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      validatePassword: validatePassword.value
    })
  });
  let data = await res.json()
  if (!res.ok) {
    console.log(`${res.status}: ${data.message}`)
    return
  }
  await router.push('/')
};

const close = ():void => {
  history.back()
}
</script>

<template>
  <div class="modal-box">
    <div class="card">
      <section class="card-header">
        <button @click="close" class="deletion">X</button>
        <h1>Inscription</h1>
      </section>

      <label for="username">Nom d'utilisateur</label>
      <input v-model="username" @keydown.enter="sendRegister">

      <label for="password">Mot de passe</label>
      <input v-model="password" type="password" @keydown.enter="sendRegister">

      <label for="password">Confirmer mot de passe</label>
      <input v-model="validatePassword" type="password" @keydown.enter="sendRegister">

      <button @click="sendRegister" class="primary">Inscription</button>
      <RouterLink to="LoginForm">Déjà un compte ? Connexion</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/_variables.scss';
h1 {
  font-family: $title-font;
  font-size: 36px;
  margin: 15px
}
input {
  width: 50%;
  margin: 5px;
}
.card {
  box-shadow: none;
  margin: 15% auto;
  width: 80%;
  padding-bottom: 10px;
  .card-header {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    h1 {
      flex-grow: 1;
      text-align: center;
      align-self: center;
      transform: translateX(30px);
    }
    button.deletion {
      width: 45px;
      height: 45px;
      padding: 0;
      font-size: 35px;
      margin-right: 20px;
    }
  }
}

a {
  color: $primary-color;
}
</style>