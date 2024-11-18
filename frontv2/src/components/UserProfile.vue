<script setup lang="ts">
import {useRoute} from "vue-router";
const route = useRoute();

import {onMounted, reactive, ref} from 'vue';
let user = reactive({
  username: '',
  created_at: '',
  role: ''
})
const getUser = async () => {
  let res = await fetch(`http://localhost:3000/api/users/${route.params.id}`, {
    method: 'GET',
    headers: {'accept': 'application/json'},
  })
  if (res.ok) {
    const data = await res.json()
    Object.assign(user, data)
  }
}
onMounted(()=> {
  getUser()
})
</script>

<template>
  <div class="card">
    <section class="card-header">
      <h1>{{ user.username }}</h1>
    </section>
    <p><b>Date de création du compte:</b> {{ new Date(user.created_at).toLocaleString()}}</p>
    <p><b>Role:</b> {{user.role}}</p>
  </div>

</template>

<style scoped lang="scss">
p {
  margin: 12px
}
b {
  font-weight: bold;
}
</style>