<script setup lang="ts">
import {Question, Quiz} from "../../../config";
import {ref} from "vue";
import Answer from "@/components/admin/Answer.vue";
import router from "@/router";

const currentQuestionIndex = ref<number>(0)
const title = ref<string>('')
const description = ref<string>('')

const localQuestion = ref<Question>({
  question: '',
  correct_answer: 0,
  answers: []
})


const quiz: Quiz = {
  title: title.value,
  description: description.value,
  questions: [
    {
      question: '',
      correct_answer: 0,
      answers: []
    }
  ]
}
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
  localQuestion.value.answers.push({answer: ''})
  getQuestion()
}


const removeAnswer = (answerIndex: number): void => {
  if (localQuestion.value.answers.length > 0) {
    localQuestion.value.answers.splice(answerIndex, 1)
  }
}

const setCorrectAnswer = (correctAnswerIndex: number): void => {
  quiz.questions[currentQuestionIndex.value].correct_answer = correctAnswerIndex
}


const sendQuiz = async () => {
  const token = localStorage.getItem("token")
  quiz.title = title.value
  quiz.description = description.value
  setQuestion()
  //remove empty questions and empty answers
  quiz.questions = quiz.questions.filter(question => question.question.trim() !== '')
  quiz.questions.forEach((question: Question): void => {
    question.answers = question.answers.filter(answer => answer.answer.trim() !== '')
  })
  let res = await fetch("http://localhost:3000/api/quizz/new", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      quiz: quiz,
      token: token
    })
  });
  let data = await res.json()
  if (!res.ok) {
    console.log(`${res.status}: ${data.message}`)
    return
  } else {
    await router.push('/quizz/all')
  }
}
</script>

<template>
  <div class="quiz">

    <section class="header">
      <h1>Création d'un quiz</h1>
      <label>Titre</label>
      <input v-model="title">
      <label>Description</label>
      <input v-model="description">
      <button @click="sendQuiz" class="primary">Créer le quiz</button>
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
      justify-content: center;

      button {
        width: auto
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
