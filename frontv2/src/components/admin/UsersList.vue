<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { User } from "../config"
import AdminPanel from "@/views/admin/AdminPanel.vue";
import router from "@/router";

const users = ref<User[]>([])
const getUsers = async () => {
  let res = await fetch('http://localhost:3000/api/users', {
    method: 'GET',
    headers: {'accept': 'application/json'},
  })
  if (res.ok) {
    return res.json().then(
        data => {
          users.value = data
        }
    )
  }
}
onMounted(()=> {
  getUsers()
})

const goToUserProfile = (id: number):void => {
  router.push({name: 'user-profile', params: {id: id}})
}
</script>

<template>
  <h1>Liste des utilisateurs</h1>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nom d'utilisateur</th>
        <th>Role</th>
        <th>Date de création du compte</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" @click="goToUserProfile(user.id)" class="clickable">
      <td>{{ user.id }}</td>
      <td>{{ user.username }}</td>
      <td>{{ user.role }}</td>
      <td>{{ new Date(user.created_at).toLocaleString()}}</td>
    </tr>
    </tbody>
  </table>

</template>

<style scoped lang="scss">
@import '/src/assets/variables';
h1 {
  text-align: center;
  font-family: $title-font;
  font-size: 36px;

  background-color: $primary-color;
  color: $bg-color;
  border-bottom: $secondary-color 3px solid
}

</style>