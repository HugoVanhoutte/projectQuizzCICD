<script setup lang="ts">
import { useRoute } from 'vue-router'
import { QuizResults } from "../../../config";
import { onMounted, ref } from "vue";
import router from "@/router";

const route = useRoute()
const results = ref<QuizResults | {}>({})
const getAllResults = async () => {
  let res = await fetch(`http://localhost:3000/api/results/${route.params.id}`, {
    method: 'GET',
    headers: {'accept': 'application/json'},
  })
  if (res.ok) {
    results.value = await res.json()
  }
}

const goToQuizzUsersResults = (id: number): void => {
  router.push({name: 'quiz-results-users', params: {id: id}})
}

onMounted( () => {
  getAllResults()
})
</script>

<template>

  <div class="card">
    <div class="card-header" v-if="results.quiz">
<!--      <pre>{{ results }}</pre>-->
      <h1>{{ results.quiz.title }}</h1>
      <h2>{{ results.quiz.description }}</h2>
      <p>Moyenne générale: {{ results.total_answered !== 0 ? Math.round(results.total_correct / results.total_answered * 100) : 0}} % ({{results.total_correct }} / {{ results.total_answered}})</p>
    </div>
    <section v-else>
      Chargement...
    </section>
      <section class="questions" v-for="(question, index) in results.questions" :key="question.id">
        <header>
          <h1>Question {{ index + 1 }}: {{ question.question.question }}</h1>
        </header>
        <main>
          <div v-if="results.questions[index]">
            Moyenne générale: {{ results.questions[index].total_answered !== 0 ? Math.round(results.questions[index].total_correct / results.questions[index].total_answered) * 100 : 0}} % ({{results.questions[index].total_correct}} / {{results.questions[index].total_answered}})
            <div class="answers" v-for="answer in question.answers">
              <button :class="answer.id === question.correct_answer_id ? 'creation' : 'secondary'">{{answer.answer}}</button>
            </div>
          </div>
          <div v-else>
            Chargement...
          </div>
        </main>
      </section>
      <button class="primary" @click="goToQuizzUsersResults(Number(route.params.id))">Détails des participants</button>
  </div>

</template>

<style scoped lang="scss">
@import "../../assets/variables";
div.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  div.card-header {
    margin: 0;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    div.questions.card {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 15px 0;
      main {
        div {
          display: flex;
          flex-direction: column;
          align-items: center;

          height: auto;
          align-content: center;
          font-size: 24px;
          div.answers{
            display: flex;
            flex-direction: column;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
