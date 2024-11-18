<script setup lang="ts">
import {useRoute} from 'vue-router'
import {Question, Quiz, Result, Results} from "../../../config";
import {onMounted, ref} from "vue";
import router from "@/router";
import store from "@/store";
const route = useRoute()

const quiz: Quiz = {
  id: undefined,
  title: '',
  description: '',
  questions: [
    {
      id: undefined,
      question: '',
      answers: []
    }
  ]
}

//here: correct answer is used for user selected answer
const localQuestion = ref<Question>({
  question: '',
  correct_answer: 0,
  answers: []
})

const results: Results = {
  user_id: 0,
  questions_answers: []
}
const currentQuestionIndex = ref<number>(0)

  const getQuiz = async () => {
    let res = await fetch(`http://localhost:3000/api/quizz/take/${route.params.id}`, {
      method: 'GET',
      headers: {'accept': 'application/json'}
    })
    if (res.ok) {
      const data = await res.json()
      Object.assign(quiz, data)

      localQuestion.value = quiz.questions[0]
    }
  }

  onMounted(() => {
    getQuiz()
    //TODO GET USER FROM STORE
  })

const nextQuestion = (): void => {
  currentQuestionIndex.value === quiz.questions.length -1 ? currentQuestionIndex.value = quiz.questions.length - 1: currentQuestionIndex.value++
  getQuestion()
}

const prevQuestion = (): void => {
  currentQuestionIndex.value === 0 ? currentQuestionIndex.value = 0 : currentQuestionIndex.value--
  getQuestion()
}

const setChosenAnswer = (answer_id: number): void => {
  //Checks if chosen answer is the same as already selected, if so: undefines the chosen answer
  answer_id === localQuestion.value.correct_answer ? localQuestion.value.correct_answer = undefined: localQuestion.value.correct_answer = answer_id
}


const getQuestion = ():void => {
  //GET QUESTION, ANSWERS AND ALREADY CHOSEN ANSWER IF APPLICABLE TO LOCAL QUESTION
  localQuestion.value = quiz.questions[currentQuestionIndex.value]
}

const sendResults = async (): Promise<void> => {
  const results: Result[] = []
  quiz.questions.forEach((question: Question): void => {
    results.push({quiz_id: quiz.id as number, question_id: question.id as number, answer_id: question.correct_answer as number})
  })
  const token = localStorage.getItem('token')
  let res = await fetch("http://localhost:3000/api/results/set", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      token: token,
      results: results
    })
  })
  let data = await res.json()
  if (!res.ok) {
    console.log(`${res.status}: ${data.message}`)
    return
  }
  await router.push('/')
}

const isAllAnswered = () => {
  return quiz.questions.filter((question => question.correct_answer === undefined)).length === 0
}

</script>

<template>
    <div class="card">
      <div class="card-header">
        <h1>{{quiz.title}}</h1>
        <h2>{{quiz.description}}</h2>
      </div>
      <progress :value="currentQuestionIndex" :max="quiz.questions.length - 1"/>
      <div class="nav-buttons">
        <button class="secondary" :disabled="currentQuestionIndex === 0" @click="prevQuestion"><<<</button>
        <button class="secondary" :disabled="currentQuestionIndex === quiz.questions.length - 1" @click="nextQuestion">>>></button>
      </div>
      <div class="question">
        <h3>Question {{currentQuestionIndex + 1}} / {{ quiz.questions.length }}</h3>
        <h4>{{localQuestion.question}}</h4>
        <div class="answers">
          <div class="answer" v-for="(answer, index) in localQuestion.answers">
            <button :class="answer.id === localQuestion.correct_answer ? 'primary' : 'secondary'" @click="setChosenAnswer(answer.id as number)">
              {{answer.answer}}
            </button>
          </div>
        </div>
      </div>
      <button class="creation" :disabled="!isAllAnswered()" @click="sendResults">Envoyer mes réponses</button>
    </div>
</template>

<style scoped lang="scss">
@import '../../assets/variables';
.nav-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;

  button {
    width: 45%
  }
}

.question {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .answers {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    .answer {
      width: 100%
    }
  }
}


</style>