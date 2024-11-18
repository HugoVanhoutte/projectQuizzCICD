<script setup lang="ts">
import {useRoute} from 'vue-router'
import {onMounted, ref} from "vue";
import Answer from "@/components/admin/Answer.vue";
import {Question, Quiz} from "../../../config";
import router from "@/router";
const route = useRoute()

const quiz: Quiz = {
  id: undefined,
  title: '',
  description: '',
  questions: [
    {
      id: undefined,
      question: '',
      answers: [],
      correct_answer: 0,
    }
  ]
}
let localQuestion = ref<Question>({
  question: '',
  correct_answer: 0,
  answers: []
})
const currentQuestionIndex = ref<number>(0)
const getQuiz = async () => {
  let res = await fetch(`http://localhost:3000/api/quizz/${route.params.id}`, {
    method: 'GET',
    headers: {'accept': 'application/json'}
  })
  if (res.ok) {
    const data = await res.json()
    Object.assign(quiz, data)

    localQuestion.value = quiz.questions[0]
  }
}

onMounted(()=>{
  getQuiz()
})


const nextQuestion = (): void => {
  setQuestion()
  if (currentQuestionIndex.value >= quiz.questions.length - 1) {
    createQuestion()
  }
  currentQuestionIndex.value++
  getQuestion()
}

const prevQuestion = (): void => {
  setQuestion()
  //Make it impossible to create questions with index < 0
  currentQuestionIndex.value === 0 ? currentQuestionIndex.value = 0 : currentQuestionIndex.value--
  getQuestion()
}

const setQuestionFromAnswer = (value: string, index: number) => {
  localQuestion.value.answers[index] = {answer: value}
}

const setQuestion = (): void => {
  //fills quiz object with data from question input
  quiz.questions[currentQuestionIndex.value] = localQuestion.value
}

const getQuestion = (): void => {
  //fills input with data from quiz object
  localQuestion.value = quiz.questions[currentQuestionIndex.value]
}

const createQuestion = (): void => {
  quiz.questions.push(
      {
        question: '',
        correct_answer: 0,
        answers: []
      }
  )
}

const addAnswer = (): void => {
  setQuestion()
  localQuestion.value.answers.push({id: 0, answer: ''})
  getQuestion()
}

const removeAnswer = (answerIndex: number): void => {
  if (localQuestion.value.answers.length <= 0) {
    return
  }
  localQuestion.value.answers.splice(answerIndex, 1)
}

const setCorrectAnswer = (correctAnswerIndex: number): void => {
  quiz.questions[currentQuestionIndex.value].correct_answer = correctAnswerIndex
}

const updateQuiz = async ():Promise<void> => {
  let res = await fetch(`http://localhost:3000/api/quizz/update`, {
    method: 'PUT',
    headers: {"content-Type": "application/json"},
    body: JSON.stringify({
      quiz: quiz,
      token: localStorage.getItem('token')
    })
  })
  let data = await res.json()
  if (!res.ok) {
    console.log(`${res.status}: ${data.message}`)
    return
  }
  await router.push('/quizz/all')
}

</script>

<template>
  <div class="quiz">
    <section class="header">
      <h1>Mise à jour d'un quiz</h1>
      <label>Titre</label>
      <input v-model="quiz.title">
      <label>Description</label>
      <input v-model="quiz.description">
      <button @click="updateQuiz" class="primary">Mettre à jour le quiz</button>
    </section>
    <div class="question">
      <div class="nav-buttons">
        <button @click="prevQuestion" class="secondary"><<<</button>
        <button @click="nextQuestion" class="secondary">>>></button>
      </div>
      <label>Question {{ currentQuestionIndex + 1 }}</label>
      <input v-model="localQuestion.question">

      <button @click="addAnswer" class="creation">Ajouter une réponse</button>
      <div class="answers">
        <!--key: Forces vue to re-mount every Answer component (forces onMounted calls)-->
        <Answer
            class="card"
            v-for="(answer, index) in localQuestion.answers"
            @removeAnswer="removeAnswer(index)"
            :answer="answer.answer"
            :key="currentQuestionIndex + '-' + index"
            :answerIndex="index"
            :questionIndex="currentQuestionIndex"
            :correct-answer-index="quiz.questions[currentQuestionIndex].correct_answer"
            @select-correct-answer="setCorrectAnswer"
            @set-question="setQuestionFromAnswer"
        />
        </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.quiz {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  section.header {
    width: 80%;
    display: flex;
    flex-direction: column;
    h1 {
      font-family: Graduate, serif;
      font-size: 36px;
      margin: 15px
    }
  }
  .question {
    width: 80%;
    display: flex;
    flex-direction: column;
    label {
      font-family: Graduate, serif;
      font-size: 36px;
    }
    .nav-buttons {
      width: 100%;
      display: flex;
      flex-direction: row;
      button {
        width: 50%
      }
    }
    .answers {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
  button {
    margin: 10px
  }
}
</style>