<script setup lang="ts">
import { useRoute } from "vue-router";
import {onMounted, ref} from "vue";
import {Quiz, QuizUsersResults} from "../../../config";
const route = useRoute()

const results = ref<QuizUsersResults | {}>({})


const getUsersResults = async () => {
  let res = await fetch(`http://localhost:3000/api/results/users/${route.params.id}`, {
    method: 'GET',
    headers: {'accept': 'application/json'},
  })
  if (res.ok) {
    results.value = await res.json()
  }
}


onMounted(() => {
  getUsersResults()
})
</script>

<template>
</template>

<style scoped lang="scss">

</style>