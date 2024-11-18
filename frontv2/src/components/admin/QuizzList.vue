<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {Quiz} from "../../../config";
import router from "@/router";
import store from "@/store";
const quizz = ref<Quiz[]>([])
const answered = ref<number[]>([])
const getQuizz = async (): Promise<void | Quiz | undefined> => {
  let res = await fetch('http://localhost:3000/api/quizz', {
    method: 'GET',
    headers: {'accept': 'application/json'}
  })
  const data = await res.json()
  if (!res.ok) {
    console.log(res.status, data.message)
  }
  Object.assign(quizz.value, data)
}

const getAnswered = async (): Promise<void> => {
  let res = await fetch(`http://localhost:3000/api/users/answered/${store.state.user.id}`, {
    method: 'GET',
    headers: {'accept': 'application/json'}
  })
  const data = await res.json()
  if (!res.ok) {
    console.log(res.status, data.message)
  }
  answered.value = data.map(item => item.quiz_id)
}

onMounted(()=> {
  getQuizz()
  getAnswered()
})


const deleteQuiz = async (id: number): Promise<void> => {
  let res = await fetch(`http://localhost:3000/api/quizz/delete/${id}`, {
    method: 'DELETE',
    headers: {'accept': 'application/json'}
  })
  if (res.ok) {
    return res.json().then(
      location.reload()
    )
  }
}

const goToQuizEdit = (id: number):void => {
  router.push({name: 'quiz-edit', params: {id: id}})
}

const goToQuizTake = (id: number): void => {
  router.push({name: 'quiz-take', params: {id: id}})
}

const goToQuizResults= (id: number): void => {
  router.push({name: 'quiz-results', params: {id: id}})
}
</script>

<template>

  <h1>Liste des quizz</h1>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Titre</th>
        <th>Créateur</th>
        <th v-if="store.state.user.role === 'admin'">Date de création</th>
        <th v-if="store.state.user.role === 'admin'">Edition</th>
        <th v-if="store.state.user.role === 'admin'">Suppression</th>
        <th> Participation </th>
        <th>Résultats</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="quiz in quizz">
        <td>{{ quiz.id }}</td>
        <td>{{ quiz.title }}</td>
        <td>{{ quiz.creator_id }}</td>
        <td v-if="store.state.user.role === 'admin'">{{ new Date(quiz.created_at).toLocaleString()}}</td>
        <td v-if="store.state.user.role === 'admin'"><button @click="goToQuizEdit(Number(quiz.id))" class="edition">Éditer</button></td>
        <td v-if="store.state.user.role === 'admin'"><button @click="deleteQuiz(Number(quiz.id))" class="deletion">Supprimer</button></td>
        <td><button @click="goToQuizTake(Number(quiz.id))" class="creation" :disabled="answered.includes(Number(quiz.id))">Participer</button></td>
        <td><button @click="goToQuizResults(Number(quiz.id))"class="primary">Voir les résultats</button></td>
      </tr>
    </tbody>
  </table>

</template>

<style scoped lang="scss">
@import '../../assets/variables';
h1 {
  text-align: center;
  font-family: $title-font;
  font-size: 36px;

  background-color: $primary-color;
  color: $bg-color;
  border-bottom: $secondary-color 3px solid
}
button {
  margin: 5px
}

</style>
